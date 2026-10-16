"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/Dairygram.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const APP_NAME_JA = "日記グラム";
const APP_NAME_EN = "Dairygram";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en" | "ko" | "zh-TW";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
];

// ========================================
// コンテンツ定義
// ========================================
type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cross"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "note"; text: string }
  | { type: "warn"; text: string };

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
    lastUpdatedDate: "2026年10月16日",
    backToSupport: "サポートページに戻る",
    tableOfContents: "目次",
    emailLabel: "メールアドレス",
    responseTime: "※ 通常48時間以内に返信いたします。",
    footerNote: "対応言語：日本語・英語・韓国語・繁體中文",
    sections: [
      {
        title: "1. はじめに",
        blocks: [
          {
            type: "p",
            text: `${APP_NAME_JA}（${APP_NAME_EN}、以下「本アプリ」）は、写真や動画を添えて日記を記録するためのフォト日記アプリです。気分・天気・ブックマークの記録、月ごとの閲覧、統計の表示、下書きの自動保存、パスコード・生体認証（Face ID・Touch ID）によるロックなどの機能を備えています。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。`,
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
          { type: "p", text: "以下のデータは、お使いの端末内のアプリ専用領域にのみ保存され、開発者のサーバーや広告・課金サービスへ送信されることはありません。" },
          {
            type: "ul",
            items: [
              "日記の内容（タイトル・本文・日付・気分・天気・ブックマークの有無・作成日時・更新日時）",
              "日記に添付した写真・動画（アプリ専用領域にコピーして保存されます）と、動画の一覧表示用のサムネイル画像",
              "作成中の日記の下書き（自動下書き保存がオンの場合）",
              "アプリ設定（ライト／ダーク／システムの別、テーマカラー、自動下書き保存・自動圧縮・使った写真を元から削除の各設定）",
              "写真を圧縮した際の、圧縮前後のファイルサイズの記録（「ストレージ」での節約容量の表示に使用）",
              "パスコードロックの設定（パスコードはSHA-256でハッシュ化され、OSのセキュアストレージ（Keychain）に保存されます）",
              "生体認証の有効/無効設定（顔・指紋のデータ自体はOSが管理し、本アプリは取得できません）",
              "プレミアムの購入状態（端末内のキャッシュ）",
              "全画面広告を表示する頻度の判定に使う、日記の新規作成回数",
              "起動時の連続記録の表示に使う、アプリを開いた日付（直近30日分）",
              "評価のお願いを表示するかどうかの判断に使う情報（日記の保存回数、表示した回数・日時）",
            ],
          },
          { type: "h", text: "2-2. 広告・課金に関連して外部サービスが取得する情報" },
          { type: "p", text: "無料版では広告を表示し、プレミアム（広告の非表示などの特典）を提供するため、以下の外部サービスが一部の情報を自動的に取得する場合があります（詳細は「5. 外部サービスの利用・第三者への提供」をご覧ください）。" },
          {
            type: "ul",
            items: [
              "広告の配信・表示・計測のための情報（端末の種類・OSのバージョン・IPアドレス・広告識別子・広告の表示やタップの状況など）",
              "広告に関する同意の選択状況（EEA・英国・スイスなどの対象地域）",
              "購入の管理のための情報（匿名のユーザーID・購入履歴・購読状況・端末やOSの基本情報）",
            ],
          },
          { type: "p", text: "日記の内容・写真・動画が、これらの外部サービスへ送信されることはありません。" },
          { type: "h", text: "2-3. 収集しない情報" },
          {
            type: "cross",
            items: [
              "氏名・メールアドレス・電話番号などの個人識別情報（お問い合わせ時にお送りいただく場合を除く）",
              "アカウント情報（本アプリにはアカウント登録・ログイン機能がありません）",
              "位置情報、連絡先",
              "日記の内容、日記に添付した写真・動画（外部へ送信・アップロードされません）",
              "顔・指紋などの生体認証の生データ",
              "クレジットカード等の決済情報（決済はApple社が処理します）",
              "開発者による、アプリ内の操作の分析データ",
            ],
          },
        ],
      },
      {
        title: "3. アプリが使用する権限",
        blocks: [
          { type: "p", text: "本アプリは以下の端末権限を使用します。いずれも該当する機能をお使いになるときにOSの許可ダイアログで確認し、アプリの機能を提供するためにのみ使用します。" },
          {
            type: "table",
            headers: ["権限", "使用目的"],
            rows: [
              ["フォトライブラリ", "日記に追加する写真・動画をアルバムから選択するために使用します。「使った写真を元から削除」がオンの場合は、日記に保存したあとにアルバムの元の写真を削除するためにも使用します（削除前にアプリ内の確認とOSの確認が表示され、削除した写真は「最近削除した項目」に移ります）"],
              ["カメラ", "日記に添付する写真・動画をその場で撮影するために使用します。撮影したものは端末内にのみ保存されます"],
              ["マイク", "動画を撮影するときの音声の録音に使用します"],
              ["Face ID / Touch ID", "アプリのロック解除（認証はOSが行い、生体データは本アプリに保存されません）"],
              ["広告に関する許可（トラッキング）", "広告の配信に関して、Googleの同意管理の仕組み（UMP）を通じて、OSの許可ダイアログが表示される場合があります"],
            ],
          },
          { type: "note", text: "許可しない場合でも、該当機能以外のアプリ機能は引き続きご利用いただけます。" },
        ],
      },
      {
        title: "4. 情報の利用目的",
        blocks: [
          { type: "p", text: "取り扱う情報は、以下の目的のみに使用されます。" },
          {
            type: "ul",
            items: [
              "日記・写真・動画・設定の保存および表示",
              "閲覧・統計（気分・天気・投稿数・文字数など）の表示、連続記録の表示",
              "作成中の日記の下書き保存および復元",
              "写真の圧縮、および日記に使った元の写真の削除",
              "パスコード・生体認証によるアプリのロック",
              "アプリの評価のお願いの表示",
              "広告の表示、およびプレミアムの購入・復元の処理",
              "お問い合わせへの対応",
            ],
          },
        ],
      },
      {
        title: "5. 外部サービスの利用・第三者への提供",
        blocks: [
          { type: "p", text: "本アプリは、ユーザーの情報を販売することはなく、日記の内容・写真・動画を第三者へ提供することもありません。ただし、広告の表示と課金の管理のために、以下の外部サービスを利用しています。これらのサービスによる情報の取り扱いは、各社のプライバシーポリシーに従います。" },
          {
            type: "table",
            headers: ["サービス", "利用目的・取得される可能性のある情報"],
            rows: [
              [
                "Google AdMob（Google LLC）",
                "画面下部のバナー広告、画面の途中に表示される広告、および日記の新規作成時に表示される全画面広告の配信に利用します。本アプリは非パーソナライズ広告を要求します。広告の配信・計測のため、端末情報や広告識別子などが取得される場合があります。EEA・英国・スイスのユーザーには、Googleの同意管理プラットフォーム（UMP）により同意の確認を行います。詳細：https://policies.google.com/technologies/ads",
              ],
              [
                "RevenueCat（RevenueCat, Inc.）",
                "プレミアムの購入状態の確認・復元に利用します。匿名のユーザーID・購入情報・端末の基本情報が送信されますが、日記の内容・写真・動画は送信されません。詳細：https://www.revenuecat.com/privacy",
              ],
              [
                "Apple App Store（Apple Inc.）",
                "購入時の決済処理を行います。決済情報は当方には提供されません。",
              ],
            ],
          },
          { type: "note", text: "プレミアムに登録すると、本アプリ内の広告は表示されなくなります。" },
          { type: "warn", text: "重要：本アプリにはクラウド同期・バックアップ・エクスポート機能がありません。日記・写真・動画を外部サーバーへアップロードすることはありません。" },
        ],
      },
      {
        title: "6. データの保存と削除",
        blocks: [
          {
            type: "ul",
            items: [
              "日記：ユーザーが削除するまで端末内に保持されます。日記の詳細画面、「閲覧」画面のメニュー、ホーム画面の複数選択から削除できます",
              "写真・動画：「写真ライブラリー」から選択して削除できます。日記に使われているものを削除すると、その日記からも外れます。なお、日記そのものを削除しても、添付していた写真・動画のファイルが端末内に残る場合があります。確実に削除するには、日記を削除する前に「写真ライブラリー」から削除してください",
              "下書き：日記を保存すると削除されます",
              "パスコード情報：パスコードロックを解除すると、セキュアストレージから削除されます",
              "アプリのアンインストール：端末内に保存されているすべての日記・写真・動画・設定が削除され、復元できません",
            ],
          },
          { type: "note", text: "広告配信事業者および課金管理サービスが保持する情報は、各社のポリシーに従って取り扱われます。削除をご希望の場合はお問い合わせください。" },
        ],
      },
      {
        title: "7. データのセキュリティ",
        blocks: [
          {
            type: "ul",
            items: [
              "日記・写真・動画のデータは端末内のアプリ専用領域に保存され、他のアプリからはアクセスできません",
              "パスコードはSHA-256でハッシュ化され、OSのセキュアストレージ（Keychain）に保存されます。元の数字は保存されません",
              "生体認証はOS（Secure Enclave等）が処理し、本アプリに生体データは保存されません",
              "アプリがバックグラウンドに移ると、パスコードロックが有効な場合は自動的にロックされます",
              "日記の内容・写真・動画を外部へ送信しないため、通信経路からの漏洩リスクはありません",
              "日記・写真・動画のデータに対して、アプリ独自の追加の暗号化は行っていません",
            ],
          },
          { type: "note", text: "端末自体のセキュリティ（パスコード・暗号化・iCloudバックアップの設定等）は、ユーザーご自身で管理してください。パスコードを忘れるとアプリを開けなくなり、再インストールが必要になります（その場合、端末内のデータは削除されます）。" },
        ],
      },
      {
        title: "8. お子様のプライバシー",
        blocks: [
          { type: "p", text: "本アプリは、お子様の個人情報を意図して収集することはありません。ただし、無料版では第三者の広告配信サービスを利用しています。お子様が本アプリを使用することについて保護者の方に懸念がある場合は、下記までお問い合わせください。" },
        ],
      },
      {
        title: "9. ユーザーの権利",
        blocks: [
          {
            type: "ul",
            items: [
              "端末内のデータを自由に閲覧・編集・削除する権利（アプリ内の操作で行えます）",
              "アプリをアンインストールすることですべてのデータを消去する権利",
              "広告に関する同意の選択の見直しを求める権利（対象地域のみ。ご希望の場合は下記までご連絡ください）",
              "端末のOS設定で、広告識別子の利用やカメラ・フォトライブラリなどの権限を制限・変更する権利",
              "個人情報保護法・GDPR・CCPAなど、お住まいの地域の法令に基づく権利（ご希望の場合は下記までご連絡ください）",
            ],
          },
          { type: "p", text: "本アプリはデータの販売・共有を行いません。権利の行使に関するお問い合わせは、下記の連絡先までご連絡ください。" },
        ],
      },
      {
        title: "10. Cookie・トラッキング",
        blocks: [
          { type: "p", text: "本アプリはCookie・ウェブビーコンなどのトラッキング技術を独自には使用しません。広告は非パーソナライズ広告として要求しますが、広告配信に関する情報の取得は、「5. 外部サービスの利用・第三者への提供」に記載のとおり、広告配信事業者の仕組みによって行われます。この仕組みを通じて、OSのトラッキング許可（App Tracking Transparency）のダイアログが表示される場合があります。" },
        ],
      },
      {
        title: "11. プライバシーポリシーの変更",
        blocks: [
          { type: "p", text: "本プライバシーポリシーは、法令の変更やアプリの機能追加に伴い更新される場合があります。重要な変更がある場合は、アプリのアップデートや本ページでお知らせします。変更後も本アプリを継続してご利用いただいた場合、変更後の内容に同意したものとみなします。" },
        ],
      },
      {
        title: "12. お問い合わせ",
        blocks: [
          { type: "p", text: "本プライバシーポリシーに関するご質問やお問い合わせは、以下のメールアドレスまでご連絡ください。" },
        ],
      },
      {
        title: "App Store プライバシー表示",
        blocks: [
          { type: "p", text: "Apple App Store のプライバシーラベルに対応する情報です。" },
          {
            type: "table",
            headers: ["データの種類", "取得元・目的", "ユーザーに関連付け"],
            rows: [
              ["日記・写真・動画", "端末内のみ（外部へ送信しません）", "いいえ"],
              ["購入履歴", "RevenueCat：プレミアムの管理", "いいえ（匿名ID）"],
              ["端末ID・広告データ・使用状況", "Google AdMob：広告の配信・計測", "いいえ"],
            ],
          },
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    lastUpdatedDate: "October 16, 2026",
    backToSupport: "Back to Support",
    tableOfContents: "Table of Contents",
    emailLabel: "Email",
    responseTime: "* We usually reply within 48 hours.",
    footerNote: "Supported languages: Japanese, English, Korean, Traditional Chinese",
    sections: [
      {
        title: "1. Introduction",
        blocks: [
          {
            type: "p",
            text: `${APP_NAME_EN} (the "App") is a photo diary app for recording entries with photos and videos. It offers mood, weather, and bookmark records, monthly browsing, statistics, automatic draft saving, passcode and biometric (Face ID / Touch ID) lock, and more. This Privacy Policy explains how information is handled when you use the App.`,
          },
          {
            type: "p",
            text: "By using the App, you agree to this Privacy Policy. If you do not agree, please refrain from using the App.",
          },
        ],
      },
      {
        title: "2. Information We Handle",
        blocks: [
          { type: "h", text: "2-1. Data stored only on your device" },
          { type: "p", text: "The following data is stored only in the App's dedicated area on your device and is never sent to the developer's servers or to the advertising and purchase services." },
          {
            type: "ul",
            items: [
              "Diary entries (title, body, date, mood, weather, bookmark status, and creation and update times)",
              "Photos and videos attached to entries (copied into the App's dedicated area) and thumbnail images for videos shown in lists",
              "Drafts of entries being written (when auto-save drafts is on)",
              "App settings (Light / Dark / System, theme color, and the Auto-Save Drafts, Auto Compress, and Delete used photos settings)",
              "Records of file sizes before and after photo compression (used to show the storage saved under \"Storage\")",
              "Passcode lock settings (the passcode is hashed with SHA-256 and kept in the OS secure storage (Keychain))",
              "Whether biometric unlock is on or off (face and fingerprint data are managed by the OS and are not accessible to the App)",
              "Premium purchase status (cached on the device)",
              "The number of entries created, used to decide how often a full-screen ad is shown",
              "The dates on which the App was opened (last 30 days), used to show the streak at launch",
              "Information used to decide whether to show a rating request (number of entries saved, and the number and time of requests shown)",
            ],
          },
          { type: "h", text: "2-2. Information obtained by external services for ads and purchases" },
          { type: "p", text: "To show ads and offer Premium (ad removal and other benefits) in the free version, the following external services may automatically obtain certain information (see \"5. Use of External Services and Third Parties\" for details)." },
          {
            type: "ul",
            items: [
              "Information for ad delivery, display, and measurement (device type, OS version, IP address, advertising identifier, ad impressions and taps, etc.)",
              "Your ad consent choices (in applicable regions such as the EEA, the UK, and Switzerland)",
              "Information for managing purchases (anonymous user ID, purchase history, subscription status, basic device and OS information)",
            ],
          },
          { type: "p", text: "The content of your entries, photos, and videos is never sent to these external services." },
          { type: "h", text: "2-3. Information we do not collect" },
          {
            type: "cross",
            items: [
              "Personally identifying information such as name, email address, or phone number (except what you send us when contacting support)",
              "Account information (the App has no account registration or login)",
              "Location or contacts",
              "The content of your entries and the photos and videos attached to them (they are never sent or uploaded externally)",
              "Raw biometric data such as faces or fingerprints",
              "Payment information such as credit card numbers (payments are processed by Apple)",
              "Analytics data about your in-app activity collected by the developer",
            ],
          },
        ],
      },
      {
        title: "3. Permissions Used by the App",
        blocks: [
          { type: "p", text: "The App uses the following device permissions. Each is requested through the OS permission dialog only when you use the related feature, and is used only to provide that feature." },
          {
            type: "table",
            headers: ["Permission", "Purpose"],
            rows: [
              ["Photo Library", "Used to choose photos and videos from your album to add to entries. When \"Delete used photos\" is on, it is also used to delete the original photo from your album after it is saved to an entry (an in-app confirmation and an OS confirmation are shown first, and deleted photos go to \"Recently Deleted\")"],
              ["Camera", "Used to take photos and videos to attach to entries. What you capture is stored only on your device"],
              ["Microphone", "Used to record audio when you shoot a video"],
              ["Face ID / Touch ID", "Unlocking the App (authentication is performed by the OS; biometric data is not stored by the App)"],
              ["Ad-related permission (tracking)", "Through Google's consent management mechanism (UMP), an OS permission dialog related to ad delivery may be shown"],
            ],
          },
          { type: "note", text: "Even if you do not grant a permission, the other features of the App remain available." },
        ],
      },
      {
        title: "4. How We Use Information",
        blocks: [
          { type: "p", text: "The information we handle is used only for the following purposes." },
          {
            type: "ul",
            items: [
              "Storing and displaying entries, photos, videos, and settings",
              "Showing browsing views, statistics (mood, weather, post counts, character counts, etc.), and streaks",
              "Saving and restoring drafts of entries being written",
              "Compressing photos and deleting the original photos used in entries",
              "Locking the App with a passcode or biometrics",
              "Showing a request to rate the App",
              "Showing ads, and processing Premium purchases and restores",
              "Responding to inquiries",
            ],
          },
        ],
      },
      {
        title: "5. Use of External Services and Third Parties",
        blocks: [
          { type: "p", text: "We do not sell your information and do not provide the content of your entries, photos, or videos to third parties. However, we use the following external services to show ads and manage purchases. Their handling of information is governed by their own privacy policies." },
          {
            type: "table",
            headers: ["Service", "Purpose and information that may be obtained"],
            rows: [
              [
                "Google AdMob (Google LLC)",
                "Used to deliver the banner ad at the bottom of the screen, ads shown within screens, and the full-screen ads shown when you create a new entry. The App requests non-personalized ads. Device information and advertising identifiers may be obtained for ad delivery and measurement. For users in the EEA, the UK, and Switzerland, consent is confirmed through Google's consent management platform (UMP). Details: https://policies.google.com/technologies/ads",
              ],
              [
                "RevenueCat (RevenueCat, Inc.)",
                "Used to verify and restore the Premium purchase status. An anonymous user ID, purchase information, and basic device information are sent; the content of your entries, photos, and videos is not. Details: https://www.revenuecat.com/privacy",
              ],
              [
                "Apple App Store (Apple Inc.)",
                "Processes payments for purchases. Payment details are not provided to us.",
              ],
            ],
          },
          { type: "note", text: "Once you subscribe to Premium, ads are no longer shown in the App." },
          { type: "warn", text: "Important: The App has no cloud sync, backup, or export feature. Your entries, photos, and videos are never uploaded to an external server." },
        ],
      },
      {
        title: "6. Data Retention and Deletion",
        blocks: [
          {
            type: "ul",
            items: [
              "Entries: kept on your device until you delete them. You can delete them from the entry detail screen, the menu on the Browse screen, or by multi-select on the Home screen",
              "Photos and videos: you can select and delete them in \"Photo Library\". Deleting one used in an entry also removes it from that entry. Note that deleting an entry itself may leave its attached photo and video files on your device. To delete them reliably, delete them from \"Photo Library\" before deleting the entry",
              "Drafts: removed when you save the entry",
              "Passcode data: removed from secure storage when you turn off the passcode lock",
              "Uninstalling the App: deletes all entries, photos, videos, and settings stored on your device, and they cannot be restored",
            ],
          },
          { type: "note", text: "Information held by the ad provider and the purchase-management service is handled under their policies. Contact us if you wish to request deletion." },
        ],
      },
      {
        title: "7. Data Security",
        blocks: [
          {
            type: "ul",
            items: [
              "Entry, photo, and video data is stored in the App's dedicated area on your device and cannot be accessed from other apps",
              "The passcode is hashed with SHA-256 and stored in the OS secure storage (Keychain). The original digits are not stored",
              "Biometrics are processed by the OS (Secure Enclave, etc.); no biometric data is stored by the App",
              "When the App moves to the background, it locks automatically if the passcode lock is on",
              "The content of your entries, photos, and videos is not transmitted, so there is no risk of it leaking in transit",
              "The App does not apply additional encryption of its own to entry, photo, and video data",
            ],
          },
          { type: "note", text: "Please manage the security of your device itself (passcode, encryption, iCloud backup settings, etc.) yourself. If you forget your passcode, you will not be able to open the App and will need to reinstall it (which deletes the data on your device)." },
        ],
      },
      {
        title: "8. Children's Privacy",
        blocks: [
          { type: "p", text: "The App does not intentionally collect personal information from children. However, the free version uses third-party ad services. If you are a parent or guardian and have concerns about a child using the App, please contact us below." },
        ],
      },
      {
        title: "9. Your Rights",
        blocks: [
          {
            type: "ul",
            items: [
              "The right to view, edit, and delete the data on your device (available within the App)",
              "The right to erase all data by uninstalling the App",
              "The right to ask to review your ad consent choice (applicable regions only; please contact us below)",
              "The right to limit or change advertising identifier use and permissions such as the camera and photo library in your device's OS settings",
              "Rights under the laws of your region, such as Japan's APPI, GDPR, and CCPA (contact us below to exercise them)",
            ],
          },
          { type: "p", text: "The App does not sell or share your data. For questions about exercising your rights, please contact us below." },
        ],
      },
      {
        title: "10. Cookies and Tracking",
        blocks: [
          { type: "p", text: "The App does not itself use cookies, web beacons, or similar tracking technologies. Ads are requested as non-personalized ads, but information related to ad delivery is obtained by the ad provider's mechanisms, as described in \"5. Use of External Services and Third Parties.\" Through this mechanism, the OS tracking permission dialog (App Tracking Transparency) may be shown." },
        ],
      },
      {
        title: "11. Changes to This Policy",
        blocks: [
          { type: "p", text: "This Privacy Policy may be updated due to legal changes or new features. We will notify you of important changes through an app update or this page. Continued use of the App after changes means you agree to the revised policy." },
        ],
      },
      {
        title: "12. Contact",
        blocks: [
          { type: "p", text: "For questions about this Privacy Policy, please contact us at the email address below." },
        ],
      },
      {
        title: "App Store Privacy Information",
        blocks: [
          { type: "p", text: "This information corresponds to the Apple App Store privacy label." },
          {
            type: "table",
            headers: ["Data type", "Source / purpose", "Linked to user"],
            rows: [
              ["Entries, photos, and videos", "On device only (never sent externally)", "No"],
              ["Purchase history", "RevenueCat: managing Premium", "No (anonymous ID)"],
              ["Device ID, ad data, usage", "Google AdMob: ad delivery and measurement", "No"],
            ],
          },
        ],
      },
    ],
  },
  ko: {
    title: "개인정보 처리방침",
    lastUpdated: "최종 업데이트",
    lastUpdatedDate: "2026년 10월 16일",
    backToSupport: "지원 페이지로 돌아가기",
    tableOfContents: "목차",
    emailLabel: "이메일",
    responseTime: "※ 보통 48시간 이내에 답변드립니다.",
    footerNote: "지원 언어: 일본어・영어・한국어・번체 중국어",
    sections: [
      {
        title: "1. 소개",
        blocks: [
          {
            type: "p",
            text: `${APP_NAME_EN}(이하 '본 앱')은 사진과 동영상을 곁들여 일기를 기록하는 포토 다이어리 앱입니다. 기분・날씨・북마크 기록, 월별 열람, 통계 표시, 임시 저장 자동 저장, 패스코드・생체 인증(Face ID・Touch ID) 잠금 등의 기능을 제공합니다. 본 개인정보 처리방침은 본 앱을 이용할 때의 정보 처리 방법을 설명합니다.`,
          },
          {
            type: "p",
            text: "본 앱을 이용하심으로써 본 개인정보 처리방침에 동의한 것으로 간주합니다. 동의하지 않으시는 경우 본 앱의 이용을 삼가 주세요.",
          },
        ],
      },
      {
        title: "2. 처리하는 정보",
        blocks: [
          { type: "h", text: "2-1. 기기 내에만 저장되는 데이터" },
          { type: "p", text: "다음 데이터는 사용 중인 기기 내 앱 전용 영역에만 저장되며, 개발자의 서버나 광고・결제 서비스로 전송되지 않습니다." },
          {
            type: "ul",
            items: [
              "일기 내용(제목・본문・날짜・기분・날씨・북마크 여부・작성 일시・수정 일시)",
              "일기에 첨부한 사진・동영상(앱 전용 영역에 복사되어 저장됩니다)과 목록 표시용 동영상 썸네일 이미지",
              "작성 중인 일기의 임시 저장 내용(자동 임시 저장이 켜져 있는 경우)",
              "앱 설정(라이트/다크/시스템 구분, 테마 색상, 자동 임시 저장・자동 압축・사용한 사진을 원본에서 삭제 각 설정)",
              "사진을 압축했을 때의 압축 전후 파일 크기 기록(「스토리지」의 절약 용량 표시에 사용)",
              "패스코드 잠금 설정(패스코드는 SHA-256으로 해시화되어 OS의 보안 저장소(Keychain)에 저장됩니다)",
              "생체 인증 사용 여부 설정(얼굴・지문 데이터 자체는 OS가 관리하며 앱은 접근할 수 없습니다)",
              "프리미엄 구매 상태(기기 내 캐시)",
              "전체 화면 광고를 표시하는 빈도를 판단하는 데 사용하는 일기 신규 작성 횟수",
              "실행 시 연속 기록 표시에 사용하는 앱을 연 날짜(최근 30일분)",
              "평가 요청 표시 여부를 판단하는 데 사용하는 정보(일기 저장 횟수, 표시한 횟수・일시)",
            ],
          },
          { type: "h", text: "2-2. 광고・결제와 관련하여 외부 서비스가 수집하는 정보" },
          { type: "p", text: "무료 버전에서는 광고를 표시하고 프리미엄(광고 제거 등의 혜택)을 제공하기 위해 다음 외부 서비스가 일부 정보를 자동으로 수집할 수 있습니다(자세한 내용은 「5. 외부 서비스 이용 및 제3자 제공」 참조)." },
          {
            type: "ul",
            items: [
              "광고 제공・표시・측정을 위한 정보(기기 종류・OS 버전・IP 주소・광고 식별자・광고 표시 및 탭 상황 등)",
              "광고에 관한 동의 선택 상태(EEA・영국・스위스 등 해당 지역)",
              "구매 관리를 위한 정보(익명 사용자 ID・구매 내역・구독 상태・기기 및 OS 기본 정보)",
            ],
          },
          { type: "p", text: "일기 내용・사진・동영상은 이들 외부 서비스로 전송되지 않습니다." },
          { type: "h", text: "2-3. 수집하지 않는 정보" },
          {
            type: "cross",
            items: [
              "이름・이메일 주소・전화번호 등 개인 식별 정보(문의 시 직접 보내주신 경우 제외)",
              "계정 정보(본 앱에는 회원 가입・로그인 기능이 없습니다)",
              "위치 정보, 연락처",
              "일기 내용, 일기에 첨부한 사진・동영상(외부로 전송・업로드되지 않습니다)",
              "얼굴・지문 등 생체 인증 원본 데이터",
              "신용카드 등 결제 정보(결제는 Apple이 처리합니다)",
              "개발자에 의한 앱 내 조작 분석 데이터",
            ],
          },
        ],
      },
      {
        title: "3. 앱이 사용하는 권한",
        blocks: [
          { type: "p", text: "본 앱은 다음 기기 권한을 사용합니다. 모두 해당 기능을 사용할 때 OS의 허용 대화상자로 확인하며, 앱 기능을 제공하는 목적으로만 사용합니다." },
          {
            type: "table",
            headers: ["권한", "사용 목적"],
            rows: [
              ["사진 라이브러리", "일기에 추가할 사진・동영상을 앨범에서 선택하기 위해 사용합니다. 「사용한 사진을 원본에서 삭제」가 켜져 있는 경우, 일기에 저장한 후 앨범의 원본 사진을 삭제하는 데에도 사용합니다(삭제 전에 앱 내 확인과 OS 확인이 표시되며, 삭제한 사진은 「최근 삭제된 항목」으로 이동합니다)"],
              ["카메라", "일기에 첨부할 사진・동영상을 바로 촬영하기 위해 사용합니다. 촬영한 항목은 기기 내에만 저장됩니다"],
              ["마이크", "동영상 촬영 시 음성 녹음에 사용합니다"],
              ["Face ID / Touch ID", "앱 잠금 해제(인증은 OS가 수행하며 생체 데이터는 앱에 저장되지 않습니다)"],
              ["광고 관련 권한(트래킹)", "광고 제공과 관련하여 Google의 동의 관리 방식(UMP)을 통해 OS의 허용 대화상자가 표시될 수 있습니다"],
            ],
          },
          { type: "note", text: "권한을 허용하지 않아도 해당 기능 외의 앱 기능은 계속 이용하실 수 있습니다." },
        ],
      },
      {
        title: "4. 정보의 이용 목적",
        blocks: [
          { type: "p", text: "처리하는 정보는 다음 목적으로만 사용됩니다." },
          {
            type: "ul",
            items: [
              "일기・사진・동영상・설정의 저장 및 표시",
              "열람・통계(기분・날씨・게시 수・글자 수 등) 표시, 연속 기록 표시",
              "작성 중인 일기의 임시 저장 및 복원",
              "사진 압축 및 일기에 사용한 원본 사진 삭제",
              "패스코드・생체 인증을 통한 앱 잠금",
              "앱 평가 요청 표시",
              "광고 표시 및 프리미엄 구매・복원 처리",
              "문의 대응",
            ],
          },
        ],
      },
      {
        title: "5. 외부 서비스 이용 및 제3자 제공",
        blocks: [
          { type: "p", text: "본 앱은 사용자의 정보를 판매하지 않으며 일기 내용・사진・동영상을 제3자에게 제공하지 않습니다. 다만 광고 표시와 결제 관리를 위해 다음 외부 서비스를 이용하고 있습니다. 이들 서비스의 정보 처리는 각 회사의 개인정보 처리방침에 따릅니다." },
          {
            type: "table",
            headers: ["서비스", "이용 목적・수집될 수 있는 정보"],
            rows: [
              [
                "Google AdMob (Google LLC)",
                "화면 하단의 배너 광고, 화면 중간에 표시되는 광고, 일기를 새로 작성할 때 표시되는 전체 화면 광고의 제공에 이용합니다. 본 앱은 비맞춤 광고를 요청합니다. 광고 제공・측정을 위해 기기 정보나 광고 식별자 등이 수집될 수 있습니다. EEA・영국・스위스 사용자에게는 Google의 동의 관리 플랫폼(UMP)으로 동의를 확인합니다. 자세한 내용: https://policies.google.com/technologies/ads",
              ],
              [
                "RevenueCat (RevenueCat, Inc.)",
                "프리미엄 구매 상태의 확인・복원에 이용합니다. 익명 사용자 ID・구매 정보・기기 기본 정보가 전송되지만 일기 내용・사진・동영상은 전송되지 않습니다. 자세한 내용: https://www.revenuecat.com/privacy",
              ],
              [
                "Apple App Store (Apple Inc.)",
                "구매 시 결제를 처리합니다. 결제 정보는 개발자에게 제공되지 않습니다.",
              ],
            ],
          },
          { type: "note", text: "프리미엄에 가입하면 앱 내 광고가 표시되지 않습니다." },
          { type: "warn", text: "중요: 본 앱에는 클라우드 동기화・백업・내보내기 기능이 없습니다. 일기・사진・동영상을 외부 서버로 업로드하지 않습니다." },
        ],
      },
      {
        title: "6. 데이터 보관 및 삭제",
        blocks: [
          {
            type: "ul",
            items: [
              "일기: 사용자가 삭제할 때까지 기기 내에 보관됩니다. 일기 상세 화면, 「열람」 화면의 메뉴, 홈 화면의 다중 선택에서 삭제할 수 있습니다",
              "사진・동영상: 「사진 라이브러리」에서 선택하여 삭제할 수 있습니다. 일기에 사용 중인 항목을 삭제하면 해당 일기에서도 제거됩니다. 또한 일기 자체를 삭제해도 첨부했던 사진・동영상 파일이 기기 내에 남을 수 있습니다. 확실하게 삭제하려면 일기를 삭제하기 전에 「사진 라이브러리」에서 삭제해 주세요",
              "임시 저장: 일기를 저장하면 삭제됩니다",
              "패스코드 정보: 패스코드 잠금을 해제하면 보안 저장소에서 삭제됩니다",
              "앱 삭제: 기기에 저장된 모든 일기・사진・동영상・설정이 삭제되며 복원할 수 없습니다",
            ],
          },
          { type: "note", text: "광고 제공업체 및 결제 관리 서비스가 보관하는 정보는 각 회사의 정책에 따라 처리됩니다. 삭제를 원하시면 문의해 주세요." },
        ],
      },
      {
        title: "7. 데이터 보안",
        blocks: [
          {
            type: "ul",
            items: [
              "일기・사진・동영상 데이터는 기기 내 앱 전용 영역에 저장되며 다른 앱에서 접근할 수 없습니다",
              "패스코드는 SHA-256으로 해시화되어 OS 보안 저장소(Keychain)에 저장됩니다. 원래 숫자는 저장되지 않습니다",
              "생체 인증은 OS(Secure Enclave 등)가 처리하며 앱에는 생체 데이터가 저장되지 않습니다",
              "앱이 백그라운드로 전환되면 패스코드 잠금이 켜져 있는 경우 자동으로 잠깁니다",
              "일기 내용・사진・동영상을 외부로 전송하지 않으므로 통신 경로를 통한 유출 위험이 없습니다",
              "일기・사진・동영상 데이터에 대해 앱 자체의 추가 암호화는 하지 않습니다",
            ],
          },
          { type: "note", text: "기기 자체의 보안(패스코드・암호화・iCloud 백업 설정 등)은 사용자가 직접 관리해 주세요. 패스코드를 잊어버리면 앱을 열 수 없게 되어 재설치가 필요합니다(이 경우 기기 내 데이터가 삭제됩니다)." },
        ],
      },
      {
        title: "8. 어린이의 개인정보",
        blocks: [
          { type: "p", text: "본 앱은 어린이의 개인정보를 의도적으로 수집하지 않습니다. 다만 무료 버전에서는 제3자 광고 서비스를 이용합니다. 어린이의 앱 사용에 대해 보호자께서 우려하시는 경우 아래로 문의해 주세요." },
        ],
      },
      {
        title: "9. 사용자의 권리",
        blocks: [
          {
            type: "ul",
            items: [
              "기기 내 데이터를 자유롭게 열람・편집・삭제할 권리(앱 내 조작으로 가능합니다)",
              "앱을 삭제하여 모든 데이터를 지울 권리",
              "광고에 관한 동의 선택의 재검토를 요청할 권리(해당 지역만, 원하시면 아래로 연락해 주세요)",
              "기기의 OS 설정에서 광고 식별자 이용 및 카메라・사진 라이브러리 등의 권한을 제한・변경할 권리",
              "일본 개인정보보호법, GDPR, CCPA 등 거주 지역의 법령에 따른 권리(행사를 원하시면 아래로 연락해 주세요)",
            ],
          },
          { type: "p", text: "본 앱은 데이터를 판매하거나 공유하지 않습니다. 권리 행사에 관한 문의는 아래 연락처로 보내 주세요." },
        ],
      },
      {
        title: "10. 쿠키・트래킹",
        blocks: [
          { type: "p", text: "본 앱은 쿠키・웹 비콘 등의 트래킹 기술을 자체적으로 사용하지 않습니다. 광고는 비맞춤 광고로 요청하지만, 광고 제공과 관련된 정보 수집은 「5. 외부 서비스 이용 및 제3자 제공」에 기재된 대로 광고 제공업체의 방식으로 이루어집니다. 이 방식을 통해 OS의 트래킹 허용(App Tracking Transparency) 대화상자가 표시될 수 있습니다." },
        ],
      },
      {
        title: "11. 개인정보 처리방침의 변경",
        blocks: [
          { type: "p", text: "본 개인정보 처리방침은 법령 변경이나 앱 기능 추가에 따라 업데이트될 수 있습니다. 중요한 변경이 있을 경우 앱 업데이트 또는 본 페이지를 통해 알려드립니다. 변경 후에도 본 앱을 계속 이용하시면 변경된 내용에 동의한 것으로 간주합니다." },
        ],
      },
      {
        title: "12. 문의",
        blocks: [
          { type: "p", text: "본 개인정보 처리방침에 관한 질문이나 문의는 아래 이메일 주소로 연락해 주세요." },
        ],
      },
      {
        title: "App Store 개인정보 표시",
        blocks: [
          { type: "p", text: "Apple App Store의 개인정보 라벨에 해당하는 정보입니다." },
          {
            type: "table",
            headers: ["데이터 유형", "수집처・목적", "사용자와 연결"],
            rows: [
              ["일기・사진・동영상", "기기 내에서만(외부로 전송하지 않음)", "아니요"],
              ["구매 내역", "RevenueCat: 프리미엄 관리", "아니요(익명 ID)"],
              ["기기 ID・광고 데이터・사용 현황", "Google AdMob: 광고 제공・측정", "아니요"],
            ],
          },
        ],
      },
    ],
  },
  "zh-TW": {
    title: "隱私權政策",
    lastUpdated: "最後更新日期",
    lastUpdatedDate: "2026年10月16日",
    backToSupport: "返回支援頁面",
    tableOfContents: "目錄",
    emailLabel: "電子郵件",
    responseTime: "※ 通常會在 48 小時內回覆。",
    footerNote: "支援語言：日語・英語・韓語・繁體中文",
    sections: [
      {
        title: "1. 簡介",
        blocks: [
          {
            type: "p",
            text: `${APP_NAME_EN}（以下簡稱「本應用程式」）是一款可搭配照片與影片記錄日記的相片日記應用程式。提供心情、天氣與書籤的記錄、依月份瀏覽、統計顯示、草稿自動儲存，以及密碼與生物辨識（Face ID・Touch ID）鎖定等功能。本隱私權政策說明您使用本應用程式時的資訊處理方式。`,
          },
          {
            type: "p",
            text: "使用本應用程式即視為您同意本隱私權政策。若您不同意，請勿使用本應用程式。",
          },
        ],
      },
      {
        title: "2. 處理的資訊",
        blocks: [
          { type: "h", text: "2-1. 僅儲存於裝置內的資料" },
          { type: "p", text: "以下資料僅儲存於您裝置內的應用程式專用區域，不會傳送至開發者的伺服器或廣告、付款服務。" },
          {
            type: "ul",
            items: [
              "日記內容（標題、內文、日期、心情、天氣、是否加入書籤、建立與更新時間）",
              "附加於日記的照片與影片（會複製並儲存於應用程式專用區域），以及清單顯示用的影片縮圖",
              "撰寫中日記的草稿（啟用草稿自動儲存時）",
              "應用程式設定（淺色／深色／系統的選擇、主題顏色，以及草稿自動儲存、自動壓縮、刪除已使用的原始照片各項設定）",
              "壓縮照片時壓縮前後的檔案大小紀錄（用於在「儲存空間」顯示節省的容量）",
              "密碼鎖定設定（密碼以 SHA-256 雜湊後儲存於作業系統的安全儲存空間（Keychain））",
              "生物辨識的啟用/停用設定（臉部與指紋資料本身由作業系統管理，應用程式無法存取）",
              "進階版（Premium）的購買狀態（裝置內的快取）",
              "用於判斷全螢幕廣告顯示頻率的日記新增次數",
              "用於啟動時顯示連續紀錄的開啟應用程式日期（最近 30 天）",
              "用於判斷是否顯示評分請求的資訊（日記的儲存次數、已顯示的次數與時間）",
            ],
          },
          { type: "h", text: "2-2. 與廣告、付款相關而由外部服務取得的資訊" },
          { type: "p", text: "免費版為了顯示廣告並提供進階版（移除廣告等權益），以下外部服務可能會自動取得部分資訊（詳見「5. 外部服務的使用與第三方提供」）。" },
          {
            type: "ul",
            items: [
              "用於廣告投放、顯示與衡量的資訊（裝置類型、作業系統版本、IP 位址、廣告識別碼、廣告顯示與點擊情況等）",
              "廣告同意的選擇狀態（EEA、英國、瑞士等適用地區）",
              "用於管理購買的資訊（匿名使用者 ID、購買紀錄、訂閱狀態、裝置與作業系統基本資訊）",
            ],
          },
          { type: "p", text: "日記內容、照片與影片不會傳送至這些外部服務。" },
          { type: "h", text: "2-3. 不收集的資訊" },
          {
            type: "cross",
            items: [
              "姓名、電子郵件地址、電話號碼等個人識別資訊（您聯繫支援時主動提供者除外）",
              "帳號資訊（本應用程式沒有帳號註冊與登入功能）",
              "位置資訊、聯絡人",
              "日記內容，以及附加於日記的照片與影片（不會傳送或上傳至外部）",
              "臉部、指紋等生物辨識原始資料",
              "信用卡等付款資訊（付款由 Apple 處理）",
              "開發者針對應用程式內操作所做的分析資料",
            ],
          },
        ],
      },
      {
        title: "3. 應用程式使用的權限",
        blocks: [
          { type: "p", text: "本應用程式使用以下裝置權限。皆於您使用相關功能時透過作業系統的授權對話框確認，且僅用於提供該功能。" },
          {
            type: "table",
            headers: ["權限", "使用目的"],
            rows: [
              ["照片資料庫", "用於從相簿選取要加入日記的照片與影片。啟用「刪除已使用的原始照片」時，也用於在儲存至日記後刪除相簿中的原始照片（刪除前會顯示應用程式內的確認與作業系統的確認，已刪除的照片會移至「最近刪除」）"],
              ["相機", "用於當場拍攝要附加於日記的照片與影片。拍攝的內容僅儲存於裝置內"],
              ["麥克風", "用於拍攝影片時錄製聲音"],
              ["Face ID / Touch ID", "解除應用程式鎖定（驗證由作業系統執行，生物辨識資料不會儲存於本應用程式）"],
              ["廣告相關權限（追蹤）", "與廣告投放相關，可能會透過 Google 的同意管理機制（UMP）顯示作業系統的授權對話框"],
            ],
          },
          { type: "note", text: "即使不授予權限，您仍可使用相關功能以外的應用程式功能。" },
        ],
      },
      {
        title: "4. 資訊的使用目的",
        blocks: [
          { type: "p", text: "所處理的資訊僅用於以下目的。" },
          {
            type: "ul",
            items: [
              "儲存與顯示日記、照片、影片及設定",
              "顯示瀏覽畫面、統計（心情、天氣、發文數、字數等）與連續紀錄",
              "儲存與還原撰寫中日記的草稿",
              "壓縮照片，以及刪除已用於日記的原始照片",
              "透過密碼、生物辨識鎖定應用程式",
              "顯示應用程式評分請求",
              "顯示廣告，以及處理進階版的購買與還原",
              "回覆諮詢",
            ],
          },
        ],
      },
      {
        title: "5. 外部服務的使用與第三方提供",
        blocks: [
          { type: "p", text: "本應用程式不會販售您的資訊，也不會將日記內容、照片與影片提供給第三方。但為了顯示廣告與管理付款，我們使用以下外部服務。這些服務對資訊的處理遵循各公司的隱私權政策。" },
          {
            type: "table",
            headers: ["服務", "使用目的・可能取得的資訊"],
            rows: [
              [
                "Google AdMob (Google LLC)",
                "用於投放畫面下方的橫幅廣告、顯示於畫面中間的廣告，以及新增日記時顯示的全螢幕廣告。本應用程式請求非個人化廣告。為廣告投放與衡量，可能取得裝置資訊與廣告識別碼等。對於 EEA、英國及瑞士的使用者，會透過 Google 的同意管理平台（UMP）確認同意。詳情：https://policies.google.com/technologies/ads",
              ],
              [
                "RevenueCat (RevenueCat, Inc.)",
                "用於確認與還原進階版的購買狀態。會傳送匿名使用者 ID、購買資訊與裝置基本資訊，但不會傳送日記內容、照片與影片。詳情：https://www.revenuecat.com/privacy",
              ],
              [
                "Apple App Store (Apple Inc.)",
                "處理購買時的付款。付款資訊不會提供給開發者。",
              ],
            ],
          },
          { type: "note", text: "訂閱進階版後，本應用程式內將不再顯示廣告。" },
          { type: "warn", text: "重要：本應用程式沒有雲端同步、備份與匯出功能，不會將日記、照片與影片上傳至外部伺服器。" },
        ],
      },
      {
        title: "6. 資料的保存與刪除",
        blocks: [
          {
            type: "ul",
            items: [
              "日記：在您刪除之前保存於裝置內。可從日記詳細畫面、「瀏覽」畫面的選單，或首頁的多選功能刪除",
              "照片與影片：可在「照片資料庫」中選取並刪除。刪除已用於日記的項目時，也會從該日記中移除。此外，即使刪除日記本身，其附加的照片與影片檔案仍可能留在裝置內。若要確實刪除，請先在「照片資料庫」中刪除，再刪除日記",
              "草稿：儲存日記後即會刪除",
              "密碼資訊：停用密碼鎖定時，會從安全儲存空間中刪除",
              "解除安裝應用程式：裝置內儲存的所有日記、照片、影片與設定都會被刪除，且無法還原",
            ],
          },
          { type: "note", text: "廣告供應商與付款管理服務所保存的資訊，依各公司的政策處理。如需刪除，請與我們聯繫。" },
        ],
      },
      {
        title: "7. 資料安全",
        blocks: [
          {
            type: "ul",
            items: [
              "日記、照片與影片資料儲存於裝置內的應用程式專用區域，無法從其他應用程式存取",
              "密碼以 SHA-256 雜湊後儲存於作業系統的安全儲存空間（Keychain），不會儲存原始數字",
              "生物辨識由作業系統（Secure Enclave 等）處理，應用程式不會儲存生物辨識資料",
              "應用程式進入背景時，若已啟用密碼鎖定，會自動上鎖",
              "日記內容、照片與影片不會對外傳送，因此沒有傳輸途中外洩的風險",
              "應用程式未對日記、照片與影片資料進行額外的自有加密",
            ],
          },
          { type: "note", text: "裝置本身的安全性（密碼、加密、iCloud 備份設定等）請由使用者自行管理。忘記密碼將無法開啟應用程式，需重新安裝（此時裝置內的資料會被刪除）。" },
        ],
      },
      {
        title: "8. 兒童隱私",
        blocks: [
          { type: "p", text: "本應用程式不會刻意收集兒童的個人資訊。但免費版使用第三方廣告服務。若您作為家長或監護人對兒童使用本應用程式有所疑慮，請透過下方方式與我們聯繫。" },
        ],
      },
      {
        title: "9. 使用者的權利",
        blocks: [
          {
            type: "ul",
            items: [
              "自由檢視、編輯及刪除裝置內資料的權利（可於應用程式內操作）",
              "透過解除安裝應用程式清除所有資料的權利",
              "要求重新檢視廣告同意選擇的權利（僅限適用地區，如有需要請於下方聯繫我們）",
              "於裝置的作業系統設定中限制或變更廣告識別碼使用及相機、照片資料庫等權限的權利",
              "依日本個人資訊保護法、GDPR、CCPA 等您所在地區法令享有的權利（如需行使請於下方聯繫我們）",
            ],
          },
          { type: "p", text: "本應用程式不會販售或共享您的資料。有關行使權利的諮詢，請透過下方聯絡方式與我們聯繫。" },
        ],
      },
      {
        title: "10. Cookie 與追蹤",
        blocks: [
          { type: "p", text: "本應用程式本身不使用 Cookie、網頁信標等追蹤技術。廣告雖以非個人化廣告方式請求，但與廣告投放相關的資訊取得，如「5. 外部服務的使用與第三方提供」所述，由廣告供應商的機制進行。透過此機制，可能會顯示作業系統的追蹤授權（App Tracking Transparency）對話框。" },
        ],
      },
      {
        title: "11. 隱私權政策的變更",
        blocks: [
          { type: "p", text: "本隱私權政策可能因法令變更或新增功能而更新。如有重大變更，將透過應用程式更新或本頁面通知您。變更後您繼續使用本應用程式，即視為同意變更後的內容。" },
        ],
      },
      {
        title: "12. 聯絡我們",
        blocks: [
          { type: "p", text: "如對本隱私權政策有任何疑問或意見，請透過以下電子郵件地址與我們聯繫。" },
        ],
      },
      {
        title: "App Store 隱私權資訊",
        blocks: [
          { type: "p", text: "此為對應 Apple App Store 隱私權標籤的資訊。" },
          {
            type: "table",
            headers: ["資料類型", "來源・目的", "與使用者建立關聯"],
            rows: [
              ["日記、照片與影片", "僅限裝置內（不會對外傳送）", "否"],
              ["購買紀錄", "RevenueCat：管理進階版", "否（匿名 ID）"],
              ["裝置 ID・廣告資料・使用情況", "Google AdMob：廣告投放與衡量", "否"],
            ],
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
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CrossList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-red-500 mt-1 flex-shrink-0">✕</span>
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
    case "note":
      return <p className="text-gray-600 text-sm">{block.text}</p>;
    case "warn":
      return (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm font-medium">{block.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {block.headers.map((header, i) => (
                  <th key={i} className="text-left p-3 font-semibold text-gray-700 border border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-3 text-gray-700 border border-gray-200 break-words ${j === 0 ? "font-medium" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
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
export default function DairygramPrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = CONTENT[lang];
  const currentYear = new Date().getFullYear();
  const contactIndex = 11; // 「お問い合わせ」セクション（連絡先ボタンを追加表示する）

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
            href="/support/dairygram"
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
              {t.sections.slice(0, contactIndex + 1).map((section, index) => (
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {SUPPORT_EMAIL}
                  </a>
                  <p className="text-sm text-gray-500">{t.responseTime}</p>
                </>
              )}
              {index === t.sections.length - 1 && (
                <p className="text-xs text-gray-400 mt-2 italic">{t.footerNote}</p>
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
