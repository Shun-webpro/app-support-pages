"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/quizcards.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED = "2026年5月6日 / May 6, 2026 / 2026년 5월 6일";

type Language = "ja" | "en" | "ko";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

type SectionData = {
  intro: { title: string; content: string; consent: string };
  dataCollection: {
    title: string;
    userProvided: {
      title: string;
      image: { title: string; items: string[] };
      voice: { title: string; items: string[] };
      text: { title: string; items: string[] };
    };
    autoCollected: {
      title: string;
      deviceId: { title: string; items: string[] };
      subscription: { title: string; items: string[] };
      appUsage: { title: string; items: string[] };
    };
    notCollected: { title: string; intro: string; items: string[] };
  };
  purpose: {
    title: string;
    intro: string;
    tableHeaders: [string, string];
    rows: [string, string][];
  };
  thirdParty: {
    title: string;
    intro: string;
    providers: {
      name: string;
      plan: string;
      data: string;
      purpose: string;
      retention: string;
      policyLabel: string;
      policyUrl: string;
    }[];
    important: string;
  };
  retention: {
    title: string;
    local: { title: string; intro: string; items: string[]; deletion: string };
    server: { title: string; content: string };
    thirdParty: { title: string; content: string };
  };
  security: { title: string; items: string[]; disclaimer: string };
  children: { title: string; content: string; action: string };
  userRights: {
    title: string;
    japan: { title: string; intro: string; items: string[] };
    gdpr: { title: string; intro: string; items: string[] };
    ccpa: { title: string; intro: string; items: string[] };
    howTo: { title: string; content: string };
  };
  cookies: { title: string; content: string; revenueCat: string; att: string };
  internationalTransfer: { title: string; content: string; note: string };
  changes: { title: string; content: string; consent: string };
  contact: { title: string; content: string; email: string; responseTime: string };
  appStoreLabel: {
    title: string;
    description: string;
    tableHeaders: [string, string, string, string];
    rows: [string, string, string, string][];
    trackingNote: string;
    languageNote: string;
  };
};

const TRANSLATIONS: Record<Language, {
  title: string;
  lastUpdated: string;
  backToSupport: string;
  tableOfContents: string;
  sections: SectionData;
}> = {
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日",
    backToSupport: "サポートページに戻る",
    tableOfContents: "目次",
    sections: {
      intro: {
        title: "1. はじめに",
        content: "SnapQuiz（以下「本アプリ」）は、AIを活用して画像・テキスト・音声からクイズを自動生成する学習アプリです。本プライバシーポリシーは、本アプリをご利用いただく際に収集する情報の種類、利用目的、管理方法、および第三者への提供について説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに記載された内容に同意したものとみなします。同意いただけない場合は、本アプリのご利用をお控えください。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        userProvided: {
          title: "2-1. ユーザーが提供する情報",
          image: {
            title: "(a) カメラ・フォトライブラリの画像",
            items: [
              "ユーザーがクイズ生成のために撮影またはアルバムから選択した画像",
              "画像はAIによるクイズ生成処理のためにSupabase Edge Functions に送信されます",
              "処理完了後は当社サーバーに保存されません",
              "収集タイミング: ユーザーが画像を選択してクイズ生成を実行したとき",
            ],
          },
          voice: {
            title: "(b) 音声データ（スピーキング問題）",
            items: [
              "スピーキング問題の録音データ",
              "録音は端末内での採点処理にのみ使用され、外部サーバーには送信されません",
              "収集タイミング: スピーキング問題に回答したとき",
            ],
          },
          text: {
            title: "(c) テキスト・キーワード入力",
            items: [
              "ユーザーがクイズ生成時に入力するキーワードや本文テキスト",
              "AI クイズ生成のために Supabase Edge Functions に送信されます",
              "処理完了後は当社サーバーに保存されません",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 自動的に収集される情報",
          deviceId: {
            title: "(a) デバイス識別子",
            items: [
              "RevenueCat が購読管理のために収集するデバイス固有の識別子",
              "広告目的では使用しません",
            ],
          },
          subscription: {
            title: "(b) 購読・課金情報",
            items: [
              "ご利用のサブスクリプションプラン（Free / Premium）",
              "Apple App Store / Google Play による購入レシート情報（決済情報はApple・Googleが管理し、当社はカード番号等を取得しません）",
            ],
          },
          appUsage: {
            title: "(c) アプリ利用データ（端末内のみ）",
            items: [
              "作成したクイズ・フォルダ・学習履歴",
              "アプリ設定・通知設定",
              "学習進捗・スコア",
            ],
          },
        },
        notCollected: {
          title: "2-3. 収集しない情報",
          intro: "本アプリは以下の情報を一切収集しません：",
          items: [
            "氏名・メールアドレス・住所等の個人識別情報（アカウント登録不要）",
            "位置情報",
            "連絡先",
            "健康・フィットネスデータ",
            "広告目的のトラッキングデータ",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "収集した情報は以下の目的にのみ使用します：",
        tableHeaders: ["情報の種類", "利用目的"],
        rows: [
          ["画像データ", "AIによるクイズ問題の自動生成"],
          ["テキスト・キーワード", "AIによるクイズ問題の自動生成"],
          ["音声データ", "スピーキング問題の端末内採点"],
          ["デバイス識別子", "購読ステータスの確認・管理"],
          ["購読情報", "プラン別機能の提供、有効な購読の確認"],
          ["利用データ（ローカル）", "学習進捗の表示・クイズ管理"],
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        intro: "本アプリは、サービス提供のために以下の第三者サービスを利用します。各サービスへのデータ送信は、機能利用時にのみ発生します。",
        providers: [
          {
            name: "4-1. Supabase / AI（クイズ生成）",
            plan: "対象: クイズ生成機能利用時",
            data: "送信するデータ: 入力テキスト・キーワード、画像データ（Base64）",
            purpose: "利用目的: AIによるクイズ問題・選択肢・解説の自動生成",
            retention: "データ保持: 処理後に当社サーバーには保存されません。Supabase のデータ保持ポリシーに従います",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. RevenueCat（購読管理）",
            plan: "対象: 全ユーザー（Premium の購読管理）",
            data: "送信するデータ: デバイス識別子、App Store / Google Play 購入レシート",
            purpose: "利用目的: 購読ステータスの確認・管理",
            retention: "",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "重要: 上記以外の第三者（広告ネットワーク、データブローカー等）に対して、ユーザーの個人情報を販売・共有・提供することは一切ありません。",
      },
      retention: {
        title: "5. データの保存と保持期間",
        local: {
          title: "端末内（ローカルストレージ）",
          intro: "以下のデータはユーザーの端末内にのみ保存され、当社サーバーには送信されません：",
          items: ["作成したクイズ・フォルダ", "学習履歴・スコア", "アプリ設定・通知設定"],
          deletion: "これらのデータは、アプリをアンインストールすることで削除されます。クラウド同期は行われないため、再インストール時にデータは復元されません。",
        },
        server: {
          title: "当社サーバー",
          content: "本アプリはユーザーアカウントを必要とせず、クイズ生成処理後の入力データを当社のサーバーに保存しません。すべての学習データは端末内（SQLite）にのみ保存されます。",
        },
        thirdParty: {
          title: "第三者サービス",
          content: "各第三者サービスのデータ保持ポリシーは、各社のプライバシーポリシーをご参照ください。",
        },
      },
      security: {
        title: "6. データのセキュリティ",
        items: [
          "通信の暗号化: すべてのデータ通信は HTTPS/TLS により暗号化されます",
          "最小権限原則: クイズ生成処理に必要な最小限のデータのみを送信します",
          "ローカル保存優先: 学習データはすべて端末内に保存し、クラウドへのデータ送信を最小化します",
          "音声データ: スピーキング問題の録音は端末内のみで処理し、外部に送信しません",
        ],
        disclaimer: "ただし、インターネット経由のデータ転送には固有のリスクが伴い、完全なセキュリティを保証することはできません。",
      },
      children: {
        title: "7. お子様のプライバシー（COPPA対応）",
        content: "本アプリは13歳未満の子供を対象としておらず、意図的に13歳未満の子供から個人情報を収集することはありません。",
        action: "13歳未満の子供が本アプリを利用していることが判明した場合、関連する情報を速やかに削除するために合理的な措置を講じます。お子様が本アプリを利用していることをご存知の保護者の方は、下記お問い合わせ先までご連絡ください。",
      },
      userRights: {
        title: "8. ユーザーの権利",
        japan: {
          title: "8-1. 日本国内のユーザー",
          intro: "個人情報保護法に基づき、以下の権利を有します：",
          items: ["保有する個人情報の開示請求", "内容の訂正・追加・削除の請求", "利用停止・消去の請求"],
        },
        gdpr: {
          title: "8-2. EEA・UK のユーザー（GDPR）",
          intro: "GDPR に基づき、以下の権利を有します：",
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
          intro: "CCPA に基づき、以下の権利を有します：",
          items: [
            "収集する個人情報のカテゴリと目的の開示請求",
            "個人情報の削除請求",
            "個人情報の販売のオプトアウト（当社は個人情報を販売しません）",
          ],
        },
        howTo: {
          title: "権利行使の方法",
          content: "本アプリはローカルに保存されたデータについては、アプリのアンインストールにより削除できます。その他の権利行使については、下記お問い合わせ先までご連絡ください。",
        },
      },
      cookies: {
        title: "9. Cookieおよびトラッキング技術",
        content: "本アプリはWebブラウザ上で動作するものではないため、Cookie は使用しません。",
        revenueCat: "RevenueCat SDK はデバイス識別子を使用しますが、広告目的のクロスアプリトラッキングは行いません。",
        att: "Apple の App Tracking Transparency（ATT）フレームワークが要求する広告目的のトラッキングは実施していないため、ATT のプロンプトは表示されません。",
      },
      internationalTransfer: {
        title: "10. 国際データ転送",
        content: "本アプリが利用する第三者サービスのサーバーは主に米国に所在しています。日本からデータを送信する場合、そのデータは国外に転送されます。",
        note: "各第三者サービスは、適切なデータ保護措置（標準契約条項等）を講じています。詳細は各社のプライバシーポリシーをご参照ください。",
      },
      changes: {
        title: "11. プライバシーポリシーの変更",
        content: "当社は、本プライバシーポリシーを随時更新することがあります。重要な変更が生じた場合は、アプリ内通知または本ページ上部の「最終更新日」の更新によりお知らせします。",
        consent: "変更後も本アプリを継続してご利用いただく場合は、更新後のプライバシーポリシーに同意したものとみなします。",
      },
      contact: {
        title: "12. お問い合わせ",
        content: "本プライバシーポリシーに関するご質問・権利行使の申請は、以下までお問い合わせください：",
        email: "メールアドレス",
        responseTime: "お問い合わせから原則30日以内にご回答いたします。",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label 対応表",
        description: "App Store の App Privacy セクション向け開示情報です。",
        tableHeaders: ["データの種類", "収集するか", "追跡するか", "利用目的"],
        rows: [
          ["画像データ", "○（処理時のみ）", "×", "App Functionality（クイズ生成）"],
          ["テキスト入力", "○（処理時のみ）", "×", "App Functionality（クイズ生成）"],
          ["音声データ", "○（端末内のみ）", "×", "App Functionality（スピーキング採点）"],
          ["識別子（デバイスID）", "○", "×", "App Functionality（購読管理）"],
          ["購入情報", "○", "×", "App Functionality（購読管理）"],
          ["利用状況データ", "○（端末内のみ）", "×", "App Functionality（学習進捗）"],
          ["氏名・連絡先・位置情報等", "×", "×", "—"],
        ],
        trackingNote: "「追跡」= 第三者の広告・分析目的でのデータ利用。本アプリはいずれのデータも広告目的で追跡しません。",
        languageNote: "本プライバシーポリシーは日本語を正文とします。",
      },
    },
  },

  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    backToSupport: "Back to Support",
    tableOfContents: "Table of Contents",
    sections: {
      intro: {
        title: "1. Introduction",
        content: "SnapQuiz (the \"App\") is a learning app that uses AI to automatically generate quizzes from images, text, and audio. This Privacy Policy explains what information we collect, how we use it, how we manage it, and when we share it with third parties.",
        consent: "By using the App, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the App.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        userProvided: {
          title: "2-1. Information You Provide",
          image: {
            title: "(a) Camera & Photo Library Images",
            items: [
              "Photos taken or selected from your album for quiz generation",
              "Images are sent to Supabase Edge Functions for AI quiz generation processing",
              "Not stored on our servers after processing",
              "Collected when: you select an image and trigger quiz generation",
            ],
          },
          voice: {
            title: "(b) Audio Data (Speaking Questions)",
            items: [
              "Voice recordings for speaking-type quiz questions",
              "Processed entirely on-device for scoring; never sent to external servers",
              "Collected when: you answer a speaking question",
            ],
          },
          text: {
            title: "(c) Text & Keyword Input",
            items: [
              "Keywords or body text entered by you to generate quizzes",
              "Sent to Supabase Edge Functions for AI quiz generation",
              "Not stored on our servers after processing",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Automatically Collected Information",
          deviceId: {
            title: "(a) Device Identifier",
            items: [
              "A device-specific identifier collected by RevenueCat for subscription management",
              "Not used for advertising purposes",
            ],
          },
          subscription: {
            title: "(b) Subscription & Purchase Information",
            items: [
              "Your subscription plan (Free / Premium)",
              "Purchase receipt from Apple App Store or Google Play (payment details are managed by Apple/Google; we never receive card numbers)",
            ],
          },
          appUsage: {
            title: "(c) App Usage Data (On-device only)",
            items: [
              "Quizzes, folders, and study history you create",
              "App and notification settings",
              "Study progress and scores",
            ],
          },
        },
        notCollected: {
          title: "2-3. Information We Do Not Collect",
          intro: "The App does not collect any of the following:",
          items: [
            "Personally identifiable information such as name, email address, or postal address (no account required)",
            "Location data",
            "Contacts",
            "Health or fitness data",
            "Tracking data for advertising purposes",
          ],
        },
      },
      purpose: {
        title: "3. How We Use Your Information",
        intro: "Collected information is used solely for the following purposes:",
        tableHeaders: ["Data Type", "Purpose"],
        rows: [
          ["Image data", "AI-powered automatic quiz generation"],
          ["Text / Keywords", "AI-powered automatic quiz generation"],
          ["Audio data", "On-device scoring of speaking questions"],
          ["Device identifier", "Verifying and managing subscription status"],
          ["Subscription info", "Providing plan-based features; verifying active subscription"],
          ["Usage data (local)", "Displaying study progress; managing quizzes"],
        ],
      },
      thirdParty: {
        title: "4. Sharing Information with Third Parties",
        intro: "The App uses the following third-party services to provide its functionality. Data is only transmitted to these services when the relevant feature is used.",
        providers: [
          {
            name: "4-1. Supabase / AI (Quiz Generation)",
            plan: "When: quiz generation feature is used",
            data: "Data sent: input text/keywords, image data (Base64)",
            purpose: "Purpose: AI-powered generation of quiz questions, answer choices, and explanations",
            retention: "Retention: not stored on our servers after processing; subject to Supabase's data retention policy",
            policyLabel: "Privacy Policy",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. RevenueCat (Subscription Management)",
            plan: "When: all users (Premium subscription management)",
            data: "Data sent: device identifier, App Store / Google Play purchase receipt",
            purpose: "Purpose: verifying and managing subscription status",
            retention: "",
            policyLabel: "Privacy Policy",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "Important: We never sell, share, or provide users' personal information to any other third parties (advertising networks, data brokers, etc.).",
      },
      retention: {
        title: "5. Data Storage & Retention",
        local: {
          title: "On-device (Local Storage)",
          intro: "The following data is stored only on your device and never sent to our servers:",
          items: ["Quizzes and folders you create", "Study history and scores", "App and notification settings"],
          deletion: "This data is deleted when you uninstall the App. There is no cloud sync, so data cannot be restored after reinstallation.",
        },
        server: {
          title: "Our Servers",
          content: "The App requires no user account and does not store input data on our servers after quiz generation. All study data is stored solely on-device (SQLite).",
        },
        thirdParty: {
          title: "Third-party Services",
          content: "For each third-party service's data retention policy, please refer to their respective privacy policies.",
        },
      },
      security: {
        title: "6. Data Security",
        items: [
          "Encrypted communication: all data transmissions are encrypted via HTTPS/TLS",
          "Principle of least privilege: only the minimum data needed for quiz generation is transmitted",
          "Local-first storage: study data is stored on-device, minimizing cloud data transmission",
          "Audio data: speaking question recordings are processed entirely on-device and never transmitted externally",
        ],
        disclaimer: "However, no method of data transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
      children: {
        title: "7. Children's Privacy (COPPA)",
        content: "The App is not directed at children under the age of 13, and we do not knowingly collect personal information from children under 13.",
        action: "If we become aware that a child under 13 is using the App, we will take reasonable steps to promptly delete any related information. Parents or guardians who are aware of such use are encouraged to contact us at the address below.",
      },
      userRights: {
        title: "8. Your Rights",
        japan: {
          title: "8-1. Users in Japan",
          intro: "Under the Act on the Protection of Personal Information, you have the right to:",
          items: ["Request disclosure of personal information we hold", "Request correction, addition, or deletion of content", "Request suspension of use or erasure"],
        },
        gdpr: {
          title: "8-2. Users in the EEA & UK (GDPR)",
          intro: "Under the GDPR, you have the right to:",
          items: [
            "Access: access the personal data we hold",
            "Rectification: correct inaccurate personal data",
            "Erasure (right to be forgotten): delete your personal data",
            "Restriction of processing: restrict how we process your data",
            "Data portability: receive and transfer your data",
            "Objection: object to the processing of your personal data",
          ],
        },
        ccpa: {
          title: "8-3. California Users (CCPA)",
          intro: "Under the CCPA, you have the right to:",
          items: [
            "Request disclosure of the categories and purposes of personal information we collect",
            "Request deletion of your personal information",
            "Opt out of the sale of your personal information (we do not sell personal information)",
          ],
        },
        howTo: {
          title: "How to Exercise Your Rights",
          content: "Data stored locally on the App can be deleted by uninstalling the App. For all other rights requests, please contact us at the address below.",
        },
      },
      cookies: {
        title: "9. Cookies & Tracking Technologies",
        content: "The App does not run in a web browser and therefore does not use cookies.",
        revenueCat: "The RevenueCat SDK uses a device identifier but does not perform cross-app tracking for advertising purposes.",
        att: "The App does not conduct advertising-related tracking as required by Apple's App Tracking Transparency (ATT) framework, so no ATT prompt is displayed.",
      },
      internationalTransfer: {
        title: "10. International Data Transfers",
        content: "The servers of the third-party services used by the App are primarily located in the United States. Data sent from other countries may be transferred internationally.",
        note: "Each third-party service has appropriate data protection measures in place (e.g., Standard Contractual Clauses). Please refer to each service's privacy policy for details.",
      },
      changes: {
        title: "11. Changes to This Privacy Policy",
        content: "We may update this Privacy Policy from time to time. If significant changes are made, we will notify you via an in-app notification or by updating the \"Last Updated\" date at the top of this page.",
        consent: "Your continued use of the App after any changes constitutes your acceptance of the updated Privacy Policy.",
      },
      contact: {
        title: "12. Contact Us",
        content: "For questions about this Privacy Policy or to exercise your rights, please contact us:",
        email: "Email",
        responseTime: "We will respond within 30 days of receiving your inquiry.",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label",
        description: "Disclosure information for the App Privacy section of the App Store.",
        tableHeaders: ["Data Type", "Collected", "Tracked", "Purpose"],
        rows: [
          ["Image data", "Yes (processing only)", "No", "App Functionality (quiz generation)"],
          ["Text input", "Yes (processing only)", "No", "App Functionality (quiz generation)"],
          ["Audio data", "Yes (on-device only)", "No", "App Functionality (speaking scoring)"],
          ["Identifiers (device ID)", "Yes", "No", "App Functionality (subscription management)"],
          ["Purchase info", "Yes", "No", "App Functionality (subscription management)"],
          ["Usage data", "Yes (on-device only)", "No", "App Functionality (study progress)"],
          ["Name, contacts, location, etc.", "No", "No", "—"],
        ],
        trackingNote: "\"Tracked\" = data used for third-party advertising or analytics. The App does not track any data for advertising purposes.",
        languageNote: "This Privacy Policy is provided in Japanese, English, and Korean. In case of any discrepancy, the Japanese version shall prevail.",
      },
    },
  },

  ko: {
    title: "개인정보처리방침",
    lastUpdated: "최종 업데이트",
    backToSupport: "지원 페이지로 돌아가기",
    tableOfContents: "목차",
    sections: {
      intro: {
        title: "1. 소개",
        content: "SnapQuiz(이하 \"본 앱\")는 AI를 활용하여 이미지·텍스트·음성으로부터 퀴즈를 자동 생성하는 학습 앱입니다. 본 개인정보처리방침은 본 앱 이용 시 수집하는 정보의 종류, 이용 목적, 관리 방법 및 제3자 제공에 대해 설명합니다.",
        consent: "본 앱을 이용함으로써 본 개인정보처리방침의 내용에 동의한 것으로 간주합니다. 동의하지 않으시는 경우 본 앱의 이용을 삼가 주시기 바랍니다.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        userProvided: {
          title: "2-1. 사용자가 제공하는 정보",
          image: {
            title: "(a) 카메라 및 사진 라이브러리 이미지",
            items: [
              "퀴즈 생성을 위해 촬영하거나 앨범에서 선택한 이미지",
              "이미지는 AI 퀴즈 생성 처리를 위해 Supabase Edge Functions으로 전송됩니다",
              "처리 완료 후 당사 서버에 저장되지 않습니다",
              "수집 시점: 이미지를 선택하여 퀴즈 생성을 실행할 때",
            ],
          },
          voice: {
            title: "(b) 음성 데이터 (스피킹 문제)",
            items: [
              "스피킹 유형 퀴즈 문제의 녹음 데이터",
              "기기 내에서만 채점 처리에 사용되며, 외부 서버로 전송되지 않습니다",
              "수집 시점: 스피킹 문제에 답변할 때",
            ],
          },
          text: {
            title: "(c) 텍스트 및 키워드 입력",
            items: [
              "퀴즈 생성 시 입력하는 키워드 또는 본문 텍스트",
              "AI 퀴즈 생성을 위해 Supabase Edge Functions으로 전송됩니다",
              "처리 완료 후 당사 서버에 저장되지 않습니다",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 자동으로 수집되는 정보",
          deviceId: {
            title: "(a) 기기 식별자",
            items: [
              "RevenueCat이 구독 관리를 위해 수집하는 기기 고유 식별자",
              "광고 목적으로는 사용하지 않습니다",
            ],
          },
          subscription: {
            title: "(b) 구독 및 결제 정보",
            items: [
              "이용 중인 구독 플랜 (Free / Premium)",
              "Apple App Store / Google Play 구매 영수증 정보 (결제 정보는 Apple·Google이 관리하며, 당사는 카드 번호 등을 취득하지 않습니다)",
            ],
          },
          appUsage: {
            title: "(c) 앱 이용 데이터 (기기 내 저장)",
            items: [
              "생성한 퀴즈·폴더·학습 기록",
              "앱 설정·알림 설정",
              "학습 진행 상황·점수",
            ],
          },
        },
        notCollected: {
          title: "2-3. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다:",
          items: [
            "성명·이메일 주소·주소 등 개인 식별 정보 (계정 등록 불필요)",
            "위치 정보",
            "연락처",
            "건강·피트니스 데이터",
            "광고 목적의 추적 데이터",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "수집한 정보는 다음 목적에만 사용됩니다:",
        tableHeaders: ["정보 종류", "이용 목적"],
        rows: [
          ["이미지 데이터", "AI 기반 퀴즈 문제 자동 생성"],
          ["텍스트 / 키워드", "AI 기반 퀴즈 문제 자동 생성"],
          ["음성 데이터", "스피킹 문제 기기 내 채점"],
          ["기기 식별자", "구독 상태 확인 및 관리"],
          ["구독 정보", "플랜별 기능 제공, 유효한 구독 확인"],
          ["이용 데이터 (로컬)", "학습 진행 상황 표시 및 퀴즈 관리"],
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스 제공",
        intro: "본 앱은 서비스 제공을 위해 다음 제3자 서비스를 이용합니다. 각 서비스로의 데이터 전송은 해당 기능 이용 시에만 발생합니다.",
        providers: [
          {
            name: "4-1. Supabase / AI (퀴즈 생성)",
            plan: "대상: 퀴즈 생성 기능 이용 시",
            data: "전송 데이터: 입력 텍스트·키워드, 이미지 데이터 (Base64)",
            purpose: "이용 목적: AI 기반 퀴즈 문제·선택지·해설 자동 생성",
            retention: "데이터 보관: 처리 후 당사 서버에 저장되지 않습니다. Supabase의 데이터 보관 정책을 따릅니다",
            policyLabel: "개인정보처리방침",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. RevenueCat (구독 관리)",
            plan: "대상: 전체 사용자 (Premium 구독 관리)",
            data: "전송 데이터: 기기 식별자, App Store / Google Play 구매 영수증",
            purpose: "이용 목적: 구독 상태 확인 및 관리",
            retention: "",
            policyLabel: "개인정보처리방침",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "중요: 위 이외의 제3자(광고 네트워크, 데이터 브로커 등)에 대해 사용자의 개인정보를 판매·공유·제공하는 일은 일절 없습니다.",
      },
      retention: {
        title: "5. 데이터 보관 및 보유 기간",
        local: {
          title: "기기 내 (로컬 스토리지)",
          intro: "다음 데이터는 사용자 기기 내에만 저장되며, 당사 서버로 전송되지 않습니다:",
          items: ["생성한 퀴즈 및 폴더", "학습 기록 및 점수", "앱 설정 및 알림 설정"],
          deletion: "이 데이터는 앱을 삭제하면 함께 삭제됩니다. 클라우드 동기화가 이루어지지 않으므로 재설치 시 데이터가 복원되지 않습니다.",
        },
        server: {
          title: "당사 서버",
          content: "본 앱은 사용자 계정이 필요 없으며, 퀴즈 생성 처리 후 입력 데이터를 당사 서버에 저장하지 않습니다. 모든 학습 데이터는 기기 내(SQLite)에만 저장됩니다.",
        },
        thirdParty: {
          title: "제3자 서비스",
          content: "각 제3자 서비스의 데이터 보관 정책은 해당 서비스의 개인정보처리방침을 참조하시기 바랍니다.",
        },
      },
      security: {
        title: "6. 데이터 보안",
        items: [
          "통신 암호화: 모든 데이터 통신은 HTTPS/TLS로 암호화됩니다",
          "최소 권한 원칙: 퀴즈 생성 처리에 필요한 최소한의 데이터만 전송합니다",
          "로컬 저장 우선: 학습 데이터는 모두 기기 내에 저장하여 클라우드 데이터 전송을 최소화합니다",
          "음성 데이터: 스피킹 문제의 녹음은 기기 내에서만 처리하며 외부로 전송하지 않습니다",
        ],
        disclaimer: "단, 인터넷을 통한 데이터 전송에는 고유한 위험이 따르며, 완전한 보안을 보장할 수 없습니다.",
      },
      children: {
        title: "7. 아동 개인정보 보호 (COPPA)",
        content: "본 앱은 13세 미만 아동을 대상으로 하지 않으며, 13세 미만 아동으로부터 고의로 개인정보를 수집하지 않습니다.",
        action: "13세 미만 아동이 본 앱을 이용하고 있음이 확인된 경우, 관련 정보를 신속히 삭제하기 위한 합리적인 조치를 취합니다. 자녀가 본 앱을 이용하고 있음을 알고 계신 보호자께서는 아래 문의처로 연락 주시기 바랍니다.",
      },
      userRights: {
        title: "8. 사용자 권리",
        japan: {
          title: "8-1. 일본 내 사용자",
          intro: "개인정보보호법에 따라 다음 권리를 갖습니다:",
          items: ["보유 개인정보 열람 청구", "내용 정정·추가·삭제 청구", "이용 정지·소거 청구"],
        },
        gdpr: {
          title: "8-2. EEA·영국 사용자 (GDPR)",
          intro: "GDPR에 따라 다음 권리를 갖습니다:",
          items: [
            "접근권: 보유 개인 데이터 접근",
            "정정권: 부정확한 개인 데이터 수정",
            "삭제권(잊힐 권리): 개인 데이터 삭제",
            "처리 제한권: 개인 데이터 처리 제한",
            "데이터 이동권: 데이터 수령 및 이전",
            "이의제기권: 개인 데이터 처리에 대한 이의",
          ],
        },
        ccpa: {
          title: "8-3. 캘리포니아 사용자 (CCPA)",
          intro: "CCPA에 따라 다음 권리를 갖습니다:",
          items: [
            "수집하는 개인정보의 범주 및 목적 공개 청구",
            "개인정보 삭제 청구",
            "개인정보 판매 옵트아웃(당사는 개인정보를 판매하지 않습니다)",
          ],
        },
        howTo: {
          title: "권리 행사 방법",
          content: "로컬에 저장된 데이터는 앱 삭제를 통해 제거할 수 있습니다. 기타 권리 행사는 아래 문의처로 연락해 주시기 바랍니다.",
        },
      },
      cookies: {
        title: "9. 쿠키 및 추적 기술",
        content: "본 앱은 웹 브라우저에서 동작하지 않으므로 쿠키를 사용하지 않습니다.",
        revenueCat: "RevenueCat SDK는 기기 식별자를 사용하지만, 광고 목적의 크로스앱 추적은 수행하지 않습니다.",
        att: "Apple의 앱 추적 투명성(ATT) 프레임워크에서 요구하는 광고 목적의 추적을 실시하지 않으므로 ATT 팝업이 표시되지 않습니다.",
      },
      internationalTransfer: {
        title: "10. 국제 데이터 이전",
        content: "본 앱이 이용하는 제3자 서비스의 서버는 주로 미국에 위치하고 있습니다. 다른 국가에서 데이터를 전송하는 경우, 해당 데이터는 국외로 이전될 수 있습니다.",
        note: "각 제3자 서비스는 적절한 데이터 보호 조치(표준 계약 조항 등)를 마련하고 있습니다. 자세한 내용은 각 서비스의 개인정보처리방침을 참조하시기 바랍니다.",
      },
      changes: {
        title: "11. 개인정보처리방침 변경",
        content: "당사는 본 개인정보처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경이 있을 경우 앱 내 알림 또는 본 페이지 상단의 '최종 업데이트' 날짜 변경을 통해 안내합니다.",
        consent: "변경 후에도 본 앱을 계속 이용하시는 경우, 업데이트된 개인정보처리방침에 동의한 것으로 간주합니다.",
      },
      contact: {
        title: "12. 문의",
        content: "본 개인정보처리방침에 관한 질문 또는 권리 행사 신청은 아래로 문의해 주시기 바랍니다:",
        email: "이메일",
        responseTime: "문의 접수 후 원칙적으로 30일 이내에 답변 드립니다.",
      },
      appStoreLabel: {
        title: "App Store 개인정보 영양 표시",
        description: "App Store의 앱 개인정보 섹션을 위한 공개 정보입니다.",
        tableHeaders: ["데이터 종류", "수집 여부", "추적 여부", "이용 목적"],
        rows: [
          ["이미지 데이터", "○(처리 시만)", "×", "앱 기능(퀴즈 생성)"],
          ["텍스트 입력", "○(처리 시만)", "×", "앱 기능(퀴즈 생성)"],
          ["음성 데이터", "○(기기 내만)", "×", "앱 기능(스피킹 채점)"],
          ["식별자(기기 ID)", "○", "×", "앱 기능(구독 관리)"],
          ["구매 정보", "○", "×", "앱 기능(구독 관리)"],
          ["이용 현황 데이터", "○(기기 내만)", "×", "앱 기능(학습 진행 상황)"],
          ["성명·연락처·위치 정보 등", "×", "×", "—"],
        ],
        trackingNote: "\"추적\" = 제3자 광고·분석 목적의 데이터 이용. 본 앱은 어떠한 데이터도 광고 목적으로 추적하지 않습니다.",
        languageNote: "본 개인정보처리방침은 일본어·영어·한국어로 제공됩니다. 내용이 상충될 경우 일본어 버전이 우선합니다.",
      },
    },
  },
};

function LanguageSelector({ currentLang, onChangeLang }: { currentLang: Language; onChangeLang: (lang: Language) => void }) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChangeLang(lang.code)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentLang === lang.code ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

function ProviderCard({ name, plan, data, purpose, retention, policyLabel, policyUrl }: {
  name: string; plan: string; data: string; purpose: string;
  retention: string; policyLabel: string; policyUrl: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
      <h4 className="font-semibold text-gray-800 mb-2">{name}</h4>
      <div className="space-y-1 text-sm text-gray-700">
        <p>{plan}</p>
        <p>{data}</p>
        <p>{purpose}</p>
        {retention && <p>{retention}</p>}
        <p>
          <a href={policyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {policyLabel} →
          </a>
        </p>
      </div>
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

function ImportantBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-800 text-sm font-medium">{children}</p>
    </div>
  );
}

export default function SnapQuizPrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const currentYear = new Date().getFullYear();

  const tocItems = [
    s.intro.title, s.dataCollection.title, s.purpose.title, s.thirdParty.title,
    s.retention.title, s.security.title, s.children.title, s.userRights.title,
    s.cookies.title, s.internationalTransfer.title, s.changes.title, s.contact.title,
  ];

  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image src={appIcon} alt="SnapQuiz" width={80} height={80} className="rounded-2xl shadow-md" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">SnapQuiz</h1>
          <p className="text-xl text-gray-600">{t.title}</p>
          <p className="text-sm text-gray-500 mt-2">{t.lastUpdated}: {LAST_UPDATED}</p>
        </header>

        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        <div className="text-center mb-8">
          <Link href="/support/quizcards" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToSupport}
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-8 bg-gray-50 rounded-xl p-5">
            <h2 className="font-semibold text-gray-700 mb-3">{t.tableOfContents}</h2>
            <ol className="space-y-1">
              {tocItems.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">{item}</li>
              ))}
            </ol>
          </div>

          <Section title={s.intro.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.intro.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.intro.consent}</p>
          </Section>

          <Section title={s.dataCollection.title}>
            <SubSection title={s.dataCollection.userProvided.title}>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.userProvided.image.title}</h4>
                <BulletList items={s.dataCollection.userProvided.image.items} />
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.userProvided.voice.title}</h4>
                <BulletList items={s.dataCollection.userProvided.voice.items} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.userProvided.text.title}</h4>
                <BulletList items={s.dataCollection.userProvided.text.items} />
              </div>
            </SubSection>
            <SubSection title={s.dataCollection.autoCollected.title}>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.autoCollected.deviceId.title}</h4>
                <BulletList items={s.dataCollection.autoCollected.deviceId.items} />
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.autoCollected.subscription.title}</h4>
                <BulletList items={s.dataCollection.autoCollected.subscription.items} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.autoCollected.appUsage.title}</h4>
                <BulletList items={s.dataCollection.autoCollected.appUsage.items} />
              </div>
            </SubSection>
            <SubSection title={s.dataCollection.notCollected.title}>
              <p className="text-gray-700 mb-3">{s.dataCollection.notCollected.intro}</p>
              <CrossList items={s.dataCollection.notCollected.items} />
            </SubSection>
          </Section>

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

          <Section title={s.thirdParty.title}>
            <p className="text-gray-700 leading-relaxed mb-4">{s.thirdParty.intro}</p>
            {s.thirdParty.providers.map((provider, i) => (
              <ProviderCard key={i} {...provider} />
            ))}
            <ImportantBox>{s.thirdParty.important}</ImportantBox>
          </Section>

          <Section title={s.retention.title}>
            <SubSection title={s.retention.local.title}>
              <p className="text-gray-700 mb-3">{s.retention.local.intro}</p>
              <BulletList items={s.retention.local.items} />
              <p className="text-gray-600 text-sm mt-3">{s.retention.local.deletion}</p>
            </SubSection>
            <SubSection title={s.retention.server.title}>
              <p className="text-gray-700 leading-relaxed">{s.retention.server.content}</p>
            </SubSection>
            <SubSection title={s.retention.thirdParty.title}>
              <p className="text-gray-700 leading-relaxed">{s.retention.thirdParty.content}</p>
            </SubSection>
          </Section>

          <Section title={s.security.title}>
            <div className="bg-blue-50 rounded-lg p-4 mb-3">
              <CheckList items={s.security.items} />
            </div>
            <p className="text-gray-600 text-sm">{s.security.disclaimer}</p>
          </Section>

          <Section title={s.children.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.children.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.children.action}</p>
          </Section>

          <Section title={s.userRights.title}>
            <SubSection title={s.userRights.japan.title}>
              <p className="text-gray-600 text-sm mb-2">{s.userRights.japan.intro}</p>
              <BulletList items={s.userRights.japan.items} />
            </SubSection>
            <SubSection title={s.userRights.gdpr.title}>
              <p className="text-gray-600 text-sm mb-2">{s.userRights.gdpr.intro}</p>
              <BulletList items={s.userRights.gdpr.items} />
            </SubSection>
            <SubSection title={s.userRights.ccpa.title}>
              <p className="text-gray-600 text-sm mb-2">{s.userRights.ccpa.intro}</p>
              <BulletList items={s.userRights.ccpa.items} />
            </SubSection>
            <SubSection title={s.userRights.howTo.title}>
              <p className="text-gray-700 leading-relaxed">{s.userRights.howTo.content}</p>
            </SubSection>
          </Section>

          <Section title={s.cookies.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.cookies.content}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{s.cookies.revenueCat}</p>
            <p className="text-gray-700 leading-relaxed">{s.cookies.att}</p>
          </Section>

          <Section title={s.internationalTransfer.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.internationalTransfer.content}</p>
            <NoteBox>{s.internationalTransfer.note}</NoteBox>
          </Section>

          <Section title={s.changes.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.changes.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.changes.consent}</p>
          </Section>

          <Section title={s.contact.title}>
            <p className="text-gray-700 mb-4">{s.contact.content}</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-700">
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

        <footer className="text-center py-8 mt-8">
          <p className="text-sm text-gray-500">Copyright {currentYear} shun1234. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
