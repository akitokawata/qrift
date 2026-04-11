import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

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

  // QRコード検索
  const { data: qr } = await supabase
    .from("qr_codes")
    .select("id, target_url, is_active")
    .eq("short_code", shortcode)
    .single();

  if (!qr || !qr.is_active) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // スキャンログを非同期で記録（リダイレクトを先に返す）
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = request.headers.get("user-agent") || "";
  const referer = request.headers.get("referer") || null;
  const deviceType = parseDevice(userAgent);

  // waitUntilがEdge Runtimeで使えない場合のフォールバック
  // 非同期でログを記録（レスポンスをブロックしない）
  supabase.from("scan_logs").insert({
    qr_code_id: qr.id,
    ip_address: ip,
    user_agent: userAgent,
    referer: referer,
    device_type: deviceType,
  });

  return NextResponse.redirect(qr.target_url, { status: 302 });
}
