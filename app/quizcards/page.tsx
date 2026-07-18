"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/quizcards.png";
import screenshotList from "@/app/images/snapquiz.lp/IMG_9456.png";
import screenshotQuiz from "@/app/images/snapquiz.lp/IMG_9457.png";

// ========================================
// 設定値
// ========================================
const APP_STORE_URL = "https://apps.apple.com/app/id6766897777";
const SUPPORT_URL = "/support/quizcards";
const PRIVACY_URL = "/support/quizcards/privacy";
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
      card: { badge: string; title: string; metricUnit: string };
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
      badge: "AI搭載・学習アプリ",
      title: ["写真か、ひとことの指示で。", "本番レベルの問題集に。"],
      highlight: "本番レベルの問題集に。",
      subtitle:
        "教科書やプリントを撮影するだけ、あるいは「〇〇についての紛らわしい選択肢の問題を」と伝えるだけ。AIが資格試験・受験対策にそのまま使える問題を自動生成。あとはエビングハウスの忘却曲線に基づく復習が、合格まで記憶を支えます。",
      ctaPrimaryNote: "iPhone対応・App Storeで公開中",
      ctaSecondary: "使い方を見る",
      proof: [
        { icon: "memo", label: "写真・指示文だけで問題を自動生成" },
        { icon: "target", label: "9種類の出題形式" },
        { icon: "graduationCap", label: "資格・受験対策に対応" },
      ],
    },
    marquee: [
      { icon: "camera", label: "写真を撮るだけ" },
      { icon: "robot", label: "AIが問題を自動作成" },
      { icon: "graduationCap", label: "資格・受験対策に" },
      { icon: "target", label: "9種類の出題形式" },
      { icon: "brain", label: "忘却曲線で復習" },
      { icon: "speechBalloon", label: "AI先生に質問できる" },
      { icon: "lock", label: "データは端末内に保存" },
    ],
    stats: [
      { value: 9, label: "種類の出題形式", icon: "target" },
      { value: 4, label: "段階の復習ステージ", icon: "brain" },
      { value: 3, label: "段階の難易度設定", icon: "graduationCap" },
      { value: 5, label: "言語のUIに対応", icon: "globe" },
    ],
    steps: {
      eyebrow: "HOW IT WORKS",
      title: "使い方はたったの3ステップ",
      items: [
        {
          emoji: "camera",
          title: "作る",
          desc: "教科書やプリントをカメラで撮影、または「ベータ遮断薬の適応・禁忌を問う国試問題」のように条件を伝えるだけ。AIが自動で問題を作成します。",
        },
        {
          emoji: "target",
          title: "解く",
          desc: "四択・穴埋め・記述・スピーキングなど9種類の形式で、本番さながらの緊張感を持って演習できます。",
        },
        {
          emoji: "brain",
          title: "復習する",
          desc: "1日後→1週間後→1ヶ月後→3ヶ月後。忘却曲線に基づく最適なタイミングで復習をリマインドし、試験当日まで記憶を保ちます。",
        },
      ],
    },
    feature1: {
      eyebrow: "PHOTO OR PROMPT",
      title: "写真も、ひとことの指示も。AIが問題に変える",
      desc:
        "問題を一つずつ手入力する必要はもうありません。教科書のページやプリントにカメラを向けるだけでなく、「江戸時代の三大改革を比較する、共通テスト形式の紛らわしい選択肢の問題を」といった指示文だけでも、AIが本番さながらの問題・答え・解説まで自動で作成します。",
      bullets: [
        "カメラ撮影・写真ライブラリ・指示文入力のすべてに対応",
        "分野・形式・難易度を指定して、狙った問題だけを生成",
        "一括生成で複数問題をまとめて作成（Plusプランで最大10問）",
        "解答・解説までAIが自動で作成",
      ],
    },
    feature2: {
      eyebrow: "SPACED REPETITION",
      title: "エビングハウスの忘却曲線で、本番に強くなる",
      desc:
        "せっかく解けた問題も、復習しなければ忘れてしまいます。すごい問題集は心理学者エビングハウスの忘却曲線に基づいた間隔反復（スペースドリピティション）を採用。問題に回答すると自動で復習スケジュールに登録され、最適なタイミングで通知します。",
      stages: [
        { label: "初回", sub: "学習" },
        { label: "1日後", sub: "1回目の復習" },
        { label: "1週間後", sub: "2回目の復習" },
        { label: "1ヶ月後", sub: "3回目の復習" },
        { label: "3ヶ月後", sub: "定着完了" },
      ],
      note: "「わかった」を選ぶと次のステージへ、「もう一度」を選ぶと翌日に再登場。無理なく、確実に長期記憶へ。",
      card: { badge: "7日連続学習中", title: "今日の復習", metricUnit: "問" },
    },
    feature3: {
      eyebrow: "9 QUESTION TYPES",
      title: "9種類の出題形式で、本番と同じ緊張感を",
      desc: "四択やマークシート形式だけでなく、記述・スピーキング・並べ替えまで。多様な角度から解くことで、本番の試験でも動じない実力が身につきます。",
      modes: [
        { icon: "pencil", label: "穴埋め問題" },
        { icon: "inputCaps", label: "四択問題" },
        { icon: "ballotBox", label: "複数選択問題" },
        { icon: "framedPicture", label: "画像問題" },
        { icon: "balanceScale", label: "○×問題" },
        { icon: "memo", label: "記述問題" },
        { icon: "microphone", label: "スピーキング問題" },
        { icon: "letters", label: "スペリング問題" },
        { icon: "shuffle", label: "並べ替え問題" },
      ],
    },
    bento: {
      eyebrow: "MORE FEATURES",
      title: "合格までを支える、細部までのこだわり",
      items: [
        {
          icon: "cardIndex",
          title: "対策別にフォルダ管理",
          desc: "試験名や科目ごとにフォルダを作成・整理。「対策・試験」を登録して目的別に問題集を管理できます。",
        },
        {
          icon: "speechBalloon",
          title: "AI先生に質問できる",
          desc: "フォルダ内のAIチャットで、その問題に関連した内容をAIに質問。理解を深掘りできます。",
        },
        {
          icon: "graduationCap",
          title: "3段階の難易度設定",
          desc: "初級・中級・上級から選んで、レベルに合った問題を作成・出題できます。",
        },
        {
          icon: "crayon",
          title: "マーカーで範囲を指定",
          desc: "写真の中でマーカーを引いた部分だけを、狙って問題化できます。",
        },
        {
          icon: "fire",
          title: "学習ストリークを記録",
          desc: "連続学習日数を記録。「継続は力なり」を実感しながらモチベーションを維持できます。",
        },
        {
          icon: "lock",
          title: "データは端末内に保存",
          desc: "アカウント登録は不要。作成した問題集はすべて端末内にのみ保存されます。",
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
            "AI生成問題 1日3問まで",
            "AI生成暗記カード 1日2枚まで",
            "マーカー機能 1日1回まで",
            "フォルダ 3個まで",
            "AI先生 1日2回まで",
          ],
        },
        {
          name: "Plus",
          tagline: "本気で合格を目指す人へ",
          highlight: true,
          features: [
            "Freeの全機能に加えて",
            "AI生成問題・暗記カードが無制限",
            "マーカー機能・フォルダ数が無制限",
            "AI先生が無制限、追加指示にも対応",
            "クイズ絞り込み・ダークモードが解禁",
            "広告なしで集中して学習",
          ],
        },
      ],
      note: "3日間の無料トライアルからお試しいただけます。詳しい価格はApp内でご確認いただけます。購入はいつでもApp Storeの設定から解約できます。",
    },
    finalCta: {
      title: "今日から、合格に一歩近づく学習を。",
      subtitle: "写真か、ひとことの指示で。AIにおまかせすれば、復習のタイミングもすごい問題集が教えてくれます。",
      note: "iPhone対応・無料でダウンロードできます",
    },
    footer: {
      tagline: "写真か、ひとことの指示で。AIが問題を自動作成。",
      linksTitle: "リンク",
      allApps: "他のアプリを見る",
      rights: "All rights reserved.",
    },
    stickyBar: { title: "すごい問題集", subtitle: "AIが作る、資格・受験対策問題集", cta: "入手する" },
  },
  en: {
    nav: { support: "Support", privacy: "Privacy Policy", download: "Get the App" },
    hero: {
      badge: "AI-Powered Study App",
      title: ["Snap a photo, or just ask.", "AI builds the questions."],
      highlight: "AI builds the questions.",
      subtitle:
        "Photograph your textbook or worksheet — or simply describe the question you need, like \"a tricky multiple-choice question comparing three key reforms.\" AI instantly writes exam-ready practice questions for certifications and entrance exams, then a spaced-repetition system based on the Ebbinghaus forgetting curve keeps them fresh until test day.",
      ctaPrimaryNote: "Available on the App Store for iPhone",
      ctaSecondary: "See how it works",
      proof: [
        { icon: "memo", label: "Photo or prompt → instant questions" },
        { icon: "target", label: "9 question formats" },
        { icon: "graduationCap", label: "Built for exams & certifications" },
      ],
    },
    marquee: [
      { icon: "camera", label: "Snap a photo" },
      { icon: "robot", label: "AI writes the questions" },
      { icon: "graduationCap", label: "Built for exam prep" },
      { icon: "target", label: "9 question formats" },
      { icon: "brain", label: "Review with the forgetting curve" },
      { icon: "speechBalloon", label: "Ask your AI Tutor" },
      { icon: "lock", label: "Data stays on your device" },
    ],
    stats: [
      { value: 9, label: "question formats", icon: "target" },
      { value: 4, label: "review stages", icon: "brain" },
      { value: 3, label: "difficulty levels", icon: "graduationCap" },
      { value: 5, label: "languages supported", icon: "globe" },
    ],
    steps: {
      eyebrow: "HOW IT WORKS",
      title: "Just 3 simple steps",
      items: [
        {
          emoji: "camera",
          title: "Create",
          desc: "Photograph a textbook page or worksheet, or type a prompt like \"a beta-blocker question testing indications and contraindications.\" AI writes the question for you.",
        },
        {
          emoji: "target",
          title: "Practice",
          desc: "Answer in 9 different formats — multiple choice, fill-in-the-blank, written, speaking, and more — with the same intensity as the real exam.",
        },
        {
          emoji: "brain",
          title: "Review",
          desc: "1 day, 1 week, 1 month, then 3 months later — reminders land at exactly the right moment based on the forgetting curve, so it sticks until test day.",
        },
      ],
    },
    feature1: {
      eyebrow: "PHOTO OR PROMPT",
      title: "A photo or a sentence is all AI needs",
      desc:
        "No more typing every question by hand. Point your camera at a textbook page or worksheet — or simply describe what you want, like \"a tricky multiple-choice question comparing three historical reforms.\" AI writes exam-ready questions, answers, and explanations for you automatically.",
      bullets: [
        "Works with camera capture, your photo library, and text prompts alike",
        "Specify subject, format, and difficulty to target exactly what you need",
        "Batch-generate multiple questions at once (up to 10 with Plus)",
        "Answers and explanations are generated automatically",
      ],
    },
    feature2: {
      eyebrow: "SPACED REPETITION",
      title: "The Ebbinghaus forgetting curve, built in",
      desc:
        "Even questions you've mastered will fade without review. SnapQuiz uses spaced repetition based on psychologist Hermann Ebbinghaus's forgetting curve. The moment you answer a question, it's automatically scheduled for the next review at exactly the right time.",
      stages: [
        { label: "Day 0", sub: "First study" },
        { label: "+1 day", sub: "1st review" },
        { label: "+1 week", sub: "2nd review" },
        { label: "+1 month", sub: "3rd review" },
        { label: "+3 months", sub: "Mastered" },
      ],
      note: "Tap \"Got it\" to advance to the next stage, or \"Again\" to see it tomorrow — a steady, sustainable path to exam-day confidence.",
      card: { badge: "7-day streak", title: "Today's Reviews", metricUnit: "due" },
    },
    feature3: {
      eyebrow: "9 QUESTION TYPES",
      title: "9 formats keep you sharp under real exam conditions",
      desc: "From fill-in-the-blank and multiple choice to written answers, speaking, and reordering — practicing the same material from every angle builds the recall you need on test day.",
      modes: [
        { icon: "pencil", label: "Fill in the blank" },
        { icon: "inputCaps", label: "Multiple choice" },
        { icon: "ballotBox", label: "Multi-select" },
        { icon: "framedPicture", label: "Image question" },
        { icon: "balanceScale", label: "True / False" },
        { icon: "memo", label: "Written answer" },
        { icon: "microphone", label: "Speaking" },
        { icon: "letters", label: "Spelling" },
        { icon: "shuffle", label: "Reordering" },
      ],
    },
    bento: {
      eyebrow: "MORE FEATURES",
      title: "Every detail built for serious exam prep",
      items: [
        {
          icon: "cardIndex",
          title: "Folders by subject or exam",
          desc: "Create and organize folders for each exam or subject, with notes on exactly what you're preparing for.",
        },
        {
          icon: "speechBalloon",
          title: "Ask your AI Tutor",
          desc: "Use the AI chat inside any folder to ask follow-up questions about its content and deepen your understanding.",
        },
        {
          icon: "graduationCap",
          title: "3 difficulty levels",
          desc: "Choose beginner, intermediate, or advanced to create and practice questions at the right level.",
        },
        {
          icon: "crayon",
          title: "Marker tool",
          desc: "Highlight exactly the part of a photo you want turned into a question.",
        },
        {
          icon: "fire",
          title: "Study streaks",
          desc: "Track consecutive study days to stay motivated day after day.",
        },
        {
          icon: "lock",
          title: "Stored on your device",
          desc: "No account required. Every question you create stays on your device only.",
        },
      ],
    },
    plans: {
      eyebrow: "PLANS",
      title: "Start free, go unlimited with Plus",
      desc: "No sign-up required. Download now and start on the Free plan.",
      tiers: [
        {
          name: "Free",
          tagline: "The best place to start",
          features: [
            "3 AI-generated questions / day",
            "2 AI-generated flashcards / day",
            "Marker tool once / day",
            "Up to 3 folders",
            "AI Tutor twice / day",
          ],
        },
        {
          name: "Plus",
          tagline: "For serious exam prep",
          highlight: true,
          features: [
            "Everything in Free, plus",
            "Unlimited AI questions & flashcards",
            "Unlimited marker tool & folders",
            "Unlimited AI Tutor with custom instructions",
            "Quiz filters and dark mode unlocked",
            "A clean, ad-free study experience",
          ],
        },
      ],
      note: "Start with a 3-day free trial. See exact pricing in the app. Manage or cancel your subscription anytime from the App Store settings.",
    },
    finalCta: {
      title: "Start studying smarter, today.",
      subtitle: "Snap a photo or type a prompt — AI handles the rest, and SnapQuiz tells you exactly when to review.",
      note: "Available now on the App Store for iPhone",
    },
    footer: {
      tagline: "A photo or a prompt in, exam-ready questions out.",
      linksTitle: "Links",
      allApps: "See our other apps",
      rights: "All rights reserved.",
    },
    stickyBar: { title: "SnapQuiz", subtitle: "AI-built questions for exam prep", cta: "Get the App" },
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
      className={`group inline-flex items-center gap-3 rounded-2xl bg-black text-white shadow-lg shadow-black/25 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:shadow-indigo-900/30 active:scale-95 ${
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
    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700 ring-1 ring-inset ring-indigo-100">
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
  target: "1F3AF",
  globe: "1F310",
  lock: "1F512",
  check: "2705",
  cross: "274C",
  star: "2B50",
  sparkles: "2728",
  fire: "1F525",
  trophy: "1F3C6",
  cardIndex: "1F5C2",
  framedPicture: "1F5BC",
  moon: "1F319",
  crayon: "1F58D",
  memo: "1F4DD",
  pencil: "270F",
  graduationCap: "1F393",
  speechBalloon: "1F4AC",
  microphone: "1F3A4",
  balanceScale: "2696",
  ballotBox: "2611",
  inputCaps: "1F520",
  letters: "1F524",
  shuffle: "1F500",
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

// 忘却曲線セクション用の「今日の復習」モックカード
function ReviewMockCard({
  badge,
  title,
  metricUnit,
  stages,
}: {
  badge: string;
  title: string;
  metricUnit: string;
  stages: { label: string; sub: string }[];
}) {
  return (
    <div className="relative w-[260px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 shadow-2xl ring-1 ring-white/10 sm:w-[300px]">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-amber-300 ring-1 ring-inset ring-white/10">
        <Emoji name="fire" label="" size={14} />
        {badge}
      </div>

      <p className="mt-5 text-xs font-medium text-slate-400">{title}</p>
      <div className="mt-1 flex items-end gap-2">
        <span className="text-5xl font-extrabold tabular-nums text-white">12</span>
        <span className="mb-1.5 text-sm text-slate-400">{metricUnit}</span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-indigo-400 to-amber-400" />
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {stages.map((s) => (
          <span
            key={s.label}
            className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300 ring-1 ring-inset ring-white/10"
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function QuizCardsLandingPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = COPY[lang];
  const brandName = lang === "ja" ? "すごい問題集" : "SnapQuiz";
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
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95"
            >
              <AppleLogo className="w-3.5 h-3.5" />
              {t.nav.download}
            </a>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50 via-violet-50 to-white pb-20 pt-32 sm:pt-40">
        {/* 背景ブロブ */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-[70%] rounded-full bg-indigo-300/30 blur-3xl animate-blob" />
          <div className="absolute top-10 right-0 h-[380px] w-[380px] translate-x-1/3 rounded-full bg-violet-300/30 blur-3xl animate-blob [animation-delay:2s]" />
          <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-fuchsia-200/40 blur-3xl animate-blob [animation-delay:4s]" />
        </div>

        {/* 浮遊するOpenMojiアイコン */}
        <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
          <Emoji name="sparkles" label="" size={30} className="absolute left-[6%] top-[16%] opacity-60 animate-drift [animation-delay:0.3s]" />
          <Emoji name="graduationCap" label="" size={34} className="absolute right-[6%] top-[12%] opacity-50 animate-drift [animation-delay:1.4s]" />
          <Emoji name="trophy" label="" size={28} className="absolute left-[3%] bottom-[6%] opacity-50 animate-drift [animation-delay:2.5s]" />
          <Emoji name="target" label="" size={26} className="absolute right-[4%] bottom-[4%] opacity-50 animate-drift [animation-delay:0.8s]" />
        </div>

        <div className="mx-auto max-w-3xl px-5">
          {/* テキスト */}
          <div className="text-center">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-100 backdrop-blur">
                <Emoji name="sparkles" label="" size={16} className="animate-wiggle" />
                {t.hero.badge}
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t.hero.title[0]}
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-600 bg-clip-text text-transparent">
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
                  className="inline-flex items-center gap-1.5 rounded-2xl px-5 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-700"
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

      {/* 数字で見るすごい問題集 */}
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
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px overflow-hidden bg-gradient-to-r from-transparent via-indigo-200 to-transparent sm:block">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-indigo-500 to-transparent bg-[length:200%_100%] animate-shimmer" />
            </div>
            {t.steps.items.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="group relative text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-indigo-600 ring-2 ring-indigo-100">
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

      {/* Feature 1: 写真・指示文からAI生成 */}
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
              <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-indigo-200/30 blur-3xl" />
              <Image
                src={screenshotList}
                alt="AIが自動生成した問題の一覧"
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
            <ReviewMockCard
              badge={t.feature2.card.badge}
              title={t.feature2.card.title}
              metricUnit={t.feature2.card.metricUnit}
              stages={t.feature2.stages}
            />
          </Reveal>

          <Reveal delay={150}>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-300 ring-1 ring-inset ring-white/10">
              {t.feature2.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t.feature2.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">{t.feature2.desc}</p>

            {/* 忘却曲線タイムライン */}
            <div className="relative mt-10">
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-400 via-slate-600 to-amber-400 sm:left-2 sm:right-2 sm:top-[9px] sm:h-px sm:w-auto sm:bg-gradient-to-r" />
              <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:gap-2">
                {t.feature2.stages.map((s, i) => (
                  <div key={s.label} className="relative flex items-center gap-3 sm:flex-col sm:items-center sm:text-center">
                    <span
                      className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-4 ring-slate-950 ${
                        i === t.feature2.stages.length - 1
                          ? "bg-amber-400"
                          : "bg-gradient-to-br from-indigo-400 to-violet-500"
                      }`}
                    >
                      {i === t.feature2.stages.length - 1 && (
                        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-amber-400" />
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

      {/* Feature 3: 9種類の出題形式 */}
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
                    delay={i * 50}
                    className="group/mode flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md"
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
                <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-violet-200/30 blur-3xl" />
                <Image
                  src={screenshotQuiz}
                  alt={`${brandName}の四択クイズと解説画面`}
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
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
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
        <div className="mx-auto max-w-4xl px-5">
          <Reveal className="text-center">
            <EyebrowLabel>{t.plans.eyebrow}</EyebrowLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.plans.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">{t.plans.desc}</p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {t.plans.tiers.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 100}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlight
                    ? "bg-gradient-to-b from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-500/30 sm:scale-105"
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
                <p className={`mt-1 text-sm ${tier.highlight ? "text-indigo-100" : "text-slate-500"}`}>
                  {tier.tagline}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2.5 text-sm ${
                        tier.highlight ? "text-indigo-50" : "text-slate-600"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-600 to-fuchsia-800 py-24 text-center text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" />
          <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl animate-blob [animation-delay:3s]" />
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
            <p className="mx-auto mt-4 max-w-md text-base text-indigo-100">{t.finalCta.subtitle}</p>
            <div className="mt-9 flex justify-center">
              <AppStoreButton className="bg-white !text-slate-900 shadow-white/20 hover:shadow-white/30" />
            </div>
            <p className="mt-4 text-xs text-indigo-200">{t.finalCta.note}</p>
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
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-indigo-400 hover:text-indigo-300"
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
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition-transform active:scale-95"
          >
            <AppleLogo className="h-4 w-4" />
            {t.stickyBar.cta}
          </a>
        </div>
      </div>
    </main>
  );
}
