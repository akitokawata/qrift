"use client";

import QRGenerator from "@/components/qr/QRGenerator";

export default function GeneratorSection() {
  return (
    <section className="pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-100/15 rounded-full blur-3xl -translate-y-1/2" />
      <div className="max-w-6xl mx-auto relative">
        <QRGenerator />
      </div>
    </section>
  );
}
