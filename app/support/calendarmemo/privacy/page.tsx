"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/calendermemo.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年10月12日";
const LAST_UPDATED_EN = "October 12, 2026";
const LAST_UPDATED_KO = "2026년 10월 12일";

type Language = "ja" | "ko" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
];

type Detail = { name: string; detail: string };

const TRANSLATIONS: Record<Language, {
  title: string;
  lastUpdated: string;
  lastUpdatedDate: string;
  backToSupport: string;
  sections: {
    intro: { title: string; content: string; consent: string };
    dataCollection: {
      title: string;
      local: { title: string; intro: string; items: string[]; note: string };
      external: { title: string; intro: string; items: string[] };
      notCollected: { title: string; intro: string; items: string[] };
    };
    purpose: { title: string; intro: string; items: string[] };
    thirdParty: { title: string; content: string; services: Detail[]; note: string };
    retention: { title: string; content: string };
    permissions: { title: string; intro: string; items: Detail[] };
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
        content: "カレンダーメモ（以下「本アプリ」）は、カレンダー形式で日付ごとにメモ（チェックリスト）を管理するアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 取り扱う情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータは、お使いの端末内にのみ保存され、開発者のサーバーへ送信されることはありません：",
          items: [
            "各日付に作成したメモの内容（テキスト・チェック状態・並び順）",
            "メモに設定した開始・終了時刻",
            "仕切り（セクション名・色）の設定",
            "アプリ設定（テーマモード・テーマカラー・リマインダー設定など）",
            "パスコードロックの設定（パスコードは暗号化されたハッシュ値として端末のキーチェーンに保存され、元の数字は保存されません）",
            "広告削除の購入状態（端末内のキャッシュ）",
          ],
          note: "メモの内容は、広告配信事業者・課金管理サービスを含む第三者へ送信されることはありません。",
        },
        external: {
          title: "2-2. 広告・課金に関連して外部サービスが取得する情報",
          intro: "無料版では広告を表示し、広告削除の購入を提供するため、以下の外部サービスが一部の情報を自動的に取得する場合があります（詳細は「4. 外部サービスの利用」をご覧ください）：",
          items: [
            "広告の配信・表示・計測のための情報（端末の種類・OSのバージョン・IPアドレス・広告識別子・広告の表示やタップの状況など）",
            "広告に関する同意の選択状況（EEA・英国・スイスなどの対象地域）",
            "購入の管理のための情報（匿名のユーザーID・購入履歴・購読状況・端末やOSの基本情報）",
          ],
        },
        notCollected: {
          title: "2-3. 収集しない情報",
          intro: "本アプリは以下の情報を収集しません：",
          items: [
            "氏名・メールアドレス・電話番号などの個人識別情報（お問い合わせ時にお送りいただく場合を除く）",
            "アカウント情報（本アプリにはアカウント登録・ログイン機能がありません）",
            "位置情報",
            "連絡先・写真・カメラ・マイクなどへのアクセスデータ",
            "クレジットカード等の決済情報（決済はApple社が処理します）",
            "メモの内容",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "取り扱う情報は、以下の目的のみに使用されます：",
        items: [
          "メモ・設定の保存および表示",
          "フィルター・検索・未完了メモの移動など、アプリの機能の提供",
          "時刻を設定したメモのリマインダー通知（端末内で予約）",
          "パスコード・生体認証によるアプリのロック",
          "広告の表示、および広告削除の購入・復元の処理",
          "お問い合わせへの対応",
        ],
      },
      thirdParty: {
        title: "4. 外部サービスの利用・第三者への提供",
        content: "本アプリは、ユーザーの情報を販売することはなく、メモの内容を第三者へ提供することもありません。ただし、広告の表示と課金の管理のために、以下の外部サービスを利用しています。これらのサービスによる情報の取り扱いは、各社のプライバシーポリシーに従います。",
        services: [
          {
            name: "Google AdMob（Google LLC）",
            detail: "無料版で表示するバナー広告の配信に利用しています。広告の配信・計測のため、端末情報や広告識別子などが取得される場合があります。EEA・英国・スイスのユーザーには、Googleの同意管理プラットフォーム（UMP）により同意の確認を行い、設定画面の「プライバシー設定」から選択をいつでも見直せます。 詳細：https://policies.google.com/technologies/ads",
          },
          {
            name: "RevenueCat（RevenueCat, Inc.）",
            detail: "広告削除の購入状態の確認・復元のために利用しています。匿名のユーザーID・購入情報・端末の基本情報が送信されますが、メモの内容は送信されません。 詳細：https://www.revenuecat.com/privacy",
          },
          {
            name: "Apple App Store（Apple Inc.）",
            detail: "購入時の決済処理を行います。決済情報は当方には提供されません。",
          },
        ],
        note: "広告削除を購入すると、本アプリ内の広告は表示されなくなります。",
      },
      retention: {
        title: "5. データの保持と削除",
        content: "メモ・設定などのデータは、お使いの端末内に保存されます。アプリをアンインストールすると、端末内に保存されたすべてのメモデータおよび設定情報が削除されます。本アプリにはバックアップ・エクスポート機能がないため、削除されたデータの復元はできませんのでご注意ください。広告配信事業者および課金管理サービスが保持する情報は、各社のポリシーに従って取り扱われます。",
      },
      permissions: {
        title: "6. アプリのアクセス権限",
        intro: "本アプリが使用する可能性のある端末の機能は以下のとおりです。いずれも、該当する機能をお使いになるときにのみ確認します：",
        items: [
          {
            name: "通知（任意）",
            detail: "「時間を設定した項目を通知」をオンにしたときに、通知の許可を求めます。通知は端末内で予約・表示され、サーバーを経由しません。",
          },
          {
            name: "Face ID / Touch ID（任意）",
            detail: "パスコードロックで「生体認証でロック解除」をオンにしたときに使用します。認証はiOSが行い、本アプリが顔や指紋のデータを取得・保存することはありません。",
          },
        ],
      },
      security: {
        title: "7. セキュリティ",
        content: "メモのデータはお使いの端末のストレージに保存され、端末のセキュリティ設定（パスコード・Face ID等）や、本アプリのパスコードロックによって保護されます。パスコードは暗号化されたハッシュ値としてiOSのキーチェーンに保存されます。広告・課金に関する通信は、各サービスが提供する仕組みにより保護されます。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは、お子様の個人情報を意図して収集することはありません。ただし、無料版では第三者の広告配信サービスを利用しています。お子様が本アプリを使用することに保護者の方の懸念がある場合は、サポートまでお問い合わせください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        intro: "ユーザーは以下の権利を有します：",
        items: [
          "端末内のデータを自由に閲覧・編集・削除する権利",
          "アプリをアンインストールすることですべてのデータを消去する権利",
          "広告に関する同意の選択を見直す権利（対象地域のみ、設定画面の「プライバシー設定」から）",
          "端末のOS設定で、広告のトラッキングや通知を制限する権利",
        ],
        howTo: {
          title: "データの削除方法",
          content: "アプリ内でメモを個別に削除するか、アプリをアンインストールすることですべてのデータを削除できます。外部サービスが保持する情報の削除をご希望の場合は、お問い合わせください。",
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
        content: "カレンダーメモ(이하 '본 앱')는 캘린더 형식으로 날짜별로 메모(체크리스트)를 관리하는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 정보 처리 방법에 대해 설명합니다.",
        consent: "본 앱을 이용하심으로써 본 개인정보 처리방침에 동의한 것으로 간주합니다.",
      },
      dataCollection: {
        title: "2. 처리하는 정보",
        local: {
          title: "2-1. 기기에 저장되는 데이터",
          intro: "다음 데이터는 사용 중인 기기 내에만 저장되며 개발자의 서버로 전송되지 않습니다:",
          items: [
            "각 날짜에 작성한 메모 내용(텍스트・체크 상태・정렬 순서)",
            "메모에 설정한 시작・종료 시각",
            "구분선(섹션 이름・색상) 설정",
            "앱 설정(테마 모드・테마 색상・알림 설정 등)",
            "패스코드 잠금 설정(패스코드는 암호화된 해시 값으로 기기의 키체인에 저장되며 원래 숫자는 저장되지 않습니다)",
            "광고 제거 구매 상태(기기 내 캐시)",
          ],
          note: "메모 내용은 광고 제공업체・결제 관리 서비스를 포함한 제3자에게 전송되지 않습니다.",
        },
        external: {
          title: "2-2. 광고・결제와 관련하여 외부 서비스가 수집하는 정보",
          intro: "무료 버전에서는 광고를 표시하고 광고 제거 구매를 제공하기 위해 다음 외부 서비스가 일부 정보를 자동으로 수집할 수 있습니다(자세한 내용은 「4. 외부 서비스 이용」 참조):",
          items: [
            "광고 제공・표시・측정을 위한 정보(기기 종류・OS 버전・IP 주소・광고 식별자・광고 표시 및 탭 상황 등)",
            "광고에 관한 동의 선택 상태(EEA・영국・스위스 등 해당 지역)",
            "구매 관리를 위한 정보(익명 사용자 ID・구매 내역・구독 상태・기기 및 OS 기본 정보)",
          ],
        },
        notCollected: {
          title: "2-3. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 수집하지 않습니다:",
          items: [
            "이름・이메일 주소・전화번호 등 개인 식별 정보(문의 시 직접 보내주신 경우 제외)",
            "계정 정보(본 앱에는 회원 가입・로그인 기능이 없습니다)",
            "위치 정보",
            "연락처・사진・카메라・마이크 등에 대한 접근 데이터",
            "신용카드 등 결제 정보(결제는 Apple이 처리합니다)",
            "메모 내용",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "처리하는 정보는 다음 목적으로만 사용됩니다:",
        items: [
          "메모・설정의 저장 및 표시",
          "필터・검색・미완료 메모 이동 등 앱 기능 제공",
          "시각을 설정한 메모의 알림(기기 내에서 예약)",
          "패스코드・생체 인증을 통한 앱 잠금",
          "광고 표시 및 광고 제거 구매・복원 처리",
          "문의 대응",
        ],
      },
      thirdParty: {
        title: "4. 외부 서비스 이용 및 제3자 제공",
        content: "본 앱은 사용자의 정보를 판매하지 않으며 메모 내용을 제3자에게 제공하지 않습니다. 다만 광고 표시와 결제 관리를 위해 다음 외부 서비스를 이용하고 있습니다. 이들 서비스의 정보 처리는 각 회사의 개인정보 처리방침에 따릅니다.",
        services: [
          {
            name: "Google AdMob (Google LLC)",
            detail: "무료 버전에서 표시되는 배너 광고 제공에 이용합니다. 광고 제공・측정을 위해 기기 정보나 광고 식별자 등이 수집될 수 있습니다. EEA・영국・스위스 사용자에게는 Google의 동의 관리 플랫폼(UMP)으로 동의를 확인하며, 설정 화면의 「개인정보 설정」에서 언제든지 선택을 다시 확인할 수 있습니다. 자세한 내용: https://policies.google.com/technologies/ads",
          },
          {
            name: "RevenueCat (RevenueCat, Inc.)",
            detail: "광고 제거 구매 상태의 확인・복원에 이용합니다. 익명 사용자 ID・구매 정보・기기 기본 정보가 전송되지만 메모 내용은 전송되지 않습니다. 자세한 내용: https://www.revenuecat.com/privacy",
          },
          {
            name: "Apple App Store (Apple Inc.)",
            detail: "구매 시 결제를 처리합니다. 결제 정보는 개발자에게 제공되지 않습니다.",
          },
        ],
        note: "광고 제거를 구매하면 앱 내 광고가 표시되지 않습니다.",
      },
      retention: {
        title: "5. 데이터 보관 및 삭제",
        content: "메모・설정 등의 데이터는 사용 중인 기기 내에 저장됩니다. 앱을 삭제하면 기기에 저장된 모든 메모 데이터와 설정 정보가 삭제됩니다. 본 앱에는 백업・내보내기 기능이 없으므로 삭제된 데이터는 복원할 수 없으니 주의해 주세요. 광고 제공업체 및 결제 관리 서비스가 보관하는 정보는 각 회사의 정책에 따라 처리됩니다.",
      },
      permissions: {
        title: "6. 앱 접근 권한",
        intro: "본 앱이 사용할 수 있는 기기 기능은 다음과 같습니다. 모두 해당 기능을 사용할 때에만 확인합니다:",
        items: [
          {
            name: "알림(선택)",
            detail: "「시간을 설정한 항목 알림」을 켤 때 알림 허용을 요청합니다. 알림은 기기 내에서 예약・표시되며 서버를 거치지 않습니다.",
          },
          {
            name: "Face ID / Touch ID(선택)",
            detail: "패스코드 잠금에서 「생체 인증으로 잠금 해제」를 켤 때 사용합니다. 인증은 iOS가 수행하며 본 앱이 얼굴이나 지문 데이터를 취득・저장하지 않습니다.",
          },
        ],
      },
      security: {
        title: "7. 보안",
        content: "메모 데이터는 기기의 저장소에 저장되며 기기의 보안 설정(패스코드・Face ID 등)과 본 앱의 패스코드 잠금으로 보호됩니다. 패스코드는 암호화된 해시 값으로 iOS 키체인에 저장됩니다. 광고・결제 관련 통신은 각 서비스가 제공하는 방식으로 보호됩니다.",
      },
      children: {
        title: "8. 아동의 개인정보",
        content: "본 앱은 아동의 개인정보를 의도적으로 수집하지 않습니다. 다만 무료 버전에서는 제3자 광고 제공 서비스를 이용하고 있습니다. 보호자께서 아동의 본 앱 사용에 우려가 있으시면 지원팀에 문의해 주세요.",
      },
      userRights: {
        title: "9. 사용자의 권리",
        intro: "사용자는 다음 권리를 가집니다:",
        items: [
          "기기 내 데이터를 자유롭게 열람・편집・삭제할 권리",
          "앱을 삭제하여 모든 데이터를 삭제할 권리",
          "광고 관련 동의 선택을 다시 확인할 권리(해당 지역 한정, 설정 화면의 「개인정보 설정」)",
          "기기의 OS 설정에서 광고 추적이나 알림을 제한할 권리",
        ],
        howTo: {
          title: "데이터 삭제 방법",
          content: "앱 내에서 메모를 개별적으로 삭제하거나 앱을 삭제하여 모든 데이터를 삭제할 수 있습니다. 외부 서비스가 보관하는 정보의 삭제를 원하시면 문의해 주세요.",
        },
      },
      changes: {
        title: "10. 개인정보 처리방침 변경",
        content: "본 개인정보 처리방침은 필요에 따라 업데이트될 수 있습니다. 중요한 변경이 있는 경우 앱 업데이트 또는 본 페이지를 통해 알려드립니다. 정기적으로 본 페이지를 확인하시기 바랍니다.",
      },
      contact: {
        title: "11. 문의",
        content: "본 개인정보 처리방침에 관한 질문이나 의견은 아래 이메일 주소로 문의해 주세요.",
        email: SUPPORT_EMAIL,
        responseTime: "응답 시간: 48시간 이내",
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
        content: "カレンダーメモ (the \"App\") is an app for managing memos (checklists) by date in a calendar format. This Privacy Policy explains how information is handled when you use the App.",
        consent: "By using the App, you are deemed to have agreed to this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Handle",
        local: {
          title: "2-1. Data Stored on Your Device",
          intro: "The following data is stored only on your device and is never sent to the developer's servers:",
          items: [
            "Memo content created for each date (text, checked state, order)",
            "Start and end times set on memos",
            "Divider settings (section name and color)",
            "App settings (theme mode, theme color, reminder settings, etc.)",
            "Passcode lock settings (the passcode is stored as an encrypted hash in your device's Keychain; the original digits are not stored)",
            "Ad-removal purchase status (cached on your device)",
          ],
          note: "Your memo content is never sent to third parties, including ad providers and purchase management services.",
        },
        external: {
          title: "2-2. Information Obtained by External Services for Ads and Purchases",
          intro: "To show ads in the free version and offer an ad-removal purchase, the following external services may automatically obtain some information (see \"4. External Services\" for details):",
          items: [
            "Information for ad delivery, display, and measurement (device type, OS version, IP address, advertising identifier, ad impressions and taps, etc.)",
            "Your ad consent choices (in applicable regions such as the EEA, UK, and Switzerland)",
            "Information for managing purchases (anonymous user ID, purchase history, subscription status, basic device and OS information)",
          ],
        },
        notCollected: {
          title: "2-3. Information We Do Not Collect",
          intro: "The App does not collect the following information:",
          items: [
            "Personally identifying information such as name, email address, or phone number (except what you send us when contacting support)",
            "Account information (the App has no sign-up or login)",
            "Location information",
            "Data from your contacts, photos, camera, or microphone",
            "Payment information such as credit card details (payments are processed by Apple)",
            "The content of your memos",
          ],
        },
      },
      purpose: {
        title: "3. How We Use Information",
        intro: "The information we handle is used only for the following purposes:",
        items: [
          "Saving and displaying memos and settings",
          "Providing App features such as filtering, search, and moving unchecked memos",
          "Reminder notifications for timed memos (scheduled on your device)",
          "Locking the App with a passcode or biometrics",
          "Displaying ads and processing ad-removal purchases and restores",
          "Responding to your inquiries",
        ],
      },
      thirdParty: {
        title: "4. External Services and Third Parties",
        content: "We do not sell your information, and we do not provide your memo content to third parties. However, the App uses the following external services to display ads and manage purchases. Their handling of information is governed by each company's privacy policy.",
        services: [
          {
            name: "Google AdMob (Google LLC)",
            detail: "Used to deliver banner ads shown in the free version. Device information and advertising identifiers may be obtained for ad delivery and measurement. For users in the EEA, UK, and Switzerland, consent is requested through Google's User Messaging Platform (UMP), and you can review your choices at any time from \"Privacy Settings\" in the Settings screen. Details: https://policies.google.com/technologies/ads",
          },
          {
            name: "RevenueCat (RevenueCat, Inc.)",
            detail: "Used to verify and restore your ad-removal purchase. An anonymous user ID, purchase information, and basic device information are sent; memo content is not. Details: https://www.revenuecat.com/privacy",
          },
          {
            name: "Apple App Store (Apple Inc.)",
            detail: "Processes payments for purchases. Payment information is not provided to us.",
          },
        ],
        note: "Once you purchase ad removal, ads are no longer shown in the App.",
      },
      retention: {
        title: "5. Data Retention and Deletion",
        content: "Memos, settings, and other data are stored on your device. Uninstalling the App deletes all memo data and settings stored on your device. The App has no backup or export feature, so deleted data cannot be recovered. Information held by ad providers and purchase management services is handled according to each company's policies.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App may use the following device features. Each is requested only when you use the related feature:",
        items: [
          {
            name: "Notifications (optional)",
            detail: "Permission is requested when you turn on \"Remind me of timed items\". Notifications are scheduled and shown on your device and do not go through a server.",
          },
          {
            name: "Face ID / Touch ID (optional)",
            detail: "Used when you turn on \"Unlock with Biometrics\" for the passcode lock. Authentication is performed by iOS; the App never obtains or stores your face or fingerprint data.",
          },
        ],
      },
      security: {
        title: "7. Security",
        content: "Memo data is stored in your device's storage and is protected by your device's security settings (passcode, Face ID, etc.) and the App's passcode lock. The passcode is stored as an encrypted hash in the iOS Keychain. Communications related to ads and purchases are protected by the mechanisms provided by each service.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App does not knowingly collect personal information from children. Note that the free version uses third-party ad delivery services. If you are a parent or guardian and have concerns about your child using the App, please contact our support team.",
      },
      userRights: {
        title: "9. User Rights",
        intro: "Users have the following rights:",
        items: [
          "The right to freely view, edit, and delete data stored on your device",
          "The right to delete all data by uninstalling the App",
          "The right to review your ad consent choices (applicable regions only, from \"Privacy Settings\" in the Settings screen)",
          "The right to limit ad tracking and notifications in your device's OS settings",
        ],
        howTo: {
          title: "How to Delete Your Data",
          content: "You can delete individual memos within the App, or uninstall the App to remove all data. If you would like information held by external services deleted, please contact us.",
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
          <ul className="list-disc list-inside space-y-1 mb-3 text-gray-700">
            {s.dataCollection.local.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mb-6">{s.dataCollection.local.note}</p>

          <h3 className="font-medium text-gray-800 mb-2">{s.dataCollection.external.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.external.intro}</p>
          <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700">
            {s.dataCollection.external.items.map((item, i) => (
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
          <p className="text-gray-700 leading-relaxed mb-4">{s.thirdParty.content}</p>
          <div className="space-y-3 mb-4">
            {s.thirdParty.services.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-1">{item.name}</p>
                <p className="text-sm text-gray-600 break-words">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">{s.thirdParty.note}</p>
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
