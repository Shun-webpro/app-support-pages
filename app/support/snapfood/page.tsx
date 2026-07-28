"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/snapfood.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "ko" | "en" | "zh-TW";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
];

// ========================================
// 翻訳データ
// ========================================
const TRANSLATIONS: Record<Language, {
  support: string;
  aboutSupport: string;
  aboutSupportText: string;
  faq: string;
  contactUs: string;
  contactText: string;
  contactButton: string;
  responseTime: string;
  responseTimeText: string;
  supportedLanguages: string;
  supportedLanguagesText: string;
  privacyPolicy: string;
  privacyPolicyText: string;
  backToHub: string;
}> = {
  ja: {
    support: "サポート",
    aboutSupport: "サポートについて",
    aboutSupportText: "タベミル（SnapFood）をご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決しない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返信は通常48時間以内を目安としております。お時間をいただく場合がございますが、ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語・韓国語・繁体字中国語でのお問い合わせに対応しております。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらでご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  ko: {
    support: "지원",
    aboutSupport: "지원 안내",
    aboutSupportText: "SnapFood를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
    faq: "자주 묻는 질문",
    contactUs: "문의하기",
    contactText: "위에서 해결책을 찾지 못하셨다면 이메일로 문의해 주세요.",
    contactButton: "이메일로 문의",
    responseTime: "응답 시간",
    responseTimeText: "문의에 대한 답변은 보통 48시간 이내에 드리고 있습니다. 양해 부탁드립니다.",
    supportedLanguages: "지원 언어",
    supportedLanguagesText: "일본어, 영어, 한국어, 번체 중국어로 문의하실 수 있습니다.",
    privacyPolicy: "개인정보 처리방침",
    privacyPolicyText: "개인정보 처리방침은 여기에서 확인하세요.",
    backToHub: "앱 목록으로 돌아가기",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using SnapFood. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese, English, Korean, and Traditional Chinese.",
    privacyPolicy: "Privacy Policy",
    privacyPolicyText: "Please check here for our privacy policy.",
    backToHub: "Back to App List",
  },
  "zh-TW": {
    support: "支援",
    aboutSupport: "關於支援",
    aboutSupportText: "感謝您使用 SnapFood。如有任何疑問或問題，請參閱以下常見問題，或與我們聯絡。",
    faq: "常見問題",
    contactUs: "聯絡我們",
    contactText: "若上述內容未能解決您的問題，請透過電子郵件與我們聯絡。",
    contactButton: "透過電子郵件聯絡",
    responseTime: "回覆時間",
    responseTimeText: "我們通常會在 48 小時內回覆您的問題，感謝您的耐心等候。",
    supportedLanguages: "支援語言",
    supportedLanguagesText: "我們接受以日文、英文、韓文及繁體中文提出的詢問。",
    privacyPolicy: "隱私權政策",
    privacyPolicyText: "請點此查看我們的隱私權政策。",
    backToHub: "返回應用程式列表",
  },
};

// ========================================
// FAQデータ（多言語）
// ========================================
const FAQ_DATA: {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}[] = [
  {
    question: {
      ja: "タベミル（SnapFood）はどのようなアプリですか？",
      ko: "SnapFood는 어떤 앱인가요?",
      en: "What kind of app is SnapFood?",
      "zh-TW": "SnapFood 是一款什麼樣的應用程式？",
    },
    answer: {
      ja: "食事・ドリンク・サプリメントを写真やバーコードで記録するだけで、AIがカロリーや栄養素（糖質・タンパク質・脂質・食物繊維・ビタミン・ミネラルなど）を自動で推定してくれる食事管理アプリです。あわせて体重・睡眠・運動・作業・体調（症状）も記録でき、カレンダーや統計でまとめて振り返ることができます。",
      ko: "식사・음료・영양제를 사진이나 바코드로 기록하기만 하면 AI가 칼로리와 영양소(탄수화물・단백질・지방・식이섬유・비타민・미네랄 등)를 자동으로 추정해 주는 식사 관리 앱입니다. 체중・수면・운동・작업・컨디션(증상)도 함께 기록할 수 있으며, 캘린더와 통계에서 한눈에 되돌아볼 수 있습니다.",
      en: "SnapFood is a nutrition-tracking app: just photograph or scan a barcode for your meals, drinks, and supplements, and AI automatically estimates calories and nutrients (carbs, protein, fat, fiber, vitamins, minerals, and more). You can also log your weight, sleep, exercise, physical work, and symptoms, and review everything in the calendar and stats views.",
      "zh-TW": "SnapFood 是一款飲食管理應用程式，只要用照片或掃描條碼記錄您的餐點、飲品及營養補充品，AI 就會自動推估卡路里與營養素（醣類、蛋白質、脂肪、膳食纖維、維生素、礦物質等）。同時也能記錄體重、睡眠、運動、勞動及身體狀況（症狀），並在日曆與統計頁面中一併回顧。",
    },
  },
  {
    question: {
      ja: "写真で食事・ドリンク・サプリメントを記録する方法を教えてください",
      ko: "사진으로 식사・음료・영양제를 기록하는 방법을 알려주세요",
      en: "How do I log a meal, drink, or supplement with a photo?",
      "zh-TW": "如何用照片記錄餐點、飲品或營養補充品？",
    },
    answer: {
      ja: "記録画面の「＋」ボタンから、食事・ドリンク・サプリメントそれぞれの「写真で記録」を選択し、カメラで撮影するかライブラリから写真を選んでください。AIが写真を解析し、食品名・分量・カロリー・栄養素・簡単なアドバイスを自動で作成します。文字がはっきり読み取れる、明るくピントの合った写真ほど精度が高くなります。",
      ko: "기록 화면의 「＋」버튼에서 식사・음료・영양제 각각의 「사진으로 기록」을 선택하고, 카메라로 촬영하거나 라이브러리에서 사진을 선택해 주세요. AI가 사진을 분석하여 음식 이름・분량・칼로리・영양소・간단한 조언을 자동으로 작성합니다. 글자가 선명하게 보이는, 밝고 초점이 맞은 사진일수록 정확도가 높아집니다.",
      en: "Tap the「＋」button on the diary screen, choose \"Log with photo\" for meals, drinks, or supplements, then take a photo or pick one from your library. AI analyzes the photo and automatically fills in the food name, portion size, calories, nutrients, and a short tip. Clear, well-lit, in-focus photos produce more accurate results.",
      "zh-TW": "在記錄畫面點選「＋」按鈕，分別選擇餐點、飲品或營養補充品的「以照片記錄」，接著用相機拍攝或從相簿選擇照片。AI 會分析照片，自動填入食品名稱、份量、卡路里、營養素及簡短建議。文字清晰可辨、光線充足且對焦準確的照片，辨識精確度會更高。",
    },
  },
  {
    question: {
      ja: "バーコードをスキャンしても商品が見つかりません",
      ko: "바코드를 스캔해도 상품을 찾을 수 없습니다",
      en: "Barcode scanning can't find my product",
      "zh-TW": "掃描條碼卻找不到商品資料",
    },
    answer: {
      ja: "バーコード検索は世界中のユーザーが登録している公開データベース（Open Food Facts）を利用しています。地域限定商品や登録されていない新商品の場合、データが見つからないことがあります。その場合は「写真で記録」または手動入力をお試しください。",
      ko: "바코드 검색은 전 세계 사용자가 등록하는 공개 데이터베이스(Open Food Facts)를 이용합니다. 지역 한정 상품이나 등록되지 않은 신상품의 경우 데이터를 찾지 못할 수 있습니다. 이 경우 「사진으로 기록」또는 수동 입력을 이용해 주세요.",
      en: "Barcode lookup uses Open Food Facts, a public database maintained by users worldwide. Regional or newly released products that haven't been registered there may not be found. In that case, please use \"Log with photo\" or enter the item manually.",
      "zh-TW": "條碼查詢使用的是全球使用者共同建立的公開資料庫（Open Food Facts）。若商品為地區限定或尚未有人登錄的新品，可能會查無資料。此時請改用「以照片記錄」或手動輸入。",
    },
  },
  {
    question: {
      ja: "無料プランと有料プラン（プレミアム）の違いを教えてください",
      ko: "무료 플랜과 유료 플랜(프리미엄)의 차이를 알려주세요",
      en: "What's the difference between the free and premium plans?",
      "zh-TW": "免費方案與付費方案（Premium）有什麼不同？",
    },
    answer: {
      ja: "無料でもカロリーや主要な栄養素の記録・AI解析・統計機能をご利用いただけます。プレミアムプランでは、カルシウム・鉄分・マグネシウム・カリウム・亜鉛・ビタミンC・ビタミンD・コレステロール・カフェイン・オメガ3という10種類の詳細な栄養素がAI解析でも自動的に計測され、統計・カレンダーで確認できるほか、食費のトラッキング機能もご利用いただけます。プランは週間・月間・6ヶ月・年間から選べる自動更新のサブスクリプションです。",
      ko: "무료로도 칼로리와 주요 영양소 기록・AI 분석・통계 기능을 이용하실 수 있습니다. 프리미엄 플랜에서는 칼슘・철분・마그네슘・칼륨・아연・비타민C・비타민D・콜레스테롤・카페인・오메가3의 10가지 상세 영양소가 AI 분석으로도 자동 측정되며, 통계・캘린더에서 확인할 수 있고 식비 트래킹 기능도 이용할 수 있습니다. 플랜은 주간・월간・6개월・연간 중에서 선택 가능한 자동 갱신 구독입니다.",
      en: "Even on the free plan, you can log calories and major nutrients, use AI analysis, and view your stats. The Premium plan additionally measures 10 detailed micronutrients automatically via AI analysis — calcium, iron, magnesium, potassium, zinc, vitamin C, vitamin D, cholesterol, caffeine, and omega-3 — viewable in Stats and Calendar, plus a food cost tracking feature. Plans are auto-renewing subscriptions available in weekly, monthly, 6-month, and annual durations.",
      "zh-TW": "即使是免費方案，也能使用卡路里與主要營養素記錄、AI 分析及統計功能。Premium 方案則會透過 AI 分析自動額外測量 10 種詳細營養素——鈣、鐵、鎂、鉀、鋅、維生素 C、維生素 D、膽固醇、咖啡因及 Omega-3，並可在統計與日曆中查看，另外還提供食費追蹤功能。方案可選擇週訂閱、月訂閱、半年訂閱或年訂閱，皆為自動續訂制。",
    },
  },
  {
    question: {
      ja: "サブスクリプションを解約するにはどうすればよいですか？",
      ko: "구독을 해지하려면 어떻게 하나요?",
      en: "How do I cancel my subscription?",
      "zh-TW": "如何取消訂閱？",
    },
    answer: {
      ja: "サブスクリプションの解約はiOSの「設定」→「Apple ID」→「サブスクリプション」から行えます。解約後も現在の請求期間が終了するまでプレミアム機能を引き続きご利用いただけます。",
      ko: "구독 해지는 iOS 「설정」→ 「Apple ID」→ 「구독」에서 할 수 있습니다. 해지 후에도 현재 결제 기간이 끝날 때까지 프리미엄 기능을 계속 이용하실 수 있습니다.",
      en: "You can cancel your subscription from iOS Settings → Apple ID → Subscriptions. After cancellation, you can continue using premium features until the end of the current billing period.",
      "zh-TW": "可從 iOS「設定」→「Apple ID」→「訂閱」取消訂閱。取消後，在目前計費週期結束前仍可繼續使用進階功能。",
    },
  },
  {
    question: {
      ja: "購入した内容が反映されません",
      ko: "구매한 내용이 반영되지 않습니다",
      en: "My purchase isn't being reflected",
      "zh-TW": "購買內容沒有反映在應用程式中",
    },
    answer: {
      ja: "設定画面の「購入を復元」をタップしてください。同じApple IDに紐づいた購入情報が再度反映されます。それでも反映されない場合は、購入時のApple IDでログインしているかをご確認のうえ、お問い合わせください。",
      ko: "설정 화면의 「구매 복원」을 눌러 주세요. 동일한 Apple ID에 연결된 구매 정보가 다시 반영됩니다. 그래도 반영되지 않는 경우, 구매 시 사용한 Apple ID로 로그인되어 있는지 확인 후 문의해 주세요.",
      en: "Please tap \"Restore Purchases\" on the Settings screen. This re-applies purchase information linked to your Apple ID. If it still isn't reflected, please confirm you're signed in with the Apple ID used at the time of purchase, then contact us.",
      "zh-TW": "請點選設定畫面中的「還原購買」。這將重新套用與您 Apple ID 綁定的購買資訊。若仍未反映，請確認您目前登入的 Apple ID 是否與購買時使用的相同，再與我們聯絡。",
    },
  },
  {
    question: {
      ja: "AI栄養士（コーチ）機能とは何ですか？",
      ko: "AI 영양사(코치) 기능은 무엇인가요?",
      en: "What is the AI Nutritionist (coach) feature?",
      "zh-TW": "「AI 營養師（教練）」功能是什麼？",
    },
    answer: {
      ja: "その日にすでに記録した食事内容や設定した目標値をもとに、AIが残りのカロリー・栄養バランスを考慮したおすすめの食事メニューを提案してくれる機能です。気になることを自由に入力して相談することもでき、「他の提案を見る」でさらに別の候補を確認できます。",
      ko: "그날 이미 기록한 식사 내용과 설정한 목표치를 바탕으로, AI가 남은 칼로리・영양 균형을 고려한 추천 식단을 제안해 주는 기능입니다. 궁금한 내용을 자유롭게 입력하여 상담할 수도 있으며, 「다른 제안 보기」로 또 다른 후보를 확인할 수 있습니다.",
      en: "Based on what you've already logged that day and your set nutrition goals, AI suggests meal ideas that fit your remaining calorie and nutrient budget. You can also type in any questions or context, and tap \"Show another suggestion\" to see alternative ideas.",
      "zh-TW": "根據您當天已記錄的飲食內容與設定的目標值，AI 會考量剩餘的卡路里與營養均衡，為您推薦合適的餐點建議。您也可以自由輸入想諮詢的內容，並點選「查看其他建議」以取得更多候選方案。",
    },
  },
  {
    question: {
      ja: "運動・作業（Work）の記録はどのように使いますか？",
      ko: "운동・작업(Work) 기록은 어떻게 사용하나요?",
      en: "How do I log exercise or physical work?",
      "zh-TW": "如何記錄運動或勞動（Work）？",
    },
    answer: {
      ja: "「＋」ボタンから運動または作業を選び、種目と時間を入力すると、運動強度（METs）に基づいて消費カロリーが自動計算されます。日々の運動記録や、立ち仕事・力仕事などの活動量を記録したい方にもご利用いただけます。",
      ko: "「＋」버튼에서 운동 또는 작업을 선택하고 종목과 시간을 입력하면, 운동 강도(METs)를 기반으로 소비 칼로리가 자동으로 계산됩니다. 매일의 운동 기록이나 서서 하는 일・힘든 육체노동 등의 활동량을 기록하고 싶은 분도 이용하실 수 있습니다.",
      en: "Choose Exercise or Work from the「＋」button, enter the activity and duration, and calories burned are calculated automatically based on activity intensity (METs). This works well for daily workouts as well as physically demanding jobs like standing or manual labor.",
      "zh-TW": "從「＋」按鈕選擇運動或勞動，輸入項目與時間後，系統會依運動強度（METs）自動計算消耗的卡路里。無論是每日運動記錄，或是想記錄站立工作、體力勞動等活動量，都可以使用此功能。",
    },
  },
  {
    question: {
      ja: "作成したデータはどこに保存されますか？機種変更時はどうなりますか？",
      ko: "기록한 데이터는 어디에 저장되나요? 기기를 변경하면 어떻게 되나요?",
      en: "Where is my data stored, and what happens if I change devices?",
      "zh-TW": "記錄的資料儲存在哪裡？更換裝置時會怎麼樣？",
    },
    answer: {
      ja: "食事・ドリンク・サプリメント・体重・睡眠・運動・作業・体調などの記録データは、すべてお使いの端末内にのみ保存されます。クラウド同期には対応していないため、アプリをアンインストールしたり機種変更をしたりすると、記録データを復元することはできません。大切な記録は事前にご確認のうえご利用ください。",
      ko: "식사・음료・영양제・체중・수면・운동・작업・컨디션 등의 기록 데이터는 모두 사용 중인 기기 내에만 저장됩니다. 클라우드 동기화를 지원하지 않으므로, 앱을 삭제하거나 기기를 변경하면 기록 데이터를 복원할 수 없습니다. 중요한 기록은 사전에 확인 후 이용해 주세요.",
      en: "All logged data — meals, drinks, supplements, weight, sleep, exercise, work, and symptoms — is stored only on your device. Since cloud sync is not supported, this data cannot be recovered if you uninstall the app or switch to a new device. Please keep this in mind for any records you want to keep long-term.",
      "zh-TW": "餐點、飲品、營養補充品、體重、睡眠、運動、勞動、身體狀況等所有記錄資料，都只會儲存在您的裝置內。由於不支援雲端同步，若解除安裝應用程式或更換裝置，記錄資料將無法復原。若有想長期保留的重要記錄，請事先確認並自行留存。",
    },
  },
  {
    question: {
      ja: "栄養素の推定値はどのくらい正確ですか？",
      ko: "영양소 추정값은 얼마나 정확한가요?",
      en: "How accurate are the estimated nutrition values?",
      "zh-TW": "AI 估算的營養素數值準確嗎？",
    },
    answer: {
      ja: "AIによる栄養素の推定はあくまで目安であり、実際の値と異なる場合があります。本アプリは医学的な診断や治療、専門的な栄養指導の代わりとなるものではありません。持病がある方や食事管理について医学的な助言が必要な方は、医師や管理栄養士にご相談ください。",
      ko: "AI에 의한 영양소 추정은 어디까지나 참고용이며, 실제 값과 다를 수 있습니다. 본 앱은 의학적 진단이나 치료, 전문적인 영양 지도를 대체하지 않습니다. 지병이 있으신 분이나 식사 관리에 대한 의학적 조언이 필요하신 분은 의사나 영양사와 상담해 주세요.",
      en: "AI-estimated nutrition values are approximate and may differ from actual values. This app is not a substitute for medical diagnosis, treatment, or professional dietary guidance. If you have a medical condition or need medical advice about your diet, please consult a doctor or registered dietitian.",
      "zh-TW": "AI 所推估的營養素數值僅供參考，可能與實際數值有所差異。本應用程式並非醫療診斷、治療或專業營養指導的替代方案。若您有慢性病或需要飲食管理方面的醫療建議，請諮詢醫師或營養師。",
    },
  },
];

// ========================================
// コンポーネント
// ========================================
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`mb-12 ${className}`}>{children}</section>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
      {children}
    </h2>
  );
}

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

// ========================================
// メインページ
// ========================================
export default function SnapFoodSupportPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const brandName = lang === "ja" ? "タベミル" : "SnapFood";
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src={appIcon}
              alt={brandName}
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
          <p className="text-gray-600">{t.support}</p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* 戻るリンク */}
        <div className="text-center mb-8">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.backToHub}
          </Link>
        </div>

        {/* サポート案内 */}
        <Section>
          <SectionTitle>{t.aboutSupport}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">
            {t.aboutSupportText}
          </p>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionTitle>{t.faq}</SectionTitle>
          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-lg p-4 cursor-pointer"
              >
                <summary className="font-medium list-none flex justify-between items-center">
                  <span className="text-gray-800 pr-4">{faq.question[lang]}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer[lang]}</p>
                </div>
              </details>
            ))}
          </div>
        </Section>

        {/* お問い合わせ */}
        <Section>
          <SectionTitle>{t.contactUs}</SectionTitle>
          <p className="text-gray-700 mb-6">{t.contactText}</p>

          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t.contactButton}
          </a>

          <p className="mt-4 text-sm text-gray-500">{SUPPORT_EMAIL}</p>
        </Section>

        {/* 返信目安 */}
        <Section>
          <SectionTitle>{t.responseTime}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{t.responseTimeText}</p>
        </Section>

        {/* 対応言語 */}
        <Section>
          <SectionTitle>{t.supportedLanguages}</SectionTitle>
          <p className="text-gray-700 leading-relaxed">{t.supportedLanguagesText}</p>
        </Section>

        {/* プライバシーポリシー */}
        <Section className="mb-0">
          <SectionTitle>{t.privacyPolicy}</SectionTitle>
          <p className="text-gray-700 mb-4">{t.privacyPolicyText}</p>
          <Link
            href="/support/snapfood/privacy"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors"
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {t.privacyPolicy}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </Section>
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
