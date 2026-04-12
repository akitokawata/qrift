import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import GeneratorSection from "@/components/home/GeneratorSection";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import UseCases from "@/components/home/UseCases";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QRift",
  url: "https://qrift.sarvest.jp",
  description:
    "QRiftは無料でQRコードを生成できるサービス。動的QRコードでリンク先を後から変更、スキャン解析で効果測定も。",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
    description: "無料プランあり",
  },
  creator: {
    "@type": "Organization",
    name: "合同会社SARVEST",
    url: "https://sarvest.jp",
  },
  featureList: [
    "QRコード生成",
    "動的QRコード",
    "スキャン解析",
    "リンク先変更",
    "デザインカスタマイズ",
  ],
  inLanguage: "ja",
};

export default function Home() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <GeneratorSection />
        <HowItWorks />
        <Features />
        <UseCases />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
