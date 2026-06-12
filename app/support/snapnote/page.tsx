"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/snapnote.png";

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
    aboutSupportText: "SnapNoteをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "SnapNote를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using SnapNote. If you have any questions or issues, please check the FAQ below or contact us.",
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
      ja: "SnapNoteはどのようなアプリですか？",
      ko: "SnapNote는 어떤 앱인가요?",
      en: "What kind of app is SnapNote?",
    },
    answer: {
      ja: "教科書やノート、プリントを写真で撮影するだけで、AIが内容を整理してわかりやすいまとめノートを自動作成するアプリです。作成したノートはフォルダで管理でき、ノートの内容からクイズを生成して復習することもできます。",
      ko: "교과서나 노트, 프린트를 사진으로 찍기만 하면 AI가 내용을 정리하여 알기 쉬운 정리 노트를 자동으로 만들어주는 앱입니다. 작성된 노트는 폴더로 관리할 수 있으며, 노트 내용을 바탕으로 퀴즈를 생성하여 복습할 수도 있습니다.",
      en: "SnapNote is an app that automatically creates clear, organized notes from photos of textbooks, notebooks, or handouts using AI. Created notes can be managed in folders, and you can generate quizzes from your notes to review what you've learned.",
    },
  },
  {
    question: {
      ja: "ノートが生成されない、またはエラーになります",
      ko: "노트가 생성되지 않거나 오류가 발생합니다",
      en: "Notes are not generated or an error occurs",
    },
    answer: {
      ja: "以下をご確認ください：\n1. インターネット接続（Wi-Fiまたはモバイルデータ）が有効になっていること\n2. 撮影した写真の文字がはっきり読み取れること（ピントが合っていない、暗すぎる写真は認識率が低下します）\n3. 一度にアップロードする画像の枚数や容量が多すぎないか\n改善しない場合は、しばらく時間を置いてから再度お試しください。",
      ko: "다음을 확인해 주세요:\n1. 인터넷 연결(Wi-Fi 또는 모바일 데이터)이 활성화되어 있는지\n2. 촬영한 사진의 글자가 선명하게 보이는지(초점이 맞지 않거나 너무 어두운 사진은 인식률이 낮아집니다)\n3. 한 번에 업로드하는 이미지의 수나 용량이 너무 많지 않은지\n개선되지 않는 경우 잠시 후 다시 시도해 주세요.",
      en: "Please check the following:\n1. Your internet connection (Wi-Fi or mobile data) is enabled\n2. The text in your photo is clearly readable (blurry or dark photos may reduce recognition accuracy)\n3. You are not uploading too many images or too large a file size at once\nIf the issue persists, please wait a moment and try again.",
    },
  },
  {
    question: {
      ja: "クイズ機能の使い方を教えてください",
      ko: "퀴즈 기능 사용 방법을 알려주세요",
      en: "How do I use the quiz feature?",
    },
    answer: {
      ja: "ノートを作成した後、クイズタブから対象のノートを選択すると、ノートの内容に基づいたクイズが自動で生成されます。クイズの形式や難易度はいくつかの選択肢から選ぶことができ、生成されたクイズはセットとして保存され、いつでも復習できます。",
      ko: "노트를 작성한 후 퀴즈 탭에서 대상 노트를 선택하면 노트 내용을 바탕으로 퀴즈가 자동으로 생성됩니다. 퀴즈의 형식과 난이도는 여러 옵션 중에서 선택할 수 있으며, 생성된 퀴즈는 세트로 저장되어 언제든지 복습할 수 있습니다.",
      en: "After creating a note, select the target note from the Quiz tab to automatically generate a quiz based on the note's content. You can choose from several quiz formats and difficulty levels, and generated quizzes are saved as sets so you can review them anytime.",
    },
  },
  {
    question: {
      ja: "作成したノートやフォルダはどこに保存されますか？",
      ko: "작성한 노트와 폴더는 어디에 저장되나요?",
      en: "Where are my notes and folders saved?",
    },
    answer: {
      ja: "作成したノート・フォルダ・クイズのデータはお使いの端末内に保存されます。AIによるノート生成の際は、撮影・選択した画像が処理のため一時的にサーバーへ送信されますが、生成後は保存されません。アプリをアンインストールするとノートデータは削除されますので、大事なノートは事前にご確認ください。",
      ko: "작성한 노트・폴더・퀴즈 데이터는 사용 중인 기기 내에 저장됩니다. AI 노트 생성 시 촬영・선택한 이미지가 처리를 위해 일시적으로 서버에 전송되지만, 생성 후에는 보관되지 않습니다. 앱을 삭제하면 노트 데이터도 삭제되므로 중요한 노트는 사전에 확인해 주세요.",
      en: "Notes, folders, and quizzes you create are stored on your device. When generating a note with AI, the photos you take or select are temporarily sent to a server for processing, but they are not retained afterward. Uninstalling the app will delete your note data, so please make sure to back up any important notes beforehand.",
    },
  },
  {
    question: {
      ja: "無料で使える範囲と有料プランについて教えてください",
      ko: "무료로 이용 가능한 범위와 유료 플랜에 대해 알려주세요",
      en: "What can I use for free, and what do the paid plans offer?",
    },
    answer: {
      ja: "無料でも一定回数までノート生成やクイズ作成をお試しいただけます。無料利用回数を超えてご利用される場合は、アプリ内の有料プラン（週間・月間・半年・年間プランなど）へのご登録が必要です。プランは自動更新のサブスクリプションとなり、更新の24時間前までに解約しない場合、自動的に更新されます。解約は端末の「設定」アプリ→Apple ID→「サブスクリプション」から行えます。",
      ko: "무료로도 일정 횟수까지 노트 생성과 퀴즈 작성을 이용해 볼 수 있습니다. 무료 이용 횟수를 초과하여 이용하시려면 앱 내 유료 플랜(주간・월간・반년・연간 플랜 등)에 등록이 필요합니다. 플랜은 자동 갱신 구독이며, 갱신 24시간 전까지 해지하지 않으면 자동으로 갱신됩니다. 해지는 기기의 「설정」앱 → Apple ID → 「구독」에서 가능합니다.",
      en: "You can try note generation and quiz creation for free up to a certain number of times. To continue using these features beyond the free limit, you'll need to subscribe to one of the in-app paid plans (weekly, monthly, half-yearly, yearly, etc.). Plans are auto-renewing subscriptions, and unless canceled at least 24 hours before renewal, they will renew automatically. You can cancel anytime from your device's Settings app → Apple ID → Subscriptions.",
    },
  },
  {
    question: {
      ja: "購入した内容が反映されません",
      ko: "구매한 내용이 반영되지 않습니다",
      en: "My purchase isn't being reflected",
    },
    answer: {
      ja: "設定画面の「購入を復元」をタップしてください。Apple IDに紐づいた購入情報が再度反映されます。それでも反映されない場合は、購入時のApple IDでログインしているかをご確認のうえ、お問い合わせください。",
      ko: "설정 화면의 「구매 복원」을 눌러 주세요. Apple ID에 연결된 구매 정보가 다시 반영됩니다. 그래도 반영되지 않는 경우, 구매 시 사용한 Apple ID로 로그인되어 있는지 확인 후 문의해 주세요.",
      en: "Please tap \"Restore Purchases\" in the Settings screen. This will re-apply your purchase information linked to your Apple ID. If it still doesn't reflect, please confirm you're signed in with the Apple ID used at the time of purchase, then contact us.",
    },
  },
  {
    question: {
      ja: "フォルダやノートを削除するとどうなりますか？",
      ko: "폴더나 노트를 삭제하면 어떻게 되나요?",
      en: "What happens if I delete a folder or note?",
    },
    answer: {
      ja: "フォルダやノートを削除すると、その中に含まれるノート・クイズのデータも完全に削除され、復元することはできません。削除する際は内容をよくご確認のうえ操作してください。",
      ko: "폴더나 노트를 삭제하면 그 안에 포함된 노트・퀴즈 데이터도 완전히 삭제되며 복원할 수 없습니다. 삭제 시에는 내용을 충분히 확인한 후 진행해 주세요.",
      en: "Deleting a folder or note will permanently delete all notes and quizzes contained within it, and this cannot be undone. Please make sure to check the contents carefully before deleting.",
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
export default function SnapNoteSupportPage() {
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
              alt="SnapNote"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">SnapNote</h1>
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
            href="/support/snapnote/privacy"
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
          <p>&copy; {currentYear} SnapNote. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
