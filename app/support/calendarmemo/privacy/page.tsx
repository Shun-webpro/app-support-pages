"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/calendermemo.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年6月29日";
const LAST_UPDATED_EN = "June 29, 2026";
const LAST_UPDATED_KO = "2026년 6월 29일";

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
    thirdParty: { title: string; content: string };
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
        content: "カレンダーメモ（以下「本アプリ」）は、カレンダー形式で日付ごとにメモを管理するアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータは、お使いの端末内にのみ保存されます：",
          items: [
            "各日付に作成したメモの内容（テキスト・チェック状態）",
            "区切り線の設定（色・位置）",
            "アプリ設定（テーマ・アクセントカラー・フィルター状態）",
            "ウィジェット表示設定",
          ],
        },
        notCollected: {
          title: "2-2. 収集しない情報",
          intro: "本アプリは以下の情報を収集・送信しません：",
          items: [
            "氏名・メールアドレスなどの個人識別情報",
            "位置情報",
            "連絡先・カメラ・マイクなどへのアクセスデータ",
            "アプリ利用状況の分析データ",
            "広告識別子",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "端末内に保存されるデータは、以下の目的のみに使用されます：",
        items: [
          "メモ・設定の保存および表示",
          "ウィジェットへのメモ内容の反映",
          "フィルターおよび検索機能の提供",
        ],
      },
      thirdParty: {
        title: "4. 第三者への提供",
        content: "本アプリは、ユーザーの情報を第三者に提供・販売・共有することはありません。また、本アプリはサーバーとの通信を一切行わないため、外部へのデータ送信は発生しません。",
      },
      retention: {
        title: "5. データの保持と削除",
        content: "すべてのデータはお使いの端末内に保存されます。アプリをアンインストールすると、端末内に保存されたすべてのメモデータおよび設定情報が削除されます。削除されたデータの復元はできませんのでご注意ください。",
      },
      permissions: {
        title: "6. アプリのアクセス権限",
        intro: "本アプリが使用するシステム権限は以下のとおりです：",
        items: [
          {
            name: "なし（権限不要）",
            detail: "本アプリはカメラ・位置情報・連絡先・通知などのシステム権限を必要としません。メモの作成・管理はすべてアプリ内で完結します。",
          },
        ],
      },
      security: {
        title: "7. セキュリティ",
        content: "本アプリはネットワーク通信を行わないため、外部からの情報漏洩リスクは最小限です。データはお使いの端末のストレージに保存されており、端末のセキュリティ設定（パスコード・Face ID等）によって保護されます。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは年齢制限なくご利用いただけますが、個人情報の収集は一切行っておりません。お子様が本アプリを使用することに保護者の方の懸念がある場合は、サポートまでお問い合わせください。",
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
          content: "アプリ内でメモを個別に削除するか、アプリをアンインストールすることですべてのデータを削除できます。",
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
        content: "カレンダーメモ(이하 '본 앱')는 캘린더 형식으로 날짜별로 메모를 관리하는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 정보 처리 방법에 대해 설명합니다.",
        consent: "본 앱을 이용하심으로써 본 개인정보 처리방침에 동의한 것으로 간주합니다.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        local: {
          title: "2-1. 기기에 저장되는 데이터",
          intro: "다음 데이터는 사용 중인 기기에만 저장됩니다:",
          items: [
            "각 날짜에 작성한 메모 내용(텍스트·체크 상태)",
            "구분선 설정(색상·위치)",
            "앱 설정(테마·액센트 색상·필터 상태)",
            "위젯 표시 설정",
          ],
        },
        notCollected: {
          title: "2-2. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 수집·전송하지 않습니다:",
          items: [
            "이름·이메일 주소 등의 개인 식별 정보",
            "위치 정보",
            "연락처·카메라·마이크 등의 접근 데이터",
            "앱 이용 현황 분석 데이터",
            "광고 식별자",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "기기 내에 저장되는 데이터는 다음 목적으로만 사용됩니다:",
        items: [
          "메모·설정의 저장 및 표시",
          "위젯에 메모 내용 반영",
          "필터 및 검색 기능 제공",
        ],
      },
      thirdParty: {
        title: "4. 제3자 제공",
        content: "본 앱은 이용자의 정보를 제3자에게 제공·판매·공유하지 않습니다. 또한 본 앱은 서버와의 통신을 일절 수행하지 않으므로 외부로의 데이터 전송은 발생하지 않습니다.",
      },
      retention: {
        title: "5. 데이터 보관 및 삭제",
        content: "모든 데이터는 사용 중인 기기 내에 저장됩니다. 앱을 삭제하면 기기 내에 저장된 모든 메모 데이터 및 설정 정보가 삭제됩니다. 삭제된 데이터는 복원할 수 없으니 주의해 주세요.",
      },
      permissions: {
        title: "6. 앱 접근 권한",
        intro: "본 앱이 사용하는 시스템 권한은 다음과 같습니다:",
        items: [
          {
            name: "없음(권한 불필요)",
            detail: "본 앱은 카메라·위치 정보·연락처·알림 등의 시스템 권한이 필요하지 않습니다. 메모의 작성·관리는 모두 앱 내에서 완결됩니다.",
          },
        ],
      },
      security: {
        title: "7. 보안",
        content: "본 앱은 네트워크 통신을 수행하지 않으므로 외부로의 정보 유출 위험이 최소화되어 있습니다. 데이터는 사용 중인 기기의 저장소에 보관되며, 기기의 보안 설정(패스코드·Face ID 등)에 의해 보호됩니다.",
      },
      children: {
        title: "8. 아동의 개인정보",
        content: "본 앱은 연령 제한 없이 이용 가능하지만 개인정보 수집은 일절 하지 않습니다. 자녀가 본 앱을 사용하는 것에 대해 보호자께서 우려가 있으시면 지원팀으로 문의해 주세요.",
      },
      userRights: {
        title: "9. 이용자의 권리",
        intro: "이용자는 다음 권리를 갖습니다:",
        items: [
          "기기 내 데이터를 자유롭게 열람·삭제할 권리",
          "앱을 삭제함으로써 모든 데이터를 지울 권리",
        ],
        howTo: {
          title: "데이터 삭제 방법",
          content: "앱 내에서 메모를 개별 삭제하거나 앱을 삭제함으로써 모든 데이터를 삭제할 수 있습니다.",
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
        content: "カレンダーメモ (hereinafter \"the App\") is an app for managing memos by date in a calendar format. This Privacy Policy explains how information is handled when you use the App.",
        consent: "By using the App, you are deemed to have agreed to this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        local: {
          title: "2-1. Data Stored on Your Device",
          intro: "The following data is stored only on your device:",
          items: [
            "Memo content created for each date (text and check status)",
            "Divider settings (color and position)",
            "App settings (theme, accent color, filter state)",
            "Widget display settings",
          ],
        },
        notCollected: {
          title: "2-2. Information We Do Not Collect",
          intro: "The App does not collect or transmit the following information:",
          items: [
            "Personal identifiers such as name or email address",
            "Location information",
            "Access data for contacts, camera, microphone, etc.",
            "App usage analytics data",
            "Advertising identifiers",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Use",
        intro: "Data stored on your device is used only for the following purposes:",
        items: [
          "Saving and displaying memos and settings",
          "Reflecting memo content in the widget",
          "Providing filter and search functionality",
        ],
      },
      thirdParty: {
        title: "4. Third-Party Sharing",
        content: "The App does not provide, sell, or share user information with any third parties. The App does not communicate with any server, so no data is transmitted externally.",
      },
      retention: {
        title: "5. Data Retention and Deletion",
        content: "All data is stored on your device. Uninstalling the App will delete all memo data and settings stored on your device. Please note that deleted data cannot be recovered.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following system permissions:",
        items: [
          {
            name: "None (no permissions required)",
            detail: "The App does not require system permissions such as camera, location, contacts, or notifications. All memo creation and management is handled entirely within the App.",
          },
        ],
      },
      security: {
        title: "7. Security",
        content: "Since the App does not perform network communication, the risk of external data leakage is minimal. Data is stored on your device's local storage and is protected by your device's security settings (passcode, Face ID, etc.).",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App is available for all ages and does not collect any personal information. If you are a parent or guardian and have concerns about your child using the App, please contact our support team.",
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
          content: "You can delete individual memos within the App, or uninstall the App to remove all data.",
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
export default function CalendarMemoPrivacyPage() {
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
              alt="カレンダーメモ"
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
            href="/support/calendarmemo"
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
          <p className="text-gray-700 leading-relaxed">{s.thirdParty.content}</p>
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
          <p>&copy; {currentYear} カレンダーメモ. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
