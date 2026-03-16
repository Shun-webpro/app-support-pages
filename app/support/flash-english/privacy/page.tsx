"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/flashenglish.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年3月16日";
const LAST_UPDATED_KO = "2026년 3월 16일";
const LAST_UPDATED_EN = "March 16, 2026";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "ko" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
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
      };
      autoCollected: {
        title: string;
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
    permissions: {
      title: string;
      intro: string;
      items: { name: string; detail: string }[];
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
        content: "Flash English（以下「本アプリ」）は、フラッシュカード・クイズ・フリースタイルスピーキングを通じて英語学習をサポートするアプリです。本プライバシーポリシーは、本アプリをご利用いただく際に収集する情報の種類、利用目的、管理方法、および第三者への提供について説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに記載された内容に同意したものとみなします。同意いただけない場合は、本アプリのご利用をお控えください。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        userProvided: {
          title: "2-1. ユーザーが提供する情報",
          audio: {
            title: "(a) 音声データ",
            items: [
              "ユーザーがフリースタイルクイズで録音した音声",
              "録音はスピーキング評価（文字起こし・内容評価）のためにのみ使用され、処理完了後に当社サーバーには保存されません",
              "収集タイミング: フリースタイルクイズの録音時",
              "送信先: Supabase を経由して OpenAI API に送信されます（詳細は第4条参照）",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 自動的に収集される情報",
          subscription: {
            title: "(a) 購読・課金情報",
            items: [
              "ご利用のサブスクリプションプラン（Free / Premium）",
              "Apple App Store による購入レシート情報（決済情報はAppleが管理し、当社はカード番号等を取得しません）",
            ],
          },
          appUsage: {
            title: "(b) アプリ利用データ（端末内のみ）",
            items: [
              "フラッシュカード・クイズの学習進捗",
              "マイフレーズ（保存したフレーズ・単語）",
              "獲得バッジ情報",
              "無料プランの利用回数カウント",
              "アプリ設定（言語、テーマ等）",
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
          ["音声データ", "AIスピーキング評価（文字起こし・内容分析・フィードバック）"],
          ["購読情報", "プラン別機能の提供、有効な購読の確認"],
          ["利用データ（ローカル）", "学習進捗の表示、マイフレーズ管理、バッジ管理"],
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        intro: "本アプリは、サービス提供のために以下の第三者サービスを利用します。各サービスへのデータ送信は、機能利用時にのみ発生します。",
        providers: [
          {
            name: "4-1. Supabase（データ中継）",
            plan: "対象: フリースタイルクイズ機能利用時",
            data: "送信するデータ: 録音音声データ",
            purpose: "利用目的: OpenAI API への音声データの安全な中継処理",
            retention: "データ保持: 音声データは中継処理のみに使用され、永続的に保存されません",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API（スピーキング評価）",
            plan: "対象: フリースタイルクイズ機能利用時",
            data: "送信するデータ: 録音音声データ",
            purpose: "利用目的: 音声の文字起こし、スピーキング内容の評価・フィードバック生成",
            retention: "データ保持: 処理後に当社サーバーには保存されません。OpenAI のデータ保持ポリシーに従います",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat（購読管理）",
            plan: "対象: 全ユーザー（Premium の購読管理）",
            data: "送信するデータ: 匿名ユーザーID、Apple App Store 購入レシート",
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
          items: [
            "フラッシュカード・クイズの学習進捗",
            "マイフレーズ（保存したフレーズ・単語）",
            "獲得バッジ情報",
            "アプリ設定（言語、テーマ等）",
            "無料プランの利用回数カウント",
          ],
          deletion: "これらのデータは、アプリをアンインストールすることで削除されます。クラウド同期は行われないため、再インストール時にデータは復元されません。",
        },
        server: {
          title: "当社サーバー",
          content: "本アプリはユーザーアカウントを必要とせず、スピーキング評価処理後の音声データを当社のサーバーに保存しません。すべてのユーザーデータは端末内にのみ保存されます。",
        },
        thirdParty: {
          title: "第三者サービス",
          content: "各第三者サービスのデータ保持ポリシーは、各社のプライバシーポリシーをご参照ください。",
        },
      },
      permissions: {
        title: "6. アプリが使用する権限",
        intro: "本アプリは以下の端末権限を使用します：",
        items: [
          {
            name: "マイク",
            detail: "フリースタイルクイズでのスピーキング練習時に音声を録音するために使用します。",
          },
          {
            name: "音声認識",
            detail: "録音した音声を文字に変換するために使用します。",
          },
        ],
      },
      security: {
        title: "7. データのセキュリティ",
        items: [
          "通信の暗号化: すべてのデータ通信は HTTPS/TLS により暗号化されます",
          "最小権限原則: スピーキング評価処理に必要な最小限のデータのみを送信します",
          "ローカル保存優先: 学習データはすべて端末内に保存し、クラウドへのデータ送信を最小化します",
        ],
        disclaimer: "ただし、インターネット経由のデータ転送には固有のリスクが伴い、完全なセキュリティを保証することはできません。",
      },
      children: {
        title: "8. お子様のプライバシー（COPPA対応）",
        content: "本アプリは13歳未満の子供を対象としておらず、意図的に13歳未満の子供から個人情報を収集することはありません。",
        action: "13歳未満の子供が本アプリを利用していることが判明した場合、関連する情報を速やかに削除するために合理的な措置を講じます。お子様が本アプリを利用していることをご存知の保護者の方は、下記お問い合わせ先までご連絡ください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        japan: {
          title: "9-1. 日本国内のユーザー",
          items: [
            "保有する個人情報の開示請求",
            "内容の訂正・追加・削除の請求",
            "利用停止・消去の請求",
          ],
        },
        gdpr: {
          title: "9-2. EEA・UK のユーザー（GDPR）",
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
          title: "9-3. カリフォルニア州のユーザー（CCPA）",
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
        title: "10. Cookieおよびトラッキング技術",
        content: "本アプリはWebブラウザ上で動作するものではないため、Cookie は使用しません。",
        revenueCat: "RevenueCat SDK は匿名ユーザーIDを使用しますが、広告目的のクロスアプリトラッキングは行いません。",
        att: "Apple の App Tracking Transparency（ATT）フレームワークが要求する広告目的のトラッキングは実施していないため、ATT のプロンプトは表示されません。",
      },
      internationalTransfer: {
        title: "11. 国際データ転送",
        content: "本アプリが利用する第三者サービスのサーバーは主に米国に所在しています。日本からデータを送信する場合、そのデータは国外に転送されます。",
        note: "各第三者サービスは、適切なデータ保護措置（標準契約条項等）を講じています。詳細は各社のプライバシーポリシーをご参照ください。",
      },
      changes: {
        title: "12. プライバシーポリシーの変更",
        content: "当社は、本プライバシーポリシーを随時更新することがあります。重要な変更が生じた場合は、アプリ内通知または本ページ上部の「最終更新日」の更新によりお知らせします。",
        consent: "変更後も本アプリを継続してご利用いただく場合は、更新後のプライバシーポリシーに同意したものとみなします。",
      },
      contact: {
        title: "13. お問い合わせ",
        content: "本プライバシーポリシーに関するご質問・権利行使の申請は、以下までお問い合わせください：",
        email: "メールアドレス",
        responseTime: "お問い合わせから原則30日以内にご回答いたします。",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label 対応表",
        description: "App Store の App Privacy セクション向け開示情報です。",
        tableHeaders: ["データの種類", "収集するか", "追跡するか", "利用目的"],
        rows: [
          ["音声データ", "○（処理時のみ）", "×", "App Functionality（スピーキング評価）"],
          ["識別子（匿名ID）", "○", "×", "App Functionality（購読管理）"],
          ["購入情報", "○", "×", "App Functionality（購読管理）"],
          ["利用状況データ", "○（端末内のみ）", "×", "App Functionality（学習進捗）"],
          ["氏名・連絡先・位置情報等", "×", "×", "—"],
        ],
        trackingNote: "「追跡」= 第三者の広告・分析目的でのデータ利用。本アプリはいずれのデータも広告目的で追跡しません。",
        languageNote: "本プライバシーポリシーは日本語を正文とします。他言語版は参考訳です。",
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
        content: 'Flash English(이하 "본 앱")는 플래시카드, 퀴즈, 프리스타일 스피킹을 통해 영어 학습을 지원하는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 수집하는 정보의 종류, 이용 목적, 관리 방법 및 제3자 제공에 대해 설명합니다.',
        consent: "본 앱을 이용하시면 본 개인정보 처리방침에 동의한 것으로 간주됩니다. 동의하지 않으시면 본 앱의 이용을 삼가해 주세요.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        userProvided: {
          title: "2-1. 사용자가 제공하는 정보",
          audio: {
            title: "(a) 음성 데이터",
            items: [
              "사용자가 프리스타일 퀴즈에서 녹음한 음성",
              "녹음은 스피킹 평가(텍스트 변환 및 내용 평가)에만 사용되며, 처리 완료 후 당사 서버에 저장되지 않습니다",
              "수집 시점: 프리스타일 퀴즈 녹음 시",
              "전송 대상: Supabase를 경유하여 OpenAI API로 전송됩니다(자세한 내용은 제4조 참조)",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 자동으로 수집되는 정보",
          subscription: {
            title: "(a) 구독 및 결제 정보",
            items: [
              "이용 중인 구독 플랜(Free / Premium)",
              "Apple App Store 구매 영수증 정보(결제 정보는 Apple이 관리하며, 당사는 카드 번호 등을 취득하지 않습니다)",
            ],
          },
          appUsage: {
            title: "(b) 앱 이용 데이터(기기 내부만)",
            items: [
              "플래시카드 및 퀴즈 학습 진행 상황",
              "마이 프레이즈(저장한 표현 및 단어)",
              "획득 배지 정보",
              "무료 플랜 이용 횟수 카운트",
              "앱 설정(언어, 테마 등)",
            ],
          },
        },
        notCollected: {
          title: "2-3. 수집하지 않는 정보",
          intro: "본 앱은 다음 정보를 일절 수집하지 않습니다:",
          items: [
            "이름, 이메일 주소, 주소 등 개인 식별 정보(계정 등록 불요)",
            "위치 정보",
            "연락처",
            "건강 및 피트니스 데이터",
            "광고 목적의 트래킹 데이터",
          ],
        },
      },
      purpose: {
        title: "3. 정보의 이용 목적",
        intro: "수집한 정보는 다음 목적에만 사용됩니다:",
        tableHeaders: ["정보 종류", "이용 목적"],
        rows: [
          ["음성 데이터", "AI 스피킹 평가(텍스트 변환, 내용 분석, 피드백)"],
          ["구독 정보", "플랜별 기능 제공, 유효한 구독 확인"],
          ["이용 데이터(로컬)", "학습 진행 상황 표시, 마이 프레이즈 관리, 배지 관리"],
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스에 대한 정보 제공",
        intro: "본 앱은 서비스 제공을 위해 다음 제3자 서비스를 이용합니다. 각 서비스로의 데이터 전송은 기능 이용 시에만 발생합니다.",
        providers: [
          {
            name: "4-1. Supabase(데이터 중계)",
            plan: "대상: 프리스타일 퀴즈 기능 이용 시",
            data: "전송 데이터: 녹음 음성 데이터",
            purpose: "이용 목적: OpenAI API로의 음성 데이터 안전한 중계 처리",
            retention: "데이터 보관: 음성 데이터는 중계 처리에만 사용되며, 영구적으로 저장되지 않습니다",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API(스피킹 평가)",
            plan: "대상: 프리스타일 퀴즈 기능 이용 시",
            data: "전송 데이터: 녹음 음성 데이터",
            purpose: "이용 목적: 음성 텍스트 변환, 스피킹 내용 평가 및 피드백 생성",
            retention: "데이터 보관: 처리 후 당사 서버에 저장되지 않습니다. OpenAI의 데이터 보관 정책을 따릅니다",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat(구독 관리)",
            plan: "대상: 전체 사용자(Premium 구독 관리)",
            data: "전송 데이터: 익명 사용자 ID, Apple App Store 구매 영수증",
            purpose: "이용 목적: 구독 상태 확인 및 관리",
            retention: "",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "중요: 위 이외의 제3자(광고 네트워크, 데이터 브로커 등)에게 사용자의 개인정보를 판매, 공유, 제공하는 일은 일절 없습니다.",
      },
      retention: {
        title: "5. 데이터 저장 및 보관 기간",
        local: {
          title: "기기 내(로컬 스토리지)",
          intro: "다음 데이터는 사용자의 기기에만 저장되며, 당사 서버로 전송되지 않습니다:",
          items: [
            "플래시카드 및 퀴즈 학습 진행 상황",
            "마이 프레이즈(저장한 표현 및 단어)",
            "획득 배지 정보",
            "앱 설정(언어, 테마 등)",
            "무료 플랜 이용 횟수 카운트",
          ],
          deletion: "이러한 데이터는 앱을 삭제하면 삭제됩니다. 클라우드 동기화가 이루어지지 않으므로 재설치 시 데이터가 복원되지 않습니다.",
        },
        server: {
          title: "당사 서버",
          content: "본 앱은 사용자 계정이 필요하지 않으며, 스피킹 평가 처리 후 음성 데이터를 당사 서버에 저장하지 않습니다. 모든 사용자 데이터는 기기 내에만 저장됩니다.",
        },
        thirdParty: {
          title: "제3자 서비스",
          content: "각 제3자 서비스의 데이터 보관 정책은 각 회사의 개인정보 처리방침을 참조해 주세요.",
        },
      },
      permissions: {
        title: "6. 앱이 사용하는 권한",
        intro: "본 앱은 다음 기기 권한을 사용합니다:",
        items: [
          {
            name: "마이크",
            detail: "프리스타일 퀴즈에서 스피킹 연습 시 음성을 녹음하는 데 사용됩니다.",
          },
          {
            name: "음성 인식",
            detail: "녹음된 음성을 텍스트로 변환하는 데 사용됩니다.",
          },
        ],
      },
      security: {
        title: "7. 데이터 보안",
        items: [
          "통신 암호화: 모든 데이터 통신은 HTTPS/TLS로 암호화됩니다",
          "최소 권한 원칙: 스피킹 평가 처리에 필요한 최소한의 데이터만 전송합니다",
          "로컬 저장 우선: 학습 데이터는 모두 기기 내에 저장하여 클라우드 데이터 전송을 최소화합니다",
        ],
        disclaimer: "단, 인터넷을 통한 데이터 전송에는 고유한 위험이 따르며, 완전한 보안을 보장할 수 없습니다.",
      },
      children: {
        title: "8. 아동의 개인정보(COPPA 대응)",
        content: "본 앱은 13세 미만 아동을 대상으로 하지 않으며, 의도적으로 13세 미만 아동의 개인정보를 수집하지 않습니다.",
        action: "13세 미만 아동이 본 앱을 이용하고 있는 것이 확인된 경우, 관련 정보를 신속히 삭제하기 위한 합리적인 조치를 취합니다. 자녀가 본 앱을 이용하고 있음을 알고 계신 보호자께서는 아래 연락처로 문의해 주세요.",
      },
      userRights: {
        title: "9. 사용자의 권리",
        japan: {
          title: "9-1. 일본 국내 사용자",
          items: [
            "보유 개인정보의 공개 청구",
            "내용의 정정, 추가, 삭제 청구",
            "이용 정지 및 소거 청구",
          ],
        },
        gdpr: {
          title: "9-2. EEA/UK 사용자(GDPR)",
          items: [
            "접근권: 보유 개인 데이터에 대한 접근",
            "정정권: 부정확한 개인 데이터의 정정",
            "삭제권(잊힐 권리): 개인 데이터의 삭제",
            "처리 제한권: 개인 데이터 처리의 제한",
            "데이터 이동권: 데이터의 수령 및 이전",
            "이의 제기권: 개인 데이터 처리에 대한 이의",
          ],
        },
        ccpa: {
          title: "9-3. 캘리포니아주 사용자(CCPA)",
          items: [
            "수집하는 개인정보의 카테고리와 목적의 공개 청구",
            "개인정보의 삭제 청구",
            "개인정보 판매 옵트아웃(당사는 개인정보를 판매하지 않습니다)",
          ],
        },
        howTo: {
          title: "권리 행사 방법",
          content: "본 앱의 로컬 저장 데이터는 앱 삭제를 통해 삭제할 수 있습니다. 기타 권리 행사에 대해서는 아래 연락처로 문의해 주세요.",
        },
      },
      cookies: {
        title: "10. 쿠키 및 트래킹 기술",
        content: "본 앱은 웹 브라우저에서 작동하는 것이 아니므로 쿠키를 사용하지 않습니다.",
        revenueCat: "RevenueCat SDK는 익명 사용자 ID를 사용하지만, 광고 목적의 크로스 앱 트래킹은 수행하지 않습니다.",
        att: "Apple의 App Tracking Transparency(ATT) 프레임워크가 요구하는 광고 목적의 트래킹은 실시하지 않으므로 ATT 프롬프트는 표시되지 않습니다.",
      },
      internationalTransfer: {
        title: "11. 국제 데이터 전송",
        content: "본 앱이 이용하는 제3자 서비스의 서버는 주로 미국에 소재합니다. 한국에서 데이터를 전송하는 경우, 해당 데이터는 국외로 전송됩니다.",
        note: "각 제3자 서비스는 적절한 데이터 보호 조치(표준 계약 조항 등)를 시행하고 있습니다. 자세한 내용은 각 회사의 개인정보 처리방침을 참조해 주세요.",
      },
      changes: {
        title: "12. 개인정보 처리방침의 변경",
        content: '당사는 본 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경이 발생한 경우, 앱 내 알림 또는 본 페이지 상단의 "최종 업데이트" 갱신을 통해 알려드립니다.',
        consent: "변경 후에도 본 앱을 계속 이용하시면 업데이트된 개인정보 처리방침에 동의한 것으로 간주됩니다.",
      },
      contact: {
        title: "13. 문의하기",
        content: "본 개인정보 처리방침에 관한 질문이나 권리 행사 신청은 아래로 문의해 주세요:",
        email: "이메일 주소",
        responseTime: "문의일로부터 원칙적으로 30일 이내에 답변드립니다.",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label 대응표",
        description: "App Store의 App Privacy 섹션을 위한 공개 정보입니다.",
        tableHeaders: ["데이터 종류", "수집 여부", "추적 여부", "이용 목적"],
        rows: [
          ["음성 데이터", "○(처리 시에만)", "×", "App Functionality(스피킹 평가)"],
          ["식별자(익명 ID)", "○", "×", "App Functionality(구독 관리)"],
          ["구매 정보", "○", "×", "App Functionality(구독 관리)"],
          ["이용 현황 데이터", "○(기기 내부만)", "×", "App Functionality(학습 진행 상황)"],
          ["이름, 연락처, 위치 정보 등", "×", "×", "—"],
        ],
        trackingNote: "\"추적\" = 제3자의 광고 및 분석 목적으로의 데이터 이용. 본 앱은 어떤 데이터도 광고 목적으로 추적하지 않습니다.",
        languageNote: "본 개인정보 처리방침은 일본어를 원문으로 합니다. 한국어판은 참고 번역입니다.",
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
        content: 'Flash English ("the App") is an English learning app that supports language study through flashcards, quizzes, and freestyle speaking. This Privacy Policy explains the types of information collected when you use the App, the purposes of use, management methods, and disclosure to third parties.',
        consent: "By using the App, you consent to the practices described in this Privacy Policy. If you do not agree, please refrain from using the App.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        userProvided: {
          title: "2-1. Information Provided by Users",
          audio: {
            title: "(a) Voice Data",
            items: [
              "Audio recorded by users during Freestyle Quiz",
              "Recordings are used solely for speaking evaluation (transcription and content assessment) and are not stored on our servers after processing",
              "Collection timing: During Freestyle Quiz recording",
              "Destination: Sent to OpenAI API via Supabase (see Section 4 for details)",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Automatically Collected Information",
          subscription: {
            title: "(a) Subscription & Billing Information",
            items: [
              "Your subscription plan (Free / Premium)",
              "Apple App Store purchase receipt information (payment details are managed by Apple; we do not obtain card numbers, etc.)",
            ],
          },
          appUsage: {
            title: "(b) App Usage Data (Device Only)",
            items: [
              "Flashcard and quiz learning progress",
              "My Phrases (saved phrases and words)",
              "Earned badge information",
              "Free plan usage count",
              "App settings (language, theme, etc.)",
            ],
          },
        },
        notCollected: {
          title: "2-3. Information We Do Not Collect",
          intro: "The App does not collect the following information:",
          items: [
            "Personally identifiable information such as name, email address, or physical address (no account registration required)",
            "Location data",
            "Contacts",
            "Health & fitness data",
            "Tracking data for advertising purposes",
          ],
        },
      },
      purpose: {
        title: "3. Purpose of Information Use",
        intro: "Collected information is used only for the following purposes:",
        tableHeaders: ["Type of Information", "Purpose of Use"],
        rows: [
          ["Voice Data", "AI speaking evaluation (transcription, content analysis, feedback)"],
          ["Subscription Information", "Providing plan-based features, verifying active subscriptions"],
          ["Usage Data (Local)", "Displaying learning progress, My Phrases management, badge management"],
        ],
      },
      thirdParty: {
        title: "4. Information Sharing with Third-Party Services",
        intro: "The App uses the following third-party services to provide its functionality. Data is sent to each service only when the relevant feature is used.",
        providers: [
          {
            name: "4-1. Supabase (Data Relay)",
            plan: "Applicable: When using Freestyle Quiz feature",
            data: "Data sent: Recorded voice data",
            purpose: "Purpose: Secure relay processing of voice data to OpenAI API",
            retention: "Data retention: Voice data is used only for relay processing and is not stored permanently",
            policyLabel: "Privacy Policy",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API (Speaking Evaluation)",
            plan: "Applicable: When using Freestyle Quiz feature",
            data: "Data sent: Recorded voice data",
            purpose: "Purpose: Voice transcription, speaking content evaluation, and feedback generation",
            retention: "Data retention: Not stored on our servers after processing. Subject to OpenAI's data retention policy",
            policyLabel: "Privacy Policy",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat (Subscription Management)",
            plan: "Applicable: All users (Premium subscription management)",
            data: "Data sent: Anonymous user ID, Apple App Store purchase receipt",
            purpose: "Purpose: Subscription status verification and management",
            retention: "",
            policyLabel: "Privacy Policy",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "Important: We never sell, share, or provide user personal information to any third parties other than those listed above (advertising networks, data brokers, etc.).",
      },
      retention: {
        title: "5. Data Storage and Retention Period",
        local: {
          title: "On Device (Local Storage)",
          intro: "The following data is stored only on the user's device and is not transmitted to our servers:",
          items: [
            "Flashcard and quiz learning progress",
            "My Phrases (saved phrases and words)",
            "Earned badge information",
            "App settings (language, theme, etc.)",
            "Free plan usage count",
          ],
          deletion: "This data is deleted when the app is uninstalled. Since there is no cloud synchronization, data cannot be restored upon reinstallation.",
        },
        server: {
          title: "Our Servers",
          content: "The App does not require user accounts, and voice data is not stored on our servers after speaking evaluation processing. All user data is stored only on the device.",
        },
        thirdParty: {
          title: "Third-Party Services",
          content: "For each third-party service's data retention policy, please refer to their respective privacy policies.",
        },
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following device permissions:",
        items: [
          {
            name: "Microphone",
            detail: "Used to record audio during speaking practice in Freestyle Quiz.",
          },
          {
            name: "Speech Recognition",
            detail: "Used to convert recorded audio to text.",
          },
        ],
      },
      security: {
        title: "7. Data Security",
        items: [
          "Encrypted communication: All data transmission is encrypted via HTTPS/TLS",
          "Principle of least privilege: Only the minimum data necessary for speaking evaluation processing is transmitted",
          "Local storage priority: All learning data is stored on the device, minimizing data transmission to the cloud",
        ],
        disclaimer: "However, data transfer over the Internet carries inherent risks, and complete security cannot be guaranteed.",
      },
      children: {
        title: "8. Children's Privacy (COPPA Compliance)",
        content: "The App is not intended for children under 13 years of age, and we do not intentionally collect personal information from children under 13.",
        action: "If we become aware that a child under 13 is using the App, we will take reasonable steps to promptly delete any related information. If you are a parent or guardian and know that your child is using the App, please contact us at the address below.",
      },
      userRights: {
        title: "9. User Rights",
        japan: {
          title: "9-1. Users in Japan",
          items: [
            "Request for disclosure of held personal information",
            "Request for correction, addition, or deletion of content",
            "Request for suspension or erasure of use",
          ],
        },
        gdpr: {
          title: "9-2. EEA/UK Users (GDPR)",
          items: [
            "Right of access: Access to held personal data",
            "Right to rectification: Correction of inaccurate personal data",
            "Right to erasure (right to be forgotten): Deletion of personal data",
            "Right to restriction of processing: Restriction of personal data processing",
            "Right to data portability: Receipt and transfer of data",
            "Right to object: Objection to personal data processing",
          ],
        },
        ccpa: {
          title: "9-3. California Users (CCPA)",
          items: [
            "Request for disclosure of categories and purposes of collected personal information",
            "Request for deletion of personal information",
            "Opt-out of sale of personal information (we do not sell personal information)",
          ],
        },
        howTo: {
          title: "How to Exercise Your Rights",
          content: "Locally stored data can be deleted by uninstalling the app. For other rights, please contact us at the address below.",
        },
      },
      cookies: {
        title: "10. Cookies and Tracking Technologies",
        content: "The App does not operate in a web browser and therefore does not use cookies.",
        revenueCat: "The RevenueCat SDK uses anonymous user IDs but does not perform cross-app tracking for advertising purposes.",
        att: "Since the App does not engage in advertising-purpose tracking required by Apple's App Tracking Transparency (ATT) framework, no ATT prompt is displayed.",
      },
      internationalTransfer: {
        title: "11. International Data Transfers",
        content: "The servers of the third-party services used by the App are primarily located in the United States. When sending data from outside the US, that data is transferred internationally.",
        note: "Each third-party service implements appropriate data protection measures (such as Standard Contractual Clauses). For details, please refer to each company's privacy policy.",
      },
      changes: {
        title: "12. Changes to This Privacy Policy",
        content: 'We may update this Privacy Policy from time to time. If significant changes occur, we will notify you through in-app notifications or by updating the "Last Updated" date at the top of this page.',
        consent: "If you continue to use the App after changes are made, you are deemed to have consented to the updated Privacy Policy.",
      },
      contact: {
        title: "13. Contact Us",
        content: "For questions about this Privacy Policy or to exercise your rights, please contact us at:",
        email: "Email",
        responseTime: "We will respond within 30 days of receiving your inquiry.",
      },
      appStoreLabel: {
        title: "App Store Privacy Nutrition Label",
        description: "Disclosure information for the App Store's App Privacy section.",
        tableHeaders: ["Data Type", "Collected", "Tracked", "Purpose"],
        rows: [
          ["Voice Data", "Yes (processing only)", "No", "App Functionality (Speaking Evaluation)"],
          ["Identifiers (Anonymous ID)", "Yes", "No", "App Functionality (Subscription Management)"],
          ["Purchase Information", "Yes", "No", "App Functionality (Subscription Management)"],
          ["Usage Data", "Yes (device only)", "No", "App Functionality (Learning Progress)"],
          ["Name, Contact, Location, etc.", "No", "No", "—"],
        ],
        trackingNote: '"Tracked" = Use of data for third-party advertising or analytics purposes. This App does not track any data for advertising purposes.',
        languageNote: "The Japanese version of this Privacy Policy is the authoritative text. Other language versions are provided for reference only.",
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

function PermissionCard({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400 mb-3">
      <p className="font-medium text-blue-800">{name}</p>
      <p className="text-blue-700 text-sm mt-1">{detail}</p>
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function FlashEnglishPrivacyPolicyPage() {
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
    s.permissions.title,
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
              alt="Flash English"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Flash English</h1>
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
            href="/support/flash-english"
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
            </SubSection>

            {/* 2-2 */}
            <SubSection title={s.dataCollection.autoCollected.title}>
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

          {/* 6. アプリが使用する権限 */}
          <Section title={s.permissions.title}>
            <p className="text-gray-700 mb-4">{s.permissions.intro}</p>
            {s.permissions.items.map((item, i) => (
              <PermissionCard key={i} name={item.name} detail={item.detail} />
            ))}
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
              <BulletList items={s.userRights.japan.items} />
            </SubSection>
            <SubSection title={s.userRights.gdpr.title}>
              <BulletList items={s.userRights.gdpr.items} />
            </SubSection>
            <SubSection title={s.userRights.ccpa.title}>
              <BulletList items={s.userRights.ccpa.items} />
            </SubSection>
            <SubSection title={s.userRights.howTo.title}>
              <p className="text-gray-700 leading-relaxed">{s.userRights.howTo.content}</p>
            </SubSection>
          </Section>

          {/* 10. Cookie */}
          <Section title={s.cookies.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.cookies.content}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{s.cookies.revenueCat}</p>
            <p className="text-gray-700 leading-relaxed">{s.cookies.att}</p>
          </Section>

          {/* 11. 国際データ転送 */}
          <Section title={s.internationalTransfer.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.internationalTransfer.content}</p>
            <NoteBox>{s.internationalTransfer.note}</NoteBox>
          </Section>

          {/* 12. プライバシーポリシーの変更 */}
          <Section title={s.changes.title}>
            <p className="text-gray-700 leading-relaxed mb-3">{s.changes.content}</p>
            <p className="text-gray-700 leading-relaxed">{s.changes.consent}</p>
          </Section>

          {/* 13. お問い合わせ */}
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
