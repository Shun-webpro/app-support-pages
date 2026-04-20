"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/wordcards.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年4月20日";
const LAST_UPDATED_KO = "2026년 4월 20일";
const LAST_UPDATED_EN = "April 20, 2026";

// ========================================
// 言語定義
// ========================================
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
        wordData: {
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
        content: "WordCards（以下「本アプリ」）は、自分だけの単語帳を作成し、クイズや復習機能で語学学習をサポートするアプリです。本プライバシーポリシーは、本アプリをご利用いただく際に収集する情報の種類、利用目的、管理方法、および第三者への提供について説明します。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに記載された内容に同意したものとみなします。同意いただけない場合は、本アプリのご利用をお控えください。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        userProvided: {
          title: "2-1. ユーザーが提供する情報",
          wordData: {
            title: "(a) AI入力リクエストデータ",
            items: [
              "ユーザーが入力した単語テキスト",
              "単語データ生成（意味・例文・発音記号・関連語・語源）のためにのみ使用されます",
              "収集タイミング: カード追加画面でAI入力ボタンをタップしたとき",
              "送信先: Supabase を経由して OpenAI API に送信されます（詳細は第4条参照）",
              "Premiumプランの場合、学習用イラスト生成のためにも使用されます",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 自動的に収集される情報",
          subscription: {
            title: "(a) 購読・課金情報",
            items: [
              "ご利用のサブスクリプションプラン（Free / Pro / Premium）",
              "Apple App Store による購入レシート情報（決済情報はAppleが管理し、当社はカード番号等を取得しません）",
            ],
          },
          appUsage: {
            title: "(b) アプリ利用データ（端末内のみ）",
            items: [
              "作成したデッキ（単語帳）および単語カードのデータ",
              "クイズの学習進捗・正解率",
              "間隔反復法による復習スケジュール",
              "無料プランのAI利用回数カウント",
              "アプリ設定（言語、テーマ、TTS音声設定等）",
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
          ["AI入力リクエストデータ（単語テキスト）", "AIによる単語情報・イラストの自動生成"],
          ["購読情報", "プラン別機能の提供、有効な購読の確認"],
          ["利用データ（ローカル）", "デッキ・カード管理、学習進捗の表示、復習スケジュール管理"],
        ],
      },
      thirdParty: {
        title: "4. 第三者サービスへの情報提供",
        intro: "本アプリは、サービス提供のために以下の第三者サービスを利用します。各サービスへのデータ送信は、機能利用時にのみ発生します。",
        providers: [
          {
            name: "4-1. Supabase（データ中継）",
            plan: "対象: AI入力機能（Pro / Premium）利用時",
            data: "送信するデータ: ユーザーが入力した単語テキスト",
            purpose: "利用目的: OpenAI API への単語データのリクエスト中継処理",
            retention: "データ保持: リクエストデータは中継処理のみに使用され、永続的に保存されません",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API（単語情報・イラスト生成）",
            plan: "対象: AI入力機能（Pro / Premium）利用時",
            data: "送信するデータ: ユーザーが入力した単語テキスト",
            purpose: "利用目的: 単語の意味・例文・発音記号・関連語・語源の生成、学習用イラストの生成（Premiumのみ）",
            retention: "データ保持: 処理後に当社サーバーには保存されません。OpenAI のデータ保持ポリシーに従います",
            policyLabel: "プライバシーポリシー",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat（購読管理）",
            plan: "対象: 全ユーザー（Pro / Premium の購読管理）",
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
            "作成したデッキ（単語帳）および単語カードのデータ",
            "クイズの学習進捗・正解率",
            "間隔反復法による復習スケジュール",
            "アプリ設定（言語、テーマ、TTS音声設定等）",
            "無料プランのAI利用回数カウント",
          ],
          deletion: "これらのデータは、アプリをアンインストールすることで削除されます。クラウド同期は行われないため、再インストール時にデータは復元されません。",
        },
        server: {
          title: "当社サーバー",
          content: "本アプリはユーザーアカウントを必要とせず、AI生成処理後のリクエストデータを当社のサーバーに保存しません。すべてのユーザーデータは端末内にのみ保存されます。",
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
            name: "フォトライブラリ",
            detail: "単語カードに画像を追加する際、ライブラリから画像を選択するために使用します。",
          },
          {
            name: "カメラ",
            detail: "単語カードに画像を追加する際、カメラで写真を撮るために使用します。",
          },
        ],
      },
      security: {
        title: "7. データのセキュリティ",
        items: [
          "通信の暗号化: すべてのデータ通信は HTTPS/TLS により暗号化されます",
          "最小権限原則: AI生成処理に必要な最小限のデータのみを送信します",
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
          ["単語テキスト（AI入力時）", "○（処理時のみ）", "×", "App Functionality（AI単語生成）"],
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
        content: "WordCards(이하 \"본 앱\")는 나만의 단어장을 만들고, 퀴즈와 복습 기능으로 언어 학습을 지원하는 앱입니다. 본 개인정보 처리방침은 본 앱 이용 시 수집하는 정보의 종류, 이용 목적, 관리 방법 및 제3자 제공에 대해 설명합니다.",
        consent: "본 앱을 이용하시면 본 개인정보 처리방침에 동의한 것으로 간주됩니다. 동의하지 않으시면 본 앱의 이용을 삼가해 주세요.",
      },
      dataCollection: {
        title: "2. 수집하는 정보",
        userProvided: {
          title: "2-1. 사용자가 제공하는 정보",
          wordData: {
            title: "(a) AI 입력 요청 데이터",
            items: [
              "사용자가 입력한 단어 텍스트",
              "단어 데이터 생성(의미, 예문, 발음 기호, 관련어, 어원)에만 사용됩니다",
              "수집 시점: 카드 추가 화면에서 AI 입력 버튼을 탭했을 때",
              "전송 대상: Supabase를 경유하여 OpenAI API로 전송됩니다(자세한 내용은 제4조 참조)",
              "Premium 플랜의 경우, 학습용 일러스트 생성에도 사용됩니다",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 자동으로 수집되는 정보",
          subscription: {
            title: "(a) 구독 및 결제 정보",
            items: [
              "이용 중인 구독 플랜(Free / Pro / Premium)",
              "Apple App Store 구매 영수증 정보(결제 정보는 Apple이 관리하며, 당사는 카드 번호 등을 취득하지 않습니다)",
            ],
          },
          appUsage: {
            title: "(b) 앱 이용 데이터(기기 내부만)",
            items: [
              "만든 덱(단어장) 및 단어 카드 데이터",
              "퀴즈 학습 진행 상황 및 정답률",
              "간격 반복법에 의한 복습 일정",
              "무료 플랜의 AI 이용 횟수 카운트",
              "앱 설정(언어, 테마, TTS 음성 설정 등)",
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
          ["AI 입력 요청 데이터(단어 텍스트)", "AI에 의한 단어 정보 및 일러스트 자동 생성"],
          ["구독 정보", "플랜별 기능 제공, 유효한 구독 확인"],
          ["이용 데이터(로컬)", "덱・카드 관리, 학습 진행 상황 표시, 복습 일정 관리"],
        ],
      },
      thirdParty: {
        title: "4. 제3자 서비스에 대한 정보 제공",
        intro: "본 앱은 서비스 제공을 위해 다음 제3자 서비스를 이용합니다. 각 서비스로의 데이터 전송은 기능 이용 시에만 발생합니다.",
        providers: [
          {
            name: "4-1. Supabase(데이터 중계)",
            plan: "대상: AI 입력 기능(Pro / Premium) 이용 시",
            data: "전송 데이터: 사용자가 입력한 단어 텍스트",
            purpose: "이용 목적: OpenAI API로의 단어 데이터 요청 중계 처리",
            retention: "데이터 보관: 요청 데이터는 중계 처리에만 사용되며, 영구적으로 저장되지 않습니다",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API(단어 정보・일러스트 생성)",
            plan: "대상: AI 입력 기능(Pro / Premium) 이용 시",
            data: "전송 데이터: 사용자가 입력한 단어 텍스트",
            purpose: "이용 목적: 단어 의미・예문・발음 기호・관련어・어원 생성, 학습용 일러스트 생성(Premium만)",
            retention: "데이터 보관: 처리 후 당사 서버에 저장되지 않습니다. OpenAI의 데이터 보관 정책을 따릅니다",
            policyLabel: "개인정보 처리방침",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat(구독 관리)",
            plan: "대상: 전체 사용자(Pro / Premium 구독 관리)",
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
            "만든 덱(단어장) 및 단어 카드 데이터",
            "퀴즈 학습 진행 상황 및 정답률",
            "간격 반복법에 의한 복습 일정",
            "앱 설정(언어, 테마, TTS 음성 설정 등)",
            "무료 플랜의 AI 이용 횟수 카운트",
          ],
          deletion: "이러한 데이터는 앱을 삭제하면 삭제됩니다. 클라우드 동기화가 이루어지지 않으므로 재설치 시 데이터가 복원되지 않습니다.",
        },
        server: {
          title: "당사 서버",
          content: "본 앱은 사용자 계정이 필요하지 않으며, AI 생성 처리 후 요청 데이터를 당사 서버에 저장하지 않습니다. 모든 사용자 데이터는 기기 내에만 저장됩니다.",
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
            name: "사진 라이브러리",
            detail: "단어 카드에 이미지를 추가할 때 라이브러리에서 이미지를 선택하는 데 사용됩니다.",
          },
          {
            name: "카메라",
            detail: "단어 카드에 이미지를 추가할 때 카메라로 사진을 찍는 데 사용됩니다.",
          },
        ],
      },
      security: {
        title: "7. 데이터 보안",
        items: [
          "통신 암호화: 모든 데이터 통신은 HTTPS/TLS로 암호화됩니다",
          "최소 권한 원칙: AI 생성 처리에 필요한 최소한의 데이터만 전송합니다",
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
        content: "당사는 본 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경이 발생한 경우, 앱 내 알림 또는 본 페이지 상단의 \"최종 업데이트\" 갱신을 통해 알려드립니다.",
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
          ["단어 텍스트(AI 입력 시)", "○(처리 시에만)", "×", "App Functionality(AI 단어 생성)"],
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
        content: "WordCards (\"the App\") is a language learning app that lets you create your own flashcard decks and study with quizzes and spaced repetition review. This Privacy Policy explains the types of information collected when you use the App, the purposes of use, management methods, and disclosure to third parties.",
        consent: "By using the App, you consent to the practices described in this Privacy Policy. If you do not agree, please refrain from using the App.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        userProvided: {
          title: "2-1. Information Provided by Users",
          wordData: {
            title: "(a) AI Fill Request Data",
            items: [
              "Word text entered by the user",
              "Used solely for generating word data (meaning, examples, phonetics, related words, etymology)",
              "Collection timing: When the AI Fill button is tapped on the add card screen",
              "Destination: Sent to OpenAI API via Supabase (see Section 4 for details)",
              "For Premium plan users, also used for generating learning illustrations",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Automatically Collected Information",
          subscription: {
            title: "(a) Subscription & Billing Information",
            items: [
              "Your subscription plan (Free / Pro / Premium)",
              "Apple App Store purchase receipt information (payment details are managed by Apple; we do not obtain card numbers, etc.)",
            ],
          },
          appUsage: {
            title: "(b) App Usage Data (Device Only)",
            items: [
              "Created deck and word card data",
              "Quiz learning progress and accuracy",
              "Spaced repetition review schedule",
              "Free plan AI usage count",
              "App settings (language, theme, TTS voice settings, etc.)",
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
          ["AI Fill Request Data (word text)", "AI-powered automatic generation of word information and illustrations"],
          ["Subscription Information", "Providing plan-based features, verifying active subscriptions"],
          ["Usage Data (Local)", "Deck & card management, learning progress display, review schedule management"],
        ],
      },
      thirdParty: {
        title: "4. Information Sharing with Third-Party Services",
        intro: "The App uses the following third-party services to provide its functionality. Data is sent to each service only when the relevant feature is used.",
        providers: [
          {
            name: "4-1. Supabase (Data Relay)",
            plan: "Applicable: When using AI Fill feature (Pro / Premium)",
            data: "Data sent: Word text entered by the user",
            purpose: "Purpose: Secure relay of word data requests to OpenAI API",
            retention: "Data retention: Request data is used only for relay processing and is not stored permanently",
            policyLabel: "Privacy Policy",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API (Word Info & Illustration Generation)",
            plan: "Applicable: When using AI Fill feature (Pro / Premium)",
            data: "Data sent: Word text entered by the user",
            purpose: "Purpose: Generating word meaning, examples, phonetics, related words, etymology, and learning illustrations (Premium only)",
            retention: "Data retention: Not stored on our servers after processing. Subject to OpenAI's data retention policy",
            policyLabel: "Privacy Policy",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat (Subscription Management)",
            plan: "Applicable: All users (Pro / Premium subscription management)",
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
            "Created deck and word card data",
            "Quiz learning progress and accuracy",
            "Spaced repetition review schedule",
            "App settings (language, theme, TTS voice settings, etc.)",
            "Free plan AI usage count",
          ],
          deletion: "This data is deleted when the app is uninstalled. Since there is no cloud synchronization, data cannot be restored upon reinstallation.",
        },
        server: {
          title: "Our Servers",
          content: "The App does not require user accounts, and request data is not stored on our servers after AI generation processing. All user data is stored only on the device.",
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
            name: "Photo Library",
            detail: "Used to select images from the library when adding images to word cards.",
          },
          {
            name: "Camera",
            detail: "Used to take photos with the camera when adding images to word cards.",
          },
        ],
      },
      security: {
        title: "7. Data Security",
        items: [
          "Encrypted communication: All data transmission is encrypted via HTTPS/TLS",
          "Principle of least privilege: Only the minimum data necessary for AI generation processing is transmitted",
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
        content: "We may update this Privacy Policy from time to time. If significant changes occur, we will notify you through in-app notifications or by updating the \"Last Updated\" date at the top of this page.",
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
          ["Word Text (AI Fill)", "Yes (processing only)", "No", "App Functionality (AI Word Generation)"],
          ["Identifiers (Anonymous ID)", "Yes", "No", "App Functionality (Subscription Management)"],
          ["Purchase Information", "Yes", "No", "App Functionality (Subscription Management)"],
          ["Usage Data", "Yes (device only)", "No", "App Functionality (Learning Progress)"],
          ["Name, Contact, Location, etc.", "No", "No", "—"],
        ],
        trackingNote: "\"Tracked\" = Use of data for third-party advertising or analytics purposes. This App does not track any data for advertising purposes.",
        languageNote: "The Japanese version of this Privacy Policy is the authoritative text. Other language versions are provided for reference only.",
      },
    },
  },
  "zh-TW": {
    title: "隱私權政策",
    lastUpdated: "最後更新日期",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "返回支援頁面",
    tableOfContents: "目錄",
    sections: {
      intro: {
        title: "1. 簡介",
        content: "WordCards（以下簡稱「本應用程式」）是一款讓您建立個人單字本、透過測驗及複習功能輔助語言學習的應用程式。本隱私權政策說明使用本應用程式時所收集的資訊種類、使用目的、管理方式及提供給第三方的情形。",
        consent: "使用本應用程式即表示您同意本隱私權政策所述內容。若不同意，請勿使用本應用程式。",
      },
      dataCollection: {
        title: "2. 收集的資訊",
        userProvided: {
          title: "2-1. 使用者提供的資訊",
          wordData: {
            title: "(a) AI 填入請求資料",
            items: [
              "使用者輸入的單字文字",
              "僅用於生成單字資料（意思、例句、音標、相關詞、字源）",
              "收集時機：在新增卡片畫面點選 AI 填入按鈕時",
              "傳送目標：透過 Supabase 傳送至 OpenAI API（詳情請見第 4 條）",
              "Premium 方案使用者亦可用於生成學習插圖",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 自動收集的資訊",
          subscription: {
            title: "(a) 訂閱及付款資訊",
            items: [
              "您使用的訂閱方案（Free / Pro / Premium）",
              "Apple App Store 購買收據資訊（付款資訊由 Apple 管理，本公司不取得信用卡號等）",
            ],
          },
          appUsage: {
            title: "(b) 應用程式使用資料（僅限裝置內）",
            items: [
              "建立的牌組（單字本）及單字卡資料",
              "測驗學習進度及正確率",
              "間隔重複法複習排程",
              "免費方案 AI 使用次數計數",
              "應用程式設定（語言、主題、TTS 語音設定等）",
            ],
          },
        },
        notCollected: {
          title: "2-3. 不收集的資訊",
          intro: "本應用程式不收集以下資訊：",
          items: [
            "姓名、電子郵件地址、住址等個人識別資訊（無需註冊帳號）",
            "位置資訊",
            "聯絡人",
            "健康及健身資料",
            "廣告目的的追蹤資料",
          ],
        },
      },
      purpose: {
        title: "3. 資訊使用目的",
        intro: "收集的資訊僅用於以下目的：",
        tableHeaders: ["資訊種類", "使用目的"],
        rows: [
          ["AI 填入請求資料（單字文字）", "AI 自動生成單字資訊及插圖"],
          ["訂閱資訊", "提供方案功能、確認有效訂閱"],
          ["使用資料（本機）", "牌組・卡片管理、學習進度顯示、複習排程管理"],
        ],
      },
      thirdParty: {
        title: "4. 向第三方服務提供資訊",
        intro: "本應用程式為提供服務而使用以下第三方服務。資料僅在使用相關功能時傳送至各服務。",
        providers: [
          {
            name: "4-1. Supabase（資料中繼）",
            plan: "適用：使用 AI 填入功能（Pro / Premium）時",
            data: "傳送資料：使用者輸入的單字文字",
            purpose: "使用目的：安全中繼單字資料請求至 OpenAI API",
            retention: "資料保留：請求資料僅用於中繼處理，不永久儲存",
            policyLabel: "隱私權政策",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API（單字資訊・插圖生成）",
            plan: "適用：使用 AI 填入功能（Pro / Premium）時",
            data: "傳送資料：使用者輸入的單字文字",
            purpose: "使用目的：生成單字意思、例句、音標、相關詞、字源及學習插圖（僅限 Premium）",
            retention: "資料保留：處理後不儲存於本公司伺服器，遵循 OpenAI 的資料保留政策",
            policyLabel: "隱私權政策",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat（訂閱管理）",
            plan: "適用：所有使用者（Pro / Premium 訂閱管理）",
            data: "傳送資料：匿名使用者 ID、Apple App Store 購買收據",
            purpose: "使用目的：確認及管理訂閱狀態",
            retention: "",
            policyLabel: "隱私權政策",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "重要：本公司絕不向上述以外的第三方（廣告網路、資料仲介等）出售、共享或提供使用者個人資訊。",
      },
      retention: {
        title: "5. 資料儲存及保留期間",
        local: {
          title: "裝置內（本機儲存）",
          intro: "以下資料僅儲存於使用者裝置內，不傳送至本公司伺服器：",
          items: [
            "建立的牌組（單字本）及單字卡資料",
            "測驗學習進度及正確率",
            "間隔重複法複習排程",
            "應用程式設定（語言、主題、TTS 語音設定等）",
            "免費方案 AI 使用次數計數",
          ],
          deletion: "這些資料將在解除安裝應用程式時刪除。由於不進行雲端同步，重新安裝時資料無法還原。",
        },
        server: {
          title: "本公司伺服器",
          content: "本應用程式不需要使用者帳號，AI 生成處理後的請求資料不會儲存於本公司伺服器。所有使用者資料僅儲存於裝置內。",
        },
        thirdParty: {
          title: "第三方服務",
          content: "各第三方服務的資料保留政策，請參閱各公司的隱私權政策。",
        },
      },
      permissions: {
        title: "6. 應用程式使用的權限",
        intro: "本應用程式使用以下裝置權限：",
        items: [
          {
            name: "照片圖庫",
            detail: "在新增單字卡片圖片時，用於從圖庫選擇圖片。",
          },
          {
            name: "相機",
            detail: "在新增單字卡片圖片時，用於使用相機拍照。",
          },
        ],
      },
      security: {
        title: "7. 資料安全",
        items: [
          "通訊加密：所有資料通訊均透過 HTTPS/TLS 加密",
          "最小權限原則：僅傳送 AI 生成處理所需的最少資料",
          "優先本機儲存：所有學習資料均儲存於裝置內，最小化資料傳輸至雲端",
        ],
        disclaimer: "但透過網際網路的資料傳輸存在固有風險，無法保證完全的安全性。",
      },
      children: {
        title: "8. 兒童隱私（COPPA 合規）",
        content: "本應用程式不針對 13 歲以下兒童，不會故意收集 13 歲以下兒童的個人資訊。",
        action: "若發現 13 歲以下兒童正在使用本應用程式，本公司將採取合理措施迅速刪除相關資訊。若您知道您的孩子正在使用本應用程式，請透過以下聯絡方式與我們聯繫。",
      },
      userRights: {
        title: "9. 使用者權利",
        japan: {
          title: "9-1. 日本境內使用者",
          items: [
            "要求揭露所保有的個人資訊",
            "要求更正、新增或刪除內容",
            "要求停止使用或消除",
          ],
        },
        gdpr: {
          title: "9-2. EEA/UK 使用者（GDPR）",
          items: [
            "存取權：存取所保有的個人資料",
            "更正權：更正不正確的個人資料",
            "刪除權（被遺忘權）：刪除個人資料",
            "限制處理權：限制個人資料處理",
            "資料可攜權：接收及傳輸資料",
            "異議權：對個人資料處理提出異議",
          ],
        },
        ccpa: {
          title: "9-3. 加州使用者（CCPA）",
          items: [
            "要求揭露收集的個人資訊類別及目的",
            "要求刪除個人資訊",
            "選擇退出個人資訊出售（本公司不出售個人資訊）",
          ],
        },
        howTo: {
          title: "行使權利的方式",
          content: "本機儲存的資料可透過解除安裝應用程式刪除。其他權利行使請透過以下聯絡方式與我們聯繫。",
        },
      },
      cookies: {
        title: "10. Cookie 及追蹤技術",
        content: "本應用程式非在網頁瀏覽器上運作，因此不使用 Cookie。",
        revenueCat: "RevenueCat SDK 使用匿名使用者 ID，但不進行廣告目的的跨應用程式追蹤。",
        att: "由於本應用程式不進行 Apple App Tracking Transparency（ATT）框架所要求的廣告目的追蹤，因此不會顯示 ATT 提示。",
      },
      internationalTransfer: {
        title: "11. 國際資料傳輸",
        content: "本應用程式使用的第三方服務伺服器主要位於美國。從其他國家傳送資料時，該資料將跨國傳輸。",
        note: "各第三方服務均採取適當的資料保護措施（如標準合約條款）。詳情請參閱各公司的隱私權政策。",
      },
      changes: {
        title: "12. 隱私權政策的變更",
        content: "本公司可能隨時更新本隱私權政策。若發生重大變更，將透過應用程式內通知或更新本頁頂部的「最後更新日期」告知您。",
        consent: "變更後繼續使用本應用程式，即視為同意更新後的隱私權政策。",
      },
      contact: {
        title: "13. 聯絡我們",
        content: "如對本隱私權政策有任何疑問或需行使相關權利，請透過以下方式聯絡：",
        email: "電子郵件",
        responseTime: "我們原則上將於收到詢問後 30 天內回覆。",
      },
      appStoreLabel: {
        title: "App Store 隱私標籤對應表",
        description: "以下為 App Store App Privacy 區塊的揭露資訊。",
        tableHeaders: ["資料種類", "是否收集", "是否追蹤", "使用目的"],
        rows: [
          ["單字文字（AI 填入時）", "○（僅處理時）", "×", "App Functionality（AI 單字生成）"],
          ["識別碼（匿名 ID）", "○", "×", "App Functionality（訂閱管理）"],
          ["購買資訊", "○", "×", "App Functionality（訂閱管理）"],
          ["使用狀況資料", "○（僅裝置內）", "×", "App Functionality（學習進度）"],
          ["姓名、聯絡方式、位置資訊等", "×", "×", "—"],
        ],
        trackingNote: "「追蹤」= 為第三方廣告或分析目的使用資料。本應用程式不為廣告目的追蹤任何資料。",
        languageNote: "本隱私權政策以日文版為正文，其他語言版本僅供參考。",
      },
    },
  },
  zh: {
    title: "隐私政策",
    lastUpdated: "最后更新日期",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "返回支持页面",
    tableOfContents: "目录",
    sections: {
      intro: {
        title: "1. 简介",
        content: "WordCards（以下简称「本应用」）是一款让您创建个人单词本、通过测验及复习功能辅助语言学习的应用。本隐私政策说明使用本应用时所收集的信息种类、使用目的、管理方式及提供给第三方的情形。",
        consent: "使用本应用即表示您同意本隐私政策所述内容。若不同意，请勿使用本应用。",
      },
      dataCollection: {
        title: "2. 收集的信息",
        userProvided: {
          title: "2-1. 用户提供的信息",
          wordData: {
            title: "(a) AI 填写请求数据",
            items: [
              "用户输入的单词文本",
              "仅用于生成单词数据（释义、例句、音标、相关词、词源）",
              "收集时机：在添加卡片界面点击 AI 填写按钮时",
              "传送目标：通过 Supabase 传送至 OpenAI API（详情请见第 4 条）",
              "Premium 方案用户亦可用于生成学习插图",
            ],
          },
        },
        autoCollected: {
          title: "2-2. 自动收集的信息",
          subscription: {
            title: "(a) 订阅及付款信息",
            items: [
              "您使用的订阅方案（Free / Pro / Premium）",
              "Apple App Store 购买收据信息（付款信息由 Apple 管理，本公司不获取信用卡号等）",
            ],
          },
          appUsage: {
            title: "(b) 应用使用数据（仅限设备内）",
            items: [
              "创建的牌组（单词本）及单词卡数据",
              "测验学习进度及正确率",
              "间隔重复法复习日程",
              "免费方案 AI 使用次数计数",
              "应用设置（语言、主题、TTS 语音设置等）",
            ],
          },
        },
        notCollected: {
          title: "2-3. 不收集的信息",
          intro: "本应用不收集以下信息：",
          items: [
            "姓名、电子邮件地址、住址等个人识别信息（无需注册账号）",
            "位置信息",
            "联系人",
            "健康及健身数据",
            "广告目的的追踪数据",
          ],
        },
      },
      purpose: {
        title: "3. 信息使用目的",
        intro: "收集的信息仅用于以下目的：",
        tableHeaders: ["信息种类", "使用目的"],
        rows: [
          ["AI 填写请求数据（单词文本）", "AI 自动生成单词信息及插图"],
          ["订阅信息", "提供方案功能、确认有效订阅"],
          ["使用数据（本地）", "牌组・卡片管理、学习进度显示、复习日程管理"],
        ],
      },
      thirdParty: {
        title: "4. 向第三方服务提供信息",
        intro: "本应用为提供服务而使用以下第三方服务。数据仅在使用相关功能时传送至各服务。",
        providers: [
          {
            name: "4-1. Supabase（数据中继）",
            plan: "适用：使用 AI 填写功能（Pro / Premium）时",
            data: "传送数据：用户输入的单词文本",
            purpose: "使用目的：安全中继单词数据请求至 OpenAI API",
            retention: "数据保留：请求数据仅用于中继处理，不永久存储",
            policyLabel: "隐私政策",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API（单词信息・插图生成）",
            plan: "适用：使用 AI 填写功能（Pro / Premium）时",
            data: "传送数据：用户输入的单词文本",
            purpose: "使用目的：生成单词释义、例句、音标、相关词、词源及学习插图（仅限 Premium）",
            retention: "数据保留：处理后不存储于本公司服务器，遵循 OpenAI 的数据保留政策",
            policyLabel: "隐私政策",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat（订阅管理）",
            plan: "适用：所有用户（Pro / Premium 订阅管理）",
            data: "传送数据：匿名用户 ID、Apple App Store 购买收据",
            purpose: "使用目的：确认及管理订阅状态",
            retention: "",
            policyLabel: "隐私政策",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "重要：本公司绝不向上述以外的第三方（广告网络、数据中间商等）出售、共享或提供用户个人信息。",
      },
      retention: {
        title: "5. 数据存储及保留期间",
        local: {
          title: "设备内（本地存储）",
          intro: "以下数据仅存储于用户设备内，不传送至本公司服务器：",
          items: [
            "创建的牌组（单词本）及单词卡数据",
            "测验学习进度及正确率",
            "间隔重复法复习日程",
            "应用设置（语言、主题、TTS 语音设置等）",
            "免费方案 AI 使用次数计数",
          ],
          deletion: "这些数据将在卸载应用时删除。由于不进行云端同步，重新安装时数据无法恢复。",
        },
        server: {
          title: "本公司服务器",
          content: "本应用不需要用户账号，AI 生成处理后的请求数据不会存储于本公司服务器。所有用户数据仅存储于设备内。",
        },
        thirdParty: {
          title: "第三方服务",
          content: "各第三方服务的数据保留政策，请参阅各公司的隐私政策。",
        },
      },
      permissions: {
        title: "6. 应用使用的权限",
        intro: "本应用使用以下设备权限：",
        items: [
          {
            name: "照片图库",
            detail: "在为单词卡添加图片时，用于从图库选择图片。",
          },
          {
            name: "相机",
            detail: "在为单词卡添加图片时，用于使用相机拍照。",
          },
        ],
      },
      security: {
        title: "7. 数据安全",
        items: [
          "通信加密：所有数据通信均通过 HTTPS/TLS 加密",
          "最小权限原则：仅传送 AI 生成处理所需的最少数据",
          "优先本地存储：所有学习数据均存储于设备内，最小化数据传输至云端",
        ],
        disclaimer: "但通过互联网的数据传输存在固有风险，无法保证完全的安全性。",
      },
      children: {
        title: "8. 儿童隐私（COPPA 合规）",
        content: "本应用不针对 13 岁以下儿童，不会故意收集 13 岁以下儿童的个人信息。",
        action: "若发现 13 岁以下儿童正在使用本应用，本公司将采取合理措施迅速删除相关信息。若您知道您的孩子正在使用本应用，请通过以下联系方式与我们联系。",
      },
      userRights: {
        title: "9. 用户权利",
        japan: {
          title: "9-1. 日本境内用户",
          items: [
            "要求披露所保有的个人信息",
            "要求更正、新增或删除内容",
            "要求停止使用或消除",
          ],
        },
        gdpr: {
          title: "9-2. EEA/UK 用户（GDPR）",
          items: [
            "访问权：访问所保有的个人数据",
            "更正权：更正不正确的个人数据",
            "删除权（被遗忘权）：删除个人数据",
            "限制处理权：限制个人数据处理",
            "数据可携权：接收及传输数据",
            "异议权：对个人数据处理提出异议",
          ],
        },
        ccpa: {
          title: "9-3. 加州用户（CCPA）",
          items: [
            "要求披露收集的个人信息类别及目的",
            "要求删除个人信息",
            "选择退出个人信息出售（本公司不出售个人信息）",
          ],
        },
        howTo: {
          title: "行使权利的方式",
          content: "本地存储的数据可通过卸载应用删除。其他权利行使请通过以下联系方式与我们联系。",
        },
      },
      cookies: {
        title: "10. Cookie 及追踪技术",
        content: "本应用非在网页浏览器上运行，因此不使用 Cookie。",
        revenueCat: "RevenueCat SDK 使用匿名用户 ID，但不进行广告目的的跨应用追踪。",
        att: "由于本应用不进行 Apple App Tracking Transparency（ATT）框架所要求的广告目的追踪，因此不会显示 ATT 提示。",
      },
      internationalTransfer: {
        title: "11. 国际数据传输",
        content: "本应用使用的第三方服务服务器主要位于美国。从其他国家传送数据时，该数据将跨国传输。",
        note: "各第三方服务均采取适当的数据保护措施（如标准合同条款）。详情请参阅各公司的隐私政策。",
      },
      changes: {
        title: "12. 隐私政策的变更",
        content: "本公司可能随时更新本隐私政策。若发生重大变更，将通过应用内通知或更新本页顶部的「最后更新日期」告知您。",
        consent: "变更后继续使用本应用，即视为同意更新后的隐私政策。",
      },
      contact: {
        title: "13. 联系我们",
        content: "如对本隐私政策有任何疑问或需行使相关权利，请通过以下方式联系：",
        email: "电子邮件",
        responseTime: "我们原则上将于收到询问后 30 天内回复。",
      },
      appStoreLabel: {
        title: "App Store 隐私标签对应表",
        description: "以下为 App Store App Privacy 区块的披露信息。",
        tableHeaders: ["数据种类", "是否收集", "是否追踪", "使用目的"],
        rows: [
          ["单词文本（AI 填写时）", "○（仅处理时）", "×", "App Functionality（AI 单词生成）"],
          ["标识符（匿名 ID）", "○", "×", "App Functionality（订阅管理）"],
          ["购买信息", "○", "×", "App Functionality（订阅管理）"],
          ["使用状况数据", "○（仅设备内）", "×", "App Functionality（学习进度）"],
          ["姓名、联系方式、位置信息等", "×", "×", "—"],
        ],
        trackingNote: "「追踪」= 为第三方广告或分析目的使用数据。本应用不为广告目的追踪任何数据。",
        languageNote: "本隐私政策以日文版为正文，其他语言版本仅供参考。",
      },
    },
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "العودة إلى صفحة الدعم",
    tableOfContents: "جدول المحتويات",
    sections: {
      intro: {
        title: "1. مقدمة",
        content: "WordCards (يُشار إليه فيما يلي بـ «التطبيق») هو تطبيق لتعلم اللغات يتيح لك إنشاء مجموعات بطاقات مفردات شخصية والدراسة من خلال الاختبارات ومراجعة التكرار المتباعد. تشرح سياسة الخصوصية هذه أنواع المعلومات التي يتم جمعها عند استخدام التطبيق وأغراض الاستخدام وأساليب الإدارة والإفصاح للأطراف الثالثة.",
        consent: "باستخدام التطبيق، فإنك توافق على الممارسات الموضحة في سياسة الخصوصية هذه. إذا كنت لا توافق، يُرجى الامتناع عن استخدام التطبيق.",
      },
      dataCollection: {
        title: "2. المعلومات التي نجمعها",
        userProvided: {
          title: "2-1. المعلومات التي يقدمها المستخدم",
          wordData: {
            title: "(أ) بيانات طلب الإدخال بالذكاء الاصطناعي",
            items: [
              "نص الكلمة الذي أدخله المستخدم",
              "يُستخدم فقط لتوليد بيانات الكلمة (المعنى والأمثلة والنطق والكلمات المرتبطة والأصل اللغوي)",
              "وقت الجمع: عند الضغط على زر AI Fill في شاشة إضافة البطاقة",
              "الوجهة: يُرسَل إلى OpenAI API عبر Supabase (انظر القسم 4 للتفاصيل)",
              "لمستخدمي خطة Premium، يُستخدم أيضًا لتوليد رسوم توضيحية تعليمية",
            ],
          },
        },
        autoCollected: {
          title: "2-2. المعلومات التي يتم جمعها تلقائيًا",
          subscription: {
            title: "(أ) معلومات الاشتراك والفوترة",
            items: [
              "خطة اشتراكك (Free / Pro / Premium)",
              "معلومات إيصال الشراء من Apple App Store (تتولى Apple إدارة بيانات الدفع، ولا نحصل على أرقام البطاقات وما شابهها)",
            ],
          },
          appUsage: {
            title: "(ب) بيانات استخدام التطبيق (على الجهاز فقط)",
            items: [
              "بيانات المجموعات وبطاقات المفردات التي أنشأتها",
              "تقدم التعلم ودقة الاختبار",
              "جدول مراجعة التكرار المتباعد",
              "عدد استخدامات AI للخطة المجانية",
              "إعدادات التطبيق (اللغة والثيم وإعدادات صوت TTS وغيرها)",
            ],
          },
        },
        notCollected: {
          title: "2-3. المعلومات التي لا نجمعها",
          intro: "لا يجمع التطبيق المعلومات التالية:",
          items: [
            "معلومات تعريف شخصية كالاسم والبريد الإلكتروني والعنوان (لا يلزم تسجيل حساب)",
            "بيانات الموقع",
            "جهات الاتصال",
            "بيانات الصحة واللياقة البدنية",
            "بيانات تتبع لأغراض إعلانية",
          ],
        },
      },
      purpose: {
        title: "3. أغراض استخدام المعلومات",
        intro: "تُستخدم المعلومات المجمّعة فقط للأغراض التالية:",
        tableHeaders: ["نوع المعلومات", "غرض الاستخدام"],
        rows: [
          ["بيانات طلب AI Fill (نص الكلمة)", "التوليد التلقائي لمعلومات الكلمة والرسوم التوضيحية بالذكاء الاصطناعي"],
          ["معلومات الاشتراك", "توفير ميزات الخطة، التحقق من الاشتراكات النشطة"],
          ["بيانات الاستخدام (محلي)", "إدارة المجموعات والبطاقات، عرض تقدم التعلم، إدارة جدول المراجعة"],
        ],
      },
      thirdParty: {
        title: "4. مشاركة المعلومات مع خدمات الطرف الثالث",
        intro: "يستخدم التطبيق خدمات الطرف الثالث التالية لتقديم وظائفه. تُرسَل البيانات إلى كل خدمة فقط عند استخدام الميزة ذات الصلة.",
        providers: [
          {
            name: "4-1. Supabase (مرحّل البيانات)",
            plan: "ينطبق على: استخدام ميزة AI Fill (Pro / Premium)",
            data: "البيانات المرسَلة: نص الكلمة الذي أدخله المستخدم",
            purpose: "الغرض: نقل آمن لطلبات بيانات الكلمة إلى OpenAI API",
            retention: "الاحتفاظ بالبيانات: تُستخدم بيانات الطلب فقط للنقل ولا تُخزَّن بصفة دائمة",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI API (توليد معلومات الكلمة والرسوم التوضيحية)",
            plan: "ينطبق على: استخدام ميزة AI Fill (Pro / Premium)",
            data: "البيانات المرسَلة: نص الكلمة الذي أدخله المستخدم",
            purpose: "الغرض: توليد معنى الكلمة والأمثلة والنطق والكلمات المرتبطة والأصل اللغوي والرسوم التوضيحية (Premium فقط)",
            retention: "الاحتفاظ بالبيانات: لا تُخزَّن على خوادمنا بعد المعالجة، وتخضع لسياسة OpenAI للاحتفاظ بالبيانات",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat (إدارة الاشتراكات)",
            plan: "ينطبق على: جميع المستخدمين (إدارة اشتراكات Pro / Premium)",
            data: "البيانات المرسَلة: معرّف مستخدم مجهول، إيصال شراء Apple App Store",
            purpose: "الغرض: التحقق من حالة الاشتراك وإدارته",
            retention: "",
            policyLabel: "سياسة الخصوصية",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "مهم: لا نبيع أو نشارك أو نقدم المعلومات الشخصية للمستخدمين لأي أطراف ثالثة أخرى (شبكات إعلانية، وسطاء بيانات وما شابه) بأي شكل من الأشكال.",
      },
      retention: {
        title: "5. تخزين البيانات ومدة الاحتفاظ بها",
        local: {
          title: "على الجهاز (التخزين المحلي)",
          intro: "تُخزَّن البيانات التالية على جهاز المستخدم فقط ولا تُرسَل إلى خوادمنا:",
          items: [
            "بيانات المجموعات وبطاقات المفردات التي أنشأتها",
            "تقدم التعلم ودقة الاختبار",
            "جدول مراجعة التكرار المتباعد",
            "إعدادات التطبيق (اللغة والثيم وإعدادات صوت TTS وغيرها)",
            "عدد استخدامات AI للخطة المجانية",
          ],
          deletion: "تُحذف هذه البيانات عند إلغاء تثبيت التطبيق. نظرًا لعدم وجود مزامنة سحابية، لا يمكن استعادة البيانات عند إعادة التثبيت.",
        },
        server: {
          title: "خوادمنا",
          content: "لا يتطلب التطبيق حسابات مستخدمين، ولا تُخزَّن بيانات الطلبات على خوادمنا بعد معالجة التوليد بالذكاء الاصطناعي. جميع بيانات المستخدمين مخزَّنة على الجهاز فقط.",
        },
        thirdParty: {
          title: "خدمات الطرف الثالث",
          content: "للاطلاع على سياسة الاحتفاظ بالبيانات لكل خدمة طرف ثالث، يُرجى الرجوع إلى سياسات الخصوصية الخاصة بكل شركة.",
        },
      },
      permissions: {
        title: "6. أذونات التطبيق",
        intro: "يستخدم التطبيق أذونات الجهاز التالية:",
        items: [
          {
            name: "مكتبة الصور",
            detail: "تُستخدم لاختيار الصور من المكتبة عند إضافة صور لبطاقات المفردات.",
          },
          {
            name: "الكاميرا",
            detail: "تُستخدم لالتقاط الصور بالكاميرا عند إضافة صور لبطاقات المفردات.",
          },
        ],
      },
      security: {
        title: "7. أمان البيانات",
        items: [
          "تشفير الاتصالات: يتم تشفير جميع اتصالات البيانات عبر HTTPS/TLS",
          "مبدأ الحد الأدنى من الصلاحيات: يتم إرسال الحد الأدنى فقط من البيانات اللازمة لمعالجة التوليد بالذكاء الاصطناعي",
          "الأولوية للتخزين المحلي: تُخزَّن جميع بيانات التعلم على الجهاز مع تقليل نقل البيانات إلى السحابة",
        ],
        disclaimer: "غير أن نقل البيانات عبر الإنترنت ينطوي على مخاطر متأصلة، ولا يمكن ضمان الأمان الكامل.",
      },
      children: {
        title: "8. خصوصية الأطفال (الامتثال لـ COPPA)",
        content: "التطبيق غير موجّه للأطفال دون سن 13 عامًا، ولا نجمع عن قصد أي معلومات شخصية من الأطفال دون سن 13 عامًا.",
        action: "إذا علمنا أن طفلاً دون سن 13 عامًا يستخدم التطبيق، فسنتخذ خطوات معقولة لحذف أي معلومات ذات صلة على الفور. إذا كنت وليَّ أمر وتعلم أن طفلك يستخدم التطبيق، يُرجى التواصل معنا على العنوان أدناه.",
      },
      userRights: {
        title: "9. حقوق المستخدم",
        japan: {
          title: "9-1. المستخدمون في اليابان",
          items: [
            "طلب الإفصاح عن المعلومات الشخصية المحتفَظ بها",
            "طلب تصحيح أو إضافة أو حذف المحتوى",
            "طلب وقف الاستخدام أو المحو",
          ],
        },
        gdpr: {
          title: "9-2. مستخدمو EEA/UK (اللائحة العامة لحماية البيانات)",
          items: [
            "حق الوصول: الوصول إلى البيانات الشخصية المحتفَظ بها",
            "حق التصحيح: تصحيح البيانات الشخصية غير الدقيقة",
            "حق المحو (حق النسيان): حذف البيانات الشخصية",
            "حق تقييد المعالجة: تقييد معالجة البيانات الشخصية",
            "حق نقل البيانات: استلام ونقل البيانات",
            "حق الاعتراض: الاعتراض على معالجة البيانات الشخصية",
          ],
        },
        ccpa: {
          title: "9-3. مستخدمو كاليفورنيا (CCPA)",
          items: [
            "طلب الإفصاح عن فئات المعلومات الشخصية المجمَّعة وأغراضها",
            "طلب حذف المعلومات الشخصية",
            "إلغاء الاشتراك في بيع المعلومات الشخصية (نحن لا نبيع المعلومات الشخصية)",
          ],
        },
        howTo: {
          title: "كيفية ممارسة حقوقك",
          content: "يمكن حذف البيانات المخزَّنة محليًا بإلغاء تثبيت التطبيق. للحقوق الأخرى، يُرجى التواصل معنا على العنوان أدناه.",
        },
      },
      cookies: {
        title: "10. ملفات تعريف الارتباط وتقنيات التتبع",
        content: "لا يعمل التطبيق في متصفح ويب، وبالتالي لا يستخدم ملفات تعريف الارتباط.",
        revenueCat: "يستخدم RevenueCat SDK معرّفات مستخدمين مجهولة، لكنه لا يُجري تتبعًا عبر التطبيقات لأغراض إعلانية.",
        att: "نظرًا لعدم تنفيذ التطبيق للتتبع الإعلاني الذي يتطلبه إطار عمل Apple App Tracking Transparency (ATT)، لن يظهر أي مطالبة ATT.",
      },
      internationalTransfer: {
        title: "11. نقل البيانات الدولي",
        content: "تقع خوادم خدمات الطرف الثالث التي يستخدمها التطبيق بشكل رئيسي في الولايات المتحدة. عند إرسال البيانات من خارج الولايات المتحدة، يتم نقل تلك البيانات دوليًا.",
        note: "تُطبّق كل خدمة طرف ثالث تدابير حماية مناسبة للبيانات (كبنود العقد القياسية). للاطلاع على التفاصيل، يُرجى الرجوع إلى سياسة الخصوصية الخاصة بكل شركة.",
      },
      changes: {
        title: "12. التغييرات على سياسة الخصوصية هذه",
        content: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. في حال حدوث تغييرات جوهرية، سنُخطرك من خلال إشعارات داخل التطبيق أو بتحديث تاريخ «آخر تحديث» في أعلى هذه الصفحة.",
        consent: "إذا واصلت استخدام التطبيق بعد إجراء التغييرات، يُعدّ ذلك موافقةً منك على سياسة الخصوصية المحدَّثة.",
      },
      contact: {
        title: "13. تواصل معنا",
        content: "لأي أسئلة حول سياسة الخصوصية هذه أو لممارسة حقوقك، يُرجى التواصل معنا على:",
        email: "البريد الإلكتروني",
        responseTime: "سنرد على استفساراتك خلال 30 يومًا من استلامها.",
      },
      appStoreLabel: {
        title: "جدول بيانات خصوصية App Store",
        description: "معلومات الإفصاح لقسم App Privacy في App Store.",
        tableHeaders: ["نوع البيانات", "هل تُجمَّع؟", "هل تُتتبَّع؟", "الغرض"],
        rows: [
          ["نص الكلمة (عند AI Fill)", "نعم (أثناء المعالجة فقط)", "لا", "وظائف التطبيق (توليد كلمات AI)"],
          ["المعرّفات (ID مجهول)", "نعم", "لا", "وظائف التطبيق (إدارة الاشتراكات)"],
          ["معلومات الشراء", "نعم", "لا", "وظائف التطبيق (إدارة الاشتراكات)"],
          ["بيانات الاستخدام", "نعم (على الجهاز فقط)", "لا", "وظائف التطبيق (تقدم التعلم)"],
          ["الاسم، جهات الاتصال، الموقع وغيرها", "لا", "لا", "—"],
        ],
        trackingNote: "«التتبع» = استخدام البيانات لأغراض إعلانية أو تحليلية لطرف ثالث. لا يتتبع هذا التطبيق أي بيانات لأغراض إعلانية.",
        languageNote: "النسخة اليابانية من سياسة الخصوصية هذه هي النص الرسمي المعتمد. النسخ بلغات أخرى مقدَّمة للرجوع إليها فقط.",
      },
    },
  },
  es: {
    title: "Política de privacidad",
    lastUpdated: "Última actualización",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Volver a la página de soporte",
    tableOfContents: "Índice",
    sections: {
      intro: {
        title: "1. Introducción",
        content: "WordCards (en adelante, «la App») es una aplicación de aprendizaje de idiomas que te permite crear tus propios mazos de tarjetas de vocabulario y estudiar con cuestionarios y revisión de repetición espaciada. Esta Política de privacidad explica los tipos de información que se recopilan cuando usas la App, los propósitos de uso, los métodos de gestión y la divulgación a terceros.",
        consent: "Al usar la App, aceptas las prácticas descritas en esta Política de privacidad. Si no estás de acuerdo, por favor abstente de usar la App.",
      },
      dataCollection: {
        title: "2. Información que recopilamos",
        userProvided: {
          title: "2-1. Información proporcionada por el usuario",
          wordData: {
            title: "(a) Datos de solicitud de relleno con IA",
            items: [
              "Texto de la palabra introducido por el usuario",
              "Se usa únicamente para generar datos de la palabra (significado, ejemplos, fonética, palabras relacionadas, etimología)",
              "Momento de recopilación: al pulsar el botón AI Fill en la pantalla de añadir tarjeta",
              "Destino: se envía a la API de OpenAI a través de Supabase (ver sección 4 para más detalles)",
              "Para usuarios del plan Premium, también se usa para generar ilustraciones de aprendizaje",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Información recopilada automáticamente",
          subscription: {
            title: "(a) Información de suscripción y facturación",
            items: [
              "Tu plan de suscripción (Free / Pro / Premium)",
              "Información del recibo de compra de Apple App Store (los datos de pago son gestionados por Apple; no obtenemos números de tarjeta, etc.)",
            ],
          },
          appUsage: {
            title: "(b) Datos de uso de la App (solo en el dispositivo)",
            items: [
              "Datos de mazos y tarjetas de vocabulario creados",
              "Progreso de aprendizaje y precisión del cuestionario",
              "Calendario de revisión de repetición espaciada",
              "Contador de usos de IA del plan gratuito",
              "Ajustes de la App (idioma, tema, configuración de voz TTS, etc.)",
            ],
          },
        },
        notCollected: {
          title: "2-3. Información que no recopilamos",
          intro: "La App no recopila la siguiente información:",
          items: [
            "Información de identificación personal como nombre, dirección de correo electrónico o dirección física (no se requiere registro de cuenta)",
            "Datos de ubicación",
            "Contactos",
            "Datos de salud y fitness",
            "Datos de seguimiento con fines publicitarios",
          ],
        },
      },
      purpose: {
        title: "3. Propósito del uso de la información",
        intro: "La información recopilada se usa únicamente para los siguientes propósitos:",
        tableHeaders: ["Tipo de información", "Propósito de uso"],
        rows: [
          ["Datos de solicitud AI Fill (texto de la palabra)", "Generación automática de información de palabras e ilustraciones por IA"],
          ["Información de suscripción", "Proporcionar funciones según el plan, verificar suscripciones activas"],
          ["Datos de uso (local)", "Gestión de mazos y tarjetas, visualización del progreso, gestión del calendario de revisión"],
        ],
      },
      thirdParty: {
        title: "4. Compartir información con servicios de terceros",
        intro: "La App utiliza los siguientes servicios de terceros para proporcionar su funcionalidad. Los datos se envían a cada servicio solo cuando se usa la función correspondiente.",
        providers: [
          {
            name: "4-1. Supabase (retransmisor de datos)",
            plan: "Aplicable: al usar la función AI Fill (Pro / Premium)",
            data: "Datos enviados: texto de la palabra introducido por el usuario",
            purpose: "Propósito: retransmisión segura de solicitudes de datos de palabras a la API de OpenAI",
            retention: "Retención de datos: los datos de solicitud se usan solo para la retransmisión y no se almacenan de forma permanente",
            policyLabel: "Política de privacidad",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. API de OpenAI (generación de información de palabras e ilustraciones)",
            plan: "Aplicable: al usar la función AI Fill (Pro / Premium)",
            data: "Datos enviados: texto de la palabra introducido por el usuario",
            purpose: "Propósito: generar significado, ejemplos, fonética, palabras relacionadas, etimología e ilustraciones de aprendizaje (solo Premium)",
            retention: "Retención de datos: no se almacenan en nuestros servidores tras el procesamiento; sujeto a la política de retención de datos de OpenAI",
            policyLabel: "Política de privacidad",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat (gestión de suscripciones)",
            plan: "Aplicable: todos los usuarios (gestión de suscripciones Pro / Premium)",
            data: "Datos enviados: ID de usuario anónimo, recibo de compra de Apple App Store",
            purpose: "Propósito: verificación y gestión del estado de la suscripción",
            retention: "",
            policyLabel: "Política de privacidad",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "Importante: nunca vendemos, compartimos ni proporcionamos información personal de usuarios a terceros distintos de los indicados (redes publicitarias, intermediarios de datos, etc.).",
      },
      retention: {
        title: "5. Almacenamiento y período de retención de datos",
        local: {
          title: "En el dispositivo (almacenamiento local)",
          intro: "Los siguientes datos se almacenan únicamente en el dispositivo del usuario y no se transmiten a nuestros servidores:",
          items: [
            "Datos de mazos y tarjetas de vocabulario creados",
            "Progreso de aprendizaje y precisión del cuestionario",
            "Calendario de revisión de repetición espaciada",
            "Ajustes de la App (idioma, tema, configuración de voz TTS, etc.)",
            "Contador de usos de IA del plan gratuito",
          ],
          deletion: "Estos datos se eliminan al desinstalar la App. Como no hay sincronización en la nube, los datos no se pueden restaurar al reinstalar.",
        },
        server: {
          title: "Nuestros servidores",
          content: "La App no requiere cuentas de usuario y los datos de solicitud no se almacenan en nuestros servidores tras el procesamiento de generación por IA. Todos los datos del usuario se almacenan únicamente en el dispositivo.",
        },
        thirdParty: {
          title: "Servicios de terceros",
          content: "Para consultar la política de retención de datos de cada servicio de terceros, por favor consulta sus respectivas políticas de privacidad.",
        },
      },
      permissions: {
        title: "6. Permisos de la App",
        intro: "La App utiliza los siguientes permisos del dispositivo:",
        items: [
          {
            name: "Fototeca",
            detail: "Se usa para seleccionar imágenes de la biblioteca al añadir imágenes a las tarjetas de vocabulario.",
          },
          {
            name: "Cámara",
            detail: "Se usa para tomar fotos con la cámara al añadir imágenes a las tarjetas de vocabulario.",
          },
        ],
      },
      security: {
        title: "7. Seguridad de los datos",
        items: [
          "Comunicación cifrada: todas las transmisiones de datos están cifradas mediante HTTPS/TLS",
          "Principio de mínimo privilegio: solo se transmiten los datos mínimos necesarios para el procesamiento de generación por IA",
          "Prioridad al almacenamiento local: todos los datos de aprendizaje se almacenan en el dispositivo, minimizando la transmisión a la nube",
        ],
        disclaimer: "Sin embargo, la transferencia de datos por Internet conlleva riesgos inherentes y no se puede garantizar una seguridad completa.",
      },
      children: {
        title: "8. Privacidad infantil (cumplimiento de COPPA)",
        content: "La App no está destinada a menores de 13 años y no recopilamos intencionalmente información personal de menores de 13 años.",
        action: "Si nos enteramos de que un menor de 13 años está usando la App, tomaremos medidas razonables para eliminar de inmediato cualquier información relacionada. Si eres padre o tutor y sabes que tu hijo usa la App, por favor contáctanos en la dirección indicada a continuación.",
      },
      userRights: {
        title: "9. Derechos del usuario",
        japan: {
          title: "9-1. Usuarios en Japón",
          items: [
            "Solicitud de divulgación de la información personal conservada",
            "Solicitud de corrección, adición o eliminación del contenido",
            "Solicitud de suspensión del uso o supresión",
          ],
        },
        gdpr: {
          title: "9-2. Usuarios de EEA/UK (RGPD)",
          items: [
            "Derecho de acceso: acceso a los datos personales conservados",
            "Derecho de rectificación: corrección de datos personales inexactos",
            "Derecho de supresión (derecho al olvido): eliminación de datos personales",
            "Derecho a la limitación del tratamiento: restricción del tratamiento de datos personales",
            "Derecho a la portabilidad de los datos: recepción y transferencia de datos",
            "Derecho de oposición: oposición al tratamiento de datos personales",
          ],
        },
        ccpa: {
          title: "9-3. Usuarios de California (CCPA)",
          items: [
            "Solicitud de divulgación de categorías y propósitos de la información personal recopilada",
            "Solicitud de eliminación de información personal",
            "Exclusión voluntaria de la venta de información personal (no vendemos información personal)",
          ],
        },
        howTo: {
          title: "Cómo ejercer tus derechos",
          content: "Los datos almacenados localmente se pueden eliminar desinstalando la App. Para otros derechos, por favor contáctanos en la dirección indicada a continuación.",
        },
      },
      cookies: {
        title: "10. Cookies y tecnologías de seguimiento",
        content: "La App no funciona en un navegador web y, por lo tanto, no utiliza cookies.",
        revenueCat: "El SDK de RevenueCat utiliza IDs de usuario anónimos, pero no realiza seguimiento entre aplicaciones con fines publicitarios.",
        att: "Dado que la App no realiza el seguimiento con fines publicitarios requerido por el marco App Tracking Transparency (ATT) de Apple, no aparece ningún mensaje de ATT.",
      },
      internationalTransfer: {
        title: "11. Transferencias internacionales de datos",
        content: "Los servidores de los servicios de terceros utilizados por la App se encuentran principalmente en los Estados Unidos. Al enviar datos desde otros países, esos datos se transfieren internacionalmente.",
        note: "Cada servicio de terceros implementa medidas de protección de datos adecuadas (como Cláusulas Contractuales Estándar). Para más detalles, consulta la política de privacidad de cada empresa.",
      },
      changes: {
        title: "12. Cambios en esta Política de privacidad",
        content: "Podemos actualizar esta Política de privacidad periódicamente. Si se producen cambios significativos, te notificaremos mediante notificaciones dentro de la App o actualizando la fecha de «Última actualización» en la parte superior de esta página.",
        consent: "Si continúas usando la App después de los cambios, se considera que has aceptado la Política de privacidad actualizada.",
      },
      contact: {
        title: "13. Contáctanos",
        content: "Para preguntas sobre esta Política de privacidad o para ejercer tus derechos, contáctanos en:",
        email: "Correo electrónico",
        responseTime: "Responderemos en un plazo de 30 días desde la recepción de tu consulta.",
      },
      appStoreLabel: {
        title: "Etiqueta de nutrición de privacidad de App Store",
        description: "Información de divulgación para la sección App Privacy de App Store.",
        tableHeaders: ["Tipo de datos", "¿Recopilado?", "¿Rastreado?", "Propósito"],
        rows: [
          ["Texto de la palabra (AI Fill)", "Sí (solo procesamiento)", "No", "Funcionalidad de la App (generación de palabras con IA)"],
          ["Identificadores (ID anónimo)", "Sí", "No", "Funcionalidad de la App (gestión de suscripciones)"],
          ["Información de compra", "Sí", "No", "Funcionalidad de la App (gestión de suscripciones)"],
          ["Datos de uso", "Sí (solo en dispositivo)", "No", "Funcionalidad de la App (progreso de aprendizaje)"],
          ["Nombre, contacto, ubicación, etc.", "No", "No", "—"],
        ],
        trackingNote: "«Rastreado» = Uso de datos para publicidad o análisis de terceros. Esta App no rastrea ningún dato con fines publicitarios.",
        languageNote: "La versión japonesa de esta Política de privacidad es el texto oficial. Las demás versiones se proporcionan solo como referencia.",
      },
    },
  },
  fr: {
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Retour à la page de support",
    tableOfContents: "Table des matières",
    sections: {
      intro: {
        title: "1. Introduction",
        content: "WordCards (ci-après « l'Application ») est une application d'apprentissage des langues qui vous permet de créer vos propres paquets de cartes de vocabulaire et d'étudier grâce à des quiz et à la révision par répétition espacée. Cette Politique de confidentialité explique les types d'informations collectées lors de l'utilisation de l'Application, les objectifs d'utilisation, les méthodes de gestion et la divulgation à des tiers.",
        consent: "En utilisant l'Application, vous acceptez les pratiques décrites dans cette Politique de confidentialité. Si vous n'êtes pas d'accord, veuillez ne pas utiliser l'Application.",
      },
      dataCollection: {
        title: "2. Informations que nous collectons",
        userProvided: {
          title: "2-1. Informations fournies par l'utilisateur",
          wordData: {
            title: "(a) Données de demande de remplissage IA",
            items: [
              "Texte du mot saisi par l'utilisateur",
              "Utilisé uniquement pour générer des données sur le mot (signification, exemples, phonétique, mots associés, étymologie)",
              "Moment de collecte : lors de l'appui sur le bouton AI Fill sur l'écran d'ajout de carte",
              "Destination : envoyé à l'API OpenAI via Supabase (voir section 4 pour les détails)",
              "Pour les utilisateurs du plan Premium, également utilisé pour générer des illustrations d'apprentissage",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Informations collectées automatiquement",
          subscription: {
            title: "(a) Informations d'abonnement et de facturation",
            items: [
              "Votre plan d'abonnement (Free / Pro / Premium)",
              "Informations sur le reçu d'achat de l'Apple App Store (les données de paiement sont gérées par Apple ; nous n'obtenons pas les numéros de carte, etc.)",
            ],
          },
          appUsage: {
            title: "(b) Données d'utilisation de l'Application (appareil uniquement)",
            items: [
              "Données des paquets et cartes de vocabulaire créés",
              "Progression de l'apprentissage et précision des quiz",
              "Calendrier de révision par répétition espacée",
              "Compteur d'utilisations de l'IA pour le plan gratuit",
              "Paramètres de l'Application (langue, thème, paramètres de voix TTS, etc.)",
            ],
          },
        },
        notCollected: {
          title: "2-3. Informations que nous ne collectons pas",
          intro: "L'Application ne collecte pas les informations suivantes :",
          items: [
            "Informations d'identification personnelle telles que le nom, l'adresse e-mail ou l'adresse physique (aucune inscription requise)",
            "Données de localisation",
            "Contacts",
            "Données de santé et de forme physique",
            "Données de suivi à des fins publicitaires",
          ],
        },
      },
      purpose: {
        title: "3. Objectif de l'utilisation des informations",
        intro: "Les informations collectées sont utilisées uniquement aux fins suivantes :",
        tableHeaders: ["Type d'information", "Objectif d'utilisation"],
        rows: [
          ["Données de demande AI Fill (texte du mot)", "Génération automatique d'informations sur les mots et d'illustrations par IA"],
          ["Informations d'abonnement", "Fournir des fonctionnalités selon le plan, vérifier les abonnements actifs"],
          ["Données d'utilisation (local)", "Gestion des paquets et cartes, affichage de la progression, gestion du calendrier de révision"],
        ],
      },
      thirdParty: {
        title: "4. Partage d'informations avec des services tiers",
        intro: "L'Application utilise les services tiers suivants pour fournir ses fonctionnalités. Les données sont envoyées à chaque service uniquement lors de l'utilisation de la fonctionnalité concernée.",
        providers: [
          {
            name: "4-1. Supabase (relais de données)",
            plan: "Applicable : lors de l'utilisation de la fonction AI Fill (Pro / Premium)",
            data: "Données envoyées : texte du mot saisi par l'utilisateur",
            purpose: "Objectif : relais sécurisé des demandes de données de mots vers l'API OpenAI",
            retention: "Conservation des données : les données de demande sont utilisées uniquement pour le relais et ne sont pas stockées de façon permanente",
            policyLabel: "Politique de confidentialité",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. API OpenAI (génération d'informations sur les mots et d'illustrations)",
            plan: "Applicable : lors de l'utilisation de la fonction AI Fill (Pro / Premium)",
            data: "Données envoyées : texte du mot saisi par l'utilisateur",
            purpose: "Objectif : générer la signification, les exemples, la phonétique, les mots associés, l'étymologie et les illustrations d'apprentissage (Premium uniquement)",
            retention: "Conservation des données : non stockées sur nos serveurs après traitement ; soumises à la politique de conservation des données d'OpenAI",
            policyLabel: "Politique de confidentialité",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat (gestion des abonnements)",
            plan: "Applicable : tous les utilisateurs (gestion des abonnements Pro / Premium)",
            data: "Données envoyées : ID utilisateur anonyme, reçu d'achat Apple App Store",
            purpose: "Objectif : vérification et gestion du statut de l'abonnement",
            retention: "",
            policyLabel: "Politique de confidentialité",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "Important : nous ne vendons, ne partageons ni ne fournissons jamais les informations personnelles des utilisateurs à des tiers autres que ceux mentionnés ci-dessus (réseaux publicitaires, courtiers en données, etc.).",
      },
      retention: {
        title: "5. Stockage et durée de conservation des données",
        local: {
          title: "Sur l'appareil (stockage local)",
          intro: "Les données suivantes sont stockées uniquement sur l'appareil de l'utilisateur et ne sont pas transmises à nos serveurs :",
          items: [
            "Données des paquets et cartes de vocabulaire créés",
            "Progression de l'apprentissage et précision des quiz",
            "Calendrier de révision par répétition espacée",
            "Paramètres de l'Application (langue, thème, paramètres de voix TTS, etc.)",
            "Compteur d'utilisations de l'IA pour le plan gratuit",
          ],
          deletion: "Ces données sont supprimées lors de la désinstallation de l'Application. Comme il n'y a pas de synchronisation cloud, les données ne peuvent pas être restaurées lors de la réinstallation.",
        },
        server: {
          title: "Nos serveurs",
          content: "L'Application ne nécessite pas de comptes utilisateurs et les données de demande ne sont pas stockées sur nos serveurs après le traitement de génération par IA. Toutes les données utilisateur sont stockées uniquement sur l'appareil.",
        },
        thirdParty: {
          title: "Services tiers",
          content: "Pour la politique de conservation des données de chaque service tiers, veuillez consulter leurs politiques de confidentialité respectives.",
        },
      },
      permissions: {
        title: "6. Autorisations de l'Application",
        intro: "L'Application utilise les autorisations d'appareil suivantes :",
        items: [
          {
            name: "Bibliothèque de photos",
            detail: "Utilisée pour sélectionner des images dans la bibliothèque lors de l'ajout d'images aux cartes de vocabulaire.",
          },
          {
            name: "Appareil photo",
            detail: "Utilisé pour prendre des photos avec l'appareil photo lors de l'ajout d'images aux cartes de vocabulaire.",
          },
        ],
      },
      security: {
        title: "7. Sécurité des données",
        items: [
          "Communication chiffrée : toutes les transmissions de données sont chiffrées via HTTPS/TLS",
          "Principe du moindre privilège : seules les données minimales nécessaires au traitement de génération par IA sont transmises",
          "Priorité au stockage local : toutes les données d'apprentissage sont stockées sur l'appareil, minimisant la transmission vers le cloud",
        ],
        disclaimer: "Cependant, le transfert de données via Internet comporte des risques inhérents et une sécurité totale ne peut être garantie.",
      },
      children: {
        title: "8. Confidentialité des enfants (conformité COPPA)",
        content: "L'Application n'est pas destinée aux enfants de moins de 13 ans et nous ne collectons pas intentionnellement d'informations personnelles auprès d'enfants de moins de 13 ans.",
        action: "Si nous apprenons qu'un enfant de moins de 13 ans utilise l'Application, nous prendrons des mesures raisonnables pour supprimer rapidement toute information connexe. Si vous êtes parent ou tuteur et savez que votre enfant utilise l'Application, veuillez nous contacter à l'adresse ci-dessous.",
      },
      userRights: {
        title: "9. Droits des utilisateurs",
        japan: {
          title: "9-1. Utilisateurs au Japon",
          items: [
            "Demande de divulgation des informations personnelles détenues",
            "Demande de correction, d'ajout ou de suppression du contenu",
            "Demande de suspension d'utilisation ou d'effacement",
          ],
        },
        gdpr: {
          title: "9-2. Utilisateurs EEA/UK (RGPD)",
          items: [
            "Droit d'accès : accès aux données personnelles détenues",
            "Droit de rectification : correction de données personnelles inexactes",
            "Droit à l'effacement (droit à l'oubli) : suppression des données personnelles",
            "Droit à la limitation du traitement : restriction du traitement des données personnelles",
            "Droit à la portabilité des données : réception et transfert des données",
            "Droit d'opposition : opposition au traitement des données personnelles",
          ],
        },
        ccpa: {
          title: "9-3. Utilisateurs de Californie (CCPA)",
          items: [
            "Demande de divulgation des catégories et objectifs des informations personnelles collectées",
            "Demande de suppression des informations personnelles",
            "Opposition à la vente des informations personnelles (nous ne vendons pas d'informations personnelles)",
          ],
        },
        howTo: {
          title: "Comment exercer vos droits",
          content: "Les données stockées localement peuvent être supprimées en désinstallant l'Application. Pour les autres droits, veuillez nous contacter à l'adresse ci-dessous.",
        },
      },
      cookies: {
        title: "10. Cookies et technologies de suivi",
        content: "L'Application ne fonctionne pas dans un navigateur web et n'utilise donc pas de cookies.",
        revenueCat: "Le SDK RevenueCat utilise des ID utilisateurs anonymes mais n'effectue pas de suivi inter-applications à des fins publicitaires.",
        att: "Étant donné que l'Application n'effectue pas le suivi à des fins publicitaires requis par le cadre App Tracking Transparency (ATT) d'Apple, aucune invite ATT n'est affichée.",
      },
      internationalTransfer: {
        title: "11. Transferts internationaux de données",
        content: "Les serveurs des services tiers utilisés par l'Application sont principalement situés aux États-Unis. Lors de l'envoi de données depuis d'autres pays, ces données sont transférées à l'international.",
        note: "Chaque service tiers met en œuvre des mesures appropriées de protection des données (telles que les Clauses Contractuelles Types). Pour plus de détails, veuillez consulter la politique de confidentialité de chaque entreprise.",
      },
      changes: {
        title: "12. Modifications de cette Politique de confidentialité",
        content: "Nous pouvons mettre à jour cette Politique de confidentialité périodiquement. En cas de changements significatifs, nous vous en informerons via des notifications dans l'Application ou en mettant à jour la date de « Dernière mise à jour » en haut de cette page.",
        consent: "Si vous continuez à utiliser l'Application après des modifications, vous êtes réputé avoir accepté la Politique de confidentialité mise à jour.",
      },
      contact: {
        title: "13. Nous contacter",
        content: "Pour toute question sur cette Politique de confidentialité ou pour exercer vos droits, veuillez nous contacter à :",
        email: "E-mail",
        responseTime: "Nous répondrons dans un délai de 30 jours à compter de la réception de votre demande.",
      },
      appStoreLabel: {
        title: "Étiquette de nutrition de confidentialité App Store",
        description: "Informations de divulgation pour la section App Privacy de l'App Store.",
        tableHeaders: ["Type de données", "Collectées ?", "Suivies ?", "Objectif"],
        rows: [
          ["Texte du mot (AI Fill)", "Oui (traitement uniquement)", "Non", "Fonctionnalité de l'App (génération de mots par IA)"],
          ["Identifiants (ID anonyme)", "Oui", "Non", "Fonctionnalité de l'App (gestion des abonnements)"],
          ["Informations d'achat", "Oui", "Non", "Fonctionnalité de l'App (gestion des abonnements)"],
          ["Données d'utilisation", "Oui (appareil uniquement)", "Non", "Fonctionnalité de l'App (progression de l'apprentissage)"],
          ["Nom, contact, localisation, etc.", "Non", "Non", "—"],
        ],
        trackingNote: "« Suivies » = Utilisation des données à des fins publicitaires ou analytiques tierces. Cette Application ne suit aucune donnée à des fins publicitaires.",
        languageNote: "La version japonaise de cette Politique de confidentialité est le texte faisant autorité. Les autres versions ne sont fournies qu'à titre de référence.",
      },
    },
  },
  pt: {
    title: "Política de privacidade",
    lastUpdated: "Última atualização",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Voltar à página de suporte",
    tableOfContents: "Índice",
    sections: {
      intro: {
        title: "1. Introdução",
        content: "WordCards (doravante denominado «o App») é um aplicativo de aprendizado de idiomas que permite criar seus próprios baralhos de cartões de vocabulário e estudar com quizzes e revisão por repetição espaçada. Esta Política de privacidade explica os tipos de informações coletadas ao usar o App, os propósitos de uso, os métodos de gerenciamento e a divulgação a terceiros.",
        consent: "Ao usar o App, você concorda com as práticas descritas nesta Política de privacidade. Se não concordar, por favor, abstenha-se de usar o App.",
      },
      dataCollection: {
        title: "2. Informações que coletamos",
        userProvided: {
          title: "2-1. Informações fornecidas pelo usuário",
          wordData: {
            title: "(a) Dados de solicitação de preenchimento com IA",
            items: [
              "Texto da palavra inserido pelo usuário",
              "Usado apenas para gerar dados da palavra (significado, exemplos, fonética, palavras relacionadas, etimologia)",
              "Momento da coleta: ao tocar no botão AI Fill na tela de adicionar cartão",
              "Destino: enviado para a API OpenAI via Supabase (veja a seção 4 para detalhes)",
              "Para usuários do plano Premium, também usado para gerar ilustrações de aprendizado",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Informações coletadas automaticamente",
          subscription: {
            title: "(a) Informações de assinatura e faturamento",
            items: [
              "Seu plano de assinatura (Free / Pro / Premium)",
              "Informações do recibo de compra da Apple App Store (os dados de pagamento são gerenciados pela Apple; não obtemos números de cartão, etc.)",
            ],
          },
          appUsage: {
            title: "(b) Dados de uso do App (somente no dispositivo)",
            items: [
              "Dados de baralhos e cartões de vocabulário criados",
              "Progresso de aprendizado e precisão do quiz",
              "Calendário de revisão por repetição espaçada",
              "Contador de usos de IA do plano gratuito",
              "Configurações do App (idioma, tema, configurações de voz TTS, etc.)",
            ],
          },
        },
        notCollected: {
          title: "2-3. Informações que não coletamos",
          intro: "O App não coleta as seguintes informações:",
          items: [
            "Informações de identificação pessoal como nome, endereço de e-mail ou endereço físico (nenhum registro de conta necessário)",
            "Dados de localização",
            "Contatos",
            "Dados de saúde e condicionamento físico",
            "Dados de rastreamento para fins publicitários",
          ],
        },
      },
      purpose: {
        title: "3. Propósito do uso das informações",
        intro: "As informações coletadas são usadas apenas para os seguintes propósitos:",
        tableHeaders: ["Tipo de informação", "Propósito de uso"],
        rows: [
          ["Dados de solicitação AI Fill (texto da palavra)", "Geração automática de informações de palavras e ilustrações por IA"],
          ["Informações de assinatura", "Fornecer recursos do plano, verificar assinaturas ativas"],
          ["Dados de uso (local)", "Gerenciamento de baralhos e cartões, exibição do progresso, gerenciamento do calendário de revisão"],
        ],
      },
      thirdParty: {
        title: "4. Compartilhamento de informações com serviços de terceiros",
        intro: "O App usa os seguintes serviços de terceiros para fornecer sua funcionalidade. Os dados são enviados a cada serviço apenas quando o recurso relevante é usado.",
        providers: [
          {
            name: "4-1. Supabase (retransmissor de dados)",
            plan: "Aplicável: ao usar o recurso AI Fill (Pro / Premium)",
            data: "Dados enviados: texto da palavra inserido pelo usuário",
            purpose: "Propósito: retransmissão segura de solicitações de dados de palavras para a API OpenAI",
            retention: "Retenção de dados: os dados de solicitação são usados apenas para retransmissão e não são armazenados permanentemente",
            policyLabel: "Política de privacidade",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. API OpenAI (geração de informações de palavras e ilustrações)",
            plan: "Aplicável: ao usar o recurso AI Fill (Pro / Premium)",
            data: "Dados enviados: texto da palavra inserido pelo usuário",
            purpose: "Propósito: gerar significado, exemplos, fonética, palavras relacionadas, etimologia e ilustrações de aprendizado (somente Premium)",
            retention: "Retenção de dados: não armazenados em nossos servidores após o processamento; sujeito à política de retenção de dados da OpenAI",
            policyLabel: "Política de privacidade",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat (gerenciamento de assinaturas)",
            plan: "Aplicável: todos os usuários (gerenciamento de assinaturas Pro / Premium)",
            data: "Dados enviados: ID de usuário anônimo, recibo de compra da Apple App Store",
            purpose: "Propósito: verificação e gerenciamento do status da assinatura",
            retention: "",
            policyLabel: "Política de privacidade",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "Importante: nunca vendemos, compartilhamos ou fornecemos informações pessoais de usuários a terceiros além dos indicados acima (redes de publicidade, intermediários de dados, etc.).",
      },
      retention: {
        title: "5. Armazenamento e período de retenção de dados",
        local: {
          title: "No dispositivo (armazenamento local)",
          intro: "Os seguintes dados são armazenados apenas no dispositivo do usuário e não são transmitidos para nossos servidores:",
          items: [
            "Dados de baralhos e cartões de vocabulário criados",
            "Progresso de aprendizado e precisão do quiz",
            "Calendário de revisão por repetição espaçada",
            "Configurações do App (idioma, tema, configurações de voz TTS, etc.)",
            "Contador de usos de IA do plano gratuito",
          ],
          deletion: "Esses dados são excluídos ao desinstalar o App. Como não há sincronização na nuvem, os dados não podem ser restaurados ao reinstalar.",
        },
        server: {
          title: "Nossos servidores",
          content: "O App não requer contas de usuário e os dados de solicitação não são armazenados em nossos servidores após o processamento de geração por IA. Todos os dados do usuário são armazenados apenas no dispositivo.",
        },
        thirdParty: {
          title: "Serviços de terceiros",
          content: "Para a política de retenção de dados de cada serviço de terceiros, consulte suas respectivas políticas de privacidade.",
        },
      },
      permissions: {
        title: "6. Permissões do App",
        intro: "O App usa as seguintes permissões do dispositivo:",
        items: [
          {
            name: "Biblioteca de fotos",
            detail: "Usada para selecionar imagens da biblioteca ao adicionar imagens aos cartões de vocabulário.",
          },
          {
            name: "Câmera",
            detail: "Usada para tirar fotos com a câmera ao adicionar imagens aos cartões de vocabulário.",
          },
        ],
      },
      security: {
        title: "7. Segurança dos dados",
        items: [
          "Comunicação criptografada: todas as transmissões de dados são criptografadas via HTTPS/TLS",
          "Princípio do menor privilégio: apenas os dados mínimos necessários para o processamento de geração por IA são transmitidos",
          "Prioridade ao armazenamento local: todos os dados de aprendizado são armazenados no dispositivo, minimizando a transmissão para a nuvem",
        ],
        disclaimer: "No entanto, a transferência de dados pela Internet envolve riscos inerentes e a segurança total não pode ser garantida.",
      },
      children: {
        title: "8. Privacidade infantil (conformidade com COPPA)",
        content: "O App não se destina a crianças menores de 13 anos e não coletamos intencionalmente informações pessoais de crianças menores de 13 anos.",
        action: "Se soubermos que uma criança menor de 13 anos está usando o App, tomaremos medidas razoáveis para excluir prontamente quaisquer informações relacionadas. Se você é pai, mãe ou responsável e sabe que seu filho está usando o App, entre em contato conosco no endereço abaixo.",
      },
      userRights: {
        title: "9. Direitos do usuário",
        japan: {
          title: "9-1. Usuários no Japão",
          items: [
            "Solicitação de divulgação das informações pessoais mantidas",
            "Solicitação de correção, adição ou exclusão do conteúdo",
            "Solicitação de suspensão do uso ou apagamento",
          ],
        },
        gdpr: {
          title: "9-2. Usuários da EEA/UK (RGPD)",
          items: [
            "Direito de acesso: acesso aos dados pessoais mantidos",
            "Direito de retificação: correção de dados pessoais imprecisos",
            "Direito ao apagamento (direito ao esquecimento): exclusão de dados pessoais",
            "Direito à limitação do processamento: restrição do processamento de dados pessoais",
            "Direito à portabilidade dos dados: recebimento e transferência de dados",
            "Direito de oposição: oposição ao processamento de dados pessoais",
          ],
        },
        ccpa: {
          title: "9-3. Usuários da Califórnia (CCPA)",
          items: [
            "Solicitação de divulgação das categorias e propósitos das informações pessoais coletadas",
            "Solicitação de exclusão de informações pessoais",
            "Exclusão da venda de informações pessoais (não vendemos informações pessoais)",
          ],
        },
        howTo: {
          title: "Como exercer seus direitos",
          content: "Os dados armazenados localmente podem ser excluídos desinstalando o App. Para outros direitos, entre em contato conosco no endereço abaixo.",
        },
      },
      cookies: {
        title: "10. Cookies e tecnologias de rastreamento",
        content: "O App não opera em um navegador da web e, portanto, não usa cookies.",
        revenueCat: "O SDK do RevenueCat usa IDs de usuário anônimos, mas não realiza rastreamento entre aplicativos para fins publicitários.",
        att: "Como o App não realiza o rastreamento para fins publicitários exigido pela estrutura App Tracking Transparency (ATT) da Apple, nenhum prompt ATT é exibido.",
      },
      internationalTransfer: {
        title: "11. Transferências internacionais de dados",
        content: "Os servidores dos serviços de terceiros usados pelo App estão localizados principalmente nos Estados Unidos. Ao enviar dados de outros países, esses dados são transferidos internacionalmente.",
        note: "Cada serviço de terceiros implementa medidas adequadas de proteção de dados (como Cláusulas Contratuais Padrão). Para mais detalhes, consulte a política de privacidade de cada empresa.",
      },
      changes: {
        title: "12. Alterações nesta Política de privacidade",
        content: "Podemos atualizar esta Política de privacidade periodicamente. Se ocorrerem mudanças significativas, notificaremos você por meio de notificações no App ou atualizando a data de «Última atualização» no topo desta página.",
        consent: "Se você continuar usando o App após as alterações, considera-se que aceitou a Política de privacidade atualizada.",
      },
      contact: {
        title: "13. Fale conosco",
        content: "Para perguntas sobre esta Política de privacidade ou para exercer seus direitos, entre em contato conosco em:",
        email: "E-mail",
        responseTime: "Responderemos em até 30 dias após o recebimento da sua consulta.",
      },
      appStoreLabel: {
        title: "Rótulo de nutrição de privacidade da App Store",
        description: "Informações de divulgação para a seção App Privacy da App Store.",
        tableHeaders: ["Tipo de dados", "Coletados?", "Rastreados?", "Propósito"],
        rows: [
          ["Texto da palavra (AI Fill)", "Sim (somente processamento)", "Não", "Funcionalidade do App (geração de palavras por IA)"],
          ["Identificadores (ID anônimo)", "Sim", "Não", "Funcionalidade do App (gerenciamento de assinaturas)"],
          ["Informações de compra", "Sim", "Não", "Funcionalidade do App (gerenciamento de assinaturas)"],
          ["Dados de uso", "Sim (somente dispositivo)", "Não", "Funcionalidade do App (progresso de aprendizado)"],
          ["Nome, contato, localização, etc.", "Não", "Não", "—"],
        ],
        trackingNote: "«Rastreados» = Uso de dados para publicidade ou análise de terceiros. Este App não rastreia nenhum dado para fins publicitários.",
        languageNote: "A versão japonesa desta Política de privacidade é o texto oficial. As demais versões são fornecidas apenas como referência.",
      },
    },
  },
  de: {
    title: "Datenschutzrichtlinie",
    lastUpdated: "Zuletzt aktualisiert",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Zurück zur Support-Seite",
    tableOfContents: "Inhaltsverzeichnis",
    sections: {
      intro: {
        title: "1. Einleitung",
        content: "WordCards (nachfolgend 'die App') ist eine Sprachlern-App, mit der Sie eigene Vokabelkarten-Decks erstellen und mit Quizzes sowie Spaced-Repetition-Wiederholung lernen können. Diese Datenschutzrichtlinie erläutert die Arten von Informationen, die bei der Nutzung der App gesammelt werden, die Verwendungszwecke, die Verwaltungsmethoden und die Weitergabe an Dritte.",
        consent: "Durch die Nutzung der App stimmen Sie den in dieser Datenschutzrichtlinie beschriebenen Praktiken zu. Wenn Sie nicht einverstanden sind, verwenden Sie die App bitte nicht.",
      },
      dataCollection: {
        title: "2. Von uns gesammelte Informationen",
        userProvided: {
          title: "2-1. Vom Benutzer bereitgestellte Informationen",
          wordData: {
            title: "(a) KI-Ausfüll-Anfragedaten",
            items: [
              "Vom Benutzer eingegebener Worttext",
              "Wird ausschließlich zur Generierung von Wortdaten verwendet (Bedeutung, Beispiele, Phonetik, verwandte Wörter, Etymologie)",
              "Zeitpunkt der Erfassung: beim Antippen der Schaltfläche \"AI Fill\" auf dem Karte-hinzufügen-Bildschirm",
              "Ziel: wird über Supabase an die OpenAI-API gesendet (siehe Abschnitt 4 für Details)",
              "Für Premium-Plan-Nutzer auch zur Generierung von Lernillustrationen verwendet",
            ],
          },
        },
        autoCollected: {
          title: "2-2. Automatisch gesammelte Informationen",
          subscription: {
            title: "(a) Abonnement- und Abrechnungsinformationen",
            items: [
              "Ihr Abonnementplan (Free / Pro / Premium)",
              "Kaufbeleginformationen aus dem Apple App Store (Zahlungsdaten werden von Apple verwaltet; wir erhalten keine Kartennummern usw.)",
            ],
          },
          appUsage: {
            title: "(b) App-Nutzungsdaten (nur auf dem Gerät)",
            items: [
              "Daten erstellter Decks und Vokabelkarten",
              "Lernfortschritt und Quiz-Genauigkeit",
              "Wiederholungsplan für Spaced Repetition",
              "KI-Nutzungszähler für den kostenlosen Plan",
              "App-Einstellungen (Sprache, Theme, TTS-Stimmeneinstellungen usw.)",
            ],
          },
        },
        notCollected: {
          title: "2-3. Informationen, die wir nicht sammeln",
          intro: "Die App sammelt folgende Informationen nicht:",
          items: [
            "Persönlich identifizierbare Informationen wie Name, E-Mail-Adresse oder Anschrift (keine Kontoregistrierung erforderlich)",
            "Standortdaten",
            "Kontakte",
            "Gesundheits- und Fitnessdaten",
            "Tracking-Daten für Werbezwecke",
          ],
        },
      },
      purpose: {
        title: "3. Zweck der Informationsnutzung",
        intro: "Gesammelte Informationen werden ausschließlich für folgende Zwecke verwendet:",
        tableHeaders: ["Art der Information", "Verwendungszweck"],
        rows: [
          ["KI-Ausfüll-Anfragedaten (Worttext)", "KI-gestützte automatische Generierung von Wortinformationen und Illustrationen"],
          ["Abonnementinformationen", "Bereitstellung planbasierter Funktionen, Überprüfung aktiver Abonnements"],
          ["Nutzungsdaten (lokal)", "Deck- und Kartenverwaltung, Anzeige des Lernfortschritts, Verwaltung des Wiederholungsplans"],
        ],
      },
      thirdParty: {
        title: "4. Weitergabe von Informationen an Drittanbieter",
        intro: "Die App nutzt folgende Drittanbieter-Dienste für ihre Funktionalität. Daten werden jeweils nur bei Nutzung der entsprechenden Funktion an die Dienste gesendet.",
        providers: [
          {
            name: "4-1. Supabase (Datenweiterleitung)",
            plan: "Anwendbar: bei Nutzung der KI-Ausfüll-Funktion (Pro / Premium)",
            data: "Gesendete Daten: vom Benutzer eingegebener Worttext",
            purpose: "Zweck: sichere Weiterleitung von Wortdaten-Anfragen an die OpenAI-API",
            retention: "Datenspeicherung: Anfragedaten werden nur für die Weiterleitung verwendet und nicht dauerhaft gespeichert",
            policyLabel: "Datenschutzrichtlinie",
            policyUrl: "https://supabase.com/privacy",
          },
          {
            name: "4-2. OpenAI-API (Generierung von Wortinformationen und Illustrationen)",
            plan: "Anwendbar: bei Nutzung der KI-Ausfüll-Funktion (Pro / Premium)",
            data: "Gesendete Daten: vom Benutzer eingegebener Worttext",
            purpose: "Zweck: Generierung von Bedeutung, Beispielen, Phonetik, verwandten Wörtern, Etymologie und Lernillustrationen (nur Premium)",
            retention: "Datenspeicherung: werden nach der Verarbeitung nicht auf unseren Servern gespeichert; unterliegen der Datenspeicherungsrichtlinie von OpenAI",
            policyLabel: "Datenschutzrichtlinie",
            policyUrl: "https://openai.com/policies/privacy-policy",
          },
          {
            name: "4-3. RevenueCat (Abonnementverwaltung)",
            plan: "Anwendbar: alle Benutzer (Pro / Premium Abonnementverwaltung)",
            data: "Gesendete Daten: anonyme Benutzer-ID, Apple App Store-Kaufbeleg",
            purpose: "Zweck: Überprüfung und Verwaltung des Abonnementstatus",
            retention: "",
            policyLabel: "Datenschutzrichtlinie",
            policyUrl: "https://www.revenuecat.com/privacy",
          },
        ],
        important: "Wichtig: Wir verkaufen, teilen oder stellen persönliche Nutzerdaten niemals an andere Dritte (Werbenetzwerke, Datenvermittler usw.) als die oben genannten zur Verfügung.",
      },
      retention: {
        title: "5. Datenspeicherung und Aufbewahrungsfristen",
        local: {
          title: "Auf dem Gerät (lokaler Speicher)",
          intro: "Folgende Daten werden ausschließlich auf dem Gerät des Benutzers gespeichert und nicht an unsere Server übertragen:",
          items: [
            "Daten erstellter Decks und Vokabelkarten",
            "Lernfortschritt und Quiz-Genauigkeit",
            "Wiederholungsplan für Spaced Repetition",
            "App-Einstellungen (Sprache, Theme, TTS-Stimmeneinstellungen usw.)",
            "KI-Nutzungszähler für den kostenlosen Plan",
          ],
          deletion: "Diese Daten werden beim Deinstallieren der App gelöscht. Da keine Cloud-Synchronisation stattfindet, können die Daten bei einer Neuinstallation nicht wiederhergestellt werden.",
        },
        server: {
          title: "Unsere Server",
          content: "Die App benötigt keine Benutzerkonten und Anfragedaten werden nach der KI-Generierungsverarbeitung nicht auf unseren Servern gespeichert. Alle Benutzerdaten werden ausschließlich auf dem Gerät gespeichert.",
        },
        thirdParty: {
          title: "Drittanbieter-Dienste",
          content: "Die Datenspeicherungsrichtlinien der einzelnen Drittanbieter-Dienste entnehmen Sie bitte deren jeweiligen Datenschutzrichtlinien.",
        },
      },
      permissions: {
        title: "6. App-Berechtigungen",
        intro: "Die App verwendet folgende Geräteberechtigungen:",
        items: [
          {
            name: "Fotomediathek",
            detail: "Wird verwendet, um beim Hinzufügen von Bildern zu Vokabelkarten Bilder aus der Mediathek auszuwählen.",
          },
          {
            name: "Kamera",
            detail: "Wird verwendet, um beim Hinzufügen von Bildern zu Vokabelkarten Fotos mit der Kamera aufzunehmen.",
          },
        ],
      },
      security: {
        title: "7. Datensicherheit",
        items: [
          "Verschlüsselte Kommunikation: alle Datenübertragungen werden über HTTPS/TLS verschlüsselt",
          "Prinzip der minimalen Berechtigung: es werden nur die für die KI-Generierungsverarbeitung notwendigen Mindestdaten übertragen",
          "Lokale Speicherpriorität: alle Lerndaten werden auf dem Gerät gespeichert, wodurch die Datenübertragung in die Cloud minimiert wird",
        ],
        disclaimer: "Die Datenübertragung über das Internet birgt jedoch inhärente Risiken, und vollständige Sicherheit kann nicht garantiert werden.",
      },
      children: {
        title: "8. Datenschutz für Kinder (COPPA-Konformität)",
        content: "Die App ist nicht für Kinder unter 13 Jahren bestimmt und wir sammeln nicht absichtlich persönliche Informationen von Kindern unter 13 Jahren.",
        action: "Wenn wir erfahren, dass ein Kind unter 13 Jahren die App nutzt, werden wir angemessene Schritte unternehmen, um alle damit zusammenhängenden Informationen umgehend zu löschen. Wenn Sie Elternteil oder Erziehungsberechtigter sind und wissen, dass Ihr Kind die App nutzt, kontaktieren Sie uns bitte unter der unten angegebenen Adresse.",
      },
      userRights: {
        title: "9. Benutzerrechte",
        japan: {
          title: "9-1. Benutzer in Japan",
          items: [
            "Antrag auf Auskunft über gespeicherte personenbezogene Daten",
            "Antrag auf Berichtigung, Ergänzung oder Löschung des Inhalts",
            "Antrag auf Nutzungseinstellung oder Löschung",
          ],
        },
        gdpr: {
          title: "9-2. EEA/UK-Benutzer (DSGVO)",
          items: [
            "Auskunftsrecht: Zugang zu gespeicherten personenbezogenen Daten",
            "Berichtigungsrecht: Korrektur ungenauer personenbezogener Daten",
            "Recht auf Löschung (Recht auf Vergessenwerden): Löschung personenbezogener Daten",
            "Recht auf Einschränkung der Verarbeitung: Einschränkung der Verarbeitung personenbezogener Daten",
            "Recht auf Datenübertragbarkeit: Empfang und Übertragung von Daten",
            "Widerspruchsrecht: Widerspruch gegen die Verarbeitung personenbezogener Daten",
          ],
        },
        ccpa: {
          title: "9-3. Benutzer in Kalifornien (CCPA)",
          items: [
            "Antrag auf Auskunft über Kategorien und Zwecke der gesammelten personenbezogenen Daten",
            "Antrag auf Löschung personenbezogener Daten",
            "Widerspruch gegen den Verkauf personenbezogener Daten (wir verkaufen keine personenbezogenen Daten)",
          ],
        },
        howTo: {
          title: "So üben Sie Ihre Rechte aus",
          content: "Lokal gespeicherte Daten können durch Deinstallation der App gelöscht werden. Für andere Rechte kontaktieren Sie uns bitte unter der unten angegebenen Adresse.",
        },
      },
      cookies: {
        title: "10. Cookies und Tracking-Technologien",
        content: "Die App läuft nicht in einem Webbrowser und verwendet daher keine Cookies.",
        revenueCat: "Das RevenueCat SDK verwendet anonyme Benutzer-IDs, führt jedoch kein App-übergreifendes Tracking für Werbezwecke durch.",
        att: "Da die App das von Apples App Tracking Transparency (ATT)-Framework geforderte Tracking für Werbezwecke nicht durchführt, wird keine ATT-Aufforderung angezeigt.",
      },
      internationalTransfer: {
        title: "11. Internationale Datenübertragungen",
        content: "Die Server der von der App verwendeten Drittanbieter-Dienste befinden sich hauptsächlich in den Vereinigten Staaten. Beim Senden von Daten aus anderen Ländern werden diese Daten international übertragen.",
        note: "Jeder Drittanbieter-Dienst implementiert geeignete Datenschutzmaßnahmen (z. B. Standardvertragsklauseln). Weitere Details entnehmen Sie bitte der Datenschutzrichtlinie des jeweiligen Unternehmens.",
      },
      changes: {
        title: "12. Änderungen dieser Datenschutzrichtlinie",
        content: "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Bei wesentlichen Änderungen werden wir Sie über In-App-Benachrichtigungen oder durch Aktualisierung des Datums 'Zuletzt aktualisiert' oben auf dieser Seite informieren.",
        consent: "Wenn Sie die App nach Änderungen weiterhin nutzen, gelten Sie als der aktualisierten Datenschutzrichtlinie zugestimmt.",
      },
      contact: {
        title: "13. Kontakt",
        content: "Bei Fragen zu dieser Datenschutzrichtlinie oder zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter:",
        email: "E-Mail",
        responseTime: "Wir werden innerhalb von 30 Tagen nach Eingang Ihrer Anfrage antworten.",
      },
      appStoreLabel: {
        title: "App Store Datenschutz-Nährwertkennzeichnung",
        description: "Offenlegungsinformationen für den Bereich App Privacy im App Store.",
        tableHeaders: ["Datentyp", "Gesammelt?", "Verfolgt?", "Zweck"],
        rows: [
          ["Worttext (AI Fill)", "Ja (nur Verarbeitung)", "Nein", "App-Funktionalität (KI-Wortgenerierung)"],
          ["Kennungen (anonyme ID)", "Ja", "Nein", "App-Funktionalität (Abonnementverwaltung)"],
          ["Kaufinformationen", "Ja", "Nein", "App-Funktionalität (Abonnementverwaltung)"],
          ["Nutzungsdaten", "Ja (nur Gerät)", "Nein", "App-Funktionalität (Lernfortschritt)"],
          ["Name, Kontakt, Standort usw.", "Nein", "Nein", "—"],
        ],
        trackingNote: "'Verfolgt' = Verwendung von Daten für Werbe- oder Analysezwecke Dritter. Diese App verfolgt keine Daten für Werbezwecke.",
        languageNote: "Die japanische Version dieser Datenschutzrichtlinie ist der maßgebliche Text. Andere Sprachversionen dienen nur als Referenz.",
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
export default function WordCardsPrivacyPolicyPage() {
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
              alt="WordCards"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">WordCards</h1>
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
            href="/support/wordcards"
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
                <h4 className="font-medium text-gray-700 mb-2">{s.dataCollection.userProvided.wordData.title}</h4>
                <BulletList items={s.dataCollection.userProvided.wordData.items} />
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
