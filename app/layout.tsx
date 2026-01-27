import type { Metadata } from "next";
import "./globals.css";

// ========================================
// アプリ情報（変更しやすいように一箇所にまとめる）
// ========================================
const APP_NAME = "ToDoo";

export const metadata: Metadata = {
  title: `${APP_NAME} - Support`,
  description: `${APP_NAME}アプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for ${APP_NAME} app.`,
  keywords: [APP_NAME, "support", "サポート", "FAQ", "ヘルプ", "help"],
  openGraph: {
    title: `${APP_NAME} - Support`,
    description: `${APP_NAME}アプリのサポートページです。`,
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
