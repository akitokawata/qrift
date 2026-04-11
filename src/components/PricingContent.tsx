"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "¥0",
    period: "",
    description: "まずは試してみたい方に",
    features: [
      { label: "動的QRコード", value: "3個" },
      { label: "スキャン数/月", value: "500回" },
      { label: "コンテキストルーティング", value: false },
      { label: "API アクセス", value: false },
      { label: "基本アナリティクス", value: true },
      { label: "カスタムデザイン", value: true },
    ],
    cta: "無料で始める",
    ctaHref: "/signup",
    highlighted: false,
    available: true,
  },
  {
    name: "Starter",
    price: "¥980",
    period: "/月",
    description: "個人事業主・小規模チーム向け",
    features: [
      { label: "動的QRコード", value: "20個" },
      { label: "スキャン数/月", value: "10,000回" },
      { label: "コンテキストルーティング", value: false },
      { label: "API アクセス", value: false },
      { label: "詳細アナリティクス", value: true },
      { label: "カスタムデザイン", value: true },
    ],
    cta: "近日公開",
    ctaHref: "#",
    highlighted: false,
    available: false,
  },
  {
    name: "Business",
    price: "¥2,980",
    period: "/月",
    description: "成長中のビジネスに最適",
    features: [
      { label: "動的QRコード", value: "100個" },
      { label: "スキャン数/月", value: "100,000回" },
      { label: "コンテキストルーティング", value: true },
      { label: "API アクセス", value: false },
      { label: "高度なアナリティクス", value: true },
      { label: "カスタムデザイン", value: true },
    ],
    cta: "近日公開",
    ctaHref: "#",
    highlighted: true,
    available: false,
  },
  {
    name: "Pro",
    price: "¥9,800",
    period: "/月",
    description: "大規模運用・開発チーム向け",
    features: [
      { label: "動的QRコード", value: "500個" },
      { label: "スキャン数/月", value: "無制限" },
      { label: "コンテキストルーティング", value: true },
      { label: "API アクセス", value: true },
      { label: "高度なアナリティクス", value: true },
      { label: "優先サポート", value: true },
    ],
    cta: "近日公開",
    ctaHref: "#",
    highlighted: false,
    available: false,
  },
];

const faqs = [
  {
    q: "無料プランはいつまで使えますか？",
    a: "無料プランに期間制限はありません。3個までの動的QRコードを、月500スキャンまで永続的にご利用いただけます。",
  },
  {
    q: "プランの変更はいつでも可能ですか？",
    a: "はい、いつでもアップグレード・ダウングレードが可能です。アップグレードは即時反映、ダウングレードは次回請求日から適用されます。",
  },
  {
    q: "支払い方法は何がありますか？",
    a: "クレジットカード（Visa, Mastercard, JCB, American Express）に対応予定です。有料プランの公開時に詳細をご案内します。",
  },
  {
    q: "スキャン数の上限を超えた場合はどうなりますか？",
    a: "上限を超えた場合、QRコードは引き続き動作しますが、スキャンの計測が一時停止されます。データが消えることはありません。",
  },
  {
    q: "コンテキストルーティングとは何ですか？",
    a: "スキャンした端末のOS（iOS/Android）、時間帯、地域などに応じて、1つのQRコードから異なるURLに自動でリダイレクトする機能です。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい、いつでも解約可能です。解約後も契約期間の終了日まではサービスをご利用いただけます。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-semibold text-gray-800">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingContent() {
  return (
    <main className="pt-32 pb-20 px-6">
      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          シンプルな<span className="gradient-text">料金プラン</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-gray-500 max-w-2xl mx-auto"
        >
          必要な分だけ、無駄なくスタート。すべてのプランに動的QRコードとアナリティクスが含まれます。
        </motion.p>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`glass-card rounded-3xl p-6 flex flex-col relative ${
              plan.highlighted
                ? "ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/10"
                : ""
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500">
                おすすめ
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold gradient-text">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-gray-400">{plan.period}</span>
                )}
              </div>
            </div>

            <ul className="flex-1 space-y-3 mb-6">
              {plan.features.map((feat) => (
                <li key={feat.label} className="flex items-center gap-3 text-sm">
                  {feat.value === true ? (
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : feat.value === false ? (
                    <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  ) : (
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  )}
                  <span className={feat.value === false ? "text-gray-400" : "text-gray-700"}>
                    {feat.label}
                    {typeof feat.value === "string" && (
                      <span className="ml-1 font-semibold text-gray-800">{feat.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {plan.available ? (
              <a
                href={plan.ctaHref}
                className="block text-center px-5 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5"
              >
                {plan.cta}
              </a>
            ) : (
              <button
                disabled
                className="block w-full text-center px-5 py-3 rounded-full text-sm font-semibold text-gray-400 bg-gray-100 cursor-not-allowed"
              >
                {plan.cta}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-center mb-10"
        >
          よくある<span className="gradient-text">ご質問</span>
        </motion.h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
