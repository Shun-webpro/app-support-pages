"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/deadline.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
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
    aboutSupportText: "シメキル（DeadLine）をご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決しない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返信は通常48時間以内を目安としております。お時間をいただく場合がございますが、ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語でのお問い合わせに対応しております。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらでご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using DeadLine. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese and English.",
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
      ja: "シメキル（DeadLine）はどのようなアプリですか？",
      en: "What kind of app is DeadLine?",
    },
    answer: {
      ja: "課題・レポート・仕事の資料・各種手続きなど、「提出物」の締め切りを管理するアプリです。締め切りまでの残り時間を秒単位のカウントダウンで確認でき、期限切れ・今日・明日・今週・それ以降に自動で振り分けられます。リマインド通知、チェックリスト、カテゴリ、繰り返し設定、提出の記録や統計にも対応しています。",
      en: "DeadLine is an app for managing deadlines for things you need to submit — assignments, reports, work documents, paperwork, and more. It shows a live countdown to each deadline, automatically sorted into Overdue, Today, Tomorrow, This week, and Later. It also supports reminder notifications, checklists, categories, repeat rules, and submission history and stats.",
    },
  },
  {
    question: {
      ja: "提出物（締め切り）の追加・編集・削除の方法を教えてください",
      en: "How do I add, edit, or delete a deadline?",
    },
    answer: {
      ja: "追加：画面下部の「＋」ボタンをタップし、タイトルと締め切りを入力して「保存」します。サブタイトル・ラベル色・カテゴリ・提出先・提出方法・優先度・繰り返し・リマインド・チェックリスト・メモも設定できます。\n編集：ホームの提出物をタップすると編集画面が開きます。\n削除：カードを左にスワイプするか、編集画面の「この提出物を削除」から削除できます。削除したデータは元に戻せません。",
      en: "Add: tap the “+” button at the bottom, enter a title and due date, then tap “Save”. You can also set a subtitle, color label, category, recipient, submission method, priority, repeat rule, reminders, checklist, and notes.\nEdit: tap a deadline on the Home screen to open its edit screen.\nDelete: swipe the card to the left, or tap “Delete this deadline” on the edit screen. Deleted data cannot be restored.",
    },
  },
  {
    question: {
      ja: "提出済みにするにはどうすればよいですか？",
      en: "How do I mark something as submitted?",
    },
    answer: {
      ja: "ホームのカードを右にスワイプして「提出済み」にするか、編集画面の「提出済みにする」をタップしてください。提出済みの提出物は「提出済み」タブと、マイページの「提出済みの履歴」で確認できます。間違えた場合は「未提出に戻す」で元に戻せます。",
      en: "Swipe a card to the right on the Home screen to mark it “Done”, or tap “Mark as submitted” on the edit screen. Submitted items appear in the “Done” filter and in “Submitted history” on My Page. If you made a mistake, use “Mark as not submitted” to undo it.",
    },
  },
  {
    question: {
      ja: "リマインド通知が届きません",
      en: "I'm not receiving reminder notifications",
    },
    answer: {
      ja: "次の点をご確認ください。\n1. iOSの「設定」→「DeadLine（シメキル）」→「通知」で通知が許可されているか\n2. 提出物のリマインドが設定されているか（「期限の時刻」「1時間前」「1日前」「3日前」「1週間前」から複数選べます）\n3. 締め切りやリマインドの時刻がすでに過ぎていないか（過ぎた時刻の通知は予約されません）\n4. 提出済みになっていないか（提出済みの提出物には通知されません）\n5. iOSの集中モード・おやすみモードなどが有効になっていないか\n通知を許可していなかった場合は、iOSの設定で許可してからアプリに戻ると、通知が自動的に予約し直されます。",
      en: "Please check the following.\n1. In iOS Settings → DeadLine → Notifications, make sure notifications are allowed.\n2. Make sure reminders are set on the deadline (you can choose several: at due time, 1 hour, 1 day, 3 days, or 1 week before).\n3. Make sure the due time or reminder time hasn't already passed (notifications for past times are not scheduled).\n4. Make sure the item hasn't been marked as submitted (submitted items don't send notifications).\n5. Check that a Focus mode or Do Not Disturb isn't turned on in iOS.\nIf notifications were previously denied, allow them in iOS Settings and return to the app — your reminders will be scheduled again automatically.",
    },
  },
  {
    question: {
      ja: "新しく作る提出物の既定のリマインドを変更できますか？",
      en: "Can I change the default reminders for new deadlines?",
    },
    answer: {
      ja: "はい。マイページの「新規の既定リマインド」で、新しく作る提出物にあらかじめ設定されるリマインドを選べます（初期設定は「1日前」）。すでに作成済みの提出物には影響しません。",
      en: "Yes. On My Page, use “Default reminders” to choose which reminders are pre-selected for new deadlines (the initial setting is “1 day before”). This does not affect deadlines you have already created.",
    },
  },
  {
    question: {
      ja: "登録できる通知の数に上限はありますか？",
      en: "Is there a limit to how many notifications can be scheduled?",
    },
    answer: {
      ja: "iOSの仕様により、端末が予約できるローカル通知は最大64件です。シメキルでは、未提出の提出物のうち締め切りが近いものから順に最大60件まで通知を予約します。それ以降の通知は、アプリを開いたとき（前面に戻ったとき）などに順次予約されます。",
      en: "Because of an iOS limit, a device can schedule at most 64 local notifications. DeadLine schedules up to 60 of them, starting with the nearest upcoming reminders for items you haven't submitted yet. Later reminders are scheduled as they come within range, for example when you return to the app.",
    },
  },
  {
    question: {
      ja: "「繰り返し」を設定した提出物は、提出済みにするとどうなりますか？",
      en: "What happens when I mark a repeating deadline as submitted?",
    },
    answer: {
      ja: "毎日・毎週・毎月のいずれかを設定した提出物を提出済みにすると、次回の締め切りが自動的に作成されます。次回の締め切りは、現在時刻より後になるまで繰り返しの間隔で進められます。毎月の場合、その月に該当する日がなければ月末日になります（例：31日設定の場合、30日までの月は30日）。",
      en: "When you mark a daily, weekly, or monthly deadline as submitted, the next deadline is created automatically. The next due date is moved forward by the repeat interval until it is later than the current time. For monthly repeats, if the month doesn't have that day, the last day of the month is used (for example, a 31st deadline falls on the 30th in a 30-day month).",
    },
  },
  {
    question: {
      ja: "カテゴリを追加・編集・削除できますか？",
      en: "Can I add, edit, or delete categories?",
    },
    answer: {
      ja: "はい。マイページの「カテゴリの管理」から、カテゴリの追加・名前・色・アイコンの変更・削除ができます。初期状態では「課題」「レポート」「仕事」「申請・手続き」「その他」が用意されています。カテゴリを削除すると、そのカテゴリの提出物は「未分類」になります（提出物自体は削除されません）。",
      en: "Yes. From “Categories” on My Page you can add categories and change their name, color, and icon, or delete them. By default, “Assignment”, “Report”, “Work”, “Paperwork”, and “Other” are provided. If you delete a category, its deadlines become “Uncategorized” (the deadlines themselves are not deleted).",
    },
  },
  {
    question: {
      ja: "提出物を検索したり並び替えたりできますか？",
      en: "Can I search or sort my deadlines?",
    },
    answer: {
      ja: "はい。ホームの検索欄でタイトル・メモ・提出先を検索できます。並び替えは「期限順」「優先度順」「作成順」から選べ、「未提出」「期限切れ」「提出済み」での絞り込みや、カテゴリでの絞り込みも可能です。",
      en: "Yes. The search bar on the Home screen searches titles, notes, and recipients. You can sort by due date, priority, or creation order, and filter by Pending, Overdue, or Done, as well as by category.",
    },
  },
  {
    question: {
      ja: "マイページの統計（提出率など）はどのように計算されますか？",
      en: "How are the stats on My Page calculated?",
    },
    answer: {
      ja: "「提出率」は、登録した提出物のうち提出済みの割合です。「今月の提出」は今月に提出済みにした件数、「期限内の連続提出」は直近から数えて期限内に提出できた連続件数です。「提出の早さ（平均）」「最も早い提出」は、期限内に提出したものだけを対象に、締め切りの何前に提出したかを集計しています（遅れて提出したものは含まれません）。",
      en: "“Completion” is the share of your deadlines that have been submitted. “This month” counts items submitted this month, and “On-time streak” is the number of consecutive on-time submissions, counting back from the most recent. “Avg. lead time” and “Earliest submission” only include items submitted on time and show how far ahead of the deadline you submitted (late submissions are not included).",
    },
  },
  {
    question: {
      ja: "ダークモードやテーマの色を変更できますか？",
      en: "Can I change to dark mode or change the theme color?",
    },
    answer: {
      ja: "はい。マイページの「外観」で、テーマ（システム・ライト・ダーク）とアクセントカラー（5色）を変更できます。「システム」を選ぶと、iOSの外観設定に合わせて自動で切り替わります。",
      en: "Yes. Under “Appearance” on My Page, you can change the theme (System, Light, Dark) and the accent color (5 options). “System” follows your iOS appearance setting automatically.",
    },
  },
  {
    question: {
      ja: "アプリの言語を変更できますか？",
      en: "Can I change the app's language?",
    },
    answer: {
      ja: "アプリの言語は、iOSの「設定」→「DeadLine（シメキル）」→「言語」、またはiOSのシステム言語に従います。日本語と英語に対応しています。",
      en: "The app language follows iOS: change it in iOS Settings → DeadLine → Language, or via your iOS system language. Japanese and English are supported.",
    },
  },
  {
    question: {
      ja: "作成したデータはどこに保存されますか？機種変更時はどうなりますか？",
      en: "Where is my data stored, and what happens if I change devices?",
    },
    answer: {
      ja: "提出物・カテゴリ・チェックリスト・設定などのデータは、すべてお使いの端末内にのみ保存されます。アカウント登録やクラウド同期の機能はなく、開発者のサーバーにデータが送信されることもありません。そのため、アプリを削除したり機種変更したりすると、データを引き継ぐことはできません。ただし、iPhoneのバックアップ（iCloudバックアップやパソコンへのバックアップ）にアプリのデータが含まれる場合があり、その復元によって新しい端末に戻る場合があります。これはiOSの機能によるもので、アプリ側では制御していません。",
      en: "Your deadlines, categories, checklists, and settings are stored only on your device. There are no accounts or cloud sync, and no data is sent to the developer's servers. This means data can't be carried over if you delete the app or switch devices. However, app data may be included in your iPhone backups (iCloud Backup or a computer backup), so restoring from a backup may bring it to a new device. This is an iOS feature and is not controlled by the app.",
    },
  },
  {
    question: {
      ja: "データを削除したい場合はどうすればよいですか？",
      en: "How do I delete my data?",
    },
    answer: {
      ja: "マイページの「データ」から、「提出済みをすべて削除」または「すべてのデータを削除」ができます。「すべてのデータを削除」を実行すると、すべての提出物と作成したカテゴリが削除され、カテゴリは初期状態（課題・レポート・仕事・申請・手続き・その他）に戻ります。いずれも元に戻せませんのでご注意ください。アプリ自体を削除しても、端末内のデータは消去されます。",
      en: "On My Page, under “Data”, you can choose “Delete all submitted” or “Delete all data”. “Delete all data” removes all deadlines and your custom categories, and resets categories to the defaults (Assignment, Report, Work, Paperwork, Other). Neither can be undone. Deleting the app also erases the data stored on your device.",
    },
  },
  {
    question: {
      ja: "料金はかかりますか？広告は表示されますか？",
      en: "Does the app cost anything? Are there ads?",
    },
    answer: {
      ja: "本アプリの主な機能はすべて無料でご利用いただけます。広告の表示や、アプリ内課金・サブスクリプションはありません。",
      en: "All main features of the app are free to use. There are no ads, in-app purchases, or subscriptions.",
    },
  },
  {
    question: {
      ja: "不具合を見つけた・機能の要望があります",
      en: "I found a bug / I have a feature request",
    },
    answer: {
      ja: "ご連絡ありがとうございます。不具合の場合は、お使いの端末の機種・iOSのバージョン・アプリのバージョン、および症状（可能であれば発生までの操作手順）をお知らせいただけるとスムーズに確認できます。要望も、下記のお問い合わせからお気軽にお送りください。",
      en: "Thank you for letting us know. For bugs, please include your device model, iOS version, app version, and a description of the problem (and the steps that led to it, if possible) so we can look into it quickly. Feature requests are also welcome — please send them through the contact form below.",
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
export default function DeadLineSupportPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const brandName = lang === "ja" ? "シメキル" : "DeadLine";
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src={appIcon}
              alt={brandName}
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
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
            href="/support/deadline/privacy"
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
          <p>&copy; {currentYear} {brandName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
