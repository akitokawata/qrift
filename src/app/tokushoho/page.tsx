import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | QRift",
  description: "QRiftの特定商取引法に基づく表記。",
  robots: { index: true },
};

export default function TokushohoPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 px-6 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 via-white to-white" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
            <span className="gradient-text">特定商取引法に基づく表記</span>
          </h1>

          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">販売事業者</th>
                    <td className="px-6 py-4 text-gray-600">合同会社SARVEST</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">代表者</th>
                    <td className="px-6 py-4 text-gray-600">川田瑛都</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">所在地</th>
                    <td className="px-6 py-4 text-gray-600">
                      大阪府大阪市<br />
                      <span className="text-xs text-gray-400">※詳細住所は請求があった場合に遅滞なく開示いたします。</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">連絡先</th>
                    <td className="px-6 py-4 text-gray-600">
                      メール: <a href="mailto:info@sarvest.jp" className="text-sky-600 hover:underline">info@sarvest.jp</a><br />
                      <span className="text-xs text-gray-400">※電話番号は請求があった場合に遅滞なく開示いたします。</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">販売価格</th>
                    <td className="px-6 py-4 text-gray-600">
                      各プランの料金は<a href="/pricing" className="text-sky-600 hover:underline">料金ページ</a>に記載のとおりです。<br />
                      表示価格は税込みです。
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">販売価格以外の必要料金</th>
                    <td className="px-6 py-4 text-gray-600">
                      インターネット接続に必要な通信費はお客様のご負担となります。
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">支払方法</th>
                    <td className="px-6 py-4 text-gray-600">
                      クレジットカード（Stripe経由）
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">支払時期</th>
                    <td className="px-6 py-4 text-gray-600">
                      月額プラン: 毎月自動課金<br />
                      年額プラン: 年1回自動課金
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">サービス提供時期</th>
                    <td className="px-6 py-4 text-gray-600">
                      お申し込み手続き完了後、直ちにご利用いただけます。
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">返品・キャンセル</th>
                    <td className="px-6 py-4 text-gray-600">
                      デジタルサービスのため、返品には対応しておりません。<br />
                      月額・年額サブスクリプションは、いつでも解約可能です。解約後も契約期間の終了まではサービスをご利用いただけます。
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-gray-50 text-left px-6 py-4 font-semibold text-gray-700 w-1/3 align-top">動作環境</th>
                    <td className="px-6 py-4 text-gray-600">
                      最新版のGoogle Chrome、Safari、Firefox、Microsoft Edgeを推奨します。<br />
                      インターネット接続が必要です。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-12">
              制定日: 2026年4月11日
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
