import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpeakKnock - Support",
  description:
    "SpeakKnockアプリのサポートページです。よくある質問とお問い合わせ方法をご案内します。Support page for SpeakKnock app.",
  keywords: ["SpeakKnock", "support", "サポート", "FAQ", "英語", "スピーキング", "speaking", "English"],
  openGraph: {
    title: "SpeakKnock - Support",
    description: "SpeakKnockアプリのサポートページです。",
    type: "website",
  },
};

export default function SpeakKnockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
