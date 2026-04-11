import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold gradient-text">QRift</span>
          <span className="text-sm text-gray-400">by SARVEST</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="https://sarvest.jp" target="_blank" className="hover:text-sky-600 transition-colors">
            SARVEST
          </Link>
          <Link href="https://sarvest.jp/privacy" target="_blank" className="hover:text-sky-600 transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="https://sarvest.jp/terms" target="_blank" className="hover:text-sky-600 transition-colors">
            利用規約
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} SARVEST LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
