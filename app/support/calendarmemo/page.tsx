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
      ja: "カレンダーメモは、カレンダー形式で日付ごとにメモ（チェックリスト）を管理できるアプリです。各日付にチェックボックス付きのメモを追加でき、時刻の設定やリマインダー通知、完了・未完了でのフィルター、キーワード検索、パスコードロックなどを利用できます。",
      ko: "カレンダーメモ는 캘린더 형식으로 날짜별로 메모(체크리스트)를 관리할 수 있는 앱입니다. 각 날짜에 체크박스가 있는 메모를 추가할 수 있으며, 시각 설정과 알림, 완료・미완료 필터, 키워드 검색, 패스코드 잠금 등을 사용할 수 있습니다.",
      en: "カレンダーメモ is an app for managing memos (checklists) by date in a calendar format. You can add checkbox memos to each date, set times and reminders, filter by completed or open status, search by keyword, and lock the app with a passcode.",
    },
  },
  {
    question: {
      ja: "メモの追加・編集方法を教えてください",
      ko: "메모 추가·편집 방법을 알려주세요",
      en: "How do I add or edit a memo?",
    },
    answer: {
      ja: "カレンダー画面で任意の日付をタップするとメモ画面が開きます。画面下部の入力欄にテキストを入力して追加するとメモが作成されます。過去・未来を問わず、どの日付にも追加できます。メモの左のチェックボックスをタップすると完了/未完了を切り替えられ、メモを長押ししてドラッグすると並び替えができます。不要なメモは、項目の右側にあるゴミ箱アイコンで削除できます。",
      ko: "캘린더 화면에서 원하는 날짜를 탭하면 메모 화면이 열립니다. 화면 하단의 입력란에 텍스트를 입력해 추가하면 메모가 만들어집니다. 과거・미래 상관없이 어떤 날짜에도 추가할 수 있습니다. 메모 왼쪽의 체크박스를 탭하면 완료/미완료를 전환할 수 있고, 메모를 길게 눌러 드래그하면 순서를 변경할 수 있습니다. 필요 없는 메모는 항목 오른쪽의 휴지통 아이콘으로 삭제할 수 있습니다.",
      en: "Tap any date on the calendar screen to open the memo screen. Enter text in the input field at the bottom to add a memo. You can add memos to any date, past or future. Tap the checkbox on the left of a memo to toggle it between completed and open, and long-press and drag a memo to reorder it. To delete a memo, tap the trash icon on the right side of the item.",
    },
  },
  {
    question: {
      ja: "メモに時刻を設定したり、通知を受け取ったりできますか？",
      ko: "메모에 시각을 설정하거나 알림을 받을 수 있나요?",
      en: "Can I set a time on a memo and get notified?",
    },
    answer: {
      ja: "はい。メモの時計アイコンから開始時刻（終了時刻は任意）を設定できます。設定画面の「リマインダー」をオンにすると、時刻を設定したメモを開始時刻ちょうど、または指定した分数前に通知します。初めてオンにするときに通知の許可を求められますので、許可してください。通知がオフの場合は、端末の「設定」アプリからこのアプリの通知を許可してください。",
      ko: "네. 메모의 시계 아이콘에서 시작 시각(종료 시각은 선택)을 설정할 수 있습니다. 설정 화면에서 「리마인더」를 켜면 시각을 설정한 메모를 시작 시각 정각 또는 지정한 분 전에 알려줍니다. 처음 켤 때 알림 허용을 요청하므로 허용해 주세요. 알림이 꺼져 있다면 기기의 「설정」 앱에서 이 앱의 알림을 허용해 주세요.",
      en: "Yes. Tap the clock icon on a memo to set a start time (an end time is optional). Turn on \"Reminder\" in Settings to be notified at the start time or a set number of minutes before. You will be asked for notification permission the first time you turn it on. If notifications are off, allow them for this app in your device's Settings app.",
    },
  },
  {
    question: {
      ja: "未完了のメモを次の日に移したい",
      ko: "미완료 메모를 다음 날로 옮기고 싶습니다",
      en: "How do I move unfinished memos to the next day?",
    },
    answer: {
      ja: "メモ画面にある「未完了を次の日へ」ボタンをタップすると、その日の未完了のメモをまとめて翌日に移動できます。確認画面で件数を確認してから「移動」を選んでください。ボタンはドラッグして位置を動かすこともできます。",
      ko: "메모 화면의 「미완료를 다음 날로」 버튼을 탭하면 그날의 미완료 메모를 한꺼번에 다음 날로 옮길 수 있습니다. 확인 화면에서 건수를 확인한 후 「이동」을 선택해 주세요. 버튼은 드래그하여 위치를 옮길 수도 있습니다.",
      en: "Tap the \"Move unchecked to next day\" button on the memo screen to move all of that day's unchecked memos to the next day at once. Check the count in the confirmation and choose \"Move\". You can also drag the button to reposition it.",
    },
  },
  {
    question: {
      ja: "フィルター機能はどのように使いますか？",
      ko: "필터 기능은 어떻게 사용하나요?",
      en: "How do I use the filter feature?",
    },
    answer: {
      ja: "カレンダー画面やメモ画面の上部に「全て」「未完了」「完了」のフィルターがあります。「未完了」を選ぶとチェックしていないメモだけが表示され、「完了」を選ぶとチェック済みのメモだけが表示されます。",
      ko: "캘린더 화면과 메모 화면 상단에 「전체」「미완료」「완료」 필터가 있습니다. 「미완료」를 선택하면 체크하지 않은 메모만 표시되고, 「완료」를 선택하면 체크된 메모만 표시됩니다.",
      en: "Filters for \"All\", \"Open\", and \"Done\" are displayed at the top of the calendar and memo screens. Selecting \"Open\" shows only unchecked memos, and selecting \"Done\" shows only checked memos.",
    },
  },
  {
    question: {
      ja: "仕切り（セクション）の追加方法を教えてください",
      ko: "구분선(섹션) 추가 방법을 알려주세요",
      en: "How do I add a divider (section)?",
    },
    answer: {
      ja: "メモ画面の入力欄付近にある「仕切り」ボタンをタップすると、メモ一覧にセクション名つきの仕切りを追加できます。仕切りの色は13色から選べます。仕切りもドラッグで位置を変更したり、ゴミ箱アイコンで削除したりできます。",
      ko: "메모 화면 입력란 근처의 「구분선」 버튼을 탭하면 메모 목록에 섹션 이름이 있는 구분선을 추가할 수 있습니다. 구분선의 색상은 13가지 중에서 선택할 수 있습니다. 구분선도 드래그로 위치를 변경하거나 휴지통 아이콘으로 삭제할 수 있습니다.",
      en: "Tap the \"Divider\" button near the input field on the memo screen to add a divider with a section name to the memo list. You can choose its color from 13 options. Dividers can also be repositioned by dragging or deleted with the trash icon.",
    },
  },
  {
    question: {
      ja: "メモをキーワードで検索するには？",
      ko: "메모를 키워드로 검색하려면?",
      en: "How do I search memos by keyword?",
    },
    answer: {
      ja: "画面下部のタブバーの「検索」をタップして検索画面を開き、キーワードを入力すると、全日付のメモの中から一致するメモが表示されます。検索結果をタップすると、そのメモの日付に移動できます。",
      ko: "화면 하단 탭 바의 「검색」을 탭하여 검색 화면을 열고 키워드를 입력하면 모든 날짜의 메모 중 일치하는 메모가 표시됩니다. 검색 결과를 탭하면 해당 메모의 날짜로 이동할 수 있습니다.",
      en: "Tap \"Search\" in the tab bar at the bottom of the screen and enter a keyword to display matching memos from all dates. Tapping a result takes you to that memo's date.",
    },
  },
  {
    question: {
      ja: "パスコードロックや Face ID を使いたい",
      ko: "패스코드 잠금이나 Face ID를 사용하고 싶습니다",
      en: "How do I use the passcode lock or Face ID?",
    },
    answer: {
      ja: "設定画面の「パスコードロック」から4桁のパスコードを設定できます。設定後は「生体認証でロック解除」をオンにすると、Face ID / Touch ID でも解除できます。パスコードの変更や解除も同じ画面から行えます。\n※パスコードを忘れた場合は、アプリを再インストールする必要があり、その際に保存されているメモも削除されます。",
      ko: "설정 화면의 「패스코드 잠금」에서 4자리 패스코드를 설정할 수 있습니다. 설정 후 「생체 인증으로 잠금 해제」를 켜면 Face ID / Touch ID로도 해제할 수 있습니다. 패스코드 변경이나 해제도 같은 화면에서 할 수 있습니다.\n※ 패스코드를 잊어버린 경우 앱을 재설치해야 하며, 이때 저장된 메모도 삭제됩니다.",
      en: "You can set a 4-digit passcode from \"Passcode Lock\" in Settings. After setting it, turn on \"Unlock with Biometrics\" to also unlock with Face ID / Touch ID. You can change or disable the passcode from the same screen.\n※ If you forget your passcode, you will need to reinstall the app, which also deletes your saved memos.",
    },
  },
  {
    question: {
      ja: "テーマやアクセントカラーを変更したい",
      ko: "테마나 액센트 색상을 변경하고 싶습니다",
      en: "I want to change the theme or accent color",
    },
    answer: {
      ja: "設定画面から変更できます。「テーマモード」でライト・ダークを、「テーマカラー」で好みの色を選択できます。設定はアプリを再起動しても保持されます。",
      ko: "설정 화면에서 변경할 수 있습니다. 「테마 모드」에서 라이트・다크를, 「테마 색상」에서 원하는 색상을 선택할 수 있습니다. 설정은 앱을 재시작해도 유지됩니다.",
      en: "You can change these from the Settings screen. Choose Light or Dark under \"Theme Mode\" and pick your favorite color under \"Theme Color\". Settings are retained even after restarting the app.",
    },
  },
  {
    question: {
      ja: "広告を非表示にするには？復元はできますか？",
      ko: "광고를 숨기려면? 복원할 수 있나요?",
      en: "How do I remove ads? Can I restore my purchase?",
    },
    answer: {
      ja: "設定画面の「広告を削除」から、買い切りまたは期間プランをお選びいただくと、広告が表示されなくなります。機種変更や再インストールをした場合は、同じ画面の「購入を復元する」から、購入済みの内容を復元できます。サブスクリプションの管理・解約は、App Storeのアカウント設定から行えます。",
      ko: "설정 화면의 「광고 제거」에서 일회성 구매 또는 기간 플랜을 선택하면 광고가 표시되지 않습니다. 기기 변경이나 재설치를 한 경우 같은 화면의 「구매 복원」에서 구매한 내용을 복원할 수 있습니다. 구독의 관리・해지는 App Store의 계정 설정에서 할 수 있습니다.",
      en: "Choose a one-time or period plan from \"Remove Ads\" in Settings and ads will no longer be shown. If you changed devices or reinstalled the app, use \"Restore Purchases\" on the same screen to restore your purchase. You can manage or cancel subscriptions in your App Store account settings.",
    },
  },
  {
    question: {
      ja: "メモのデータはどこに保存されますか？バックアップはできますか？",
      ko: "메모 데이터는 어디에 저장되나요? 백업할 수 있나요?",
      en: "Where is my memo data saved? Can I back it up?",
    },
    answer: {
      ja: "メモのデータはすべてお使いの端末内に保存され、サーバーへは送信されません。アプリをアンインストールしたり端末を初期化したりするとメモは削除されますのでご注意ください。現時点ではバックアップ・エクスポート機能はご用意しておりません。",
      ko: "메모 데이터는 모두 사용 중인 기기 내에 저장되며 서버로 전송되지 않습니다. 앱을 삭제하거나 기기를 초기화하면 메모가 삭제되므로 주의해 주세요. 현재 백업・내보내기 기능은 제공되지 않습니다.",
      en: "All memo data is saved on your device and is not sent to a server. Please note that uninstalling the app or resetting your device will delete your memos. There is currently no backup or export feature.",
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
