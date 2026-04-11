"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Link2, Type, Loader2, Trash2 } from "lucide-react";

export default function EditQRPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadQR();
  }, [id]);

  async function loadQR() {
    const { data } = await supabase
      .from("qr_codes")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      router.push("/dashboard");
      return;
    }

    setTitle(data.title || "");
    setTargetUrl(data.target_url);
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("qr_codes")
      .update({
        title: title || null,
        target_url: targetUrl,
      })
      .eq("id", id);

    if (updateError) {
      setError("更新に失敗しました");
    } else {
      setSuccess("更新しました！");
      setTimeout(() => setSuccess(""), 3000);
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("このQRコードを削除しますか？スキャンログも削除されます。")) return;
    setDeleting(true);

    await supabase.from("qr_codes").delete().eq("id", id);
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-1/3 mb-8" />
        <div className="space-y-4">
          <div className="h-12 bg-gray-50 rounded-xl" />
          <div className="h-12 bg-gray-50 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href={`/qr/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        詳細に戻る
      </Link>

      <h1 className="text-2xl font-bold mb-8">QRコードを編集</h1>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            タイトル
          </label>
          <div className="relative">
            <Type className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトルを入力"
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
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            変更するとすぐに反映されます。QRコードの印刷し直しは不要です。
          </p>
        </div>

        {error && <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        {success && <p className="text-sm text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2">{success}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "保存"}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-red-600 mb-3">危険な操作</h3>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "削除中..." : "このQRコードを削除"}
        </button>
      </div>
    </div>
  );
}
