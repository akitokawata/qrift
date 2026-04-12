"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { PlusCircle, QrCode, BarChart3, ExternalLink, Copy, Check, Crown, CreditCard } from "lucide-react";
import type { PlanType } from "@/lib/stripe";

type QRCode = {
  id: string;
  type: string;
  short_code: string | null;
  target_url: string;
  title: string | null;
  is_active: boolean;
  created_at: string;
  scan_count?: number;
};

const PLAN_LIMITS: Record<PlanType, number> = {
  free: 3,
  starter: 20,
  business: 100,
  pro: 500,
};

const PLAN_COLORS: Record<PlanType, string> = {
  free: "bg-gray-100 text-gray-600",
  starter: "bg-sky-50 text-sky-600 border border-sky-200",
  business: "bg-cyan-50 text-cyan-600 border border-cyan-200",
  pro: "bg-emerald-50 text-emerald-600 border border-emerald-200",
};

const PLAN_LABELS: Record<PlanType, string> = {
  free: "Free",
  starter: "Starter",
  business: "Business",
  pro: "Pro",
};

export default function DashboardPage() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free");
  const [portalLoading, setPortalLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadQRCodes();
    loadPlan();
  }, []);

  async function loadPlan() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: sub } = await supabase
      .from("subscriptions")
      .select("plan_type")
      .eq("user_id", user.id)
      .single();

    if (sub?.plan_type) {
      setCurrentPlan(sub.plan_type as PlanType);
    }
  }

  async function openCustomerPortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // ignore
    }
    setPortalLoading(false);
  }

  async function loadQRCodes() {
    const { data: codes } = await supabase
      .from("qr_codes")
      .select("*")
      .order("created_at", { ascending: false });

    if (codes) {
      // スキャン数を取得
      const codesWithScans = await Promise.all(
        codes.map(async (code) => {
          const { count } = await supabase
            .from("scan_logs")
            .select("*", { count: "exact", head: true })
            .eq("qr_code_id", code.id);
          return { ...code, scan_count: count || 0 };
        })
      );
      setQrCodes(codesWithScans);
    }
    setLoading(false);
  }

  const copyShortUrl = (shortCode: string, id: string) => {
    const url = `${window.location.origin}/r/${shortCode}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalScans = qrCodes.reduce((sum, qr) => sum + (qr.scan_count || 0), 0);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-indigo-500" />
            </div>
            <span className="text-sm text-gray-500">QRコード数</span>
          </div>
          <p className="text-3xl font-bold">{qrCodes.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-cyan-500" />
            </div>
            <span className="text-sm text-gray-500">総スキャン数</span>
          </div>
          <p className="text-3xl font-bold">{totalScans}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-sm text-gray-500">動的QR</span>
          </div>
          <p className="text-3xl font-bold">
            {qrCodes.filter((q) => q.type === "dynamic").length}
            <span className="text-sm font-normal text-gray-400 ml-1">/ {PLAN_LIMITS[currentPlan]}</span>
          </p>
        </div>
        {/* プランバッジ */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center">
              <Crown className="w-4 h-4 text-sky-500" />
            </div>
            <span className="text-sm text-gray-500">プラン</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${PLAN_COLORS[currentPlan]}`}>
              {PLAN_LABELS[currentPlan]}
            </span>
          </div>
          <div className="mt-3">
            {currentPlan === "free" ? (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
              >
                <Crown className="w-3.5 h-3.5" />
                アップグレード
              </Link>
            ) : (
              <button
                onClick={openCustomerPortal}
                disabled={portalLoading}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
              >
                <CreditCard className="w-3.5 h-3.5" />
                {portalLoading ? "読み込み中..." : "プラン管理"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">QRコード一覧</h1>
        <Link
          href="/qr/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 hover:shadow-lg hover:shadow-sky-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          新規作成
        </Link>
      </div>

      {/* QR List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-5 bg-gray-100 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-50 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : qrCodes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            QRコードがまだありません
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            最初の動的QRコードを作成して、スキャン解析を始めましょう。
          </p>
          <Link
            href="/qr/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 hover:shadow-lg transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            QRコードを作成
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {qrCodes.map((qr, i) => (
            <motion.div
              key={qr.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {qr.title || "無題のQRコード"}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        qr.type === "dynamic"
                          ? "bg-sky-50 text-sky-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {qr.type === "dynamic" ? "Dynamic" : "Static"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mb-2">{qr.target_url}</p>
                  {qr.short_code && (
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-sky-600 bg-indigo-50 px-2 py-1 rounded">
                        /r/{qr.short_code}
                      </code>
                      <button
                        onClick={() => copyShortUrl(qr.short_code!, qr.id)}
                        className="text-gray-400 hover:text-indigo-500 transition-colors"
                      >
                        {copiedId === qr.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{qr.scan_count || 0}</p>
                    <p className="text-[11px] text-gray-400">スキャン</p>
                  </div>
                  <Link
                    href={`/qr/${qr.id}`}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-sky-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    詳細
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
