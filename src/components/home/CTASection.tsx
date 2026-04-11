"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 p-[1px]"
        >
          <div className="rounded-[23px] bg-white p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">動的QRコードを、無料で。</span>
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-xl mx-auto mb-10 text-[16px]">
              リンク先の変更、スキャン解析、デザインカスタマイズ。
              すべて無料プランで始められます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:shadow-xl hover:shadow-sky-500/30 transition-all hover:-translate-y-1"
              >
                無料で始める
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
