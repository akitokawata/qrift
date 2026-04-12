import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "ブログ | QRift - QRコード活用情報",
  description:
    "QRコードの作成・活用・効果測定に関する実践的なノウハウをお届けします。",
  openGraph: {
    title: "ブログ | QRift",
    description: "QRコードの作成・活用・効果測定に関する実践的なノウハウ。",
    url: "https://qrift.sarvest.jp/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 px-6 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 via-white to-white" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-sky-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-20 w-80 h-80 bg-emerald-100/15 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-sky-500 mb-4">
              Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="gradient-text">ブログ</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              QRコードの作成・活用・効果測定に関する
              <br className="hidden md:block" />
              実践的なノウハウをお届けします。
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-gray-400">記事はまだありません。</p>
          ) : (
            <div className="grid gap-5">
              {posts.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="group glass-card rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100/50"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-sky-600 transition-colors mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                          {post.description}
                        </p>
                        <time className="text-xs text-gray-400">{post.date}</time>
                      </div>
                      <div className="shrink-0 flex items-center">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 group-hover:translate-x-1 transition-transform">
                          読む
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
