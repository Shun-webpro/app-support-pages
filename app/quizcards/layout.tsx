import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "すごい問題集 - AIが問題を自動生成。資格・受験対策に。",
  description:
    "すごい問題集(SnapQuiz)は、写真や指示文からAIが問題を自動生成する学習アプリ。9種類の出題形式とエビングハウスの忘却曲線に基づく復習で、資格試験・受験勉強を効率化します。iPhone対応、App Storeで無料ダウンロード。",
  keywords: [
    "すごい問題集",
    "SnapQuiz",
    "QuizCards",
    "問題集アプリ",
    "AI問題作成",
    "資格試験",
    "受験勉強",
    "国家試験",
    "国試",
    "共通テスト",
    "暗記アプリ",
    "エビングハウス",
    "忘却曲線",
    "間隔反復",
    "スペースドリピティション",
    "quiz app",
    "exam prep",
  ],
  openGraph: {
    title: "すごい問題集 - AIが問題を自動生成。資格・受験対策に。",
    description:
      "写真や指示文からAIが問題を自動生成。9種類の出題形式と忘却曲線ベースの復習で、資格・受験勉強を効率化する学習アプリ。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "すごい問題集 - AIが問題を自動生成。資格・受験対策に。",
    description:
      "写真や指示文からAIが問題を自動生成。9種類の出題形式と忘却曲線ベースの復習で、資格・受験勉強を効率化する学習アプリ。",
  },
};

export default function QuizCardsLPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
