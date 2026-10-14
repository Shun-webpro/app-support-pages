"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/pinmemo.png";

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
  backToHub: string;
}> = {
  ja: {
    support: "サポート",
    aboutSupport: "サポートについて",
    aboutSupportText: "ピンメモをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。アプリ内の「設定」→「アプリについて」→「使い方」にも、操作の説明があります。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決しない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返信は通常48時間以内を目安としております。お時間をいただく場合がございますが、ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語でのお問い合わせに対応しております。",
    backToHub: "アプリ一覧に戻る",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using PinMemo. If you have any questions or issues, please check the FAQ below or contact us. The app also has a how-to guide under Settings → About → How to use.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese and English.",
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
      ja: "ピンメモはどのようなアプリですか？",
      en: "What kind of app is PinMemo?",
    },
    answer: {
      ja: "メモをフォルダで整理して書き留めるメモアプリです。大事なメモのピン留め、文字の色・太字、箇条書き（「・」）とチェックボックス、インデントの固定、パスコード・生体認証によるロック、ライト／ダークモードとテーマカラーの変更に対応しています。",
      en: "PinMemo is a note-taking app that lets you organize notes in folders. It supports pinning important notes, text color and bold, bullets (“・”) and checkboxes, a fixed indent, passcode and biometric lock, and light/dark mode with a choice of theme colors.",
    },
  },
  {
    question: {
      ja: "初めて起動したとき、最初から入っているメモは何ですか？",
      en: "What are the notes that are already in the app when I first launch it?",
    },
    answer: {
      ja: "初回起動時に、「サンプル」フォルダーと、その中に「はじめに」「ボタンの説明」の2つのメモが入っています。不要な場合は、他のメモやフォルダーと同じ方法で削除できます。",
      en: "On first launch, the app includes a “サンプル” (Sample) folder with two notes: “はじめに” (Introduction) and “ボタンの説明” (Button guide). You can delete them just like any other note or folder.",
    },
  },
  {
    question: {
      ja: "フォルダーを作る・変更する・削除するにはどうすればよいですか？",
      en: "How do I create, change, or delete a folder?",
    },
    answer: {
      ja: "作成：ホーム画面の右上にあるフォルダのボタンをタップし、名前・アイコン・色を選んで決定します。\n変更：ホーム画面の右上の「編集」ボタンをタップして編集モードにし、変更したいフォルダーをタップします。\n削除：編集モードで削除するか、編集モードでないときにフォルダーを長押しすると確認が出ます。フォルダーを削除すると、中のメモもすべて削除され、元に戻せません。\n並べ替え：編集モードで、フォルダーをドラッグして並べ替えられます。",
      en: "Create: tap the folder button at the top right of the Home screen, choose a name, icon, and color, then confirm.\nChange: tap the “Edit” button at the top right of the Home screen to enter edit mode, then tap the folder you want to change.\nDelete: delete it in edit mode, or long-press a folder when not in edit mode to get a confirmation. Deleting a folder also deletes all notes inside it, and this cannot be undone.\nReorder: in edit mode, drag folders to reorder them.",
    },
  },
  {
    question: {
      ja: "フォルダーの表示を切り替えられますか？",
      en: "Can I change how folders are displayed?",
    },
    answer: {
      ja: "はい。フォルダーがある場合、ホーム画面の右下のボタンで、フォルダ型のグリッド表示とリスト表示を切り替えられます。選んだ表示は次回以降も保持されます。",
      en: "Yes. When you have folders, use the button at the bottom right of the Home screen to switch between the folder-style grid and a list. Your choice is remembered.",
    },
  },
  {
    question: {
      ja: "メモの作成・保存・破棄の方法を教えてください",
      en: "How do I create, save, or discard a note?",
    },
    answer: {
      ja: "作成：画面下の中央の「＋」ボタンをタップします。フォルダーを開いている場合は、そのフォルダーに保存されます。\n保存：右上のチェックボタンをタップします。保存先のフォルダーが決まっていない場合は、保存時にフォルダーを選びます。\n戻る：新しいメモに何か書いてから左上の戻るボタンを押すと、「保存して戻る」「破棄する」「書き続ける」から選べます。何も書いていない場合は、そのまま戻ります。\nタイトルを空にして保存すると、「無題のメモ」になります。",
      en: "Create: tap the “+” button in the center at the bottom. If you are inside a folder, the note is saved to that folder.\nSave: tap the check button at the top right. If the destination folder has not been decided, you will be asked to choose a folder when saving.\nBack: if you write something in a new note and tap the back button at the top left, you can choose “Save and go back”, “Discard”, or “Keep writing”. If nothing has been written, it simply goes back.\nIf you save with an empty title, the note is titled “無題のメモ” (Untitled note).",
    },
  },
  {
    question: {
      ja: "保存したメモを編集するにはどうすればよいですか？",
      en: "How do I edit a saved note?",
    },
    answer: {
      ja: "メモをタップして開き、画面下の「編集」ボタンをタップします。編集画面は、本文の一番下の文字の次の行から書き始められる状態で開きます（本文の末尾の空白・空行は自動で取り除かれます）。編集中に左上の戻るボタンを押すと、内容は自動で保存されます。",
      en: "Tap a note to open it, then tap the “Edit” button at the bottom. The editor opens ready to type on the line after the last line of text (trailing spaces and blank lines at the end are removed automatically). If you tap the back button at the top left while editing, your changes are saved automatically.",
    },
  },
  {
    question: {
      ja: "メモを書く画面の下にあるボタンは、それぞれ何ですか？",
      en: "What do the buttons at the bottom of the note editor do?",
    },
    answer: {
      ja: "左から順に次のとおりです。\n・ピン：押した位置を覚えます。オンの間、改行すると次の行がその位置から始まります。もう一度押すとオフになり、押し直すとその時の位置が新しい位置になります。\n・「・」：押すと「・」が1つ入り、オンの間は改行するたびに行の頭へ「・」が入ります。もう一度押すとオフです。\n・チェックボックス：押すと「□」が1つ入り、オンの間は改行するたびに行の頭へ「□」が入ります。もう一度押すとオフです。「・」とは同時に使えません（一方をオンにすると他方はオフになります）。\n・パレット：これから打つ文字の色を選びます。\n・B：オンの間、これから打つ文字が太字になります。\n・右端の数字：メモの文字数です。",
      en: "From left to right:\n・Pin: remembers the position where you press it. While on, a new line after a line break starts at that position. Press again to turn it off; pressing it again sets a new position.\n・“・” (bullet): adds one “・” when you press it, and while on, adds “・” at the start of each new line. Press again to turn it off.\n・Checkbox: adds one “□” when you press it, and while on, adds “□” at the start of each new line. Press again to turn it off. It cannot be used at the same time as the bullet (turning one on turns the other off).\n・Palette: chooses the color of the text you type next.\n・B: while on, the text you type next is bold.\n・Number at the right: the character count of the note.",
    },
  },
  {
    question: {
      ja: "文字の色や太字は、書いてある文字にも適用されますか？",
      en: "Do text color and bold apply to text I have already written?",
    },
    answer: {
      ja: "いいえ。文字の色と太字は、ボタンで設定したあとに打つ文字から適用されます。すでに書いてある文字の色は変わりません。標準の色は、ライトモードでは黒、ダークモードでは白です。\n編集画面の太字は、文字の位置がずれないように、文字を少し太く見せる表示になっています。メモを開いた画面では、通常の太字で表示されます。",
      en: "No. Text color and bold apply to the text you type after setting them with the buttons. The color of text you have already written does not change. The default color is black in light mode and white in dark mode.\nIn the editor, bold is shown by slightly thickening the text so the text position does not shift. When you open the note, it is displayed in regular bold.",
    },
  },
  {
    question: {
      ja: "チェックボックスにチェックを付けるにはどうすればよいですか？",
      en: "How do I check a checkbox?",
    },
    answer: {
      ja: "メモを開いた画面（編集モードではない画面）で、行の先頭にある「□」をタップすると、チェックが付き、保存されます。もう一度タップすると外れます。チェックした行は、取り消し線が付いて薄く表示されます。\n行の途中にある「□」は、チェックボックスとしては動作しません。チェックボックスは行の先頭に入れてください。",
      en: "On the screen where you view a note (not in edit mode), tap the “□” at the start of a line to check it; the change is saved. Tap again to uncheck it. Checked lines are shown with a strikethrough and dimmed.\nA “□” in the middle of a line does not work as a checkbox. Please put the checkbox at the start of the line.",
    },
  },
  {
    question: {
      ja: "メモのピン留め・削除・並べ替えの方法を教えてください",
      en: "How do I pin, delete, or reorder notes?",
    },
    answer: {
      ja: "ピン留め：フォルダー内のメモを右へスワイプします。ピン留めしたメモは一番上に並びます。もう一度右へスワイプすると解除できます。\n削除：メモを左へスワイプし、確認で「削除」を選びます。削除したメモは元に戻せません。\n並べ替え：フォルダー画面の右上の「編集」ボタンで編集モードにし、メモをドラッグします。",
      en: "Pin: swipe a note to the right inside a folder. Pinned notes are listed at the top. Swipe right again to unpin.\nDelete: swipe a note to the left and choose “Delete” in the confirmation. Deleted notes cannot be restored.\nReorder: tap the “Edit” button at the top right of the folder screen to enter edit mode, then drag notes.",
    },
  },
  {
    question: {
      ja: "メモを他のアプリに共有できますか？",
      en: "Can I share a note with other apps?",
    },
    answer: {
      ja: "はい。メモを開いた画面の右上の共有ボタンから、タイトルと本文を文字として共有できます。文字の色・太字などの書式は共有されません。",
      en: "Yes. Use the share button at the top right of the note screen to share the title and body as text. Formatting such as text color and bold is not included.",
    },
  },
  {
    question: {
      ja: "パスコードロックを設定するにはどうすればよいですか？",
      en: "How do I set up a passcode lock?",
    },
    answer: {
      ja: "アプリ内の「設定」→「セキュリティ」から、パスコードロックをオンにして、4桁の数字を設定します。確認のため、同じ4桁をもう一度入力します。設定後は、アプリを開いたときと、アプリがバックグラウンドに回ったあとにロック画面が表示されます。「パスコードを変更」では、現在のパスコードを入力してから新しいパスコードを設定します。パスコードロックのスイッチをオフにすると、解除できます。",
      en: "In the app, go to Settings → Security, turn on the passcode lock, and set a 4-digit number. You will be asked to enter the same 4 digits again to confirm. After that, the lock screen appears when you open the app and after it has been in the background. “Change passcode” asks for your current passcode first, then lets you set a new one. Turn the passcode lock switch off to remove it.",
    },
  },
  {
    question: {
      ja: "Face ID や指紋認証でロックを解除できますか？",
      en: "Can I unlock with Face ID or fingerprint?",
    },
    answer: {
      ja: "はい。パスコードロックを設定したあと、「設定」→「セキュリティ」で「生体認証でロック解除」をオンにすると、Face ID・指紋認証などでロックを解除できます。ご利用の端末で生体認証が登録されている必要があります。生体認証が使えない場合は、4桁のパスコードで解除できます。",
      en: "Yes. After setting a passcode, turn on “Unlock with biometrics” in Settings → Security to unlock with Face ID, fingerprint, and similar. Biometrics must be set up on your device. If biometrics are unavailable, you can unlock with the 4-digit passcode.",
    },
  },
  {
    question: {
      ja: "パスコードを忘れてしまいました",
      en: "I forgot my passcode",
    },
    answer: {
      ja: "パスコードを忘れると、アプリを開けなくなります。アプリには、パスコードを確認・再設定する機能はなく、開発者側でもパスコードを確認したり解除したりすることはできません。生体認証を設定している場合は、生体認証でロックを解除し、「設定」→「セキュリティ」でパスコードロックをオフにして、あらためてパスコードを設定してください。パスコードは忘れないようにご注意ください。",
      en: "If you forget your passcode, you will not be able to open the app. The app has no way to view or reset the passcode, and the developer cannot view or remove it either. If you have set up biometric unlock, unlock with biometrics, turn the passcode lock off in Settings → Security, and then set a new passcode. Please be careful not to forget your passcode.",
    },
  },
  {
    question: {
      ja: "ダークモードやテーマの色を変更できますか？",
      en: "Can I change to dark mode or change the theme color?",
    },
    answer: {
      ja: "はい。「設定」→「外観」で、ライトモードとダークモードの切り替え、テーマカラーの変更（13色）ができます。テーマカラーは、ボタンやロック画面の背景など、アプリ全体のアクセント色に使われます。",
      en: "Yes. In Settings → Appearance, you can switch between light and dark mode and change the theme color (13 options). The theme color is used as the accent color across the app, such as for buttons and the lock screen background.",
    },
  },
  {
    question: {
      ja: "作成したメモはどこに保存されますか？機種変更時はどうなりますか？",
      en: "Where are my notes stored, and what happens if I change devices?",
    },
    answer: {
      ja: "フォルダー・メモ・設定などのデータは、お使いの端末内にのみ保存されます。アカウント登録やクラウド同期の機能はなく、開発者のサーバーにデータが送信されることもありません。そのため、アプリを削除したり機種変更したりすると、データを引き継ぐことはできません。ただし、端末のバックアップにアプリのデータが含まれる場合があり、その復元によって新しい端末に戻る場合があります。これは端末の機能によるもので、アプリ側では制御していません。\nなお、パスコードそのものは保存されず、確認用の変換値のみが端末の安全な領域に保存されます。",
      en: "Your folders, notes, and settings are stored only on your device. There are no accounts or cloud sync, and no data is sent to the developer's servers. This means data can't be carried over if you delete the app or switch devices. However, app data may be included in your device backups, so restoring from a backup may bring it to a new device. This is a device feature and is not controlled by the app.\nYour passcode itself is not stored; only a hashed value used for verification is kept in a secure area of the device.",
    },
  },
  {
    question: {
      ja: "広告は表示されますか？アプリ内課金はありますか？",
      en: "Are there ads or in-app purchases?",
    },
    answer: {
      ja: "アプリ内に広告の表示や、アプリ内課金・サブスクリプションの機能はありません。",
      en: "The app has no ads and no in-app purchases or subscriptions.",
    },
  },
  {
    question: {
      ja: "アプリの言語を変更できますか？",
      en: "Can I change the app's language?",
    },
    answer: {
      ja: "現在、アプリの画面表示は日本語です。端末の言語が英語の場合は、ホーム画面に表示されるアプリ名や、Face ID の許可メッセージが英語で表示されます。",
      en: "Currently, the app's screens are displayed in Japanese. If your device language is English, the app name shown on the Home screen and the Face ID permission message are shown in English.",
    },
  },
  {
    question: {
      ja: "不具合を見つけた・機能の要望があります",
      en: "I found a bug / I have a feature request",
    },
    answer: {
      ja: "ご連絡ありがとうございます。不具合の場合は、お使いの端末の機種・OSのバージョン・アプリのバージョン、および症状（可能であれば発生までの操作手順）をお知らせいただけるとスムーズに確認できます。要望も、下記のお問い合わせからお気軽にお送りください。",
      en: "Thank you for letting us know. For bugs, please include your device model, OS version, app version, and a description of the problem (and the steps that led to it, if possible) so we can look into it quickly. Feature requests are also welcome — please send them through the contact form below.",
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
export default function PinMemoSupportPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const brandName = lang === "ja" ? "ピンメモ" : "PinMemo";
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
        <Section className="mb-0">
          <SectionTitle>{t.supportedLanguages}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{t.supportedLanguagesText}</p>
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
