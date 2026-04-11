import { NextRequest, NextResponse } from "next/server";
import { generateQRBuffer } from "@/lib/qr";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, fgColor, bgColor, width } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const buffer = await generateQRBuffer(url, {
      fgColor: fgColor || "#000000",
      bgColor: bgColor || "#ffffff",
      width: Math.min(width || 800, 2000),
    });

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="qrift-qrcode.png"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
  }
}
