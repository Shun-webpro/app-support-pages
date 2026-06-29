"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/calendermemo.png";

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
    aboutSupportText: "カレンダーメモをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "カレンダーメモ를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using カレンダーメモ. If you have any questions or issues, please check the FAQ below or contact us.",
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
      ja: "カレンダーメモはどのようなアプリですか？",
      ko: "カレンダーメモ는 어떤 앱인가요?",
      en: "What kind of app is カレンダーメモ?",
    },
    answer: {
      ja: "カレンダーメモは、カレンダー形式で日付ごとにメモを管理できるアプリです。各日付にチェックボックス付きのメモを追加でき、完了・未完了でフィルタリングしたり、キーワードで検索したりすることができます。また、ウィジェットを使って今日のメモをホーム画面から確認することもできます。",
      ko: "カレンダーメモ는 캘린더 형식으로 날짜별로 메모를 관리할 수 있는 앱입니다. 각 날짜에 체크박스가 있는 메모를 추가할 수 있으며, 완료·미완료로 필터링하거나 키워드로 검색할 수 있습니다. 또한 위젯을 사용하여 오늘의 메모를 홈 화면에서 확인할 수도 있습니다.",
      en: "カレンダーメモ is an app that lets you manage memos by date in a calendar format. You can add checkbox memos to each date, filter by completed or uncompleted status, and search by keyword. You can also use a widget to check today's memos from the home screen.",
    },
  },
  {
    question: {
      ja: "メモの追加・編集方法を教えてください",
      ko: "메모 추가·편집 방법을 알려주세요",
      en: "How do I add or edit a memo?",
    },
    answer: {
      ja: "カレンダー画面で任意の日付をタップするとメモ画面が開きます。画面下部の入力欄にテキストを入力して追加ボタンを押すとメモが追加されます。メモの左のチェックボックスをタップすると完了/未完了を切り替えられます。メモを長押しするとドラッグで並び替えができます。メモを左にスワイプすると削除できます。",
      ko: "캘린더 화면에서 원하는 날짜를 탭하면 메모 화면이 열립니다. 화면 하단의 입력란에 텍스트를 입력하고 추가 버튼을 누르면 메모가 추가됩니다. 메모 왼쪽의 체크박스를 탭하면 완료/미완료를 전환할 수 있습니다. 메모를 길게 누르면 드래그로 순서를 변경할 수 있습니다. 메모를 왼쪽으로 스와이프하면 삭제할 수 있습니다.",
      en: "Tap any date on the calendar screen to open the memo screen. Enter text in the input field at the bottom and tap the add button to add a memo. Tap the checkbox on the left of a memo to toggle it between completed and uncompleted. Long-press a memo to drag and reorder it. Swipe a memo to the left to delete it.",
    },
  },
  {
    question: {
      ja: "フィルター機能はどのように使いますか？",
      ko: "필터 기능은 어떻게 사용하나요?",
      en: "How do I use the filter feature?",
    },
    answer: {
      ja: "カレンダー画面およびメモ画面の上部に「全て」「未完了」「完了」のフィルターボタンがあります。「未完了」を選ぶとチェックしていないメモだけが表示され、「完了」を選ぶとチェック済みのメモだけが表示されます。設定したフィルターは次回起動時も保持されます。",
      ko: "캘린더 화면과 메모 화면 상단에 「전체」「미완료」「완료」 필터 버튼이 있습니다. 「미완료」를 선택하면 체크하지 않은 메모만 표시되고, 「완료」를 선택하면 체크된 메모만 표시됩니다. 설정한 필터는 다음번 실행 시에도 유지됩니다.",
      en: "Filter buttons for \"All\", \"Uncompleted\", and \"Completed\" are displayed at the top of the calendar and memo screens. Selecting \"Uncompleted\" shows only unchecked memos, and selecting \"Completed\" shows only checked memos. Your filter setting is retained the next time you open the app.",
    },
  },
  {
    question: {
      ja: "区切り線（ディバイダー）の追加方法を教えてください",
      ko: "구분선(디바이더) 추가 방법을 알려주세요",
      en: "How do I add a divider?",
    },
    answer: {
      ja: "メモ画面の下部入力欄の右にある区切り線ボタンをタップすると、メモ一覧に色付きの区切り線を追加できます。区切り線をタップするとカラーピッカーが開き、色を変更できます。区切り線もドラッグで位置を変更したり、スワイプで削除したりできます。",
      ko: "메모 화면 하단 입력란 오른쪽에 있는 구분선 버튼을 탭하면 메모 목록에 색상 구분선을 추가할 수 있습니다. 구분선을 탭하면 색상 선택기가 열려 색상을 변경할 수 있습니다. 구분선도 드래그로 위치를 변경하거나 스와이프로 삭제할 수 있습니다.",
      en: "Tap the divider button to the right of the input field at the bottom of the memo screen to add a colored divider to the memo list. Tapping a divider opens a color picker to change its color. Dividers can also be repositioned by dragging or deleted by swiping.",
    },
  },
  {
    question: {
      ja: "ウィジェットの設定方法を教えてください",
      ko: "위젯 설정 방법을 알려주세요",
      en: "How do I set up the widget?",
    },
    answer: {
      ja: "設定画面でウィジェットをオンにしてください。その後、iPhoneのホーム画面を長押しして編集モードにし、「＋」ボタンからカレンダーメモのウィジェットを追加できます。ウィジェットには今日のメモが表示されます。\n※ウィジェットの表示はOSの仕様により、リアルタイムではなく一定の間隔で更新されます。",
      ko: "설정 화면에서 위젯을 켜세요. 그런 다음 iPhone 홈 화면을 길게 눌러 편집 모드로 들어가고, 「+」버튼에서 カレンダーメモ 위젯을 추가할 수 있습니다. 위젯에는 오늘의 메모가 표시됩니다.\n※ 위젯 표시는 OS 사양상 실시간이 아닌 일정 간격으로 업데이트됩니다.",
      en: "Turn on the widget from the Settings screen. Then long-press the iPhone home screen to enter edit mode, and add the カレンダーメモ widget from the \"+\" button. The widget displays today's memos.\n※ Due to OS specifications, the widget updates at intervals, not in real time.",
    },
  },
  {
    question: {
      ja: "テーマやアクセントカラーを変更したい",
      ko: "테마나 액센트 색상을 변경하고 싶습니다",
      en: "I want to change the theme or accent color",
    },
    answer: {
      ja: "設定画面から変更できます。テーマはライト・ダーク・自動（端末の設定に合わせる）から選択できます。アクセントカラーはカラーピッカーで好みの色を選ぶことができます。設定はアプリを再起動しても保持されます。",
      ko: "설정 화면에서 변경할 수 있습니다. 테마는 라이트・다크・자동(기기 설정에 맞춤) 중에서 선택할 수 있습니다. 액센트 색상은 색상 선택기에서 원하는 색상을 선택할 수 있습니다. 설정은 앱을 재시작해도 유지됩니다.",
      en: "You can change these from the Settings screen. The theme can be set to Light, Dark, or Auto (follows device settings). The accent color can be chosen with a color picker. Settings are retained even after restarting the app.",
    },
  },
  {
    question: {
      ja: "メモのデータはどこに保存されますか？バックアップはできますか？",
      ko: "메모 데이터는 어디에 저장되나요? 백업할 수 있나요?",
      en: "Where is my memo data saved? Can I back it up?",
    },
    answer: {
      ja: "メモのデータはすべてお使いの端末内に保存されます。サーバーへのデータ送信は行っておりません。アプリをアンインストールするとすべてのメモデータが削除されますのでご注意ください。現時点では外部へのエクスポート機能はご用意しておりません。",
      ko: "메모 데이터는 모두 사용 중인 기기 내에 저장됩니다. 서버로 데이터를 전송하지 않습니다. 앱을 삭제하면 모든 메모 데이터가 삭제되므로 주의해 주세요. 현재 외부로의 내보내기 기능은 제공되지 않습니다.",
      en: "All memo data is saved on your device. No data is sent to a server. Please note that uninstalling the app will delete all memo data. There is currently no export feature available.",
    },
  },
  {
    question: {
      ja: "メモをキーワードで検索するには？",
      ko: "메모를 키워드로 검색하려면?",
      en: "How do I search memos by keyword?",
    },
    answer: {
      ja: "画面下部のタブバーにある検索アイコンをタップすると検索画面が開きます。検索欄にキーワードを入力すると、全日付のメモの中からキーワードに一致するメモが表示されます。検索結果の日付をタップすると、そのメモ画面に移動できます。",
      ko: "화면 하단 탭 바의 검색 아이콘을 탭하면 검색 화면이 열립니다. 검색란에 키워드를 입력하면 모든 날짜의 메모 중 키워드와 일치하는 메모가 표시됩니다. 검색 결과의 날짜를 탭하면 해당 메모 화면으로 이동할 수 있습니다.",
      en: "Tap the search icon in the tab bar at the bottom of the screen to open the search screen. Enter a keyword in the search field to display memos matching the keyword from all dates. Tapping a date in the results will navigate you to that memo screen.",
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
export default function CalendarMemoSupportPage() {
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
              alt="カレンダーメモ"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">カレンダーメモ</h1>
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
            href="/support/calendarmemo/privacy"
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
          <p>&copy; {currentYear} カレンダーメモ. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
