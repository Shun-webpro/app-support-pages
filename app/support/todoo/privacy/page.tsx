"use client";

import { useState } from "react";
import Link from "next/link";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED = "2026年1月28日 / January 28, 2026";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

// ========================================
// 翻訳データ
// ========================================
const TRANSLATIONS: Record<
  Language,
  {
    title: string;
    lastUpdated: string;
    backToSupport: string;
    introduction: {
      title: string;
      content: string;
    };
    developer: {
      title: string;
      appName: string;
      developerName: string;
      contact: string;
    };
    dataCollection: {
      title: string;
      highlight: string;
      description: string;
      items: string[];
    };
    localStorage: {
      title: string;
      description: string;
      items: { name: string; detail: string }[];
    };
    storageLocation: {
      title: string;
      content: string;
    };
    notifications: {
      title: string;
      description: string;
      items: string[];
    };
    thirdPartySharing: {
      title: string;
      content: string;
    };
    thirdPartyServices: {
      title: string;
      description: string;
      items: string[];
    };
    dataManagement: {
      title: string;
      description: string;
      items: { name: string; detail: string }[];
      uninstallNote: string;
    };
    password: {
      title: string;
      content: string;
    };
    children: {
      title: string;
      content: string;
    };
    security: {
      title: string;
      content: string;
    };
    changes: {
      title: string;
      content: string;
    };
    contact: {
      title: string;
      content: string;
    };
    appStorePrivacy: {
      title: string;
      subtitle: string;
      description: string;
      tableHeaders: string[];
      categories: string[];
    };
  }
> = {
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日",
    backToSupport: "サポートページに戻る",
    introduction: {
      title: "はじめに",
      content:
        "本プライバシーポリシーは、ToDoo（以下「本アプリ」）におけるユーザー情報の取り扱いについて説明します。本アプリは、ユーザーのプライバシーを最大限に尊重し、個人情報の保護に努めています。",
    },
    developer: {
      title: "運営者情報",
      appName: "アプリ名",
      developerName: "開発者",
      contact: "お問い合わせ",
    },
    dataCollection: {
      title: "収集する情報",
      highlight: "本アプリは、個人を特定できる情報を一切収集しません。",
      description:
        "本アプリはユーザーのプライバシーを最優先に設計されており、以下の情報を収集・送信することはありません：",
      items: [
        "氏名、メールアドレス、電話番号などの個人情報",
        "位置情報（GPS）",
        "デバイス識別子",
        "IPアドレス",
        "使用状況の分析データ",
        "広告識別子",
      ],
    },
    localStorage: {
      title: "ローカルに保存されるデータ",
      description:
        "本アプリは、以下のデータをユーザーのデバイス内にのみ保存します。これらのデータは外部サーバーに送信されることはありません：",
      items: [
        {
          name: "タスクデータ",
          detail: "ユーザーが作成したタスクのタイトル、説明、予定時間、完了状態",
        },
        {
          name: "カテゴリーデータ",
          detail: "ユーザーが作成したカテゴリー名、色、表示順序",
        },
        {
          name: "設定データ",
          detail: "テーマカラー、リマインダー設定、言語設定、パスワード設定",
        },
        {
          name: "テンプレートデータ",
          detail: "毎日のタスク、頻繁に使用するタスクのテンプレート",
        },
        {
          name: "特別な日の設定",
          detail: "ユーザーが設定した本番日・特別な日の情報",
        },
      ],
    },
    storageLocation: {
      title: "データの保存場所",
      content:
        "すべてのデータは、ユーザーのデバイス内のローカルストレージ（AsyncStorage）にのみ保存されます。クラウドサービスや外部サーバーへのデータ同期機能はありません。",
    },
    notifications: {
      title: "通知機能",
      description:
        "本アプリは、ユーザーが設定したリマインダーに基づいてローカル通知を送信します。この通知機能は：",
      items: [
        "ユーザーのデバイス上でのみ動作します",
        "外部サーバーとの通信を行いません",
        "ユーザーがいつでも設定からオフにできます",
      ],
    },
    thirdPartySharing: {
      title: "第三者へのデータ提供",
      content:
        "本アプリは、ユーザーのデータを第三者に提供、販売、共有することはありません。すべてのデータはユーザーのデバイス内に留まります。",
    },
    thirdPartyServices: {
      title: "第三者サービス",
      description: "本アプリは以下の第三者サービスを使用していません：",
      items: [
        "分析ツール（Google Analytics、Firebase Analytics等）",
        "広告ネットワーク",
        "クラッシュレポートサービス",
        "ソーシャルメディア連携",
        "クラウドストレージサービス",
      ],
    },
    dataManagement: {
      title: "データのエクスポートと削除",
      description:
        "ユーザーは、アプリ内の設定画面から以下の操作を行うことができます：",
      items: [
        {
          name: "データのエクスポート",
          detail: "すべてのデータをJSON形式でエクスポート",
        },
        {
          name: "データのインポート",
          detail: "以前エクスポートしたデータを復元",
        },
        {
          name: "データの完全削除",
          detail: "すべてのアプリデータを削除",
        },
      ],
      uninstallNote:
        "アプリをアンインストールすると、デバイスに保存されたすべてのデータが削除されます。",
    },
    password: {
      title: "パスワード機能",
      content:
        "本アプリにはパスワードロック機能がありますが、このパスワードはユーザーのデバイス内にのみ保存され、外部に送信されることはありません。パスワードを忘れた場合は、アプリの再インストールが必要となりますのでご注意ください。",
    },
    children: {
      title: "子供のプライバシー",
      content:
        "本アプリは、13歳未満の子供から意図的に個人情報を収集することはありません。本アプリは個人情報を一切収集しないため、すべての年齢のユーザーが安心してご利用いただけます。",
    },
    security: {
      title: "セキュリティ",
      content:
        "本アプリは、データを外部に送信しないことで、最高レベルのデータセキュリティを提供しています。ユーザーのデータは常にユーザーのデバイス内に安全に保管されます。",
    },
    changes: {
      title: "プライバシーポリシーの変更",
      content:
        "本プライバシーポリシーは、必要に応じて更新されることがあります。重要な変更がある場合は、アプリ内で通知いたします。本ポリシーの最新版は、常にこのページでご確認いただけます。",
    },
    contact: {
      title: "お問い合わせ",
      content:
        "本プライバシーポリシーに関するご質問やご意見がございましたら、以下の連絡先までお問い合わせください：",
    },
    appStorePrivacy: {
      title: "App Store / Google Play プライバシー詳細",
      subtitle: "収集しないデータ",
      description:
        "AppleおよびGoogleのプライバシー要件に基づき、本アプリは「データ収集なし」カテゴリに該当します。",
      tableHeaders: ["カテゴリ", "収集", "ユーザーに紐付け", "トラッキング"],
      categories: [
        "連絡先情報",
        "健康とフィットネス",
        "財務情報",
        "位置情報",
        "機密情報",
        "連絡先",
        "ユーザーコンテンツ",
        "閲覧履歴",
        "検索履歴",
        "識別子",
        "購入",
        "使用状況データ",
        "診断",
        "その他のデータ",
      ],
    },
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    backToSupport: "Back to Support",
    introduction: {
      title: "Introduction",
      content:
        'This Privacy Policy explains how ToDoo ("the App") handles user information. The App is designed with maximum respect for user privacy and is committed to protecting personal information.',
    },
    developer: {
      title: "Developer Information",
      appName: "App Name",
      developerName: "Developer",
      contact: "Contact",
    },
    dataCollection: {
      title: "Information We Collect",
      highlight: "This App does not collect any personally identifiable information.",
      description:
        "The App is designed with user privacy as the top priority and does not collect or transmit the following information:",
      items: [
        "Personal information such as name, email address, or phone number",
        "Location data (GPS)",
        "Device identifiers",
        "IP addresses",
        "Usage analytics data",
        "Advertising identifiers",
      ],
    },
    localStorage: {
      title: "Data Stored Locally",
      description:
        "The App stores the following data only on the user's device. This data is never transmitted to external servers:",
      items: [
        {
          name: "Task Data",
          detail:
            "Task titles, descriptions, scheduled times, and completion status created by the user",
        },
        {
          name: "Category Data",
          detail: "Category names, colors, and display order created by the user",
        },
        {
          name: "Settings Data",
          detail: "Theme color, reminder settings, language settings, and password settings",
        },
        {
          name: "Template Data",
          detail: "Daily tasks and frequently used task templates",
        },
        {
          name: "Special Day Settings",
          detail: "Information about important days set by the user",
        },
      ],
    },
    storageLocation: {
      title: "Data Storage Location",
      content:
        "All data is stored exclusively in local storage (AsyncStorage) on the user's device. There is no cloud service or external server data synchronization feature.",
    },
    notifications: {
      title: "Notification Feature",
      description:
        "The App sends local notifications based on reminders set by the user. This notification feature:",
      items: [
        "Operates only on the user's device",
        "Does not communicate with external servers",
        "Can be turned off by the user at any time in settings",
      ],
    },
    thirdPartySharing: {
      title: "Data Sharing with Third Parties",
      content:
        "The App does not provide, sell, or share user data with any third parties. All data remains on the user's device.",
    },
    thirdPartyServices: {
      title: "Third-Party Services",
      description: "The App does not use the following third-party services:",
      items: [
        "Analytics tools (Google Analytics, Firebase Analytics, etc.)",
        "Advertising networks",
        "Crash reporting services",
        "Social media integrations",
        "Cloud storage services",
      ],
    },
    dataManagement: {
      title: "Data Export and Deletion",
      description:
        "Users can perform the following operations from the settings screen within the App:",
      items: [
        {
          name: "Data Export",
          detail: "Export all data in JSON format",
        },
        {
          name: "Data Import",
          detail: "Restore previously exported data",
        },
        {
          name: "Complete Data Deletion",
          detail: "Delete all app data",
        },
      ],
      uninstallNote:
        "Uninstalling the App will delete all data stored on the device.",
    },
    password: {
      title: "Password Feature",
      content:
        "The App includes a password lock feature, but this password is stored only on the user's device and is never transmitted externally. Please note that if you forget your password, you will need to reinstall the App.",
    },
    children: {
      title: "Children's Privacy",
      content:
        "The App does not intentionally collect personal information from children under 13 years of age. Since the App does not collect any personal information, users of all ages can use it with peace of mind.",
    },
    security: {
      title: "Security",
      content:
        "The App provides the highest level of data security by not transmitting data externally. User data is always securely stored on the user's device.",
    },
    changes: {
      title: "Changes to This Privacy Policy",
      content:
        "This Privacy Policy may be updated as needed. If there are significant changes, we will notify you within the App. The latest version of this policy is always available on this page.",
    },
    contact: {
      title: "Contact Us",
      content:
        "If you have any questions or comments regarding this Privacy Policy, please contact us at:",
    },
    appStorePrivacy: {
      title: "App Store / Google Play Privacy Details",
      subtitle: "Data Not Collected",
      description:
        'According to Apple and Google\'s privacy requirements, this app falls under the category of "Data Not Collected".',
      tableHeaders: ["Category", "Collected", "Linked to User", "Used for Tracking"],
      categories: [
        "Contact Info",
        "Health & Fitness",
        "Financial Info",
        "Location",
        "Sensitive Info",
        "Contacts",
        "User Content",
        "Browsing History",
        "Search History",
        "Identifiers",
        "Purchases",
        "Usage Data",
        "Diagnostics",
        "Other Data",
      ],
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
    <div className="flex justify-center gap-2 mb-6">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChangeLang(lang.code)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
        <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
        {title}
      </h2>
      <div className="pl-3">{children}</div>
    </section>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-green-800 font-medium">{children}</p>
      </div>
    </div>
  );
}

function InfoCard({
  items,
}: {
  items: { label: string; value: string | React.ReactNode }[];
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex flex-wrap gap-2">
          <span className="font-medium text-gray-600">{item.label}:</span>
          <span className="text-gray-800">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function DataList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-red-500 mt-1">✕</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function LocalDataList({ items }: { items: { name: string; detail: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400"
        >
          <p className="font-medium text-blue-800">{item.name}</p>
          <p className="text-blue-700 text-sm mt-1">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-green-500 mt-1">✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function PrivacyTable({
  headers,
  categories,
}: {
  headers: string[];
  categories: string[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-200 px-3 py-2 text-left font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-200 px-3 py-2 text-gray-700">
                {category}
              </td>
              <td className="border border-gray-200 px-3 py-2 text-center">
                <span className="text-green-600 font-medium">No</span>
              </td>
              <td className="border border-gray-200 px-3 py-2 text-center">
                <span className="text-green-600 font-medium">No</span>
              </td>
              <td className="border border-gray-200 px-3 py-2 text-center">
                <span className="text-green-600 font-medium">No</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StoreButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <p className="text-xs opacity-80">Download on the</p>
          <p className="text-sm font-semibold">App Store</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
        </svg>
        <div className="text-left">
          <p className="text-xs opacity-80">GET IT ON</p>
          <p className="text-sm font-semibold">Google Play</p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
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
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">ToDoo</h1>
          <p className="text-xl text-gray-600">{t.title}</p>
          <p className="text-sm text-gray-500 mt-2">
            {t.lastUpdated}: {LAST_UPDATED}
          </p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* サポートページへ戻る */}
        <div className="text-center mb-8">
          <Link
            href="/support/todoo"
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
            {t.backToSupport}
          </Link>
        </div>

        {/* ストアボタン */}
        <StoreButtons />

        {/* コンテンツ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {/* はじめに */}
          <Section title={t.introduction.title}>
            <p className="text-gray-700 leading-relaxed">{t.introduction.content}</p>
          </Section>

          {/* 運営者情報 */}
          <Section title={t.developer.title}>
            <InfoCard
              items={[
                { label: t.developer.appName, value: "ToDoo" },
                { label: t.developer.developerName, value: "shun1234" },
                {
                  label: t.developer.contact,
                  value: (
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="text-blue-600 hover:underline"
                    >
                      {SUPPORT_EMAIL}
                    </a>
                  ),
                },
              ]}
            />
          </Section>

          {/* 収集する情報 */}
          <Section title={t.dataCollection.title}>
            <HighlightBox>{t.dataCollection.highlight}</HighlightBox>
            <p className="text-gray-700 mb-4">{t.dataCollection.description}</p>
            <DataList items={t.dataCollection.items} />
          </Section>

          {/* ローカルに保存されるデータ */}
          <Section title={t.localStorage.title}>
            <p className="text-gray-700 mb-4">{t.localStorage.description}</p>
            <LocalDataList items={t.localStorage.items} />
          </Section>

          {/* データの保存場所 */}
          <Section title={t.storageLocation.title}>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">{t.storageLocation.content}</p>
              </div>
            </div>
          </Section>

          {/* 通知機能 */}
          <Section title={t.notifications.title}>
            <p className="text-gray-700 mb-4">{t.notifications.description}</p>
            <CheckList items={t.notifications.items} />
          </Section>

          {/* 第三者へのデータ提供 */}
          <Section title={t.thirdPartySharing.title}>
            <HighlightBox>{t.thirdPartySharing.content}</HighlightBox>
          </Section>

          {/* 第三者サービス */}
          <Section title={t.thirdPartyServices.title}>
            <p className="text-gray-700 mb-4">{t.thirdPartyServices.description}</p>
            <DataList items={t.thirdPartyServices.items} />
          </Section>

          {/* データのエクスポートと削除 */}
          <Section title={t.dataManagement.title}>
            <p className="text-gray-700 mb-4">{t.dataManagement.description}</p>
            <LocalDataList items={t.dataManagement.items} />
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                <span className="font-medium">Note:</span> {t.dataManagement.uninstallNote}
              </p>
            </div>
          </Section>

          {/* パスワード機能 */}
          <Section title={t.password.title}>
            <p className="text-gray-700 leading-relaxed">{t.password.content}</p>
          </Section>

          {/* 子供のプライバシー */}
          <Section title={t.children.title}>
            <p className="text-gray-700 leading-relaxed">{t.children.content}</p>
          </Section>

          {/* セキュリティ */}
          <Section title={t.security.title}>
            <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="text-blue-800">{t.security.content}</p>
            </div>
          </Section>

          {/* プライバシーポリシーの変更 */}
          <Section title={t.changes.title}>
            <p className="text-gray-700 leading-relaxed">{t.changes.content}</p>
          </Section>

          {/* お問い合わせ */}
          <Section title={t.contact.title}>
            <p className="text-gray-700 mb-4">{t.contact.content}</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {SUPPORT_EMAIL}
            </a>
          </Section>
        </div>

        {/* App Store / Google Play プライバシー詳細 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {t.appStorePrivacy.title}
          </h2>
          <p className="text-gray-600 mb-4">{t.appStorePrivacy.subtitle}</p>
          <p className="text-gray-700 mb-6">{t.appStorePrivacy.description}</p>

          <PrivacyTable
            headers={t.appStorePrivacy.tableHeaders}
            categories={t.appStorePrivacy.categories}
          />
        </div>

        {/* フッター */}
        <footer className="text-center py-8 mt-8">
          <p className="text-sm text-gray-500">
            Copyright {currentYear} shun1234. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
