import { NextRequest, NextResponse } from "next/server";
import { stripe, getPlanByPriceId } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const admin = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const subscriptionId = session.subscription as string;

      if (userId && subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id;
        const planType = getPlanByPriceId(priceId);

        const periodStart = (subscription as unknown as { current_period_start: number }).current_period_start;
        const periodEnd = (subscription as unknown as { current_period_end: number }).current_period_end;

        await admin.from("subscriptions").upsert({
          user_id: userId,
          plan_type: planType,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscriptionId,
          stripe_price_id: priceId,
          status: "active",
          current_period_start: new Date(periodStart * 1000).toISOString(),
          current_period_end: new Date(periodEnd * 1000).toISOString(),
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const priceId = subscription.items.data[0]?.price.id;
      const planType = getPlanByPriceId(priceId);

      const sub = subscription as unknown as {
        current_period_start: number;
        current_period_end: number;
        cancel_at_period_end: boolean;
        status: string;
        id: string;
      };

      await admin
        .from("subscriptions")
        .update({
          plan_type: planType,
          stripe_price_id: priceId,
          status: sub.status,
          current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          cancel_at_period_end: sub.cancel_at_period_end,
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;

      await admin
        .from("subscriptions")
        .update({
          plan_type: "free",
          status: "canceled",
          stripe_subscription_id: null,
          stripe_price_id: null,
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as unknown as { subscription: string | null };
      const subscriptionId = invoice.subscription;

      if (subscriptionId) {
        await admin
          .from("subscriptions")
          .update({ status: "past_due" })
          .eq("stripe_subscription_id", subscriptionId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
