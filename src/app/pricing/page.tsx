import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PricingContent from "@/components/PricingContent";

export const metadata: Metadata = {
  title: "料金プラン | QRift - QRコード作成・管理",
  description:
    "QRiftの料金プラン。無料プランから始めて、ビジネスの成長に合わせてスケール。動的QRコード、スキャン解析、コンテキストルーティングなど。",
  openGraph: {
    title: "料金プラン | QRift",
    description:
      "QRiftの料金プラン。無料プランから始めて、ビジネスの成長に合わせてスケール。",
    url: "https://qrift.sarvest.jp/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <PricingContent />
      <Footer />
    </>
  );
}
