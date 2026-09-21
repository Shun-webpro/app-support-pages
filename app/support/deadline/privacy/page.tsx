"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/deadline.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年9月22日";
const LAST_UPDATED_EN = "September 22, 2026";

type Language = "ja" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
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
    thirdParty: { title: string; content: string; note: string };
    retention: { title: string; content: string; backup: string };
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
        content: "シメキル（英語表記：DeadLine、以下「本アプリ」）は、課題・レポート・仕事の資料・各種手続きなど、提出物の締め切りを管理するアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータは、お使いの端末内にのみ保存されます：",
          items: [
            "提出物の情報（タイトル・サブタイトル・締め切り日時・メモ・提出先・提出方法・優先度・ラベル色・繰り返し設定・リマインド設定・提出した日時）",
            "チェックリストの項目とその完了状態",
            "カテゴリの情報（名前・色・アイコン）",
            "アプリ設定（テーマ・アクセントカラー・新規の既定リマインド）",
          ],
        },
        notCollected: {
          title: "2-2. 収集しない情報",
          intro: "本アプリは以下の情報を収集・送信しません：",
          items: [
            "氏名・メールアドレスなどの個人識別情報（アカウント登録はありません）",
            "位置情報",
            "連絡先・写真・カメラ・マイクなどへのアクセスデータ",
            "アプリ利用状況の分析データ・クラッシュレポート",
            "広告識別子（IDFA）その他の端末を追跡するための識別子",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "端末内に保存されるデータは、以下の目的のみに使用されます：",
        items: [
          "提出物・カテゴリ・設定の保存および表示",
          "締め切りまでの残り時間の表示、並び替え・検索・絞り込みの提供",
          "リマインド通知の予約と表示（端末内で完結します）",
          "提出率・提出の早さなどの統計の計算と表示",
        ],
      },
      thirdParty: {
        title: "4. 第三者への提供",
        content: "本アプリは、ユーザーの情報を第三者に提供・販売・共有することはありません。また、本アプリはサーバーとの通信を一切行わず、広告や分析のための外部サービス（SDK）も組み込んでいないため、外部へのデータ送信は発生しません。",
        note: "なお、Appleが提供するApp Store Connectを通じて、ユーザーが共有を許可した場合に限り、ダウンロード数やクラッシュに関する統計情報が匿名の集計データとして開発者に提供されることがあります。これらにはユーザーが本アプリに登録した内容（提出物などのデータ）は含まれません。",
      },
      retention: {
        title: "5. データの保持と削除",
        content: "すべてのデータはお使いの端末内に保存されます。アプリをアンインストールすると、端末内に保存された提出物・カテゴリなどのデータおよび設定情報が削除されます。削除されたデータの復元はできませんのでご注意ください。",
        backup: "なお、iPhoneのバックアップ（iCloudバックアップやパソコンへのバックアップ）にアプリのデータが含まれる場合があります。これはiOSの機能によるもので、バックアップの保存先や内容はユーザーご自身がiOSの設定で管理します。本アプリが開発者のサーバーにデータを送信することはありません。",
      },
      permissions: {
        title: "6. アプリのアクセス権限",
        intro: "本アプリが使用するシステム権限は以下のとおりです：",
        items: [
          {
            name: "通知",
            detail: "設定した締め切りをお知らせするリマインド通知のために使用します。通知は端末内で予約・表示されるローカル通知で、外部のサーバーを経由しません。通知には提出物のタイトルが表示されるため、ロック画面での表示内容が気になる場合はiOSの「設定」→「通知」で変更してください。通知は許可しなくても本アプリを利用できます（リマインドが届かなくなります）。",
          },
        ],
      },
      security: {
        title: "7. セキュリティ",
        content: "本アプリはネットワーク通信を行わないため、外部からの情報漏洩リスクは最小限です。データはお使いの端末のストレージに保存されており、端末のセキュリティ設定（パスコード・Face ID等）によって保護されます。端末の紛失・盗難に備えて、端末のロックを必ず設定してください。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは年齢制限なくご利用いただけますが、個人情報の収集は一切行っておりません。お子様が本アプリを使用することに保護者の方の懸念がある場合は、サポートまでお問い合わせください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        intro: "ユーザーは以下の権利を有します：",
        items: [
          "端末内のデータを自由に閲覧・編集・削除する権利",
          "アプリをアンインストールすることですべてのデータを消去する権利",
        ],
        howTo: {
          title: "データの削除方法",
          content: "提出物は個別に削除できるほか、マイページの「データ」から「提出済みをすべて削除」または「すべてのデータを削除」を実行できます。アプリをアンインストールすることでも、端末内のすべてのデータを削除できます。",
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
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Back to Support",
    sections: {
      intro: {
        title: "1. Introduction",
        content: "DeadLine (known in Japan as シメキル; hereinafter “the App”) is an app for managing deadlines for things you need to submit, such as assignments, reports, work documents, and paperwork. This Privacy Policy explains how information is handled when you use the App.",
        consent: "By using the App, you agree to this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        local: {
          title: "2-1. Data Stored on Your Device",
          intro: "The following data is stored only on your device:",
          items: [
            "Deadline information (title, subtitle, due date and time, notes, recipient, submission method, priority, color label, repeat rule, reminder settings, and the time you submitted it)",
            "Checklist items and their completion status",
            "Category information (name, color, and icon)",
            "App settings (theme, accent color, and default reminders for new deadlines)",
          ],
        },
        notCollected: {
          title: "2-2. Information We Do Not Collect",
          intro: "The App does not collect or transmit the following:",
          items: [
            "Personally identifiable information such as your name or email address (there is no account registration)",
            "Location information",
            "Data from your contacts, photos, camera, microphone, or similar",
            "Usage analytics or crash reports",
            "Advertising identifiers (IDFA) or any other identifiers used to track your device",
          ],
        },
      },
      purpose: {
        title: "3. How We Use Information",
        intro: "Data stored on your device is used only for the following purposes:",
        items: [
          "Saving and displaying your deadlines, categories, and settings",
          "Showing the time remaining until each deadline, and providing sorting, search, and filtering",
          "Scheduling and displaying reminder notifications (handled entirely on your device)",
          "Calculating and displaying stats such as completion rate and how early you submit",
        ],
      },
      thirdParty: {
        title: "4. Disclosure to Third Parties",
        content: "The App does not provide, sell, or share your information with any third party. The App does not communicate with any server and does not include any third-party SDKs for advertising or analytics, so no data is sent externally.",
        note: "Note that, through Apple's App Store Connect, the developer may receive anonymous, aggregated statistics such as download counts and crash data, but only from users who have chosen to share such data with developers. These do not include any content you register in the App (such as your deadlines).",
      },
      retention: {
        title: "5. Data Retention and Deletion",
        content: "All data is stored on your device. When you uninstall the App, the deadlines, categories, and other data and settings stored on your device are deleted. Please note that deleted data cannot be restored.",
        backup: "Please also note that app data may be included in your iPhone backups (iCloud Backup or a computer backup). This is an iOS feature, and you manage where backups are stored and what they include in iOS settings. The App never sends your data to the developer's servers.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following system permission:",
        items: [
          {
            name: "Notifications",
            detail: "Used for reminder notifications about your deadlines. These are local notifications scheduled and displayed on your device and do not pass through any external server. Because a notification shows the title of the deadline, change what appears on your lock screen in iOS Settings → Notifications if you prefer. You can use the App without allowing notifications (you just won't receive reminders).",
          },
        ],
      },
      security: {
        title: "7. Security",
        content: "Because the App does not communicate over the network, the risk of information leaking externally is minimal. Your data is stored in your device's storage and protected by your device's security settings (passcode, Face ID, etc.). Please make sure to set a lock on your device in case it is lost or stolen.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App can be used without age restrictions, and it does not collect any personal information. If you are a parent or guardian with concerns about your child using the App, please contact us.",
      },
      userRights: {
        title: "9. Your Rights",
        intro: "You have the following rights:",
        items: [
          "The right to freely view, edit, and delete the data on your device",
          "The right to erase all data by uninstalling the App",
        ],
        howTo: {
          title: "How to Delete Your Data",
          content: "You can delete deadlines individually, or use “Delete all submitted” or “Delete all data” under “Data” on My Page. You can also delete all data on your device by uninstalling the App.",
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
export default function DeadLinePrivacyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
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
            href="/support/deadline"
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
          <p className="text-sm text-gray-600 leading-relaxed">{s.thirdParty.note}</p>
        </Section>

        {/* 5. データ保持 */}
        <Section>
          <SectionTitle>{s.retention.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed mb-3">{s.retention.content}</p>
          <p className="text-gray-700 leading-relaxed">{s.retention.backup}</p>
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
          <p>&copy; {currentYear} {brandName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
