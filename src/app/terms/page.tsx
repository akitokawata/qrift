import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "利用規約 | QRift",
  description: "QRiftの利用規約。QRコード管理サービスの利用条件を定めます。",
  robots: { index: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20 px-6 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 via-white to-white" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
            <span className="gradient-text">利用規約</span>
          </h1>

          <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
            <p>
              この利用規約（以下「本規約」といいます。）は、合同会社SARVEST（以下「当社」といいます。）が運営するQRコード管理サービス「QRift」（以下「本サービス」といいます。）の利用に関する条件を定めるものです。本サービスをご利用いただくことにより、本規約に同意したものとみなします。
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第1条（サービスの内容）</h2>
              <p>本サービスでは、以下の機能を提供しています。</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>QRコードの生成（静的・動的）</li>
                <li>動的QRコードのリダイレクト先URL変更</li>
                <li>QRコードスキャン解析（スキャン回数、デバイス情報、地域情報等の統計）</li>
                <li>QRコードのデザインカスタマイズ</li>
                <li>QRコードの一括管理</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第2条（アカウント登録）</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>本サービスの一部機能を利用するには、アカウント登録が必要です。</li>
                <li>ユーザーは、正確かつ最新の情報を登録するものとし、登録情報に変更があった場合は速やかに更新するものとします。</li>
                <li>アカウントの管理はユーザーの責任で行うものとし、第三者に利用させてはなりません。</li>
                <li>アカウントの不正利用により生じた損害について、当社は一切の責任を負いません。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第3条（無料プラン・有料プラン）</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>本サービスには無料プランと有料プランがあります。各プランの内容・制限は料金ページに記載のとおりです。</li>
                <li>無料プランには、QRコード作成数、動的QRコード数、スキャン解析の保存期間等に制限があります。</li>
                <li>有料プランの料金、支払方法、解約条件等については、料金ページおよび特定商取引法に基づく表記をご確認ください。</li>
                <li>当社は、無料プランの内容を予告なく変更できるものとします。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第4条（禁止事項）</h2>
              <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>違法なコンテンツやウェブサイトへのリダイレクトにQRコードを使用する行為</li>
                <li>フィッシング、詐欺、マルウェア配布等の目的でQRコードを使用する行為</li>
                <li>スパムやユーザーの意図に反する大量のQRコード生成</li>
                <li>当社または第三者の知的財産権、プライバシー権、名誉権その他の権利を侵害する行為</li>
                <li>本サービスのサーバーまたはネットワークの機能を破壊・妨害する行為</li>
                <li>不正アクセスまたはこれを試みる行為</li>
                <li>APIの過負荷を引き起こす大量リクエストの送信</li>
                <li>他のユーザーのアカウントへの不正アクセス</li>
                <li>当社のサービスに関連して、反社会的勢力に直接的または間接的に利益を供与する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第5条（免責事項）</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>当社は、QRコードの読み取り精度について、いかなる環境においても正常に機能することを保証するものではありません。印刷品質、表示デバイス、読み取りアプリ等の環境により、QRコードが正しく読み取れない場合があります。</li>
                <li>当社は、動的QRコードのリダイレクト先URLの可用性について保証いたしません。リダイレクト先のウェブサイトの障害・停止等について、当社は一切の責任を負いません。</li>
                <li>当社は、本サービスの利用に起因してユーザーに生じたいかなる損害についても、当社に故意または重大な過失がある場合を除き、一切の責任を負いません。</li>
                <li>当社は、本サービスの提供の停止、中断、変更、終了等により、ユーザーまたは第三者に損害が生じた場合であっても、一切の責任を負いません。</li>
                <li>当社は、ユーザーと第三者との間において生じた取引、連絡または紛争等について、一切の責任を負いません。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第6条（サービスの変更・中断・終了）</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>当社は、事前の通知なく本サービスの内容を変更し、または提供を中断・終了することができるものとします。</li>
                <li>サービス終了の場合、当社は合理的な期間をもってユーザーに事前通知するよう努めます。</li>
                <li>ユーザーは、サービス終了前に必要なデータをエクスポートする責任を負うものとします。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第7条（知的財産権）</h2>
              <p>
                本サービスに関するテキスト、画像、デザイン、ロゴ、プログラムその他のコンテンツに関する著作権、商標権その他の知的財産権は、当社または正当な権利を有する第三者に帰属します。
              </p>
              <p className="mt-2">
                ユーザーが本サービスを利用して生成したQRコードの利用権はユーザーに帰属します。ただし、QRコードの生成に使用された当社のデザインテンプレート等の知的財産権は当社に帰属します。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第8条（利用規約の変更）</h2>
              <p>
                当社は、必要に応じて本規約を変更することがあります。変更後の利用規約は、本サービスのウェブサイトに掲載した時点から効力を生じるものとします。重要な変更がある場合は、本サービス上でお知らせいたします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">第9条（準拠法・管轄裁判所）</h2>
              <p>
                本規約の解釈は日本法に準拠するものとします。本サービスの利用に関して紛争が生じた場合には、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。
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
