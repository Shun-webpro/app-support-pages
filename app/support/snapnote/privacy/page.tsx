"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/snapnote.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年6月12日";
const LAST_UPDATED_EN = "June 12, 2026";
const LAST_UPDATED_KO = "2026년 6월 12일";

type Language = "ja" | "ko" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
];

const TRANSLATIONS: Record<Language, {
  title: string;
  lastUpdated: string;
  lastUpdatedDate: string;
  backToSupport: string;
  sections: {
    intro: { title: string; content: string; consent: string };
    dataCollection: {
      title: string;
      local: { title: string; intro: string; items: string[] };
      server: { title: string; intro: string; items: string[] };
      notCollected: { title: string; intro: string; items: string[] };
    };
    purpose: { title: string; intro: string; items: string[] };
    thirdParty: { title: string; content: string };
    retention: { title: string; content: string; deletion: string };
    permissions: { title: string; intro: string; items: { name: string; detail: string }[] };
    security: { title: string; items: string[]; disclaimer: string };
    children: { title: string; content: string; action: string };
    userRights: {
      title: string;
      intro: string;
      items: string[];
      howTo: { title: string; content: string };
    };
    changes: { title: string; content: string };
    contact: { title: string; content: string; email: string; responseTime: string };
  };
}> = {
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日",
    lastUpdatedDate: LAST_UPDATED_JA,
    backToSupport: "サポートページに戻る",
    sections: {
      intro: {
        title: "1. はじめに",
        content: "SnapNote（以下「本アプリ」）は、写真からAIがまとめノートやクイズを自動作成することをサポートするアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータは、お使いの端末内に保存されます：",
          items: [
            "作成したノートの内容（タイトル・本文・画像）",
            "フォルダ構成",
            "クイズおよびクイズの結果データ",
            "アプリ設定（テーマカラーなど）",
          ],
        },
        server: {
          title: "2-2. ノート・クイズ生成のために送信される情報",
          intro: "AIによるノートやクイズの生成機能をご利用いただく際、以下の情報が処理のためサーバーに送信されます：",
          items: [
            "撮影またはライブラリから選択した画像データ",
            "キーワードや指示文として入力したテキスト",
          ],
        },
        notCollected: {
          title: "2-3. 収集しない情報",
          intro: "本アプリは以下の情報を一切収集しません：",
          items: [
            "氏名・住所などの個人識別情報",
            "位置情報",
            "連絡先",
            "広告目的のトラッキングデータ",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "収集した情報は、以下の目的にのみ使用されます：",
        items: [
          "写真の内容を解析し、まとめノートを生成するため",
          "ノートの内容に基づいたクイズを生成するため",
          "ノート・フォルダ・クイズの表示および管理",
          "アプリ内課金（サブスクリプション）の状態確認",
          "ユーザー設定の保持",
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        content: "本アプリは、ノート・クイズ生成機能の提供にあたり、サーバー基盤としてSupabaseを利用し、AI処理のために画像・テキストを送信します。送信された画像・テキストは生成処理のために一時的に使用され、生成完了後にサーバー側で保存されることはありません。また、アプリ内課金の処理にはApple（App Store）の決済システムを利用します。これらの提供先以外に、ユーザーのデータを第三者に販売・共有することは一切ありません。",
      },
      retention: {
        title: "5. データの保存と削除",
        content: "作成したノート・フォルダ・クイズのデータは、お使いの端末内にのみ保存されます。ノート・クイズ生成のために送信された画像・テキストは、生成処理後にサーバー側で保持されません。",
        deletion: "アプリをアンインストールすることで、端末内のすべてのデータが削除されます。アプリ内でノートやフォルダを削除した場合、そのデータは復元できません。",
      },
      permissions: {
        title: "6. アプリが使用する権限",
        intro: "本アプリは以下の端末権限を使用します：",
        items: [
          {
            name: "カメラ",
            detail: "教科書やノートを撮影し、AIによるノート生成の元データとして使用します。",
          },
          {
            name: "フォトライブラリ",
            detail: "写真ライブラリから既存の画像を選択し、AIによるノート生成の元データとして使用します。",
          },
          {
            name: "マイク",
            detail: "動画を用いてノートを作成する際に使用する場合があります。マイクへのアクセスは録音時のみ行われます。",
          },
        ],
      },
      security: {
        title: "7. セキュリティ",
        items: [
          "ノート・フォルダ・クイズなどのデータは端末内に保存されます",
          "AI処理のために送信される画像・テキストは暗号化された通信を通じて送信されます",
          "アプリ内課金情報はAppleの決済システムを通じて安全に処理されます",
        ],
        disclaimer: "端末の紛失・盗難に備え、端末のロック機能を適切に設定してください。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは13歳未満の子供を対象としておらず、意図的に13歳未満の子供から個人情報を収集することはありません。",
        action: "お子様が本アプリを利用していることをご存知の保護者の方は、下記お問い合わせ先までご連絡ください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        intro: "ユーザーはいつでも以下の操作が可能です：",
        items: [
          "アプリ内から個別のノート・フォルダ・クイズを削除する",
          "アプリをアンインストールして端末内のすべてのデータを削除する",
          "設定画面から購入情報の復元を行う",
        ],
        howTo: {
          title: "その他のお問い合わせ",
          content: "プライバシーに関するご質問は、下記お問い合わせ先までご連絡ください。",
        },
      },
      changes: {
        title: "10. プライバシーポリシーの変更",
        content: "本プライバシーポリシーは随時更新することがあります。重要な変更が生じた場合は、本ページ上部の「最終更新日」を更新してお知らせします。変更後も本アプリを継続してご利用いただく場合は、更新後のポリシーに同意したものとみなします。",
      },
      contact: {
        title: "11. お問い合わせ",
        content: "本プライバシーポリシーに関するご質問は、以下までお問い合わせください：",
        email: "メールアドレス",
        responseTime: "お問い合わせから原則30日以内にご回答いたします。",
      },
    },
  },
  ko: {
    title: "개인정보 처리방침",
    lastUpdated: "최종 업데이트",
    lastUpdatedDate: LAST_UPDATED_KO,
    backToSupport: "지원 페이지로 돌아가기",
    sections: {
      intro: {
        title: "1. 소개",
        content: "SnapNote(이하 \"본 앱\")는 사진을 기반으로 AI가 정리 노트와 퀴즈를 자동으로 생성하는 것을 지원하는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 정보 처리 방식에 대해 설명합니다.",
        consent: "본 앱을 이용하시면 본 개인정보 처리방침에 동의한 것으로 간주됩니다.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        local: {
          title: "2-1. 기기 내에 저장되는 데이터",
          intro: "다음 데이터는 사용 중인 기기 내에 저장됩니다:",
          items: [
            "작성한 노트의 내용(제목・본문・이미지)",
            "폴더 구성",
            "퀴즈 및 퀴즈 결과 데이터",
            "앱 설정(테마 색상 등)",
          ],
        },
        server: {
          title: "2-2. 노트・퀴즈 생성을 위해 전송되는 정보",
          intro: "AI를 통한 노트・퀴즈 생성 기능을 이용하실 때, 다음 정보가 처리를 위해 서버로 전송됩니다:",
          items: [
            "촬영하거나 라이브러리에서 선택한 이미지 데이터",
            "키워드나 지시문으로 입력한 텍스트",
          ],
        },
        notCollected: {
          title: "2-3. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다:",
          items: [
            "이름, 주소 등 개인 식별 정보",
            "위치 정보",
            "연락처",
            "광고 목적의 트래킹 데이터",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "수집한 정보는 다음 목적에만 사용됩니다:",
        items: [
          "사진의 내용을 분석하여 정리 노트를 생성하기 위해",
          "노트 내용을 바탕으로 퀴즈를 생성하기 위해",
          "노트・폴더・퀴즈의 표시 및 관리",
          "인앱 결제(구독) 상태 확인",
          "사용자 설정 보존",
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스에 대한 정보 제공",
        content: "본 앱은 노트・퀴즈 생성 기능을 제공하기 위해 서버 인프라로 Supabase를 이용하며, AI 처리를 위해 이미지・텍스트를 전송합니다. 전송된 이미지・텍스트는 생성 처리를 위해 일시적으로 사용되며, 생성 완료 후 서버 측에 저장되지 않습니다. 또한 인앱 결제 처리에는 Apple(App Store)의 결제 시스템을 이용합니다. 이 외의 제공처에 사용자의 데이터를 판매・공유하는 일은 일절 없습니다.",
      },
      retention: {
        title: "5. 데이터 저장 및 삭제",
        content: "작성한 노트・폴더・퀴즈 데이터는 사용 중인 기기 내에만 저장됩니다. 노트・퀴즈 생성을 위해 전송된 이미지・텍스트는 생성 처리 후 서버 측에 보관되지 않습니다.",
        deletion: "앱을 삭제하면 기기 내의 모든 데이터가 삭제됩니다. 앱 내에서 노트나 폴더를 삭제한 경우, 해당 데이터는 복원할 수 없습니다.",
      },
      permissions: {
        title: "6. 앱이 사용하는 권한",
        intro: "본 앱은 다음 기기 권한을 사용합니다:",
        items: [
          {
            name: "카메라",
            detail: "교과서나 노트를 촬영하여 AI 노트 생성의 원본 데이터로 사용합니다.",
          },
          {
            name: "사진 라이브러리",
            detail: "사진 라이브러리에서 기존 이미지를 선택하여 AI 노트 생성의 원본 데이터로 사용합니다.",
          },
          {
            name: "마이크",
            detail: "동영상을 이용해 노트를 작성할 때 사용될 수 있습니다. 마이크 접근은 녹음 시에만 이루어집니다.",
          },
        ],
      },
      security: {
        title: "7. 보안",
        items: [
          "노트・폴더・퀴즈 등의 데이터는 기기 내에 저장됩니다",
          "AI 처리를 위해 전송되는 이미지・텍스트는 암호화된 통신을 통해 전송됩니다",
          "인앱 결제 정보는 Apple의 결제 시스템을 통해 안전하게 처리됩니다",
        ],
        disclaimer: "기기 분실・도난에 대비하여 기기의 잠금 기능을 적절히 설정해 주세요.",
      },
      children: {
        title: "8. 아동의 개인정보",
        content: "본 앱은 13세 미만 아동을 대상으로 하지 않으며, 의도적으로 13세 미만 아동의 개인정보를 수집하지 않습니다.",
        action: "자녀가 본 앱을 이용하고 있음을 알고 계신 보호자께서는 아래 연락처로 문의해 주세요.",
      },
      userRights: {
        title: "9. 사용자의 권리",
        intro: "사용자는 언제든지 다음 작업이 가능합니다:",
        items: [
          "앱 내에서 개별 노트・폴더・퀴즈를 삭제한다",
          "앱을 삭제하여 기기 내의 모든 데이터를 삭제한다",
          "설정 화면에서 구매 정보를 복원한다",
        ],
        howTo: {
          title: "기타 문의",
          content: "개인정보에 관한 질문은 아래 연락처로 문의해 주세요.",
        },
      },
      changes: {
        title: "10. 개인정보 처리방침의 변경",
        content: "본 개인정보 처리방침은 수시로 업데이트될 수 있습니다. 중요한 변경이 있을 경우, 본 페이지 상단의 「최종 업데이트」를 갱신하여 알려드립니다. 변경 후에도 본 앱을 계속 이용하시면 업데이트된 방침에 동의한 것으로 간주됩니다.",
      },
      contact: {
        title: "11. 문의하기",
        content: "본 개인정보 처리방침에 관한 질문은 아래로 문의해 주세요:",
        email: "이메일 주소",
        responseTime: "문의일로부터 원칙적으로 30일 이내에 답변드립니다.",
      },
    },
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Back to Support",
    sections: {
      intro: {
        title: "1. Introduction",
        content: "SnapNote (\"the App\") is an app that helps you create organized notes and quizzes from photos using AI. This Privacy Policy explains how information is handled when you use the App.",
        consent: "By using the App, you consent to the practices described in this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        local: {
          title: "2-1. Data Stored on Device",
          intro: "The following data is stored on your device:",
          items: [
            "Content of notes you create (title, body text, images)",
            "Folder structure",
            "Quizzes and quiz result data",
            "App settings (theme color, etc.)",
          ],
        },
        server: {
          title: "2-2. Information Sent for Note/Quiz Generation",
          intro: "When you use the AI note or quiz generation feature, the following information is sent to a server for processing:",
          items: [
            "Image data captured or selected from your photo library",
            "Text entered as keywords or instructions",
          ],
        },
        notCollected: {
          title: "2-3. Information We Do Not Collect",
          intro: "The App does not collect any of the following:",
          items: [
            "Personally identifiable information such as name or address",
            "Location data",
            "Contacts",
            "Tracking data for advertising purposes",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Use",
        intro: "Collected information is used only for the following purposes:",
        items: [
          "Analyzing the content of photos to generate organized notes",
          "Generating quizzes based on the content of your notes",
          "Displaying and managing notes, folders, and quizzes",
          "Verifying the status of in-app purchases (subscriptions)",
          "Saving user preferences",
        ],
      },
      thirdParty: {
        title: "4. Information Sharing with Third Parties",
        content: "To provide the note/quiz generation feature, the App uses Supabase as its server infrastructure and sends images and text for AI processing. The submitted images and text are used temporarily for the generation process and are not retained on the server afterward. In-app purchases are processed through Apple's (App Store) payment system. Aside from these providers, we do not sell or share user data with any third parties.",
      },
      retention: {
        title: "5. Data Storage and Deletion",
        content: "Notes, folders, and quizzes you create are stored only on your device. Images and text sent for note/quiz generation are not retained on the server after processing.",
        deletion: "Uninstalling the App will delete all data on your device. Notes or folders deleted within the App cannot be restored.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following device permissions:",
        items: [
          {
            name: "Camera",
            detail: "Used to photograph textbooks or notes as source material for AI note generation.",
          },
          {
            name: "Photo Library",
            detail: "Used to select existing images from your photo library as source material for AI note generation.",
          },
          {
            name: "Microphone",
            detail: "May be used when creating notes from video. Microphone access only occurs during recording.",
          },
        ],
      },
      security: {
        title: "7. Security",
        items: [
          "Notes, folders, quizzes, and other data are stored on your device",
          "Images and text sent for AI processing are transmitted over encrypted connections",
          "In-app purchase information is processed securely through Apple's payment system",
        ],
        disclaimer: "Please set up your device's lock features appropriately to protect against loss or theft.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App is not intended for children under 13 years of age, and we do not intentionally collect personal information from children under 13.",
        action: "If you are a parent or guardian and know that your child is using the App, please contact us at the address below.",
      },
      userRights: {
        title: "9. Your Rights",
        intro: "You can at any time:",
        items: [
          "Delete individual notes, folders, or quizzes within the app",
          "Uninstall the app to delete all data on your device",
          "Restore your purchases from the Settings screen",
        ],
        howTo: {
          title: "Other Inquiries",
          content: "For any questions about your privacy, please contact us at the address below.",
        },
      },
      changes: {
        title: "10. Changes to This Privacy Policy",
        content: "We may update this Privacy Policy from time to time. If significant changes occur, we will notify you by updating the \"Last Updated\" date at the top of this page. Continued use of the App after changes constitutes your consent to the updated policy.",
      },
      contact: {
        title: "11. Contact Us",
        content: "For questions about this Privacy Policy, please contact us at:",
        email: "Email",
        responseTime: "We will respond within 30 days of receiving your inquiry.",
      },
    },
  },
};

function LanguageSelector({
  currentLang,
  onChangeLang,
}: {
  currentLang: Language;
  onChangeLang: (lang: Language) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
}

export default function SnapNotePrivacyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src={appIcon} alt="SnapNote" width={72} height={72} className="rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2">SnapNote</h1>
          <p className="text-gray-500 text-sm">{t.lastUpdated}: {t.lastUpdatedDate}</p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* 戻るリンク */}
        <div className="text-center mb-10">
          <Link
            href="/support/snapnote"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToSupport}
          </Link>
        </div>

        {/* 1. はじめに */}
        <section className="mb-10">
          <SectionTitle>{s.intro.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed mb-3">{s.intro.content}</p>
          <p className="text-gray-700 leading-relaxed">{s.intro.consent}</p>
        </section>

        {/* 2. 収集する情報 */}
        <section className="mb-10">
          <SectionTitle>{s.dataCollection.title}</SectionTitle>
          <h3 className="font-semibold text-gray-800 mb-2">{s.dataCollection.local.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.local.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6 ml-2">
            {s.dataCollection.local.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <h3 className="font-semibold text-gray-800 mb-2">{s.dataCollection.server.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.server.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6 ml-2">
            {s.dataCollection.server.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <h3 className="font-semibold text-gray-800 mb-2">{s.dataCollection.notCollected.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.notCollected.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            {s.dataCollection.notCollected.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        {/* 3. 利用目的 */}
        <section className="mb-10">
          <SectionTitle>{s.purpose.title}</SectionTitle>
          <p className="text-gray-700 mb-2">{s.purpose.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
            {s.purpose.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </section>

        {/* 4. 第三者 */}
        <section className="mb-10">
          <SectionTitle>{s.thirdParty.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{s.thirdParty.content}</p>
        </section>

        {/* 5. データ保存 */}
        <section className="mb-10">
          <SectionTitle>{s.retention.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed mb-3">{s.retention.content}</p>
          <p className="text-gray-700 leading-relaxed">{s.retention.deletion}</p>
        </section>

        {/* 6. 権限 */}
        <section className="mb-10">
          <SectionTitle>{s.permissions.title}</SectionTitle>
          <p className="text-gray-700 mb-4">{s.permissions.intro}</p>
          <div className="space-y-4">
            {s.permissions.items.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-800 mb-1">{item.name}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. セキュリティ */}
        <section className="mb-10">
          <SectionTitle>{s.security.title}</SectionTitle>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3 ml-2">
            {s.security.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed">{s.security.disclaimer}</p>
        </section>

        {/* 8. お子様 */}
        <section className="mb-10">
          <SectionTitle>{s.children.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed mb-3">{s.children.content}</p>
          <p className="text-gray-700 leading-relaxed">{s.children.action}</p>
        </section>

        {/* 9. ユーザーの権利 */}
        <section className="mb-10">
          <SectionTitle>{s.userRights.title}</SectionTitle>
          <p className="text-gray-700 mb-2">{s.userRights.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4 ml-2">
            {s.userRights.items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <h3 className="font-semibold text-gray-800 mb-1">{s.userRights.howTo.title}</h3>
          <p className="text-gray-700 leading-relaxed">{s.userRights.howTo.content}</p>
        </section>

        {/* 10. 変更 */}
        <section className="mb-10">
          <SectionTitle>{s.changes.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{s.changes.content}</p>
        </section>

        {/* 11. お問い合わせ */}
        <section className="mb-0">
          <SectionTitle>{s.contact.title}</SectionTitle>
          <p className="text-gray-700 mb-4">{s.contact.content}</p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">{s.contact.email}: </span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:text-blue-800">
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-3">{s.contact.responseTime}</p>
        </section>
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
