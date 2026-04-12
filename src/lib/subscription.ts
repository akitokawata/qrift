import type { PlanType } from "@/lib/stripe";
import { PLANS } from "@/lib/stripe";

export type { PlanType };

export type PlanLimits = {
  dynamicQR: number;
  scansPerMonth: number;
  contextRouting: boolean;
  api: boolean;
};

/**
 * Get the plan limits for a given plan type
 */
export function getPlanLimits(planType: PlanType): PlanLimits {
  return PLANS[planType].limits;
}

/**
 * Get the user's current plan from Supabase (client-side)
 */
export async function getUserPlan(
  userId: string,
  supabaseClient: {
    from: (table: string) => {
      select: (columns: string) => {
        eq: (column: string, value: string) => {
          single: () => Promise<{ data: { plan_type: string } | null }>;
        };
      };
    };
  }
): Promise<PlanType> {
  const { data: sub } = await supabaseClient
    .from("subscriptions")
    .select("plan_type")
    .eq("user_id", userId)
    .single();

  if (sub?.plan_type && ["free", "starter", "business", "pro"].includes(sub.plan_type)) {
    return sub.plan_type as PlanType;
  }
  return "free";
}

/**
 * Get the current month's scan count for a user (all QR codes)
 */
export async function getMonthlyScans(
  userId: string,
  supabaseClient: {
    from: (table: string) => {
      select: (columns: string, options?: { count: string; head: boolean }) => {
        in: (column: string, values: string[]) => {
          gte: (column: string, value: string) => {
            lt: (column: string, value: string) => Promise<{ count: number | null }>;
          };
        };
      };
    };
  }
): Promise<number> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabaseClient as any;

  // Get user's QR code IDs
  const { data: qrCodes } = await client
    .from("qr_codes")
    .select("id")
    .eq("user_id", userId);

  if (!qrCodes || qrCodes.length === 0) return 0;

  const qrIds = qrCodes.map((qr: { id: string }) => qr.id);

  const { count } = await client
    .from("scan_logs")
    .select("*", { count: "exact", head: true })
    .in("qr_code_id", qrIds)
    .gte("scanned_at", startOfMonth)
    .lt("scanned_at", startOfNextMonth);

  return count || 0;
}

/**
 * Check if user has exceeded their monthly scan limit
 */
export function isOverLimit(scans: number, planType: PlanType): boolean {
  const limit = getPlanLimits(planType).scansPerMonth;
  if (limit === -1) return false; // unlimited
  return scans >= limit;
}

/**
 * Check if user is approaching their monthly scan limit (80%+)
 */
export function isNearLimit(scans: number, planType: PlanType): boolean {
  const limit = getPlanLimits(planType).scansPerMonth;
  if (limit === -1) return false; // unlimited
  return scans >= limit * 0.8;
}

/**
 * Get scan usage percentage (capped at 100 for display)
 */
export function getUsagePercent(scans: number, planType: PlanType): number {
  const limit = getPlanLimits(planType).scansPerMonth;
  if (limit === -1) return 0; // unlimited
  return Math.min(Math.round((scans / limit) * 100), 100);
}
