"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "QRiftは無料で使えますか？",
    a: "はい。静的QRコードは登録不要・完全無料で何個でも作成できます。動的QRコードも無料プランで3個まで利用可能です。",
  },
  {
    q: "動的QRコードとは何ですか？",
    a: "動的QRコードは、リンク先URLを後から変更できるQRコードです。印刷済みのチラシやポスターのQRコードでも、管理画面からリンク先を変更できます。スキャン回数の解析も可能です。",
  },
  {
    q: "静的QRコードと動的QRコードの違いは？",
    a: "静的QRコードはURLが直接埋め込まれており、変更できません。動的QRコードは中継サーバーを経由するため、リンク先を何度でも変更でき、スキャン解析も可能です。",
  },
  {
    q: "印刷後にリンク先を変更できますか？",
    a: "動的QRコードなら可能です。管理画面から遷移先URLを変更するだけで、既に印刷・配布済みのQRコードの遷移先が更新されます。",
  },
  {
    q: "スキャン解析ではどんなデータが見れますか？",
    a: "スキャン回数、日別推移、利用デバイスなどの情報をリアルタイムで確認できます。Google Analyticsの設定は不要です。",
  },
  {
    q: "商用利用はできますか？",
    a: "はい。QRiftで生成したQRコードは、個人利用・商用利用を問わず自由にお使いいただけます。",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-100/20 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-sky-500 mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="gradient-text">よくある質問</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors"
              >
                <span className="text-base font-semibold text-gray-800 pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
