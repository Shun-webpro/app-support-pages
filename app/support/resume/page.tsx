"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/resume.png";

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
    aboutSupportText: "履歴書をご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "履歴書(이력서)를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using 履歴書 (Resume). If you have any questions or issues, please check the FAQ below or contact us.",
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
      ja: "履歴書はどのようなアプリですか？",
      ko: "履歴書(이력서)는 어떤 앱인가요?",
      en: "What kind of app is 履歴書 (Resume)?",
    },
    answer: {
      ja: "履歴書は、JIS Z 8303準拠の日本式履歴書をステップ形式で簡単に作成できるアプリです。基本情報・住所連絡先・学歴職歴・免許資格・志望動機/自己PRの5つのステップを順に入力するだけで、印刷やメール添付に使えるPDF形式の履歴書を作成できます。",
      ko: "履歴書(이력서)는 JIS Z 8303 규격에 준거한 일본식 이력서를 단계별로 간단하게 작성할 수 있는 앱입니다. 기본 정보・주소 연락처・학력 경력・면허 자격・지원 동기/자기 PR의 5단계를 순서대로 입력하는 것만으로, 인쇄나 이메일 첨부에 사용할 수 있는 PDF 형식의 이력서를 작성할 수 있습니다.",
      en: "履歴書 (Resume) is an app that lets you easily create a Japanese-style resume (rirekisho) compliant with the JIS Z 8303 standard, using a step-by-step wizard. Just fill in 5 steps in order — basic info, address & contact, education & work history, licenses & qualifications, and motivation/self-PR — to produce a print- and email-ready PDF resume.",
    },
  },
  {
    question: {
      ja: "証明写真の追加・トリミング方法を教えてください",
      ko: "증명사진 추가・자르기 방법을 알려주세요",
      en: "How do I add and crop my ID photo?",
    },
    answer: {
      ja: "基本情報ステップの写真欄をタップすると、フォトライブラリから写真を選択できます。選択後は、履歴書の証明写真の標準サイズ（縦4cm×横3cm）に合わせて、ピンチ操作で拡大縮小・ドラッグで位置調整しながらトリミングできます。カメラでの直接撮影には対応しておらず、フォトライブラリからの選択のみとなります。",
      ko: "기본 정보 단계의 사진란을 탭하면 포토 라이브러리에서 사진을 선택할 수 있습니다. 선택 후에는 이력서 증명사진의 표준 사이즈(세로 4cm×가로 3cm)에 맞춰, 핀치 동작으로 확대축소・드래그로 위치를 조정하며 자를 수 있습니다. 카메라로 직접 촬영하는 기능은 지원하지 않으며, 포토 라이브러리에서의 선택만 가능합니다.",
      en: "Tap the photo field in the Basic Info step to choose a photo from your photo library. After selecting one, you can crop it to the standard Japanese resume photo size (4cm x 3cm) using pinch-to-zoom and drag to adjust the position. Taking a photo directly with the camera is not supported — only selection from the photo library is available.",
    },
  },
  {
    question: {
      ja: "住所を郵便番号から自動入力できますか？",
      ko: "우편번호로 주소를 자동 입력할 수 있나요?",
      en: "Can I auto-fill my address from a postal code?",
    },
    answer: {
      ja: "はい。住所・連絡先ステップで7桁の郵便番号を入力し、検索ボタンをタップすると、住所と住所（フリガナ）が自動で入力されます。この機能は外部の郵便番号検索サービス（ZIP CLOUD）を利用しており、入力した郵便番号のみが検索のために送信されます。氏名など他の個人情報が送信されることはありません。現住所とは別に連絡先住所を入力する場合も、同様に自動入力を利用できます。",
      ko: "네. 주소・연락처 단계에서 7자리 우편번호를 입력하고 검색 버튼을 탭하면 주소와 주소(후리가나)가 자동으로 입력됩니다. 이 기능은 외부 우편번호 검색 서비스(ZIP CLOUD)를 이용하며, 입력한 우편번호만 검색을 위해 전송됩니다. 이름 등 다른 개인정보가 전송되는 일은 없습니다. 현주소와 별도로 연락처 주소를 입력하는 경우도 동일하게 자동 입력을 이용할 수 있습니다.",
      en: "Yes. In the Address & Contact step, enter your 7-digit postal code and tap the lookup button to automatically fill in the address and its furigana reading. This feature uses an external postal-code lookup service (ZIP CLOUD), and only the postal code you entered is sent for the lookup — no other personal information such as your name is transmitted. The same auto-fill is available when entering a separate contact address.",
    },
  },
  {
    question: {
      ja: "学歴・職歴はどのように入力・並び替えできますか？",
      ko: "학력・경력은 어떻게 입력・순서를 바꿀 수 있나요?",
      en: "How do I enter and reorder education and work history?",
    },
    answer: {
      ja: "学歴・職歴ステップでは、年月と内容を入力する行を必要な数だけ追加できます。学歴の行には「入学」「在籍」「卒業」「退学」といった種別を選択できます。学歴の項目は上下の矢印ボタンで並び替えが可能です（職歴は追加した順に表示されます）。不要な行は削除ボタンで取り除けます。",
      ko: "학력・경력 단계에서는 연월과 내용을 입력하는 행을 필요한 만큼 추가할 수 있습니다. 학력 행에는 「입학」「재학」「졸업」「중퇴」와 같은 종류를 선택할 수 있습니다. 학력 항목은 위아래 화살표 버튼으로 순서를 바꿀 수 있습니다(경력은 추가한 순서대로 표시됩니다). 불필요한 행은 삭제 버튼으로 제거할 수 있습니다.",
      en: "In the Education & Work History step, you can add as many rows as needed, each with a year/month and description. Education rows let you choose a type such as Enrolled, Attending, Graduated, or Withdrew. Education entries can be reordered using the up/down arrow buttons (work history entries are shown in the order they were added). Unwanted rows can be removed with the delete button.",
    },
  },
  {
    question: {
      ja: "免許・資格はどのように入力しますか？",
      ko: "면허・자격은 어떻게 입력하나요?",
      en: "How do I enter licenses and qualifications?",
    },
    answer: {
      ja: "免許・資格ステップでは、取得した年月と免許・資格名を入力する行を必要な数だけ追加できます。追加ボタンで行を増やし、削除ボタンで不要な行を取り除くことができます。",
      ko: "면허・자격 단계에서는 취득한 연월과 면허・자격명을 입력하는 행을 필요한 만큼 추가할 수 있습니다. 추가 버튼으로 행을 늘리고 삭제 버튼으로 불필요한 행을 제거할 수 있습니다.",
      en: "In the Licenses & Qualifications step, you can add as many rows as needed, each with the year/month obtained and the name of the license or qualification. Use the add button to add more rows, and the delete button to remove ones you don't need.",
    },
  },
  {
    question: {
      ja: "志望動機・自己PR・本人希望記入欄はどこで入力しますか？",
      ko: "지원 동기・자기 PR・본인 희망 기입란은 어디에서 입력하나요?",
      en: "Where do I enter my motivation, self-PR, and personal requests?",
    },
    answer: {
      ja: "最後のステップで志望動機と自己PRを自由入力できます。また、給与・職種・勤務時間・勤務地の希望などを記載する「本人希望記入欄」は任意のトグルで有効にでき、オンにした場合のみPDFに含まれます。",
      ko: "마지막 단계에서 지원 동기와 자기 PR을 자유롭게 입력할 수 있습니다. 또한 급여・직종・근무 시간・근무지 희망 등을 기재하는 「본인 희망 기입란」은 원하는 대로 토글로 활성화할 수 있으며, 켠 경우에만 PDF에 포함됩니다.",
      en: "In the final step, you can freely enter your motivation for applying and self-PR. There's also an optional toggle for the \"Personal Requests\" field (for preferences like salary, job type, working hours, and location), which is included in the PDF only when enabled.",
    },
  },
  {
    question: {
      ja: "PDFの出力・共有方法とレイアウトを教えてください",
      ko: "PDF 출력・공유 방법과 레이아웃을 알려주세요",
      en: "How do I export and share the PDF, and what layouts are available?",
    },
    answer: {
      ja: "入力後、プレビュー画面で仕上がりを確認できます。レイアウトは「縦2枚」（A4縦・標準的な2ページ構成）と「横並び」（A3横・見開き表示）の2種類から選択できます。共有ボタンをタップするとPDFが生成され、標準の共有シートからAirDrop・メール・メッセージ・ファイルへの保存・印刷などに利用できます。手書きで記入したい場合は、ホーム画面の「テンプレート」から写真の貼付位置などが印刷された白紙のPDFを出力することもできます。",
      ko: "입력 후 미리보기 화면에서 완성 모습을 확인할 수 있습니다. 레이아웃은 「세로 2매」(A4 세로・표준적인 2페이지 구성)와 「가로 나열」(A3 가로・펼침 표시)의 2종류에서 선택할 수 있습니다. 공유 버튼을 탭하면 PDF가 생성되며, 표준 공유 시트에서 AirDrop・메일・메시지・파일에 저장・인쇄 등에 이용할 수 있습니다. 손으로 작성하고 싶은 경우, 홈 화면의 「템플릿」에서 사진 부착 위치 등이 인쇄된 백지 PDF를 출력할 수도 있습니다.",
      en: "After entering your information, you can check the finished layout on the Preview screen. Choose from two layouts: \"2-page portrait\" (standard A4, two pages) or \"side-by-side\" (A3 landscape spread). Tapping the share button generates a PDF and opens the standard share sheet, from which you can use AirDrop, Mail, Messages, save to Files, print, and more. If you'd rather fill it in by hand, you can also generate a blank PDF template (with guides such as the photo placement area) from the \"Template\" button on the Home screen.",
    },
  },
  {
    question: {
      ja: "複数の履歴書を保存しておくことはできますか？",
      ko: "여러 개의 이력서를 저장해 둘 수 있나요?",
      en: "Can I save multiple resumes?",
    },
    answer: {
      ja: "はい。プレビュー画面の保存ボタンから、作成した履歴書をいつでもスナップショットとして保存できます。保存した履歴書は「保存」タブの一覧から確認でき、タップすると内容を編集画面に復元して続きから編集したり、不要になったものを削除したりできます。ホーム画面では入力途中のデータがある場合、「続きから編集」または「新規作成」を選択できます（新規作成を選ぶと入力中のデータは削除されます）。",
      ko: "네. 미리보기 화면의 저장 버튼에서 작성한 이력서를 언제든지 스냅샷으로 저장할 수 있습니다. 저장한 이력서는 「저장」탭의 목록에서 확인할 수 있으며, 탭하면 내용을 편집 화면으로 복원하여 이어서 편집하거나 불필요해진 것을 삭제할 수 있습니다. 홈 화면에서는 입력 중인 데이터가 있는 경우 「이어서 편집」 또는 「새로 작성」을 선택할 수 있습니다(새로 작성을 선택하면 입력 중인 데이터는 삭제됩니다).",
      en: "Yes. From the save button on the Preview screen, you can save a snapshot of your resume at any time. Saved resumes appear in a list under the \"Saved\" tab, where tapping one restores its content into the editor for further editing, or lets you delete it if no longer needed. On the Home screen, if there is in-progress data, you can choose to \"Continue Editing\" or \"Start New\" (choosing Start New deletes the in-progress data).",
    },
  },
  {
    question: {
      ja: "パスコードやFace ID（顔認証）でアプリをロックできますか？",
      ko: "패스코드나 Face ID(안면 인식)로 앱을 잠글 수 있나요?",
      en: "Can I lock the app with a passcode or Face ID?",
    },
    answer: {
      ja: "はい。設定画面から4桁のパスコードを設定すると、以後アプリを起動するたびにロック画面が表示されます。お使いの端末がFace ID／Touch ID対応の場合は、生体認証での解除も有効にできます。パスコードはいつでも設定画面から解除でき、その際は確認のダイアログが表示されます。",
      ko: "네. 설정 화면에서 4자리 패스코드를 설정하면 이후 앱을 실행할 때마다 잠금 화면이 표시됩니다. 사용 중인 기기가 Face ID/Touch ID를 지원하는 경우 생체 인증을 통한 잠금 해제도 활성화할 수 있습니다. 패스코드는 언제든지 설정 화면에서 해제할 수 있으며, 그때 확인 대화상자가 표시됩니다.",
      en: "Yes. Setting a 4-digit passcode in Settings will show a lock screen every time you launch the app afterward. If your device supports Face ID/Touch ID, you can also enable biometric unlock. The passcode can be turned off at any time from Settings, with a confirmation dialog shown when you do so.",
    },
  },
  {
    question: {
      ja: "入力したデータはどこに保存されますか？バックアップはできますか？",
      ko: "입력한 데이터는 어디에 저장되나요? 백업할 수 있나요?",
      en: "Where is my entered data saved? Can I back it up?",
    },
    answer: {
      ja: "入力中の履歴書データ、保存済みの履歴書、証明写真、各種設定は、すべてお使いの端末内にのみ保存されます。アカウント登録やクラウド同期は行っておらず、郵便番号検索時を除きサーバーへのデータ送信も発生しません。現時点ではアプリ内からのバックアップ・エクスポート機能（PDF出力以外）はご用意しておりません。アプリを削除するとすべてのデータが失われますので、大切な履歴書はPDFとして保存・共有しておくことをおすすめします。",
      ko: "작성 중인 이력서 데이터, 저장된 이력서, 증명사진, 각종 설정은 모두 사용 중인 기기 내에만 저장됩니다. 계정 등록이나 클라우드 동기화는 하지 않으며, 우편번호 검색 시를 제외하고 서버로의 데이터 전송도 발생하지 않습니다. 현재 앱 내에서의 백업・내보내기 기능(PDF 출력 이외)은 제공되지 않습니다. 앱을 삭제하면 모든 데이터가 사라지므로, 중요한 이력서는 PDF로 저장・공유해 두는 것을 권장합니다.",
      en: "The resume data you're editing, saved resumes, ID photos, and settings are all stored only on your device. The app does not use accounts or cloud sync, and no data is sent to a server except during postal code lookups. There is currently no in-app backup or export feature other than PDF export. Deleting the app will remove all data, so we recommend saving or sharing important resumes as a PDF for safekeeping.",
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
export default function ResumeSupportPage() {
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
              alt="履歴書"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">履歴書</h1>
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
            href="/support/resume/privacy"
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
          <p>&copy; {currentYear} 履歴書. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
