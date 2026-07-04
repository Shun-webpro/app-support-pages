"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/Dairygram.png";

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
    aboutSupportText: "Dairygramをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "Dairygram을 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using Dairygram. If you have any questions or issues, please check the FAQ below or contact us.",
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
      ja: "Dairygramはどのようなアプリですか？",
      ko: "Dairygram은 어떤 앱인가요?",
      en: "What kind of app is Dairygram?",
    },
    answer: {
      ja: "Dairygramは、1日1つの日記を記録できるフォト日記アプリです。タイトルと本文に加えて、気分（5段階）と天気を記録でき、写真を添付することもできます。カレンダー表示や、気分・投稿数のグラフでこれまでの記録を振り返ることができます。",
      ko: "Dairygram은 하루에 하나의 일기를 기록할 수 있는 포토 다이어리 앱입니다. 제목과 본문에 더해 기분(5단계)과 날씨를 기록할 수 있으며, 사진을 첨부할 수도 있습니다. 캘린더 표시나 기분・게시 수 그래프로 지금까지의 기록을 되돌아볼 수 있습니다.",
      en: "Dairygram is a photo diary app where you can record one entry per day. In addition to a title and body text, you can record your mood (on a 5-point scale) and the weather, and attach photos. You can look back on your past entries using the calendar view and mood/post-count charts.",
    },
  },
  {
    question: {
      ja: "日記の書き方・写真の追加方法を教えてください",
      ko: "일기 작성 방법・사진 추가 방법을 알려주세요",
      en: "How do I write an entry and add photos?",
    },
    answer: {
      ja: "ホーム画面の追加ボタンから作成画面が開きます。タイトル（50文字以内）と本文を入力し、気分・天気を選択できます。日付は初期状態で当日ですが、変更して過去の日付として記録することも可能です。写真は「アルバムから選ぶ」または「カメラで撮影」から追加でき、複数枚添付できます。写真は長押しでドラッグして並び替えたり、個別に削除したりできます。",
      ko: "홈 화면의 추가 버튼에서 작성 화면이 열립니다. 제목(50자 이내)과 본문을 입력하고 기분・날씨를 선택할 수 있습니다. 날짜는 기본적으로 당일이지만, 변경하여 과거 날짜로 기록할 수도 있습니다. 사진은 「앨범에서 선택」 또는 「카메라로 촬영」에서 추가할 수 있으며 여러 장 첨부할 수 있습니다. 사진은 길게 눌러 드래그하여 순서를 바꾸거나 개별적으로 삭제할 수 있습니다.",
      en: "Tap the add button on the Home screen to open the entry composer. Enter a title (up to 50 characters) and body text, and select a mood and weather. The date defaults to today, but you can change it to record an entry for a past date. Add photos via \"Choose from Album\" or \"Take Photo\", and attach multiple photos. Photos can be reordered by long-pressing and dragging, or removed individually.",
    },
  },
  {
    question: {
      ja: "1日に複数の日記を記録できますか？",
      ko: "하루에 여러 개의 일기를 기록할 수 있나요?",
      en: "Can I record more than one entry per day?",
    },
    answer: {
      ja: "いいえ、Dairygramでは1つの日付につき1つの日記のみを記録する仕様になっています。すでに日記がある日付を選ぶと、その日の日記を編集する形になります。1日の出来事は1つのエントリーにまとめて記録してください。",
      ko: "아니요, Dairygram에서는 하나의 날짜에 하나의 일기만 기록할 수 있는 사양입니다. 이미 일기가 있는 날짜를 선택하면 해당 날짜의 일기를 수정하는 형태가 됩니다. 하루의 사건은 하나의 항목에 정리하여 기록해 주세요.",
      en: "No, Dairygram is designed so that only one entry can be recorded per calendar date. Selecting a date that already has an entry will open it for editing instead. Please record everything for a given day within that single entry.",
    },
  },
  {
    question: {
      ja: "気分や天気のアイコンにはどのような種類がありますか？",
      ko: "기분이나 날씨 아이콘에는 어떤 종류가 있나요?",
      en: "What mood and weather options are available?",
    },
    answer: {
      ja: "気分は「最悪」「悪い」「普通」「良い」「最高」の5段階から選択でき、それぞれ色分けされたアイコンで表示されます。天気は「晴れ」「曇り」「雨」「雪」「雷」の5種類から選択できます。どちらも設定は任意で、選択しなくても日記を保存できます。",
      ko: "기분은 「최악」「나쁨」「보통」「좋음」「최고」의 5단계에서 선택할 수 있으며, 각각 색상으로 구분된 아이콘으로 표시됩니다. 날씨는 「맑음」「흐림」「비」「눈」「천둥」의 5종류에서 선택할 수 있습니다. 둘 다 선택은 선택 사항이며, 선택하지 않아도 일기를 저장할 수 있습니다.",
      en: "Mood can be selected from 5 levels — Worst, Bad, Normal, Good, and Best — each shown with a color-coded icon. Weather can be selected from 5 types — Sunny, Cloudy, Rainy, Snowy, and Thunder. Both are optional; you can save an entry without selecting either.",
    },
  },
  {
    question: {
      ja: "ホーム画面のグリッド表示とリスト表示の違いは何ですか？",
      ko: "홈 화면의 그리드 표시와 리스트 표시의 차이는 무엇인가요?",
      en: "What is the difference between Grid view and List view on the Home screen?",
    },
    answer: {
      ja: "グリッド表示は月ごとに写真のサムネイルを並べて表示する形式です。リスト表示は日付・タイトル・サムネイルを縦に並べたシンプルな一覧形式です。画面上部の切り替えボタンでいつでも表示形式を変更できます。また、複数選択モードを使うと日記をまとめて削除することもできます。",
      ko: "그리드 표시는 월별로 사진 썸네일을 나열하는 형식입니다. 리스트 표시는 날짜・제목・썸네일을 세로로 나열한 심플한 목록 형식입니다. 화면 상단의 전환 버튼으로 언제든지 표시 형식을 변경할 수 있습니다. 또한 다중 선택 모드를 사용하면 일기를 한꺼번에 삭제할 수도 있습니다.",
      en: "Grid view arranges photo thumbnails by month. List view is a simple vertical list showing the date, title, and thumbnail for each entry. You can switch between the two at any time using the toggle button at the top of the screen. You can also use multi-select mode to delete multiple entries at once.",
    },
  },
  {
    question: {
      ja: "カレンダー画面ではどのようなことができますか？",
      ko: "캘린더 화면에서는 어떤 것을 할 수 있나요?",
      en: "What can I do on the Calendar screen?",
    },
    answer: {
      ja: "月間カレンダー形式で、日記が記録されている日を確認できます。日記がある日付をタップすると、その日の詳細（写真・気分・天気・本文）が表示されます。前月・翌月ボタンで月を移動できます。",
      ko: "월간 캘린더 형식으로 일기가 기록된 날짜를 확인할 수 있습니다. 일기가 있는 날짜를 탭하면 해당 날짜의 상세 내용(사진・기분・날씨・본문)이 표시됩니다. 이전 달・다음 달 버튼으로 월을 이동할 수 있습니다.",
      en: "The Calendar screen shows a monthly grid indicating which days have an entry. Tapping a date with an entry displays its details — photos, mood, weather, and body text. Use the previous/next month buttons to navigate between months.",
    },
  },
  {
    question: {
      ja: "マイページの気分グラフ・投稿数グラフは何を表していますか？",
      ko: "마이페이지의 기분 그래프・게시 수 그래프는 무엇을 나타내나요?",
      en: "What do the mood chart and post-count chart on My Page show?",
    },
    answer: {
      ja: "マイページでは、選択した月における気分の内訳を円グラフで確認できます。また、投稿数グラフでは今月の週ごとの投稿数、または直近6ヶ月分の月ごとの投稿数を切り替えて確認できます。月を移動して過去の記録も振り返ることができます。",
      ko: "마이페이지에서는 선택한 달의 기분 내역을 원 그래프로 확인할 수 있습니다. 또한 게시 수 그래프에서는 이번 달의 주별 게시 수, 또는 최근 6개월간의 월별 게시 수를 전환하여 확인할 수 있습니다. 달을 이동하여 과거 기록도 되돌아볼 수 있습니다.",
      en: "On the My Page screen, you can view a breakdown of your moods for the selected month as a pie chart. The post-count chart lets you switch between weekly counts for the current month and monthly counts for the past 6 months. You can navigate to other months to look back on past records.",
    },
  },
  {
    question: {
      ja: "下書きの自動保存機能について教えてください",
      ko: "임시 저장 자동 저장 기능에 대해 알려주세요",
      en: "How does draft auto-save work?",
    },
    answer: {
      ja: "設定で自動保存を有効にしている場合、新規作成中のタイトル・本文・写真・気分・天気・日付が一定間隔で自動的に下書きとして保存されます。日記を保存する前にアプリを閉じてしまった場合でも、次回起動時に下書きが復元されます。日記を保存すると下書きは自動的にクリアされます。なお、既存の日記を編集中の場合は下書き保存の対象外です。",
      ko: "설정에서 자동 저장을 활성화한 경우, 새로 작성 중인 제목・본문・사진・기분・날씨・날짜가 일정 간격으로 자동으로 임시 저장됩니다. 일기를 저장하기 전에 앱을 닫아버린 경우에도 다음 실행 시 임시 저장 내용이 복원됩니다. 일기를 저장하면 임시 저장 내용은 자동으로 삭제됩니다. 단, 기존 일기를 수정 중인 경우에는 임시 저장 대상에서 제외됩니다.",
      en: "When auto-save is enabled in Settings, the title, body, photos, mood, weather, and date of a new entry you're composing are periodically saved as a draft automatically. If you close the app before saving the entry, the draft will be restored the next time you open the app. The draft is cleared automatically once the entry is saved. Note that editing an existing entry is not covered by draft auto-save.",
    },
  },
  {
    question: {
      ja: "パスコードやFace ID（顔認証）でアプリをロックできますか？",
      ko: "패스코드나 Face ID(안면 인식)로 앱을 잠글 수 있나요?",
      en: "Can I lock the app with a passcode or Face ID?",
    },
    answer: {
      ja: "はい。初回起動時に4桁のパスコードを設定すると、以後アプリを開くたびにロック画面が表示されます。お使いの端末がFace ID／Touch ID対応の場合は、生体認証での解除も有効にできます。パスコードは設定画面からいつでも変更・無効化が可能です（無効化すると生体認証も同時にオフになります）。",
      ko: "네. 최초 실행 시 4자리 패스코드를 설정하면 이후 앱을 열 때마다 잠금 화면이 표시됩니다. 사용 중인 기기가 Face ID/Touch ID를 지원하는 경우 생체 인증을 통한 잠금 해제도 활성화할 수 있습니다. 패스코드는 설정 화면에서 언제든지 변경・비활성화할 수 있습니다(비활성화하면 생체 인증도 함께 꺼집니다).",
      en: "Yes. Setting a 4-digit passcode on first launch will show a lock screen every time you open the app afterward. If your device supports Face ID/Touch ID, you can also enable biometric unlock. The passcode can be changed or disabled at any time from Settings (disabling it also turns off biometric unlock).",
    },
  },
  {
    question: {
      ja: "ダークモードやテーマカラーは変更できますか？",
      ko: "다크 모드나 테마 색상을 변경할 수 있나요?",
      en: "Can I change dark mode or the theme color?",
    },
    answer: {
      ja: "はい。設定画面からライトモード・ダークモードを切り替えられます。また、Rose・Sky・Sage・Peach・Lavenderなど12種類のテーマカラーから好みの色を選択でき、アプリ全体の配色に反映されます。",
      ko: "네. 설정 화면에서 라이트 모드・다크 모드를 전환할 수 있습니다. 또한 Rose・Sky・Sage・Peach・Lavender 등 12가지 테마 색상 중에서 원하는 색상을 선택할 수 있으며, 앱 전체의 색상에 반영됩니다.",
      en: "Yes. You can switch between Light and Dark mode from the Settings screen. You can also choose from 12 theme colors — including Rose, Sky, Sage, Peach, and Lavender — which are reflected throughout the app.",
    },
  },
  {
    question: {
      ja: "日記や写真のデータはどこに保存されますか？バックアップやエクスポートはできますか？",
      ko: "일기나 사진 데이터는 어디에 저장되나요? 백업이나 내보내기를 할 수 있나요?",
      en: "Where is my diary and photo data saved? Can I back it up or export it?",
    },
    answer: {
      ja: "日記の内容や写真は、すべてお使いの端末内にのみ保存されます。サーバーへのデータ送信やアカウント登録は一切行っておらず、クラウド同期にも対応しておりません。現時点ではアプリ内からのバックアップ・エクスポート機能はご用意しておりません。アプリを削除するとすべてのデータが失われますので、端末のバックアップ機能（iCloudバックアップ等）と合わせてご利用いただくことをおすすめします。",
      ko: "일기 내용과 사진은 모두 사용 중인 기기 내에만 저장됩니다. 서버로의 데이터 전송이나 계정 등록은 일절 하지 않으며, 클라우드 동기화도 지원하지 않습니다. 현재 앱 내에서의 백업・내보내기 기능은 제공되지 않습니다. 앱을 삭제하면 모든 데이터가 사라지므로, 기기의 백업 기능(iCloud 백업 등)과 함께 사용하시는 것을 권장합니다.",
      en: "All diary content and photos are stored only on your device. The app does not send any data to a server, does not require an account, and does not support cloud sync. There is currently no in-app backup or export feature. Deleting the app will remove all data, so we recommend also relying on your device's own backup feature (such as an iCloud backup) for extra safety.",
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
export default function DairygramSupportPage() {
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
              alt="Dairygram"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">Dairygram</h1>
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
            href="/support/dairygram/privacy"
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
          <p>&copy; {currentYear} Dairygram. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
