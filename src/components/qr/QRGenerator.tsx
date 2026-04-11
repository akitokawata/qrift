"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Link2,
  Palette,
  RotateCcw,
  Type,
  Wifi,
  Mail,
  QrCode,
  ArrowRight,
} from "lucide-react";
import QRCode from "qrcode";

const qrTypes = [
  { id: "url", label: "URL", Icon: Link2, placeholder: "https://example.com" },
  { id: "text", label: "テキスト", Icon: Type, placeholder: "テキストを入力" },
  { id: "wifi", label: "WiFi", Icon: Wifi, placeholder: "" },
  { id: "email", label: "メール", Icon: Mail, placeholder: "email@example.com" },
];

const colorPresets = [
  { fg: "#000000", bg: "#ffffff", label: "ベーシック" },
  { fg: "#1e3a5f", bg: "#ffffff", label: "ネイビー" },
  { fg: "#6366f1", bg: "#ffffff", label: "インディゴ" },
  { fg: "#059669", bg: "#ffffff", label: "グリーン" },
  { fg: "#dc2626", bg: "#ffffff", label: "レッド" },
  { fg: "#ffffff", bg: "#1e1e1e", label: "ダーク" },
];

type QRMode = "static" | "dynamic";

export default function QRGenerator() {
  const [activeType, setActiveType] = useState("url");
  const [mode, setMode] = useState<QRMode>("static");
  const [url, setUrl] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [showColors, setShowColors] = useState(false);

  const getQRContent = useCallback(() => {
    switch (activeType) {
      case "url":
      case "text":
      case "email":
        return activeType === "email" && url ? `mailto:${url}` : url;
      case "wifi":
        if (!wifiSsid) return "";
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      default:
        return url;
    }
  }, [activeType, url, wifiSsid, wifiPassword, wifiEncryption]);

  const generateQR = useCallback(async () => {
    const content = getQRContent();
    if (!content.trim()) {
      setQrDataUrl(null);
      return;
    }
    try {
      const dataUrl = await QRCode.toDataURL(content, {
        width: 400,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "H",
      });
      setQrDataUrl(dataUrl);
    } catch {
      setQrDataUrl(null);
    }
  }, [getQRContent, fgColor, bgColor]);

  useEffect(() => {
    const timer = setTimeout(generateQR, 300);
    return () => clearTimeout(timer);
  }, [generateQR]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "qrift-qrcode.png";
    link.href = qrDataUrl;
    link.click();
  };

  const activeTypeConfig = qrTypes.find((t) => t.id === activeType)!;

  return (
    <div id="generator">
      {/* QR Type Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {qrTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => {
              setActiveType(type.id);
              setUrl("");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeType === type.id
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            <type.Icon className="w-4 h-4" strokeWidth={1.8} />
            {type.label}
          </button>
        ))}
      </div>

      {/* Static / Dynamic Toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setMode("static")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            mode === "static"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Static QR
        </button>
        <button
          onClick={() => setMode("dynamic")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all relative ${
            mode === "dynamic"
              ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          Dynamic QR
          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-orange-500 text-white">
            PRO
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* Input Section - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          {/* Dynamic Mode Notice */}
          <AnimatePresence>
            {mode === "dynamic" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-cyan-50 border border-sky-100"
              >
                <p className="text-sm font-semibold text-sky-700 mb-1">
                  Dynamic QRコードは無料登録が必要です
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  リンク先の変更・スキャン解析・コンテキスト出し分けが使えます。
                </p>
                <a
                  href="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 hover:shadow-md transition-all"
                >
                  無料で始める
                  <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Fields */}
          {activeType === "wifi" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ネットワーク名（SSID）
                </label>
                <input
                  type="text"
                  placeholder="WiFi名を入力"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  パスワード
                </label>
                <input
                  type="text"
                  placeholder="パスワードを入力"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  暗号化方式
                </label>
                <select
                  value={wifiEncryption}
                  onChange={(e) => setWifiEncryption(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all bg-white"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">なし</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="relative">
              <activeTypeConfig.Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={activeType === "email" ? "email" : "text"}
                placeholder={activeTypeConfig.placeholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-sky-100 outline-none text-lg transition-all"
              />
            </div>
          )}

          {/* Color Presets & Custom */}
          <div>
            <button
              onClick={() => setShowColors(!showColors)}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-sky-600 transition-colors"
            >
              <Palette className="w-4 h-4" />
              デザインをカスタマイズ
            </button>

            <AnimatePresence>
              {showColors && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-5"
                >
                  {/* Color Presets */}
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
                      プリセット
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => {
                            setFgColor(preset.fg);
                            setBgColor(preset.bg);
                          }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-xs font-medium ${
                            fgColor === preset.fg && bgColor === preset.bg
                              ? "border-cyan-400 bg-sky-50 text-sky-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: preset.fg }}
                          />
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                        前景色
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 font-mono">{fgColor}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                        背景色
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                        />
                        <span className="text-xs text-gray-400 font-mono">{bgColor}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFgColor("#000000");
                      setBgColor("#ffffff");
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    リセット
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* QR Preview - 2 cols */}
        <div className="lg:col-span-2 flex flex-col items-center">
          <div className="sticky top-28 w-full max-w-xs">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-xl shadow-sky-500/5 p-6 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  プレビュー
                </span>
              </div>

              {qrDataUrl ? (
                <motion.img
                  key={fgColor + bgColor + qrDataUrl.slice(-20)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={qrDataUrl}
                  alt="QR Code"
                  className="w-56 h-56 rounded-lg"
                />
              ) : (
                <div className="w-56 h-56 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <p className="text-sm text-gray-400 text-center px-4">
                    コンテンツを入力すると
                    <br />
                    QRコードが表示されます
                  </p>
                </div>
              )}

              {qrDataUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 w-full space-y-2"
                >
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5"
                  >
                    <Download className="w-4 h-4" />
                    PNG ダウンロード
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
