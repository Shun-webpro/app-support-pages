"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/Pixvault.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年3月21日";
const LAST_UPDATED_EN = "March 21, 2026";
const LAST_UPDATED_KO = "2026년 3월 21일";
const LAST_UPDATED_ZH_TW = "2026年3月21日";

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
// 翻訳データ
// ========================================
const TRANSLATIONS: Record<Language, {
  title: string;
  lastUpdated: string;
  lastUpdatedDate: string;
  backToSupport: string;
  tableOfContents: string;
  userRightsIntro: {
    japan: string;
    gdpr: string;
    ccpa: string;
  };
  sections: {
    intro: {
      title: string;
      content: string;
      consent: string;
    };
    dataCollection: {
      title: string;
      localData: {
        title: string;
        photos: {
          title: string;
          items: string[];
        };
        folders: {
          title: string;
          items: string[];
        };
        settings: {
          title: string;
          items: string[];
        };
      };
      notCollected: {
        title: string;
        intro: string;
        items: string[];
      };
    };
    permissions: {
      title: string;
      intro: string;
      items: { name: string; purpose: string }[];
      note: string;
    };
    purpose: {
      title: string;
      intro: string;
      tableHeaders: [string, string];
      rows: [string, string][];
    };
    thirdParty: {
      title: string;
      content: string;
      important: string;
    };
    retention: {
      title: string;
      local: {
        title: string;
        intro: string;
        items: string[];
        deletion: string;
      };
      server: {
        title: string;
        content: string;
      };
    };
    security: {
      title: string;
      items: string[];
      disclaimer: string;
    };
    children: {
      title: string;
      content: string;
      action: string;
    };
    userRights: {
      title: string;
      japan: {
        title: string;
        items: string[];
      };
      gdpr: {
        title: string;
        items: string[];
      };
      ccpa: {
        title: string;
        items: string[];
      };
      howTo: {
        title: string;
        content: string;
      };
    };
    cookies: {
      title: string;
      content: string;
    };
    changes: {
      title: string;
      content: string;
      consent: string;
    };
    contact: {
      title: string;
      content: string;
      email: string;
      responseTime: string;
    };
    appStoreLabel: {
      title: string;
      description: string;
      tableHeaders: [string, string, string, string];
      rows: [string, string, string, string][];
      trackingNote: string;
      languageNote: string;
    };
  };
}> = {
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日",
    lastUpdatedDate: LAST_UPDATED_JA,
    backToSupport: "サポートページに戻る",
    tableOfContents: "目次",
    userRightsIntro: {
      japan: "個人情報保護法に基づき、以下の権利を有します：",
      gdpr: "GDPR に基づき、以下の権利を有します：",
      ccpa: "CCPA に基づき、以下の権利を有します：",
    },
    sections: {
      intro: {
        title: "1. はじめに",
        content: "KeyAlbum（以下「本アプリ」）は、写真・動画をデバイス内に安全に保存・管理するためのアプリです。本アプリはPINや生体認証（Face ID・指紋認証）によるロック機能、写真エディター、カメラ撮影機能を備えています。本プライバシーポリシーは、本アプリをご利用いただく際のデータの取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに記載された内容に同意したものとみなします。同意いただけない場合は、本アプリのご利用をお控えください。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        localData: {
          title: "2-1. 端末内にのみ保存されるデータ",
          photos: {
            title: "(a) 写真・動画データ",
            items: [
              "ユーザーがインポート、撮影、または編集した写真・動画",
              "自動生成されるサムネイル画像（300×300ピクセル）",
              "写真のメタデータ（幅・高さ・ファイルサイズ・作成日時）",
              "動画のメタデータ（再生時間・ファイルサイズ）",
              "写真エディターで作成した編集済み画像（テキスト・スタンプ・フィルター等の適用結果）",
              "すべてのデータはアプリ専用フォルダに保存され、外部には送信されません",
            ],
          },
          folders: {
            title: "(b) フォルダ情報",
            items: [
              "ユーザーが作成したフォルダ名・フォルダID",
              "フォルダのカバー写真設定",
              "フォルダおよび写真の並び順情報",
              "フォルダ内の写真・動画の管理情報（metadata.json）",
            ],
          },
          settings: {
            title: "(c) アプリ設定・認証情報",
            items: [
              "テーマカラー設定",
              "インポート時の元データ削除設定",
              "PINロック設定（PINはSHA-256ハッシュ化され、OSのセキュアストレージに保存）",
              "生体認証（Face ID・指紋認証）の有効/無効設定（認証データ自体はOSが管理し、アプリからはアクセスできません）",
            ],
          },
        },
        notCollected: {
          title: "2-2. 収集しない情報",
          intro: "本アプリは以下の情報を一切収集しません：",
          items: [
            "氏名・メールアドレス・住所等の個人識別情報（アカウント登録不要）",
            "位置情報",
            "連絡先",
            "健康・フィットネスデータ",
            "広告目的のトラッキングデータ",
            "利用状況のアナリティクスデータ",
            "生体認証の生データ（顔・指紋のデータ自体）",
          ],
        },
      },
      permissions: {
        title: "3. アプリが使用する権限",
        intro: "本アプリは以下の端末権限を使用します。すべての権限はアプリの機能を提供するためにのみ使用され、データの外部送信には使用されません。",
        items: [
          { name: "フォトライブラリ", purpose: "写真・動画のインポートおよびエクスポート、インポート後の元データ削除" },
          { name: "カメラ", purpose: "アプリ内での写真・動画の撮影" },
          { name: "マイク", purpose: "動画撮影時の音声録音" },
          { name: "Face ID / 指紋認証", purpose: "アプリのロック解除（生体認証データはOSが管理し、アプリには保存されません）" },
        ],
        note: "すべての権限はOSの許可ダイアログを通じてユーザーに確認されます。許可しない場合でも、該当機能以外のアプリ機能は正常にご利用いただけます。",
      },
      purpose: {
        title: "4. 情報の利用目的",
        intro: "端末内に保存されるデータは、以下の目的でのみ使用されます：",
        tableHeaders: ["データ", "利用目的"],
        rows: [
          ["写真・動画", "アプリ内での安全な保存・表示・編集・エクスポート"],
          ["サムネイル", "一覧画面での高速表示"],
          ["メタデータ", "ファイル情報の表示・圧縮率の計算・ストレージ使用量の表示"],
          ["フォルダ情報", "写真・動画の整理・並び替え・カバー写真の表示"],
          ["PIN / ハッシュ", "アプリロックによるプライバシー保護"],
          ["生体認証設定", "Face ID・指紋認証によるロック解除の有効/無効管理"],
          ["テーマ設定", "ユーザーの好みに合わせたUI表示"],
          ["元データ削除設定", "インポート後にカメラロールから元の写真を自動削除するかの管理"],
        ],
      },
      thirdParty: {
        title: "5. 第三者サービスへの情報提供",
        content: "本アプリはネットワーク通信を一切行いません。写真・動画・設定情報を含むすべてのデータは端末内にのみ保存され、外部のサーバー・クラウドサービス・広告ネットワーク・アナリティクスサービスへの送信は行われません。",
        important: "重要：本アプリはクラウド同期・バックアップ機能を提供していません。アプリを削除するとすべてのデータが失われます。",
      },
      retention: {
        title: "6. データの保存と保持期間",
        local: {
          title: "6-1. ローカルデータ",
          intro: "すべてのデータはユーザーが明示的に削除するまで端末内に保存されます。",
          items: [
            "写真・動画：ユーザーが削除操作を行うまで保持",
            "フォルダ情報：フォルダ削除時に関連データとともに削除",
            "PIN情報：PINロック無効化時にセキュアストレージから削除",
            "アプリ設定：アプリの削除時にすべて消去",
          ],
          deletion: "※ アプリをアンインストールすると、すべてのローカルデータが完全に削除されます。",
        },
        server: {
          title: "6-2. サーバーサイドデータ",
          content: "本アプリはサーバーを使用していないため、サーバーサイドに保存されるデータは一切ありません。",
        },
      },
      security: {
        title: "7. データのセキュリティ",
        items: [
          "すべてのデータは端末内のアプリ専用サンドボックスに保存（他のアプリからアクセス不可）",
          "PINはSHA-256でハッシュ化され、OSのセキュアストレージ（Keychain / Keystore）に保存",
          "生体認証（Face ID・指紋認証）はOSのSecure Enclaveで処理され、アプリに生体データは保存されません",
          "ネットワーク通信を一切行わないため、通信経路からの漏洩リスクなし",
          "写真はJPEG形式で保存（追加の暗号化は行っていません）",
        ],
        disclaimer: "※ 端末自体のセキュリティ（パスコード・暗号化等）はユーザーの責任で管理してください。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは特定の年齢層を対象としておらず、意図的にお子様の個人情報を収集することはありません。本アプリはアカウント登録が不要であり、個人情報の入力を求めることはありません。",
        action: "お子様が本アプリを使用していることについて懸念がある場合は、下記連絡先までお問い合わせください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        japan: {
          title: "日本（個人情報保護法）",
          items: [
            "データの確認：すべてのデータは端末内に保存されているため、いつでもアプリ内で確認可能",
            "データの削除：アプリ内の削除機能、またはアプリのアンインストールで完全削除",
            "データのエクスポート：写真・動画は端末の写真ライブラリにエクスポート可能",
          ],
        },
        gdpr: {
          title: "EU（GDPR）",
          items: [
            "アクセス権：すべてのデータは端末内にありアプリから直接確認可能",
            "削除権：アプリ内で自由に削除可能",
            "データポータビリティ：エクスポート機能で写真ライブラリに書き出し可能",
            "処理の制限：データは端末内でのみ処理され、外部送信なし",
          ],
        },
        ccpa: {
          title: "米国カリフォルニア州（CCPA）",
          items: [
            "知る権利：収集データは本ポリシーに記載の端末内データのみ",
            "削除権：アプリ内またはアンインストールで完全削除",
            "オプトアウト権：データの販売・共有は一切なし",
            "差別禁止：権利行使によるサービス変更なし",
          ],
        },
        howTo: {
          title: "権利の行使方法",
          content: "すべてのデータは端末内に保存されているため、ほとんどの権利はアプリ内の操作で直接行使できます。追加のサポートが必要な場合は、下記のお問い合わせ先までご連絡ください。",
        },
      },
      cookies: {
        title: "10. Cookie・トラッキング",
        content: "本アプリはCookie、ウェブビーコン、ピクセルタグ、その他のトラッキング技術を一切使用しません。広告識別子（IDFA/GAID）の取得も行いません。",
      },
      changes: {
        title: "11. プライバシーポリシーの変更",
        content: "本プライバシーポリシーは、法令の変更やアプリの機能追加に伴い更新される場合があります。重要な変更がある場合は、アプリ内またはApp Storeの更新情報でお知らせします。",
        consent: "変更後も本アプリを継続してご利用いただいた場合、変更後のプライバシーポリシーに同意したものとみなします。",
      },
      contact: {
        title: "12. お問い合わせ",
        content: "本プライバシーポリシーに関するご質問やお問い合わせは、以下のメールアドレスまでご連絡ください。",
        email: "メールアドレス",
        responseTime: "※ 通常48時間以内に返信いたします。",
      },
      appStoreLabel: {
        title: "App Store プライバシー表示",
        description: "Apple App Store のプライバシーラベル（プライバシー栄養ラベル）に対応する情報です。",
        tableHeaders: ["データの種類", "収集", "トラッキングに使用", "ユーザーに関連付け"],
        rows: [
          ["写真または動画", "端末内のみ", "いいえ", "いいえ"],
          ["その他のユーザーコンテンツ", "端末内のみ", "いいえ", "いいえ"],
        ],
        trackingNote: "※ 本アプリは「App Tracking Transparency」に基づくトラッキング許可を要求しません。",
        languageNote: "対応言語：日本語・英語・韓国語・繁體中文",
      },
    },
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Back to Support",
    tableOfContents: "Table of Contents",
    userRightsIntro: {
      japan: "Under the Act on the Protection of Personal Information, you have the following rights:",
      gdpr: "Under GDPR, you have the following rights:",
      ccpa: "Under CCPA, you have the following rights:",
    },
    sections: {
      intro: {
        title: "1. Introduction",
        content: "KeyAlbum (hereinafter \"the App\") is an application for securely storing and managing photos and videos on your device. The App features PIN and biometric (Face ID / fingerprint) lock, a photo editor, and an in-app camera. This Privacy Policy explains how data is handled when you use the App.",
        consent: "By using the App, you agree to the terms described in this Privacy Policy. If you do not agree, please refrain from using the App.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        localData: {
          title: "2-1. Data Stored Only on Your Device",
          photos: {
            title: "(a) Photo & Video Data",
            items: [
              "Photos and videos imported, captured, or edited by the user",
              "Automatically generated thumbnail images (300×300 pixels)",
              "Photo metadata (width, height, file size, creation date)",
              "Video metadata (duration, file size)",
              "Edited images created with the photo editor (results of text, sticker, and filter applications)",
              "All data is stored in the app's private folder and is never transmitted externally",
            ],
          },
          folders: {
            title: "(b) Folder Information",
            items: [
              "Folder names and IDs created by the user",
              "Folder cover photo settings",
              "Folder and photo sort order information",
              "Management data for photos and videos within folders (metadata.json)",
            ],
          },
          settings: {
            title: "(c) App Settings & Authentication",
            items: [
              "Theme color settings",
              "Delete originals after import setting",
              "PIN lock settings (PIN is SHA-256 hashed and stored in the OS secure storage)",
              "Biometric authentication (Face ID / fingerprint) enable/disable setting (biometric data itself is managed by the OS and is not accessible by the app)",
            ],
          },
        },
        notCollected: {
          title: "2-2. Information We Do Not Collect",
          intro: "The App does not collect any of the following information:",
          items: [
            "Personally identifiable information such as name, email address, or address (no account registration required)",
            "Location data",
            "Contacts",
            "Health or fitness data",
            "Tracking data for advertising purposes",
            "Usage analytics data",
            "Raw biometric data (facial or fingerprint data itself)",
          ],
        },
      },
      permissions: {
        title: "3. App Permissions",
        intro: "The App uses the following device permissions. All permissions are used solely to provide app functionality and are never used to transmit data externally.",
        items: [
          { name: "Photo Library", purpose: "Importing and exporting photos/videos, deleting originals after import" },
          { name: "Camera", purpose: "Taking photos and videos within the app" },
          { name: "Microphone", purpose: "Audio recording during video capture" },
          { name: "Face ID / Fingerprint", purpose: "App unlock (biometric data is managed by the OS and not stored by the app)" },
        ],
        note: "All permissions are confirmed through OS permission dialogs. If you choose not to grant a permission, other app features will still function normally.",
      },
      purpose: {
        title: "4. Purpose of Data Use",
        intro: "Data stored on the device is used only for the following purposes:",
        tableHeaders: ["Data", "Purpose"],
        rows: [
          ["Photos & Videos", "Secure storage, display, editing, and export within the app"],
          ["Thumbnails", "Fast display in grid views"],
          ["Metadata", "Displaying file info, calculating compression ratios, showing storage usage"],
          ["Folder Information", "Organizing, sorting photos/videos, and displaying cover photos"],
          ["PIN / Hash", "Privacy protection through app lock"],
          ["Biometric Settings", "Managing Face ID / fingerprint unlock enable/disable"],
          ["Theme Settings", "Customizing UI appearance to user preference"],
          ["Delete Originals Setting", "Managing whether to auto-delete photos from camera roll after import"],
        ],
      },
      thirdParty: {
        title: "5. Third-Party Services",
        content: "The App does not perform any network communication. All data, including photos, videos, and settings, is stored only on the device and is never transmitted to external servers, cloud services, ad networks, or analytics services.",
        important: "Important: The App does not provide cloud sync or backup features. All data will be lost if the app is deleted.",
      },
      retention: {
        title: "6. Data Storage and Retention",
        local: {
          title: "6-1. Local Data",
          intro: "All data is stored on the device until explicitly deleted by the user.",
          items: [
            "Photos & Videos: Retained until the user performs a delete operation",
            "Folder Information: Deleted along with related data when a folder is deleted",
            "PIN Information: Removed from secure storage when PIN lock is disabled",
            "App Settings: Completely erased when the app is deleted",
          ],
          deletion: "* Uninstalling the app will permanently delete all local data.",
        },
        server: {
          title: "6-2. Server-Side Data",
          content: "The App does not use any servers, so no data is stored server-side.",
        },
      },
      security: {
        title: "7. Data Security",
        items: [
          "All data is stored in the app's sandboxed directory (inaccessible by other apps)",
          "PIN is SHA-256 hashed and stored in the OS secure storage (Keychain / Keystore)",
          "Biometric authentication (Face ID / fingerprint) is processed by the OS Secure Enclave; no biometric data is stored by the app",
          "No network communication means zero risk of data leakage through network channels",
          "Photos are stored in JPEG format (no additional encryption is applied)",
        ],
        disclaimer: "* Device-level security (passcode, encryption, etc.) is the user's responsibility.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App does not target any specific age group and does not intentionally collect personal information from children. The App does not require account registration and does not request any personal information.",
        action: "If you have concerns about a child using the App, please contact us at the address below.",
      },
      userRights: {
        title: "9. User Rights",
        japan: {
          title: "Japan (APPI)",
          items: [
            "Data Access: All data is stored on the device and can be viewed within the app at any time",
            "Data Deletion: Complete deletion via in-app delete function or app uninstallation",
            "Data Export: Photos and videos can be exported to the device's photo library",
          ],
        },
        gdpr: {
          title: "EU (GDPR)",
          items: [
            "Right of Access: All data is on-device and directly viewable through the app",
            "Right to Erasure: Data can be freely deleted within the app",
            "Data Portability: Export function allows exporting to the photo library",
            "Restriction of Processing: Data is processed only on-device with no external transmission",
          ],
        },
        ccpa: {
          title: "California, USA (CCPA)",
          items: [
            "Right to Know: Collected data is limited to on-device data described in this policy",
            "Right to Delete: Complete deletion via in-app function or uninstallation",
            "Right to Opt-Out: No data is sold or shared",
            "Non-Discrimination: No service changes due to exercising rights",
          ],
        },
        howTo: {
          title: "How to Exercise Your Rights",
          content: "Since all data is stored on the device, most rights can be exercised directly through in-app operations. If you need additional support, please contact us at the address below.",
        },
      },
      cookies: {
        title: "10. Cookies & Tracking",
        content: "The App does not use cookies, web beacons, pixel tags, or any other tracking technologies. It does not access advertising identifiers (IDFA/GAID).",
      },
      changes: {
        title: "11. Changes to This Privacy Policy",
        content: "This Privacy Policy may be updated due to changes in laws or the addition of new app features. Significant changes will be announced through the app or App Store update notes.",
        consent: "Continued use of the App after changes constitutes acceptance of the updated Privacy Policy.",
      },
      contact: {
        title: "12. Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at the email address below.",
        email: "Email",
        responseTime: "* We typically respond within 48 hours.",
      },
      appStoreLabel: {
        title: "App Store Privacy Label",
        description: "Information corresponding to the Apple App Store privacy nutrition label.",
        tableHeaders: ["Data Type", "Collected", "Used for Tracking", "Linked to User"],
        rows: [
          ["Photos or Videos", "On-device only", "No", "No"],
          ["Other User Content", "On-device only", "No", "No"],
        ],
        trackingNote: "* The App does not request tracking permission under App Tracking Transparency.",
        languageNote: "Supported Languages: Japanese, English, Korean, Traditional Chinese",
      },
    },
  },
  ko: {
    title: "개인정보 처리방침",
    lastUpdated: "최종 업데이트",
    lastUpdatedDate: LAST_UPDATED_KO,
    backToSupport: "지원 페이지로 돌아가기",
    tableOfContents: "목차",
    userRightsIntro: {
      japan: "개인정보 보호법에 따라 다음과 같은 권리를 가집니다:",
      gdpr: "GDPR에 따라 다음과 같은 권리를 가집니다:",
      ccpa: "CCPA에 따라 다음과 같은 권리를 가집니다:",
    },
    sections: {
      intro: {
        title: "1. 소개",
        content: "KeyAlbum(이하 \"본 앱\")은 사진과 동영상을 기기 내에 안전하게 저장하고 관리하기 위한 앱입니다. 본 앱은 PIN 및 생체 인증(Face ID/지문 인증) 잠금, 사진 편집기, 앱 내 카메라 기능을 제공합니다. 본 개인정보 처리방침은 본 앱을 이용할 때의 데이터 처리에 대해 설명합니다.",
        consent: "본 앱을 이용함으로써 본 개인정보 처리방침에 설명된 내용에 동의한 것으로 간주됩니다. 동의하지 않으시는 경우 본 앱의 이용을 삼가해 주세요.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        localData: {
          title: "2-1. 기기 내에만 저장되는 데이터",
          photos: {
            title: "(a) 사진·동영상 데이터",
            items: [
              "사용자가 가져오기, 촬영 또는 편집한 사진·동영상",
              "자동 생성되는 썸네일 이미지(300×300픽셀)",
              "사진 메타데이터(너비, 높이, 파일 크기, 생성일)",
              "동영상 메타데이터(재생 시간, 파일 크기)",
              "사진 편집기로 생성된 편집 이미지(텍스트, 스티커, 필터 등의 적용 결과)",
              "모든 데이터는 앱 전용 폴더에 저장되며 외부로 전송되지 않습니다",
            ],
          },
          folders: {
            title: "(b) 폴더 정보",
            items: [
              "사용자가 생성한 폴더명 및 폴더 ID",
              "폴더 커버 사진 설정",
              "폴더 및 사진 정렬 순서 정보",
              "폴더 내 사진·동영상 관리 정보(metadata.json)",
            ],
          },
          settings: {
            title: "(c) 앱 설정·인증 정보",
            items: [
              "테마 색상 설정",
              "가져오기 후 원본 삭제 설정",
              "PIN 잠금 설정(PIN은 SHA-256으로 해시화되어 OS 보안 저장소에 저장)",
              "생체 인증(Face ID/지문 인증) 활성화/비활성화 설정(생체 데이터 자체는 OS가 관리하며 앱에서 접근할 수 없습니다)",
            ],
          },
        },
        notCollected: {
          title: "2-2. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다:",
          items: [
            "성명, 이메일 주소, 주소 등 개인 식별 정보(계정 등록 불필요)",
            "위치 정보",
            "연락처",
            "건강 및 피트니스 데이터",
            "광고 목적의 추적 데이터",
            "사용 분석 데이터",
            "생체 인증 원시 데이터(얼굴·지문 데이터 자체)",
          ],
        },
      },
      permissions: {
        title: "3. 앱이 사용하는 권한",
        intro: "본 앱은 다음 기기 권한을 사용합니다. 모든 권한은 앱 기능 제공을 위해서만 사용되며 데이터의 외부 전송에는 사용되지 않습니다.",
        items: [
          { name: "사진 라이브러리", purpose: "사진·동영상 가져오기 및 내보내기, 가져오기 후 원본 삭제" },
          { name: "카메라", purpose: "앱 내 사진·동영상 촬영" },
          { name: "마이크", purpose: "동영상 촬영 시 음성 녹음" },
          { name: "Face ID / 지문 인증", purpose: "앱 잠금 해제(생체 데이터는 OS가 관리하며 앱에 저장되지 않습니다)" },
        ],
        note: "모든 권한은 OS 권한 대화 상자를 통해 사용자에게 확인됩니다. 권한을 허용하지 않아도 해당 기능 외의 앱 기능은 정상적으로 이용할 수 있습니다.",
      },
      purpose: {
        title: "4. 정보의 이용 목적",
        intro: "기기 내에 저장되는 데이터는 다음 목적으로만 사용됩니다:",
        tableHeaders: ["데이터", "이용 목적"],
        rows: [
          ["사진·동영상", "앱 내 안전한 저장, 표시, 편집 및 내보내기"],
          ["썸네일", "목록 화면에서의 빠른 표시"],
          ["메타데이터", "파일 정보 표시, 압축률 계산, 저장 공간 사용량 표시"],
          ["폴더 정보", "사진·동영상 정리, 정렬 및 커버 사진 표시"],
          ["PIN / 해시", "앱 잠금을 통한 개인정보 보호"],
          ["생체 인증 설정", "Face ID·지문 인증 잠금 해제 활성화/비활성화 관리"],
          ["테마 설정", "사용자 취향에 맞춘 UI 표시"],
          ["원본 삭제 설정", "가져오기 후 카메라 롤에서 원본 자동 삭제 여부 관리"],
        ],
      },
      thirdParty: {
        title: "5. 제3자 서비스에 대한 정보 제공",
        content: "본 앱은 네트워크 통신을 일절 하지 않습니다. 사진, 동영상, 설정 정보를 포함한 모든 데이터는 기기 내에만 저장되며 외부 서버, 클라우드 서비스, 광고 네트워크, 분석 서비스에 전송되지 않습니다.",
        important: "중요: 본 앱은 클라우드 동기화 및 백업 기능을 제공하지 않습니다. 앱을 삭제하면 모든 데이터가 손실됩니다.",
      },
      retention: {
        title: "6. 데이터 보관 및 보존 기간",
        local: {
          title: "6-1. 로컬 데이터",
          intro: "모든 데이터는 사용자가 명시적으로 삭제할 때까지 기기 내에 저장됩니다.",
          items: [
            "사진·동영상: 사용자가 삭제 작업을 수행할 때까지 보존",
            "폴더 정보: 폴더 삭제 시 관련 데이터와 함께 삭제",
            "PIN 정보: PIN 잠금 비활성화 시 보안 저장소에서 삭제",
            "앱 설정: 앱 삭제 시 모두 제거",
          ],
          deletion: "※ 앱을 제거하면 모든 로컬 데이터가 완전히 삭제됩니다.",
        },
        server: {
          title: "6-2. 서버 측 데이터",
          content: "본 앱은 서버를 사용하지 않으므로 서버 측에 저장되는 데이터는 없습니다.",
        },
      },
      security: {
        title: "7. 데이터 보안",
        items: [
          "모든 데이터는 기기 내 앱 전용 샌드박스에 저장(다른 앱에서 접근 불가)",
          "PIN은 SHA-256으로 해시화되어 OS 보안 저장소(Keychain / Keystore)에 저장",
          "생체 인증(Face ID/지문 인증)은 OS의 Secure Enclave에서 처리되며 앱에 생체 데이터가 저장되지 않습니다",
          "네트워크 통신을 하지 않으므로 통신 경로를 통한 유출 위험 없음",
          "사진은 JPEG 형식으로 저장(추가 암호화는 적용되지 않음)",
        ],
        disclaimer: "※ 기기 자체의 보안(비밀번호, 암호화 등)은 사용자의 책임하에 관리해 주세요.",
      },
      children: {
        title: "8. 아동의 개인정보",
        content: "본 앱은 특정 연령대를 대상으로 하지 않으며 의도적으로 아동의 개인정보를 수집하지 않습니다. 본 앱은 계정 등록이 필요 없으며 개인정보 입력을 요청하지 않습니다.",
        action: "아동의 본 앱 사용에 대해 우려가 있으신 경우 아래 연락처로 문의해 주세요.",
      },
      userRights: {
        title: "9. 사용자의 권리",
        japan: {
          title: "일본(개인정보 보호법)",
          items: [
            "데이터 확인: 모든 데이터는 기기 내에 저장되어 있어 앱에서 언제든지 확인 가능",
            "데이터 삭제: 앱 내 삭제 기능 또는 앱 제거로 완전 삭제",
            "데이터 내보내기: 사진·동영상을 기기의 사진 라이브러리로 내보내기 가능",
          ],
        },
        gdpr: {
          title: "EU(GDPR)",
          items: [
            "접근권: 모든 데이터는 기기 내에 있으며 앱에서 직접 확인 가능",
            "삭제권: 앱 내에서 자유롭게 삭제 가능",
            "데이터 이동성: 내보내기 기능으로 사진 라이브러리에 내보내기 가능",
            "처리 제한: 데이터는 기기 내에서만 처리되며 외부 전송 없음",
          ],
        },
        ccpa: {
          title: "미국 캘리포니아주(CCPA)",
          items: [
            "알 권리: 수집 데이터는 본 방침에 기재된 기기 내 데이터뿐",
            "삭제권: 앱 내 또는 제거로 완전 삭제",
            "옵트아웃 권리: 데이터의 판매나 공유 없음",
            "차별 금지: 권리 행사에 따른 서비스 변경 없음",
          ],
        },
        howTo: {
          title: "권리 행사 방법",
          content: "모든 데이터는 기기 내에 저장되어 있으므로 대부분의 권리는 앱 내 조작으로 직접 행사할 수 있습니다. 추가 지원이 필요한 경우 아래 연락처로 문의해 주세요.",
        },
      },
      cookies: {
        title: "10. 쿠키·추적",
        content: "본 앱은 쿠키, 웹 비콘, 픽셀 태그 또는 기타 추적 기술을 일절 사용하지 않습니다. 광고 식별자(IDFA/GAID) 취득도 하지 않습니다.",
      },
      changes: {
        title: "11. 개인정보 처리방침의 변경",
        content: "본 개인정보 처리방침은 법령 변경이나 앱 기능 추가에 따라 업데이트될 수 있습니다. 중요한 변경이 있는 경우 앱 내 또는 App Store 업데이트 정보에서 안내합니다.",
        consent: "변경 후에도 본 앱을 계속 이용하시면 변경된 개인정보 처리방침에 동의한 것으로 간주됩니다.",
      },
      contact: {
        title: "12. 문의하기",
        content: "본 개인정보 처리방침에 관한 질문이나 문의는 아래 이메일 주소로 연락해 주세요.",
        email: "이메일",
        responseTime: "※ 통상 48시간 이내에 답변드립니다.",
      },
      appStoreLabel: {
        title: "App Store 개인정보 보호 표시",
        description: "Apple App Store 개인정보 보호 라벨에 해당하는 정보입니다.",
        tableHeaders: ["데이터 유형", "수집", "추적에 사용", "사용자에 연결"],
        rows: [
          ["사진 또는 동영상", "기기 내만", "아니오", "아니오"],
          ["기타 사용자 콘텐츠", "기기 내만", "아니오", "아니오"],
        ],
        trackingNote: "※ 본 앱은 App Tracking Transparency에 따른 추적 허가를 요청하지 않습니다.",
        languageNote: "지원 언어: 일본어, 영어, 한국어, 번체 중국어",
      },
    },
  },
  "zh-TW": {
    title: "隱私權政策",
    lastUpdated: "最後更新",
    lastUpdatedDate: LAST_UPDATED_ZH_TW,
    backToSupport: "返回支援頁面",
    tableOfContents: "目錄",
    userRightsIntro: {
      japan: "根據個人資訊保護法，您擁有以下權利：",
      gdpr: "根據 GDPR，您擁有以下權利：",
      ccpa: "根據 CCPA，您擁有以下權利：",
    },
    sections: {
      intro: {
        title: "1. 簡介",
        content: "KeyAlbum（以下簡稱「本應用程式」）是一款用於在裝置上安全儲存和管理照片與影片的應用程式。本應用程式提供 PIN 碼和生物辨識（Face ID/指紋）鎖定、照片編輯器及應用程式內相機功能。本隱私權政策說明您使用本應用程式時的資料處理方式。",
        consent: "使用本應用程式即表示您同意本隱私權政策中所述的條款。如果您不同意，請停止使用本應用程式。",
      },
      dataCollection: {
        title: "2. 收集的資訊",
        localData: {
          title: "2-1. 僅儲存在裝置上的資料",
          photos: {
            title: "(a) 照片與影片資料",
            items: [
              "使用者匯入、拍攝或編輯的照片與影片",
              "自動生成的縮圖（300×300 像素）",
              "照片的中繼資料（寬度、高度、檔案大小、建立日期）",
              "影片的中繼資料（播放時間、檔案大小）",
              "使用照片編輯器建立的已編輯影像（文字、貼紙和濾鏡等應用結果）",
              "所有資料儲存在應用程式專用資料夾中，不會傳輸到外部",
            ],
          },
          folders: {
            title: "(b) 資料夾資訊",
            items: [
              "使用者建立的資料夾名稱和 ID",
              "資料夾封面照片設定",
              "資料夾和照片排序順序資訊",
              "資料夾內照片和影片的管理資訊（metadata.json）",
            ],
          },
          settings: {
            title: "(c) 應用程式設定與驗證資訊",
            items: [
              "主題色彩設定",
              "匯入後刪除原始資料設定",
              "PIN 碼鎖定設定（PIN 碼經 SHA-256 雜湊處理後儲存在 OS 安全儲存區）",
              "生物辨識（Face ID/指紋）啟用/停用設定（生物辨識資料本身由 OS 管理，應用程式無法存取）",
            ],
          },
        },
        notCollected: {
          title: "2-2. 不收集的資訊",
          intro: "本應用程式不收集以下任何資訊：",
          items: [
            "姓名、電子郵件地址、地址等個人識別資訊（無需帳號註冊）",
            "位置資訊",
            "聯絡人",
            "健康或健身資料",
            "用於廣告目的的追蹤資料",
            "使用情況分析資料",
            "生物辨識原始資料（臉部或指紋資料本身）",
          ],
        },
      },
      permissions: {
        title: "3. 應用程式使用的權限",
        intro: "本應用程式使用以下裝置權限。所有權限僅用於提供應用程式功能，不會用於向外部傳輸資料。",
        items: [
          { name: "照片圖庫", purpose: "匯入和匯出照片/影片，匯入後刪除原始資料" },
          { name: "相機", purpose: "在應用程式內拍攝照片和影片" },
          { name: "麥克風", purpose: "拍攝影片時錄製音訊" },
          { name: "Face ID / 指紋", purpose: "應用程式解鎖（生物辨識資料由 OS 管理，不會儲存在應用程式中）" },
        ],
        note: "所有權限都會透過 OS 權限對話框向使用者確認。如果您選擇不授予權限，其他應用程式功能仍可正常使用。",
      },
      purpose: {
        title: "4. 資訊使用目的",
        intro: "儲存在裝置上的資料僅用於以下目的：",
        tableHeaders: ["資料", "使用目的"],
        rows: [
          ["照片與影片", "在應用程式內安全儲存、顯示、編輯和匯出"],
          ["縮圖", "在列表畫面中快速顯示"],
          ["中繼資料", "顯示檔案資訊、計算壓縮率、顯示儲存空間使用量"],
          ["資料夾資訊", "整理、排序照片/影片和顯示封面照片"],
          ["PIN 碼 / 雜湊", "透過應用程式鎖定保護隱私"],
          ["生物辨識設定", "管理 Face ID/指紋解鎖啟用/停用"],
          ["主題設定", "根據使用者偏好自訂 UI 外觀"],
          ["刪除原始資料設定", "管理匯入後是否自動從相簿刪除原始照片"],
        ],
      },
      thirdParty: {
        title: "5. 向第三方服務提供資訊",
        content: "本應用程式不進行任何網路通訊。包括照片、影片和設定資訊在內的所有資料僅儲存在裝置上，不會傳輸至外部伺服器、雲端服務、廣告網路或分析服務。",
        important: "重要：本應用程式不提供雲端同步或備份功能。刪除應用程式將導致所有資料遺失。",
      },
      retention: {
        title: "6. 資料儲存與保留期間",
        local: {
          title: "6-1. 本機資料",
          intro: "所有資料儲存在裝置上，直到使用者明確刪除為止。",
          items: [
            "照片與影片：保留至使用者執行刪除操作",
            "資料夾資訊：刪除資料夾時連同相關資料一併刪除",
            "PIN 碼資訊：停用 PIN 碼鎖定時從安全儲存區刪除",
            "應用程式設定：刪除應用程式時全部清除",
          ],
          deletion: "※ 解除安裝應用程式將永久刪除所有本機資料。",
        },
        server: {
          title: "6-2. 伺服器端資料",
          content: "本應用程式不使用任何伺服器，因此沒有資料儲存在伺服器端。",
        },
      },
      security: {
        title: "7. 資料安全",
        items: [
          "所有資料儲存在裝置上的應用程式專用沙盒中（其他應用程式無法存取）",
          "PIN 碼經 SHA-256 雜湊處理後儲存在 OS 安全儲存區（Keychain / Keystore）",
          "生物辨識（Face ID/指紋）由 OS 的 Secure Enclave 處理，應用程式不儲存生物辨識資料",
          "不進行網路通訊，因此不存在通訊途徑的資料洩漏風險",
          "照片以 JPEG 格式儲存（未套用額外加密）",
        ],
        disclaimer: "※ 裝置本身的安全性（密碼、加密等）由使用者自行管理。",
      },
      children: {
        title: "8. 兒童隱私",
        content: "本應用程式不針對特定年齡層，也不會有意收集兒童的個人資訊。本應用程式無需帳號註冊，也不要求輸入任何個人資訊。",
        action: "如果您對兒童使用本應用程式有任何疑慮，請透過下方聯絡方式與我們聯繫。",
      },
      userRights: {
        title: "9. 使用者權利",
        japan: {
          title: "日本（個人資訊保護法）",
          items: [
            "資料確認：所有資料儲存在裝置上，可隨時在應用程式中確認",
            "資料刪除：透過應用程式內的刪除功能或解除安裝完全刪除",
            "資料匯出：照片和影片可匯出至裝置的照片圖庫",
          ],
        },
        gdpr: {
          title: "歐盟（GDPR）",
          items: [
            "存取權：所有資料在裝置上，可透過應用程式直接確認",
            "刪除權：可在應用程式中自由刪除",
            "資料可攜性：透過匯出功能匯出至照片圖庫",
            "處理限制：資料僅在裝置上處理，不會外部傳輸",
          ],
        },
        ccpa: {
          title: "美國加州（CCPA）",
          items: [
            "知情權：收集的資料僅為本政策中所述的裝置上資料",
            "刪除權：透過應用程式內功能或解除安裝完全刪除",
            "退出選擇權：不會出售或分享任何資料",
            "不歧視：行使權利不會導致服務變更",
          ],
        },
        howTo: {
          title: "權利行使方式",
          content: "由於所有資料儲存在裝置上，大部分權利可透過應用程式內操作直接行使。如需額外支援，請透過下方聯絡方式與我們聯繫。",
        },
      },
      cookies: {
        title: "10. Cookie 與追蹤",
        content: "本應用程式不使用 Cookie、網路信標、像素標籤或任何其他追蹤技術。也不會取得廣告識別碼（IDFA/GAID）。",
      },
      changes: {
        title: "11. 隱私權政策的變更",
        content: "本隱私權政策可能因法規變更或應用程式功能新增而更新。如有重大變更，將透過應用程式或 App Store 更新資訊通知。",
        consent: "變更後繼續使用本應用程式即視為同意更新後的隱私權政策。",
      },
      contact: {
        title: "12. 聯繫我們",
        content: "如對本隱私權政策有任何疑問，請透過以下電子郵件地址與我們聯繫。",
        email: "電子郵件",
        responseTime: "※ 我們通常會在 48 小時內回覆。",
      },
      appStoreLabel: {
        title: "App Store 隱私權標示",
        description: "對應 Apple App Store 隱私權標籤的資訊。",
        tableHeaders: ["資料類型", "收集", "用於追蹤", "與使用者關聯"],
        rows: [
          ["照片或影片", "僅限裝置上", "否", "否"],
          ["其他使用者內容", "僅限裝置上", "否", "否"],
        ],
        trackingNote: "※ 本應用程式不會要求 App Tracking Transparency 的追蹤許可。",
        languageNote: "支援語言：日語、英語、韓語、繁體中文",
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold mb-3 text-gray-800 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 mb-4">
      <h3 className="text-base font-semibold mb-2 text-gray-700">{title}</h3>
      <div className="pl-2">{children}</div>
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

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ImportantBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-800 text-sm font-medium">{children}</p>
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function KeyAlbumPrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const currentYear = new Date().getFullYear();

  const tocItems = [
    s.intro.title,
    s.dataCollection.title,
    s.permissions.title,
    s.purpose.title,
    s.thirdParty.title,
    s.retention.title,
    s.security.title,
    s.children.title,
    s.userRights.title,
    s.cookies.title,
    s.changes.title,
    s.contact.title,
  ];

  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image
              src={appIcon}
              alt="KeyAlbum"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">KeyAlbum</h1>
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
            href="/support/pixvault"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToSupport}
          </Link>
        </div>

        {/* コンテンツ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

          {/* 目次 */}
          <div className="mb-8 bg-gray-50 rounded-xl p-5">
            <h2 className="font-semibold text-gray-700 mb-3">{t.tableOfContents}</h2>
            <ol className="space-y-1">
              {tocItems.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* 1. はじめに */}
          <Section title={s.intro.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.intro.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.intro.consent}</p>
          </Section>

          {/* 2. 収集する情報 */}
          <Section title={s.dataCollection.title}>
            {/* 2-1 */}
            <SubSection title={s.dataCollection.localData.title}>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.localData.photos.title}</h4>
                <BulletList items={s.dataCollection.localData.photos.items} />
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.localData.folders.title}</h4>
                <BulletList items={s.dataCollection.localData.folders.items} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.localData.settings.title}</h4>
                <BulletList items={s.dataCollection.localData.settings.items} />
              </div>
            </SubSection>

            {/* 2-2 */}
            <SubSection title={s.dataCollection.notCollected.title}>
              <p className="text-gray-700 mb-3">{s.dataCollection.notCollected.intro}</p>
              <CrossList items={s.dataCollection.notCollected.items} />
            </SubSection>
          </Section>

          {/* 3. アプリが使用する権限 */}
          <Section title={s.permissions.title}>
            <p className="text-gray-700 mb-4">{s.permissions.intro}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">
                      {lang === "ja" ? "権限" : lang === "en" ? "Permission" : lang === "ko" ? "권한" : "權限"}
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">
                      {lang === "ja" ? "使用目的" : lang === "en" ? "Purpose" : lang === "ko" ? "사용 목적" : "使用目的"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {s.permissions.items.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 text-gray-700 border border-gray-200 font-medium">{item.name}</td>
                      <td className="p-3 text-gray-700 border border-gray-200">{item.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-3">{s.permissions.note}</p>
          </Section>

          {/* 4. 情報の利用目的 */}
          <Section title={s.purpose.title}>
            <p className="text-gray-700 mb-4">{s.purpose.intro}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">{s.purpose.tableHeaders[0]}</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">{s.purpose.tableHeaders[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {s.purpose.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 text-gray-700 border border-gray-200 font-medium">{row[0]}</td>
                      <td className="p-3 text-gray-700 border border-gray-200">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 5. 第三者サービスへの情報提供 */}
          <Section title={s.thirdParty.title}>
            <p className="text-gray-700 leading-relaxed mb-4">{s.thirdParty.content}</p>
            <ImportantBox>{s.thirdParty.important}</ImportantBox>
          </Section>

          {/* 6. データの保存と保持期間 */}
          <Section title={s.retention.title}>
            <SubSection title={s.retention.local.title}>
              <p className="text-gray-700 mb-3">{s.retention.local.intro}</p>
              <BulletList items={s.retention.local.items} />
              <p className="text-gray-600 text-sm mt-3">{s.retention.local.deletion}</p>
            </SubSection>
            <SubSection title={s.retention.server.title}>
              <p className="text-gray-700 leading-relaxed">{s.retention.server.content}</p>
            </SubSection>
          </Section>

          {/* 7. データのセキュリティ */}
          <Section title={s.security.title}>
            <div className="bg-blue-50 rounded-lg p-4 mb-3">
              <CheckList items={s.security.items} />
            </div>
            <p className="text-gray-600 text-sm">{s.security.disclaimer}</p>
          </Section>

          {/* 8. お子様のプライバシー */}
          <Section title={s.children.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.children.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.children.action}</p>
          </Section>

          {/* 9. ユーザーの権利 */}
          <Section title={s.userRights.title}>
            <SubSection title={s.userRights.japan.title}>
              <p className="text-gray-600 text-sm mb-2">{t.userRightsIntro.japan}</p>
              <BulletList items={s.userRights.japan.items} />
            </SubSection>
            <SubSection title={s.userRights.gdpr.title}>
              <p className="text-gray-600 text-sm mb-2">{t.userRightsIntro.gdpr}</p>
              <BulletList items={s.userRights.gdpr.items} />
            </SubSection>
            <SubSection title={s.userRights.ccpa.title}>
              <p className="text-gray-600 text-sm mb-2">{t.userRightsIntro.ccpa}</p>
              <BulletList items={s.userRights.ccpa.items} />
            </SubSection>
            <SubSection title={s.userRights.howTo.title}>
              <p className="text-gray-700 leading-relaxed">{s.userRights.howTo.content}</p>
            </SubSection>
          </Section>

          {/* 10. Cookie */}
          <Section title={s.cookies.title}>
            <p className="text-gray-700 leading-relaxed">{s.cookies.content}</p>
          </Section>

          {/* 11. プライバシーポリシーの変更 */}
          <Section title={s.changes.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.changes.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.changes.consent}</p>
          </Section>

          {/* 12. お問い合わせ */}
          <Section title={s.contact.title}>
            <p className="text-gray-700 mb-4">{s.contact.content}</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2 text-sm text-gray-700">
              <p><span className="font-medium">{s.contact.email}:</span> {SUPPORT_EMAIL}</p>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {SUPPORT_EMAIL}
            </a>
            <p className="mt-3 text-sm text-gray-500">{s.contact.responseTime}</p>
          </Section>

          {/* App Store Privacy Nutrition Label */}
          <Section title={s.appStoreLabel.title}>
            <p className="text-gray-600 text-sm mb-4">{s.appStoreLabel.description}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {s.appStoreLabel.tableHeaders.map((header, i) => (
                      <th key={i} className="text-left p-2 font-semibold text-gray-700 border border-gray-200 text-xs">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.appStoreLabel.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      {row.map((cell, j) => (
                        <td key={j} className={`p-2 border border-gray-200 text-xs ${j === 0 ? "font-medium text-gray-700" : "text-gray-600 text-center"}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">{s.appStoreLabel.trackingNote}</p>
            <p className="text-xs text-gray-400 mt-2 italic">{s.appStoreLabel.languageNote}</p>
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
