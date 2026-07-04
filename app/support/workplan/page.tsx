"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/workplan.png";

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
    aboutSupportText: "WorkPlanをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "WorkPlan을 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using WorkPlan. If you have any questions or issues, please check the FAQ below or contact us.",
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
      ja: "WorkPlanはどのようなアプリですか？",
      ko: "WorkPlan은 어떤 앱인가요?",
      en: "What kind of app is WorkPlan?",
    },
    answer: {
      ja: "WorkPlanは、タスク管理・スケジュール確認・月間カレンダーを1つにまとめた予定管理アプリです。タスクや予定にジャンル（カテゴリ）や優先度、期限を設定でき、24時間の円形ビューで1日の流れを直感的に把握できます。",
      ko: "WorkPlan은 작업 관리・일정 확인・월간 캘린더를 하나로 모은 일정 관리 앱입니다. 작업이나 일정에 장르(카테고리)와 우선순위, 마감일을 설정할 수 있으며, 24시간 원형 뷰로 하루의 흐름을 직관적으로 파악할 수 있습니다.",
      en: "WorkPlan is a planning app that combines task management, a daily schedule view, and a monthly calendar in one place. You can assign a genre (category), priority, and deadline to each task or event, and grasp the flow of your day intuitively with a 24-hour circular view.",
    },
  },
  {
    question: {
      ja: "タスクの追加・優先度・期限の設定方法を教えてください",
      ko: "작업 추가・우선순위・마감일 설정 방법을 알려주세요",
      en: "How do I add a task, set its priority, or set a deadline?",
    },
    answer: {
      ja: "「タスク」タブの追加ボタンからタイトルを入力し、必要に応じてジャンル・優先度（低・中・高）・期限（日付と時刻）を設定できます。期限を設定したタスクには「今日」「期限切れ」「N日後」といった残り日数バッジが色分けで表示されます。チェックボックスをタップすると完了/未完了を切り替えられます。",
      ko: "「작업」탭의 추가 버튼에서 제목을 입력하고 필요에 따라 장르・우선순위(낮음・보통・높음)・마감일(날짜와 시간)을 설정할 수 있습니다. 마감일을 설정한 작업에는 「오늘」「기한 만료」「N일 후」와 같은 남은 일수 배지가 색상별로 표시됩니다. 체크박스를 탭하면 완료/미완료를 전환할 수 있습니다.",
      en: "From the add button on the Tasks tab, enter a title and optionally set a genre, priority (Low/Medium/High), and deadline (date and time). Tasks with a deadline show a color-coded badge such as \"Today\", \"Overdue\", or \"N days left\". Tap the checkbox to toggle a task between completed and uncompleted.",
    },
  },
  {
    question: {
      ja: "スケジュールタブの24時間ビューはどのように使いますか？",
      ko: "일정 탭의 24시간 뷰는 어떻게 사용하나요?",
      en: "How do I use the 24-hour view on the Schedule tab?",
    },
    answer: {
      ja: "「スケジュール」タブでは「今日」と「明日」を切り替えて表示でき、それぞれの予定・タスクが24時間の円形ビュー上にジャンルの色で配置されます。今日のビューには現在時刻を示す針が表示されます。円上の予定をタップすると、下のリストの該当カードまで自動でスクロールしてハイライトされます。「＋」ボタンから直接その日の予定・タスクを追加することもできます。",
      ko: "「일정」탭에서는 「오늘」과 「내일」을 전환하여 표시할 수 있으며, 각각의 일정・작업이 24시간 원형 뷰에 장르 색상으로 배치됩니다. 오늘 뷰에는 현재 시각을 나타내는 바늘이 표시됩니다. 원 위의 일정을 탭하면 아래 목록의 해당 카드로 자동 스크롤되어 강조 표시됩니다. 「+」버튼으로 해당 날짜의 일정・작업을 바로 추가할 수도 있습니다.",
      en: "The Schedule tab lets you switch between \"Today\" and \"Tomorrow\", displaying each day's events and tasks on a 24-hour circular view, color-coded by genre. Today's view includes a hand showing the current time. Tapping an item on the circle auto-scrolls to and highlights its card in the list below. You can also add an event or task for that day directly using the \"+\" button.",
    },
  },
  {
    question: {
      ja: "カレンダータブのグリッド表示とリスト表示の違いは何ですか？",
      ko: "캘린더 탭의 그리드 표시와 리스트 표시의 차이는 무엇인가요?",
      en: "What is the difference between Grid view and List view on the Calendar tab?",
    },
    answer: {
      ja: "グリッド表示は一般的な月間カレンダー形式で、各日に最大3件の予定を表示し、それ以上は「+N」で件数を表示します。リスト表示は日付ごとに予定を縦に並べたアジェンダ形式です。いずれの表示でも日付をタップすると、その日の24時間ビューと予定・タスクの一覧がモーダルで表示されます。",
      ko: "그리드 표시는 일반적인 월간 캘린더 형식으로, 각 날짜에 최대 3건의 일정을 표시하고 그 이상은 「+N」으로 건수를 표시합니다. 리스트 표시는 날짜별로 일정을 세로로 나열한 어젠다 형식입니다. 어느 표시에서든 날짜를 탭하면 해당 날짜의 24시간 뷰와 일정・작업 목록이 모달로 표시됩니다.",
      en: "Grid view is a standard monthly calendar layout showing up to 3 events per day, with a \"+N\" indicator for any additional events. List view is a vertical agenda showing events day by day. In either view, tapping a date opens a modal with that day's 24-hour view and its full list of events and tasks.",
    },
  },
  {
    question: {
      ja: "予定の時間が重複するとどうなりますか？",
      ko: "일정 시간이 겹치면 어떻게 되나요?",
      en: "What happens if event times overlap?",
    },
    answer: {
      ja: "設定画面の「重複する予定を防止する」をオンにすると、既存の予定・タスクと時間が重なる新しい予定を追加しようとした際にエラーメッセージが表示され、追加がブロックされます。オフの場合は時間が重複していても追加できます。なお、複数日にまたがる予定（開始日時から終了日時）を作成することも可能で、その場合は該当するすべての日に表示されます。",
      ko: "설정 화면의 「겹치는 일정 방지」를 켜면, 기존 일정・작업과 시간이 겹치는 새 일정을 추가하려 할 때 오류 메시지가 표시되고 추가가 차단됩니다. 꺼져 있으면 시간이 겹쳐도 추가할 수 있습니다. 또한 여러 날에 걸친 일정(시작 일시부터 종료 일시)을 만들 수도 있으며, 이 경우 해당하는 모든 날짜에 표시됩니다.",
      en: "When \"Prevent overlapping events\" is turned on in Settings, trying to add a new event or task that overlaps in time with an existing one will show an error message and block the addition. When it's off, overlapping times are allowed. You can also create events that span multiple days (from a start date/time to an end date/time), and they will appear on every day within that range.",
    },
  },
  {
    question: {
      ja: "ジャンル（カテゴリ）はカスタマイズできますか？",
      ko: "장르(카테고리)를 커스터마이징할 수 있나요?",
      en: "Can I customize genres (categories)?",
    },
    answer: {
      ja: "はい。初期状態では「会議」「アポ」「仕事」「個人」「その他」の5つのジャンルが用意されていますが、設定画面から新しいジャンルの追加、ラベルと色の編集、削除が自由に行えます。ジャンルの色は、カレンダー・24時間ビュー・タスクカードの色分けに使用され、タスク一覧の絞り込みにも利用できます。",
      ko: "네. 초기 상태에서는 「회의」「약속」「업무」「개인」「기타」의 5개 장르가 준비되어 있지만, 설정 화면에서 새 장르 추가, 라벨과 색상 편집, 삭제를 자유롭게 할 수 있습니다. 장르 색상은 캘린더・24시간 뷰・작업 카드의 색상 구분에 사용되며, 작업 목록 필터링에도 활용할 수 있습니다.",
      en: "Yes. By default there are five genres — Meeting, Appointment, Work, Personal, and Other — but you can freely add new genres, edit their label and color, or delete them from the Settings screen. Genre colors are used to color-code the calendar, the 24-hour view, and task cards, and can also be used to filter the task list.",
    },
  },
  {
    question: {
      ja: "リマインダー通知の設定方法を教えてください",
      ko: "리마인더 알림 설정 방법을 알려주세요",
      en: "How do I set up reminder notifications?",
    },
    answer: {
      ja: "設定画面の「リマインダー通知」をオンにすると、通知の許可が求められます。許可後、通知を送るタイミング（例：開始・期限の10分前、1日前など）を複数追加できます。設定した各タイミングで、予定の開始時刻またはタスクの期限に対して端末に通知が送られます。通知はすべて端末内でスケジュールされるローカル通知で、予定・タスクを編集または削除すると自動的に再設定・キャンセルされます。",
      ko: "설정 화면의 「리마인더 알림」을 켜면 알림 권한을 요청합니다. 허용 후, 알림을 보낼 타이밍(예: 시작・마감 10분 전, 1일 전 등)을 여러 개 추가할 수 있습니다. 설정한 각 타이밍에 맞춰 일정의 시작 시각이나 작업의 마감일에 대해 기기로 알림이 전송됩니다. 알림은 모두 기기 내에서 예약되는 로컬 알림이며, 일정・작업을 수정하거나 삭제하면 자동으로 재설정・취소됩니다.",
      en: "Turning on \"Reminder notifications\" in Settings will prompt you to allow notifications. After granting permission, you can add multiple reminder timings (e.g., 10 minutes before, 1 day before the start or deadline). A notification is sent to your device at each configured timing relative to an event's start time or a task's deadline. All notifications are local notifications scheduled on your device, and are automatically rescheduled or canceled when you edit or delete the related task or event.",
    },
  },
  {
    question: {
      ja: "パスコードやFace ID（顔認証）でアプリをロックできますか？",
      ko: "패스코드나 Face ID(안면 인식)로 앱을 잠글 수 있나요?",
      en: "Can I lock the app with a passcode or Face ID?",
    },
    answer: {
      ja: "はい。設定画面から4桁のパスコードを設定すると、アプリ起動時やバックグラウンドから復帰した際にロック画面が表示されます。お使いの端末がFace ID／Touch IDに対応している場合は、生体認証でのロック解除も有効にできます。パスコードは端末のセキュアな領域（Keychain等）に保存され、アプリ内の他のデータとは別に安全に管理されます。",
      ko: "네. 설정 화면에서 4자리 패스코드를 설정하면 앱 실행 시나 백그라운드에서 복귀할 때 잠금 화면이 표시됩니다. 사용 중인 기기가 Face ID/Touch ID를 지원하는 경우 생체 인증을 통한 잠금 해제도 활성화할 수 있습니다. 패스코드는 기기의 보안 영역(Keychain 등)에 저장되어 앱 내 다른 데이터와는 별도로 안전하게 관리됩니다.",
      en: "Yes. Setting a 4-digit passcode in Settings will show a lock screen when the app launches or returns from the background. If your device supports Face ID/Touch ID, you can also enable biometric unlock as an alternative. The passcode is stored in your device's secure storage area (such as the Keychain), managed separately and securely from the app's other data.",
    },
  },
  {
    question: {
      ja: "ダークモードやアクセントカラーは変更できますか？",
      ko: "다크 모드나 액센트 색상을 변경할 수 있나요?",
      en: "Can I change dark mode or the accent color?",
    },
    answer: {
      ja: "はい。設定画面からライトモード・ダークモードを切り替えられます。また、インディゴ・ブルー・ティール・ローズ・オレンジの5種類のアクセントカラーから好みのテーマを選択でき、ヘッダーやボタンなどアプリ全体の配色に反映されます。",
      ko: "네. 설정 화면에서 라이트 모드・다크 모드를 전환할 수 있습니다. 또한 인디고・블루・틸・로즈・오렌지의 5가지 액센트 색상 중에서 원하는 테마를 선택할 수 있으며, 헤더와 버튼 등 앱 전체의 색상에 반영됩니다.",
      en: "Yes. You can switch between Light and Dark mode from the Settings screen. You can also choose from five accent color themes — Indigo, Blue, Teal, Rose, and Orange — which are reflected throughout the app's headers, buttons, and other UI elements.",
    },
  },
  {
    question: {
      ja: "タスクや予定のデータはどこに保存されますか？バックアップはできますか？",
      ko: "작업이나 일정 데이터는 어디에 저장되나요? 백업할 수 있나요?",
      en: "Where is my task and event data saved? Can I back it up?",
    },
    answer: {
      ja: "タスク・予定・ジャンル・各種設定は、すべてお使いの端末内にのみ保存されます。サーバーへのデータ送信やアカウント登録は一切行っておらず、他の端末とのクラウド同期にも対応しておりません。アプリをアンインストールするとすべてのデータが削除されますので、あらかじめご了承ください。現時点ではデータのエクスポート機能はご用意しておりません。",
      ko: "작업・일정・장르・각종 설정은 모두 사용 중인 기기 내에만 저장됩니다. 서버로의 데이터 전송이나 계정 등록은 일절 하지 않으며, 다른 기기와의 클라우드 동기화도 지원하지 않습니다. 앱을 삭제하면 모든 데이터가 삭제되므로 미리 양해 부탁드립니다. 현재 데이터 내보내기 기능은 제공되지 않습니다.",
      en: "All tasks, events, genres, and settings are stored only on your device. The app does not send any data to a server, does not require an account, and does not support cloud sync across devices. Please note that uninstalling the app will delete all data. There is currently no data export feature available.",
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
export default function WorkPlanSupportPage() {
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
              alt="WorkPlan"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">WorkPlan</h1>
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
            href="/support/workplan/privacy"
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
          <p>&copy; {currentYear} WorkPlan. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
