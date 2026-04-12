import Stripe from "stripe";

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true })
  : (null as unknown as Stripe);

export type PlanType = "free" | "starter" | "business" | "pro";

export const PLANS: Record<
  PlanType,
  {
    name: string;
    priceId: string | null;
    price: number;
    limits: {
      dynamicQR: number;
      scansPerMonth: number;
      contextRouting: boolean;
      api: boolean;
    };
  }
> = {
  free: {
    name: "Free",
    priceId: null,
    price: 0,
    limits: {
      dynamicQR: 3,
      scansPerMonth: 500,
      contextRouting: false,
      api: false,
    },
  },
  starter: {
    name: "Starter",
    priceId: process.env.STRIPE_STARTER_PRICE_ID || "",
    price: 980,
    limits: {
      dynamicQR: 20,
      scansPerMonth: 10000,
      contextRouting: false,
      api: false,
    },
  },
  business: {
    name: "Business",
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || "",
    price: 2980,
    limits: {
      dynamicQR: 100,
      scansPerMonth: 100000,
      contextRouting: true,
      api: false,
    },
  },
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
    price: 9800,
    limits: {
      dynamicQR: 500,
      scansPerMonth: -1, // unlimited
      contextRouting: true,
      api: true,
    },
  },
};

export function getPlanByPriceId(priceId: string): PlanType {
  for (const [plan, config] of Object.entries(PLANS)) {
    if (config.priceId === priceId) return plan as PlanType;
  }
  return "free";
}
