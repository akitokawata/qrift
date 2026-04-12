import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, planType } = await request.json();

    if (!priceId || !planType) {
      return NextResponse.json({ error: "Missing priceId or planType" }, { status: 400 });
    }

    const admin = createAdminClient();

    // 既存のサブスクリプション確認
    const { data: sub } = await admin
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    let customerId = sub?.stripe_customer_id;

    // Stripeカスタマー作成（未作成の場合）
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      });
      customerId = customer.id;

      // サブスクリプションレコード作成 or 更新
      await admin.from("subscriptions").upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        plan_type: "free",
        status: "active",
      });
    }

    // Checkout Session作成
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
      metadata: { userId: user.id, planType },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
