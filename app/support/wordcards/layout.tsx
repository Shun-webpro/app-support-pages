import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "すごい単語帳 - Support",
  description:
    "すごい単語帳アプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for WordCards app.",
  keywords: ["すごい単語帳", "WordCards", "support", "サポート", "FAQ", "ヘルプ", "help", "単語帳", "flashcard"],
  openGraph: {
    title: "すごい単語帳 - Support",
    description: "すごい単語帳アプリのサポートページです。",
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
