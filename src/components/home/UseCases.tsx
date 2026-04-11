"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingBag, Plane, Building2, Calendar, CreditCard } from "lucide-react";

const useCases = [
  {
    Icon: UtensilsCrossed,
    title: "飲食店",
    description: "テーブルQRでメニューを表示。時間帯で自動切替も。",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    Icon: ShoppingBag,
    title: "小売・EC",
    description: "商品パッケージにQR。キャンペーン切替も印刷し直し不要。",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    Icon: Plane,
    title: "観光・インバウンド",
    description: "1つのQRで多言語対応。訪問者の言語で自動出し分け。",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    Icon: Building2,
    title: "不動産",
    description: "物件看板にQR。販売中→成約で表示を自動切替。",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    Icon: Calendar,
    title: "イベント",
    description: "チケットや会場案内をQRで配信。終了後は別ページに遷移。",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    Icon: CreditCard,
    title: "名刺・印刷物",
    description: "名刺のQRから最新のプロフィールページへ。転職しても安心。",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

export default function UseCases() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-100/25 rounded-full blur-3xl" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-sky-500 mb-4">
            Use Cases
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">あらゆる業界で活用</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            QRiftは業界を問わず、あなたのビジネスに合わせて使えます。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 p-5 rounded-2xl glass-card transition-all duration-300"
            >
              <div
                className={`w-11 h-11 rounded-xl ${item.bg} backdrop-blur-sm flex items-center justify-center shrink-0`}
              >
                <item.Icon className={`w-5 h-5 ${item.color}`} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
