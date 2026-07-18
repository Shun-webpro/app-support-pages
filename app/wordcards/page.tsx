"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/wordcards.png";
import screenshotList from "@/app/images/wordcards.lp/IMG_9451.png";
import screenshotQuiz from "@/app/images/wordcards.lp/IMG_9452.png";
import screenshotReview from "@/app/images/wordcards.lp/IMG_9453.png";

// ========================================
// 設定値
// ========================================
const APP_STORE_URL = "https://apps.apple.com/app/id6762557789";
const SUPPORT_URL = "/support/wordcards";
const PRIVACY_URL = "/support/wordcards/privacy";
const HUB_URL = "/support";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en";

const COPY: Record<
  Language,
  {
    nav: { support: string; privacy: string; download: string };
    hero: {
      badge: string;
      title: string[];
      highlight: string;
      subtitle: string;
      ctaPrimaryNote: string;
      ctaSecondary: string;
      proof: { icon: string; label: string }[];
    };
    marquee: { icon: string; label: string }[];
    stats: { value: number; suffix?: string; label: string; icon: string }[];
    steps: {
      eyebrow: string;
      title: string;
      items: { emoji: string; title: string; desc: string }[];
    };
    feature1: {
      eyebrow: string;
      title: string;
      desc: string;
      bullets: string[];
    };
    feature2: {
      eyebrow: string;
      title: string;
      desc: string;
      stages: { label: string; sub: string }[];
      note: string;
    };
    feature3: {
      eyebrow: string;
      title: string;
      desc: string;
      modes: { icon: string; label: string }[];
    };
    bento: {
      eyebrow: string;
      title: string;
      items: { icon: string; title: string; desc: string }[];
    };
    plans: {
      eyebrow: string;
      title: string;
      desc: string;
      tiers: {
        name: string;
        tagline: string;
        highlight?: boolean;
        features: string[];
      }[];
      note: string;
    };
    finalCta: {
      title: string;
      subtitle: string;
      note: string;
    };
    footer: {
      tagline: string;
      linksTitle: string;
      allApps: string;
      rights: string;
    };
    stickyBar: { title: string; subtitle: string; cta: string };
  }
> = {
  ja: {
    nav: { support: "サポート", privacy: "プライバシーポリシー", download: "入手する" },
    hero: {
      badge: "AI搭載・語学学習アプリ",
      title: ["撮るだけで、", "覚えるだけ。"],
      highlight: "覚えるだけ。",
      subtitle:
        "教科書やプリントを写真に撮るだけで、AIが単語カードを自動作成。あとはエビングハウスの忘却曲線に基づく復習システムが、ベストなタイミングで思い出させてくれる。",
      ctaPrimaryNote: "iPhone対応・App Storeで公開中",
      ctaSecondary: "使い方を見る",
      proof: [
        { icon: "cameraFlash", label: "写真1枚でカード化" },
        { icon: "target", label: "5種類のクイズモード" },
        { icon: "globe", label: "22言語のUIに対応" },
      ],
    },
    marquee: [
      { icon: "camera", label: "写真を撮るだけ" },
      { icon: "robot", label: "AIが自動でカード化" },
      { icon: "brain", label: "忘却曲線で復習" },
      { icon: "target", label: "5種類のクイズモード" },
      { icon: "crayon", label: "赤シートで自己テスト" },
      { icon: "globe", label: "22言語のUIに対応" },
      { icon: "lock", label: "データは端末内に保存" },
    ],
    stats: [
      { value: 3, label: "ステップで完成", icon: "sparkles" },
      { value: 5, label: "種類のクイズモード", icon: "target" },
      { value: 4, label: "段階の復習ステージ", icon: "brain" },
      { value: 22, label: "言語のUIに対応", icon: "globe" },
    ],
    steps: {
      eyebrow: "HOW IT WORKS",
      title: "使い方はたったの3ステップ",
      items: [
        {
          emoji: "camera",
          title: "撮る",
          desc: "教科書・プリント・単語帳をカメラで撮影。マーカーやチェックで覚えたい単語だけを指定することもできます。",
        },
        {
          emoji: "robot",
          title: "AIが自動生成",
          desc: "意味・発音記号・例文・関連語・語源まで、AIが自動で単語カードを作成。入力の手間はゼロ。",
        },
        {
          emoji: "brain",
          title: "忘却曲線で復習",
          desc: "1日後→1週間後→1ヶ月後→3ヶ月後。最適なタイミングで復習をリマインドし、記憶に定着させます。",
        },
      ],
    },
    feature1: {
      eyebrow: "PHOTO TO CARD",
      title: "写真を撮るだけで、単語カードが完成する",
      desc:
        "単語を一つずつ手入力する必要はもうありません。教科書のページやテスト、プリントにカメラを向けるだけで、AIが単語を読み取り、意味・発音記号・例文・関連語・語源まで自動で入力したカードを作成します。マーカーやチェック印で覚えたい単語だけを選んで撮影することも可能です。",
      bullets: [
        "カメラ撮影・写真ライブラリの両方に対応",
        "マーカー／チェック／ばつ印で対象の単語を指定",
        "意味・発音記号・例文・関連語・語源をAIが自動入力",
        "Premiumプランでは学習用イラストも自動生成",
      ],
    },
    feature2: {
      eyebrow: "SPACED REPETITION",
      title: "エビングハウスの忘却曲線で、確実に記憶へ",
      desc:
        "せっかく覚えた単語も、復習しなければ忘れてしまいます。すごい単語帳は心理学者エビングハウスの忘却曲線に基づいた間隔反復（スペースドリピティション）を採用。カードを確認すると自動で復習スケジュールに登録され、最適なタイミングで通知します。",
      stages: [
        { label: "初回", sub: "学習" },
        { label: "1日後", sub: "1回目の復習" },
        { label: "1週間後", sub: "2回目の復習" },
        { label: "1ヶ月後", sub: "3回目の復習" },
        { label: "3ヶ月後", sub: "定着完了" },
      ],
      note: "「覚えた！」を選ぶと次のステージへ、「もう一度」を選ぶと翌日に再登場。無理なく、確実に長期記憶へ。",
    },
    feature3: {
      eyebrow: "5 QUIZ MODES",
      title: "5種類のクイズで、飽きずに続けられる",
      desc: "同じ単語でも角度を変えてテストされることで、記憶の定着率がぐっと高まります。気分やシーンに合わせてモードを選べます。",
      modes: [
        { icon: "letters", label: "母国語 → 学習言語" },
        { icon: "globe", label: "学習言語 → 母国語" },
        { icon: "headphone", label: "音声 → 母国語" },
        { icon: "keyboard", label: "スペリング入力" },
        { icon: "framedPicture", label: "画像で選択" },
      ],
    },
    bento: {
      eyebrow: "MORE FEATURES",
      title: "学習を加速する、細部までのこだわり",
      items: [
        {
          icon: "cardIndex",
          title: "自由なデッキ管理",
          desc: "学習言語やカラーを設定して、目的別にデッキを作成・整理できます。",
        },
        {
          icon: "bookmark",
          title: "ブックマーク & 絞り込み",
          desc: "重要な単語をブックマークし、品詞や復習回数で自在にフィルタリング。",
        },
        {
          icon: "crayon",
          title: "赤シート機能",
          desc: "紙の単語帳のように、答えを隠して自分の記憶をテストできます。",
        },
        {
          icon: "speaker",
          title: "音声読み上げ",
          desc: "TTSで正しい発音を確認しながら、耳からも記憶に残せます。",
        },
        {
          icon: "moon",
          title: "ダークモード対応",
          desc: "夜の学習や電車の中でも目に優しい表示に自動で切り替わります。",
        },
        {
          icon: "lock",
          title: "データは端末内に保存",
          desc: "アカウント登録は不要。学習データはすべて端末内にのみ保存されます。",
        },
      ],
    },
    plans: {
      eyebrow: "PLANS",
      title: "まずは無料で、気軽に始められる",
      desc: "アカウント登録不要。今すぐダウンロードして、無料プランから始められます。",
      tiers: [
        {
          name: "Free",
          tagline: "まずはここから",
          features: [
            "デッキ作成・クイズ・復習機能は無制限",
            "AI自動入力 月10回まで",
            "写真スキャンでカード作成 月4回まで",
            "スペリング／穴埋めクイズ 月3回まで",
          ],
        },
        {
          name: "Pro",
          tagline: "もっと自由に学びたい人へ",
          highlight: true,
          features: [
            "Freeの全機能に加えて",
            "写真スキャンが週10回まで拡大",
            "AI自動入力の利用枠が拡大",
            "広告なしで快適に学習",
          ],
        },
        {
          name: "Premium",
          tagline: "AIをフル活用したい人へ",
          features: [
            "AI自動入力・写真スキャンが無制限",
            "学習用イラストをAIが自動生成",
            "すべての機能にアクセス可能",
            "最速で単語帳を充実させたい方に",
          ],
        },
      ],
      note: "詳しい価格はApp内でご確認いただけます。購入はいつでもApp Storeの設定から解約できます。",
    },
    finalCta: {
      title: "今日から、忘れない英単語学習を。",
      subtitle: "写真を撮って、AIにおまかせ。復習のタイミングもすごい単語帳が教えてくれます。",
      note: "iPhone対応・無料でダウンロードできます",
    },
    footer: {
      tagline: "写真を撮るだけで、AIが単語カードを自動作成。",
      linksTitle: "リンク",
      allApps: "他のアプリを見る",
      rights: "All rights reserved.",
    },
    stickyBar: { title: "すごい単語帳", subtitle: "写真を撮るだけでAI単語カード", cta: "入手する" },
  },
  en: {
    nav: { support: "Support", privacy: "Privacy Policy", download: "Get the App" },
    hero: {
      badge: "AI-Powered Language Learning",
      title: ["Snap a photo.", "Remember forever."],
      highlight: "Remember forever.",
      subtitle:
        "Just take a photo of your textbook or worksheet, and AI instantly builds flashcards for you. A spaced-repetition review system based on the Ebbinghaus forgetting curve brings each word back at exactly the right moment.",
      ctaPrimaryNote: "Available on the App Store for iPhone",
      ctaSecondary: "See how it works",
      proof: [
        { icon: "cameraFlash", label: "Photo to flashcard in seconds" },
        { icon: "target", label: "5 quiz modes" },
        { icon: "globe", label: "UI available in 22 languages" },
      ],
    },
    marquee: [
      { icon: "camera", label: "Snap a photo" },
      { icon: "robot", label: "AI builds the card" },
      { icon: "brain", label: "Review with the forgetting curve" },
      { icon: "target", label: "5 quiz modes" },
      { icon: "crayon", label: "Red-sheet self-testing" },
      { icon: "globe", label: "UI in 22 languages" },
      { icon: "lock", label: "Data stays on your device" },
    ],
    stats: [
      { value: 3, label: "simple steps", icon: "sparkles" },
      { value: 5, label: "quiz modes", icon: "target" },
      { value: 4, label: "review stages", icon: "brain" },
      { value: 22, label: "languages supported", icon: "globe" },
    ],
    steps: {
      eyebrow: "HOW IT WORKS",
      title: "Just 3 simple steps",
      items: [
        {
          emoji: "camera",
          title: "Snap",
          desc: "Photograph a textbook page, worksheet, or vocabulary list. Mark words with a highlighter or check mark to capture only the ones you need.",
        },
        {
          emoji: "robot",
          title: "AI builds your cards",
          desc: "Meaning, phonetics, example sentences, related words, and etymology — all generated automatically. Zero manual typing.",
        },
        {
          emoji: "brain",
          title: "Review with the forgetting curve",
          desc: "1 day, 1 week, 1 month, then 3 months later — you're reminded at the ideal moment to lock each word into long-term memory.",
        },
      ],
    },
    feature1: {
      eyebrow: "PHOTO TO CARD",
      title: "A photo is all it takes to build a flashcard",
      desc:
        "No more typing words in one by one. Just point your camera at a textbook page, test, or worksheet — AI reads the words and creates cards complete with meaning, phonetics, example sentences, related words, and etymology. You can even mark specific words with a highlighter, check, or cross to select exactly which ones to capture.",
      bullets: [
        "Works with both camera capture and your photo library",
        "Mark words with highlighter / check / cross to select targets",
        "AI auto-fills meaning, phonetics, examples, related words & etymology",
        "Premium plan also generates learning illustrations automatically",
      ],
    },
    feature2: {
      eyebrow: "SPACED REPETITION",
      title: "The Ebbinghaus forgetting curve, built in",
      desc:
        "Even the words you learn today will fade without review. WordCards uses spaced repetition based on psychologist Hermann Ebbinghaus's forgetting curve. The moment you review a card, it's automatically scheduled for the next review at exactly the right time.",
      stages: [
        { label: "Day 0", sub: "First study" },
        { label: "+1 day", sub: "1st review" },
        { label: "+1 week", sub: "2nd review" },
        { label: "+1 month", sub: "3rd review" },
        { label: "+3 months", sub: "Mastered" },
      ],
      note: "Tap \"Got it\" to advance to the next stage, or \"Again\" to see it tomorrow — a steady, sustainable path to long-term memory.",
    },
    feature3: {
      eyebrow: "5 QUIZ MODES",
      title: "5 quiz modes keep learning fresh",
      desc: "Being tested on the same word from different angles dramatically improves retention. Pick the mode that fits your mood or moment.",
      modes: [
        { icon: "letters", label: "Native → Target language" },
        { icon: "globe", label: "Target → Native language" },
        { icon: "headphone", label: "Audio → Native language" },
        { icon: "keyboard", label: "Type the spelling" },
        { icon: "framedPicture", label: "Match the image" },
      ],
    },
    bento: {
      eyebrow: "MORE FEATURES",
      title: "Every detail built to help you learn faster",
      items: [
        {
          icon: "cardIndex",
          title: "Flexible deck management",
          desc: "Create and organize decks by language and color for any purpose.",
        },
        {
          icon: "bookmark",
          title: "Bookmarks & filters",
          desc: "Bookmark important words and filter freely by part of speech or review count.",
        },
        {
          icon: "crayon",
          title: "Red-sheet mode",
          desc: "Hide the answers just like a paper flashcard book to truly test yourself.",
        },
        {
          icon: "speaker",
          title: "Text-to-speech",
          desc: "Hear the correct pronunciation with TTS to reinforce memory by ear.",
        },
        {
          icon: "moon",
          title: "Dark mode",
          desc: "Automatically switches to an eye-friendly display for night study sessions.",
        },
        {
          icon: "lock",
          title: "Stored on your device",
          desc: "No account required. All your learning data stays on your device only.",
        },
      ],
    },
    plans: {
      eyebrow: "PLANS",
      title: "Start free, upgrade anytime",
      desc: "No sign-up required. Download now and start on the Free plan.",
      tiers: [
        {
          name: "Free",
          tagline: "The best place to start",
          features: [
            "Unlimited decks, quizzes & reviews",
            "AI auto-fill up to 10 times / month",
            "Photo scan up to 4 times / month",
            "Spelling / fill-in-the-blank quiz up to 3 times / month",
          ],
        },
        {
          name: "Pro",
          tagline: "For learners who want more freedom",
          highlight: true,
          features: [
            "Everything in Free, plus",
            "Photo scan expanded to 10 times / week",
            "A larger AI auto-fill allowance",
            "A cleaner, ad-free study experience",
          ],
        },
        {
          name: "Premium",
          tagline: "For unlimited AI power",
          features: [
            "Unlimited AI auto-fill and photo scanning",
            "AI-generated learning illustrations",
            "Full access to every feature",
            "Build your deck as fast as possible",
          ],
        },
      ],
      note: "See exact pricing in the app. Manage or cancel your subscription anytime from the App Store settings.",
    },
    finalCta: {
      title: "Start learning words you'll never forget.",
      subtitle: "Snap a photo, let AI handle the rest — WordCards will tell you exactly when to review.",
      note: "Available now on the App Store for iPhone",
    },
    footer: {
      tagline: "Snap a photo and let AI build your flashcards.",
      linksTitle: "Links",
      allApps: "See our other apps",
      rights: "All rights reserved.",
    },
    stickyBar: { title: "WordCards", subtitle: "Photo to AI flashcard, instantly", cta: "Get the App" },
  },
};

// ========================================
// 汎用UI部品
// ========================================
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function AppleLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function AppStoreButton({
  size = "lg",
  className = "",
}: {
  size?: "lg" | "md";
  className?: string;
}) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-2xl bg-black text-white shadow-lg shadow-black/25 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-blue-900/30 active:scale-95 ${
        size === "lg" ? "px-6 py-3.5" : "px-4 py-2.5"
      } ${className}`}
    >
      <AppleLogo className={size === "lg" ? "w-7 h-7 shrink-0" : "w-5 h-5 shrink-0"} />
      <span className="flex flex-col items-start leading-none">
        <span className={`opacity-80 ${size === "lg" ? "text-[11px]" : "text-[9px]"}`}>
          Download on the
        </span>
        <span className={`font-semibold tracking-tight ${size === "lg" ? "text-xl" : "text-base"}`}>
          App Store
        </span>
      </span>
    </a>
  );
}

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 ring-1 ring-inset ring-blue-100">
      {children}
    </span>
  );
}

// ========================================
// OpenMoji（CC BY-SA 4.0 / https://openmoji.org）
// ネイティブ絵文字はOS・ブラウザごとに見た目がバラつくため、
// 全端末で統一されたフラットデザインのOpenMojiで表示する。
// ========================================
const OPENMOJI_VERSION = "15.1.0";

const EMOJI = {
  camera: "1F4F7",
  robot: "1F916",
  brain: "1F9E0",
  letters: "1F524",
  globe: "1F310",
  headphone: "1F3A7",
  keyboard: "2328",
  framedPicture: "1F5BC",
  cardIndex: "1F5C2",
  bookmark: "1F516",
  crayon: "1F58D",
  speaker: "1F50A",
  moon: "1F319",
  lock: "1F512",
  check: "2705",
  cross: "274C",
  star: "2B50",
  cameraFlash: "1F4F8",
  books: "1F4DA",
  rocket: "1F680",
  bulb: "1F4A1",
  target: "1F3AF",
  chart: "1F4C8",
  sparkles: "2728",
  fire: "1F525",
  trophy: "1F3C6",
} as const;

type EmojiName = keyof typeof EMOJI;

function Emoji({
  name,
  label,
  size = 28,
  className = "",
}: {
  name: EmojiName;
  label: string;
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.jsdelivr.net/npm/openmoji@${OPENMOJI_VERSION}/color/svg/${EMOJI[name]}.svg`}
      alt={label}
      width={size}
      height={size}
      loading="lazy"
      draggable={false}
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

function StatCounter({
  value,
  suffix = "",
  label,
  icon,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: EmojiName;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <Reveal delay={delay} className="flex flex-col items-center gap-2 text-center">
      <div ref={ref} className="flex items-center gap-2">
        <Emoji name={icon} label={label} size={30} className="animate-drift" />
        <span className="text-3xl font-extrabold tabular-nums text-slate-900 sm:text-4xl">
          {count}
          {suffix}
        </span>
      </div>
      <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
    </Reveal>
  );
}

function Marquee({ items }: { items: { icon: EmojiName; label: string }[] }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-slate-100 bg-white py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
      <div className="flex w-max animate-marquee items-center gap-10 [animation-play-state:running] hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span key={`${item.label}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-slate-600">
            <Emoji name={item.icon} label={item.label} size={22} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function WordCardsLandingPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = COPY[lang];
  const brandName = lang === "ja" ? "すごい単語帳" : "WordCards";
  const currentYear = new Date().getFullYear();

  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const el = heroSentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ヒーローがビューポートより長い場合、初期表示ではセンチネルがまだ画面下に
        // 見えていないだけで isIntersecting=false になる。実際に「上へスクロールして
        // 通過した」かどうかは boundingClientRect.top が負になったかで判定する。
        setPastHero(entry.isIntersecting ? false : entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(el);

    const onScroll = () => setNavScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {/* ナビゲーション */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          navScrolled
            ? "bg-white/80 backdrop-blur-lg shadow-sm shadow-black/5 border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <Image src={appIcon} alt={brandName} width={34} height={34} className="rounded-[9px]" />
            <span className="text-[15px] font-bold tracking-tight">{brandName}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 sm:flex">
              {(["ja", "en"] as Language[]).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    lang === code ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {code === "ja" ? "日本語" : "EN"}
                </button>
              ))}
            </div>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:bg-blue-700 active:scale-95"
            >
              <AppleLogo className="w-3.5 h-3.5" />
              {t.nav.download}
            </a>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50 to-white pb-20 pt-32 sm:pt-40">
        {/* 背景ブロブ */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-[70%] rounded-full bg-blue-300/30 blur-3xl animate-blob" />
          <div className="absolute top-10 right-0 h-[380px] w-[380px] translate-x-1/3 rounded-full bg-sky-300/30 blur-3xl animate-blob [animation-delay:2s]" />
          <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-200/40 blur-3xl animate-blob [animation-delay:4s]" />
        </div>

        {/* 浮遊するOpenMojiアイコン */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
          <Emoji name="sparkles" label="" size={30} className="absolute left-[6%] top-[16%] opacity-60 animate-drift [animation-delay:0.3s]" />
          <Emoji name="brain" label="" size={34} className="absolute right-[6%] top-[12%] opacity-50 animate-drift [animation-delay:1.4s]" />
          <Emoji name="books" label="" size={28} className="absolute left-[3%] bottom-[6%] opacity-50 animate-drift [animation-delay:2.5s]" />
          <Emoji name="target" label="" size={26} className="absolute right-[4%] bottom-[4%] opacity-50 animate-drift [animation-delay:0.8s]" />
        </div>

        <div className="mx-auto max-w-3xl px-5">
          {/* テキスト */}
          <div className="text-center">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-blue-100 backdrop-blur">
                <Emoji name="sparkles" label="" size={16} className="animate-wiggle" />
                {t.hero.badge}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t.hero.title[0]}
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                  {t.hero.title[1]}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
                {t.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <AppStoreButton />
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-1.5 rounded-2xl px-5 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:text-blue-700"
                >
                  {t.hero.ctaSecondary}
                  <svg className="h-4 w-4 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-400">{t.hero.ctaPrimaryNote}</p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
                {t.hero.proof.map((p) => (
                  <span key={p.label} className="inline-flex items-center gap-2">
                    <Emoji name={p.icon as EmojiName} label={p.label} size={20} />
                    {p.label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <div ref={heroSentinelRef} />
      </section>

      {/* マーキー帯 */}
      <Marquee items={t.marquee.map((m) => ({ icon: m.icon as EmojiName, label: m.label }))} />

      {/* 数字で見るWordCards */}
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-5 sm:grid-cols-4 sm:gap-4">
          {t.stats.map((s, i) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              icon={s.icon as EmojiName}
              delay={i * 100}
            />
          ))}
        </div>
      </section>

      {/* 使い方3ステップ */}
      <section id="how-it-works" className="relative scroll-mt-20 bg-white py-24">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal className="text-center">
            <EyebrowLabel>{t.steps.eyebrow}</EyebrowLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.steps.title}
            </h2>
          </Reveal>

          <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px overflow-hidden bg-gradient-to-r from-transparent via-blue-200 to-transparent sm:block">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] animate-shimmer" />
            </div>
            {t.steps.items.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="group relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600 ring-2 ring-blue-100">
                    {i + 1}
                  </span>
                  <Emoji
                    name={step.emoji as EmojiName}
                    label={step.title}
                    size={38}
                    className="transition-transform duration-300 group-hover:animate-wiggle"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 1: 写真スキャン */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <EyebrowLabel>{t.feature1.eyebrow}</EyebrowLabel>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {t.feature1.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">{t.feature1.desc}</p>
            <ul className="mt-7 space-y-3">
              {t.feature1.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Emoji name="check" label="✓" size={18} className="shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-blue-200/30 blur-3xl" />
              <Image
                src={screenshotList}
                alt="AIが自動生成した単語カード一覧"
                className="w-[260px] rounded-[2rem] shadow-2xl ring-1 ring-slate-200/50 sm:w-[300px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature 2: 忘却曲線 */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-emerald-500/10 blur-3xl" />
              <Image
                src={screenshotReview}
                alt="エビングハウスの忘却曲線に基づく復習画面"
                className="w-[260px] rounded-[2rem] shadow-2xl ring-1 ring-white/10 sm:w-[300px]"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-300 ring-1 ring-inset ring-white/10">
              {t.feature2.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t.feature2.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">{t.feature2.desc}</p>

            {/* 忘却曲線タイムライン */}
            <div className="relative mt-10">
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400 via-slate-600 to-emerald-400 sm:left-2 sm:right-2 sm:top-[9px] sm:h-px sm:w-auto sm:bg-gradient-to-r" />
              <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:gap-2">
                {t.feature2.stages.map((s, i) => (
                  <div key={s.label} className="relative flex items-center gap-3 sm:flex-col sm:items-center sm:text-center">
                    <span
                      className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-4 ring-slate-950 ${
                        i === t.feature2.stages.length - 1
                          ? "bg-emerald-400"
                          : "bg-gradient-to-br from-blue-400 to-indigo-500"
                      }`}
                    >
                      {i === t.feature2.stages.length - 1 && (
                        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                      )}
                    </span>
                    <div className="sm:mt-1">
                      <p className="text-sm font-bold text-white">{s.label}</p>
                      <p className="text-xs text-slate-400">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-slate-400">{t.feature2.note}</p>
          </Reveal>
        </div>
      </section>

      {/* Feature 3: クイズモード */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="order-2 lg:order-1">
              <EyebrowLabel>{t.feature3.eyebrow}</EyebrowLabel>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {t.feature3.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">{t.feature3.desc}</p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {t.feature3.modes.map((m, i) => (
                  <Reveal
                    key={m.label}
                    delay={i * 60}
                    className="group/mode flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                  >
                    <Emoji
                      name={m.icon as EmojiName}
                      label={m.label}
                      size={24}
                      className="transition-transform duration-300 group-hover/mode:scale-125 group-hover/mode:animate-wiggle"
                    />
                    <span className="text-sm font-medium text-slate-700">{m.label}</span>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} className="order-1 flex justify-center lg:order-2">
              <div className="relative">
                <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-indigo-200/30 blur-3xl" />
                <Image
                  src={screenshotQuiz}
                  alt={`${brandName}のクイズ画面`}
                  className="w-[260px] rounded-[2rem] shadow-2xl ring-1 ring-slate-200/50 sm:w-[300px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bento機能グリッド */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <EyebrowLabel>{t.bento.eyebrow}</EyebrowLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.bento.title}</h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.bento.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 3) * 100}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Emoji name={item.icon as EmojiName} label={item.title} size={28} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* プラン */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <EyebrowLabel>{t.plans.eyebrow}</EyebrowLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.plans.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">{t.plans.desc}</p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {t.plans.tiers.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 100}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlight
                    ? "bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/30 lg:scale-105"
                    : "border border-slate-200 bg-white shadow-sm hover:shadow-xl"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900 shadow-md animate-bounce-slow">
                    <Emoji name="star" label="Popular" size={14} />
                    Popular
                  </span>
                )}
                <h3 className={`text-xl font-extrabold ${tier.highlight ? "text-white" : "text-slate-900"}`}>
                  {tier.name}
                </h3>
                <p className={`mt-1 text-sm ${tier.highlight ? "text-blue-100" : "text-slate-500"}`}>
                  {tier.tagline}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2.5 text-sm ${
                        tier.highlight ? "text-blue-50" : "text-slate-600"
                      }`}
                    >
                      <Emoji name="check" label="✓" size={16} className="shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <p className="text-xs text-slate-400">{t.plans.note}</p>
          </Reveal>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 py-24 text-center text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" />
          <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl animate-blob [animation-delay:3s]" />
        </div>

        <div className="relative mx-auto max-w-2xl px-5">
          <Reveal>
            <Image
              src={appIcon}
              alt={brandName}
              width={72}
              height={72}
              className="mx-auto rounded-2xl shadow-2xl ring-4 ring-white/20"
            />
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">{t.finalCta.title}</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-blue-100">{t.finalCta.subtitle}</p>
            <div className="mt-9 flex justify-center">
              <AppStoreButton className="bg-white !text-slate-900 shadow-white/20 hover:shadow-white/30" />
            </div>
            <p className="mt-4 text-xs text-blue-200">{t.finalCta.note}</p>
          </Reveal>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-slate-950 py-14 text-slate-400">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-2.5 sm:justify-start">
                <Image src={appIcon} alt={brandName} width={30} height={30} className="rounded-lg" />
                <span className="text-sm font-bold text-white">{brandName}</span>
              </div>
              <p className="mt-2 max-w-xs text-xs leading-relaxed">{t.footer.tagline}</p>
            </div>

            <div className="flex flex-col items-center gap-3 text-sm sm:items-end">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-end">
                <Link href={SUPPORT_URL} className="transition-colors hover:text-white">
                  {t.nav.support}
                </Link>
                <Link href={PRIVACY_URL} className="transition-colors hover:text-white">
                  {t.nav.privacy}
                </Link>
                <Link href={HUB_URL} className="transition-colors hover:text-white">
                  {t.footer.allApps}
                </Link>
              </div>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-blue-400 hover:text-blue-300"
              >
                <AppleLogo className="h-3.5 w-3.5" />
                App Store
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
            &copy; {currentYear} {brandName}. {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* モバイル用スティッキーCTAバー */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-slate-100 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-lg transition-transform duration-300 sm:hidden ${
          pastHero ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Image src={appIcon} alt={brandName} width={38} height={38} className="rounded-[10px] shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{t.stickyBar.title}</p>
              <p className="truncate text-xs text-slate-500">{t.stickyBar.subtitle}</p>
            </div>
          </div>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition-transform active:scale-95"
          >
            <AppleLogo className="h-4 w-4" />
            {t.stickyBar.cta}
          </a>
        </div>
      </div>
    </main>
  );
}
