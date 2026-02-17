"use client";

import { useState } from "react";
import Image from "next/image";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED = "2026年2月16日 / February 16, 2026";

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
const TRANSLATIONS: Record<Language, {
  title: string;
  lastUpdated: string;
  sections: {
    scope: { title: string; content: string; note: string };
    appInfo: {
      title: string;
      items: { label: string; value: string }[];
    };
    dataCollection: {
      title: string;
      description: string;
      notCollected: {
        title: string;
        description: string;
        items: string[];
      };
      minimalCollection: {
        title: string;
        description: string;
        note: string;
      };
      indirectTransmission: {
        title: string;
        description: string;
        items: string[];
      };
    };
    localStorage: {
      title: string;
      description: string;
      data: {
        title: string;
        items: string[];
      };
      protection: {
        title: string;
        content: string;
      };
    };
    purpose: {
      title: string;
      description: string;
      items: string[];
      notes: string[];
    };
    thirdParty: {
      title: string;
      description: string;
      providers: {
        title: string;
        items: { name: string; data: string; purpose: string; notes?: string[] }[];
      };
      legal: {
        title: string;
        content: string;
      };
    };
    sdks: {
      title: string;
      description: string;
      items: string[];
      note: string;
    };
    advertising: {
      title: string;
      description: string;
      items: string[];
      note: string;
    };
    retention: {
      title: string;
      period: {
        title: string;
        description: string;
        items: { name: string; detail: string }[];
      };
      accountDeletion: {
        title: string;
        content: string;
      };
      resetFunction: {
        title: string;
        content: string;
      };
    };
    userRights: {
      title: string;
      description: string;
      items: { name: string; detail: string }[];
    };
    notifications: {
      title: string;
      content: string;
      note: string;
    };
    security: {
      title: string;
      description: string;
      items: string[];
    };
    minors: {
      title: string;
      content: string;
      note: string;
    };
    crossBorder: {
      title: string;
      content: string;
    };
    changes: {
      title: string;
      content: string;
      publishLocation: string;
    };
    contact: {
      title: string;
      content: string;
    };
  };
}> = {
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日",
    sections: {
      scope: {
        title: "2. 適用範囲",
        content: "本プライバシーポリシーは、本アプリの利用に伴い取得・送信・保存・利用される情報の取扱いに適用されます。",
        note: "なお、本アプリからリンクされる外部サイトや外部サービスの取扱いについては、当該事業者のポリシーが適用されます。",
      },
      appInfo: {
        title: "3. 本アプリの基本情報",
        items: [
          { label: "アプリ名", value: "カン単（Word Master）" },
          { label: "Bundle ID", value: "com.kantanapp.learn（iOS/Android共通）" },
          { label: "バージョン", value: "1.0.0" },
          { label: "対応プラットフォーム", value: "iOS / Android" },
          { label: "アプリ種別", value: "英語語彙学習アプリ（オフラインファースト）" },
        ],
      },
      dataCollection: {
        title: "4. 取得する情報（取得有無・範囲）",
        description: "本アプリは、ユーザーのメールアドレスやアカウント情報等の個人情報を原則として取得しません。取得・送信される可能性がある情報は次のとおりです。",
        notCollected: {
          title: "4.1 取得しない情報（アプリ側で収集しない）",
          description: "本アプリは以下の情報をアプリ側で収集・保存しません。",
          items: [
            "メールアドレス（認証機能なし）",
            "ユーザー名（アカウント機能なし）",
            "プロフィール情報",
            "位置情報（位置情報API利用なし）",
            "広告識別子（IDFA / Google Advertising ID：広告SDK未導入のため利用なし）",
            "Cookie（アプリ内でCookie利用なし）",
            "アナリティクス用の行動追跡データ（Firebase / Google Analytics 等未導入）",
          ],
        },
        minimalCollection: {
          title: "4.2 最小限取得する情報（端末内での判定）",
          description: "OS種別（iOS/Android）の判定のみ",
          note: "※機種名・端末固有ID等の識別情報は取得しません。",
        },
        indirectTransmission: {
          title: "4.3 間接的に送信され得る情報（通信時に付随）",
          description: "本アプリが外部APIへ通信する際、通信の性質上、以下が外部サービスに送信され得ます。",
          items: [
            "IPアドレス（例：WorldTimeAPI、Google Translate TTS へのリクエスト時に暗黙的に送信される場合があります）",
          ],
        },
      },
      localStorage: {
        title: "5. 端末内に保存されるデータ（ローカル保存）",
        description: "本アプリはオフラインファーストとして、学習に関するデータの大部分をユーザー端末内（SQLite等）にのみ保存し、当方のサーバーへ送信・保存しません（クラウド同期なし）。",
        data: {
          title: "5.1 ローカル保存される主なデータ",
          items: [
            "単語チェック状態・復習フラグ",
            "クイズ回答履歴（スコア、正誤、日時）",
            "バッジ進捗（ステージ0〜4、取得日・期限）",
            "ユーザー作成の単語帳（単語・意味・類義語・反義語・メモ）",
            "アプリ設定（音声性別・地域、効果音ON/OFF、リマインダー設定 等）",
            "サブスクリプション状態のキャッシュ（後述）",
          ],
        },
        protection: {
          title: "5.2 保存先と保護",
          content: "これらのデータは、OSのアプリサンドボックス内に保存され、OSのアクセス制御によって保護されます。",
        },
      },
      purpose: {
        title: "6. 情報の利用目的",
        description: "本アプリが扱う情報（主として端末内データおよび通信に付随する情報）の利用目的は以下のとおりです。",
        items: [
          "サービス提供・機能実装（学習機能、クイズ機能、音声読み上げ等）",
          "学習データの保存（端末内SQLiteに保存。クラウド同期なし）",
          "不正利用防止（WorldTimeAPI等を用いた時刻同期により、デイリークイズ回数制限を実施）",
          "通知配信（ローカル通知のみ：例 9:00 / 19:00 の復習リマインダー）",
          "課金処理・サブスクリプション状態の確認（RevenueCat経由でApple/Googleの課金状態を管理）",
        ],
        notes: [
          "※アカウント管理：アカウント機能がないため行いません。",
          "※サービス改善・分析：アナリティクスSDK未導入のため、当方がユーザー行動を分析する目的のトラッキングは行いません。",
          "※広告配信：広告SDK未導入のため行いません。",
        ],
      },
      thirdParty: {
        title: "7. 第三者提供・外部送信（外部サービスの利用）",
        description: "本アプリは、以下の外部サービスを利用する場合があります。利用に伴い、必要最小限の情報が各サービスへ送信されることがあります。",
        providers: {
          title: "7.1 提供先・提供情報・目的",
          items: [
            {
              name: "RevenueCat",
              data: "購入情報、サブスクリプション状態、（RevenueCat/OSが用いる）デバイス識別子等",
              purpose: "サブスクリプション管理・課金処理の補助、購入状態の検証",
            },
            {
              name: "Apple / Google（App Store / Google Play）",
              data: "決済情報（プラットフォーム経由）",
              purpose: "アプリ内課金処理、サブスクリプション管理",
              notes: ["※当方はクレジットカード番号等の決済情報を保持しません。"],
            },
            {
              name: "Google Translate TTS（API）",
              data: "日本語テキスト文字列",
              purpose: "音声合成（発音生成）",
              notes: [
                "※本機能は外部サービスへの送信を伴うため、オフライン環境では利用できない場合があります。",
                "※（注）「非公式API」としての利用形態が含まれる場合、提供元の利用規約・仕様変更等により、挙動や提供範囲が変化する可能性があります。",
              ],
            },
            {
              name: "WorldTimeAPI",
              data: "通信に付随するIPアドレス等（暗黙的）",
              purpose: "時刻同期（デイリークイズ回数制限等の不正抑止）",
            },
          ],
        },
        legal: {
          title: "7.2 法令に基づく提供",
          content: "法令に基づき開示義務が生じた場合、または裁判所・行政機関等から適法な要請を受けた場合、必要な範囲で情報を開示することがあります。",
        },
      },
      sdks: {
        title: "8. 利用している主なSDK・ライブラリ",
        description: "本アプリでは、以下のSDK/ライブラリを利用します（用途は下記のとおり）。",
        items: [
          "expo-notifications：ローカル通知（復習リマインダー）",
          "expo-speech：テキスト読み上げ（英語）",
          "expo-audio：効果音・音声再生",
          "expo-sqlite：ローカルデータベース",
          "expo-file-system：TTS音声キャッシュ、データエクスポート",
          "expo-sharing：データエクスポート共有",
          "expo-print：PDF生成",
          "expo-store-review：App Storeレビュー促進",
          "@react-native-community/netinfo：ネットワーク状態検出",
          "Google Translate TTS API：日本語音声合成",
          "WorldTimeAPI：サーバー時刻同期",
          "RevenueCat（react-native-purchases v9.7.5）：サブスクリプション管理",
        ],
        note: "※Firebase / Google Analytics / AdMob / Stripe は導入していません。",
      },
      advertising: {
        title: "9. 広告・追跡（Cookie/広告ID等）",
        description: "本アプリは広告SDKを導入しておらず、以下を利用しません。",
        items: [
          "Cookie：利用なし",
          "IDFA：利用なし",
          "Google Advertising ID（AAID）：利用なし",
          "追跡型広告：なし",
        ],
        note: "（参考）ITSAppUsesNonExemptEncryption：false",
      },
      retention: {
        title: "10. データの保存期間・削除",
        period: {
          title: "10.1 保存期間",
          description: "端末内データは原則としてユーザー端末に保存され、以下の保存期間で管理されます。",
          items: [
            { name: "学習進捗・バッジ", detail: "アプリ削除まで（端末ローカル）" },
            { name: "クイズ履歴（日次）", detail: "7日間（quiz_attempts_daily テーブルで自動クリーンアップ）" },
            { name: "クイズ詳細履歴", detail: "アプリ削除まで" },
            { name: "カスタム単語帳", detail: "アプリ削除まで" },
            { name: "TTS音声キャッシュ", detail: "端末のキャッシュ領域に保存（OSが管理）" },
            { name: "サブスク状態キャッシュ", detail: "アプリ削除まで（オフライン猶予：24時間）" },
            { name: "アプリ設定", detail: "アプリ削除まで" },
          ],
        },
        accountDeletion: {
          title: "10.2 アカウント削除",
          content: "本アプリはアカウント機能がないため、アカウント削除手続きはありません。アプリをアンインストールすることで端末内データは削除されます（OSの仕様に依存します）。",
        },
        resetFunction: {
          title: "10.3 アプリ内リセット機能",
          content: "本アプリには、設定画面から「学習データリセット」を行う機能があります。これにより、クイズ履歴・単語状態・バッジ等を初期化できます。",
        },
      },
      userRights: {
        title: "11. ユーザーの権利（開示・訂正・削除等）",
        description: "本アプリは主に端末内にデータを保存するため、ユーザーはアプリ内機能により自己のデータを管理できます。",
        items: [
          { name: "データ開示", detail: "エクスポート機能により、Word / PDF / JSON 形式で出力可能" },
          { name: "訂正", detail: "ユーザーがアプリ内で直接編集可能" },
          { name: "削除", detail: "設定 > 学習データリセット、またはアプリ削除で対応" },
          { name: "利用停止", detail: "アプリのアンインストールで対応" },
          { name: "同意撤回（通知許可）", detail: "OS設定から変更・取消可能" },
          { name: "同意撤回（サブスクリプション）", detail: "Apple / Google の管理画面から解約可能" },
        ],
      },
      notifications: {
        title: "12. 通知（ローカル通知）",
        content: "本アプリは、復習リマインダー等の目的でローカル通知を利用します（例：9:00/19:00）。",
        note: "通知の受け取りはユーザーの許可に基づき、許可の変更はOSの設定から行えます。",
      },
      security: {
        title: "13. セキュリティ",
        description: "本アプリは、情報漏えい・滅失・毀損等を防止するため、合理的な安全管理措置を講じます。",
        items: [
          "外部API通信はHTTPS（SSL/TLS）を使用",
          "端末内データはOSのアプリサンドボックスにより保護",
          "データ暗号化はOSレベルのファイル暗号化等の仕組みに依存",
          "課金・サブスクリプション管理はRevenueCatおよびApple/Googleの仕組みに依存",
        ],
      },
      minors: {
        title: "14. 未成年の利用",
        content: "本アプリは年齢確認機能を実装していません。13歳未満の利用可否や保護者同意の扱いは、今後の提供形態・各ストアの設定（コンテンツレーティング等）により変更される場合があります。\n本アプリは個人情報をほぼ収集しませんが、未成年の利用が想定される場合、保護者の方が本ポリシーをご確認のうえご利用ください。",
        note: "（注）子ども向けアプリとして提供する場合は、COPPA等の法令・各ストアポリシーに基づく対応が必要となる可能性があります。",
      },
      crossBorder: {
        title: "15. 国外移転（越境移転）",
        content: "外部サービス（RevenueCat、Apple/Google、WorldTimeAPI、Google Translate TTS 等）が国外のサーバーで情報を処理する場合、ユーザーの情報が国外で取り扱われる可能性があります。詳細は各サービス提供者のプライバシーポリシーをご確認ください。",
      },
      changes: {
        title: "16. プライバシーポリシーの変更",
        content: "本ポリシーの内容は、法令やサービス内容の変更等に応じて改定される場合があります。改定後の内容は、本アプリ内またはウェブ上の掲載先にて告知し、改定日を明記します。重要な変更がある場合、可能な範囲でアプリ内表示やストア更新情報等により周知します。",
        publishLocation: "掲載場所（予定）：本ページ",
      },
      contact: {
        title: "お問い合わせ",
        content: "本プライバシーポリシーに関するご質問やご意見がございましたら、以下の連絡先までお問い合わせください：",
      },
    },
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    sections: {
      scope: {
        title: "2. Scope of Application",
        content: "This Privacy Policy applies to the handling of information that is collected, transmitted, stored, and used in connection with the use of this App.",
        note: "Please note that the privacy policies of the respective operators apply to external sites and services linked from this App.",
      },
      appInfo: {
        title: "3. Basic App Information",
        items: [
          { label: "App Name", value: "Kantan (Word Master)" },
          { label: "Bundle ID", value: "com.kantanapp.learn (iOS/Android)" },
          { label: "Version", value: "1.0.0" },
          { label: "Supported Platforms", value: "iOS / Android" },
          { label: "App Type", value: "English Vocabulary Learning App (Offline-First)" },
        ],
      },
      dataCollection: {
        title: "4. Information Collected (Scope)",
        description: "This App does not, in principle, collect personal information such as email addresses or account information. The information that may be collected or transmitted is as follows.",
        notCollected: {
          title: "4.1 Information Not Collected",
          description: "This App does not collect or store the following information.",
          items: [
            "Email address (no authentication feature)",
            "Username (no account feature)",
            "Profile information",
            "Location data (no location API usage)",
            "Advertising identifiers (IDFA / Google Advertising ID: not used as no ad SDK is implemented)",
            "Cookies (no cookie usage within the app)",
            "Behavioral tracking data for analytics (Firebase / Google Analytics etc. not implemented)",
          ],
        },
        minimalCollection: {
          title: "4.2 Minimally Collected Information (On-Device Detection)",
          description: "OS type (iOS/Android) detection only",
          note: "*Device model, unique device ID, and other identifying information are not collected.",
        },
        indirectTransmission: {
          title: "4.3 Indirectly Transmitted Information (Accompanying Communication)",
          description: "When this App communicates with external APIs, the following may be transmitted to external services due to the nature of the communication.",
          items: [
            "IP address (e.g., may be implicitly transmitted when making requests to WorldTimeAPI, Google Translate TTS)",
          ],
        },
      },
      localStorage: {
        title: "5. Data Stored on Device (Local Storage)",
        description: "As an offline-first app, most learning-related data is stored only on the user's device (SQLite, etc.) and is not transmitted to or stored on our servers (no cloud sync).",
        data: {
          title: "5.1 Main Data Stored Locally",
          items: [
            "Word check status and review flags",
            "Quiz answer history (scores, correct/incorrect, dates)",
            "Badge progress (stages 0-4, acquisition date, expiration)",
            "User-created word lists (words, meanings, synonyms, antonyms, notes)",
            "App settings (voice gender/region, sound effects ON/OFF, reminder settings, etc.)",
            "Subscription status cache (described below)",
          ],
        },
        protection: {
          title: "5.2 Storage Location and Protection",
          content: "This data is stored within the OS app sandbox and protected by OS access controls.",
        },
      },
      purpose: {
        title: "6. Purpose of Information Use",
        description: "The purposes of using information handled by this App (primarily on-device data and information accompanying communication) are as follows.",
        items: [
          "Service provision and feature implementation (learning features, quiz features, text-to-speech, etc.)",
          "Storage of learning data (stored in on-device SQLite; no cloud sync)",
          "Prevention of misuse (daily quiz attempt limits enforced through time synchronization using WorldTimeAPI, etc.)",
          "Notification delivery (local notifications only: e.g., review reminders at 9:00 / 19:00)",
          "Payment processing and subscription status verification (managing Apple/Google billing status via RevenueCat)",
        ],
        notes: [
          "*Account management: Not performed as there is no account feature.",
          "*Service improvement/analysis: No user behavior tracking is performed for analysis purposes as no analytics SDK is implemented.",
          "*Ad delivery: Not performed as no ad SDK is implemented.",
        ],
      },
      thirdParty: {
        title: "7. Third-Party Disclosure / External Transmission",
        description: "This App may use the following external services. In connection with their use, minimal necessary information may be transmitted to each service.",
        providers: {
          title: "7.1 Recipients, Information Provided, and Purposes",
          items: [
            {
              name: "RevenueCat",
              data: "Purchase information, subscription status, device identifiers (used by RevenueCat/OS), etc.",
              purpose: "Subscription management, payment processing assistance, purchase status verification",
            },
            {
              name: "Apple / Google (App Store / Google Play)",
              data: "Payment information (via platform)",
              purpose: "In-app purchase processing, subscription management",
              notes: ["*We do not retain credit card numbers or other payment information."],
            },
            {
              name: "Google Translate TTS (API)",
              data: "Japanese text strings",
              purpose: "Speech synthesis (pronunciation generation)",
              notes: [
                "*This feature involves transmission to an external service and may not be available in offline environments.",
                "*(Note) If the usage includes an \"unofficial API\" format, behavior and availability may change due to the provider's terms of service or specification changes.",
              ],
            },
            {
              name: "WorldTimeAPI",
              data: "IP address, etc. accompanying communication (implicit)",
              purpose: "Time synchronization (fraud prevention for daily quiz limits, etc.)",
            },
          ],
        },
        legal: {
          title: "7.2 Disclosure Based on Laws",
          content: "Information may be disclosed to the extent necessary when disclosure obligations arise under applicable laws, or when lawful requests are received from courts, administrative agencies, etc.",
        },
      },
      sdks: {
        title: "8. Main SDKs and Libraries Used",
        description: "This App uses the following SDKs/libraries (purposes are as described below).",
        items: [
          "expo-notifications: Local notifications (review reminders)",
          "expo-speech: Text-to-speech (English)",
          "expo-audio: Sound effects and audio playback",
          "expo-sqlite: Local database",
          "expo-file-system: TTS audio cache, data export",
          "expo-sharing: Data export sharing",
          "expo-print: PDF generation",
          "expo-store-review: App Store review prompts",
          "@react-native-community/netinfo: Network status detection",
          "Google Translate TTS API: Japanese speech synthesis",
          "WorldTimeAPI: Server time synchronization",
          "RevenueCat (react-native-purchases v9.7.5): Subscription management",
        ],
        note: "*Firebase / Google Analytics / AdMob / Stripe are not implemented.",
      },
      advertising: {
        title: "9. Advertising and Tracking (Cookies/Ad IDs, etc.)",
        description: "This App does not implement any ad SDK and does not use the following.",
        items: [
          "Cookies: Not used",
          "IDFA: Not used",
          "Google Advertising ID (AAID): Not used",
          "Tracking-based advertising: None",
        ],
        note: "(Reference) ITSAppUsesNonExemptEncryption: false",
      },
      retention: {
        title: "10. Data Retention Period and Deletion",
        period: {
          title: "10.1 Retention Period",
          description: "On-device data is stored on the user's device and managed according to the following retention periods.",
          items: [
            { name: "Learning progress / Badges", detail: "Until app deletion (device local)" },
            { name: "Quiz history (daily)", detail: "7 days (auto-cleanup in quiz_attempts_daily table)" },
            { name: "Detailed quiz history", detail: "Until app deletion" },
            { name: "Custom word lists", detail: "Until app deletion" },
            { name: "TTS audio cache", detail: "Stored in device cache area (managed by OS)" },
            { name: "Subscription status cache", detail: "Until app deletion (offline grace period: 24 hours)" },
            { name: "App settings", detail: "Until app deletion" },
          ],
        },
        accountDeletion: {
          title: "10.2 Account Deletion",
          content: "This App has no account feature, so there is no account deletion procedure. Uninstalling the app will delete on-device data (depends on OS specifications).",
        },
        resetFunction: {
          title: "10.3 In-App Reset Function",
          content: "This App has a \"Learning Data Reset\" function available from the settings screen. This allows you to initialize quiz history, word status, badges, etc.",
        },
      },
      userRights: {
        title: "11. User Rights (Disclosure, Correction, Deletion, etc.)",
        description: "Since this App primarily stores data on the device, users can manage their own data through in-app features.",
        items: [
          { name: "Data disclosure", detail: "Export in Word / PDF / JSON format via export function" },
          { name: "Correction", detail: "Users can edit directly within the app" },
          { name: "Deletion", detail: "Settings > Learning Data Reset, or uninstall the app" },
          { name: "Cessation of use", detail: "Uninstall the app" },
          { name: "Consent withdrawal (Notifications)", detail: "Can be changed/revoked from OS settings" },
          { name: "Consent withdrawal (Subscription)", detail: "Can be cancelled from Apple / Google management screen" },
        ],
      },
      notifications: {
        title: "12. Notifications (Local Notifications)",
        content: "This App uses local notifications for purposes such as review reminders (e.g., 9:00/19:00).",
        note: "Receiving notifications is based on user permission, and permission can be changed from OS settings.",
      },
      security: {
        title: "13. Security",
        description: "This App implements reasonable security measures to prevent information leakage, loss, and damage.",
        items: [
          "External API communication uses HTTPS (SSL/TLS)",
          "On-device data is protected by the OS app sandbox",
          "Data encryption relies on OS-level file encryption mechanisms",
          "Billing and subscription management relies on RevenueCat and Apple/Google mechanisms",
        ],
      },
      minors: {
        title: "14. Use by Minors",
        content: "This App does not implement age verification. Whether children under 13 can use the app and how parental consent is handled may change depending on future distribution methods and store settings (content ratings, etc.).\nWhile this App collects almost no personal information, if minors are expected to use it, we ask that guardians review this policy before use.",
        note: "(Note) If provided as a children's app, compliance with laws such as COPPA and store policies may be required.",
      },
      crossBorder: {
        title: "15. Cross-Border Transfer",
        content: "If external services (RevenueCat, Apple/Google, WorldTimeAPI, Google Translate TTS, etc.) process information on servers outside your country, your information may be handled overseas. Please refer to each service provider's privacy policy for details.",
      },
      changes: {
        title: "16. Changes to Privacy Policy",
        content: "The contents of this policy may be revised in response to changes in laws or service content. The revised content will be announced within this App or on the web, with the revision date clearly stated. For significant changes, we will make efforts to notify users through in-app displays or store update information.",
        publishLocation: "Publication location (planned): This page",
      },
      contact: {
        title: "Contact Us",
        content: "If you have any questions or comments regarding this Privacy Policy, please contact us at:",
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
    <div className="flex justify-center gap-2 mb-6">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChangeLang(lang.code)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentLang === lang.code
              ? "bg-blue-700 text-white"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
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

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 mb-4">
      <h3 className="text-base font-semibold mb-2 text-gray-700">{title}</h3>
      <div className="pl-2">{children}</div>
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
          <span className="text-red-500 mt-1 flex-shrink-0">&#x2715;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-green-500 mt-1 flex-shrink-0">&#x2713;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-blue-500 mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailList({
  items,
}: {
  items: { name: string; detail: string }[];
}) {
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

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
      <p className="text-yellow-800 text-sm">{children}</p>
    </div>
  );
}

function ProviderCard({
  name,
  data,
  purpose,
  notes,
}: {
  name: string;
  data: string;
  purpose: string;
  notes?: string[];
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
      <h4 className="font-semibold text-gray-800 mb-2">{name}</h4>
      <div className="space-y-1 text-sm">
        <p className="text-gray-700">
          <span className="font-medium text-gray-600">
            {name.includes("RevenueCat") || name.includes("WorldTimeAPI") || name.includes("Google Translate")
              ? ""
              : ""}
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium mr-2">Data</span>
          {data}
        </p>
        <p className="text-gray-700">
          <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2">Purpose</span>
          {purpose}
        </p>
      </div>
      {notes && notes.length > 0 && (
        <div className="mt-2 space-y-1">
          {notes.map((note, i) => (
            <p key={i} className="text-xs text-gray-500">{note}</p>
          ))}
        </div>
      )}
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
export default function KantanPrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image
              src="/kantan.png"
              alt="カン単"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">カン単</h1>
          <p className="text-xl text-gray-600">{t.title}</p>
          <p className="text-sm text-gray-500 mt-2">
            {t.lastUpdated}: {LAST_UPDATED}
          </p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* ストアボタン */}
        <StoreButtons />

        {/* コンテンツ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {/* 2. 適用範囲 */}
          <Section title={s.scope.title}>
            <p className="text-gray-700 leading-relaxed mb-2">{s.scope.content}</p>
            <p className="text-gray-600 text-sm">{s.scope.note}</p>
          </Section>

          {/* 3. 本アプリの基本情報 */}
          <Section title={s.appInfo.title}>
            <InfoCard
              items={s.appInfo.items.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </Section>

          {/* 4. 取得する情報 */}
          <Section title={s.dataCollection.title}>
            <p className="text-gray-700 leading-relaxed mb-4">
              {s.dataCollection.description}
            </p>

            <SubSection title={s.dataCollection.notCollected.title}>
              <p className="text-gray-700 mb-3">{s.dataCollection.notCollected.description}</p>
              <DataList items={s.dataCollection.notCollected.items} />
            </SubSection>

            <SubSection title={s.dataCollection.minimalCollection.title}>
              <p className="text-gray-700 mb-1">{s.dataCollection.minimalCollection.description}</p>
              <p className="text-gray-500 text-sm">{s.dataCollection.minimalCollection.note}</p>
            </SubSection>

            <SubSection title={s.dataCollection.indirectTransmission.title}>
              <p className="text-gray-700 mb-3">{s.dataCollection.indirectTransmission.description}</p>
              <BulletList items={s.dataCollection.indirectTransmission.items} />
            </SubSection>
          </Section>

          {/* 5. 端末内に保存されるデータ */}
          <Section title={s.localStorage.title}>
            <p className="text-gray-700 leading-relaxed mb-4">
              {s.localStorage.description}
            </p>

            <SubSection title={s.localStorage.data.title}>
              <CheckList items={s.localStorage.data.items} />
            </SubSection>

            <SubSection title={s.localStorage.protection.title}>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{s.localStorage.protection.content}</p>
              </div>
            </SubSection>
          </Section>

          {/* 6. 情報の利用目的 */}
          <Section title={s.purpose.title}>
            <p className="text-gray-700 leading-relaxed mb-4">{s.purpose.description}</p>
            <BulletList items={s.purpose.items} />
            <div className="mt-4 space-y-1">
              {s.purpose.notes.map((note, i) => (
                <p key={i} className="text-gray-500 text-sm">{note}</p>
              ))}
            </div>
          </Section>

          {/* 7. 第三者提供・外部送信 */}
          <Section title={s.thirdParty.title}>
            <p className="text-gray-700 leading-relaxed mb-4">{s.thirdParty.description}</p>

            <SubSection title={s.thirdParty.providers.title}>
              {s.thirdParty.providers.items.map((provider, i) => (
                <ProviderCard
                  key={i}
                  name={provider.name}
                  data={provider.data}
                  purpose={provider.purpose}
                  notes={provider.notes}
                />
              ))}
            </SubSection>

            <SubSection title={s.thirdParty.legal.title}>
              <p className="text-gray-700">{s.thirdParty.legal.content}</p>
            </SubSection>
          </Section>

          {/* 8. 利用している主なSDK・ライブラリ */}
          <Section title={s.sdks.title}>
            <p className="text-gray-700 mb-4">{s.sdks.description}</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-1.5">
                {s.sdks.items.map((item, i) => (
                  <li key={i} className="text-gray-700 text-sm font-mono">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-500 text-sm mt-3">{s.sdks.note}</p>
          </Section>

          {/* 9. 広告・追跡 */}
          <Section title={s.advertising.title}>
            <p className="text-gray-700 mb-3">{s.advertising.description}</p>
            <DataList items={s.advertising.items} />
            <p className="text-gray-500 text-sm mt-3">{s.advertising.note}</p>
          </Section>

          {/* 10. データの保存期間・削除 */}
          <Section title={s.retention.title}>
            <SubSection title={s.retention.period.title}>
              <p className="text-gray-700 mb-3">{s.retention.period.description}</p>
              <DetailList items={s.retention.period.items} />
            </SubSection>

            <SubSection title={s.retention.accountDeletion.title}>
              <p className="text-gray-700">{s.retention.accountDeletion.content}</p>
            </SubSection>

            <SubSection title={s.retention.resetFunction.title}>
              <p className="text-gray-700">{s.retention.resetFunction.content}</p>
            </SubSection>
          </Section>

          {/* 11. ユーザーの権利 */}
          <Section title={s.userRights.title}>
            <p className="text-gray-700 mb-4">{s.userRights.description}</p>
            <DetailList items={s.userRights.items} />
          </Section>

          {/* 12. 通知 */}
          <Section title={s.notifications.title}>
            <p className="text-gray-700 mb-2">{s.notifications.content}</p>
            <p className="text-gray-600 text-sm">{s.notifications.note}</p>
          </Section>

          {/* 13. セキュリティ */}
          <Section title={s.security.title}>
            <p className="text-gray-700 mb-3">{s.security.description}</p>
            <div className="bg-blue-50 rounded-lg p-4">
              <CheckList items={s.security.items} />
            </div>
          </Section>

          {/* 14. 未成年の利用 */}
          <Section title={s.minors.title}>
            {s.minors.content.split("\n").map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-2">{paragraph}</p>
            ))}
            <NoteBox>{s.minors.note}</NoteBox>
          </Section>

          {/* 15. 国外移転 */}
          <Section title={s.crossBorder.title}>
            <p className="text-gray-700 leading-relaxed">{s.crossBorder.content}</p>
          </Section>

          {/* 16. プライバシーポリシーの変更 */}
          <Section title={s.changes.title}>
            <p className="text-gray-700 leading-relaxed mb-2">{s.changes.content}</p>
            <p className="text-gray-500 text-sm">{s.changes.publishLocation}</p>
          </Section>

          {/* お問い合わせ */}
          <Section title={s.contact.title}>
            <p className="text-gray-700 mb-4">{s.contact.content}</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-colors"
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
