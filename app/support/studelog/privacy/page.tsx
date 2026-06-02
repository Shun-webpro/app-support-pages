"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/studelog.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年6月2日";
const LAST_UPDATED_EN = "June 2, 2026";
const LAST_UPDATED_KO = "2026년 6월 2일";

type Language = "ja" | "ko" | "en" | "zh-TW" | "zh" | "ar" | "es" | "fr" | "pt" | "de";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
  { code: "zh", label: "简体中文", flag: "🇨🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷🇵🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
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
        content: "StudyLog（以下「本アプリ」）は、勉強時間の計測・記録・可視化をサポートするアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータはすべてお使いの端末内にのみ保存されます。外部サーバーへの送信は一切行いません：",
          items: [
            "勉強記録（開始時刻・終了時刻・所要時間・教科）",
            "教科データ（名前・カラー）",
            "Todoデータ（タイトル・期日・教科・リマインダー設定）",
            "1日の目標勉強時間",
            "アプリ設定（テーマカラー・ダークモード・アラーム音・セキュリティ設定など）",
          ],
        },
        notCollected: {
          title: "2-2. 収集しない情報",
          intro: "本アプリは以下の情報を一切収集しません：",
          items: [
            "氏名・メールアドレス・住所などの個人識別情報",
            "位置情報",
            "連絡先",
            "カメラ・マイクへのアクセス",
            "広告目的のトラッキングデータ",
            "クラッシュレポートや利用統計の外部送信",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "端末内に保存されたデータは、以下の目的にのみ使用されます：",
        items: [
          "勉強記録の表示・グラフ化・統計計算",
          "Todoリマインダー通知の送信（端末内の通知機能のみ使用）",
          "パスコードロックおよび生体認証によるアプリのセキュリティ保護",
          "ユーザー設定の保持",
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        content: "本アプリは、ユーザーのデータを第三者に提供・販売・共有することは一切ありません。外部APIや広告SDKは使用していません。すべての機能はお使いの端末のみで動作します。",
      },
      retention: {
        title: "5. データの保存と削除",
        content: "すべてのデータはお使いの端末内にのみ保存されます。クラウドへのアップロードや外部バックアップは行いません。",
        deletion: "アプリをアンインストールすることで、すべてのデータが端末から削除されます。iCloudバックアップをONにしている場合、端末バックアップにアプリデータが含まれることがありますが、これはAppleのiCloudサービスによるものです。",
      },
      permissions: {
        title: "6. アプリが使用する権限",
        intro: "本アプリは以下の端末権限を使用します：",
        items: [
          {
            name: "通知",
            detail: "Todoリマインダーを送信するために使用します。通知はすべてデバイス上でスケジュールされ、外部サーバーを介しません。",
          },
          {
            name: "Face ID / Touch ID（生体認証）",
            detail: "パスコードロック機能のロック解除に使用します。生体情報はAppleのセキュアエンクレーブで管理され、当社は一切アクセスしません。",
          },
        ],
      },
      security: {
        title: "7. セキュリティ",
        items: [
          "すべてのデータは端末内にのみ保存され、ネットワーク通信は行いません",
          "パスコードロック機能により、第三者によるアプリへの不正アクセスを防止できます",
          "生体認証（Face ID / Touch ID）はAppleのシステムを通じて安全に処理されます",
        ],
        disclaimer: "端末の紛失・盗難に備え、iPhoneのパスコードおよびアプリ内パスコードを適切に管理してください。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは13歳未満の子供を対象としておらず、意図的に13歳未満の子供から個人情報を収集することはありません。",
        action: "お子様が本アプリを利用していることをご存知の保護者の方は、下記お問い合わせ先までご連絡ください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        intro: "本アプリはすべてのデータを端末内に保存しているため、ユーザーはいつでも以下の操作が可能です：",
        items: [
          "アプリ内から個別の記録を削除する",
          "教科・Todoを削除する",
          "アプリをアンインストールしてすべてのデータを削除する",
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
        content: "StudyLog(이하 \"본 앱\")는 공부 시간 측정・기록・시각화를 지원하는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 정보 처리 방식에 대해 설명합니다.",
        consent: "본 앱을 이용하시면 본 개인정보 처리방침에 동의한 것으로 간주됩니다.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        local: {
          title: "2-1. 기기 내에 저장되는 데이터",
          intro: "다음 데이터는 모두 사용 중인 기기 내에만 저장됩니다. 외부 서버로의 전송은 일절 하지 않습니다:",
          items: [
            "학습 기록(시작 시각・종료 시각・소요 시간・과목)",
            "과목 데이터(이름・색상)",
            "Todo 데이터(제목・기한・과목・알림 설정)",
            "1일 목표 공부 시간",
            "앱 설정(테마 색상・다크 모드・알람 소리・보안 설정 등)",
          ],
        },
        notCollected: {
          title: "2-2. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다:",
          items: [
            "이름, 이메일 주소, 주소 등 개인 식별 정보",
            "위치 정보",
            "연락처",
            "카메라・마이크 접근",
            "광고 목적의 트래킹 데이터",
            "크래시 리포트나 이용 통계의 외부 전송",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "기기 내에 저장된 데이터는 다음 목적에만 사용됩니다:",
        items: [
          "학습 기록의 표시・그래프화・통계 계산",
          "Todo 리마인더 알림 전송(기기 내 알림 기능만 사용)",
          "패스코드 잠금 및 생체 인증에 의한 앱 보안 보호",
          "사용자 설정 보존",
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스에 대한 정보 제공",
        content: "본 앱은 사용자의 데이터를 제3자에게 제공・판매・공유하지 않습니다. 외부 API나 광고 SDK는 사용하지 않습니다. 모든 기능은 사용 중인 기기에서만 동작합니다.",
      },
      retention: {
        title: "5. 데이터 저장 및 삭제",
        content: "모든 데이터는 사용 중인 기기 내에만 저장됩니다. 클라우드 업로드나 외부 백업은 하지 않습니다.",
        deletion: "앱을 삭제하면 모든 데이터가 기기에서 삭제됩니다. iCloud 백업을 ON으로 설정한 경우, 기기 백업에 앱 데이터가 포함될 수 있으나, 이는 Apple의 iCloud 서비스에 의한 것입니다.",
      },
      permissions: {
        title: "6. 앱이 사용하는 권한",
        intro: "본 앱은 다음 기기 권한을 사용합니다:",
        items: [
          {
            name: "알림",
            detail: "Todo 리마인더를 전송하기 위해 사용합니다. 모든 알림은 기기에서 예약되며 외부 서버를 거치지 않습니다.",
          },
          {
            name: "Face ID / Touch ID(생체 인증)",
            detail: "패스코드 잠금 기능 해제에 사용합니다. 생체 정보는 Apple의 시큐어 엔클레이브에서 관리되며, 당사는 일절 접근하지 않습니다.",
          },
        ],
      },
      security: {
        title: "7. 보안",
        items: [
          "모든 데이터는 기기 내에만 저장되며, 네트워크 통신은 하지 않습니다",
          "패스코드 잠금 기능으로 제3자에 의한 앱 부정 접근을 방지할 수 있습니다",
          "생체 인증(Face ID / Touch ID)은 Apple의 시스템을 통해 안전하게 처리됩니다",
        ],
        disclaimer: "기기 분실・도난에 대비하여 iPhone 패스코드 및 앱 내 패스코드를 적절히 관리해 주세요.",
      },
      children: {
        title: "8. 아동의 개인정보",
        content: "본 앱은 13세 미만 아동을 대상으로 하지 않으며, 의도적으로 13세 미만 아동의 개인정보를 수집하지 않습니다.",
        action: "자녀가 본 앱을 이용하고 있음을 알고 계신 보호자께서는 아래 연락처로 문의해 주세요.",
      },
      userRights: {
        title: "9. 사용자의 권리",
        intro: "본 앱은 모든 데이터를 기기 내에 저장하므로, 사용자는 언제든지 다음 작업이 가능합니다:",
        items: [
          "앱 내에서 개별 기록을 삭제한다",
          "과목・Todo를 삭제한다",
          "앱을 삭제하여 모든 데이터를 삭제한다",
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
        content: "StudyLog (\"the App\") is an app that helps you measure, record, and visualize your study time. This Privacy Policy explains how information is handled when you use the App.",
        consent: "By using the App, you consent to the practices described in this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        local: {
          title: "2-1. Data Stored on Device",
          intro: "All of the following data is stored only on your device. No data is sent to external servers:",
          items: [
            "Study records (start time, end time, duration, subject)",
            "Subject data (name, color)",
            "Todo data (title, due date, subject, reminder settings)",
            "Daily study goal",
            "App settings (theme color, dark mode, alarm sound, security settings, etc.)",
          ],
        },
        notCollected: {
          title: "2-2. Information We Do Not Collect",
          intro: "The App does not collect any of the following:",
          items: [
            "Personally identifiable information such as name, email address, or physical address",
            "Location data",
            "Contacts",
            "Camera or microphone access",
            "Tracking data for advertising purposes",
            "Crash reports or usage statistics sent externally",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Use",
        intro: "Data stored on your device is used only for the following purposes:",
        items: [
          "Displaying, charting, and calculating statistics for study records",
          "Sending Todo reminder notifications (using only on-device notification features)",
          "Protecting the app with passcode lock and biometric authentication",
          "Saving user preferences",
        ],
      },
      thirdParty: {
        title: "4. Information Sharing with Third Parties",
        content: "The App does not provide, sell, or share user data with any third parties. No external APIs or advertising SDKs are used. All features operate entirely on your device.",
      },
      retention: {
        title: "5. Data Storage and Deletion",
        content: "All data is stored only on your device. No cloud uploads or external backups are performed.",
        deletion: "Uninstalling the App will delete all data from your device. If iCloud Backup is enabled, app data may be included in your device backup, which is managed by Apple's iCloud service.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following device permissions:",
        items: [
          {
            name: "Notifications",
            detail: "Used to send Todo reminders. All notifications are scheduled on-device and do not pass through external servers.",
          },
          {
            name: "Face ID / Touch ID (Biometric Authentication)",
            detail: "Used to unlock the passcode lock feature. Biometric data is managed by Apple's Secure Enclave and is never accessed by us.",
          },
        ],
      },
      security: {
        title: "7. Security",
        items: [
          "All data is stored only on your device with no network communication",
          "The passcode lock feature prevents unauthorized access to the app by third parties",
          "Biometric authentication (Face ID / Touch ID) is processed securely through Apple's system",
        ],
        disclaimer: "Please manage your iPhone passcode and in-app passcode appropriately to protect against device loss or theft.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App is not intended for children under 13 years of age, and we do not intentionally collect personal information from children under 13.",
        action: "If you are a parent or guardian and know that your child is using the App, please contact us at the address below.",
      },
      userRights: {
        title: "9. Your Rights",
        intro: "Since all data is stored on your device, you can at any time:",
        items: [
          "Delete individual records from within the app",
          "Delete subjects or Todos",
          "Uninstall the app to delete all data",
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
  "zh-TW": {
    title: "隱私權政策",
    lastUpdated: "最後更新日期",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "返回支援頁面",
    sections: {
      intro: {
        title: "1. 簡介",
        content: "StudyLog（以下簡稱「本應用程式」）是一款支援學習時間計時、記錄和視覺化的應用程式。本隱私權政策說明使用本應用程式時的資訊處理方式。",
        consent: "使用本應用程式即表示您同意本隱私權政策所述內容。",
      },
      dataCollection: {
        title: "2. 收集的資訊",
        local: {
          title: "2-1. 儲存於裝置內的資料",
          intro: "以下所有資料僅儲存於您的裝置內。不會傳送至外部伺服器：",
          items: [
            "學習記錄（開始時間、結束時間、所用時間、科目）",
            "科目資料（名稱、顏色）",
            "Todo 資料（標題、截止日期、科目、提醒設定）",
            "每日學習目標",
            "應用程式設定（主題色、深色模式、鬧鐘音效、安全設定等）",
          ],
        },
        notCollected: {
          title: "2-2. 不收集的資訊",
          intro: "本應用程式不收集以下任何資訊：",
          items: [
            "姓名、電子郵件地址、住址等個人識別資訊",
            "位置資訊",
            "聯絡人",
            "相機或麥克風存取",
            "廣告目的的追蹤資料",
            "對外傳送的當機報告或使用統計",
          ],
        },
      },
      purpose: {
        title: "3. 使用目的",
        intro: "裝置內儲存的資料僅用於以下目的：",
        items: [
          "顯示、圖表化及統計計算學習記錄",
          "傳送 Todo 提醒通知（僅使用裝置內的通知功能）",
          "以密碼鎖定和生物辨識保護應用程式安全",
          "儲存使用者設定",
        ],
      },
      thirdParty: {
        title: "4. 向第三方提供資訊",
        content: "本應用程式不向任何第三方提供、出售或共享使用者資料。不使用外部 API 或廣告 SDK。所有功能完全在您的裝置上運作。",
      },
      retention: {
        title: "5. 資料儲存與刪除",
        content: "所有資料僅儲存於您的裝置內。不進行雲端上傳或外部備份。",
        deletion: "解除安裝應用程式後，所有資料將從您的裝置中刪除。若 iCloud 備份已開啟，應用程式資料可能包含在裝置備份中，此為 Apple iCloud 服務的機制。",
      },
      permissions: {
        title: "6. 應用程式使用的權限",
        intro: "本應用程式使用以下裝置權限：",
        items: [
          {
            name: "通知",
            detail: "用於傳送 Todo 提醒。所有通知均在裝置上排程，不經過外部伺服器。",
          },
          {
            name: "Face ID / Touch ID（生物辨識）",
            detail: "用於解除密碼鎖定功能。生物辨識資料由 Apple 的安全晶片管理，本公司不進行任何存取。",
          },
        ],
      },
      security: {
        title: "7. 安全性",
        items: [
          "所有資料僅儲存於裝置內，不進行網路通訊",
          "密碼鎖定功能可防止第三方未授權存取應用程式",
          "生物辨識（Face ID / Touch ID）透過 Apple 系統安全處理",
        ],
        disclaimer: "請妥善管理您的 iPhone 密碼及應用程式內密碼，以防裝置遺失或遭竊。",
      },
      children: {
        title: "8. 兒童隱私",
        content: "本應用程式不針對 13 歲以下兒童，不會故意收集 13 歲以下兒童的個人資訊。",
        action: "若您知道您的孩子正在使用本應用程式，請透過以下聯絡方式與我們聯繫。",
      },
      userRights: {
        title: "9. 使用者權利",
        intro: "由於所有資料均儲存於裝置內，您可以隨時：",
        items: [
          "從應用程式內刪除個別記錄",
          "刪除科目或 Todo",
          "解除安裝應用程式以刪除所有資料",
        ],
        howTo: {
          title: "其他詢問",
          content: "如有任何隱私相關問題，請透過以下聯絡方式與我們聯繫。",
        },
      },
      changes: {
        title: "10. 隱私權政策的變更",
        content: "本隱私權政策可能隨時更新。若發生重大變更，將透過更新本頁頂部的「最後更新日期」告知您。變更後繼續使用本應用程式，即視為同意更新後的政策。",
      },
      contact: {
        title: "11. 聯絡我們",
        content: "如對本隱私權政策有任何疑問，請透過以下方式聯絡：",
        email: "電子郵件",
        responseTime: "我們原則上將於收到詢問後 30 天內回覆。",
      },
    },
  },
  zh: {
    title: "隐私政策",
    lastUpdated: "最后更新日期",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "返回支持页面",
    sections: {
      intro: {
        title: "1. 简介",
        content: "StudyLog（以下简称「本应用」）是一款支持学习时间计时、记录和可视化的应用。本隐私政策说明使用本应用时的信息处理方式。",
        consent: "使用本应用即表示您同意本隐私政策所述内容。",
      },
      dataCollection: {
        title: "2. 收集的信息",
        local: {
          title: "2-1. 存储于设备内的数据",
          intro: "以下所有数据仅存储于您的设备内。不会发送至外部服务器：",
          items: [
            "学习记录（开始时间、结束时间、所用时间、科目）",
            "科目数据（名称、颜色）",
            "Todo 数据（标题、截止日期、科目、提醒设置）",
            "每日学习目标",
            "应用设置（主题色、深色模式、闹钟声音、安全设置等）",
          ],
        },
        notCollected: {
          title: "2-2. 不收集的信息",
          intro: "本应用不收集以下任何信息：",
          items: [
            "姓名、电子邮件地址、住址等个人识别信息",
            "位置信息",
            "联系人",
            "相机或麦克风访问",
            "广告目的的追踪数据",
            "对外发送的崩溃报告或使用统计",
          ],
        },
      },
      purpose: {
        title: "3. 使用目的",
        intro: "设备内存储的数据仅用于以下目的：",
        items: [
          "显示、图表化及统计计算学习记录",
          "发送 Todo 提醒通知（仅使用设备内的通知功能）",
          "以密码锁定和生物识别保护应用安全",
          "保存用户设置",
        ],
      },
      thirdParty: {
        title: "4. 向第三方提供信息",
        content: "本应用不向任何第三方提供、出售或共享用户数据。不使用外部 API 或广告 SDK。所有功能完全在您的设备上运行。",
      },
      retention: {
        title: "5. 数据存储与删除",
        content: "所有数据仅存储于您的设备内。不进行云端上传或外部备份。",
        deletion: "卸载应用后，所有数据将从您的设备中删除。若 iCloud 备份已开启，应用数据可能包含在设备备份中，此为 Apple iCloud 服务的机制。",
      },
      permissions: {
        title: "6. 应用使用的权限",
        intro: "本应用使用以下设备权限：",
        items: [
          {
            name: "通知",
            detail: "用于发送 Todo 提醒。所有通知均在设备上调度，不经过外部服务器。",
          },
          {
            name: "Face ID / Touch ID（生物识别）",
            detail: "用于解除密码锁定功能。生物识别数据由 Apple 的安全芯片管理，本公司不进行任何访问。",
          },
        ],
      },
      security: {
        title: "7. 安全性",
        items: [
          "所有数据仅存储于设备内，不进行网络通信",
          "密码锁定功能可防止第三方未授权访问应用",
          "生物识别（Face ID / Touch ID）通过 Apple 系统安全处理",
        ],
        disclaimer: "请妥善管理您的 iPhone 密码及应用内密码，以防设备丢失或被盗。",
      },
      children: {
        title: "8. 儿童隐私",
        content: "本应用不针对 13 岁以下儿童，不会故意收集 13 岁以下儿童的个人信息。",
        action: "若您知道您的孩子正在使用本应用，请通过以下联系方式与我们联系。",
      },
      userRights: {
        title: "9. 用户权利",
        intro: "由于所有数据均存储于设备内，您可以随时：",
        items: [
          "从应用内删除个别记录",
          "删除科目或 Todo",
          "卸载应用以删除所有数据",
        ],
        howTo: {
          title: "其他询问",
          content: "如有任何隐私相关问题，请通过以下联系方式与我们联系。",
        },
      },
      changes: {
        title: "10. 隐私政策的变更",
        content: "本隐私政策可能随时更新。若发生重大变更，将通过更新本页顶部的「最后更新日期」告知您。变更后继续使用本应用，即视为同意更新后的政策。",
      },
      contact: {
        title: "11. 联系我们",
        content: "如对本隐私政策有任何疑问，请通过以下方式联系：",
        email: "电子邮件",
        responseTime: "我们原则上将于收到询问后 30 天内回复。",
      },
    },
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "العودة إلى صفحة الدعم",
    sections: {
      intro: {
        title: "1. مقدمة",
        content: "StudyLog (\"التطبيق\") تطبيق يساعدك على قياس وقت الدراسة وتسجيله وتمثيله بصريًا. توضح سياسة الخصوصية هذه كيفية التعامل مع المعلومات عند استخدام التطبيق.",
        consent: "باستخدامك التطبيق، فإنك توافق على الممارسات الموضحة في سياسة الخصوصية هذه.",
      },
      dataCollection: {
        title: "2. المعلومات التي نجمعها",
        local: {
          title: "2-1. البيانات المخزّنة على الجهاز",
          intro: "تُخزَّن جميع البيانات التالية على جهازك فقط. لا يُرسَل أي شيء إلى خوادم خارجية:",
          items: [
            "سجلات الدراسة (وقت البدء والانتهاء والمدة والمادة)",
            "بيانات المواد (الاسم واللون)",
            "بيانات المهام (العنوان والموعد النهائي والمادة وإعدادات التذكير)",
            "هدف الدراسة اليومي",
            "إعدادات التطبيق (لون السمة والوضع الداكن وصوت المنبه وإعدادات الأمان وما إلى ذلك)",
          ],
        },
        notCollected: {
          title: "2-2. المعلومات التي لا نجمعها",
          intro: "لا يجمع التطبيق أيًّا مما يلي:",
          items: [
            "معلومات تعريف شخصية كالاسم والبريد الإلكتروني والعنوان",
            "بيانات الموقع",
            "جهات الاتصال",
            "الوصول إلى الكاميرا أو الميكروفون",
            "بيانات التتبع لأغراض إعلانية",
            "تقارير الأعطال أو إحصاءات الاستخدام المُرسَلة خارجيًا",
          ],
        },
      },
      purpose: {
        title: "3. أغراض الاستخدام",
        intro: "تُستخدَم البيانات المخزّنة على جهازك لأغراض محددة فقط:",
        items: [
          "عرض سجلات الدراسة ورسمها بيانيًا وحساب إحصاءاتها",
          "إرسال تذكيرات المهام (باستخدام ميزات الإشعار على الجهاز فقط)",
          "حماية التطبيق بقفل رمز المرور والمصادقة البيومترية",
          "حفظ تفضيلات المستخدم",
        ],
      },
      thirdParty: {
        title: "4. مشاركة المعلومات مع أطراف ثالثة",
        content: "لا يوفّر التطبيق بيانات المستخدم أو يبيعها أو يشاركها مع أي طرف ثالث. لا تُستخدَم واجهات برمجية خارجية أو حزم SDK إعلانية. تعمل جميع الميزات على جهازك فقط.",
      },
      retention: {
        title: "5. تخزين البيانات وحذفها",
        content: "تُخزَّن جميع البيانات على جهازك فقط. لا يجري تحميل سحابي أو نسخ احتياطي خارجي.",
        deletion: "ستُحذف جميع البيانات من جهازك عند إلغاء تثبيت التطبيق. إذا كان النسخ الاحتياطي على iCloud مُفعَّلًا، قد تُدرَج بيانات التطبيق في نسخة الجهاز الاحتياطية، وذلك من خلال خدمة Apple iCloud.",
      },
      permissions: {
        title: "6. أذونات التطبيق",
        intro: "يستخدم التطبيق أذونات الجهاز التالية:",
        items: [
          {
            name: "الإشعارات",
            detail: "تُستخدَم لإرسال تذكيرات المهام. تُجدوَل جميع الإشعارات على الجهاز ولا تمر عبر خوادم خارجية.",
          },
          {
            name: "Face ID / Touch ID (المصادقة البيومترية)",
            detail: "تُستخدَم لإلغاء قفل رمز المرور. تُدار البيانات البيومترية من خلال Secure Enclave من Apple ولا نصل إليها إطلاقًا.",
          },
        ],
      },
      security: {
        title: "7. الأمان",
        items: [
          "تُخزَّن جميع البيانات على الجهاز فقط دون أي اتصال بالشبكة",
          "تمنع ميزة قفل رمز المرور أي وصول غير مصرح به إلى التطبيق",
          "تتم معالجة المصادقة البيومترية (Face ID / Touch ID) بأمان عبر نظام Apple",
        ],
        disclaimer: "يرجى إدارة رمز مرور iPhone ورمز مرور التطبيق بشكل مناسب للحماية من فقدان الجهاز أو سرقته.",
      },
      children: {
        title: "8. خصوصية الأطفال",
        content: "التطبيق غير موجّه للأطفال دون سن 13 عامًا، ولا نجمع عن قصد معلومات شخصية من أطفال دون 13 عامًا.",
        action: "إذا كنت وليّ أمر وتعلم أن طفلك يستخدم التطبيق، يُرجى التواصل معنا على العنوان أدناه.",
      },
      userRights: {
        title: "9. حقوق المستخدم",
        intro: "نظرًا لتخزين جميع البيانات على جهازك، يمكنك في أي وقت:",
        items: [
          "حذف سجلات فردية من داخل التطبيق",
          "حذف المواد أو المهام",
          "إلغاء تثبيت التطبيق لحذف جميع البيانات",
        ],
        howTo: {
          title: "استفسارات أخرى",
          content: "لأي أسئلة تتعلق بالخصوصية، يُرجى التواصل معنا على العنوان أدناه.",
        },
      },
      changes: {
        title: "10. التغييرات على سياسة الخصوصية",
        content: "قد نحدّث سياسة الخصوصية هذه من وقت لآخر. في حال حدوث تغييرات جوهرية، سنُعلمك بتحديث تاريخ \"آخر تحديث\" في أعلى هذه الصفحة. استمرارك في استخدام التطبيق بعد التغييرات يُعدّ موافقة على السياسة المحدّثة.",
      },
      contact: {
        title: "11. تواصل معنا",
        content: "لأي أسئلة حول سياسة الخصوصية هذه، يُرجى التواصل معنا على:",
        email: "البريد الإلكتروني",
        responseTime: "سنردّ خلال 30 يومًا من استلام استفسارك.",
      },
    },
  },
  es: {
    title: "Política de privacidad",
    lastUpdated: "Última actualización",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Volver al soporte",
    sections: {
      intro: {
        title: "1. Introducción",
        content: "StudyLog (\"la App\") es una aplicación que te ayuda a medir, registrar y visualizar tu tiempo de estudio. Esta Política de privacidad explica cómo se gestiona la información cuando usas la App.",
        consent: "Al usar la App, aceptas las prácticas descritas en esta Política de privacidad.",
      },
      dataCollection: {
        title: "2. Información que recopilamos",
        local: {
          title: "2-1. Datos almacenados en el dispositivo",
          intro: "Todos los datos siguientes se almacenan solo en tu dispositivo. No se envían datos a servidores externos:",
          items: [
            "Registros de estudio (hora de inicio, hora de fin, duración, materia)",
            "Datos de materias (nombre, color)",
            "Datos de tareas (título, fecha de vencimiento, materia, configuración de recordatorio)",
            "Objetivo de estudio diario",
            "Ajustes de la app (color de tema, modo oscuro, sonido de alarma, configuración de seguridad, etc.)",
          ],
        },
        notCollected: {
          title: "2-2. Información que no recopilamos",
          intro: "La App no recopila ninguna de las siguientes informaciones:",
          items: [
            "Información de identificación personal como nombre, correo electrónico o dirección",
            "Datos de ubicación",
            "Contactos",
            "Acceso a cámara o micrófono",
            "Datos de seguimiento para fines publicitarios",
            "Informes de fallos o estadísticas de uso enviadas externamente",
          ],
        },
      },
      purpose: {
        title: "3. Propósito del uso",
        intro: "Los datos almacenados en tu dispositivo se usan únicamente para los siguientes fines:",
        items: [
          "Mostrar, graficar y calcular estadísticas de registros de estudio",
          "Enviar notificaciones de recordatorio de tareas (usando solo funciones de notificación en el dispositivo)",
          "Proteger la app con bloqueo por código y autenticación biométrica",
          "Guardar las preferencias del usuario",
        ],
      },
      thirdParty: {
        title: "4. Información compartida con terceros",
        content: "La App no proporciona, vende ni comparte datos de usuarios con ningún tercero. No se usan APIs externas ni SDKs publicitarios. Todas las funciones operan completamente en tu dispositivo.",
      },
      retention: {
        title: "5. Almacenamiento y eliminación de datos",
        content: "Todos los datos se almacenan solo en tu dispositivo. No se realizan cargas en la nube ni copias de seguridad externas.",
        deletion: "Desinstalar la App eliminará todos los datos de tu dispositivo. Si la copia de seguridad de iCloud está activada, los datos de la app pueden incluirse en la copia de seguridad del dispositivo, gestionada por el servicio iCloud de Apple.",
      },
      permissions: {
        title: "6. Permisos de la app",
        intro: "La App utiliza los siguientes permisos del dispositivo:",
        items: [
          {
            name: "Notificaciones",
            detail: "Usadas para enviar recordatorios de tareas. Todas las notificaciones se programan en el dispositivo y no pasan por servidores externos.",
          },
          {
            name: "Face ID / Touch ID (Autenticación biométrica)",
            detail: "Usado para desbloquear la función de bloqueo por código. Los datos biométricos son gestionados por el Secure Enclave de Apple y nunca accedemos a ellos.",
          },
        ],
      },
      security: {
        title: "7. Seguridad",
        items: [
          "Todos los datos se almacenan solo en tu dispositivo sin comunicación de red",
          "La función de bloqueo por código evita el acceso no autorizado a la app por parte de terceros",
          "La autenticación biométrica (Face ID / Touch ID) se procesa de forma segura a través del sistema de Apple",
        ],
        disclaimer: "Por favor, gestiona adecuadamente el código de tu iPhone y el código en la app para protegerte ante pérdida o robo del dispositivo.",
      },
      children: {
        title: "8. Privacidad de los niños",
        content: "La App no está destinada a niños menores de 13 años y no recopilamos intencionalmente información personal de niños menores de 13 años.",
        action: "Si eres padre o tutor y sabes que tu hijo usa la App, por favor contáctanos en la dirección de abajo.",
      },
      userRights: {
        title: "9. Tus derechos",
        intro: "Como todos los datos se almacenan en tu dispositivo, puedes en cualquier momento:",
        items: [
          "Eliminar registros individuales desde dentro de la app",
          "Eliminar materias o tareas",
          "Desinstalar la app para eliminar todos los datos",
        ],
        howTo: {
          title: "Otras consultas",
          content: "Para cualquier pregunta sobre tu privacidad, contáctanos en la dirección de abajo.",
        },
      },
      changes: {
        title: "10. Cambios en esta Política de privacidad",
        content: "Podemos actualizar esta Política de privacidad de vez en cuando. Si se producen cambios significativos, te notificaremos actualizando la fecha de \"Última actualización\" en la parte superior de esta página. El uso continuado de la App tras los cambios constituye tu aceptación de la política actualizada.",
      },
      contact: {
        title: "11. Contacto",
        content: "Para preguntas sobre esta Política de privacidad, por favor contáctanos en:",
        email: "Correo electrónico",
        responseTime: "Responderemos dentro de los 30 días siguientes a recibir tu consulta.",
      },
    },
  },
  fr: {
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Retour au support",
    sections: {
      intro: {
        title: "1. Introduction",
        content: "StudyLog (\"l'App\") est une application qui vous aide à mesurer, enregistrer et visualiser votre temps d'étude. Cette Politique de confidentialité explique comment les informations sont gérées lorsque vous utilisez l'App.",
        consent: "En utilisant l'App, vous acceptez les pratiques décrites dans cette Politique de confidentialité.",
      },
      dataCollection: {
        title: "2. Informations que nous collectons",
        local: {
          title: "2-1. Données stockées sur l'appareil",
          intro: "Toutes les données suivantes sont stockées uniquement sur votre appareil. Aucune donnée n'est envoyée à des serveurs externes :",
          items: [
            "Enregistrements d'études (heure de début, heure de fin, durée, matière)",
            "Données de matières (nom, couleur)",
            "Données de tâches (titre, date d'échéance, matière, paramètres de rappel)",
            "Objectif d'étude quotidien",
            "Paramètres de l'app (couleur du thème, mode sombre, son d'alarme, paramètres de sécurité, etc.)",
          ],
        },
        notCollected: {
          title: "2-2. Informations que nous ne collectons pas",
          intro: "L'App ne collecte aucune des informations suivantes :",
          items: [
            "Informations d'identification personnelle telles que nom, adresse e-mail ou adresse postale",
            "Données de localisation",
            "Contacts",
            "Accès à la caméra ou au microphone",
            "Données de suivi à des fins publicitaires",
            "Rapports de plantage ou statistiques d'utilisation envoyés en externe",
          ],
        },
      },
      purpose: {
        title: "3. Finalité de l'utilisation",
        intro: "Les données stockées sur votre appareil sont utilisées uniquement aux fins suivantes :",
        items: [
          "Affichage, graphique et calcul des statistiques des enregistrements d'études",
          "Envoi de notifications de rappel de tâches (en utilisant uniquement les fonctions de notification sur l'appareil)",
          "Protection de l'app avec un verrouillage par code et une authentification biométrique",
          "Sauvegarde des préférences utilisateur",
        ],
      },
      thirdParty: {
        title: "4. Partage d'informations avec des tiers",
        content: "L'App ne fournit, ne vend ni ne partage les données utilisateur avec aucun tiers. Aucune API externe ni SDK publicitaire n'est utilisé. Toutes les fonctionnalités fonctionnent entièrement sur votre appareil.",
      },
      retention: {
        title: "5. Stockage et suppression des données",
        content: "Toutes les données sont stockées uniquement sur votre appareil. Aucun téléchargement vers le cloud ni sauvegarde externe n'est effectué.",
        deletion: "La désinstallation de l'App supprimera toutes les données de votre appareil. Si la sauvegarde iCloud est activée, les données de l'app peuvent être incluses dans la sauvegarde de l'appareil, gérée par le service iCloud d'Apple.",
      },
      permissions: {
        title: "6. Autorisations de l'app",
        intro: "L'App utilise les autorisations d'appareil suivantes :",
        items: [
          {
            name: "Notifications",
            detail: "Utilisées pour envoyer des rappels de tâches. Toutes les notifications sont planifiées sur l'appareil et ne passent pas par des serveurs externes.",
          },
          {
            name: "Face ID / Touch ID (Authentification biométrique)",
            detail: "Utilisé pour déverrouiller la fonction de verrouillage par code. Les données biométriques sont gérées par le Secure Enclave d'Apple et nous n'y accédons jamais.",
          },
        ],
      },
      security: {
        title: "7. Sécurité",
        items: [
          "Toutes les données sont stockées uniquement sur votre appareil sans communication réseau",
          "La fonction de verrouillage par code empêche tout accès non autorisé à l'app par des tiers",
          "L'authentification biométrique (Face ID / Touch ID) est traitée en toute sécurité via le système Apple",
        ],
        disclaimer: "Veuillez gérer correctement le code de votre iPhone et le code dans l'app pour vous protéger contre la perte ou le vol de l'appareil.",
      },
      children: {
        title: "8. Confidentialité des enfants",
        content: "L'App n'est pas destinée aux enfants de moins de 13 ans et nous ne collectons pas intentionnellement des informations personnelles auprès d'enfants de moins de 13 ans.",
        action: "Si vous êtes parent ou tuteur et savez que votre enfant utilise l'App, veuillez nous contacter à l'adresse ci-dessous.",
      },
      userRights: {
        title: "9. Vos droits",
        intro: "Comme toutes les données sont stockées sur votre appareil, vous pouvez à tout moment :",
        items: [
          "Supprimer des enregistrements individuels depuis l'app",
          "Supprimer des matières ou des tâches",
          "Désinstaller l'app pour supprimer toutes les données",
        ],
        howTo: {
          title: "Autres questions",
          content: "Pour toute question sur votre confidentialité, veuillez nous contacter à l'adresse ci-dessous.",
        },
      },
      changes: {
        title: "10. Modifications de cette Politique de confidentialité",
        content: "Nous pouvons mettre à jour cette Politique de confidentialité de temps à autre. En cas de changements importants, nous vous en informerons en mettant à jour la date de \"Dernière mise à jour\" en haut de cette page. L'utilisation continue de l'App après les modifications constitue votre acceptation de la politique mise à jour.",
      },
      contact: {
        title: "11. Nous contacter",
        content: "Pour toute question sur cette Politique de confidentialité, veuillez nous contacter à :",
        email: "E-mail",
        responseTime: "Nous répondrons dans les 30 jours suivant la réception de votre demande.",
      },
    },
  },
  pt: {
    title: "Política de privacidade",
    lastUpdated: "Última atualização",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Voltar ao suporte",
    sections: {
      intro: {
        title: "1. Introdução",
        content: "StudyLog (\"o App\") é um aplicativo que ajuda você a medir, registrar e visualizar seu tempo de estudo. Esta Política de privacidade explica como as informações são tratadas quando você usa o App.",
        consent: "Ao usar o App, você concorda com as práticas descritas nesta Política de privacidade.",
      },
      dataCollection: {
        title: "2. Informações que coletamos",
        local: {
          title: "2-1. Dados armazenados no dispositivo",
          intro: "Todos os dados a seguir são armazenados apenas no seu dispositivo. Nenhum dado é enviado a servidores externos:",
          items: [
            "Registros de estudo (horário de início, horário de término, duração, disciplina)",
            "Dados de disciplinas (nome, cor)",
            "Dados de tarefas (título, data de vencimento, disciplina, configurações de lembrete)",
            "Meta de estudo diária",
            "Configurações do app (cor do tema, modo escuro, som de alarme, configurações de segurança, etc.)",
          ],
        },
        notCollected: {
          title: "2-2. Informações que não coletamos",
          intro: "O App não coleta nenhuma das seguintes informações:",
          items: [
            "Informações de identificação pessoal como nome, endereço de e-mail ou endereço físico",
            "Dados de localização",
            "Contatos",
            "Acesso à câmera ou ao microfone",
            "Dados de rastreamento para fins publicitários",
            "Relatórios de falhas ou estatísticas de uso enviados externamente",
          ],
        },
      },
      purpose: {
        title: "3. Finalidade do uso",
        intro: "Os dados armazenados no seu dispositivo são usados apenas para os seguintes fins:",
        items: [
          "Exibir, criar gráficos e calcular estatísticas dos registros de estudo",
          "Enviar notificações de lembrete de tarefas (usando apenas recursos de notificação no dispositivo)",
          "Proteger o app com bloqueio por código e autenticação biométrica",
          "Salvar preferências do usuário",
        ],
      },
      thirdParty: {
        title: "4. Compartilhamento de informações com terceiros",
        content: "O App não fornece, vende nem compartilha dados de usuários com nenhum terceiro. Nenhuma API externa ou SDK de publicidade é usado. Todos os recursos operam completamente no seu dispositivo.",
      },
      retention: {
        title: "5. Armazenamento e exclusão de dados",
        content: "Todos os dados são armazenados apenas no seu dispositivo. Não são feitos uploads para a nuvem ou backups externos.",
        deletion: "Desinstalar o App excluirá todos os dados do seu dispositivo. Se o backup do iCloud estiver ativado, os dados do app podem ser incluídos no backup do dispositivo, gerenciado pelo serviço iCloud da Apple.",
      },
      permissions: {
        title: "6. Permissões do app",
        intro: "O App usa as seguintes permissões do dispositivo:",
        items: [
          {
            name: "Notificações",
            detail: "Usadas para enviar lembretes de tarefas. Todas as notificações são agendadas no dispositivo e não passam por servidores externos.",
          },
          {
            name: "Face ID / Touch ID (Autenticação biométrica)",
            detail: "Usado para desbloquear o recurso de bloqueio por código. Os dados biométricos são gerenciados pelo Secure Enclave da Apple e nunca os acessamos.",
          },
        ],
      },
      security: {
        title: "7. Segurança",
        items: [
          "Todos os dados são armazenados apenas no seu dispositivo sem comunicação de rede",
          "O recurso de bloqueio por código impede o acesso não autorizado ao app por terceiros",
          "A autenticação biométrica (Face ID / Touch ID) é processada com segurança pelo sistema da Apple",
        ],
        disclaimer: "Por favor, gerencie adequadamente o código do seu iPhone e o código no app para se proteger contra perda ou roubo do dispositivo.",
      },
      children: {
        title: "8. Privacidade de crianças",
        content: "O App não é destinado a crianças menores de 13 anos e não coletamos intencionalmente informações pessoais de crianças menores de 13 anos.",
        action: "Se você é pai ou responsável e sabe que seu filho usa o App, por favor entre em contato conosco no endereço abaixo.",
      },
      userRights: {
        title: "9. Seus direitos",
        intro: "Como todos os dados são armazenados no seu dispositivo, você pode a qualquer momento:",
        items: [
          "Excluir registros individuais de dentro do app",
          "Excluir disciplinas ou tarefas",
          "Desinstalar o app para excluir todos os dados",
        ],
        howTo: {
          title: "Outras dúvidas",
          content: "Para quaisquer perguntas sobre sua privacidade, entre em contato conosco no endereço abaixo.",
        },
      },
      changes: {
        title: "10. Alterações nesta Política de privacidade",
        content: "Podemos atualizar esta Política de privacidade de tempos em tempos. Se ocorrerem mudanças significativas, notificaremos você atualizando a data de \"Última atualização\" no topo desta página. O uso contínuo do App após as alterações constitui sua aceitação da política atualizada.",
      },
      contact: {
        title: "11. Contato",
        content: "Para perguntas sobre esta Política de privacidade, entre em contato conosco em:",
        email: "E-mail",
        responseTime: "Responderemos dentro de 30 dias após o recebimento da sua consulta.",
      },
    },
  },
  de: {
    title: "Datenschutzrichtlinie",
    lastUpdated: "Zuletzt aktualisiert",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Zurück zum Support",
    sections: {
      intro: {
        title: "1. Einleitung",
        content: "StudyLog (\"die App\") ist eine App, die Ihnen hilft, Ihre Lernzeit zu messen, aufzuzeichnen und zu visualisieren. Diese Datenschutzrichtlinie erklärt, wie Informationen beim Verwenden der App gehandhabt werden.",
        consent: "Durch die Verwendung der App stimmen Sie den in dieser Datenschutzrichtlinie beschriebenen Praktiken zu.",
      },
      dataCollection: {
        title: "2. Informationen, die wir erfassen",
        local: {
          title: "2-1. Auf dem Gerät gespeicherte Daten",
          intro: "Alle folgenden Daten werden nur auf Ihrem Gerät gespeichert. Es werden keine Daten an externe Server gesendet:",
          items: [
            "Lernaufzeichnungen (Startzeit, Endzeit, Dauer, Fach)",
            "Fachdaten (Name, Farbe)",
            "Aufgabendaten (Titel, Fälligkeitsdatum, Fach, Erinnerungseinstellungen)",
            "Tägliches Lernziel",
            "App-Einstellungen (Themenfarbe, Dunkelmodus, Alarmton, Sicherheitseinstellungen usw.)",
          ],
        },
        notCollected: {
          title: "2-2. Informationen, die wir nicht erfassen",
          intro: "Die App erfasst keine der folgenden Informationen:",
          items: [
            "Personenbezogene Informationen wie Name, E-Mail-Adresse oder Postadresse",
            "Standortdaten",
            "Kontakte",
            "Kamera- oder Mikrofonzugang",
            "Tracking-Daten für Werbezwecke",
            "Extern gesendete Absturzberichte oder Nutzungsstatistiken",
          ],
        },
      },
      purpose: {
        title: "3. Verwendungszweck",
        intro: "Auf Ihrem Gerät gespeicherte Daten werden nur für folgende Zwecke verwendet:",
        items: [
          "Anzeigen, Grafiken und Berechnung von Statistiken für Lernaufzeichnungen",
          "Senden von Aufgabenerinnerungen (nur mit On-Device-Benachrichtigungsfunktionen)",
          "Schutz der App mit Passcode-Sperre und biometrischer Authentifizierung",
          "Speichern von Benutzereinstellungen",
        ],
      },
      thirdParty: {
        title: "4. Weitergabe von Informationen an Dritte",
        content: "Die App stellt Benutzerdaten keinem Dritten zur Verfügung, verkauft oder teilt sie nicht. Es werden keine externen APIs oder Werbe-SDKs verwendet. Alle Funktionen laufen vollständig auf Ihrem Gerät.",
      },
      retention: {
        title: "5. Datenspeicherung und -löschung",
        content: "Alle Daten werden nur auf Ihrem Gerät gespeichert. Es werden keine Cloud-Uploads oder externe Backups durchgeführt.",
        deletion: "Durch Deinstallieren der App werden alle Daten von Ihrem Gerät gelöscht. Wenn iCloud-Backup aktiviert ist, können App-Daten in das Geräte-Backup einbezogen werden, das vom iCloud-Dienst von Apple verwaltet wird.",
      },
      permissions: {
        title: "6. App-Berechtigungen",
        intro: "Die App verwendet folgende Geräteberechtigungen:",
        items: [
          {
            name: "Mitteilungen",
            detail: "Werden zum Senden von Aufgabenerinnerungen verwendet. Alle Benachrichtigungen werden auf dem Gerät geplant und laufen nicht über externe Server.",
          },
          {
            name: "Face ID / Touch ID (Biometrische Authentifizierung)",
            detail: "Wird zum Entsperren der Passcode-Sperr-Funktion verwendet. Biometrische Daten werden vom Secure Enclave von Apple verwaltet und wir greifen nie darauf zu.",
          },
        ],
      },
      security: {
        title: "7. Sicherheit",
        items: [
          "Alle Daten werden nur auf Ihrem Gerät gespeichert, ohne Netzwerkkommunikation",
          "Die Passcode-Sperr-Funktion verhindert unbefugten Zugriff auf die App durch Dritte",
          "Biometrische Authentifizierung (Face ID / Touch ID) wird sicher über das Apple-System verarbeitet",
        ],
        disclaimer: "Bitte verwalten Sie den Passcode Ihres iPhones und den In-App-Passcode ordnungsgemäß, um sich vor Geräteverlust oder -diebstahl zu schützen.",
      },
      children: {
        title: "8. Datenschutz für Kinder",
        content: "Die App ist nicht für Kinder unter 13 Jahren bestimmt, und wir erfassen nicht absichtlich personenbezogene Informationen von Kindern unter 13 Jahren.",
        action: "Wenn Sie Elternteil oder Vormund sind und wissen, dass Ihr Kind die App verwendet, kontaktieren Sie uns bitte unter der unten angegebenen Adresse.",
      },
      userRights: {
        title: "9. Ihre Rechte",
        intro: "Da alle Daten auf Ihrem Gerät gespeichert sind, können Sie jederzeit:",
        items: [
          "Einzelne Aufzeichnungen aus der App löschen",
          "Fächer oder Aufgaben löschen",
          "Die App deinstallieren, um alle Daten zu löschen",
        ],
        howTo: {
          title: "Weitere Anfragen",
          content: "Für Fragen zu Ihrer Privatsphäre kontaktieren Sie uns bitte unter der unten angegebenen Adresse.",
        },
      },
      changes: {
        title: "10. Änderungen dieser Datenschutzrichtlinie",
        content: "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Bei wesentlichen Änderungen werden wir Sie durch Aktualisierung des Datums \"Zuletzt aktualisiert\" oben auf dieser Seite benachrichtigen. Die weitere Nutzung der App nach Änderungen gilt als Ihre Zustimmung zur aktualisierten Richtlinie.",
      },
      contact: {
        title: "11. Kontakt",
        content: "Bei Fragen zu dieser Datenschutzrichtlinie kontaktieren Sie uns bitte unter:",
        email: "E-Mail",
        responseTime: "Wir antworten innerhalb von 30 Tagen nach Eingang Ihrer Anfrage.",
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

export default function StudyLogPrivacyPage() {
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
            <Image src={appIcon} alt="StudyLog" width={72} height={72} className="rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2">StudyLog</h1>
          <p className="text-gray-500 text-sm">{t.lastUpdated}: {t.lastUpdatedDate}</p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* 戻るリンク */}
        <div className="text-center mb-10">
          <Link
            href="/support/studelog"
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
          <p>&copy; {currentYear} StudyLog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
