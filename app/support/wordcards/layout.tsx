import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordCards - Support",
  description:
    "WordCardsアプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for WordCards app.",
  keywords: ["WordCards", "support", "サポート", "FAQ", "ヘルプ", "help", "単語帳", "flashcard"],
  openGraph: {
    title: "WordCards - Support",
    description: "WordCardsアプリのサポートページです。",
    type: "website",
  },
};

export default function WordCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
