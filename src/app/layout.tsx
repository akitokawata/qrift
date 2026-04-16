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
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-34WKLBFRBY" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-34WKLBFRBY');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "合同会社SARVEST",
              url: "https://sarvest.jp",
              logo: "https://qrift.sarvest.jp/icon.svg",
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@sarvest.jp",
                contactType: "customer service",
                availableLanguage: "Japanese",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "大阪市",
                addressRegion: "大阪府",
                addressCountry: "JP",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
