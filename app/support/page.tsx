"use client";

import { useState } from "react";
import Link from "next/link";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

const TRANSLATIONS: Record<Language, {
  title: string;
  subtitle: string;
  selectApp: string;
}> = {
  ja: {
    title: "サポート",
    subtitle: "サポートが必要なアプリを選択してください",
    selectApp: "アプリを選択",
  },
  en: {
    title: "Support",
    subtitle: "Select the app you need support for",
    selectApp: "Select App",
  },
};

// ========================================
// アプリ定義
// ========================================
const APPS: {
  id: string;
  name: Record<Language, string>;
  icon: string;
  href: string;
  description: Record<Language, string>;
}[] = [
  {
    id: "voka-king",
    name: { ja: "VOKA KING", en: "VOKA KING" },
    icon: "/voka_king.png",
    href: "/support/voka-king",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "speak-knock",
    name: { ja: "SpeakKnock", en: "SpeakKnock" },
    icon: "/speak_knock.png",
    href: "/support/speak-knock",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "flash-english",
    name: { ja: "Flash English", en: "Flash English" },
    icon: "/flashenglish.png",
    href: "/support/flash-english",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "pixvault",
    name: { ja: "KeyAlbum", en: "KeyAlbum" },
    icon: "/pixvault.png",
    href: "/support/pixvault",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "wordcards",
    name: { ja: "すごい単語帳", en: "WordCards" },
    icon: "/wordcards.png",
    href: "/wordcards",
    description: {
      ja: "写真を撮るだけでAI単語カード",
      en: "Photo to AI flashcard, instantly",
    },
  },
  {
    id: "snapquiz",
    name: { ja: "すごい問題集", en: "SnapQuiz" },
    icon: "/quizcards.png",
    href: "/quizcards",
    description: {
      ja: "AIが作る、資格・受験対策問題集",
      en: "AI-built questions for exam prep",
    },
  },
  {
    id: "studelog",
    name: { ja: "StudyLog", en: "StudyLog" },
    icon: "/studelog.png",
    href: "/support/studelog",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "snapnote",
    name: { ja: "SnapNote", en: "SnapNote" },
    icon: "/snapnote.png",
    href: "/support/snapnote",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "calendarmemo",
    name: { ja: "カレンダーメモ", en: "カレンダーメモ" },
    icon: "/calendermemo.png",
    href: "/support/calendarmemo",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "workplan",
    name: { ja: "WorkPlan", en: "WorkPlan" },
    icon: "/workplan.png",
    href: "/support/workplan",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "dairygram",
    name: { ja: "Dairygram", en: "Dairygram" },
    icon: "/Dairygram.png",
    href: "/support/dairygram",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
  {
    id: "resume",
    name: { ja: "履歴書", en: "履歴書" },
    icon: "/resume.png",
    href: "/support/resume",
    description: {
      ja: "サポート・FAQ・お問い合わせ",
      en: "Support, FAQ & Contact",
    },
  },
];

// ========================================
// コンポーネント
// ========================================
function LanguageSelector({
  currentLang,
  onChangeLang,
}: {
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChangeLang(lang.code)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentLang === lang.code
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function SupportHubPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* アプリ一覧カード */}
        <div className="grid gap-4">
          {APPS.map((app) => (
            <Link
              key={app.id}
              href={app.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <img
                src={app.icon}
                alt={app.name[lang]}
                className="w-16 h-16 rounded-2xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-800">
                  {app.name[lang]}
                </h2>
                <p className="text-sm text-gray-500">{app.description[lang]}</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* フッター */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-2xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {currentYear} Support. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
