"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { Link2, Type, Loader2, Download, QrCode, Palette, RotateCcw, Crown } from "lucide-react";
import type { PlanType } from "@/lib/stripe";

const PLAN_LIMITS: Record<PlanType, number> = {
  free: 3,
  starter: 20,
  business: 100,
  pro: 500,
};

const PLAN_LABELS: Record<PlanType, string> = {
  free: "Free",
  starter: "Starter",
  business: "Business",
  pro: "Pro",
};

const colorPresets = [
  { fg: "#000000", bg: "#ffffff", label: "ベーシック" },
  { fg: "#1e3a5f", bg: "#ffffff", label: "ネイビー" },
  { fg: "#6366f1", bg: "#ffffff", label: "インディゴ" },
  { fg: "#059669", bg: "#ffffff", label: "グリーン" },
  { fg: "#dc2626", bg: "#ffffff", label: "レッド" },
  { fg: "#ffffff", bg: "#1e1e1e", label: "ダーク" },
];

export default function NewQRPage() {
  const [title, setTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showColors, setShowColors] = useState(false);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free");
  const [dynamicCount, setDynamicCount] = useState(0);
  const [limitLoading, setLimitLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const limit = PLAN_LIMITS[currentPlan];
  const isAtLimit = dynamicCount >= limit;

  useEffect(() => {
    async function loadPlanAndCount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // プランを取得
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("plan_type")
        .eq("user_id", user.id)
        .single();

      const plan = (sub?.plan_type as PlanType) || "free";
      setCurrentPlan(plan);

      // 動的QR数をカウント
      const { count } = await supabase
        .from("qr_codes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("type", "dynamic");

      setDynamicCount(count || 0);
      setLimitLoading(false);
    }
    loadPlanAndCount();
  }, []);

  const generatePreview = async (url: string) => {
    if (!url.trim()) {
      setQrPreview(null);
      return;
    }
    try {
      const shortCode = nanoid(8);
      const redirectUrl = `${window.location.origin}/r/${shortCode}`;
      const dataUrl = await QRCode.toDataURL(redirectUrl, {
        width: 400,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "H",
      });
      setQrPreview(dataUrl);
    } catch {
      setQrPreview(null);
    }
  };

  const handleUrlChange = (val: string) => {
    setTargetUrl(val);
    generatePreview(val);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!targetUrl.trim()) {
      setError("URLを入力してください");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // プランに応じた動的QR数チェック
    const { count } = await supabase
      .from("qr_codes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("type", "dynamic");

    if ((count || 0) >= limit) {
      setError(
        `${PLAN_LABELS[currentPlan]}プランでは動的QRコードは${limit}個まで作成できます。プランをアップグレードしてください。`
      );
      setLoading(false);
      return;
    }

    const shortCode = nanoid(8);

    const { error: insertError } = await supabase.from("qr_codes").insert({
      user_id: user.id,
      type: "dynamic",
      short_code: shortCode,
      target_url: targetUrl,
      title: title || null,
      design_config: { fgColor, bgColor, logoUrl: null },
    });

    if (insertError) {
      setError("作成に失敗しました。もう一度お試しください。");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">動的QRコードを作成</h1>
        {!limitLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium">{dynamicCount} / {limit}</span>
            <span className="text-gray-400">({PLAN_LABELS[currentPlan]})</span>
          </div>
        )}
      </div>

      {/* 上限到達警告 */}
      {!limitLoading && isAtLimit && (
        <div className="mb-6 rounded-xl bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-emerald-500/10 border border-sky-200 p-5">
          <div className="flex items-start gap-3">
            <Crown className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-gray-800 mb-1">
                {PLAN_LABELS[currentPlan]}プランの上限に達しました
              </p>
              <p className="text-sm text-gray-500 mb-3">
                動的QRコードは{limit}個まで作成できます。さらに作成するにはプランをアップグレードしてください。
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-sky-500/20 transition-all"
              >
                <Crown className="w-4 h-4" />
                プランをアップグレード
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleCreate} className="lg:col-span-3 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              タイトル（任意）
            </label>
            <div className="relative">
              <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="例: 2026年春キャンペーンチラシ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              遷移先URL
            </label>
            <div className="relative">
              <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                placeholder="https://example.com"
                value={targetUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              このURLは後からいつでも変更できます
            </p>
          </div>

          {/* Colors */}
          <div>
            <button
              type="button"
              onClick={() => setShowColors(!showColors)}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-sky-600 transition-colors"
            >
              <Palette className="w-4 h-4" />
              デザインをカスタマイズ
            </button>

            {showColors && (
              <div className="mt-4 p-5 rounded-xl bg-gray-50 border border-gray-100 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setFgColor(preset.fg);
                        setBgColor(preset.bg);
                        generatePreview(targetUrl);
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">前景色</label>
                    <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded-lg border cursor-pointer" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">背景色</label>
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg border cursor-pointer" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || isAtLimit || limitLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-sky-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isAtLimit ? (
              "上限に達しています"
            ) : (
              "QRコードを作成"
            )}
          </button>
        </form>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-sky-500/5 p-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                プレビュー
              </span>
            </div>
            {qrPreview ? (
              <img src={qrPreview} alt="QR Preview" className="w-48 h-48 rounded-lg" />
            ) : (
              <div className="w-48 h-48 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                <p className="text-xs text-gray-400 text-center px-4">
                  URLを入力すると
                  <br />
                  プレビューが表示されます
                </p>
              </div>
            )}
            <p className="text-[11px] text-gray-400 mt-3 text-center">
              動的QRはリダイレクトURLを使用します
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
