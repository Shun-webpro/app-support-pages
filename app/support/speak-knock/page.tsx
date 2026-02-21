"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/speak_knock.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "ko" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

// ========================================
// 翻訳データ
// ========================================
const TRANSLATIONS: Record<Language, {
  support: string;
  aboutSupport: string;
  aboutSupportText: string;
  faq: string;
  contactUs: string;
  contactText: string;
  contactButton: string;
  responseTime: string;
  responseTimeText: string;
  supportedLanguages: string;
  supportedLanguagesText: string;
  privacyPolicy: string;
  privacyPolicyText: string;
  backToHub: string;
}> = {
  ja: {
    support: "サポート",
    aboutSupport: "サポートについて",
    aboutSupportText: "SpeakKnockをご利用いただきありがとうございます。ご質問や問題がございましたら、下記のFAQをご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決策が見つからない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返答は通常48時間以内を目安にしております。ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語でお問い合わせいただけます。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらでご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  ko: {
    support: "지원",
    aboutSupport: "지원 안내",
    aboutSupportText: "SpeakKnock를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
    faq: "자주 묻는 질문",
    contactUs: "문의하기",
    contactText: "위에서 해결책을 찾지 못하셨다면 이메일로 문의해 주세요.",
    contactButton: "이메일로 문의",
    responseTime: "응답 시간",
    responseTimeText: "문의에 대한 답변은 보통 48시간 이내에 드리고 있습니다. 양해 부탁드립니다.",
    supportedLanguages: "지원 언어",
    supportedLanguagesText: "일본어・한국어・영어로 문의하실 수 있습니다.",
    privacyPolicy: "개인정보 처리방침",
    privacyPolicyText: "개인정보 처리방침은 여기에서 확인하세요.",
    backToHub: "앱 목록으로 돌아가기",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using SpeakKnock. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese, Korean, and English.",
    privacyPolicy: "Privacy Policy",
    privacyPolicyText: "Please check here for our privacy policy.",
    backToHub: "Back to App List",
  },
};

// ========================================
// FAQデータ（多言語）
// ========================================
const FAQ_DATA: {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}[] = [
  {
    question: {
      ja: "Free・Standard・Pro・Premiumプランの違いは何ですか？",
      ko: "Free・Standard・Pro・Premium 플랜의 차이점은 무엇인가요？",
      en: "What is the difference between Free, Standard, Pro, and Premium plans?",
    },
    answer: {
      ja: "Freeプランは基本的なスピーキング練習が可能です。Standardプランでは音声の文字起こし（Whisper API）が追加されます。ProプランはAI採点（GPT-4o-mini）も含まれます。Premiumプランではさらに発音評価（Azure Cognitive Services）が利用できます。",
      ko: "Free 플랜은 기본적인 스피킹 연습이 가능합니다. Standard 플랜은 음성 텍스트 변환（Whisper API）이 추가됩니다. Pro 플랜은 AI 채점（GPT-4o-mini）도 포함됩니다. Premium 플랜은 추가로 발음 평가（Azure Cognitive Services）를 이용할 수 있습니다.",
      en: "The Free plan offers basic speaking practice. The Standard plan adds voice transcription (Whisper API). The Pro plan also includes AI scoring (GPT-4o-mini). The Premium plan additionally provides pronunciation assessment (Azure Cognitive Services).",
    },
  },
  {
    question: {
      ja: "録音した音声はどこかに保存されますか？",
      ko: "녹음한 음성은 어딘가에 저장되나요？",
      en: "Is my recorded audio stored anywhere?",
    },
    answer: {
      ja: "録音した音声は採点・評価処理のためにのみ使用されます。処理が完了した後、当社のサーバーには保存されません。詳細はプライバシーポリシーをご確認ください。",
      ko: "녹음한 음성은 채점・평가 처리를 위해서만 사용됩니다. 처리가 완료된 후에는 당사 서버에 저장되지 않습니다. 자세한 내용은 개인정보 처리방침을 확인해 주세요.",
      en: "Your recorded audio is used only for scoring and evaluation processing. After processing is complete, it is not stored on our servers. Please refer to our Privacy Policy for more details.",
    },
  },
  {
    question: {
      ja: "採点結果や学習履歴はどこに保存されますか？",
      ko: "채점 결과나 학습 기록은 어디에 저장되나요？",
      en: "Where are my scores and learning history stored?",
    },
    answer: {
      ja: "採点結果や学習履歴はお使いの端末内にのみ保存されます。クラウドへの同期は行われません。アプリをアンインストールするとすべてのデータが削除されます。",
      ko: "채점 결과나 학습 기록은 사용 중인 기기 내에만 저장됩니다. 클라우드 동기화는 이루어지지 않습니다. 앱을 삭제하면 모든 데이터가 삭제됩니다.",
      en: "Your scores and learning history are stored only on your device. Cloud synchronization is not performed. Uninstalling the app will delete all data.",
    },
  },
  {
    question: {
      ja: "購入を復元するにはどうすればよいですか？",
      ko: "구매를 복원하려면 어떻게 하나요？",
      en: "How do I restore my purchases?",
    },
    answer: {
      ja: "アプリ内の「設定」→「購入を復元」をタップしてください。購入時と同じApple IDでサインインしている必要があります。",
      ko: '앱 내 "설정" → "구매 복원"을 탭해 주세요. 구매 시와 동일한 Apple ID로 로그인되어 있어야 합니다.',
      en: 'Go to "Settings" → "Restore Purchases" in the app. You must be signed in with the same Apple ID you used when purchasing.',
    },
  },
  {
    question: {
      ja: "サブスクリプションを解約するにはどうすればよいですか？",
      ko: "구독을 해지하려면 어떻게 하나요？",
      en: "How do I cancel my subscription?",
    },
    answer: {
      ja: "サブスクリプションの解約はiOSの場合、「設定」→「Apple ID」→「サブスクリプション」から行えます。解約後も現在の請求期間が終了するまでプレミアム機能を引き続きご利用いただけます。",
      ko: "구독 해지는 iOS의 경우 '설정' → 'Apple ID' → '구독'에서 할 수 있습니다. 해지 후에도 현재 청구 기간이 종료될 때까지 프리미엄 기능을 계속 이용하실 수 있습니다.",
      en: "On iOS, you can cancel your subscription from Settings → Apple ID → Subscriptions. After cancellation, you can continue to use premium features until the end of the current billing period.",
    },
  },
  {
    question: {
      ja: "1日の練習回数に制限はありますか？",
      ko: "1일 연습 횟수에 제한이 있나요？",
      en: "Is there a daily practice limit?",
    },
    answer: {
      ja: "プランによって1日のクイズ実施回数に上限があります。上限に達した場合は翌日にリセットされます。",
      ko: "플랜에 따라 1일 퀴즈 실시 횟수에 상한이 있습니다. 상한에 달한 경우 다음 날 초기화됩니다.",
      en: "There is a daily quiz limit depending on your plan. The limit resets the next day once reached.",
    },
  },
];

// ========================================
// コンポーネント
// ========================================
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mb-12 ${className}`}>{children}</section>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
}

function LanguageSelector({
  currentLang,
  onChangeLang,
}: {
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChangeLang(lang.code)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
export default function SpeakKnockSupportPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src={appIcon}
              alt="SpeakKnock"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">SpeakKnock</h1>
          <p className="text-gray-600">{t.support}</p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* 戻るリンク */}
        <div className="text-center mb-8">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.backToHub}
          </Link>
        </div>

        {/* サポート案内 */}
        <Section>
          <SectionTitle>{t.aboutSupport}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">
            {t.aboutSupportText}
          </p>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionTitle>{t.faq}</SectionTitle>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-lg p-4 cursor-pointer"
              >
                <summary className="font-medium list-none flex justify-between items-center">
                  <span className="text-gray-800 pr-4">{faq.question[lang]}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer[lang]}</p>
                </div>
              </details>
            ))}
          </div>
        </Section>

        {/* お問い合わせ */}
        <Section>
          <SectionTitle>{t.contactUs}</SectionTitle>
          <p className="text-gray-700 mb-6">{t.contactText}</p>

          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t.contactButton}
          </a>

          <p className="mt-4 text-sm text-gray-500">{SUPPORT_EMAIL}</p>
        </Section>

        {/* 返信目安 */}
        <Section>
          <SectionTitle>{t.responseTime}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{t.responseTimeText}</p>
        </Section>

        {/* 対応言語 */}
        <Section>
          <SectionTitle>{t.supportedLanguages}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{t.supportedLanguagesText}</p>
        </Section>

        {/* プライバシーポリシー */}
        <Section className="mb-0">
          <SectionTitle>{t.privacyPolicy}</SectionTitle>
          <p className="text-gray-700 mb-4">{t.privacyPolicyText}</p>
          <Link
            href="/support/speak-knock/privacy"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {t.privacyPolicy}
            <svg
              className="w-4 h-4"
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
        </Section>
      </div>

      {/* フッター */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-2xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} SpeakKnock. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
