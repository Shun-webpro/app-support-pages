"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/speak_knock.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年2月21日";
const LAST_UPDATED_KO = "2026년 2월 21일";
const LAST_UPDATED_EN = "February 21, 2026";
const LAST_UPDATED_AR = "21 فبراير 2026";
const LAST_UPDATED_ZH_TW = "2026年2月21日";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "ko" | "en" | "ar" | "zh-TW";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
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
  sections: {
    intro: {
      title: string;
      content: string;
      consent: string;
    };
    dataCollection: {
      title: string;
      userProvided: {
        title: string;
        audio: {
          title: string;
          items: string[];
        };
        transcript: {
          title: string;
          items: string[];
        };
      };
      autoCollected: {
        title: string;
        deviceId: {
          title: string;
          items: string[];
        };
        subscription: {
          title: string;
          items: string[];
        };
        appUsage: {
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
      thirdParty: {
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
      revenueCat: string;
      att: string;
    };
    internationalTransfer: {
      title: string;
      content: string;
      note: string;
    };
    changes: {
      title: string;
      content: string;
      notification: string;
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
    sections: {
      intro: {
        title: "1. はじめに",
        content: "SpeakKnock（以下「本アプリ」）は、英語スピーキング練習アプリです。本プライバシーポリシーは、本アプリをご利用いただく際に収集する情報の種類、利用目的、管理方法、および第三者への提供について説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに記載された内容に同意したものとみなします。同意いただけない場合は、本アプリのご利用をお控えください。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        userProvided: {
          title: "2-1. ユーザーが提供する情報",
          audio: {
            title: "(a) 音声データ",
            items: [
              "ユーザーがスピーキング練習中に録音した音声",
              "録音は採点・評価処理のためにのみ使用され、処理完了後は当社サーバーに保存されません",
              "収集タイミング: スピーキング練習の録音時",
              "送信先: ご利用のプランに応じて第三者サービスに送信されます（詳細は第4条参照）",
            ],
          },
          transcript: {
            title: "(b) 発話テキスト（トランスクリプト）",
            items: [
              "音声認識によって生成された発話内容のテキスト",
              "Pro・Premium プランでは AI 採点のために利用されます",
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
              "ご利用のサブスクリプションプラン（Free / Standard / Pro / Premium）",
              "Apple App Store による購入レシート情報（決済情報はAppleが管理し、当社はカード番号等を取得しません）",
            ],
          },
          appUsage: {
            title: "(c) アプリ利用データ（端末内のみ）",
            items: [
              "学習履歴・クイズの回答スコア",
              "アプリ設定",
              "1日のクイズ実施回数",
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
          ["音声データ", "スピーキング採点・発音評価・文字起こし処理"],
          ["発話テキスト", "AI による文法・語彙・内容の採点フィードバック生成"],
          ["デバイス識別子", "購読ステータスの確認・管理"],
          ["購読情報", "プラン別機能の提供、有効な購読の確認"],
          ["利用データ（ローカル）", "学習進捗の表示、1日の利用制限管理"],
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        intro: "本アプリは、サービス提供のために以下の第三者サービスを利用します。各サービスへのデータ送信は、ご利用のプランおよび機能利用時にのみ発生します。",
        providers: [
          {
            name: "4-1. OpenAI（音声文字起こし・AI採点）",
            plan: "対象プラン: Standard・Pro・Premium",
            data: "送信するデータ: 録音音声（Base64形式）、発話テキスト、質問内容・試験種別・難易度",
            purpose: "利用目的: 音声のテキスト変換（Whisper API）、スピーキング内容の AI 採点（GPT-4o-mini）",
            retention: "データ保持: 処理後に当社サーバーには保存されません。OpenAI のデータ保持ポリシーに従います",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-2. Microsoft Azure Cognitive Services（発音評価）",
            plan: "対象プラン: Premium のみ",
            data: "送信するデータ: 録音音声（WAV形式）、参照テキスト（発音評価の基準文）",
            purpose: "利用目的: 発音の正確性・流暢性・リズム・イントネーション・完成度の詳細評価",
            retention: "データ保持: 処理後に当社サーバーには保存されません。Microsoft のデータ保持ポリシーに従います",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://privacy.microsoft.com/ja-jp/privacystatement",
          },
          {
            name: "4-3. Supabase（バックエンドインフラ）",
            plan: "対象プラン: Standard・Pro・Premium",
            data: "送信するデータ: 上記サービスへの中継処理時の音声データ・発話テキスト",
            purpose: "利用目的: Edge Functions による API 処理の中継（データは一時処理のみで保存されません）",
            retention: "サーバー所在地: 米国",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-4. RevenueCat（購読管理）",
            plan: "対象プラン: 全プラン（Standard以上の購読管理）",
            data: "送信するデータ: デバイス識別子、Apple App Store 購入レシート",
            purpose: "利用目的: 購読ステータスの確認・管理",
            retention: "",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
          {
            name: "4-5. Apple Speech Recognition Framework（音声認識）",
            plan: "対象プラン: 全プラン",
            data: "送信するデータ: 音声データ（Apple のサーバーに送信される場合があります）",
            purpose: "利用目的: リアルタイムの音声テキスト変換（ストリーミング認識）",
            retention: "",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://www.apple.com/jp/legal/privacy/",
          },
        ],
        important: "重要: 上記以外の第三者（広告ネットワーク、データブローカー等）に対して、ユーザーの個人情報を販売・共有・提供することは一切ありません。",
      },
      retention: {
        title: "5. データの保存と保持期間",
        local: {
          title: "端末内（ローカルストレージ）",
          intro: "以下のデータはユーザーの端末内にのみ保存され、当社サーバーには送信されません：",
          items: [
            "学習履歴・採点結果",
            "アプリ設定",
            "日次利用制限カウンター",
          ],
          deletion: "これらのデータは、アプリをアンインストールすることで削除されます。",
        },
        server: {
          title: "当社サーバー",
          content: "本アプリはユーザーアカウントを必要とせず、採点・評価処理後の音声データや発話テキストを当社のサーバーに保存しません。処理は Edge Functions 上で一時的に実行され、レスポンス返却後にデータは削除されます。",
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
          "認証: Supabase Edge Functions へのアクセスは、購読状態の JWT トークン検証により保護されます",
          "最小権限原則: 採点処理に必要な最小限のデータのみを送信します",
          "ローカル処理優先: 可能な限り、採点処理はデバイス上のネイティブエンジン（Swift）で実行し、クラウドへのデータ送信を最小化します",
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
        content: "本アプリが利用する第三者サービスのサーバーは主に米国に所在しています。日本または EEA からデータを送信する場合、そのデータは国外に転送されます。",
        note: "各第三者サービスは、適切なデータ保護措置（標準契約条項等）を講じています。詳細は各社のプライバシーポリシーをご参照ください。",
      },
      changes: {
        title: "11. プライバシーポリシーの変更",
        content: "当社は、本プライバシーポリシーを随時更新することがあります。重要な変更が生じた場合は、アプリ内通知または本ページ上部の「最終更新日」の更新によりお知らせします。",
        notification: "",
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
          ["音声データ", "○（処理時のみ）", "×", "App Functionality（採点処理）"],
          ["ユーザーコンテンツ（発話テキスト）", "○（処理時のみ）", "×", "App Functionality（AI採点）"],
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
  ko: {
    title: "개인정보 처리방침",
    lastUpdated: "최종 업데이트",
    lastUpdatedDate: LAST_UPDATED_KO,
    backToSupport: "지원 페이지로 돌아가기",
    tableOfContents: "목차",
    sections: {
      intro: {
        title: "1. 소개",
        content: "SpeakKnock（이하 '본 앱'）은 영어 스피킹 연습 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 수집하는 정보의 종류, 이용 목적, 관리 방법 및 제3자 제공에 대해 설명합니다.",
        consent: "본 앱을 이용하심으로써 본 개인정보 처리방침에 기재된 내용에 동의하신 것으로 간주합니다. 동의하지 않으시는 경우 본 앱 이용을 삼가 주세요.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        userProvided: {
          title: "2-1. 사용자가 제공하는 정보",
          audio: {
            title: "(a) 음성 데이터",
            items: [
              "사용자가 스피킹 연습 중에 녹음한 음성",
              "녹음은 채점・평가 처리를 위해서만 사용되며, 처리 완료 후 당사 서버에 저장되지 않습니다",
              "수집 시점: 스피킹 연습 녹음 시",
              "전송 대상: 이용 중인 플랜에 따라 제3자 서비스로 전송됩니다（자세한 내용은 제4조 참조）",
            ],
          },
          transcript: {
            title: "(b) 발화 텍스트（트랜스크립트）",
            items: [
              "음성 인식으로 생성된 발화 내용의 텍스트",
              "Pro・Premium 플랜에서 AI 채점을 위해 사용됩니다",
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
            title: "(b) 구독・결제 정보",
            items: [
              "이용 중인 구독 플랜（Free / Standard / Pro / Premium）",
              "Apple App Store를 통한 구매 영수증 정보（결제 정보는 Apple이 관리하며, 당사는 카드 번호 등을 취득하지 않습니다）",
            ],
          },
          appUsage: {
            title: "(c) 앱 이용 데이터（기기 내 한정）",
            items: [
              "학습 기록・퀴즈 답변 점수",
              "앱 설정",
              "1일 퀴즈 실시 횟수",
            ],
          },
        },
        notCollected: {
          title: "2-3. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다：",
          items: [
            "성명・이메일 주소・주소 등의 개인 식별 정보（계정 등록 불필요）",
            "위치 정보",
            "연락처",
            "건강・피트니스 데이터",
            "광고 목적의 추적 데이터",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "수집한 정보는 다음 목적에만 사용합니다：",
        tableHeaders: ["정보의 종류", "이용 목적"],
        rows: [
          ["음성 데이터", "스피킹 채점・발음 평가・텍스트 변환 처리"],
          ["발화 텍스트", "AI에 의한 문법・어휘・내용 채점 피드백 생성"],
          ["기기 식별자", "구독 상태 확인・관리"],
          ["구독 정보", "플랜별 기능 제공, 유효한 구독 확인"],
          ["이용 데이터（로컬）", "학습 진행 상황 표시, 1일 이용 제한 관리"],
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스에 대한 정보 제공",
        intro: "본 앱은 서비스 제공을 위해 다음 제3자 서비스를 이용합니다. 각 서비스로의 데이터 전송은 이용 중인 플랜 및 기능 이용 시에만 발생합니다.",
        providers: [
          {
            name: "4-1. OpenAI（음성 텍스트 변환・AI 채점）",
            plan: "대상 플랜: Standard・Pro・Premium",
            data: "전송 데이터: 녹음 음성（Base64 형식）, 발화 텍스트, 질문 내용・시험 종류・난이도",
            purpose: "이용 목적: 음성의 텍스트 변환（Whisper API）, 스피킹 내용의 AI 채점（GPT-4o-mini）",
            retention: "데이터 보존: 처리 후 당사 서버에 저장되지 않습니다. OpenAI의 데이터 보존 정책에 따릅니다",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-2. Microsoft Azure Cognitive Services（발음 평가）",
            plan: "대상 플랜: Premium만",
            data: "전송 데이터: 녹음 음성（WAV 형식）, 참조 텍스트（발음 평가 기준문）",
            purpose: "이용 목적: 발음의 정확성・유창성・리듬・억양・완성도의 상세 평가",
            retention: "데이터 보존: 처리 후 당사 서버에 저장되지 않습니다. Microsoft의 데이터 보존 정책에 따릅니다",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://privacy.microsoft.com/ja-jp/privacystatement",
          },
          {
            name: "4-3. Supabase（백엔드 인프라）",
            plan: "대상 플랜: Standard・Pro・Premium",
            data: "전송 데이터: 위 서비스로의 중계 처리 시 음성 데이터・발화 텍스트",
            purpose: "이용 목적: Edge Functions를 통한 API 처리 중계（데이터는 일시 처리만 하며 저장되지 않습니다）",
            retention: "서버 소재지: 미국",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-4. RevenueCat（구독 관리）",
            plan: "대상 플랜: 전 플랜（Standard 이상의 구독 관리）",
            data: "전송 데이터: 기기 식별자, Apple App Store 구매 영수증",
            purpose: "이용 목적: 구독 상태 확인・관리",
            retention: "",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
          {
            name: "4-5. Apple Speech Recognition Framework（음성 인식）",
            plan: "대상 플랜: 전 플랜",
            data: "전송 데이터: 음성 데이터（Apple 서버로 전송될 수 있습니다）",
            purpose: "이용 목적: 실시간 음성 텍스트 변환（스트리밍 인식）",
            retention: "",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://www.apple.com/jp/legal/privacy/",
          },
        ],
        important: "중요: 위 이외의 제3자（광고 네트워크, 데이터 브로커 등）에 대해 사용자의 개인정보를 판매・공유・제공하는 일은 일절 없습니다.",
      },
      retention: {
        title: "5. 데이터 저장 및 보존 기간",
        local: {
          title: "기기 내（로컬 스토리지）",
          intro: "다음 데이터는 사용자의 기기 내에만 저장되며, 당사 서버로 전송되지 않습니다：",
          items: [
            "학습 기록・채점 결과",
            "앱 설정",
            "일일 이용 제한 카운터",
          ],
          deletion: "이 데이터는 앱을 삭제함으로써 삭제됩니다.",
        },
        server: {
          title: "당사 서버",
          content: "본 앱은 사용자 계정을 필요로 하지 않으며, 채점・평가 처리 후의 음성 데이터나 발화 텍스트를 당사 서버에 저장하지 않습니다. 처리는 Edge Functions 상에서 일시적으로 실행되며, 응답 반환 후 데이터는 삭제됩니다.",
        },
        thirdParty: {
          title: "제3자 서비스",
          content: "각 제3자 서비스의 데이터 보존 정책은 각 사의 개인정보 처리방침을 참조해 주세요.",
        },
      },
      security: {
        title: "6. 데이터 보안",
        items: [
          "통신 암호화: 모든 데이터 통신은 HTTPS/TLS로 암호화됩니다",
          "인증: Supabase Edge Functions에 대한 접근은 구독 상태의 JWT 토큰 검증으로 보호됩니다",
          "최소 권한 원칙: 채점 처리에 필요한 최소한의 데이터만 전송합니다",
          "로컬 처리 우선: 가능한 한 채점 처리는 기기의 네이티브 엔진（Swift）에서 실행하여 클라우드로의 데이터 전송을 최소화합니다",
        ],
        disclaimer: "단, 인터넷을 통한 데이터 전송에는 고유한 위험이 수반되며, 완전한 보안을 보장할 수는 없습니다.",
      },
      children: {
        title: "7. 아동 개인정보（COPPA 대응）",
        content: "본 앱은 13세 미만의 어린이를 대상으로 하지 않으며, 의도적으로 13세 미만의 어린이로부터 개인정보를 수집하지 않습니다.",
        action: "13세 미만의 어린이가 본 앱을 이용하고 있음을 알게 된 경우, 관련 정보를 신속히 삭제하기 위한 합리적인 조치를 취합니다. 자녀가 본 앱을 이용하고 있는 것을 아시는 보호자분은 아래 문의처로 연락해 주세요.",
      },
      userRights: {
        title: "8. 사용자의 권리",
        japan: {
          title: "8-1. 일본 국내 사용자",
          items: [
            "보유 개인정보 공개 청구",
            "내용의 정정・추가・삭제 청구",
            "이용 정지・소거 청구",
          ],
        },
        gdpr: {
          title: "8-2. EEA・UK 사용자（GDPR）",
          items: [
            "접근권: 보유 개인정보에 대한 접근",
            "정정권: 부정확한 개인정보의 정정",
            "삭제권（잊혀질 권리）: 개인정보 삭제",
            "처리 제한권: 개인정보 처리 제한",
            "데이터 이동권: 데이터 수령 및 이전",
            "이의 신청권: 개인정보 처리에 대한 이의",
          ],
        },
        ccpa: {
          title: "8-3. 캘리포니아주 사용자（CCPA）",
          items: [
            "수집하는 개인정보 카테고리 및 목적 공개 청구",
            "개인정보 삭제 청구",
            "개인정보 판매 거부（당사는 개인정보를 판매하지 않습니다）",
          ],
        },
        howTo: {
          title: "권리 행사 방법",
          content: "본 앱은 로컬에 저장된 데이터는 앱을 삭제함으로써 삭제할 수 있습니다. 그 외의 권리 행사에 대해서는 아래 문의처로 연락해 주세요.",
        },
      },
      cookies: {
        title: "9. Cookie 및 추적 기술",
        content: "본 앱은 웹 브라우저 상에서 동작하는 것이 아니므로 Cookie를 사용하지 않습니다.",
        revenueCat: "RevenueCat SDK는 기기 식별자를 사용하지만 광고 목적의 크로스앱 추적은 하지 않습니다.",
        att: "Apple의 App Tracking Transparency（ATT）프레임워크가 요구하는 광고 목적의 추적은 실시하지 않으므로 ATT 프롬프트는 표시되지 않습니다.",
      },
      internationalTransfer: {
        title: "10. 국제 데이터 이전",
        content: "본 앱이 이용하는 제3자 서비스의 서버는 주로 미국에 소재합니다. 일본 또는 EEA에서 데이터를 전송하는 경우 해당 데이터는 국외로 이전될 수 있습니다.",
        note: "각 제3자 서비스는 적절한 데이터 보호 조치（표준 계약 조항 등）를 마련하고 있습니다. 자세한 내용은 각 사의 개인정보 처리방침을 참조해 주세요.",
      },
      changes: {
        title: "11. 개인정보 처리방침의 변경",
        content: "당사는 본 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경이 발생한 경우 앱 내 알림 또는 본 페이지 상단의 '최종 업데이트' 갱신을 통해 알려드립니다.",
        notification: "",
        consent: "변경 후에도 본 앱을 계속 이용하시는 경우 업데이트된 개인정보 처리방침에 동의하신 것으로 간주합니다.",
      },
      contact: {
        title: "12. 문의하기",
        content: "본 개인정보 처리방침에 관한 질문・권리 행사 신청은 아래로 문의해 주세요：",
        email: "이메일 주소",
        responseTime: "문의 후 원칙 30일 이내에 답변드립니다.",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label 대응표",
        description: "App Store의 App Privacy 섹션용 공개 정보입니다.",
        tableHeaders: ["데이터 종류", "수집 여부", "추적 여부", "이용 목적"],
        rows: [
          ["음성 데이터", "○（처리 시만）", "×", "App Functionality（채점 처리）"],
          ["사용자 콘텐츠（발화 텍스트）", "○（처리 시만）", "×", "App Functionality（AI 채점）"],
          ["식별자（기기 ID）", "○", "×", "App Functionality（구독 관리）"],
          ["구매 정보", "○", "×", "App Functionality（구독 관리）"],
          ["이용 상황 데이터", "○（기기 내 한정）", "×", "App Functionality（학습 진행）"],
          ["성명・연락처・위치 정보 등", "×", "×", "—"],
        ],
        trackingNote: "「추적」= 제3자 광고・분석 목적의 데이터 이용. 본 앱은 어떠한 데이터도 광고 목적으로 추적하지 않습니다.",
        languageNote: "본 개인정보 처리방침은 일본어를 정문으로 합니다.",
      },
    },
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Back to Support",
    tableOfContents: "Table of Contents",
    sections: {
      intro: {
        title: "1. Introduction",
        content: "SpeakKnock (hereinafter \"the App\") is an English speaking practice app. This Privacy Policy explains the types of information collected when you use the App, the purposes of use, how it is managed, and how it is shared with third parties.",
        consent: "By using this App, you are deemed to have agreed to the contents described in this Privacy Policy. If you do not agree, please refrain from using the App.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        userProvided: {
          title: "2-1. Information Provided by Users",
          audio: {
            title: "(a) Audio Data",
            items: [
              "Audio recorded by the user during speaking practice",
              "Recordings are used only for scoring and evaluation processing and are not stored on our servers after processing is complete",
              "Collection timing: when recording during speaking practice",
              "Destination: sent to third-party services depending on your plan (see Section 4 for details)",
            ],
          },
          transcript: {
            title: "(b) Speech Transcript",
            items: [
              "Text of speech content generated by speech recognition",
              "Used for AI scoring in Pro and Premium plans",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Automatically Collected Information",
          deviceId: {
            title: "(a) Device Identifier",
            items: [
              "Device-specific identifier collected by RevenueCat for subscription management",
              "Not used for advertising purposes",
            ],
          },
          subscription: {
            title: "(b) Subscription and Billing Information",
            items: [
              "Your subscription plan (Free / Standard / Pro / Premium)",
              "Purchase receipt information from Apple App Store (payment information is managed by Apple; we do not obtain card numbers, etc.)",
            ],
          },
          appUsage: {
            title: "(c) App Usage Data (On-Device Only)",
            items: [
              "Learning history and quiz answer scores",
              "App settings",
              "Daily quiz count",
            ],
          },
        },
        notCollected: {
          title: "2-3. Information We Do Not Collect",
          intro: "This App does not collect any of the following information:",
          items: [
            "Personal identification information such as name, email address, or postal address (no account registration required)",
            "Location data",
            "Contact information",
            "Health and fitness data",
            "Tracking data for advertising purposes",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Use",
        intro: "Collected information is used only for the following purposes:",
        tableHeaders: ["Type of Information", "Purpose of Use"],
        rows: [
          ["Audio data", "Speaking scoring, pronunciation assessment, and transcription processing"],
          ["Speech transcript", "AI feedback generation on grammar, vocabulary, and content"],
          ["Device identifier", "Verification and management of subscription status"],
          ["Subscription information", "Provision of plan-specific features, verification of active subscription"],
          ["Usage data (local)", "Display of learning progress, daily usage limit management"],
        ],
      },
      thirdParty: {
        title: "4. Sharing with Third-Party Services",
        intro: "This App uses the following third-party services to provide its services. Data transmission to each service only occurs when using the relevant plan and features.",
        providers: [
          {
            name: "4-1. OpenAI (Speech Transcription and AI Scoring)",
            plan: "Applicable plans: Standard, Pro, Premium",
            data: "Data transmitted: Recorded audio (Base64 format), speech transcript, question content, exam type, and difficulty level",
            purpose: "Purpose: Speech-to-text conversion (Whisper API), AI scoring of speaking content (GPT-4o-mini)",
            retention: "Data retention: Not stored on our servers after processing. Subject to OpenAI's data retention policy.",
            policyLabel: "Privacy Policy",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-2. Microsoft Azure Cognitive Services (Pronunciation Assessment)",
            plan: "Applicable plans: Premium only",
            data: "Data transmitted: Recorded audio (WAV format), reference text (baseline for pronunciation assessment)",
            purpose: "Purpose: Detailed assessment of pronunciation accuracy, fluency, rhythm, intonation, and completeness",
            retention: "Data retention: Not stored on our servers after processing. Subject to Microsoft's data retention policy.",
            policyLabel: "Privacy Policy",
            policyUrl: "https://privacy.microsoft.com/en-us/privacystatement",
          },
          {
            name: "4-3. Supabase (Backend Infrastructure)",
            plan: "Applicable plans: Standard, Pro, Premium",
            data: "Data transmitted: Audio data and speech transcripts during relay processing to the above services",
            purpose: "Purpose: API processing relay via Edge Functions (data is only temporarily processed and not stored)",
            retention: "Server location: United States",
            policyLabel: "Privacy Policy",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-4. RevenueCat (Subscription Management)",
            plan: "Applicable plans: All plans (subscription management for Standard and above)",
            data: "Data transmitted: Device identifier, Apple App Store purchase receipts",
            purpose: "Purpose: Verification and management of subscription status",
            retention: "",
            policyLabel: "Privacy Policy",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
          {
            name: "4-5. Apple Speech Recognition Framework",
            plan: "Applicable plans: All plans",
            data: "Data transmitted: Audio data (may be sent to Apple's servers)",
            purpose: "Purpose: Real-time speech-to-text conversion (streaming recognition)",
            retention: "",
            policyLabel: "Privacy Policy",
            policyUrl: "https://www.apple.com/legal/privacy/",
          },
        ],
        important: "Important: We do not sell, share, or provide users' personal information to any third parties beyond the above (including advertising networks and data brokers).",
      },
      retention: {
        title: "5. Data Storage and Retention",
        local: {
          title: "On-Device (Local Storage)",
          intro: "The following data is stored only on the user's device and is not transmitted to our servers:",
          items: [
            "Learning history and scoring results",
            "App settings",
            "Daily usage limit counter",
          ],
          deletion: "This data is deleted when the app is uninstalled.",
        },
        server: {
          title: "Our Servers",
          content: "This App does not require a user account, and audio data or speech transcripts after scoring/evaluation processing are not stored on our servers. Processing is executed temporarily on Edge Functions, and data is deleted after a response is returned.",
        },
        thirdParty: {
          title: "Third-Party Services",
          content: "Please refer to each third-party service's own privacy policy for their data retention policies.",
        },
      },
      security: {
        title: "6. Data Security",
        items: [
          "Communication encryption: All data communications are encrypted using HTTPS/TLS",
          "Authentication: Access to Supabase Edge Functions is protected by JWT token verification based on subscription status",
          "Principle of least privilege: Only the minimum data necessary for scoring processing is transmitted",
          "Local processing priority: Where possible, scoring processing is performed on the device's native engine (Swift) to minimize data transmission to the cloud",
        ],
        disclaimer: "However, data transmission over the internet carries inherent risks, and complete security cannot be guaranteed.",
      },
      children: {
        title: "7. Children's Privacy (COPPA Compliance)",
        content: "This App is not intended for children under 13 years of age, and we do not intentionally collect personal information from children under 13.",
        action: "If we become aware that a child under 13 has used this App, we will take reasonable steps to promptly delete the relevant information. Parents or guardians who are aware that their child is using this App should contact us at the address below.",
      },
      userRights: {
        title: "8. User Rights",
        japan: {
          title: "8-1. Users in Japan",
          items: [
            "Right to request disclosure of personal information held",
            "Right to request correction, addition, or deletion of content",
            "Right to request suspension of use or erasure",
          ],
        },
        gdpr: {
          title: "8-2. Users in the EEA and UK (GDPR)",
          items: [
            "Right of access: Access to personal data held",
            "Right to rectification: Correction of inaccurate personal data",
            "Right to erasure (right to be forgotten): Deletion of personal data",
            "Right to restriction of processing: Restriction of personal data processing",
            "Right to data portability: Receipt and transfer of data",
            "Right to object: Objection to the processing of personal data",
          ],
        },
        ccpa: {
          title: "8-3. California Residents (CCPA)",
          items: [
            "Right to request disclosure of categories and purposes of personal information collected",
            "Right to request deletion of personal information",
            "Right to opt out of the sale of personal information (we do not sell personal information)",
          ],
        },
        howTo: {
          title: "How to Exercise Your Rights",
          content: "For data stored locally, you can delete it by uninstalling the App. For other rights, please contact us at the address below.",
        },
      },
      cookies: {
        title: "9. Cookies and Tracking Technologies",
        content: "This App does not operate in a web browser and therefore does not use cookies.",
        revenueCat: "The RevenueCat SDK uses device identifiers but does not perform cross-app tracking for advertising purposes.",
        att: "We do not conduct advertising-purpose tracking as required by Apple's App Tracking Transparency (ATT) framework, so the ATT prompt will not be displayed.",
      },
      internationalTransfer: {
        title: "10. International Data Transfers",
        content: "The servers of third-party services used by this App are primarily located in the United States. When data is transmitted from Japan or the EEA, that data may be transferred outside the country.",
        note: "Each third-party service has appropriate data protection measures in place (such as Standard Contractual Clauses). Please refer to each provider's privacy policy for details.",
      },
      changes: {
        title: "11. Changes to This Privacy Policy",
        content: "We may update this Privacy Policy from time to time. If significant changes occur, we will notify you through in-app notifications or by updating the \"Last Updated\" date at the top of this page.",
        notification: "",
        consent: "If you continue to use this App after changes are made, you are deemed to have agreed to the updated Privacy Policy.",
      },
      contact: {
        title: "12. Contact Us",
        content: "For questions about this Privacy Policy or to exercise your rights, please contact us at:",
        email: "Email",
        responseTime: "We will respond within 30 days as a general rule.",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label",
        description: "Disclosure information for the App Privacy section of the App Store.",
        tableHeaders: ["Data Type", "Collected", "Tracked", "Purpose"],
        rows: [
          ["Audio data", "Yes (processing only)", "No", "App Functionality (scoring)"],
          ["User content (speech transcript)", "Yes (processing only)", "No", "App Functionality (AI scoring)"],
          ["Identifiers (device ID)", "Yes", "No", "App Functionality (subscription management)"],
          ["Purchase information", "Yes", "No", "App Functionality (subscription management)"],
          ["Usage data", "Yes (on-device only)", "No", "App Functionality (learning progress)"],
          ["Name, contact info, location, etc.", "No", "No", "—"],
        ],
        trackingNote: "\"Tracking\" = use of data for third-party advertising or analytics. This App does not track any data for advertising purposes.",
        languageNote: "In the event of any conflict between the Japanese and English versions of this Privacy Policy, the Japanese version shall prevail.",
      },
    },
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث",
    lastUpdatedDate: LAST_UPDATED_AR,
    backToSupport: "العودة إلى صفحة الدعم",
    tableOfContents: "جدول المحتويات",
    sections: {
      intro: {
        title: "1. مقدمة",
        content: "SpeakKnock (يُشار إليه فيما يلي بـ \"التطبيق\") هو تطبيق لممارسة التحدث باللغة الإنجليزية. توضح سياسة الخصوصية هذه أنواع المعلومات التي يتم جمعها عند استخدام التطبيق، وأغراض الاستخدام، وطريقة الإدارة، والمشاركة مع أطراف ثالثة.",
        consent: "باستخدام هذا التطبيق، يُعتبر أنك وافقت على المحتوى الموضح في سياسة الخصوصية هذه. إذا كنت لا توافق، يرجى الامتناع عن استخدام التطبيق.",
      },
      dataCollection: {
        title: "2. المعلومات التي نجمعها",
        userProvided: {
          title: "2-1. المعلومات المقدمة من المستخدمين",
          audio: {
            title: "(أ) البيانات الصوتية",
            items: [
              "الصوت المسجل من قبل المستخدم أثناء ممارسة التحدث",
              "تُستخدم التسجيلات فقط لأغراض التقييم والتصحيح ولا يتم تخزينها على خوادمنا بعد اكتمال المعالجة",
              "توقيت الجمع: عند التسجيل أثناء ممارسة التحدث",
              "الوجهة: يتم إرسالها إلى خدمات طرف ثالث حسب خطتك (انظر القسم 4 للتفاصيل)",
            ],
          },
          transcript: {
            title: "(ب) نص الكلام",
            items: [
              "نص محتوى الكلام الذي تم إنشاؤه بواسطة التعرف على الصوت",
              "يُستخدم للتقييم بالذكاء الاصطناعي في خطط Pro وPremium",
            ],
          },
        },
        autoCollected: {
          title: "2-2. المعلومات المجمعة تلقائيًا",
          deviceId: {
            title: "(أ) معرّف الجهاز",
            items: [
              "معرّف خاص بالجهاز يجمعه RevenueCat لإدارة الاشتراكات",
              "لا يُستخدم لأغراض إعلانية",
            ],
          },
          subscription: {
            title: "(ب) معلومات الاشتراك والفوترة",
            items: [
              "خطة اشتراكك (Free / Standard / Pro / Premium)",
              "معلومات إيصال الشراء من Apple App Store (يتم إدارة معلومات الدفع بواسطة Apple؛ نحن لا نحصل على أرقام البطاقات، إلخ)",
            ],
          },
          appUsage: {
            title: "(ج) بيانات استخدام التطبيق (على الجهاز فقط)",
            items: [
              "سجل التعلم ودرجات إجابات الاختبارات",
              "إعدادات التطبيق",
              "عدد الاختبارات اليومية",
            ],
          },
        },
        notCollected: {
          title: "2-3. المعلومات التي لا نجمعها",
          intro: "لا يجمع هذا التطبيق أيًا من المعلومات التالية:",
          items: [
            "معلومات التعريف الشخصية مثل الاسم أو عنوان البريد الإلكتروني أو العنوان البريدي (لا يلزم تسجيل حساب)",
            "بيانات الموقع",
            "معلومات الاتصال",
            "بيانات الصحة واللياقة البدنية",
            "بيانات التتبع لأغراض إعلانية",
          ],
        },
      },
      purpose: {
        title: "3. أغراض الاستخدام",
        intro: "تُستخدم المعلومات المجمعة فقط للأغراض التالية:",
        tableHeaders: ["نوع المعلومات", "غرض الاستخدام"],
        rows: [
          ["البيانات الصوتية", "تقييم التحدث وتقييم النطق ومعالجة التحويل إلى نص"],
          ["نص الكلام", "إنشاء ملاحظات الذكاء الاصطناعي حول القواعد والمفردات والمحتوى"],
          ["معرّف الجهاز", "التحقق من حالة الاشتراك وإدارتها"],
          ["معلومات الاشتراك", "توفير ميزات خاصة بالخطة، والتحقق من الاشتراك النشط"],
          ["بيانات الاستخدام (محلية)", "عرض تقدم التعلم، وإدارة حد الاستخدام اليومي"],
        ],
      },
      thirdParty: {
        title: "4. المشاركة مع خدمات الطرف الثالث",
        intro: "يستخدم هذا التطبيق خدمات الطرف الثالث التالية لتقديم خدماته. يحدث نقل البيانات إلى كل خدمة فقط عند استخدام الخطة والميزات ذات الصلة.",
        providers: [
          {
            name: "4-1. OpenAI (تحويل الكلام إلى نص والتقييم بالذكاء الاصطناعي)",
            plan: "الخطط المعنية: Standard وPro وPremium",
            data: "البيانات المرسلة: الصوت المسجل (بتنسيق Base64)، نص الكلام، محتوى السؤال، نوع الاختبار، ومستوى الصعوبة",
            purpose: "الغرض: تحويل الكلام إلى نص (Whisper API)، تقييم محتوى التحدث بالذكاء الاصطناعي (GPT-4o-mini)",
            retention: "الاحتفاظ بالبيانات: لا يتم تخزينها على خوادمنا بعد المعالجة. تخضع لسياسة الاحتفاظ بالبيانات الخاصة بـ OpenAI",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-2. Microsoft Azure Cognitive Services (تقييم النطق)",
            plan: "الخطط المعنية: Premium فقط",
            data: "البيانات المرسلة: الصوت المسجل (بتنسيق WAV)، النص المرجعي (معيار تقييم النطق)",
            purpose: "الغرض: تقييم مفصل لدقة النطق والطلاقة والإيقاع والتنغيم والاكتمال",
            retention: "الاحتفاظ بالبيانات: لا يتم تخزينها على خوادمنا بعد المعالجة. تخضع لسياسة الاحتفاظ بالبيانات الخاصة بـ Microsoft",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://privacy.microsoft.com/en-us/privacystatement",
          },
          {
            name: "4-3. Supabase (البنية التحتية الخلفية)",
            plan: "الخطط المعنية: Standard وPro وPremium",
            data: "البيانات المرسلة: البيانات الصوتية ونصوص الكلام أثناء معالجة الترحيل إلى الخدمات المذكورة أعلاه",
            purpose: "الغرض: ترحيل معالجة API عبر Edge Functions (يتم معالجة البيانات مؤقتًا فقط ولا يتم تخزينها)",
            retention: "موقع الخادم: الولايات المتحدة",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-4. RevenueCat (إدارة الاشتراكات)",
            plan: "الخطط المعنية: جميع الخطط (إدارة الاشتراكات لـ Standard وما فوق)",
            data: "البيانات المرسلة: معرّف الجهاز، إيصالات شراء Apple App Store",
            purpose: "الغرض: التحقق من حالة الاشتراك وإدارتها",
            retention: "",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
          {
            name: "4-5. Apple Speech Recognition Framework (التعرف على الصوت)",
            plan: "الخطط المعنية: جميع الخطط",
            data: "البيانات المرسلة: البيانات الصوتية (قد يتم إرسالها إلى خوادم Apple)",
            purpose: "الغرض: تحويل الكلام إلى نص في الوقت الفعلي (التعرف المتدفق)",
            retention: "",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://www.apple.com/legal/privacy/",
          },
        ],
        important: "مهم: نحن لا نبيع أو نشارك أو نقدم المعلومات الشخصية للمستخدمين لأي أطراف ثالثة بخلاف ما ذُكر أعلاه (بما في ذلك شبكات الإعلانات ووسطاء البيانات).",
      },
      retention: {
        title: "5. تخزين البيانات والاحتفاظ بها",
        local: {
          title: "على الجهاز (التخزين المحلي)",
          intro: "يتم تخزين البيانات التالية فقط على جهاز المستخدم ولا يتم نقلها إلى خوادمنا:",
          items: [
            "سجل التعلم ونتائج التقييم",
            "إعدادات التطبيق",
            "عداد حد الاستخدام اليومي",
          ],
          deletion: "يتم حذف هذه البيانات عند إلغاء تثبيت التطبيق.",
        },
        server: {
          title: "خوادمنا",
          content: "لا يتطلب هذا التطبيق حساب مستخدم، ولا يتم تخزين البيانات الصوتية أو نصوص الكلام بعد معالجة التقييم على خوادمنا. تتم المعالجة مؤقتًا على Edge Functions، ويتم حذف البيانات بعد إرجاع الاستجابة.",
        },
        thirdParty: {
          title: "خدمات الطرف الثالث",
          content: "يرجى الرجوع إلى سياسة الخصوصية الخاصة بكل خدمة طرف ثالث لمعرفة سياسات الاحتفاظ بالبيانات الخاصة بها.",
        },
      },
      security: {
        title: "6. أمان البيانات",
        items: [
          "تشفير الاتصالات: يتم تشفير جميع اتصالات البيانات باستخدام HTTPS/TLS",
          "المصادقة: يتم حماية الوصول إلى Supabase Edge Functions من خلال التحقق من رمز JWT بناءً على حالة الاشتراك",
          "مبدأ الحد الأدنى من الصلاحيات: يتم إرسال الحد الأدنى فقط من البيانات اللازمة لمعالجة التقييم",
          "أولوية المعالجة المحلية: حيثما أمكن، تتم معالجة التقييم على المحرك الأصلي للجهاز (Swift) لتقليل نقل البيانات إلى السحابة",
        ],
        disclaimer: "ومع ذلك، ينطوي نقل البيانات عبر الإنترنت على مخاطر متأصلة، ولا يمكن ضمان الأمان الكامل.",
      },
      children: {
        title: "7. خصوصية الأطفال (الامتثال لـ COPPA)",
        content: "هذا التطبيق غير مخصص للأطفال دون سن 13 عامًا، ونحن لا نجمع عمدًا معلومات شخصية من الأطفال دون سن 13 عامًا.",
        action: "إذا علمنا أن طفلاً دون سن 13 عامًا قد استخدم هذا التطبيق، فسنتخذ خطوات معقولة لحذف المعلومات ذات الصلة على الفور. يجب على الآباء أو الأوصياء الذين يعلمون أن طفلهم يستخدم هذا التطبيق الاتصال بنا على العنوان أدناه.",
      },
      userRights: {
        title: "8. حقوق المستخدم",
        japan: {
          title: "8-1. المستخدمون في اليابان",
          items: [
            "الحق في طلب الإفصاح عن المعلومات الشخصية المحتفظ بها",
            "الحق في طلب تصحيح المحتوى أو إضافته أو حذفه",
            "الحق في طلب تعليق الاستخدام أو المحو",
          ],
        },
        gdpr: {
          title: "8-2. المستخدمون في المنطقة الاقتصادية الأوروبية والمملكة المتحدة (GDPR)",
          items: [
            "حق الوصول: الوصول إلى البيانات الشخصية المحتفظ بها",
            "حق التصحيح: تصحيح البيانات الشخصية غير الدقيقة",
            "حق المحو (الحق في النسيان): حذف البيانات الشخصية",
            "حق تقييد المعالجة: تقييد معالجة البيانات الشخصية",
            "حق نقل البيانات: استلام البيانات ونقلها",
            "حق الاعتراض: الاعتراض على معالجة البيانات الشخصية",
          ],
        },
        ccpa: {
          title: "8-3. سكان كاليفورنيا (CCPA)",
          items: [
            "الحق في طلب الإفصاح عن فئات وأغراض المعلومات الشخصية المجمعة",
            "الحق في طلب حذف المعلومات الشخصية",
            "الحق في رفض بيع المعلومات الشخصية (نحن لا نبيع المعلومات الشخصية)",
          ],
        },
        howTo: {
          title: "كيفية ممارسة حقوقك",
          content: "بالنسبة للبيانات المخزنة محليًا، يمكنك حذفها عن طريق إلغاء تثبيت التطبيق. للحقوق الأخرى، يرجى الاتصال بنا على العنوان أدناه.",
        },
      },
      cookies: {
        title: "9. ملفات تعريف الارتباط وتقنيات التتبع",
        content: "لا يعمل هذا التطبيق في متصفح ويب وبالتالي لا يستخدم ملفات تعريف الارتباط.",
        revenueCat: "يستخدم RevenueCat SDK معرّفات الجهاز ولكنه لا يقوم بتتبع عبر التطبيقات لأغراض إعلانية.",
        att: "نحن لا نجري تتبعًا لأغراض إعلانية كما هو مطلوب بموجب إطار عمل App Tracking Transparency (ATT) من Apple، لذلك لن يتم عرض مطالبة ATT.",
      },
      internationalTransfer: {
        title: "10. نقل البيانات الدولي",
        content: "تقع خوادم خدمات الطرف الثالث المستخدمة بواسطة هذا التطبيق بشكل أساسي في الولايات المتحدة. عند نقل البيانات من اليابان أو المنطقة الاقتصادية الأوروبية، قد يتم نقل تلك البيانات خارج البلاد.",
        note: "تتخذ كل خدمة طرف ثالث تدابير حماية بيانات مناسبة (مثل البنود التعاقدية القياسية). يرجى الرجوع إلى سياسة الخصوصية الخاصة بكل مزود للتفاصيل.",
      },
      changes: {
        title: "11. التغييرات على سياسة الخصوصية هذه",
        content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. في حالة حدوث تغييرات جوهرية، سنخطرك من خلال إشعارات داخل التطبيق أو عن طريق تحديث تاريخ \"آخر تحديث\" في أعلى هذه الصفحة.",
        notification: "",
        consent: "إذا واصلت استخدام هذا التطبيق بعد إجراء التغييرات، يُعتبر أنك وافقت على سياسة الخصوصية المحدثة.",
      },
      contact: {
        title: "12. اتصل بنا",
        content: "للاستفسارات حول سياسة الخصوصية هذه أو لممارسة حقوقك، يرجى الاتصال بنا على:",
        email: "البريد الإلكتروني",
        responseTime: "سنقوم بالرد خلال 30 يومًا كقاعدة عامة.",
      },
      appStoreLabel: {
        title: "ملصق خصوصية App Store",
        description: "معلومات الإفصاح لقسم خصوصية التطبيق في App Store.",
        tableHeaders: ["نوع البيانات", "يتم جمعها", "يتم تتبعها", "الغرض"],
        rows: [
          ["البيانات الصوتية", "نعم (المعالجة فقط)", "لا", "وظائف التطبيق (التقييم)"],
          ["محتوى المستخدم (نص الكلام)", "نعم (المعالجة فقط)", "لا", "وظائف التطبيق (تقييم AI)"],
          ["المعرّفات (معرّف الجهاز)", "نعم", "لا", "وظائف التطبيق (إدارة الاشتراك)"],
          ["معلومات الشراء", "نعم", "لا", "وظائف التطبيق (إدارة الاشتراك)"],
          ["بيانات الاستخدام", "نعم (على الجهاز فقط)", "لا", "وظائف التطبيق (تقدم التعلم)"],
          ["الاسم، معلومات الاتصال، الموقع، إلخ.", "لا", "لا", "—"],
        ],
        trackingNote: "\"التتبع\" = استخدام البيانات لأغراض الإعلان أو التحليل من طرف ثالث. لا يتتبع هذا التطبيق أي بيانات لأغراض إعلانية.",
        languageNote: "في حالة وجود أي تعارض بين النسخة اليابانية والعربية من سياسة الخصوصية هذه، تسود النسخة اليابانية.",
      },
    },
  },
  "zh-TW": {
    title: "隱私權政策",
    lastUpdated: "最後更新",
    lastUpdatedDate: LAST_UPDATED_ZH_TW,
    backToSupport: "返回支援頁面",
    tableOfContents: "目錄",
    sections: {
      intro: {
        title: "1. 前言",
        content: "SpeakKnock（以下簡稱「本應用程式」）是一款英語口說練習應用程式。本隱私權政策說明使用本應用程式時收集的資訊類型、使用目的、管理方式以及與第三方的共享方式。",
        consent: "使用本應用程式即表示您同意本隱私權政策中描述的內容。如果您不同意，請停止使用本應用程式。",
      },
      dataCollection: {
        title: "2. 我們收集的資訊",
        userProvided: {
          title: "2-1. 使用者提供的資訊",
          audio: {
            title: "(a) 音訊資料",
            items: [
              "使用者在口說練習期間錄製的音訊",
              "錄音僅用於評分和評估處理，處理完成後不會儲存在我們的伺服器上",
              "收集時機：口說練習錄音時",
              "傳送目的地：根據您的方案傳送至第三方服務（詳見第4條）",
            ],
          },
          transcript: {
            title: "(b) 語音文字稿",
            items: [
              "由語音辨識產生的語音內容文字",
              "在 Pro 和 Premium 方案中用於 AI 評分",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 自動收集的資訊",
          deviceId: {
            title: "(a) 裝置識別碼",
            items: [
              "RevenueCat 為訂閱管理而收集的裝置特定識別碼",
              "不用於廣告目的",
            ],
          },
          subscription: {
            title: "(b) 訂閱和帳單資訊",
            items: [
              "您的訂閱方案（Free / Standard / Pro / Premium）",
              "來自 Apple App Store 的購買收據資訊（付款資訊由 Apple 管理；我們不會取得卡號等資訊）",
            ],
          },
          appUsage: {
            title: "(c) 應用程式使用資料（僅限裝置上）",
            items: [
              "學習記錄和測驗答題分數",
              "應用程式設定",
              "每日測驗次數",
            ],
          },
        },
        notCollected: {
          title: "2-3. 我們不收集的資訊",
          intro: "本應用程式不收集以下任何資訊：",
          items: [
            "姓名、電子郵件地址或郵寄地址等個人識別資訊（無需註冊帳號）",
            "位置資料",
            "聯絡資訊",
            "健康和健身資料",
            "用於廣告目的的追蹤資料",
          ],
        },
      },
      purpose: {
        title: "3. 使用目的",
        intro: "收集的資訊僅用於以下目的：",
        tableHeaders: ["資訊類型", "使用目的"],
        rows: [
          ["音訊資料", "口說評分、發音評估和轉錄處理"],
          ["語音文字稿", "AI 對文法、詞彙和內容的回饋生成"],
          ["裝置識別碼", "訂閱狀態的驗證和管理"],
          ["訂閱資訊", "提供方案特定功能、驗證有效訂閱"],
          ["使用資料（本地）", "顯示學習進度、每日使用限制管理"],
        ],
      },
      thirdParty: {
        title: "4. 與第三方服務的共享",
        intro: "本應用程式使用以下第三方服務來提供其服務。只有在使用相關方案和功能時才會向各服務傳輸資料。",
        providers: [
          {
            name: "4-1. OpenAI（語音轉文字和 AI 評分）",
            plan: "適用方案：Standard、Pro、Premium",
            data: "傳輸資料：錄製的音訊（Base64 格式）、語音文字稿、問題內容、考試類型和難度等級",
            purpose: "目的：語音轉文字（Whisper API）、AI 口說內容評分（GPT-4o-mini）",
            retention: "資料保留：處理後不會儲存在我們的伺服器上。受 OpenAI 資料保留政策約束",
            policyLabel: "隱私權政策",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-2. Microsoft Azure Cognitive Services（發音評估）",
            plan: "適用方案：僅限 Premium",
            data: "傳輸資料：錄製的音訊（WAV 格式）、參考文字（發音評估基準）",
            purpose: "目的：發音準確性、流暢性、節奏、語調和完整性的詳細評估",
            retention: "資料保留：處理後不會儲存在我們的伺服器上。受 Microsoft 資料保留政策約束",
            policyLabel: "隱私權政策",
            policyUrl: "https://privacy.microsoft.com/en-us/privacystatement",
          },
          {
            name: "4-3. Supabase（後端基礎設施）",
            plan: "適用方案：Standard、Pro、Premium",
            data: "傳輸資料：向上述服務進行中繼處理時的音訊資料和語音文字稿",
            purpose: "目的：透過 Edge Functions 進行 API 處理中繼（資料僅臨時處理，不會儲存）",
            retention: "伺服器位置：美國",
            policyLabel: "隱私權政策",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-4. RevenueCat（訂閱管理）",
            plan: "適用方案：所有方案（Standard 及以上的訂閱管理）",
            data: "傳輸資料：裝置識別碼、Apple App Store 購買收據",
            purpose: "目的：訂閱狀態的驗證和管理",
            retention: "",
            policyLabel: "隱私權政策",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
          {
            name: "4-5. Apple Speech Recognition Framework（語音辨識）",
            plan: "適用方案：所有方案",
            data: "傳輸資料：音訊資料（可能會傳送至 Apple 的伺服器）",
            purpose: "目的：即時語音轉文字（串流辨識）",
            retention: "",
            policyLabel: "隱私權政策",
            policyUrl: "https://www.apple.com/legal/privacy/",
          },
        ],
        important: "重要：我們不會向上述以外的任何第三方（包括廣告網路和資料經紀商）出售、共享或提供使用者的個人資訊。",
      },
      retention: {
        title: "5. 資料儲存和保留",
        local: {
          title: "裝置上（本地儲存）",
          intro: "以下資料僅儲存在使用者的裝置上，不會傳輸到我們的伺服器：",
          items: [
            "學習記錄和評分結果",
            "應用程式設定",
            "每日使用限制計數器",
          ],
          deletion: "解除安裝應用程式時，這些資料將被刪除。",
        },
        server: {
          title: "我們的伺服器",
          content: "本應用程式不需要使用者帳號，評分/評估處理後的音訊資料或語音文字稿不會儲存在我們的伺服器上。處理在 Edge Functions 上臨時執行，回應返回後資料即被刪除。",
        },
        thirdParty: {
          title: "第三方服務",
          content: "請參閱各第三方服務自己的隱私權政策，以了解其資料保留政策。",
        },
      },
      security: {
        title: "6. 資料安全",
        items: [
          "通訊加密：所有資料通訊均使用 HTTPS/TLS 加密",
          "驗證：對 Supabase Edge Functions 的存取受到基於訂閱狀態的 JWT 權杖驗證保護",
          "最小權限原則：僅傳輸評分處理所需的最少資料",
          "本地處理優先：盡可能在裝置的原生引擎（Swift）上執行評分處理，以最小化向雲端的資料傳輸",
        ],
        disclaimer: "然而，透過網際網路傳輸資料存在固有風險，無法保證完全的安全性。",
      },
      children: {
        title: "7. 兒童隱私（COPPA 合規）",
        content: "本應用程式不適用於 13 歲以下的兒童，我們不會故意收集 13 歲以下兒童的個人資訊。",
        action: "如果我們得知 13 歲以下的兒童使用了本應用程式，我們將採取合理步驟立即刪除相關資訊。知道其孩子正在使用本應用程式的父母或監護人，請透過以下地址與我們聯繫。",
      },
      userRights: {
        title: "8. 使用者權利",
        japan: {
          title: "8-1. 日本使用者",
          items: [
            "要求揭露所持有個人資訊的權利",
            "要求更正、新增或刪除內容的權利",
            "要求暫停使用或刪除的權利",
          ],
        },
        gdpr: {
          title: "8-2. 歐洲經濟區和英國使用者（GDPR）",
          items: [
            "存取權：存取所持有的個人資料",
            "更正權：更正不準確的個人資料",
            "刪除權（被遺忘權）：刪除個人資料",
            "限制處理權：限制個人資料處理",
            "資料可攜權：接收和轉移資料",
            "反對權：反對個人資料處理",
          ],
        },
        ccpa: {
          title: "8-3. 加州居民（CCPA）",
          items: [
            "要求揭露所收集個人資訊的類別和目的的權利",
            "要求刪除個人資訊的權利",
            "選擇退出個人資訊銷售的權利（我們不銷售個人資訊）",
          ],
        },
        howTo: {
          title: "如何行使您的權利",
          content: "對於本地儲存的資料，您可以透過解除安裝應用程式來刪除。如需行使其他權利，請透過以下地址與我們聯繫。",
        },
      },
      cookies: {
        title: "9. Cookie 和追蹤技術",
        content: "本應用程式不在網頁瀏覽器中運行，因此不使用 Cookie。",
        revenueCat: "RevenueCat SDK 使用裝置識別碼，但不會進行跨應用程式的廣告追蹤。",
        att: "我們不進行 Apple App Tracking Transparency（ATT）框架所要求的廣告目的追蹤，因此不會顯示 ATT 提示。",
      },
      internationalTransfer: {
        title: "10. 國際資料傳輸",
        content: "本應用程式使用的第三方服務伺服器主要位於美國。從日本或歐洲經濟區傳輸資料時，該資料可能會被傳輸到國外。",
        note: "各第三方服務已採取適當的資料保護措施（如標準合約條款）。詳情請參閱各提供者的隱私權政策。",
      },
      changes: {
        title: "11. 本隱私權政策的變更",
        content: "我們可能會不時更新本隱私權政策。如有重大變更，我們將透過應用程式內通知或更新本頁面頂部的「最後更新」日期來通知您。",
        notification: "",
        consent: "如果您在變更後繼續使用本應用程式，即表示您同意更新後的隱私權政策。",
      },
      contact: {
        title: "12. 聯繫我們",
        content: "如對本隱私權政策有疑問或需要行使您的權利，請透過以下方式聯繫我們：",
        email: "電子郵件",
        responseTime: "我們通常會在 30 天內回覆。",
      },
      appStoreLabel: {
        title: "App Store 隱私營養標籤",
        description: "App Store 應用程式隱私部分的揭露資訊。",
        tableHeaders: ["資料類型", "是否收集", "是否追蹤", "目的"],
        rows: [
          ["音訊資料", "是（僅處理時）", "否", "應用程式功能（評分）"],
          ["使用者內容（語音文字稿）", "是（僅處理時）", "否", "應用程式功能（AI 評分）"],
          ["識別碼（裝置 ID）", "是", "否", "應用程式功能（訂閱管理）"],
          ["購買資訊", "是", "否", "應用程式功能（訂閱管理）"],
          ["使用資料", "是（僅限裝置上）", "否", "應用程式功能（學習進度）"],
          ["姓名、聯絡資訊、位置等", "否", "否", "—"],
        ],
        trackingNote: "「追蹤」= 將資料用於第三方廣告或分析目的。本應用程式不會為廣告目的追蹤任何資料。",
        languageNote: "如本隱私權政策的日文版和中文版有任何衝突，以日文版為準。",
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

function ProviderCard({
  name,
  plan,
  data,
  purpose,
  retention,
  policyLabel,
  policyUrl,
}: {
  name: string;
  plan: string;
  data: string;
  purpose: string;
  retention: string;
  policyLabel: string;
  policyUrl: string;
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
          <a
            href={policyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
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

// ========================================
// メインページ
// ========================================
export default function SpeakKnockPrivacyPolicyPage() {
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
    s.internationalTransfer.title,
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
              alt="SpeakKnock"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">SpeakKnock</h1>
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
            href="/support/speak-knock"
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
            <SubSection title={s.dataCollection.userProvided.title}>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.userProvided.audio.title}</h4>
                <BulletList items={s.dataCollection.userProvided.audio.items} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.userProvided.transcript.title}</h4>
                <BulletList items={s.dataCollection.userProvided.transcript.items} />
              </div>
            </SubSection>

            {/* 2-2 */}
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

            {/* 2-3 */}
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
            <p className="text-gray-700 leading-relaxed mb-4">{s.thirdParty.intro}</p>
            {s.thirdParty.providers.map((provider, i) => (
              <ProviderCard key={i} {...provider} />
            ))}
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
            <SubSection title={s.retention.thirdParty.title}>
              <p className="text-gray-700 leading-relaxed">{s.retention.thirdParty.content}</p>
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
              <p className="text-gray-600 text-sm mb-2">
                {lang === "en" ? "Under the Act on the Protection of Personal Information, you have the following rights:" : lang === "ko" ? "개인정보 보호법에 따라 다음 권리를 가집니다：" : lang === "ar" ? "بموجب قانون حماية المعلومات الشخصية، لديك الحقوق التالية:" : lang === "zh-TW" ? "根據個人資訊保護法，您擁有以下權利：" : "個人情報保護法に基づき、以下の権利を有します："}
              </p>
              <BulletList items={s.userRights.japan.items} />
            </SubSection>
            <SubSection title={s.userRights.gdpr.title}>
              <p className="text-gray-600 text-sm mb-2">
                {lang === "en" ? "Under the GDPR, you have the following rights:" : lang === "ko" ? "GDPR에 따라 다음 권리를 가집니다：" : lang === "ar" ? "بموجب GDPR، لديك الحقوق التالية:" : lang === "zh-TW" ? "根據 GDPR，您擁有以下權利：" : "GDPR に基づき、以下の権利を有します："}
              </p>
              <BulletList items={s.userRights.gdpr.items} />
            </SubSection>
            <SubSection title={s.userRights.ccpa.title}>
              <p className="text-gray-600 text-sm mb-2">
                {lang === "en" ? "Under the CCPA, you have the following rights:" : lang === "ko" ? "CCPA에 따라 다음 권리를 가집니다：" : lang === "ar" ? "بموجب CCPA، لديك الحقوق التالية:" : lang === "zh-TW" ? "根據 CCPA，您擁有以下權利：" : "CCPA に基づき、以下の権利を有します："}
              </p>
              <BulletList items={s.userRights.ccpa.items} />
            </SubSection>
            <SubSection title={s.userRights.howTo.title}>
              <p className="text-gray-700 leading-relaxed">{s.userRights.howTo.content}</p>
            </SubSection>
          </Section>

          {/* 9. Cookie */}
          <Section title={s.cookies.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.cookies.content}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{s.cookies.revenueCat}</p>
            <p className="text-gray-700 leading-relaxed">{s.cookies.att}</p>
          </Section>

          {/* 10. 国際データ転送 */}
          <Section title={s.internationalTransfer.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.internationalTransfer.content}</p>
            <NoteBox>{s.internationalTransfer.note}</NoteBox>
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
