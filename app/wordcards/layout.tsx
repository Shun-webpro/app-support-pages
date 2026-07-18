import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "すごい単語帳 - 写真を撮るだけでAI単語カード。忘却曲線で確実に覚える。",
  description:
    "すごい単語帳は、写真を撮るだけでAIが単語カードを自動作成する語学学習アプリ。エビングハウスの忘却曲線に基づく復習システムで、覚えた単語を長期記憶に定着させます。iPhone対応、App Storeで無料ダウンロード。",
  keywords: [
    "すごい単語帳",
    "WordCards",
    "単語帳",
    "英単語アプリ",
    "AI",
    "写真",
    "フラッシュカード",
    "エビングハウス",
    "忘却曲線",
    "間隔反復",
    "スペースドリピティション",
    "語学学習",
    "英語学習",
    "flashcard",
    "vocabulary app",
  ],
  openGraph: {
    title: "すごい単語帳 - 写真を撮るだけでAI単語カード",
    description:
      "写真を撮るだけでAIが単語カードを自動作成。エビングハウスの忘却曲線に基づく復習で、確実に記憶に残す語学学習アプリ。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "すごい単語帳 - 写真を撮るだけでAI単語カード",
    description:
      "写真を撮るだけでAIが単語カードを自動作成。エビングハウスの忘却曲線に基づく復習で、確実に記憶に残す語学学習アプリ。",
  },
};

export default function WordCardsLPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
