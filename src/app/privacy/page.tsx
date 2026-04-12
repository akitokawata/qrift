import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー | QRift",
  description: "QRiftのプライバシーポリシー。個人情報の取扱いについて定めます。",
  robots: { index: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 px-6 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 via-white to-white" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
            <span className="gradient-text">プライバシーポリシー</span>
          </h1>

          <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
            <p>
              合同会社SARVEST（以下「当社」といいます。）は、当社が運営するQRコード管理サービス「QRift」（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第1条（事業者情報）</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>事業者名: 合同会社SARVEST</li>
                <li>代表社員: 川田瑛都</li>
                <li>所在地: 大阪府大阪市</li>
                <li>連絡先: info@sarvest.jp</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第2条（収集する個人情報）</h2>
              <p>当社は、本サービスを通じて以下の個人情報を収集することがあります。</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>メールアドレス（アカウント登録時）</li>
                <li>QRコードスキャンログ（IPアドレス、User-Agent、デバイス情報、スキャン日時）</li>
                <li>QRコードに設定されたリダイレクト先URL</li>
                <li>Cookie情報、アクセスログ等のウェブ閲覧情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第3条（利用目的）</h2>
              <p>当社は、収集した個人情報を以下の目的で利用いたします。</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>本サービスの提供・運営（QRコードの生成、管理、リダイレクト処理）</li>
                <li>QRコードスキャン解析機能の提供（スキャン回数、デバイス別統計等）</li>
                <li>ユーザー認証およびアカウント管理</li>
                <li>サービスの改善・新機能の開発</li>
                <li>当社からのお知らせ・サービスに関する情報提供</li>
                <li>お問い合わせへの対応</li>
                <li>利用料金の請求（有料プランの場合）</li>
                <li>その他、上記利用目的に付随する業務</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第4条（第三者提供）</h2>
              <p>
                当社は、以下の場合を除き、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合であって、ユーザーの同意を得ることが困難な場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
              <p className="mt-4">なお、当社では以下の外部サービスを利用しており、これに伴いユーザーの情報が当該サービスの提供者に送信されることがあります。</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Supabase</strong>（データベース・認証基盤）: ユーザーアカウント情報、QRコードデータ、スキャンログの保存・管理に使用しています。
                </li>
                <li>
                  <strong>Vercel</strong>（ホスティング）: 本サービスのウェブサイトのホスティングに使用しています。
                </li>
                <li>
                  <strong>Resend</strong>（メール配信サービス）: 認証メールやお知らせの送信に使用しています。
                </li>
                <li>
                  <strong>Stripe</strong>（決済サービス）: 有料プランの決済処理に使用しています（将来導入予定）。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第5条（Cookie・アクセス解析ツールの使用）</h2>
              <p>
                本サービスでは、ユーザーの利便性向上およびサービス改善のために、Cookieを使用してアクセス情報を収集しています。これらの情報は、個人を特定するものではありません。
              </p>
              <p className="mt-2">
                ユーザーはブラウザの設定によりCookieの受け取りを拒否することができます。ただし、Cookieを無効にした場合、本サービスの一部の機能が正常に動作しない場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第6条（個人情報の管理・安全管理措置）</h2>
              <p>
                当社は、ユーザーの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、適切な安全管理措置を講じます。データの保存にはSSL/TLS暗号化通信を使用し、パスワードはハッシュ化して保存しています。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第7条（開示・訂正・削除請求）</h2>
              <p>
                ユーザーは、当社が保有する自己の個人情報について、開示・訂正・追加・削除・利用停止を請求することができます。また、ユーザーはアカウント設定画面から自身のデータを削除することが可能です。ご請求の際は、以下の連絡先までメールにてご連絡ください。本人確認を行ったうえで、合理的な期間内に対応いたします。
              </p>
              <p className="mt-2">
                連絡先: <a href="mailto:info@sarvest.jp" className="text-sky-600 hover:underline">info@sarvest.jp</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第8条（プライバシーポリシーの変更）</h2>
              <p>
                当社は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本サービスのウェブサイトに掲載した時点から効力を生じるものとします。重要な変更がある場合は、本サービス上でお知らせいたします。
              </p>
            </section>

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
