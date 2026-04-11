"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import {
  ArrowLeft, Copy, Check, Download, ExternalLink, Edit3,
  BarChart3, Smartphone, Monitor, Tablet, Calendar
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

type QRCodeData = {
  id: string;
  type: string;
  short_code: string | null;
  target_url: string;
  title: string | null;
  design_config: { fgColor: string; bgColor: string; logoUrl: string | null };
  is_active: boolean;
  created_at: string;
};

type DailyScan = { date: string; count: number };

export default function QRDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [qr, setQr] = useState<QRCodeData | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [totalScans, setTotalScans] = useState(0);
  const [dailyScans, setDailyScans] = useState<DailyScan[]>([]);
  const [deviceStats, setDeviceStats] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    // QRコード取得
    const { data: qrData } = await supabase
      .from("qr_codes")
      .select("*")
      .eq("id", id)
      .single();

    if (!qrData) {
      router.push("/dashboard");
      return;
    }

    setQr(qrData);

    // QR画像生成
    if (qrData.short_code) {
      const redirectUrl = `${window.location.origin}/r/${qrData.short_code}`;
      const config = qrData.design_config || {};
      const dataUrl = await QRCode.toDataURL(redirectUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: config.fgColor || "#000000",
          light: config.bgColor || "#ffffff",
        },
        errorCorrectionLevel: "H",
      });
      setQrImage(dataUrl);
    }

    // スキャン数
    const { count } = await supabase
      .from("scan_logs")
      .select("*", { count: "exact", head: true })
      .eq("qr_code_id", id);
    setTotalScans(count || 0);

    // 日別スキャン（過去30日）
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: logs } = await supabase
      .from("scan_logs")
      .select("scanned_at, device_type")
      .eq("qr_code_id", id)
      .gte("scanned_at", thirtyDaysAgo.toISOString())
      .order("scanned_at", { ascending: true });

    if (logs) {
      // 日別集計
      const daily: Record<string, number> = {};
      const devices: Record<string, number> = {};

      logs.forEach((log) => {
        const date = new Date(log.scanned_at).toISOString().split("T")[0];
        daily[date] = (daily[date] || 0) + 1;

        const device = log.device_type || "unknown";
        devices[device] = (devices[device] || 0) + 1;
      });

      // 過去30日を埋める
      const result: DailyScan[] = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        result.push({ date: dateStr, count: daily[dateStr] || 0 });
      }

      setDailyScans(result);
      setDeviceStats(devices);
    }

    setLoading(false);
  }

  const copyUrl = () => {
    if (!qr?.short_code) return;
    navigator.clipboard.writeText(`${window.location.origin}/r/${qr.short_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.download = `qrift-${qr?.short_code || "qr"}.png`;
    link.href = qrImage;
    link.click();
  };

  const deviceIcon = (type: string) => {
    if (type === "mobile") return <Smartphone className="w-4 h-4" />;
    if (type === "tablet") return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse space-y-6">
        <div className="h-8 bg-gray-100 rounded w-1/3" />
        <div className="h-64 bg-gray-50 rounded-2xl" />
      </div>
    );
  }

  if (!qr) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        ダッシュボードに戻る
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{qr.title || "無題のQRコード"}</h1>
          <p className="text-sm text-gray-500 mt-1">{qr.target_url}</p>
        </div>
        <Link
          href={`/qr/${qr.id}/edit`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-sky-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          編集
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
          {qrImage && (
            <img src={qrImage} alt="QR Code" className="w-48 h-48 rounded-lg mb-4" />
          )}

          {qr.short_code && (
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                <code className="text-xs text-sky-600 truncate">
                  {window.location.origin}/r/{qr.short_code}
                </code>
                <button onClick={copyUrl} className="shrink-0 ml-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 hover:text-indigo-500" />
                  )}
                </button>
              </div>
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                ダウンロード
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scan Count */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                <span className="text-sm text-gray-500">総スキャン数</span>
              </div>
              <p className="text-3xl font-bold">{totalScans}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                <span className="text-sm text-gray-500">作成日</span>
              </div>
              <p className="text-lg font-semibold">
                {new Date(qr.created_at).toLocaleDateString("ja-JP")}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              スキャン推移（過去30日）
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyScans}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(val) => val.slice(5)}
                    tick={{ fontSize: 10, fill: "#aaa" }}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#aaa" }} allowDecimals={false} />
                  <Tooltip
                    labelFormatter={(val) => val}
                    formatter={(val) => [`${val} スキャン`]}
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Stats */}
          {Object.keys(deviceStats).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">デバイス別</h3>
              <div className="space-y-3">
                {Object.entries(deviceStats).map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {deviceIcon(device)}
                      <span className="capitalize">{device === "unknown" ? "その他" : device}</span>
                    </div>
                    <span className="text-sm font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
