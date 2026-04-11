import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QRift - QRコード作成・管理 | 無料で動的QRコードを生成",
  description:
    "QRiftは無料でQRコードを生成できるサービス。動的QRコードでリンク先を後から変更、スキャン解析で効果測定も。印刷物を刷り直さずにキャンペーンを更新。",
  keywords: ["QRコード", "QRコード作成", "動的QRコード", "QRコード無料", "QRコード管理"],
  openGraph: {
    title: "QRift - QRコード作成・管理",
    description: "無料でQRコードを生成。動的QRコードでリンク先を後から変更可能。",
    url: "https://qrift.sarvest.jp",
    siteName: "QRift",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
