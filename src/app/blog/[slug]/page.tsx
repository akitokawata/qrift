import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | QRift ブログ`,
      description: post.description,
    };
  } catch {
    return { title: "記事が見つかりません | QRift" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  // 関連記事を取得（同じタグを持つ記事、最大3件）
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "合同会社SARVEST",
      url: "https://sarvest.jp",
    },
    publisher: {
      "@type": "Organization",
      name: "合同会社SARVEST",
      url: "https://sarvest.jp",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://qrift.sarvest.jp/blog/${slug}`,
    },
    keywords: post.tags,
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="pt-28 pb-20 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 via-white to-white" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-cyan-100/15 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-40 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl" />

        <article className="max-w-3xl mx-auto relative">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-sky-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            ブログ一覧に戻る
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.2] mb-5">
              {post.title}
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-5">
              {post.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <time>{post.date}</time>
            </div>
          </header>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />

          {/* Article Body */}
          <div
            className="
              prose prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-100
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-600 prose-p:leading-[1.9] prose-p:mb-5
              prose-a:text-sky-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:decoration-sky-300
              prose-strong:text-gray-800 prose-strong:font-bold
              prose-ul:my-5 prose-ul:space-y-2
              prose-ol:my-5 prose-ol:space-y-2
              prose-li:text-gray-600 prose-li:leading-relaxed
              prose-blockquote:border-l-sky-400 prose-blockquote:bg-sky-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-gray-600
              prose-code:text-sky-700 prose-code:bg-sky-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-900 prose-pre:rounded-2xl prose-pre:shadow-lg
              prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-gray-100
              prose-th:bg-gray-50 prose-th:text-gray-700 prose-th:font-semibold prose-th:text-sm prose-th:px-4 prose-th:py-3
              prose-td:px-4 prose-td:py-3 prose-td:text-sm prose-td:text-gray-600 prose-td:border-t prose-td:border-gray-100
              prose-hr:border-gray-100 prose-hr:my-12
              prose-img:rounded-2xl prose-img:shadow-md
            "
          >
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 p-[1px]">
            <div className="rounded-[15px] bg-white p-8 md:p-10 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3 gradient-text">
                QRiftで今すぐQRコードを作成
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                登録不要・無料でQRコードを生成できます。動的QRコードでリンク先の変更も。
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5"
              >
                無料でQRコードを作成
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-lg font-bold text-gray-900 mb-6">関連記事</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group p-5 rounded-xl glass-card transition-all duration-300"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {rp.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-sky-600 transition-colors line-clamp-2">
                      {rp.title}
                    </h4>
                    <time className="text-xs text-gray-400 mt-2 block">{rp.date}</time>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
