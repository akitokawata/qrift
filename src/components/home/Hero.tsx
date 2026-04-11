"use client";

import { motion } from "framer-motion";
import { QrCode, Scan, BarChart3, RefreshCw } from "lucide-react";

const stats = [
  { label: "QRタイプ", value: "4+", Icon: QrCode },
  { label: "リダイレクト速度", value: "<0.1s", Icon: Scan },
  { label: "解析指標", value: "リアルタイム", Icon: BarChart3 },
  { label: "リンク変更", value: "何度でも", Icon: RefreshCw },
];

export default function Hero() {
  return (
    <section className="pt-28 pb-8 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white" />
      <div className="absolute top-10 -left-40 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-cyan-200/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-sky-100 mb-6">
            <QrCode className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-semibold text-sky-600">
              登録不要・無料でQRコード作成
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight leading-[1.1]">
            <span className="gradient-text">QRコードを作成。</span>
            <br />
            <span className="gradient-text">追跡。最適化。</span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            動的QRコードでリンク先をいつでも変更。
            スキャン解析で印刷物の効果測定も。
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <stat.Icon className="w-4 h-4 text-indigo-500" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                <p className="text-[11px] text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
