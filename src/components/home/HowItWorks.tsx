"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Palette, Download, BarChart3 } from "lucide-react";

const steps = [
  {
    step: "01",
    Icon: MousePointerClick,
    title: "QRタイプを選ぶ",
    description: "URL、テキスト、WiFi、メールなど、用途に合ったタイプを選択します。",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    step: "02",
    Icon: Palette,
    title: "コンテンツを入力 & デザイン",
    description: "URLやテキストを入力し、ブランドに合わせて色をカスタマイズ。リアルタイムでプレビュー。",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    step: "03",
    Icon: Download,
    title: "ダウンロード",
    description: "高解像度PNGですぐにダウンロード。チラシ、名刺、ポスターなどに利用できます。",
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    step: "04",
    Icon: BarChart3,
    title: "追跡 & 最適化",
    description: "動的QRならスキャン数をリアルタイムで確認。リンク先もいつでも変更可能。",
    gradient: "from-emerald-500 to-green-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-sky-500 mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">かんたん4ステップ</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            30秒でQRコードを作成。登録不要で今すぐ使えます。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl glass-card transition-all duration-300"
            >
              <span
                className={`text-4xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent opacity-20`}
              >
                {item.step}
              </span>
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mt-3 mb-4 shadow-lg shadow-cyan-500/10`}
              >
                <item.Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-bold mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
