import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnapQuiz - Support",
  description:
    "SnapQuizアプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for SnapQuiz app.",
  keywords: ["SnapQuiz", "support", "サポート", "FAQ", "ヘルプ", "help", "クイズ", "問題作成", "学習"],
  openGraph: {
    title: "SnapQuiz - Support",
    description: "SnapQuizアプリのサポートページです。",
    type: "website",
  },
};

export default function SnapQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
