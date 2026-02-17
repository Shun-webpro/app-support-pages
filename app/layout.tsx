import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "サポート",
  description: "アプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for our apps.",
  keywords: ["support", "サポート", "FAQ", "ヘルプ", "help"],
  openGraph: {
    title: "サポート",
    description: "アプリのサポートページです。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}
