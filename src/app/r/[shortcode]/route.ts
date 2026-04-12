import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

// Plan scan limits (duplicated here to avoid importing non-edge-compatible modules)
const PLAN_SCAN_LIMITS: Record<string, number> = {
  free: 500,
  starter: 10000,
  business: 100000,
  pro: -1, // unlimited
};

function parseDevice(ua: string): string {
  if (/mobile|android|iphone|ipad|ipod/i.test(ua)) {
    if (/ipad|tablet/i.test(ua)) return "tablet";
    return "mobile";
  }
  return "desktop";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // QRコード検索（user_idも取得）
  const { data: qr } = await supabase
    .from("qr_codes")
    .select("id, target_url, is_active, user_id")
    .eq("short_code", shortcode)
    .single();

  if (!qr || !qr.is_active) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // スキャン上限チェック
  let shouldLog = true;

  if (qr.user_id) {
    // ユーザーのプランを取得
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("plan_type")
      .eq("user_id", qr.user_id)
      .single();

    const planType = sub?.plan_type || "free";
    const scanLimit = PLAN_SCAN_LIMITS[planType] ?? 500;

    // 無制限でない場合、今月のスキャン数をチェック
    if (scanLimit !== -1) {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

      // ユーザーの全QRコードIDを取得
      const { data: userQRs } = await supabase
        .from("qr_codes")
        .select("id")
        .eq("user_id", qr.user_id);

      if (userQRs && userQRs.length > 0) {
        const qrIds = userQRs.map((q: { id: string }) => q.id);
        const { count } = await supabase
          .from("scan_logs")
          .select("*", { count: "exact", head: true })
          .in("qr_code_id", qrIds)
          .gte("scanned_at", startOfMonth)
          .lt("scanned_at", startOfNextMonth);

        if ((count || 0) >= scanLimit) {
          shouldLog = false;
        }
      }
    }
  }

  // スキャンログを記録（上限超過時はスキップ）
  if (shouldLog) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || null;
    const deviceType = parseDevice(userAgent);

    supabase.from("scan_logs").insert({
      qr_code_id: qr.id,
      ip_address: ip,
      user_agent: userAgent,
      referer: referer,
      device_type: deviceType,
    });
  }

  // 上限超過でもリダイレクトは継続（ユーザー体験を壊さない）
  return NextResponse.redirect(qr.target_url, { status: 302 });
}
