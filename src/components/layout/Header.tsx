"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-sky-500/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="QRift" width={36} height={36} className="rounded-lg" />
          <span className="text-2xl font-extrabold tracking-tight gradient-text">QRift</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors"
          >
            機能
          </a>
          <a
            href="#generator"
            className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors"
          >
            QR作成
          </a>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors"
          >
            料金
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors"
          >
            ブログ
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:shadow-lg hover:shadow-sky-500/30 transition-all hover:-translate-y-0.5"
          >
            無料で始める
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="メニュー"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-gray-800"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-gray-800"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-gray-800"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-200"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-sky-600"
              >
                機能
              </a>
              <a
                href="#generator"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-sky-600"
              >
                QR作成
              </a>
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-sky-600"
              >
                料金
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-sky-600"
              >
                ブログ
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-gray-700 hover:text-sky-600"
              >
                ログイン
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white text-center bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500"
              >
                無料で始める
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
