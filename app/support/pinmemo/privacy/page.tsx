"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/pinmemo.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const APP_NAME_JA = "ピンメモ";
const APP_NAME_EN = "PinMemo";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

// ========================================
// コンテンツ定義
// ========================================
type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cross"; items: string[] };

type PolicySection = { title: string; blocks: Block[] };

type PolicyContent = {
  title: string;
  lastUpdated: string;
  lastUpdatedDate: string;
  backToSupport: string;
  tableOfContents: string;
  emailLabel: string;
  responseTime: string;
  footerNote: string;
  sections: PolicySection[];
};

const CONTENT: Record<Language, PolicyContent> = {
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日",
    lastUpdatedDate: "2026年10月14日",
    backToSupport: "サポートページに戻る",
    tableOfContents: "目次",
    emailLabel: "メールアドレス",
    responseTime: "※ 通常48時間以内に返信いたします。",
    footerNote: "対応言語：日本語・英語",
    sections: [
      {
        title: "1. はじめに",
        blocks: [
          {
            type: "p",
            text: `${APP_NAME_JA}（英語表記：${APP_NAME_EN}、以下「本アプリ」）は、メモをフォルダーで整理して書き留めるためのアプリです。メモのピン留め、文字の色・太字、箇条書きとチェックボックス、パスコード・生体認証によるロック、ライト／ダークモードとテーマカラーの変更などの機能を備えています。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。`,
          },
          {
            type: "p",
            text: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。同意いただけない場合は、本アプリのご利用をお控えください。",
          },
        ],
      },
      {
        title: "2. 取り扱う情報",
        blocks: [
          { type: "h", text: "2-1. 端末内にのみ保存されるデータ" },
          {
            type: "p",
            text: "以下のデータは、お使いの端末内のアプリ専用領域にのみ保存され、開発者のサーバーへ送信されることはありません。",
          },
          {
            type: "ul",
            items: [
              "フォルダーの情報（名前・アイコン・色・並び順）",
              "メモの情報（タイトル・本文・文字の色や太字の範囲・チェックボックスの状態・ピン留め・並び順・作成日時・更新日時）",
              "アプリ設定（ライト／ダークモード、テーマカラー、フォルダーの表示形式、編集モードの状態）",
              "パスコードロックの設定（パスコードそのものは保存せず、確認用に変換した値のみを、OSのセキュアストレージ（Keychain等）に保存します）",
              "生体認証の有効／無効の設定（顔・指紋のデータ自体はOSが管理し、本アプリは取得できません）",
              "評価のお願いを表示するかどうかの判断に使う情報（初回起動日時、メモを保存した回数、表示した回数・日時）",
            ],
          },
          { type: "h", text: "2-2. 収集しない情報" },
          {
            type: "cross",
            items: [
              "氏名・メールアドレス・電話番号などの個人を識別する情報（お問い合わせ時にお送りいただく場合を除く）",
              "アカウント情報（本アプリにはアカウント登録・ログイン機能がありません）",
              "位置情報、連絡先、写真、カメラ・マイクへのアクセスデータ",
              "メモ・フォルダーの内容（開発者や第三者に送信・閲覧されることはありません）",
              "顔・指紋などの生体認証の生データ",
              "広告識別子や、利用状況の解析を目的とした情報",
            ],
          },
        ],
      },
      {
        title: "3. 情報の利用目的",
        blocks: [
          {
            type: "p",
            text: "端末内に保存された情報は、メモの表示・編集・整理、アプリの設定の反映、パスコード・生体認証によるロックの提供、評価のお願いを適切な時期に表示することのみに利用します。これら以外の目的で利用することはありません。",
          },
        ],
      },
      {
        title: "4. 外部サービス・第三者への提供",
        blocks: [
          {
            type: "p",
            text: "本アプリは、開発者のサーバーや、広告・解析・課金などの外部サービスへ情報を送信しません。また、取得した情報を第三者に提供・販売・共有することはありません。",
          },
          {
            type: "ul",
            items: [
              "共有機能：メモの画面の共有ボタンを押したときに限り、タイトルと本文が文字として、OSの共有画面を通じて、あなたが選んだアプリへ渡されます。渡された先でのデータの取り扱いは、そのアプリの方針に従います。",
              "評価のお願い：評価のダイアログは、OSが提供する仕組みで表示されます。評価の入力内容は、OSの提供元（Apple、Google）が管理します。",
            ],
          },
        ],
      },
      {
        title: "5. 端末の機能の利用",
        blocks: [
          {
            type: "ul",
            items: [
              "生体認証（Face ID・指紋認証など）：パスコードロックの解除のために、「生体認証でロック解除」をオンにした場合にのみ使用します。認証の判定はOSが行い、本アプリが顔や指紋のデータを取得・保存することはありません。",
            ],
          },
        ],
      },
      {
        title: "6. データの保存期間と削除",
        blocks: [
          {
            type: "p",
            text: "メモ・フォルダー・設定などのデータは、お客様が削除するか、本アプリを端末から削除するまで、端末内に保存されます。",
          },
          {
            type: "ul",
            items: [
              "メモの削除：メモを左へスワイプして削除できます。",
              "フォルダーの削除：フォルダーを削除すると、中のメモもすべて削除されます。",
              "アプリの削除：本アプリを端末から削除すると、端末内のメモ・フォルダー・設定は削除されます。なお、パスコードの確認用データは、OSの仕様により、アプリを削除しても端末に残る場合があります。",
            ],
          },
          { type: "p", text: "削除したデータは、開発者が復元することはできません。" },
        ],
      },
      {
        title: "7. バックアップ",
        blocks: [
          {
            type: "p",
            text: "端末のバックアップ機能（iCloudバックアップ、パソコンへのバックアップ等）を有効にしている場合、本アプリのデータがバックアップに含まれることがあります。これはOSの機能によるもので、本アプリが制御するものではありません。本アプリには、アカウントやクラウド同期の機能はありません。",
          },
        ],
      },
      {
        title: "8. セキュリティ",
        blocks: [
          {
            type: "p",
            text: "パスコードそのものは保存せず、変換した値のみをOSのセキュアストレージに保存します。メモ・フォルダーのデータは端末内に保存され、通信を行わないため、通信経路での漏えいのおそれはありません。ただし、完全な安全性を保証するものではありません。パスコードを忘れた場合、開発者側でパスコードを確認・解除することはできませんので、ご注意ください。",
          },
        ],
      },
      {
        title: "9. お子様のプライバシー",
        blocks: [
          {
            type: "p",
            text: "本アプリは、年齢を問わず個人情報を収集しません。お子様が利用する場合も、入力した内容は端末内にのみ保存されます。",
          },
        ],
      },
      {
        title: "10. プライバシーポリシーの変更",
        blocks: [
          {
            type: "p",
            text: "本プライバシーポリシーの内容は、機能の追加や法令の変更などに応じて、予告なく改定することがあります。改定後の内容は、このページに掲載した時点で効力を生じます。重要な変更がある場合は、本アプリまたはこのページでお知らせします。",
          },
        ],
      },
      {
        title: "11. お問い合わせ",
        blocks: [
          {
            type: "p",
            text: "本プライバシーポリシーに関するご質問・ご要望は、下記のメールアドレスまでお問い合わせください。",
          },
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated",
    lastUpdatedDate: "October 14, 2026",
    backToSupport: "Back to Support",
    tableOfContents: "Table of Contents",
    emailLabel: "Email",
    responseTime: "* We usually reply within 48 hours.",
    footerNote: "Supported languages: Japanese, English",
    sections: [
      {
        title: "1. Introduction",
        blocks: [
          {
            type: "p",
            text: `${APP_NAME_EN} (Japanese name: ${APP_NAME_JA}, the "App") is an app for writing down notes organized in folders. It offers features such as pinning notes, text color and bold, bullets and checkboxes, passcode and biometric lock, and light/dark mode with theme colors. This Privacy Policy explains how information is handled when you use the App.`,
          },
          {
            type: "p",
            text: "By using the App, you are deemed to have agreed to this Privacy Policy. If you do not agree, please do not use the App.",
          },
        ],
      },
      {
        title: "2. Information We Handle",
        blocks: [
          { type: "h", text: "2-1. Data stored only on your device" },
          {
            type: "p",
            text: "The following data is stored only in the app's private storage area on your device and is never sent to the developer's servers.",
          },
          {
            type: "ul",
            items: [
              "Folder information (name, icon, color, order)",
              "Note information (title, body, ranges of text color and bold, checkbox state, pinned state, order, creation and update times)",
              "App settings (light/dark mode, theme color, folder display style, edit mode state)",
              "Passcode lock settings (the passcode itself is not stored; only a hashed value used for verification is kept in the OS secure storage, such as the Keychain)",
              "Whether biometric unlock is enabled (the face or fingerprint data itself is managed by the OS and cannot be accessed by the App)",
              "Information used to decide whether to show a rating request (first launch time, number of notes saved, number and time of displays)",
            ],
          },
          { type: "h", text: "2-2. Information we do not collect" },
          {
            type: "cross",
            items: [
              "Personally identifiable information such as name, email address, or phone number (except when you send it to us in an inquiry)",
              "Account information (the App has no account registration or login)",
              "Location, contacts, photos, or camera/microphone data",
              "The content of your notes and folders (it is never sent to or viewed by the developer or third parties)",
              "Raw biometric data such as face or fingerprint",
              "Advertising identifiers or information for usage analytics",
            ],
          },
        ],
      },
      {
        title: "3. How We Use Information",
        blocks: [
          {
            type: "p",
            text: "Information stored on your device is used only to display, edit, and organize notes, apply app settings, provide passcode and biometric lock, and show a rating request at an appropriate time. We do not use it for any other purpose.",
          },
        ],
      },
      {
        title: "4. External Services and Third Parties",
        blocks: [
          {
            type: "p",
            text: "The App does not send information to the developer's servers or to external services such as advertising, analytics, or billing. We do not provide, sell, or share information with third parties.",
          },
          {
            type: "ul",
            items: [
              "Sharing: only when you tap the share button on a note, the title and body are passed as text to the app you choose through the OS share sheet. How the data is handled there is governed by that app's policy.",
              "Rating request: the rating dialog is displayed by a mechanism provided by the OS. What you enter is managed by the OS provider (Apple, Google).",
            ],
          },
        ],
      },
      {
        title: "5. Use of Device Features",
        blocks: [
          {
            type: "ul",
            items: [
              "Biometrics (Face ID, fingerprint, etc.): used only if you turn on “Unlock with biometrics” to unlock the passcode lock. Authentication is performed by the OS; the App does not obtain or store your face or fingerprint data.",
            ],
          },
        ],
      },
      {
        title: "6. Retention and Deletion",
        blocks: [
          {
            type: "p",
            text: "Notes, folders, settings, and other data remain on your device until you delete them or delete the App from your device.",
          },
          {
            type: "ul",
            items: [
              "Deleting a note: swipe the note to the left to delete it.",
              "Deleting a folder: deleting a folder also deletes all notes inside it.",
              "Deleting the app: deleting the App from your device removes the notes, folders, and settings stored on the device. Note that, depending on the OS, the data used to verify the passcode may remain on the device even after the app is deleted.",
            ],
          },
          { type: "p", text: "Deleted data cannot be restored by the developer." },
        ],
      },
      {
        title: "7. Backups",
        blocks: [
          {
            type: "p",
            text: "If you use your device's backup features (iCloud Backup, computer backup, etc.), the App's data may be included in the backup. This is an OS feature and is not controlled by the App. The App has no account or cloud sync feature.",
          },
        ],
      },
      {
        title: "8. Security",
        blocks: [
          {
            type: "p",
            text: "The passcode itself is not stored; only a hashed value is kept in the OS secure storage. Notes and folders are stored on your device and are not transmitted over a network, so there is no risk of leakage in transit. However, complete security cannot be guaranteed. If you forget your passcode, the developer cannot view or remove it, so please be careful.",
          },
        ],
      },
      {
        title: "9. Children's Privacy",
        blocks: [
          {
            type: "p",
            text: "The App does not collect personal information regardless of age. Even when used by children, what is entered is stored only on the device.",
          },
        ],
      },
      {
        title: "10. Changes to This Policy",
        blocks: [
          {
            type: "p",
            text: "This Privacy Policy may be revised without notice in response to added features or changes in law. Revisions take effect when posted on this page. If there are important changes, we will notify you in the App or on this page.",
          },
        ],
      },
      {
        title: "11. Contact",
        blocks: [
          {
            type: "p",
            text: "For questions or requests regarding this Privacy Policy, please contact us at the email address below.",
          },
        ],
      },
    ],
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-gray-700 leading-relaxed">
          <span className="text-gray-400 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CrossList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-gray-700 leading-relaxed">
          <span className="text-red-400 flex-shrink-0">×</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-gray-700 leading-relaxed">{block.text}</p>;
    case "h":
      return <h3 className="text-base font-semibold mt-4 text-gray-700">{block.text}</h3>;
    case "ul":
      return <BulletList items={block.items} />;
    case "cross":
      return <CrossList items={block.items} />;
  }
}

function PolicySectionView({
  section,
  children,
}: {
  section: PolicySection;
  children?: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold mb-3 text-gray-800 pb-2 border-b border-gray-200">
        {section.title}
      </h2>
      <div className="space-y-3">
        {section.blocks.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
        {children}
      </div>
    </section>
  );
}

// ========================================
// メインページ
// ========================================
export default function PinMemoPrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = CONTENT[lang];
  const currentYear = new Date().getFullYear();
  const contactIndex = t.sections.length - 1; // 最後の「お問い合わせ」セクション

  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image
              src={appIcon}
              alt={APP_NAME_EN}
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {lang === "ja" ? APP_NAME_JA : APP_NAME_EN}
          </h1>
          <p className="text-xl text-gray-600">{t.title}</p>
          <p className="text-sm text-gray-500 mt-2">
            {t.lastUpdated}: {t.lastUpdatedDate}
          </p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* 戻るリンク */}
        <div className="text-center mb-8">
          <Link
            href="/support/pinmemo"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToSupport}
          </Link>
        </div>

        {/* 本文 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {/* 目次 */}
          <div className="mb-8 bg-gray-50 rounded-xl p-5">
            <h2 className="font-semibold text-gray-700 mb-3">{t.tableOfContents}</h2>
            <ol className="space-y-1">
              {t.sections.map((section, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {section.title}
                </li>
              ))}
            </ol>
          </div>

          {t.sections.map((section, index) => (
            <PolicySectionView key={index} section={section}>
              {index === contactIndex && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">{t.emailLabel}:</span> {SUPPORT_EMAIL}
                    </p>
                  </div>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                  <p className="text-sm text-gray-500">{t.responseTime}</p>
                  <p className="text-xs text-gray-400 mt-2 italic">{t.footerNote}</p>
                </>
              )}
            </PolicySectionView>
          ))}
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
