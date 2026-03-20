"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/Pixvault.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年3月20日";
const LAST_UPDATED_EN = "March 20, 2026";
const LAST_UPDATED_KO = "2026년 3월 20일";
const LAST_UPDATED_ZH_TW = "2026年3月20日";
const LAST_UPDATED_AR = "20 مارس 2026";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en" | "ko" | "zh-TW" | "ar";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
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
        content: "PixVault（以下「本アプリ」）は、写真・動画をデバイス内に安全に保存・管理するためのアプリです。本プライバシーポリシーは、本アプリをご利用いただく際のデータの取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに記載された内容に同意したものとみなします。同意いただけない場合は、本アプリのご利用をお控えください。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        localData: {
          title: "2-1. 端末内にのみ保存されるデータ",
          photos: {
            title: "(a) 写真・動画データ",
            items: [
              "ユーザーがインポートまたは撮影した写真・動画",
              "自動生成されるサムネイル画像",
              "写真のメタデータ（幅・高さ・ファイルサイズ・作成日時）",
              "動画のメタデータ（再生時間・ファイルサイズ）",
              "すべてのデータはアプリ専用フォルダに保存され、外部には送信されません",
            ],
          },
          folders: {
            title: "(b) フォルダ情報",
            items: [
              "ユーザーが作成したフォルダ名・フォルダID",
              "フォルダのカバー写真設定",
              "フォルダ内の写真・動画の管理情報（metadata.json）",
            ],
          },
          settings: {
            title: "(c) アプリ設定",
            items: [
              "テーマカラー設定",
              "インポート時の元データ削除設定",
              "PINロック設定（PINはSHA-256ハッシュ化されて保存）",
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
            "インターネットを通じて外部に送信されるデータ",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "端末内に保存されるデータは以下の目的にのみ使用します：",
        tableHeaders: ["情報の種類", "利用目的"],
        rows: [
          ["写真・動画データ", "アプリ内での閲覧・編集・管理"],
          ["サムネイル画像", "ギャラリー表示の高速化"],
          ["メタデータ", "ファイル情報の表示・ソート機能"],
          ["フォルダ情報", "写真・動画の整理・分類"],
          ["テーマ設定", "UIのカスタマイズ表示"],
          ["PINハッシュ", "アプリロックの認証"],
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        content: "本アプリは、いかなる第三者サービス（広告ネットワーク、アナリティクス、クラウドストレージ等）も利用していません。ユーザーのデータは一切外部に送信されません。",
        important: "重要: 本アプリはインターネット接続を必要とせず、完全にオフラインで動作します。ユーザーの個人情報を販売・共有・提供することは一切ありません。",
      },
      retention: {
        title: "5. データの保存と保持期間",
        local: {
          title: "端末内（ローカルストレージ）",
          intro: "すべてのデータはユーザーの端末内のアプリ専用ディレクトリにのみ保存されます：",
          items: [
            "写真・動画ファイル（アプリ専用フォルダ）",
            "サムネイル画像",
            "フォルダ・写真メタデータ（metadata.json）",
            "アプリ設定（AsyncStorage）",
            "PINハッシュ（Secure Store / OS レベルの安全なストレージ）",
          ],
          deletion: "これらのデータは、アプリをアンインストールすることで完全に削除されます。クラウド同期は行われないため、再インストール時にデータは復元されません。",
        },
        server: {
          title: "サーバー",
          content: "本アプリは自社サーバーを持たず、ユーザーデータをサーバーに送信・保存することはありません。すべてのデータ処理は端末内で完結します。",
        },
      },
      security: {
        title: "6. データのセキュリティ",
        items: [
          "アプリ専用ディレクトリ: 写真・動画は他のアプリからアクセスできないアプリ専用フォルダに保存されます",
          "PINロック: オプションの4桁PINによるアプリロック機能を提供します",
          "PINハッシュ化: PINはSHA-256でソルト付きハッシュ化され、Secure Store（OSレベルの安全なストレージ）に保存されます",
          "オフライン設計: ネットワーク通信を一切行わないため、通信経由のデータ漏洩リスクがありません",
          "ローカル完結: すべてのデータ処理（圧縮・編集・サムネイル生成等）は端末内で行われます",
        ],
        disclaimer: "ただし、端末の紛失・盗難、ジェイルブレイク等により端末レベルのセキュリティが侵害された場合、アプリ内データの安全性を保証することはできません。",
      },
      children: {
        title: "7. お子様のプライバシー（COPPA対応）",
        content: "本アプリは13歳未満の子供を対象としておらず、意図的に13歳未満の子供から個人情報を収集することはありません。本アプリはデータを一切外部に送信しないため、年齢に関係なくプライバシーが保護されます。",
        action: "13歳未満の子供が本アプリを利用していることに関するご懸念がある保護者の方は、下記お問い合わせ先までご連絡ください。",
      },
      userRights: {
        title: "8. ユーザーの権利",
        japan: {
          title: "8-1. 日本国内のユーザー",
          items: [
            "保有する個人情報の開示請求",
            "内容の訂正・追加・削除の請求",
            "利用停止・消去の請求",
          ],
        },
        gdpr: {
          title: "8-2. EEA・UK のユーザー（GDPR）",
          items: [
            "アクセス権: 保有する個人データへのアクセス",
            "訂正権: 不正確な個人データの訂正",
            "削除権（忘れられる権利）: 個人データの削除",
            "処理制限権: 個人データ処理の制限",
            "データポータビリティ権: データの受け取りと転送",
            "異議申立権: 個人データの処理に対する異議",
          ],
        },
        ccpa: {
          title: "8-3. カリフォルニア州のユーザー（CCPA）",
          items: [
            "収集する個人情報のカテゴリと目的の開示請求",
            "個人情報の削除請求",
            "個人情報の販売のオプトアウト（当社は個人情報を販売しません）",
          ],
        },
        howTo: {
          title: "権利行使の方法",
          content: "本アプリはすべてのデータを端末内にのみ保存しているため、アプリのアンインストールにより全データを削除できます。個別の写真・動画・フォルダはアプリ内の削除機能で削除できます。その他の権利行使については、下記お問い合わせ先までご連絡ください。",
        },
      },
      cookies: {
        title: "9. Cookieおよびトラッキング技術",
        content: "本アプリはWebブラウザ上で動作するものではないため、Cookieは使用しません。また、いかなるトラッキング技術（広告ID、アナリティクスSDK等）も使用していません。Apple の App Tracking Transparency（ATT）フレームワークが要求する広告目的のトラッキングは実施していないため、ATTのプロンプトは表示されません。",
      },
      changes: {
        title: "10. プライバシーポリシーの変更",
        content: "当社は、本プライバシーポリシーを随時更新することがあります。重要な変更が生じた場合は、本ページ上部の「最終更新日」の更新によりお知らせします。",
        consent: "変更後も本アプリを継続してご利用いただく場合は、更新後のプライバシーポリシーに同意したものとみなします。",
      },
      contact: {
        title: "11. お問い合わせ",
        content: "本プライバシーポリシーに関するご質問・権利行使の申請は、以下までお問い合わせください：",
        email: "メールアドレス",
        responseTime: "お問い合わせから原則30日以内にご回答いたします。",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label 対応表",
        description: "App Store の App Privacy セクション向け開示情報です。",
        tableHeaders: ["データの種類", "収集するか", "追跡するか", "利用目的"],
        rows: [
          ["写真・動画", "○（端末内のみ）", "×", "App Functionality（写真・動画の保存・管理）"],
          ["識別子（デバイスID）", "×", "×", "—"],
          ["利用状況データ", "×", "×", "—"],
          ["位置情報", "×", "×", "—"],
          ["連絡先情報", "×", "×", "—"],
          ["氏名・メールアドレス等", "×", "×", "—"],
        ],
        trackingNote: "「追跡」= 第三者の広告・分析目的でのデータ利用。本アプリはいずれのデータも外部に送信せず、広告目的で追跡しません。",
        languageNote: "本プライバシーポリシーは日本語を正文とします。",
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
        content: "PixVault (hereinafter \"the App\") is an application for securely storing and managing photos and videos on your device. This Privacy Policy explains how data is handled when you use the App.",
        consent: "By using the App, you agree to the terms described in this Privacy Policy. If you do not agree, please refrain from using the App.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        localData: {
          title: "2-1. Data Stored Only on Your Device",
          photos: {
            title: "(a) Photo & Video Data",
            items: [
              "Photos and videos imported or captured by the user",
              "Automatically generated thumbnail images",
              "Photo metadata (width, height, file size, creation date)",
              "Video metadata (duration, file size)",
              "All data is stored in the app's private folder and is never sent externally",
            ],
          },
          folders: {
            title: "(b) Folder Information",
            items: [
              "Folder names and folder IDs created by the user",
              "Folder cover photo settings",
              "Management information for photos/videos within folders (metadata.json)",
            ],
          },
          settings: {
            title: "(c) App Settings",
            items: [
              "Theme color settings",
              "Delete original data on import setting",
              "PIN lock settings (PIN is stored as a SHA-256 hash)",
            ],
          },
        },
        notCollected: {
          title: "2-2. Information We Do Not Collect",
          intro: "The App does not collect any of the following information:",
          items: [
            "Personally identifiable information such as name, email, or address (no account registration required)",
            "Location data",
            "Contacts",
            "Health & fitness data",
            "Tracking data for advertising purposes",
            "Usage analytics data",
            "Any data sent externally via the internet",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Data Use",
        intro: "Data stored on the device is used only for the following purposes:",
        tableHeaders: ["Data Type", "Purpose"],
        rows: [
          ["Photo & Video Data", "Viewing, editing, and managing within the app"],
          ["Thumbnail Images", "Faster gallery display"],
          ["Metadata", "File information display and sorting"],
          ["Folder Information", "Organizing and categorizing photos/videos"],
          ["Theme Settings", "UI customization"],
          ["PIN Hash", "App lock authentication"],
        ],
      },
      thirdParty: {
        title: "4. Third-Party Services",
        content: "The App does not use any third-party services (ad networks, analytics, cloud storage, etc.). User data is never sent externally.",
        important: "Important: The App does not require an internet connection and operates completely offline. We never sell, share, or provide user personal information to any third party.",
      },
      retention: {
        title: "5. Data Storage & Retention",
        local: {
          title: "On-Device (Local Storage)",
          intro: "All data is stored exclusively in the app's private directory on the user's device:",
          items: [
            "Photo & video files (app-private folder)",
            "Thumbnail images",
            "Folder & photo metadata (metadata.json)",
            "App settings (AsyncStorage)",
            "PIN hash (Secure Store / OS-level secure storage)",
          ],
          deletion: "All data is permanently deleted when the app is uninstalled. Since there is no cloud sync, data cannot be restored upon reinstallation.",
        },
        server: {
          title: "Server",
          content: "The App does not have its own server and does not send or store user data on any server. All data processing is completed on the device.",
        },
      },
      security: {
        title: "6. Data Security",
        items: [
          "App-Private Directory: Photos and videos are stored in a private folder inaccessible to other apps",
          "PIN Lock: An optional 4-digit PIN lock feature is available",
          "PIN Hashing: PINs are hashed with SHA-256 and salt, stored in Secure Store (OS-level secure storage)",
          "Offline Design: No network communication is performed, eliminating the risk of data leakage via transmission",
          "Local Processing: All data processing (compression, editing, thumbnail generation, etc.) is performed on the device",
        ],
        disclaimer: "However, we cannot guarantee the security of in-app data if device-level security is compromised through device loss, theft, jailbreaking, etc.",
      },
      children: {
        title: "7. Children's Privacy (COPPA)",
        content: "The App is not intended for children under 13, and we do not intentionally collect personal information from children under 13. Since the App does not send any data externally, privacy is protected regardless of age.",
        action: "If you are a parent or guardian with concerns about a child under 13 using the App, please contact us using the information below.",
      },
      userRights: {
        title: "8. User Rights",
        japan: {
          title: "8-1. Users in Japan",
          items: [
            "Request disclosure of personal information held",
            "Request correction, addition, or deletion of information",
            "Request suspension or erasure of use",
          ],
        },
        gdpr: {
          title: "8-2. EEA & UK Users (GDPR)",
          items: [
            "Right of Access: Access to personal data held",
            "Right to Rectification: Correction of inaccurate personal data",
            "Right to Erasure (Right to be Forgotten): Deletion of personal data",
            "Right to Restriction: Restriction of personal data processing",
            "Right to Data Portability: Receiving and transferring data",
            "Right to Object: Objection to processing of personal data",
          ],
        },
        ccpa: {
          title: "8-3. California Users (CCPA)",
          items: [
            "Request disclosure of categories and purposes of personal information collected",
            "Request deletion of personal information",
            "Opt-out of sale of personal information (we do not sell personal information)",
          ],
        },
        howTo: {
          title: "How to Exercise Your Rights",
          content: "Since the App stores all data only on the device, you can delete all data by uninstalling the app. Individual photos, videos, and folders can be deleted using the in-app delete function. For other rights, please contact us using the information below.",
        },
      },
      cookies: {
        title: "9. Cookies & Tracking Technologies",
        content: "The App does not operate in a web browser, so cookies are not used. Additionally, no tracking technologies (advertising IDs, analytics SDKs, etc.) are used. Since we do not conduct advertising-purpose tracking required by Apple's App Tracking Transparency (ATT) framework, the ATT prompt is not displayed.",
      },
      changes: {
        title: "10. Changes to This Privacy Policy",
        content: "We may update this Privacy Policy from time to time. If significant changes occur, we will notify you by updating the \"Last Updated\" date at the top of this page.",
        consent: "If you continue to use the App after changes are made, you are deemed to have agreed to the updated Privacy Policy.",
      },
      contact: {
        title: "11. Contact Us",
        content: "For questions about this Privacy Policy or to exercise your rights, please contact us at:",
        email: "Email",
        responseTime: "We will respond to your inquiry within 30 days in principle.",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label",
        description: "Disclosure information for the App Store's App Privacy section.",
        tableHeaders: ["Data Type", "Collected", "Tracked", "Purpose"],
        rows: [
          ["Photos & Videos", "Yes (on-device only)", "No", "App Functionality (photo/video storage & management)"],
          ["Identifiers (Device ID)", "No", "No", "—"],
          ["Usage Data", "No", "No", "—"],
          ["Location", "No", "No", "—"],
          ["Contact Info", "No", "No", "—"],
          ["Name, Email, etc.", "No", "No", "—"],
        ],
        trackingNote: "\"Tracked\" = data used for third-party advertising or analytics purposes. The App does not send any data externally and does not track for advertising purposes.",
        languageNote: "The Japanese version of this Privacy Policy is the authoritative text.",
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
      japan: "개인정보보호법에 따라 다음과 같은 권리를 가집니다:",
      gdpr: "GDPR에 따라 다음과 같은 권리를 가집니다:",
      ccpa: "CCPA에 따라 다음과 같은 권리를 가집니다:",
    },
    sections: {
      intro: {
        title: "1. 소개",
        content: "PixVault(이하 \"본 앱\")는 사진과 동영상을 기기 내에 안전하게 저장하고 관리하기 위한 앱입니다. 본 개인정보 처리방침은 본 앱을 이용할 때의 데이터 처리에 대해 설명합니다.",
        consent: "본 앱을 이용함으로써 본 개인정보 처리방침에 기재된 내용에 동의한 것으로 간주됩니다. 동의하지 않으시는 경우 본 앱의 이용을 삼가해 주세요.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        localData: {
          title: "2-1. 기기 내에만 저장되는 데이터",
          photos: {
            title: "(a) 사진·동영상 데이터",
            items: [
              "사용자가 가져오거나 촬영한 사진·동영상",
              "자동 생성되는 썸네일 이미지",
              "사진 메타데이터(너비·높이·파일 크기·생성 날짜)",
              "동영상 메타데이터(재생 시간·파일 크기)",
              "모든 데이터는 앱 전용 폴더에 저장되며 외부로 전송되지 않습니다",
            ],
          },
          folders: {
            title: "(b) 폴더 정보",
            items: [
              "사용자가 생성한 폴더명·폴더 ID",
              "폴더 커버 사진 설정",
              "폴더 내 사진·동영상 관리 정보(metadata.json)",
            ],
          },
          settings: {
            title: "(c) 앱 설정",
            items: [
              "테마 색상 설정",
              "가져오기 시 원본 데이터 삭제 설정",
              "PIN 잠금 설정(PIN은 SHA-256 해시로 저장)",
            ],
          },
        },
        notCollected: {
          title: "2-2. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다:",
          items: [
            "성명·이메일·주소 등 개인 식별 정보(계정 등록 불필요)",
            "위치 정보",
            "연락처",
            "건강·피트니스 데이터",
            "광고 목적의 추적 데이터",
            "이용 현황 분석 데이터",
            "인터넷을 통해 외부로 전송되는 데이터",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "기기 내에 저장되는 데이터는 다음 목적으로만 사용됩니다:",
        tableHeaders: ["정보 유형", "이용 목적"],
        rows: [
          ["사진·동영상 데이터", "앱 내 열람·편집·관리"],
          ["썸네일 이미지", "갤러리 표시 고속화"],
          ["메타데이터", "파일 정보 표시·정렬 기능"],
          ["폴더 정보", "사진·동영상 정리·분류"],
          ["테마 설정", "UI 커스터마이즈 표시"],
          ["PIN 해시", "앱 잠금 인증"],
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스에 대한 정보 제공",
        content: "본 앱은 어떠한 제3자 서비스(광고 네트워크, 분석, 클라우드 스토리지 등)도 이용하지 않습니다. 사용자의 데이터는 일절 외부로 전송되지 않습니다.",
        important: "중요: 본 앱은 인터넷 연결이 필요하지 않으며 완전히 오프라인으로 작동합니다. 사용자의 개인정보를 판매·공유·제공하는 일은 일절 없습니다.",
      },
      retention: {
        title: "5. 데이터 보관 및 보존 기간",
        local: {
          title: "기기 내(로컬 스토리지)",
          intro: "모든 데이터는 사용자 기기 내 앱 전용 디렉토리에만 저장됩니다:",
          items: [
            "사진·동영상 파일(앱 전용 폴더)",
            "썸네일 이미지",
            "폴더·사진 메타데이터(metadata.json)",
            "앱 설정(AsyncStorage)",
            "PIN 해시(Secure Store / OS 수준의 안전한 스토리지)",
          ],
          deletion: "이러한 데이터는 앱을 삭제하면 완전히 삭제됩니다. 클라우드 동기화가 이루어지지 않으므로 재설치 시 데이터는 복원되지 않습니다.",
        },
        server: {
          title: "서버",
          content: "본 앱은 자체 서버를 보유하지 않으며 사용자 데이터를 서버에 전송하거나 저장하지 않습니다. 모든 데이터 처리는 기기 내에서 완료됩니다.",
        },
      },
      security: {
        title: "6. 데이터 보안",
        items: [
          "앱 전용 디렉토리: 사진·동영상은 다른 앱에서 접근할 수 없는 앱 전용 폴더에 저장됩니다",
          "PIN 잠금: 선택적 4자리 PIN으로 앱 잠금 기능을 제공합니다",
          "PIN 해시화: PIN은 SHA-256으로 솔트 해시화되어 Secure Store(OS 수준의 안전한 스토리지)에 저장됩니다",
          "오프라인 설계: 네트워크 통신을 일절 수행하지 않으므로 통신을 통한 데이터 유출 위험이 없습니다",
          "로컬 완결: 모든 데이터 처리(압축·편집·썸네일 생성 등)는 기기 내에서 수행됩니다",
        ],
        disclaimer: "다만, 기기의 분실·도난, 탈옥 등으로 기기 수준의 보안이 침해된 경우 앱 내 데이터의 안전성을 보장할 수 없습니다.",
      },
      children: {
        title: "7. 아동의 개인정보(COPPA 대응)",
        content: "본 앱은 13세 미만의 아동을 대상으로 하지 않으며, 의도적으로 13세 미만의 아동으로부터 개인정보를 수집하지 않습니다. 본 앱은 데이터를 일절 외부로 전송하지 않으므로 연령에 관계없이 개인정보가 보호됩니다.",
        action: "13세 미만의 아동이 본 앱을 이용하는 것에 대한 우려가 있는 보호자분은 아래 연락처로 문의해 주세요.",
      },
      userRights: {
        title: "8. 사용자의 권리",
        japan: {
          title: "8-1. 일본 내 사용자",
          items: [
            "보유한 개인정보의 공개 청구",
            "내용의 정정·추가·삭제 청구",
            "이용 정지·소거 청구",
          ],
        },
        gdpr: {
          title: "8-2. EEA·UK 사용자(GDPR)",
          items: [
            "접근권: 보유한 개인 데이터에 대한 접근",
            "정정권: 부정확한 개인 데이터의 정정",
            "삭제권(잊혀질 권리): 개인 데이터의 삭제",
            "처리 제한권: 개인 데이터 처리의 제한",
            "데이터 이동권: 데이터의 수령 및 이전",
            "이의 제기권: 개인 데이터 처리에 대한 이의",
          ],
        },
        ccpa: {
          title: "8-3. 캘리포니아주 사용자(CCPA)",
          items: [
            "수집하는 개인정보의 카테고리와 목적의 공개 청구",
            "개인정보의 삭제 청구",
            "개인정보 판매의 옵트아웃(당사는 개인정보를 판매하지 않습니다)",
          ],
        },
        howTo: {
          title: "권리 행사 방법",
          content: "본 앱은 모든 데이터를 기기 내에만 저장하므로 앱 삭제로 전체 데이터를 삭제할 수 있습니다. 개별 사진·동영상·폴더는 앱 내 삭제 기능으로 삭제할 수 있습니다. 기타 권리 행사에 대해서는 아래 연락처로 문의해 주세요.",
        },
      },
      cookies: {
        title: "9. 쿠키 및 추적 기술",
        content: "본 앱은 웹 브라우저에서 작동하는 것이 아니므로 쿠키를 사용하지 않습니다. 또한 어떠한 추적 기술(광고 ID, 분석 SDK 등)도 사용하지 않습니다. Apple의 App Tracking Transparency(ATT) 프레임워크가 요구하는 광고 목적의 추적을 실시하지 않으므로 ATT 프롬프트는 표시되지 않습니다.",
      },
      changes: {
        title: "10. 개인정보 처리방침의 변경",
        content: "당사는 본 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경이 발생한 경우 본 페이지 상단의 \"최종 업데이트\" 날짜를 변경하여 알려드립니다.",
        consent: "변경 후에도 본 앱을 계속 이용하시는 경우 업데이트된 개인정보 처리방침에 동의한 것으로 간주됩니다.",
      },
      contact: {
        title: "11. 문의하기",
        content: "본 개인정보 처리방침에 관한 질문이나 권리 행사 신청은 아래로 문의해 주세요:",
        email: "이메일",
        responseTime: "문의로부터 원칙적으로 30일 이내에 답변드리겠습니다.",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label 대응표",
        description: "App Store의 App Privacy 섹션을 위한 공개 정보입니다.",
        tableHeaders: ["데이터 유형", "수집 여부", "추적 여부", "이용 목적"],
        rows: [
          ["사진·동영상", "○(기기 내만)", "×", "App Functionality(사진·동영상 저장·관리)"],
          ["식별자(디바이스 ID)", "×", "×", "—"],
          ["이용 현황 데이터", "×", "×", "—"],
          ["위치 정보", "×", "×", "—"],
          ["연락처 정보", "×", "×", "—"],
          ["성명·이메일 등", "×", "×", "—"],
        ],
        trackingNote: "\"추적\" = 제3자의 광고·분석 목적으로의 데이터 이용. 본 앱은 어떠한 데이터도 외부로 전송하지 않으며 광고 목적으로 추적하지 않습니다.",
        languageNote: "본 개인정보 처리방침은 일본어를 정본으로 합니다.",
      },
    },
  },
  "zh-TW": {
    title: "隱私權政策",
    lastUpdated: "最後更新日期",
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
        title: "1. 前言",
        content: "PixVault（以下簡稱「本應用程式」）是一款用於在裝置上安全儲存和管理照片與影片的應用程式。本隱私權政策說明您使用本應用程式時的資料處理方式。",
        consent: "使用本應用程式即表示您同意本隱私權政策中所述的內容。如果您不同意，請停止使用本應用程式。",
      },
      dataCollection: {
        title: "2. 我們收集的資訊",
        localData: {
          title: "2-1. 僅儲存在裝置上的資料",
          photos: {
            title: "(a) 照片與影片資料",
            items: [
              "使用者匯入或拍攝的照片與影片",
              "自動生成的縮圖",
              "照片中繼資料（寬度、高度、檔案大小、建立日期）",
              "影片中繼資料（播放時長、檔案大小）",
              "所有資料均儲存在應用程式專用資料夾中，不會傳送到外部",
            ],
          },
          folders: {
            title: "(b) 資料夾資訊",
            items: [
              "使用者建立的資料夾名稱和資料夾 ID",
              "資料夾封面照片設定",
              "資料夾內照片與影片的管理資訊（metadata.json）",
            ],
          },
          settings: {
            title: "(c) 應用程式設定",
            items: [
              "主題顏色設定",
              "匯入時刪除原始資料設定",
              "PIN 鎖定設定（PIN 以 SHA-256 雜湊儲存）",
            ],
          },
        },
        notCollected: {
          title: "2-2. 我們不收集的資訊",
          intro: "本應用程式不收集以下任何資訊：",
          items: [
            "姓名、電子郵件、地址等個人識別資訊（無需帳號註冊）",
            "位置資訊",
            "聯絡人",
            "健康與健身資料",
            "廣告目的的追蹤資料",
            "使用情況分析資料",
            "透過網際網路傳送到外部的任何資料",
          ],
        },
      },
      purpose: {
        title: "3. 資料使用目的",
        intro: "儲存在裝置上的資料僅用於以下目的：",
        tableHeaders: ["資料類型", "使用目的"],
        rows: [
          ["照片與影片資料", "在應用程式內瀏覽、編輯和管理"],
          ["縮圖", "加速相簿顯示"],
          ["中繼資料", "檔案資訊顯示和排序功能"],
          ["資料夾資訊", "照片與影片的整理分類"],
          ["主題設定", "UI 自訂顯示"],
          ["PIN 雜湊", "應用程式鎖定驗證"],
        ],
      },
      thirdParty: {
        title: "4. 向第三方服務提供資訊",
        content: "本應用程式不使用任何第三方服務（廣告網路、分析、雲端儲存等）。使用者的資料不會傳送到外部。",
        important: "重要：本應用程式不需要網際網路連線，完全離線運作。我們絕不會出售、分享或向任何第三方提供使用者的個人資訊。",
      },
      retention: {
        title: "5. 資料儲存與保留期間",
        local: {
          title: "裝置內（本機儲存）",
          intro: "所有資料僅儲存在使用者裝置上的應用程式專用目錄中：",
          items: [
            "照片與影片檔案（應用程式專用資料夾）",
            "縮圖",
            "資料夾與照片中繼資料（metadata.json）",
            "應用程式設定（AsyncStorage）",
            "PIN 雜湊（Secure Store / 作業系統層級的安全儲存）",
          ],
          deletion: "解除安裝應用程式後，這些資料將被完全刪除。由於不進行雲端同步，重新安裝時資料無法恢復。",
        },
        server: {
          title: "伺服器",
          content: "本應用程式不擁有自己的伺服器，不會將使用者資料傳送或儲存到任何伺服器。所有資料處理均在裝置上完成。",
        },
      },
      security: {
        title: "6. 資料安全",
        items: [
          "應用程式專用目錄：照片與影片儲存在其他應用程式無法存取的專用資料夾中",
          "PIN 鎖定：提供可選的 4 位數 PIN 應用程式鎖定功能",
          "PIN 雜湊化：PIN 使用 SHA-256 加鹽雜湊後儲存在 Secure Store（作業系統層級的安全儲存）中",
          "離線設計：不進行任何網路通訊，消除了透過傳輸洩露資料的風險",
          "本機完成：所有資料處理（壓縮、編輯、縮圖生成等）均在裝置上進行",
        ],
        disclaimer: "但是，如果裝置遺失、被盜、越獄等導致裝置層級的安全性受到損害，我們無法保證應用程式內資料的安全性。",
      },
      children: {
        title: "7. 兒童隱私（COPPA 合規）",
        content: "本應用程式不以 13 歲以下的兒童為對象，也不會故意收集 13 歲以下兒童的個人資訊。由於本應用程式不會將任何資料傳送到外部，因此無論年齡如何，隱私都受到保護。",
        action: "如果您是家長或監護人，對 13 歲以下的兒童使用本應用程式有任何疑慮，請使用以下聯繫方式與我們聯繫。",
      },
      userRights: {
        title: "8. 使用者權利",
        japan: {
          title: "8-1. 日本境內的使用者",
          items: [
            "要求公開持有的個人資訊",
            "要求更正、補充或刪除內容",
            "要求停止使用或消除",
          ],
        },
        gdpr: {
          title: "8-2. EEA 和英國使用者（GDPR）",
          items: [
            "存取權：存取持有的個人資料",
            "更正權：更正不準確的個人資料",
            "刪除權（被遺忘權）：刪除個人資料",
            "處理限制權：限制個人資料處理",
            "資料可攜權：接收和轉移資料",
            "反對權：反對處理個人資料",
          ],
        },
        ccpa: {
          title: "8-3. 加州使用者（CCPA）",
          items: [
            "要求公開收集的個人資訊類別和目的",
            "要求刪除個人資訊",
            "選擇退出個人資訊出售（我們不出售個人資訊）",
          ],
        },
        howTo: {
          title: "行使權利的方式",
          content: "由於本應用程式僅在裝置上儲存所有資料，您可以透過解除安裝應用程式來刪除所有資料。個別的照片、影片和資料夾可以使用應用程式內的刪除功能刪除。有關其他權利的行使，請使用以下聯繫方式與我們聯繫。",
        },
      },
      cookies: {
        title: "9. Cookie 和追蹤技術",
        content: "本應用程式不在網頁瀏覽器上運作，因此不使用 Cookie。此外，也不使用任何追蹤技術（廣告 ID、分析 SDK 等）。由於我們不進行 Apple App Tracking Transparency（ATT）框架要求的廣告目的追蹤，因此不會顯示 ATT 提示。",
      },
      changes: {
        title: "10. 隱私權政策的變更",
        content: "我們可能會不時更新本隱私權政策。如果發生重大變更，我們將透過更新本頁面頂部的「最後更新日期」來通知您。",
        consent: "如果您在變更後繼續使用本應用程式，即表示您同意更新後的隱私權政策。",
      },
      contact: {
        title: "11. 聯繫我們",
        content: "如果您對本隱私權政策有任何疑問或需要行使您的權利，請透過以下方式聯繫我們：",
        email: "電子郵件",
        responseTime: "我們原則上會在收到諮詢後 30 天內回覆。",
      },
      appStoreLabel: {
        title: "App Store 隱私營養標籤對照表",
        description: "App Store App Privacy 區段的公開資訊。",
        tableHeaders: ["資料類型", "是否收集", "是否追蹤", "使用目的"],
        rows: [
          ["照片與影片", "○（僅限裝置內）", "×", "App Functionality（照片與影片的儲存與管理）"],
          ["識別碼（裝置 ID）", "×", "×", "—"],
          ["使用情況資料", "×", "×", "—"],
          ["位置資訊", "×", "×", "—"],
          ["聯絡資訊", "×", "×", "—"],
          ["姓名、電子郵件等", "×", "×", "—"],
        ],
        trackingNote: "「追蹤」= 將資料用於第三方廣告或分析目的。本應用程式不會將任何資料傳送到外部，也不會為廣告目的進行追蹤。",
        languageNote: "本隱私權政策以日文版為正式文本。",
      },
    },
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث",
    lastUpdatedDate: LAST_UPDATED_AR,
    backToSupport: "العودة إلى صفحة الدعم",
    tableOfContents: "جدول المحتويات",
    userRightsIntro: {
      japan: "بموجب قانون حماية المعلومات الشخصية، لديك الحقوق التالية:",
      gdpr: "بموجب اللائحة العامة لحماية البيانات، لديك الحقوق التالية:",
      ccpa: "بموجب قانون خصوصية المستهلك في كاليفورنيا، لديك الحقوق التالية:",
    },
    sections: {
      intro: {
        title: "1. مقدمة",
        content: "PixVault (المشار إليه فيما يلي بـ \"التطبيق\") هو تطبيق لتخزين وإدارة الصور ومقاطع الفيديو بشكل آمن على جهازك. توضح سياسة الخصوصية هذه كيفية التعامل مع البيانات عند استخدام التطبيق.",
        consent: "باستخدام التطبيق، فإنك توافق على الشروط الموضحة في سياسة الخصوصية هذه. إذا كنت لا توافق، يرجى الامتناع عن استخدام التطبيق.",
      },
      dataCollection: {
        title: "2. المعلومات التي نجمعها",
        localData: {
          title: "2-1. البيانات المخزنة على جهازك فقط",
          photos: {
            title: "(أ) بيانات الصور والفيديو",
            items: [
              "الصور ومقاطع الفيديو التي يستوردها أو يلتقطها المستخدم",
              "الصور المصغرة المولدة تلقائيًا",
              "بيانات وصفية للصور (العرض، الارتفاع، حجم الملف، تاريخ الإنشاء)",
              "بيانات وصفية للفيديو (المدة، حجم الملف)",
              "يتم تخزين جميع البيانات في مجلد خاص بالتطبيق ولا يتم إرسالها خارجيًا أبدًا",
            ],
          },
          folders: {
            title: "(ب) معلومات المجلدات",
            items: [
              "أسماء المجلدات ومعرفات المجلدات التي أنشأها المستخدم",
              "إعدادات صورة غلاف المجلد",
              "معلومات إدارة الصور/مقاطع الفيديو داخل المجلدات (metadata.json)",
            ],
          },
          settings: {
            title: "(ج) إعدادات التطبيق",
            items: [
              "إعدادات لون السمة",
              "إعداد حذف البيانات الأصلية عند الاستيراد",
              "إعدادات قفل PIN (يتم تخزين PIN كتجزئة SHA-256)",
            ],
          },
        },
        notCollected: {
          title: "2-2. المعلومات التي لا نجمعها",
          intro: "لا يجمع التطبيق أيًا من المعلومات التالية:",
          items: [
            "معلومات التعريف الشخصية مثل الاسم أو البريد الإلكتروني أو العنوان (لا حاجة لتسجيل حساب)",
            "بيانات الموقع",
            "جهات الاتصال",
            "بيانات الصحة واللياقة البدنية",
            "بيانات التتبع لأغراض إعلانية",
            "بيانات تحليلات الاستخدام",
            "أي بيانات يتم إرسالها خارجيًا عبر الإنترنت",
          ],
        },
      },
      purpose: {
        title: "3. الغرض من استخدام البيانات",
        intro: "تُستخدم البيانات المخزنة على الجهاز للأغراض التالية فقط:",
        tableHeaders: ["نوع البيانات", "الغرض"],
        rows: [
          ["بيانات الصور والفيديو", "العرض والتحرير والإدارة داخل التطبيق"],
          ["الصور المصغرة", "تسريع عرض المعرض"],
          ["البيانات الوصفية", "عرض معلومات الملف والفرز"],
          ["معلومات المجلدات", "تنظيم وتصنيف الصور/مقاطع الفيديو"],
          ["إعدادات السمة", "تخصيص واجهة المستخدم"],
          ["تجزئة PIN", "مصادقة قفل التطبيق"],
        ],
      },
      thirdParty: {
        title: "4. خدمات الطرف الثالث",
        content: "لا يستخدم التطبيق أي خدمات طرف ثالث (شبكات إعلانية، تحليلات، تخزين سحابي، إلخ). لا يتم إرسال بيانات المستخدم خارجيًا أبدًا.",
        important: "هام: لا يتطلب التطبيق اتصالاً بالإنترنت ويعمل بالكامل دون اتصال. لن نقوم أبدًا ببيع أو مشاركة أو تقديم المعلومات الشخصية للمستخدمين لأي طرف ثالث.",
      },
      retention: {
        title: "5. تخزين البيانات والاحتفاظ بها",
        local: {
          title: "على الجهاز (التخزين المحلي)",
          intro: "يتم تخزين جميع البيانات حصريًا في الدليل الخاص بالتطبيق على جهاز المستخدم:",
          items: [
            "ملفات الصور والفيديو (مجلد خاص بالتطبيق)",
            "الصور المصغرة",
            "بيانات وصفية للمجلدات والصور (metadata.json)",
            "إعدادات التطبيق (AsyncStorage)",
            "تجزئة PIN (Secure Store / تخزين آمن على مستوى نظام التشغيل)",
          ],
          deletion: "يتم حذف جميع البيانات نهائيًا عند إلغاء تثبيت التطبيق. نظرًا لعدم وجود مزامنة سحابية، لا يمكن استعادة البيانات عند إعادة التثبيت.",
        },
        server: {
          title: "الخادم",
          content: "لا يمتلك التطبيق خادمًا خاصًا به ولا يرسل أو يخزن بيانات المستخدم على أي خادم. تتم جميع عمليات معالجة البيانات على الجهاز.",
        },
      },
      security: {
        title: "6. أمان البيانات",
        items: [
          "دليل خاص بالتطبيق: يتم تخزين الصور ومقاطع الفيديو في مجلد خاص لا يمكن للتطبيقات الأخرى الوصول إليه",
          "قفل PIN: تتوفر ميزة قفل اختيارية برمز PIN مكون من 4 أرقام",
          "تجزئة PIN: يتم تجزئة رمز PIN باستخدام SHA-256 مع ملح وتخزينه في Secure Store (تخزين آمن على مستوى نظام التشغيل)",
          "تصميم بدون اتصال: لا يتم إجراء أي اتصال شبكي، مما يلغي خطر تسرب البيانات عبر الإرسال",
          "معالجة محلية: تتم جميع عمليات معالجة البيانات (الضغط، التحرير، إنشاء الصور المصغرة، إلخ) على الجهاز",
        ],
        disclaimer: "ومع ذلك، لا يمكننا ضمان أمان البيانات داخل التطبيق إذا تم اختراق أمان الجهاز من خلال الفقدان أو السرقة أو كسر الحماية وما إلى ذلك.",
      },
      children: {
        title: "7. خصوصية الأطفال (COPPA)",
        content: "التطبيق غير مخصص للأطفال دون سن 13 عامًا، ولا نقوم بجمع معلومات شخصية من الأطفال دون سن 13 عامًا عن قصد. نظرًا لأن التطبيق لا يرسل أي بيانات خارجيًا، فإن الخصوصية محمية بغض النظر عن العمر.",
        action: "إذا كنت والدًا أو وصيًا ولديك مخاوف بشأن طفل دون سن 13 عامًا يستخدم التطبيق، يرجى التواصل معنا باستخدام المعلومات أدناه.",
      },
      userRights: {
        title: "8. حقوق المستخدم",
        japan: {
          title: "8-1. المستخدمون في اليابان",
          items: [
            "طلب الكشف عن المعلومات الشخصية المحتفظ بها",
            "طلب تصحيح أو إضافة أو حذف المعلومات",
            "طلب تعليق أو محو الاستخدام",
          ],
        },
        gdpr: {
          title: "8-2. مستخدمو المنطقة الاقتصادية الأوروبية والمملكة المتحدة (GDPR)",
          items: [
            "حق الوصول: الوصول إلى البيانات الشخصية المحتفظ بها",
            "حق التصحيح: تصحيح البيانات الشخصية غير الدقيقة",
            "حق المحو (الحق في النسيان): حذف البيانات الشخصية",
            "حق تقييد المعالجة: تقييد معالجة البيانات الشخصية",
            "حق نقل البيانات: استلام ونقل البيانات",
            "حق الاعتراض: الاعتراض على معالجة البيانات الشخصية",
          ],
        },
        ccpa: {
          title: "8-3. مستخدمو كاليفورنيا (CCPA)",
          items: [
            "طلب الكشف عن فئات وأغراض المعلومات الشخصية المجمعة",
            "طلب حذف المعلومات الشخصية",
            "إلغاء الاشتراك في بيع المعلومات الشخصية (نحن لا نبيع المعلومات الشخصية)",
          ],
        },
        howTo: {
          title: "كيفية ممارسة حقوقك",
          content: "نظرًا لأن التطبيق يخزن جميع البيانات على الجهاز فقط، يمكنك حذف جميع البيانات عن طريق إلغاء تثبيت التطبيق. يمكن حذف الصور ومقاطع الفيديو والمجلدات الفردية باستخدام وظيفة الحذف داخل التطبيق. لممارسة حقوق أخرى، يرجى التواصل معنا باستخدام المعلومات أدناه.",
        },
      },
      cookies: {
        title: "9. ملفات تعريف الارتباط وتقنيات التتبع",
        content: "لا يعمل التطبيق في متصفح ويب، لذا لا يتم استخدام ملفات تعريف الارتباط. بالإضافة إلى ذلك، لا يتم استخدام أي تقنيات تتبع (معرفات إعلانية، حزم تحليلات SDK، إلخ). نظرًا لأننا لا نجري تتبعًا لأغراض إعلانية كما يتطلبه إطار عمل App Tracking Transparency (ATT) من Apple، فلا يتم عرض مطالبة ATT.",
      },
      changes: {
        title: "10. التغييرات على سياسة الخصوصية",
        content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. إذا حدثت تغييرات جوهرية، سنقوم بإخطارك عن طريق تحديث تاريخ \"آخر تحديث\" في أعلى هذه الصفحة.",
        consent: "إذا واصلت استخدام التطبيق بعد إجراء التغييرات، فسيُعتبر أنك وافقت على سياسة الخصوصية المحدثة.",
      },
      contact: {
        title: "11. اتصل بنا",
        content: "للأسئلة حول سياسة الخصوصية هذه أو لممارسة حقوقك، يرجى التواصل معنا على:",
        email: "البريد الإلكتروني",
        responseTime: "سنرد على استفسارك خلال 30 يومًا كحد أقصى.",
      },
      appStoreLabel: {
        title: "ملصق خصوصية App Store",
        description: "معلومات الإفصاح لقسم خصوصية التطبيق في App Store.",
        tableHeaders: ["نوع البيانات", "يتم جمعها", "يتم تتبعها", "الغرض"],
        rows: [
          ["الصور والفيديو", "نعم (على الجهاز فقط)", "لا", "وظائف التطبيق (تخزين وإدارة الصور/الفيديو)"],
          ["المعرفات (معرف الجهاز)", "لا", "لا", "—"],
          ["بيانات الاستخدام", "لا", "لا", "—"],
          ["الموقع", "لا", "لا", "—"],
          ["معلومات الاتصال", "لا", "لا", "—"],
          ["الاسم، البريد الإلكتروني، إلخ.", "لا", "لا", "—"],
        ],
        trackingNote: "\"التتبع\" = استخدام البيانات لأغراض الإعلان أو التحليل من قبل طرف ثالث. لا يرسل التطبيق أي بيانات خارجيًا ولا يتتبع لأغراض إعلانية.",
        languageNote: "النص الياباني لسياسة الخصوصية هذه هو النص الرسمي.",
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
    <div className="flex flex-wrap justify-center gap-2 mb-6">
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
        <span className="w-1 h-5 bg-gray-600 rounded-full flex-shrink-0"></span>
        {title}
      </h2>
      <div className="pl-3">{children}</div>
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
export default function PixVaultPrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const currentYear = new Date().getFullYear();

  const tocItems = [
    s.intro.title,
    s.dataCollection.title,
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
              alt="PixVault"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">PixVault</h1>
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

          {/* 3. 情報の利用目的 */}
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

          {/* 4. 第三者サービスへの情報提供 */}
          <Section title={s.thirdParty.title}>
            <p className="text-gray-700 leading-relaxed mb-4">{s.thirdParty.content}</p>
            <ImportantBox>{s.thirdParty.important}</ImportantBox>
          </Section>

          {/* 5. データの保存と保持期間 */}
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

          {/* 6. データのセキュリティ */}
          <Section title={s.security.title}>
            <div className="bg-blue-50 rounded-lg p-4 mb-3">
              <CheckList items={s.security.items} />
            </div>
            <p className="text-gray-600 text-sm">{s.security.disclaimer}</p>
          </Section>

          {/* 7. お子様のプライバシー */}
          <Section title={s.children.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.children.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.children.action}</p>
          </Section>

          {/* 8. ユーザーの権利 */}
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

          {/* 9. Cookie */}
          <Section title={s.cookies.title}>
            <p className="text-gray-700 leading-relaxed">{s.cookies.content}</p>
          </Section>

          {/* 10. プライバシーポリシーの変更 */}
          <Section title={s.changes.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.changes.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.changes.consent}</p>
          </Section>

          {/* 11. お問い合わせ */}
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
