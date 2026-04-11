import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllPosts } from "@/lib/blog";

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
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-center">
            <span className="gradient-text">ブログ</span>
          </h1>
          <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            QRコードの作成・活用・効果測定に関する実践的なノウハウをお届けします。
          </p>

          {posts.length === 0 ? (
            <p className="text-center text-gray-400">記事はまだありません。</p>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    <time className="text-xs text-gray-400">{post.date}</time>
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
