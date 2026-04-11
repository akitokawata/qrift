import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import GeneratorSection from "@/components/home/GeneratorSection";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import UseCases from "@/components/home/UseCases";
import FAQ from "@/components/home/FAQ";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Header />
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
