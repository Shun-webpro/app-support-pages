"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/resume.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年7月5日";
const LAST_UPDATED_EN = "July 5, 2026";
const LAST_UPDATED_KO = "2026년 7월 5일";

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
      notCollected: { title: string; intro: string; items: string[] };
    };
    purpose: { title: string; intro: string; items: string[] };
    thirdParty: { title: string; content: string; items: string[] };
    retention: { title: string; content: string };
    permissions: { title: string; intro: string; items: { name: string; detail: string }[] };
    security: { title: string; content: string };
    children: { title: string; content: string };
    userRights: { title: string; intro: string; items: string[]; howTo: { title: string; content: string } };
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
        content: "履歴書（以下「本アプリ」）は、JIS Z 8303準拠の日本式履歴書をステップ形式で作成し、PDFとして出力・共有できるアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータは、お使いの端末内にのみ保存されます：",
          items: [
            "氏名・フリガナ・生年月日・性別などの基本情報",
            "住所・電話番号・メールアドレスなどの連絡先情報",
            "証明写真（フォトライブラリから選択・トリミングした画像）",
            "学歴・職歴、免許・資格の内容",
            "志望動機・自己PR・本人希望記入欄の内容",
            "保存した履歴書のスナップショット",
            "PDFレイアウトなどのアプリ設定",
            "アプリロック用のパスコード",
          ],
        },
        notCollected: {
          title: "2-2. 収集しない情報",
          intro: "本アプリは以下の情報を収集・送信しません（下記4項に記載の郵便番号検索を除く）：",
          items: [
            "位置情報",
            "カメラへのアクセスデータ（写真はフォトライブラリからの選択のみです）",
            "連絡先（アドレス帳）へのアクセスデータ",
            "アプリ利用状況の分析データ",
            "広告識別子",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "端末内に保存されるデータは、以下の目的のみに使用されます：",
        items: [
          "履歴書データの保存・表示・編集",
          "PDF形式の履歴書の生成および共有",
          "入力途中のデータの保持と復元",
          "パスコード／Face ID・Touch IDによるアプリロックの提供",
        ],
      },
      thirdParty: {
        title: "4. 第三者への提供・外部サービスとの通信",
        content: "本アプリは、ユーザーの情報を第三者に提供・販売・共有することはありません。ただし、住所の自動入力機能をご利用いただく際に、以下の外部サービスとの通信が発生します。",
        items: [
          "郵便番号検索：入力された7桁の郵便番号のみを、外部の郵便番号検索サービス「ZIP CLOUD」（運営：株式会社アイビス）に送信し、該当する住所情報を取得します。氏名・生年月日などその他の個人情報が送信されることはありません。",
        ],
      },
      retention: {
        title: "5. データの保持と削除",
        content: "すべてのデータ（入力中の履歴書・保存済みの履歴書・写真・設定を含む）はお使いの端末内に保存されます。アプリをアンインストールすると、端末内に保存されたすべてのデータが削除されます。削除されたデータの復元はできませんので、大切な履歴書はPDFとして保存・共有しておくことをおすすめします。",
      },
      permissions: {
        title: "6. アプリのアクセス権限",
        intro: "本アプリが使用するシステム権限は以下のとおりです：",
        items: [
          {
            name: "フォトライブラリ",
            detail: "証明写真として使用する画像をフォトライブラリから選択するために使用します。選択した写真は端末内にのみ保存され、外部に送信されることはありません。",
          },
          {
            name: "Face ID／Touch ID（生体認証）",
            detail: "アプリロック機能でパスコードの代わりに生体認証を有効にした場合にのみ使用します。アプリのロック解除以外の目的では使用しません。",
          },
        ],
      },
      security: {
        title: "7. セキュリティ",
        content: "本アプリは郵便番号検索を除きネットワーク通信を行わないため、外部からの情報漏洩リスクは最小限です。履歴書データはお使いの端末のストレージに保存されており、端末のセキュリティ設定やアプリのパスコード・Face ID等によって保護されます。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは年齢制限なくご利用いただけますが、入力された情報は端末内にのみ保存され、外部に収集されることはありません（郵便番号検索を除く）。お子様が本アプリを使用することに保護者の方の懸念がある場合は、サポートまでお問い合わせください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        intro: "ユーザーは以下の権利を有します：",
        items: [
          "端末内のデータを自由に閲覧・削除する権利",
          "アプリをアンインストールすることですべてのデータを消去する権利",
        ],
        howTo: {
          title: "データの削除方法",
          content: "アプリ内で入力データをリセットする、保存済みの履歴書を個別に削除する、またはアプリをアンインストールすることですべてのデータを削除できます。",
        },
      },
      changes: {
        title: "10. プライバシーポリシーの変更",
        content: "本プライバシーポリシーは必要に応じて更新される場合があります。重要な変更がある場合には、アプリのアップデートや本ページにてお知らせします。定期的に本ページをご確認いただくことをお勧めします。",
      },
      contact: {
        title: "11. お問い合わせ",
        content: "本プライバシーポリシーに関するご質問やご意見は、以下のメールアドレスまでお問い合わせください。",
        email: SUPPORT_EMAIL,
        responseTime: "返信目安：48時間以内",
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
        content: "履歴書(이력서, 이하 '본 앱')는 JIS Z 8303 규격에 준거한 일본식 이력서를 단계별로 작성하여 PDF로 출력・공유할 수 있는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 정보 처리 방법에 대해 설명합니다.",
        consent: "본 앱을 이용하심으로써 본 개인정보 처리방침에 동의한 것으로 간주합니다.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        local: {
          title: "2-1. 기기에 저장되는 데이터",
          intro: "다음 데이터는 사용 중인 기기에만 저장됩니다:",
          items: [
            "이름・후리가나・생년월일・성별 등의 기본 정보",
            "주소・전화번호・이메일 주소 등의 연락처 정보",
            "증명사진(포토 라이브러리에서 선택・자른 이미지)",
            "학력・경력, 면허・자격 내용",
            "지원 동기・자기 PR・본인 희망 기입란 내용",
            "저장한 이력서의 스냅샷",
            "PDF 레이아웃 등의 앱 설정",
            "앱 잠금용 패스코드",
          ],
        },
        notCollected: {
          title: "2-2. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 수집·전송하지 않습니다(아래 4항에 기재된 우편번호 검색 제외):",
          items: [
            "위치 정보",
            "카메라 접근 데이터(사진은 포토 라이브러리에서의 선택만 가능합니다)",
            "연락처(주소록) 접근 데이터",
            "앱 이용 현황 분석 데이터",
            "광고 식별자",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "기기 내에 저장되는 데이터는 다음 목적으로만 사용됩니다:",
        items: [
          "이력서 데이터의 저장・표시・편집",
          "PDF 형식 이력서의 생성 및 공유",
          "작성 중인 데이터의 보관과 복원",
          "패스코드/Face ID・Touch ID를 통한 앱 잠금 제공",
        ],
      },
      thirdParty: {
        title: "4. 제3자 제공・외부 서비스와의 통신",
        content: "본 앱은 이용자의 정보를 제3자에게 제공·판매·공유하지 않습니다. 다만, 주소 자동 입력 기능을 이용하실 때 다음 외부 서비스와의 통신이 발생합니다.",
        items: [
          "우편번호 검색: 입력된 7자리 우편번호만을 외부 우편번호 검색 서비스 「ZIP CLOUD」(운영: 주식회사 아이비스)에 전송하여 해당하는 주소 정보를 취득합니다. 이름・생년월일 등 다른 개인정보가 전송되는 일은 없습니다.",
        ],
      },
      retention: {
        title: "5. 데이터 보관 및 삭제",
        content: "모든 데이터(작성 중인 이력서・저장된 이력서・사진・설정 포함)는 사용 중인 기기 내에 저장됩니다. 앱을 삭제하면 기기 내에 저장된 모든 데이터가 삭제됩니다. 삭제된 데이터는 복원할 수 없으므로, 중요한 이력서는 PDF로 저장・공유해 두는 것을 권장합니다.",
      },
      permissions: {
        title: "6. 앱 접근 권한",
        intro: "본 앱이 사용하는 시스템 권한은 다음과 같습니다:",
        items: [
          {
            name: "포토 라이브러리",
            detail: "증명사진으로 사용할 이미지를 포토 라이브러리에서 선택하기 위해 사용합니다. 선택한 사진은 기기 내에만 저장되며 외부로 전송되지 않습니다.",
          },
          {
            name: "Face ID/Touch ID(생체 인증)",
            detail: "앱 잠금 기능에서 패스코드 대신 생체 인증을 활성화한 경우에만 사용합니다. 앱 잠금 해제 이외의 목적으로는 사용하지 않습니다.",
          },
        ],
      },
      security: {
        title: "7. 보안",
        content: "본 앱은 우편번호 검색을 제외하고 네트워크 통신을 수행하지 않으므로 외부로의 정보 유출 위험이 최소화되어 있습니다. 이력서 데이터는 사용 중인 기기의 저장소에 보관되며, 기기의 보안 설정이나 앱의 패스코드・Face ID 등에 의해 보호됩니다.",
      },
      children: {
        title: "8. 아동의 개인정보",
        content: "본 앱은 연령 제한 없이 이용 가능하지만, 입력된 정보는 기기 내에만 저장되며 외부로 수집되지 않습니다(우편번호 검색 제외). 자녀가 본 앱을 사용하는 것에 대해 보호자께서 우려가 있으시면 지원팀으로 문의해 주세요.",
      },
      userRights: {
        title: "9. 이용자의 권리",
        intro: "이용자는 다음 권리를 갖습니다:",
        items: [
          "기기 내 데이터를 자유롭게 열람・삭제할 권리",
          "앱을 삭제함으로써 모든 데이터를 지울 권리",
        ],
        howTo: {
          title: "데이터 삭제 방법",
          content: "앱 내에서 입력 데이터를 재설정하거나, 저장된 이력서를 개별 삭제하거나, 앱을 삭제함으로써 모든 데이터를 삭제할 수 있습니다.",
        },
      },
      changes: {
        title: "10. 개인정보 처리방침 변경",
        content: "본 개인정보 처리방침은 필요에 따라 업데이트될 수 있습니다. 중요한 변경이 있는 경우 앱 업데이트 또는 본 페이지를 통해 안내드립니다. 정기적으로 본 페이지를 확인해 주시기 바랍니다.",
      },
      contact: {
        title: "11. 문의",
        content: "본 개인정보 처리방침에 관한 질문이나 의견은 아래 이메일 주소로 문의해 주세요.",
        email: SUPPORT_EMAIL,
        responseTime: "답변 기준: 48시간 이내",
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
        content: "履歴書 (Resume, hereinafter \"the App\") is an app that lets you create a Japanese-style resume compliant with the JIS Z 8303 standard using a step-by-step wizard, and export/share it as a PDF. This Privacy Policy explains how information is handled when you use the App.",
        consent: "By using the App, you are deemed to have agreed to this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        local: {
          title: "2-1. Data Stored on Your Device",
          intro: "The following data is stored only on your device:",
          items: [
            "Basic information such as name, furigana reading, date of birth, and gender",
            "Contact information such as address, phone number, and email address",
            "ID photo (image selected and cropped from your photo library)",
            "Education & work history, and licenses & qualifications",
            "Motivation, self-PR, and personal requests field content",
            "Snapshots of saved resumes",
            "App settings such as PDF layout",
            "The passcode used for app lock",
          ],
        },
        notCollected: {
          title: "2-2. Information We Do Not Collect",
          intro: "The App does not collect or transmit the following information (except for the postal code lookup described in Section 4 below):",
          items: [
            "Location information",
            "Camera access data (photos can only be selected from your photo library)",
            "Access data for contacts/address book",
            "App usage analytics data",
            "Advertising identifiers",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Use",
        intro: "Data stored on your device is used only for the following purposes:",
        items: [
          "Saving, displaying, and editing resume data",
          "Generating and sharing the resume as a PDF",
          "Retaining and restoring in-progress data",
          "Providing app lock via passcode or Face ID/Touch ID",
        ],
      },
      thirdParty: {
        title: "4. Third-Party Sharing & External Service Communication",
        content: "The App does not provide, sell, or share user information with any third parties. However, using the address auto-fill feature involves communication with the following external service.",
        items: [
          "Postal code lookup: Only the 7-digit postal code you enter is sent to the external postal-code lookup service \"ZIP CLOUD\" (operated by IB Solutions Co., Ltd.) to retrieve the corresponding address. No other personal information, such as your name or date of birth, is transmitted.",
        ],
      },
      retention: {
        title: "5. Data Retention and Deletion",
        content: "All data, including the resume you're editing, saved resumes, photos, and settings, is stored on your device. Uninstalling the App will delete all data stored on your device. Deleted data cannot be recovered, so we recommend saving or sharing important resumes as a PDF for safekeeping.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following system permissions:",
        items: [
          {
            name: "Photo Library",
            detail: "Used to select an image from your photo library to use as your ID photo. The selected photo is stored only on your device and is never transmitted externally.",
          },
          {
            name: "Face ID / Touch ID (Biometrics)",
            detail: "Used only if you enable biometric authentication as an alternative to a passcode for the app lock feature. It is not used for any purpose other than unlocking the App.",
          },
        ],
      },
      security: {
        title: "7. Security",
        content: "Aside from the postal code lookup, the App does not perform network communication, so the risk of external data leakage is minimal. Resume data is stored on your device's local storage and is protected by your device's security settings and the App's passcode/Face ID lock.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App is available for all ages, and information you enter is stored only on your device and is not collected externally (except for the postal code lookup). If you are a parent or guardian and have concerns about your child using the App, please contact our support team.",
      },
      userRights: {
        title: "9. User Rights",
        intro: "Users have the following rights:",
        items: [
          "The right to freely view and delete data stored on your device",
          "The right to delete all data by uninstalling the App",
        ],
        howTo: {
          title: "How to Delete Your Data",
          content: "You can reset the in-progress data within the App, delete individual saved resumes, or uninstall the App to remove all data.",
        },
      },
      changes: {
        title: "10. Changes to This Privacy Policy",
        content: "This Privacy Policy may be updated as needed. If there are significant changes, we will notify you through an app update or on this page. We recommend checking this page periodically.",
      },
      contact: {
        title: "11. Contact Us",
        content: "If you have any questions or comments about this Privacy Policy, please contact us at the email address below.",
        email: SUPPORT_EMAIL,
        responseTime: "Response time: within 48 hours",
      },
    },
  },
};

// ========================================
// コンポーネント
// ========================================
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

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-10">{children}</section>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
}

// ========================================
// メインページ
// ========================================
export default function ResumePrivacyPage() {
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
            <Image
              src={appIcon}
              alt="履歴書"
              width={60}
              height={60}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-sm text-gray-500">
            {t.lastUpdated}: {t.lastUpdatedDate}
          </p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* 戻るリンク */}
        <div className="text-center mb-10">
          <Link
            href="/support/resume"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToSupport}
          </Link>
        </div>

        {/* 1. はじめに */}
        <Section>
          <SectionTitle>{s.intro.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed mb-3">{s.intro.content}</p>
          <p className="text-gray-700 leading-relaxed">{s.intro.consent}</p>
        </Section>

        {/* 2. 収集する情報 */}
        <Section>
          <SectionTitle>{s.dataCollection.title}</SectionTitle>

          <h3 className="font-medium text-gray-800 mb-2">{s.dataCollection.local.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.local.intro}</p>
          <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
            {s.dataCollection.local.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-medium text-gray-800 mb-2">{s.dataCollection.notCollected.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.notCollected.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {s.dataCollection.notCollected.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* 3. 利用目的 */}
        <Section>
          <SectionTitle>{s.purpose.title}</SectionTitle>
          <p className="text-gray-700 mb-2">{s.purpose.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {s.purpose.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* 4. 第三者への提供 */}
        <Section>
          <SectionTitle>{s.thirdParty.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed mb-3">{s.thirdParty.content}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {s.thirdParty.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* 5. データ保持 */}
        <Section>
          <SectionTitle>{s.retention.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{s.retention.content}</p>
        </Section>

        {/* 6. アクセス権限 */}
        <Section>
          <SectionTitle>{s.permissions.title}</SectionTitle>
          <p className="text-gray-700 mb-4">{s.permissions.intro}</p>
          <div className="space-y-3">
            {s.permissions.items.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-1">{item.name}</p>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. セキュリティ */}
        <Section>
          <SectionTitle>{s.security.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{s.security.content}</p>
        </Section>

        {/* 8. お子様のプライバシー */}
        <Section>
          <SectionTitle>{s.children.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{s.children.content}</p>
        </Section>

        {/* 9. ユーザーの権利 */}
        <Section>
          <SectionTitle>{s.userRights.title}</SectionTitle>
          <p className="text-gray-700 mb-2">{s.userRights.intro}</p>
          <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
            {s.userRights.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-800 mb-1">{s.userRights.howTo.title}</p>
            <p className="text-sm text-gray-600">{s.userRights.howTo.content}</p>
          </div>
        </Section>

        {/* 10. 変更 */}
        <Section>
          <SectionTitle>{s.changes.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{s.changes.content}</p>
        </Section>

        {/* 11. お問い合わせ */}
        <Section>
          <SectionTitle>{s.contact.title}</SectionTitle>
          <p className="text-gray-700 mb-4">{s.contact.content}</p>
          <a
            href={`mailto:${s.contact.email}`}
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {s.contact.email}
          </a>
          <p className="mt-3 text-sm text-gray-500">{s.contact.responseTime}</p>
        </Section>
      </div>

      {/* フッター */}
      <footer className="border-t border-gray-200 py-8 mt-8">
        <div className="max-w-2xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} 履歴書. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
