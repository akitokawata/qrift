"use client";

import { motion } from "framer-motion";
import { RefreshCw, BarChart3, Palette, Zap, Globe, Shield } from "lucide-react";

const features = [
  {
    Icon: RefreshCw,
    title: "リンク先を後から変更",
    description: "印刷済みのQRコードでも、リンク先をいつでも変更できます。チラシやポスターを刷り直す必要はありません。",
    gradient: "from-sky-500 to-cyan-500",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-500",
  },
  {
    Icon: BarChart3,
    title: "スキャン解析",
    description: "いつ、何回スキャンされたかをリアルタイムで確認。印刷物の効果測定がGoogle Analytics不要で可能に。",
    gradient: "from-cyan-500 to-teal-500",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
  },
  {
    Icon: Palette,
    title: "デザインカスタマイズ",
    description: "ブランドカラーに合わせてQRコードの色を変更。ロゴの埋め込みにも対応。",
    gradient: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    Icon: Zap,
    title: "高速リダイレクト",
    description: "エッジサーバーで処理するため、スキャンからリンク先への遷移は0.1秒以下。ストレスフリー。",
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    Icon: Globe,
    title: "コンテキスト出し分け",
    description: "時間帯・言語・地域・デバイスに応じて遷移先を自動切替。1つのQRで多言語対応も。",
    gradient: "from-emerald-500 to-green-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    badge: "Coming Soon",
  },
  {
    Icon: Shield,
    title: "無料で始められる",
    description: "静的QRコードは登録不要で無制限に作成可能。動的QRも無料プランで3個まで使えます。",
    gradient: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden">
      {/* Colored blobs for glass effect */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-sky-500 mb-4">
            Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">QRコードを、もっと賢く。</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ただ作るだけじゃない。変更・分析・出し分けまで、これ1つで。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl glass-card transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.iconBg} backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.Icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={1.8} />
                </div>
                {feature.badge && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-sky-600 bg-sky-50/80 border border-sky-200/50 backdrop-blur-sm">
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">{feature.description}</p>
              <div
                className={`absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
