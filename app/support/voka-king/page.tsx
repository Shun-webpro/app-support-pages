"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/voka_king.png";

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
  { code: "en", label: "English", flag: "🇺🇸🇬🇧🇦🇺" },
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
    aboutSupportText: "VOKA KINGをご利用いただきありがとうございます。ご質問や問題がございましたら、以下のFAQをご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決策が見つからなかった場合は、メールでお問い合わせください。",
    contactButton: "メールで問い合わせる",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返信は通常48時間以内に行っております。ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・韓国語・英語でお問い合わせいただけます。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらからご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  ko: {
    support: "지원",
    aboutSupport: "지원 안내",
    aboutSupportText: "VOKA KING을 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
    faq: "자주 묻는 질문",
    contactUs: "문의하기",
    contactText: "위에서 해결책을 찾지 못하셨다면 이메일로 문의해 주세요.",
    contactButton: "이메일로 문의",
    responseTime: "응답 시간",
    responseTimeText: "문의에 대한 답변은 보통 48시간 이내에 드리고 있습니다. 양해 부탁드립니다.",
    supportedLanguages: "지원 언어",
    supportedLanguagesText: "한국어와 영어로 문의하실 수 있습니다.",
    privacyPolicy: "개인정보 처리방침",
    privacyPolicyText: "개인정보 처리방침은 여기에서 확인하세요.",
    backToHub: "앱 목록으로 돌아가기",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using VOKA KING. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Korean and English.",
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
      ja: "データは他のデバイスと同期されますか？",
      ko: "데이터가 다른 기기와 동기화되나요?",
      en: "Is my data synced across devices?",
    },
    answer: {
      ja: "現在、データはお使いのデバイスにのみ保存されています。将来的にクラウド同期機能の追加を検討しています。",
      ko: "현재 데이터는 사용 중인 기기에만 저장됩니다. 향후 클라우드 동기화 기능 추가를 검토하고 있습니다.",
      en: "Currently, your data is stored only on your device. We are considering adding cloud sync in the future.",
    },
  },
  {
    question: {
      ja: "通知が届きません",
      ko: "알림이 오지 않습니다",
      en: "I'm not receiving notifications",
    },
    answer: {
      ja: "端末の設定でこのアプリの通知が許可されているか確認してください。また、おやすみモードや集中モードが有効になっていないかもご確認ください。",
      ko: "기기 설정에서 이 앱의 알림이 허용되어 있는지 확인해 주세요. 또한 방해금지 모드나 집중 모드가 활성화되어 있지 않은지도 확인해 주세요.",
      en: "Please check if notifications are enabled for this app in your device Settings. Also, make sure Do Not Disturb or Focus mode is not enabled.",
    },
  },
  {
    question: {
      ja: "購入した機能を復元するにはどうすればいいですか？",
      ko: "구매한 기능을 복원하려면 어떻게 하나요?",
      en: "How do I restore my purchases?",
    },
    answer: {
      ja: 'アプリ内の「設定」→「購入を復元」をタップしてください。同じApple ID / Googleアカウントでログインしている必要があります。',
      ko: '앱 내 "설정" → "구매 복원"을 탭해 주세요. 동일한 Apple ID / Google 계정으로 로그인되어 있어야 합니다.',
      en: 'Go to "Settings" → "Restore Purchases" in the app. You must be signed in with the same Apple ID / Google account.',
    },
  },
  {
    question: {
      ja: "アプリデータの保存期間はどのくらいですか？",
      ko: "앱 데이터의 보존 기간은 어떻게 되나요?",
      en: "How long is app data retained?",
    },
    answer: {
      ja: "学習進捗、バッジ、カスタム単語帳、アプリ設定などのデータはアプリを削除するまで端末に保存されます。日次クイズの記録のみ7日後に自動的に削除されます。アプリをアンインストールするとすべてのデータが初期化されますのでご注意ください。",
      ko: "학습 진행, 뱃지, 커스텀 단어장, 앱 설정 등의 데이터는 앱을 삭제할 때까지 기기에 저장됩니다. 일일 퀴즈 기록만 7일 후 자동으로 정리됩니다. 앱을 삭제(제거)하면 모든 데이터가 자동으로 초기화되므로 주의해 주세요.",
      en: "Data such as learning progress, badges, custom word lists, and app settings are stored on your device until the app is deleted. Only daily quiz history is automatically cleaned up after 7 days. Please note that uninstalling the app will automatically reset all data.",
    },
  },
  {
    question: {
      ja: "サブスクリプションをキャンセルするとどうなりますか？",
      ko: "구독을 해지하면 어떻게 되나요?",
      en: "What happens when I cancel my subscription?",
    },
    answer: {
      ja: "サブスクリプションをキャンセルしても、My単語帳に登録した単語はそのまま保持されます。ただし、無料プランの単語数の上限を超えている場合は、単語数を上限以下に減らすまで新しい単語を追加できません。",
      ko: "구독을 해지하더라도 My 단어장에 등록한 단어는 그대로 유지됩니다. 다만, 무료 플랜의 단어 수 상한을 초과한 경우에는 단어 수를 상한 이하로 줄일 때까지 새로운 단어를 추가할 수 없습니다.",
      en: "Even after canceling your subscription, the words saved in My Vocabulary will be retained. However, if the number of words exceeds the free plan limit, you will not be able to add new words until you reduce the count below the limit.",
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
export default function VokaKingSupportPage() {
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
              alt="VOKA KING"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">VOKA KING</h1>
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
            href="/support/voka-king/privacy"
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
          <p>&copy; {currentYear} VOKA KING. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
