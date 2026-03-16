"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/flashenglish.png";

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
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
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
    aboutSupportText: "Flash Englishをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決しない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返信は通常48時間以内を目安としております。お時間をいただく場合がございますが、ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語・韓国語でのお問い合わせに対応しております。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらでご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  ko: {
    support: "지원",
    aboutSupport: "지원 안내",
    aboutSupportText: "Flash English를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
    faq: "자주 묻는 질문",
    contactUs: "문의하기",
    contactText: "위에서 해결책을 찾지 못하셨다면 이메일로 문의해 주세요.",
    contactButton: "이메일로 문의",
    responseTime: "응답 시간",
    responseTimeText: "문의에 대한 답변은 보통 48시간 이내에 드리고 있습니다. 양해 부탁드립니다.",
    supportedLanguages: "지원 언어",
    supportedLanguagesText: "일본어, 영어, 한국어로 문의하실 수 있습니다.",
    privacyPolicy: "개인정보 처리방침",
    privacyPolicyText: "개인정보 처리방침은 여기에서 확인하세요.",
    backToHub: "앱 목록으로 돌아가기",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using Flash English. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese, English, and Korean.",
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
      ja: "フリースタイルクイズの使い方を教えてください",
      ko: "프리스타일 퀴즈는 어떻게 사용하나요?",
      en: "How do I use the Freestyle Quiz?",
    },
    answer: {
      ja: "フリースタイルクイズでは、表示されたお題に対して自由に英語で回答できます。マイクボタンをタップして話しかけると、AIが発音と内容を評価します。評価結果を参考にして、繰り返し練習することでスピーキング力が向上します。",
      ko: "프리스타일 퀴즈에서는 제시된 주제에 대해 자유롭게 영어로 답할 수 있습니다. 마이크 버튼을 탭하고 말하면 AI가 발음과 내용을 평가합니다. 평가 결과를 참고하여 반복 연습하면 스피킹 실력이 향상됩니다.",
      en: "In Freestyle Quiz, you can freely answer in English to the given topic. Tap the microphone button and speak — the AI will evaluate your pronunciation and content. Use the feedback to practice repeatedly and improve your speaking skills.",
    },
  },
  {
    question: {
      ja: "サブスクリプションを復元するには？",
      ko: "구독을 복원하려면 어떻게 하나요?",
      en: "How do I restore my subscription?",
    },
    answer: {
      ja: "アプリ内の「設定」→「購入を復元」をタップしてください。同じApple IDでサインインしている必要があります。復元できない場合は、App Storeの購入履歴をご確認ください。",
      ko: '앱 내 "설정" → "구매 복원"을 탭해 주세요. 동일한 Apple ID로 로그인되어 있어야 합니다. 복원이 되지 않으면 App Store 구매 내역을 확인해 주세요.',
      en: 'Go to "Settings" → "Restore Purchases" in the app. You must be signed in with the same Apple ID. If restoration fails, please check your App Store purchase history.',
    },
  },
  {
    question: {
      ja: "マイフレーズとは何ですか？",
      ko: "마이 프레이즈란 무엇인가요?",
      en: "What is My Phrases?",
    },
    answer: {
      ja: "マイフレーズは、学習中に気になったフレーズや単語を保存できる機能です。保存したフレーズはいつでも復習でき、自分だけの単語帳として活用できます。",
      ko: "마이 프레이즈는 학습 중 관심 있는 표현이나 단어를 저장할 수 있는 기능입니다. 저장한 표현은 언제든지 복습할 수 있으며, 나만의 단어장으로 활용할 수 있습니다.",
      en: "My Phrases is a feature that lets you save phrases and words you encounter during study. You can review saved phrases anytime and use them as your personal vocabulary list.",
    },
  },
  {
    question: {
      ja: "音声認識が動作しません",
      ko: "음성 인식이 작동하지 않습니다",
      en: "Voice recognition is not working",
    },
    answer: {
      ja: "以下をご確認ください：\n1. 端末の「設定」→「Flash English」でマイクのアクセスが許可されていること\n2. 音声認識の権限が許可されていること\n3. インターネット接続が安定していること\n4. 静かな環境で話しかけていること\nそれでも解決しない場合は、アプリを再起動してお試しください。",
      ko: "다음을 확인해 주세요:\n1. 기기 설정 → Flash English에서 마이크 접근이 허용되어 있는지\n2. 음성 인식 권한이 허용되어 있는지\n3. 인터넷 연결이 안정적인지\n4. 조용한 환경에서 말하고 있는지\n그래도 해결되지 않으면 앱을 재시작해 보세요.",
      en: "Please check the following:\n1. Microphone access is enabled in Settings → Flash English\n2. Speech recognition permission is granted\n3. You have a stable internet connection\n4. You are speaking in a quiet environment\nIf the issue persists, try restarting the app.",
    },
  },
  {
    question: {
      ja: "データの同期について",
      ko: "데이터 동기화에 대해",
      en: "About data synchronization",
    },
    answer: {
      ja: "学習進捗やマイフレーズなどのデータはお使いのデバイス内に保存されます。フリースタイルクイズの音声データは評価のためにサーバーに送信されますが、評価完了後にサーバーからは削除されます。デバイスを変更する場合、ローカルデータの引き継ぎはできませんのでご了承ください。",
      ko: "학습 진행 상황과 마이 프레이즈 등의 데이터는 기기에 저장됩니다. 프리스타일 퀴즈의 음성 데이터는 평가를 위해 서버로 전송되지만, 평가 완료 후 서버에서 삭제됩니다. 기기를 변경하면 로컬 데이터를 이전할 수 없으니 양해 부탁드립니다.",
      en: "Your learning progress, My Phrases, and other data are stored on your device. Voice data from Freestyle Quiz is sent to our server for evaluation but is deleted from the server after evaluation is complete. Please note that local data cannot be transferred when changing devices.",
    },
  },
  {
    question: {
      ja: "サブスクリプションを解約するにはどうすればよいですか？",
      ko: "구독을 해지하려면 어떻게 하나요?",
      en: "How do I cancel my subscription?",
    },
    answer: {
      ja: "サブスクリプションの解約はiOSの「設定」→「Apple ID」→「サブスクリプション」から行えます。解約後も現在の請求期間が終了するまでプレミアム機能を引き続きご利用いただけます。",
      ko: "구독 해지는 iOS \"설정\" → \"Apple ID\" → \"구독\"에서 할 수 있습니다. 해지 후에도 현재 결제 기간이 끝날 때까지 프리미엄 기능을 계속 이용하실 수 있습니다.",
      en: "You can cancel your subscription from iOS Settings → Apple ID → Subscriptions. After cancellation, you can continue using premium features until the end of the current billing period.",
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
export default function FlashEnglishSupportPage() {
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
              alt="Flash English"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">Flash English</h1>
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
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer[lang]}</p>
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
            href="/support/flash-english/privacy"
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
          <p>&copy; {currentYear} Flash English. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
