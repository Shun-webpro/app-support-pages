"use client";

import { useState } from "react";
import Image from "next/image";
import appIcon from "@/app/images/voka_king.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED = "2026년 2월 17일 / February 17, 2026";

// ========================================
// 言語定義
// ========================================
type Language = "ko" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧🇦🇺" },
];

// ========================================
// 翻訳データ
// ========================================
const TRANSLATIONS: Record<Language, {
  title: string;
  lastUpdated: string;
  sections: {
    scope: { title: string; content: string; note: string };
    appInfo: {
      title: string;
      items: { label: string; value: string }[];
    };
    dataCollection: {
      title: string;
      description: string;
      notCollected: {
        title: string;
        description: string;
        items: string[];
      };
      minimalCollection: {
        title: string;
        description: string;
        note: string;
      };
      indirectTransmission: {
        title: string;
        description: string;
        items: string[];
      };
    };
    localStorage: {
      title: string;
      description: string;
      data: {
        title: string;
        items: string[];
      };
      protection: {
        title: string;
        content: string;
      };
    };
    purpose: {
      title: string;
      description: string;
      items: string[];
      notes: string[];
    };
    thirdParty: {
      title: string;
      description: string;
      providers: {
        title: string;
        items: { name: string; data: string; purpose: string; notes?: string[] }[];
      };
      legal: {
        title: string;
        content: string;
      };
    };
    sdks: {
      title: string;
      description: string;
      items: string[];
      note: string;
    };
    advertising: {
      title: string;
      description: string;
      items: string[];
      note: string;
    };
    retention: {
      title: string;
      period: {
        title: string;
        description: string;
        items: { name: string; detail: string }[];
      };
      accountDeletion: {
        title: string;
        content: string;
      };
      resetFunction: {
        title: string;
        content: string;
      };
    };
    userRights: {
      title: string;
      description: string;
      items: { name: string; detail: string }[];
    };
    notifications: {
      title: string;
      content: string;
      note: string;
    };
    security: {
      title: string;
      description: string;
      items: string[];
    };
    minors: {
      title: string;
      content: string;
      note: string;
    };
    crossBorder: {
      title: string;
      content: string;
    };
    changes: {
      title: string;
      content: string;
      publishLocation: string;
    };
    contact: {
      title: string;
      content: string;
    };
  };
}> = {
  ko: {
    title: "개인정보 처리방침",
    lastUpdated: "최종 업데이트",
    sections: {
      scope: {
        title: "2. 적용 범위",
        content: "본 개인정보 처리방침은 본 앱의 이용에 따라 수집·전송·저장·이용되는 정보의 취급에 적용됩니다.",
        note: "본 앱에서 링크되는 외부 사이트나 외부 서비스의 취급에 대해서는 해당 사업자의 정책이 적용됩니다.",
      },
      appInfo: {
        title: "3. 본 앱의 기본 정보",
        items: [
          { label: "앱 이름", value: "VOKA KING" },
          { label: "Bundle ID", value: "com.vokaking.learn (iOS/Android 공통)" },
          { label: "버전", value: "1.0.0" },
          { label: "지원 플랫폼", value: "iOS / Android" },
          { label: "앱 유형", value: "영어 어휘 학습 앱 (오프라인 우선)" },
        ],
      },
      dataCollection: {
        title: "4. 수집하는 정보 (수집 여부·범위)",
        description: "본 앱은 사용자의 이메일 주소나 계정 정보 등의 개인정보를 원칙적으로 수집하지 않습니다. 수집·전송될 수 있는 정보는 다음과 같습니다.",
        notCollected: {
          title: "4.1 수집하지 않는 정보 (앱에서 수집하지 않음)",
          description: "본 앱은 다음 정보를 앱에서 수집·저장하지 않습니다.",
          items: [
            "이메일 주소 (인증 기능 없음)",
            "사용자 이름 (계정 기능 없음)",
            "프로필 정보",
            "위치 정보 (위치 정보 API 사용 없음)",
            "광고 식별자 (IDFA / Google Advertising ID: 광고 SDK 미도입으로 사용 없음)",
            "쿠키 (앱 내 쿠키 사용 없음)",
            "분석용 행동 추적 데이터 (Firebase / Google Analytics 등 미도입)",
          ],
        },
        minimalCollection: {
          title: "4.2 최소한으로 수집하는 정보 (기기 내 판정)",
          description: "OS 종류(iOS/Android) 판정만 수행",
          note: "※ 기종명·기기 고유 ID 등의 식별 정보는 수집하지 않습니다.",
        },
        indirectTransmission: {
          title: "4.3 간접적으로 전송될 수 있는 정보 (통신 시 수반)",
          description: "본 앱이 외부 API에 통신할 때, 통신의 특성상 다음이 외부 서비스에 전송될 수 있습니다.",
          items: [
            "IP 주소 (예: WorldTimeAPI, Google Translate TTS에 대한 요청 시 암묵적으로 전송될 수 있음)",
          ],
        },
      },
      localStorage: {
        title: "5. 기기 내에 저장되는 데이터 (로컬 저장)",
        description: "본 앱은 오프라인 우선으로, 학습 관련 데이터의 대부분을 사용자 기기 내(SQLite 등)에만 저장하며, 당사의 서버로 전송·저장하지 않습니다(클라우드 동기화 없음).",
        data: {
          title: "5.1 로컬에 저장되는 주요 데이터",
          items: [
            "단어 체크 상태·복습 플래그",
            "퀴즈 답변 이력 (점수, 정오, 날짜)",
            "뱃지 진행 상황 (스테이지 0~4, 취득일·기한)",
            "사용자 생성 단어장 (단어·의미·유의어·반의어·메모)",
            "앱 설정 (음성 성별·지역, 효과음 ON/OFF, 리마인더 설정 등)",
            "구독 상태 캐시 (후술)",
          ],
        },
        protection: {
          title: "5.2 저장 위치 및 보호",
          content: "이 데이터들은 OS의 앱 샌드박스 내에 저장되며, OS의 접근 제어에 의해 보호됩니다.",
        },
      },
      purpose: {
        title: "6. 정보의 이용 목적",
        description: "본 앱이 취급하는 정보(주로 기기 내 데이터 및 통신에 수반되는 정보)의 이용 목적은 다음과 같습니다.",
        items: [
          "서비스 제공·기능 구현 (학습 기능, 퀴즈 기능, 음성 읽기 등)",
          "학습 데이터 저장 (기기 내 SQLite에 저장. 클라우드 동기화 없음)",
          "부정 이용 방지 (WorldTimeAPI 등을 이용한 시간 동기화로 일일 퀴즈 횟수 제한 실시)",
          "알림 전송 (로컬 알림만: 예 9:00 / 19:00 복습 리마인더)",
          "결제 처리·구독 상태 확인 (RevenueCat을 통해 Apple/Google 결제 상태 관리)",
        ],
        notes: [
          "※ 계정 관리: 계정 기능이 없으므로 수행하지 않습니다.",
          "※ 서비스 개선·분석: 분석 SDK 미도입으로 사용자 행동을 분석 목적으로 추적하지 않습니다.",
          "※ 광고 전달: 광고 SDK 미도입으로 수행하지 않습니다.",
        ],
      },
      thirdParty: {
        title: "7. 제3자 제공·외부 전송 (외부 서비스 이용)",
        description: "본 앱은 다음의 외부 서비스를 이용할 수 있습니다. 이용에 따라 필요 최소한의 정보가 각 서비스에 전송될 수 있습니다.",
        providers: {
          title: "7.1 제공처·제공 정보·목적",
          items: [
            {
              name: "RevenueCat",
              data: "구매 정보, 구독 상태, (RevenueCat/OS가 사용하는) 기기 식별자 등",
              purpose: "구독 관리·결제 처리 보조, 구매 상태 검증",
            },
            {
              name: "Apple / Google (App Store / Google Play)",
              data: "결제 정보 (플랫폼 경유)",
              purpose: "앱 내 결제 처리, 구독 관리",
              notes: ["※ 당사는 신용카드 번호 등의 결제 정보를 보유하지 않습니다."],
            },
            {
              name: "Google Translate TTS (API)",
              data: "한국어 텍스트 문자열",
              purpose: "음성 합성 (발음 생성)",
              notes: [
                "※ 본 기능은 외부 서비스로의 전송을 수반하므로 오프라인 환경에서는 사용할 수 없는 경우가 있습니다.",
                "※ (참고) '비공식 API'로서의 이용 형태가 포함되는 경우, 제공자의 이용 약관·사양 변경 등으로 동작이나 제공 범위가 변경될 수 있습니다.",
              ],
            },
            {
              name: "WorldTimeAPI",
              data: "통신에 수반되는 IP 주소 등 (암묵적)",
              purpose: "시간 동기화 (일일 퀴즈 횟수 제한 등의 부정 방지)",
            },
          ],
        },
        legal: {
          title: "7.2 법령에 따른 제공",
          content: "법령에 따라 공개 의무가 발생한 경우, 또는 법원·행정기관 등으로부터 적법한 요청을 받은 경우, 필요한 범위에서 정보를 공개할 수 있습니다.",
        },
      },
      sdks: {
        title: "8. 이용하는 주요 SDK·라이브러리",
        description: "본 앱에서는 다음의 SDK/라이브러리를 이용합니다(용도는 아래와 같습니다).",
        items: [
          "expo-notifications: 로컬 알림 (복습 리마인더)",
          "expo-speech: 텍스트 읽기 (영어)",
          "expo-audio: 효과음·음성 재생",
          "expo-sqlite: 로컬 데이터베이스",
          "expo-file-system: TTS 음성 캐시, 데이터 내보내기",
          "expo-sharing: 데이터 내보내기 공유",
          "expo-print: PDF 생성",
          "expo-store-review: App Store 리뷰 촉진",
          "@react-native-community/netinfo: 네트워크 상태 감지",
          "Google Translate TTS API: 한국어 음성 합성",
          "WorldTimeAPI: 서버 시간 동기화",
          "RevenueCat (react-native-purchases v9.7.5): 구독 관리",
        ],
        note: "※ Firebase / Google Analytics / AdMob / Stripe는 도입하지 않았습니다.",
      },
      advertising: {
        title: "9. 광고·추적 (쿠키/광고 ID 등)",
        description: "본 앱은 광고 SDK를 도입하지 않았으며, 다음을 사용하지 않습니다.",
        items: [
          "쿠키: 사용 없음",
          "IDFA: 사용 없음",
          "Google Advertising ID (AAID): 사용 없음",
          "추적형 광고: 없음",
        ],
        note: "(참고) ITSAppUsesNonExemptEncryption: false",
      },
      retention: {
        title: "10. 데이터의 보존 기간·삭제",
        period: {
          title: "10.1 보존 기간",
          description: "기기 내 데이터는 원칙적으로 사용자 기기에 저장되며, 다음의 보존 기간으로 관리됩니다.",
          items: [
            { name: "학습 진행·뱃지", detail: "앱 삭제 시까지 (기기 로컬)" },
            { name: "퀴즈 이력 (일별)", detail: "7일간 (quiz_attempts_daily 테이블에서 자동 정리)" },
            { name: "퀴즈 상세 이력", detail: "앱 삭제 시까지" },
            { name: "커스텀 단어장", detail: "앱 삭제 시까지" },
            { name: "TTS 음성 캐시", detail: "기기의 캐시 영역에 저장 (OS가 관리)" },
            { name: "구독 상태 캐시", detail: "앱 삭제 시까지 (오프라인 유예: 24시간)" },
            { name: "앱 설정", detail: "앱 삭제 시까지" },
          ],
        },
        accountDeletion: {
          title: "10.2 계정 삭제",
          content: "본 앱은 계정 기능이 없으므로 계정 삭제 절차가 없습니다. 앱을 제거하면 기기 내 데이터가 삭제됩니다(OS 사양에 따라 다름).",
        },
        resetFunction: {
          title: "10.3 앱 내 초기화 기능",
          content: "본 앱에는 설정 화면에서 '학습 데이터 초기화'를 수행하는 기능이 있습니다. 이를 통해 퀴즈 이력·단어 상태·뱃지 등을 초기화할 수 있습니다.",
        },
      },
      userRights: {
        title: "11. 사용자의 권리 (공개·정정·삭제 등)",
        description: "본 앱은 주로 기기 내에 데이터를 저장하므로, 사용자는 앱 내 기능을 통해 자신의 데이터를 관리할 수 있습니다.",
        items: [
          { name: "데이터 공개", detail: "내보내기 기능으로 Word / PDF / JSON 형식으로 출력 가능" },
          { name: "정정", detail: "사용자가 앱 내에서 직접 편집 가능" },
          { name: "삭제", detail: "설정 > 학습 데이터 초기화, 또는 앱 삭제로 대응" },
          { name: "이용 중지", detail: "앱 제거로 대응" },
          { name: "동의 철회 (알림 허가)", detail: "OS 설정에서 변경·취소 가능" },
          { name: "동의 철회 (구독)", detail: "Apple / Google 관리 화면에서 해지 가능" },
        ],
      },
      notifications: {
        title: "12. 알림 (로컬 알림)",
        content: "본 앱은 복습 리마인더 등의 목적으로 로컬 알림을 이용합니다(예: 9:00/19:00).",
        note: "알림 수신은 사용자의 허가에 따르며, 허가 변경은 OS 설정에서 할 수 있습니다.",
      },
      security: {
        title: "13. 보안",
        description: "본 앱은 정보 유출·분실·훼손 등을 방지하기 위해 합리적인 안전 관리 조치를 취합니다.",
        items: [
          "외부 API 통신은 HTTPS(SSL/TLS) 사용",
          "기기 내 데이터는 OS의 앱 샌드박스로 보호",
          "데이터 암호화는 OS 수준의 파일 암호화 등의 메커니즘에 의존",
          "결제·구독 관리는 RevenueCat 및 Apple/Google의 메커니즘에 의존",
        ],
      },
      minors: {
        title: "14. 미성년자의 이용",
        content: "본 앱은 연령 확인 기능을 구현하지 않았습니다. 13세 미만의 이용 가능 여부나 보호자 동의의 취급은 향후 제공 형태·각 스토어의 설정(콘텐츠 등급 등)에 따라 변경될 수 있습니다.\n본 앱은 개인정보를 거의 수집하지 않지만, 미성년자의 이용이 예상되는 경우 보호자께서 본 정책을 확인한 후 이용해 주세요.",
        note: "(참고) 아동용 앱으로 제공하는 경우, COPPA 등의 법령·각 스토어 정책에 따른 대응이 필요할 수 있습니다.",
      },
      crossBorder: {
        title: "15. 국외 이전 (국경간 이전)",
        content: "외부 서비스(RevenueCat, Apple/Google, WorldTimeAPI, Google Translate TTS 등)가 국외 서버에서 정보를 처리하는 경우, 사용자의 정보가 국외에서 취급될 수 있습니다. 자세한 내용은 각 서비스 제공자의 개인정보 처리방침을 확인해 주세요.",
      },
      changes: {
        title: "16. 개인정보 처리방침의 변경",
        content: "본 정책의 내용은 법령이나 서비스 내용의 변경 등에 따라 개정될 수 있습니다. 개정 후의 내용은 본 앱 내 또는 웹상의 게재처에서 공지하며, 개정일을 명기합니다. 중요한 변경이 있는 경우, 가능한 범위에서 앱 내 표시나 스토어 업데이트 정보 등을 통해 알려드립니다.",
        publishLocation: "게재 장소(예정): 본 페이지",
      },
      contact: {
        title: "문의하기",
        content: "본 개인정보 처리방침에 관한 질문이나 의견이 있으시면 아래 연락처로 문의해 주세요:",
      },
    },
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    sections: {
      scope: {
        title: "2. Scope of Application",
        content: "This Privacy Policy applies to the handling of information that is collected, transmitted, stored, and used in connection with the use of this App.",
        note: "Please note that the privacy policies of the respective operators apply to external sites and services linked from this App.",
      },
      appInfo: {
        title: "3. Basic App Information",
        items: [
          { label: "App Name", value: "VOKA KING" },
          { label: "Bundle ID", value: "com.vokaking.learn (iOS/Android)" },
          { label: "Version", value: "1.0.0" },
          { label: "Supported Platforms", value: "iOS / Android" },
          { label: "App Type", value: "English Vocabulary Learning App (Offline-First)" },
        ],
      },
      dataCollection: {
        title: "4. Information Collected (Scope)",
        description: "This App does not, in principle, collect personal information such as email addresses or account information. The information that may be collected or transmitted is as follows.",
        notCollected: {
          title: "4.1 Information Not Collected",
          description: "This App does not collect or store the following information.",
          items: [
            "Email address (no authentication feature)",
            "Username (no account feature)",
            "Profile information",
            "Location data (no location API usage)",
            "Advertising identifiers (IDFA / Google Advertising ID: not used as no ad SDK is implemented)",
            "Cookies (no cookie usage within the app)",
            "Behavioral tracking data for analytics (Firebase / Google Analytics etc. not implemented)",
          ],
        },
        minimalCollection: {
          title: "4.2 Minimally Collected Information (On-Device Detection)",
          description: "OS type (iOS/Android) detection only",
          note: "*Device model, unique device ID, and other identifying information are not collected.",
        },
        indirectTransmission: {
          title: "4.3 Indirectly Transmitted Information (Accompanying Communication)",
          description: "When this App communicates with external APIs, the following may be transmitted to external services due to the nature of the communication.",
          items: [
            "IP address (e.g., may be implicitly transmitted when making requests to WorldTimeAPI, Google Translate TTS)",
          ],
        },
      },
      localStorage: {
        title: "5. Data Stored on Device (Local Storage)",
        description: "As an offline-first app, most learning-related data is stored only on the user's device (SQLite, etc.) and is not transmitted to or stored on our servers (no cloud sync).",
        data: {
          title: "5.1 Main Data Stored Locally",
          items: [
            "Word check status and review flags",
            "Quiz answer history (scores, correct/incorrect, dates)",
            "Badge progress (stages 0-4, acquisition date, expiration)",
            "User-created word lists (words, meanings, synonyms, antonyms, notes)",
            "App settings (voice gender/region, sound effects ON/OFF, reminder settings, etc.)",
            "Subscription status cache (described below)",
          ],
        },
        protection: {
          title: "5.2 Storage Location and Protection",
          content: "This data is stored within the OS app sandbox and protected by OS access controls.",
        },
      },
      purpose: {
        title: "6. Purpose of Information Use",
        description: "The purposes of using information handled by this App (primarily on-device data and information accompanying communication) are as follows.",
        items: [
          "Service provision and feature implementation (learning features, quiz features, text-to-speech, etc.)",
          "Storage of learning data (stored in on-device SQLite; no cloud sync)",
          "Prevention of misuse (daily quiz attempt limits enforced through time synchronization using WorldTimeAPI, etc.)",
          "Notification delivery (local notifications only: e.g., review reminders at 9:00 / 19:00)",
          "Payment processing and subscription status verification (managing Apple/Google billing status via RevenueCat)",
        ],
        notes: [
          "*Account management: Not performed as there is no account feature.",
          "*Service improvement/analysis: No user behavior tracking is performed for analysis purposes as no analytics SDK is implemented.",
          "*Ad delivery: Not performed as no ad SDK is implemented.",
        ],
      },
      thirdParty: {
        title: "7. Third-Party Disclosure / External Transmission",
        description: "This App may use the following external services. In connection with their use, minimal necessary information may be transmitted to each service.",
        providers: {
          title: "7.1 Recipients, Information Provided, and Purposes",
          items: [
            {
              name: "RevenueCat",
              data: "Purchase information, subscription status, device identifiers (used by RevenueCat/OS), etc.",
              purpose: "Subscription management, payment processing assistance, purchase status verification",
            },
            {
              name: "Apple / Google (App Store / Google Play)",
              data: "Payment information (via platform)",
              purpose: "In-app purchase processing, subscription management",
              notes: ["*We do not retain credit card numbers or other payment information."],
            },
            {
              name: "Google Translate TTS (API)",
              data: "Korean text strings",
              purpose: "Speech synthesis (pronunciation generation)",
              notes: [
                "*This feature involves transmission to an external service and may not be available in offline environments.",
                "*(Note) If the usage includes an \"unofficial API\" format, behavior and availability may change due to the provider's terms of service or specification changes.",
              ],
            },
            {
              name: "WorldTimeAPI",
              data: "IP address, etc. accompanying communication (implicit)",
              purpose: "Time synchronization (fraud prevention for daily quiz limits, etc.)",
            },
          ],
        },
        legal: {
          title: "7.2 Disclosure Based on Laws",
          content: "Information may be disclosed to the extent necessary when disclosure obligations arise under applicable laws, or when lawful requests are received from courts, administrative agencies, etc.",
        },
      },
      sdks: {
        title: "8. Main SDKs and Libraries Used",
        description: "This App uses the following SDKs/libraries (purposes are as described below).",
        items: [
          "expo-notifications: Local notifications (review reminders)",
          "expo-speech: Text-to-speech (English)",
          "expo-audio: Sound effects and audio playback",
          "expo-sqlite: Local database",
          "expo-file-system: TTS audio cache, data export",
          "expo-sharing: Data export sharing",
          "expo-print: PDF generation",
          "expo-store-review: App Store review prompts",
          "@react-native-community/netinfo: Network status detection",
          "Google Translate TTS API: Korean speech synthesis",
          "WorldTimeAPI: Server time synchronization",
          "RevenueCat (react-native-purchases v9.7.5): Subscription management",
        ],
        note: "*Firebase / Google Analytics / AdMob / Stripe are not implemented.",
      },
      advertising: {
        title: "9. Advertising and Tracking (Cookies/Ad IDs, etc.)",
        description: "This App does not implement any ad SDK and does not use the following.",
        items: [
          "Cookies: Not used",
          "IDFA: Not used",
          "Google Advertising ID (AAID): Not used",
          "Tracking-based advertising: None",
        ],
        note: "(Reference) ITSAppUsesNonExemptEncryption: false",
      },
      retention: {
        title: "10. Data Retention Period and Deletion",
        period: {
          title: "10.1 Retention Period",
          description: "On-device data is stored on the user's device and managed according to the following retention periods.",
          items: [
            { name: "Learning progress / Badges", detail: "Until app deletion (device local)" },
            { name: "Quiz history (daily)", detail: "7 days (auto-cleanup in quiz_attempts_daily table)" },
            { name: "Detailed quiz history", detail: "Until app deletion" },
            { name: "Custom word lists", detail: "Until app deletion" },
            { name: "TTS audio cache", detail: "Stored in device cache area (managed by OS)" },
            { name: "Subscription status cache", detail: "Until app deletion (offline grace period: 24 hours)" },
            { name: "App settings", detail: "Until app deletion" },
          ],
        },
        accountDeletion: {
          title: "10.2 Account Deletion",
          content: "This App has no account feature, so there is no account deletion procedure. Uninstalling the app will delete on-device data (depends on OS specifications).",
        },
        resetFunction: {
          title: "10.3 In-App Reset Function",
          content: "This App has a \"Learning Data Reset\" function available from the settings screen. This allows you to initialize quiz history, word status, badges, etc.",
        },
      },
      userRights: {
        title: "11. User Rights (Disclosure, Correction, Deletion, etc.)",
        description: "Since this App primarily stores data on the device, users can manage their own data through in-app features.",
        items: [
          { name: "Data disclosure", detail: "Export in Word / PDF / JSON format via export function" },
          { name: "Correction", detail: "Users can edit directly within the app" },
          { name: "Deletion", detail: "Settings > Learning Data Reset, or uninstall the app" },
          { name: "Cessation of use", detail: "Uninstall the app" },
          { name: "Consent withdrawal (Notifications)", detail: "Can be changed/revoked from OS settings" },
          { name: "Consent withdrawal (Subscription)", detail: "Can be cancelled from Apple / Google management screen" },
        ],
      },
      notifications: {
        title: "12. Notifications (Local Notifications)",
        content: "This App uses local notifications for purposes such as review reminders (e.g., 9:00/19:00).",
        note: "Receiving notifications is based on user permission, and permission can be changed from OS settings.",
      },
      security: {
        title: "13. Security",
        description: "This App implements reasonable security measures to prevent information leakage, loss, and damage.",
        items: [
          "External API communication uses HTTPS (SSL/TLS)",
          "On-device data is protected by the OS app sandbox",
          "Data encryption relies on OS-level file encryption mechanisms",
          "Billing and subscription management relies on RevenueCat and Apple/Google mechanisms",
        ],
      },
      minors: {
        title: "14. Use by Minors",
        content: "This App does not implement age verification. Whether children under 13 can use the app and how parental consent is handled may change depending on future distribution methods and store settings (content ratings, etc.).\nWhile this App collects almost no personal information, if minors are expected to use it, we ask that guardians review this policy before use.",
        note: "(Note) If provided as a children's app, compliance with laws such as COPPA and store policies may be required.",
      },
      crossBorder: {
        title: "15. Cross-Border Transfer",
        content: "If external services (RevenueCat, Apple/Google, WorldTimeAPI, Google Translate TTS, etc.) process information on servers outside your country, your information may be handled overseas. Please refer to each service provider's privacy policy for details.",
      },
      changes: {
        title: "16. Changes to Privacy Policy",
        content: "The contents of this policy may be revised in response to changes in laws or service content. The revised content will be announced within this App or on the web, with the revision date clearly stated. For significant changes, we will make efforts to notify users through in-app displays or store update information.",
        publishLocation: "Publication location (planned): This page",
      },
      contact: {
        title: "Contact Us",
        content: "If you have any questions or comments regarding this Privacy Policy, please contact us at:",
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
              ? "bg-blue-700 text-white"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
        <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
        {title}
      </h2>
      <div className="pl-3">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 mb-4">
      <h3 className="text-base font-semibold mb-2 text-gray-700">{title}</h3>
      <div className="pl-2">{children}</div>
    </div>
  );
}

function InfoCard({
  items,
}: {
  items: { label: string; value: string | React.ReactNode }[];
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex flex-wrap gap-2">
          <span className="font-medium text-gray-600">{item.label}:</span>
          <span className="text-gray-800">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function DataList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-red-500 mt-1 flex-shrink-0">&#x2715;</span>
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
          <span className="text-green-500 mt-1 flex-shrink-0">&#x2713;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-gray-700">
          <span className="text-blue-500 mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailList({
  items,
}: {
  items: { name: string; detail: string }[];
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400"
        >
          <p className="font-medium text-blue-800">{item.name}</p>
          <p className="text-blue-700 text-sm mt-1">{item.detail}</p>
        </div>
      ))}
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

function ProviderCard({
  name,
  data,
  purpose,
  notes,
}: {
  name: string;
  data: string;
  purpose: string;
  notes?: string[];
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
      <h4 className="font-semibold text-gray-800 mb-2">{name}</h4>
      <div className="space-y-1 text-sm">
        <p className="text-gray-700">
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium mr-2">Data</span>
          {data}
        </p>
        <p className="text-gray-700">
          <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2">Purpose</span>
          {purpose}
        </p>
      </div>
      {notes && notes.length > 0 && (
        <div className="mt-2 space-y-1">
          {notes.map((note, i) => (
            <p key={i} className="text-xs text-gray-500">{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function StoreButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 my-6">
      <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <p className="text-xs opacity-80">Download on the</p>
          <p className="text-sm font-semibold">App Store</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
        </svg>
        <div className="text-left">
          <p className="text-xs opacity-80">GET IT ON</p>
          <p className="text-sm font-semibold">Google Play</p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function VokaKingPrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>("ko");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image
              src={appIcon}
              alt="VOKA KING"
              width={80}
              height={80}
              className="rounded-2xl shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">VOKA KING</h1>
          <p className="text-xl text-gray-600">{t.title}</p>
          <p className="text-sm text-gray-500 mt-2">
            {t.lastUpdated}: {LAST_UPDATED}
          </p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* ストアボタン */}
        <StoreButtons />

        {/* コンテンツ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {/* 2. 適用範囲 */}
          <Section title={s.scope.title}>
            <p className="text-gray-700 leading-relaxed mb-2">{s.scope.content}</p>
            <p className="text-gray-600 text-sm">{s.scope.note}</p>
          </Section>

          {/* 3. 本アプリの基本情報 */}
          <Section title={s.appInfo.title}>
            <InfoCard
              items={s.appInfo.items.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </Section>

          {/* 4. 取得する情報 */}
          <Section title={s.dataCollection.title}>
            <p className="text-gray-700 leading-relaxed mb-4">
              {s.dataCollection.description}
            </p>

            <SubSection title={s.dataCollection.notCollected.title}>
              <p className="text-gray-700 mb-3">{s.dataCollection.notCollected.description}</p>
              <DataList items={s.dataCollection.notCollected.items} />
            </SubSection>

            <SubSection title={s.dataCollection.minimalCollection.title}>
              <p className="text-gray-700 mb-1">{s.dataCollection.minimalCollection.description}</p>
              <p className="text-gray-500 text-sm">{s.dataCollection.minimalCollection.note}</p>
            </SubSection>

            <SubSection title={s.dataCollection.indirectTransmission.title}>
              <p className="text-gray-700 mb-3">{s.dataCollection.indirectTransmission.description}</p>
              <BulletList items={s.dataCollection.indirectTransmission.items} />
            </SubSection>
          </Section>

          {/* 5. 端末内に保存されるデータ */}
          <Section title={s.localStorage.title}>
            <p className="text-gray-700 leading-relaxed mb-4">
              {s.localStorage.description}
            </p>

            <SubSection title={s.localStorage.data.title}>
              <CheckList items={s.localStorage.data.items} />
            </SubSection>

            <SubSection title={s.localStorage.protection.title}>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{s.localStorage.protection.content}</p>
              </div>
            </SubSection>
          </Section>

          {/* 6. 情報の利用目的 */}
          <Section title={s.purpose.title}>
            <p className="text-gray-700 leading-relaxed mb-4">{s.purpose.description}</p>
            <BulletList items={s.purpose.items} />
            <div className="mt-4 space-y-1">
              {s.purpose.notes.map((note, i) => (
                <p key={i} className="text-gray-500 text-sm">{note}</p>
              ))}
            </div>
          </Section>

          {/* 7. 第三者提供・外部送信 */}
          <Section title={s.thirdParty.title}>
            <p className="text-gray-700 leading-relaxed mb-4">{s.thirdParty.description}</p>

            <SubSection title={s.thirdParty.providers.title}>
              {s.thirdParty.providers.items.map((provider, i) => (
                <ProviderCard
                  key={i}
                  name={provider.name}
                  data={provider.data}
                  purpose={provider.purpose}
                  notes={provider.notes}
                />
              ))}
            </SubSection>

            <SubSection title={s.thirdParty.legal.title}>
              <p className="text-gray-700">{s.thirdParty.legal.content}</p>
            </SubSection>
          </Section>

          {/* 8. 利用している主なSDK・ライブラリ */}
          <Section title={s.sdks.title}>
            <p className="text-gray-700 mb-4">{s.sdks.description}</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-1.5">
                {s.sdks.items.map((item, i) => (
                  <li key={i} className="text-gray-700 text-sm font-mono">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-500 text-sm mt-3">{s.sdks.note}</p>
          </Section>

          {/* 9. 広告・追跡 */}
          <Section title={s.advertising.title}>
            <p className="text-gray-700 mb-3">{s.advertising.description}</p>
            <DataList items={s.advertising.items} />
            <p className="text-gray-500 text-sm mt-3">{s.advertising.note}</p>
          </Section>

          {/* 10. データの保存期間・削除 */}
          <Section title={s.retention.title}>
            <SubSection title={s.retention.period.title}>
              <p className="text-gray-700 mb-3">{s.retention.period.description}</p>
              <DetailList items={s.retention.period.items} />
            </SubSection>

            <SubSection title={s.retention.accountDeletion.title}>
              <p className="text-gray-700">{s.retention.accountDeletion.content}</p>
            </SubSection>

            <SubSection title={s.retention.resetFunction.title}>
              <p className="text-gray-700">{s.retention.resetFunction.content}</p>
            </SubSection>
          </Section>

          {/* 11. ユーザーの権利 */}
          <Section title={s.userRights.title}>
            <p className="text-gray-700 mb-4">{s.userRights.description}</p>
            <DetailList items={s.userRights.items} />
          </Section>

          {/* 12. 通知 */}
          <Section title={s.notifications.title}>
            <p className="text-gray-700 mb-2">{s.notifications.content}</p>
            <p className="text-gray-600 text-sm">{s.notifications.note}</p>
          </Section>

          {/* 13. セキュリティ */}
          <Section title={s.security.title}>
            <p className="text-gray-700 mb-3">{s.security.description}</p>
            <div className="bg-blue-50 rounded-lg p-4">
              <CheckList items={s.security.items} />
            </div>
          </Section>

          {/* 14. 未成年の利用 */}
          <Section title={s.minors.title}>
            {s.minors.content.split("\n").map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-2">{paragraph}</p>
            ))}
            <NoteBox>{s.minors.note}</NoteBox>
          </Section>

          {/* 15. 国外移転 */}
          <Section title={s.crossBorder.title}>
            <p className="text-gray-700 leading-relaxed">{s.crossBorder.content}</p>
          </Section>

          {/* 16. プライバシーポリシーの変更 */}
          <Section title={s.changes.title}>
            <p className="text-gray-700 leading-relaxed mb-2">{s.changes.content}</p>
            <p className="text-gray-500 text-sm">{s.changes.publishLocation}</p>
          </Section>

          {/* お問い合わせ */}
          <Section title={s.contact.title}>
            <p className="text-gray-700 mb-4">{s.contact.content}</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {SUPPORT_EMAIL}
            </a>
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
