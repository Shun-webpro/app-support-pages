import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flash English - Support",
  description:
    "Flash Englishアプリのサポートページです。よくある質問やお問い合わせ方法をご案内します。Support page for Flash English app.",
  keywords: ["Flash English", "support", "サポート", "FAQ", "ヘルプ", "help", "英語学習"],
  openGraph: {
    title: "Flash English - Support",
    description: "Flash Englishアプリのサポートページです。",
    type: "website",
  },
};

export default function FlashEnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
