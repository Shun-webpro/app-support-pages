"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/snapfood.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年7月29日";
const LAST_UPDATED_EN = "July 29, 2026";
const LAST_UPDATED_KO = "2026년 7월 29일";
const LAST_UPDATED_ZH_TW = "2026年7月29日";

type Language = "ja" | "ko" | "en" | "zh-TW";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
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
      server: { title: string; intro: string; items: string[] };
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
        content: "タベミル（SnapFood、以下「本アプリ」）は、食事・ドリンク・サプリメントを写真やバーコードで記録し、AIによるカロリー・栄養素の推定や、体重・睡眠・運動・作業・体調の記録をサポートするアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータは、お使いの端末内にのみ保存されます：",
          items: [
            "食事・ドリンク・サプリメントの記録データ（写真、食品名、分量、カロリー、栄養素など）",
            "体重・睡眠・水分摂取の記録",
            "運動・作業（労働）の記録",
            "体調（症状）の記録",
            "登録した食品・目標値・ルーティンなどの設定データ",
            "AIコーチ機能の提案履歴",
            "アプリロック用のパスコード（ハッシュ化済み）・生体認証の有効設定",
            "アプリ設定（言語、単位など）",
          ],
        },
        server: {
          title: "2-2. AI解析・検索のために送信される情報",
          intro: "以下の情報は、機能利用時にのみ処理のため外部へ送信されます：",
          items: [
            "食事・ドリンク・サプリメントの写真データ、および入力した説明テキスト（AI解析機能利用時。Supabaseを経由してOpenAI APIへ送信されます）",
            "AIコーチ機能利用時の当日の栄養摂取状況・目標値・入力した相談内容",
            "バーコード番号（バーコード検索機能利用時。公開データベースOpen Food Factsへ送信されます。個人を特定する情報は含まれません）",
          ],
        },
        notCollected: {
          title: "2-3. 収集しない情報",
          intro: "本アプリは以下の情報を一切収集しません：",
          items: [
            "氏名・メールアドレス・住所等の個人識別情報（アカウント登録不要）",
            "位置情報",
            "連絡先",
            "Apple ヘルスケア等、他アプリの健康データ",
            "広告目的のトラッキングデータ",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "収集した情報は、以下の目的にのみ使用されます：",
        items: [
          "写真の内容を解析し、カロリー・栄養素を自動で推定するため",
          "バーコードから食品・ドリンク情報を検索するため",
          "AIコーチによる食事提案を生成するため",
          "記録データの表示・管理、統計・カレンダーの作成",
          "アプリ内課金（サブスクリプション）の状態確認",
          "アプリロック機能の提供",
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        content: "本アプリは、AI解析機能の提供にあたりSupabaseをサーバー基盤として利用し、OpenAI APIへ写真・テキストデータの中継処理を行います。送信されたデータは解析処理のために一時的に使用され、処理完了後にサーバー側で保存されることはありません。バーコード検索には公開データベースであるOpen Food Facts（世界中のユーザーが登録する食品データベース）を利用します。サブスクリプション管理にはRevenueCatを利用しており、匿名のユーザーIDとApple App Storeの購入レシート情報が送信されます。アプリ内課金の決済処理自体はAppleの決済システムにより行われます。これらの提供先以外に、ユーザーのデータを第三者に販売・共有することは一切ありません。",
      },
      retention: {
        title: "5. データの保存と削除",
        content: "食事・ドリンク・サプリメント・体重・睡眠・運動・作業・体調などの記録データは、お使いの端末内にのみ保存されます。AI解析・検索のために送信された写真・テキスト・バーコード番号は、処理後にサーバー側で保持されません。本アプリはクラウド同期に対応していないため、端末を変更した場合、記録データを引き継ぐことはできません。",
        deletion: "アプリをアンインストールすることで、端末内のすべての記録データが削除されます。アプリ内で個別の記録を削除した場合、そのデータは復元できません。",
      },
      permissions: {
        title: "6. アプリが使用する権限",
        intro: "本アプリは以下の端末権限を使用します：",
        items: [
          {
            name: "カメラ",
            detail: "食事・ドリンク・サプリメントの写真撮影や、バーコードスキャンによる栄養情報の取得に使用します。",
          },
          {
            name: "フォトライブラリ",
            detail: "写真ライブラリから食事などの写真を選択するために使用します。また、撮影した写真を写真アプリに保存する際にも使用します。",
          },
          {
            name: "Face ID（生体認証）",
            detail: "アプリロック機能を設定した場合に、Face IDでアプリのロックを解除するために使用します。",
          },
        ],
      },
      security: {
        title: "7. データのセキュリティ",
        items: [
          "AI解析・バーコード検索のために送信されるデータは、暗号化された通信（HTTPS/TLS）を通じて送信されます",
          "アプリロック用のパスコードは、そのままの形では保存されず、ハッシュ化したうえで端末内の安全な領域（Keychain）に保存されます",
          "アプリ内課金情報はAppleの決済システムを通じて安全に処理されます",
        ],
        disclaimer: "端末の紛失・盗難に備え、端末自体のロック機能も適切に設定してください。インターネット経由のデータ転送には固有のリスクが伴い、完全なセキュリティを保証することはできません。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは13歳未満の子供を対象としておらず、意図的に13歳未満の子供から個人情報を収集することはありません。",
        action: "13歳未満の子供が本アプリを利用していることが判明した場合、関連する情報を速やかに削除するために合理的な措置を講じます。お子様が本アプリを利用していることをご存知の保護者の方は、下記お問い合わせ先までご連絡ください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        intro: "ユーザーはいつでも以下の操作が可能です：",
        items: [
          "アプリ内から個別の記録データを削除する",
          "アプリをアンインストールして端末内のすべてのデータを削除する",
          "設定画面から購入情報の復元を行う",
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
        content: "SnapFood(이하 \"본 앱\")는 식사・음료・영양제를 사진이나 바코드로 기록하고, AI를 통한 칼로리・영양소 추정과 체중・수면・운동・작업・컨디션 기록을 지원하는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 정보 처리 방식에 대해 설명합니다.",
        consent: "본 앱을 이용하시면 본 개인정보 처리방침에 동의한 것으로 간주됩니다.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        local: {
          title: "2-1. 기기 내에 저장되는 데이터",
          intro: "다음 데이터는 사용 중인 기기 내에만 저장됩니다:",
          items: [
            "식사・음료・영양제 기록 데이터(사진, 식품명, 분량, 칼로리, 영양소 등)",
            "체중・수면・수분 섭취 기록",
            "운동・작업(노동) 기록",
            "컨디션(증상) 기록",
            "등록한 식품・목표치・루틴 등의 설정 데이터",
            "AI 코치 기능의 제안 이력",
            "앱 잠금용 비밀번호(해시 처리됨)・생체 인증 활성화 설정",
            "앱 설정(언어, 단위 등)",
          ],
        },
        server: {
          title: "2-2. AI 분석・검색을 위해 전송되는 정보",
          intro: "다음 정보는 기능 이용 시에만 처리를 위해 외부로 전송됩니다:",
          items: [
            "식사・음료・영양제 사진 데이터 및 입력한 설명 텍스트(AI 분석 기능 이용 시. Supabase를 경유하여 OpenAI API로 전송됩니다)",
            "AI 코치 기능 이용 시 당일의 영양 섭취 현황・목표치・입력한 상담 내용",
            "바코드 번호(바코드 검색 기능 이용 시. 공개 데이터베이스 Open Food Facts로 전송됩니다. 개인을 특정하는 정보는 포함되지 않습니다)",
          ],
        },
        notCollected: {
          title: "2-3. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다:",
          items: [
            "이름, 이메일 주소, 주소 등 개인 식별 정보(계정 등록 불요)",
            "위치 정보",
            "연락처",
            "Apple 헬스 등 타 앱의 건강 데이터",
            "광고 목적의 트래킹 데이터",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "수집한 정보는 다음 목적에만 사용됩니다:",
        items: [
          "사진의 내용을 분석하여 칼로리・영양소를 자동으로 추정하기 위해",
          "바코드로 식품・음료 정보를 검색하기 위해",
          "AI 코치를 통한 식사 제안을 생성하기 위해",
          "기록 데이터의 표시・관리, 통계・캘린더 작성",
          "인앱 결제(구독) 상태 확인",
          "앱 잠금 기능 제공",
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스에 대한 정보 제공",
        content: "본 앱은 AI 분석 기능을 제공하기 위해 서버 인프라로 Supabase를 이용하며, OpenAI API로 사진・텍스트 데이터를 중계 처리합니다. 전송된 데이터는 분석 처리를 위해 일시적으로 사용되며, 처리 완료 후 서버 측에 저장되지 않습니다. 바코드 검색에는 공개 데이터베이스인 Open Food Facts(전 세계 사용자가 등록하는 식품 데이터베이스)를 이용합니다. 구독 관리에는 RevenueCat을 이용하며, 익명의 사용자 ID와 Apple App Store 구매 영수증 정보가 전송됩니다. 인앱 결제 자체는 Apple의 결제 시스템을 통해 처리됩니다. 이 외의 제공처에 사용자의 데이터를 판매・공유하는 일은 일절 없습니다.",
      },
      retention: {
        title: "5. 데이터 저장 및 삭제",
        content: "식사・음료・영양제・체중・수면・운동・작업・컨디션 등의 기록 데이터는 사용 중인 기기 내에만 저장됩니다. AI 분석・검색을 위해 전송된 사진・텍스트・바코드 번호는 처리 후 서버 측에 보관되지 않습니다. 본 앱은 클라우드 동기화를 지원하지 않으므로, 기기를 변경할 경우 기록 데이터를 이어받을 수 없습니다.",
        deletion: "앱을 삭제하면 기기 내의 모든 기록 데이터가 삭제됩니다. 앱 내에서 개별 기록을 삭제한 경우, 해당 데이터는 복원할 수 없습니다.",
      },
      permissions: {
        title: "6. 앱이 사용하는 권한",
        intro: "본 앱은 다음 기기 권한을 사용합니다:",
        items: [
          {
            name: "카메라",
            detail: "식사・음료・영양제 사진 촬영이나 바코드 스캔을 통한 영양 정보 취득에 사용합니다.",
          },
          {
            name: "사진 라이브러리",
            detail: "사진 라이브러리에서 식사 등의 사진을 선택하는 데 사용합니다. 또한 촬영한 사진을 사진 앱에 저장할 때도 사용됩니다.",
          },
          {
            name: "Face ID(생체 인증)",
            detail: "앱 잠금 기능을 설정한 경우, Face ID로 앱 잠금을 해제하는 데 사용합니다.",
          },
        ],
      },
      security: {
        title: "7. 데이터 보안",
        items: [
          "AI 분석・바코드 검색을 위해 전송되는 데이터는 암호화된 통신(HTTPS/TLS)을 통해 전송됩니다",
          "앱 잠금용 비밀번호는 그대로 저장되지 않으며, 해시 처리된 후 기기 내 안전한 영역(Keychain)에 저장됩니다",
          "인앱 결제 정보는 Apple의 결제 시스템을 통해 안전하게 처리됩니다",
        ],
        disclaimer: "기기 분실・도난에 대비하여 기기 자체의 잠금 기능도 적절히 설정해 주세요. 인터넷을 통한 데이터 전송에는 고유한 위험이 따르며, 완전한 보안을 보장할 수 없습니다.",
      },
      children: {
        title: "8. 아동의 개인정보",
        content: "본 앱은 13세 미만 아동을 대상으로 하지 않으며, 의도적으로 13세 미만 아동의 개인정보를 수집하지 않습니다.",
        action: "13세 미만 아동이 본 앱을 이용하고 있는 것이 확인된 경우, 관련 정보를 신속히 삭제하기 위한 합리적인 조치를 취합니다. 자녀가 본 앱을 이용하고 있음을 알고 계신 보호자께서는 아래 연락처로 문의해 주세요.",
      },
      userRights: {
        title: "9. 사용자의 권리",
        intro: "사용자는 언제든지 다음 작업이 가능합니다:",
        items: [
          "앱 내에서 개별 기록 데이터를 삭제한다",
          "앱을 삭제하여 기기 내의 모든 데이터를 삭제한다",
          "설정 화면에서 구매 정보를 복원한다",
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
        content: "SnapFood (\"the App\") lets you log meals, drinks, and supplements by photo or barcode, and supports AI-estimated calorie/nutrient tracking along with logs for weight, sleep, exercise, physical work, and symptoms. This Privacy Policy explains how information is handled when you use the App.",
        consent: "By using the App, you consent to the practices described in this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        local: {
          title: "2-1. Data Stored on Device",
          intro: "The following data is stored only on your device:",
          items: [
            "Meal, drink, and supplement log data (photos, food name, portion size, calories, nutrients, etc.)",
            "Weight, sleep, and water intake logs",
            "Exercise and physical work logs",
            "Symptom (condition) logs",
            "Saved food products, goal targets, and routine settings",
            "AI coach suggestion history",
            "App lock passcode (hashed) and biometric enablement setting",
            "App settings (language, units, etc.)",
          ],
        },
        server: {
          title: "2-2. Information Sent for AI Analysis and Lookup",
          intro: "The following information is sent externally, only when the relevant feature is used:",
          items: [
            "Photos of meals, drinks, or supplements, and any description text you enter (when using AI analysis; sent to the OpenAI API via Supabase)",
            "Your current day's nutrition totals, goal targets, and any context you enter (when using the AI coach feature)",
            "Barcode numbers (when using barcode lookup; sent to the public database Open Food Facts — no personally identifying information is included)",
          ],
        },
        notCollected: {
          title: "2-3. Information We Do Not Collect",
          intro: "The App does not collect any of the following:",
          items: [
            "Personally identifiable information such as name, email address, or physical address (no account registration required)",
            "Location data",
            "Contacts",
            "Health data from other apps such as Apple Health",
            "Tracking data for advertising purposes",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Use",
        intro: "Collected information is used only for the following purposes:",
        items: [
          "Analyzing photo content to automatically estimate calories and nutrients",
          "Looking up food and drink information from barcodes",
          "Generating meal suggestions via the AI coach",
          "Displaying and managing logged data, and building stats and calendar views",
          "Verifying the status of in-app purchases (subscriptions)",
          "Providing the app lock feature",
        ],
      },
      thirdParty: {
        title: "4. Information Sharing with Third Parties",
        content: "To provide AI analysis, the App uses Supabase as its server infrastructure and relays photo and text data to the OpenAI API. Submitted data is used temporarily for analysis and is not retained on the server afterward. Barcode lookup uses Open Food Facts, a public food database maintained by users worldwide. Subscription management uses RevenueCat, to which an anonymous user ID and Apple App Store purchase receipt information are sent. In-app purchase payments themselves are processed through Apple's payment system. Aside from these providers, we do not sell or share user data with any third parties.",
      },
      retention: {
        title: "5. Data Storage and Deletion",
        content: "Meal, drink, supplement, weight, sleep, exercise, work, and symptom log data is stored only on your device. Photos, text, and barcode numbers sent for AI analysis or lookup are not retained on the server after processing. Since the App does not support cloud sync, logged data cannot be carried over if you switch to a new device.",
        deletion: "Uninstalling the App deletes all logged data on your device. Individual records deleted within the App cannot be restored.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following device permissions:",
        items: [
          {
            name: "Camera",
            detail: "Used to photograph meals, drinks, and supplements, and to scan barcodes for retrieving nutrition information.",
          },
          {
            name: "Photo Library",
            detail: "Used to select photos of meals and other items from your photo library, and to save captured photos to the Photos app.",
          },
          {
            name: "Face ID (Biometrics)",
            detail: "Used to unlock the app with Face ID when the app lock feature is enabled.",
          },
        ],
      },
      security: {
        title: "7. Data Security",
        items: [
          "Data sent for AI analysis or barcode lookup is transmitted over encrypted connections (HTTPS/TLS)",
          "The app lock passcode is never stored in plain form — it is hashed before being saved in the device's secure storage (Keychain)",
          "In-app purchase information is processed securely through Apple's payment system",
        ],
        disclaimer: "Please also set up your device's own lock features to protect against loss or theft. Data transfer over the Internet carries inherent risks, and complete security cannot be guaranteed.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App is not intended for children under 13 years of age, and we do not intentionally collect personal information from children under 13.",
        action: "If we become aware that a child under 13 is using the App, we will take reasonable steps to promptly delete any related information. If you are a parent or guardian and know that your child is using the App, please contact us at the address below.",
      },
      userRights: {
        title: "9. Your Rights",
        intro: "You can at any time:",
        items: [
          "Delete individual logged records within the app",
          "Uninstall the app to delete all data on your device",
          "Restore your purchases from the Settings screen",
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
    lastUpdatedDate: LAST_UPDATED_ZH_TW,
    backToSupport: "返回支援頁面",
    sections: {
      intro: {
        title: "1. 簡介",
        content: "SnapFood（以下簡稱「本應用程式」）可讓您以照片或條碼記錄餐點、飲品及營養補充品，並支援 AI 估算卡路里與營養素，同時可記錄體重、睡眠、運動、勞動及身體狀況。本隱私權政策說明使用本應用程式時的資訊處理方式。",
        consent: "使用本應用程式即表示您同意本隱私權政策所述內容。",
      },
      dataCollection: {
        title: "2. 收集的資訊",
        local: {
          title: "2-1. 儲存於裝置內的資料",
          intro: "以下資料僅儲存於您的裝置內：",
          items: [
            "餐點、飲品及營養補充品的記錄資料（照片、食品名稱、份量、卡路里、營養素等）",
            "體重、睡眠及水分攝取記錄",
            "運動及勞動記錄",
            "身體狀況（症狀）記錄",
            "已登錄的食品、目標值及例行安排等設定資料",
            "AI 教練功能的建議歷史紀錄",
            "應用程式鎖定用的密碼（已雜湊處理）及生物辨識啟用設定",
            "應用程式設定（語言、單位等）",
          ],
        },
        server: {
          title: "2-2. 為 AI 分析及查詢而傳送的資訊",
          intro: "以下資訊僅在使用相關功能時，才會為了處理而傳送至外部：",
          items: [
            "餐點、飲品或營養補充品的照片資料，以及您輸入的說明文字（使用 AI 分析功能時，會透過 Supabase 傳送至 OpenAI API）",
            "使用 AI 教練功能時，當日的營養攝取狀況、目標值及您輸入的諮詢內容",
            "條碼號碼（使用條碼查詢功能時，會傳送至公開資料庫 Open Food Facts，不包含任何足以識別個人身分的資訊）",
          ],
        },
        notCollected: {
          title: "2-3. 不收集的資訊",
          intro: "本應用程式不會收集以下資訊：",
          items: [
            "姓名、電子郵件地址、住址等個人識別資訊（無需註冊帳號）",
            "位置資訊",
            "聯絡人",
            "Apple 健康等其他應用程式的健康資料",
            "廣告目的的追蹤資料",
          ],
        },
      },
      purpose: {
        title: "3. 資訊使用目的",
        intro: "收集的資訊僅用於以下目的：",
        items: [
          "分析照片內容以自動推估卡路里與營養素",
          "透過條碼查詢食品及飲品資訊",
          "透過 AI 教練產生餐點建議",
          "顯示及管理記錄資料，建立統計與日曆檢視畫面",
          "確認應用程式內購買（訂閱）的狀態",
          "提供應用程式鎖定功能",
        ],
      },
      thirdParty: {
        title: "4. 向第三方服務提供資訊",
        content: "本應用程式為提供 AI 分析功能，使用 Supabase 作為伺服器基礎架構，並將照片及文字資料中繼傳送至 OpenAI API。傳送的資料僅用於分析處理，處理完成後不會儲存於伺服器端。條碼查詢使用的是全球使用者共同建立的公開食品資料庫 Open Food Facts。訂閱管理使用 RevenueCat，會傳送匿名使用者 ID 及 Apple App Store 購買收據資訊。應用程式內購買本身則透過 Apple 的付款系統處理。除上述服務提供者外，本公司絕不會向任何第三方出售或共享使用者資料。",
      },
      retention: {
        title: "5. 資料儲存與刪除",
        content: "餐點、飲品、營養補充品、體重、睡眠、運動、勞動及身體狀況等記錄資料，僅儲存於您的裝置內。為 AI 分析或查詢而傳送的照片、文字及條碼號碼，於處理完成後不會保留於伺服器端。由於本應用程式不支援雲端同步，若您更換裝置，記錄資料將無法轉移。",
        deletion: "解除安裝本應用程式將刪除裝置內的所有記錄資料。於應用程式內刪除的個別記錄無法復原。",
      },
      permissions: {
        title: "6. 應用程式使用的權限",
        intro: "本應用程式使用以下裝置權限：",
        items: [
          {
            name: "相機",
            detail: "用於拍攝餐點、飲品及營養補充品的照片，以及掃描條碼以取得營養資訊。",
          },
          {
            name: "照片圖庫",
            detail: "用於從照片圖庫選取餐點等照片，以及將拍攝的照片儲存至「照片」應用程式。",
          },
          {
            name: "Face ID（生物辨識）",
            detail: "於啟用應用程式鎖定功能時，用於以 Face ID 解鎖應用程式。",
          },
        ],
      },
      security: {
        title: "7. 資料安全",
        items: [
          "為 AI 分析或條碼查詢而傳送的資料，會透過加密連線（HTTPS/TLS）傳輸",
          "應用程式鎖定用的密碼絕不會以明碼儲存，會先經過雜湊處理後才儲存於裝置內的安全區域（Keychain）",
          "應用程式內購買資訊透過 Apple 的付款系統安全處理",
        ],
        disclaimer: "請務必妥善設定裝置本身的鎖定功能，以防裝置遺失或遭竊。透過網際網路傳輸資料存在固有風險，本公司無法保證絕對的安全性。",
      },
      children: {
        title: "8. 兒童隱私權",
        content: "本應用程式並非針對 13 歲以下兒童設計，本公司不會故意收集 13 歲以下兒童的個人資訊。",
        action: "若本公司得知有 13 歲以下兒童使用本應用程式，將採取合理措施盡速刪除相關資訊。若您是家長或監護人，並得知您的子女正在使用本應用程式，請透過下方聯絡方式與我們聯繫。",
      },
      userRights: {
        title: "9. 使用者的權利",
        intro: "使用者可隨時進行以下操作：",
        items: [
          "於應用程式內刪除個別記錄資料",
          "解除安裝應用程式以刪除裝置內的所有資料",
          "於設定畫面還原購買資訊",
        ],
        howTo: {
          title: "其他詢問",
          content: "如對隱私權有任何疑問，請透過下方聯絡方式與我們聯繫。",
        },
      },
      changes: {
        title: "10. 隱私權政策的變更",
        content: "本隱私權政策可能隨時更新。若發生重大變更，將透過更新本頁頂部的「最後更新日期」通知您。變更後若您繼續使用本應用程式，即視為同意更新後的政策。",
      },
      contact: {
        title: "11. 聯絡我們",
        content: "如對本隱私權政策有任何疑問，請透過以下方式聯絡我們：",
        email: "電子郵件",
        responseTime: "我們原則上將於收到詢問後 30 天內回覆。",
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

export default function SnapFoodPrivacyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const brandName = lang === "ja" ? "タベミル" : "SnapFood";
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src={appIcon} alt={brandName} width={72} height={72} className="rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
          <p className="text-gray-500 text-sm">{t.lastUpdated}: {t.lastUpdatedDate}</p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* 戻るリンク */}
        <div className="text-center mb-10">
          <Link
            href="/support/snapfood"
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
          <h3 className="font-semibold text-gray-800 mb-2">{s.dataCollection.server.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.server.intro}</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6 ml-2">
            {s.dataCollection.server.items.map((item, i) => <li key={i}>{item}</li>)}
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
          <p>&copy; {currentYear} {brandName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
