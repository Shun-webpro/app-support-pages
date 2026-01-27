"use client";

import { useState } from "react";
import Link from "next/link";

// ========================================
// 設定値（変更が必要な場合はここを編集）
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

// ========================================
// アプリ定義（アプリを追加する場合はここに追加）
// ========================================
type AppId = "todoo";

const APPS: { id: AppId; name: string; icon: string }[] = [
  { id: "todoo", name: "ToDoo", icon: "/ToDoo.jpeg" },
];

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en" | "fr" | "de" | "ko" | "zh";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸🇨🇦🇬🇧🇸🇬🇦🇺" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

// ========================================
// 翻訳データ
// ========================================
const TRANSLATIONS: Record<Language, {
  support: string;
  selectApp: string;
  aboutSupport: string;
  aboutSupportText: (appName: string) => string;
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
}> = {
  ja: {
    support: "サポート",
    selectApp: "アプリを選択",
    aboutSupport: "サポートについて",
    aboutSupportText: (appName) => `${appName}をご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。`,
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決しない場合は、メールにてお問い合わせください。",
    contactButton: "メールで問い合わせる",
    responseTime: "返信について",
    responseTimeText: "お問い合わせへの返信は通常48時間以内を目安としております。お時間をいただく場合がございますが、ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語・フランス語・ドイツ語・韓国語・中国語でのお問い合わせに対応しております。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "個人情報の取り扱いについてはこちらをご確認ください。",
  },
  en: {
    support: "Support",
    selectApp: "Select App",
    aboutSupport: "About Support",
    aboutSupportText: (appName) => `Thank you for using ${appName}. If you have any questions or issues, please check the FAQ below or contact us.`,
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese, English, French, German, Korean, and Chinese.",
    privacyPolicy: "Privacy Policy",
    privacyPolicyText: "Please check here for our privacy policy.",
  },
  fr: {
    support: "Assistance",
    selectApp: "Sélectionner l'app",
    aboutSupport: "À propos de l'assistance",
    aboutSupportText: (appName) => `Merci d'utiliser ${appName}. Si vous avez des questions ou des problèmes, veuillez consulter la FAQ ci-dessous ou nous contacter.`,
    faq: "Questions fréquentes",
    contactUs: "Nous contacter",
    contactText: "Si vous ne trouvez pas de solution ci-dessus, veuillez nous contacter par e-mail.",
    contactButton: "Contacter par e-mail",
    responseTime: "Délai de réponse",
    responseTimeText: "Nous nous efforçons de répondre aux demandes généralement dans les 48 heures. Merci de votre patience.",
    supportedLanguages: "Langues prises en charge",
    supportedLanguagesText: "Nous acceptons les demandes en japonais, anglais, français, allemand, coréen et chinois.",
    privacyPolicy: "Politique de confidentialité",
    privacyPolicyText: "Veuillez consulter notre politique de confidentialité ici.",
  },
  de: {
    support: "Support",
    selectApp: "App auswählen",
    aboutSupport: "Über den Support",
    aboutSupportText: (appName) => `Vielen Dank, dass Sie ${appName} verwenden. Bei Fragen oder Problemen lesen Sie bitte die FAQ unten oder kontaktieren Sie uns.`,
    faq: "Häufige Fragen",
    contactUs: "Kontakt",
    contactText: "Wenn Sie oben keine Lösung finden, kontaktieren Sie uns bitte per E-Mail.",
    contactButton: "Per E-Mail kontaktieren",
    responseTime: "Antwortzeit",
    responseTimeText: "Wir bemühen uns, Anfragen in der Regel innerhalb von 48 Stunden zu beantworten. Vielen Dank für Ihre Geduld.",
    supportedLanguages: "Unterstützte Sprachen",
    supportedLanguagesText: "Wir nehmen Anfragen auf Japanisch, Englisch, Französisch, Deutsch, Koreanisch und Chinesisch entgegen.",
    privacyPolicy: "Datenschutzrichtlinie",
    privacyPolicyText: "Bitte lesen Sie unsere Datenschutzrichtlinie hier.",
  },
  ko: {
    support: "지원",
    selectApp: "앱 선택",
    aboutSupport: "지원 안내",
    aboutSupportText: (appName) => `${appName}을(를) 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.`,
    faq: "자주 묻는 질문",
    contactUs: "문의하기",
    contactText: "위에서 해결책을 찾지 못하셨다면 이메일로 문의해 주세요.",
    contactButton: "이메일로 문의",
    responseTime: "응답 시간",
    responseTimeText: "문의에 대한 답변은 보통 48시간 이내에 드리고 있습니다. 양해 부탁드립니다.",
    supportedLanguages: "지원 언어",
    supportedLanguagesText: "일본어, 영어, 프랑스어, 독일어, 한국어, 중국어로 문의하실 수 있습니다.",
    privacyPolicy: "개인정보 처리방침",
    privacyPolicyText: "개인정보 처리방침은 여기에서 확인하세요.",
  },
  zh: {
    support: "支持",
    selectApp: "选择应用",
    aboutSupport: "关于支持",
    aboutSupportText: (appName) => `感谢您使用${appName}。如果您有任何问题，请查看下面的常见问题或联系我们。`,
    faq: "常见问题",
    contactUs: "联系我们",
    contactText: "如果上述内容无法解决您的问题，请通过电子邮件与我们联系。",
    contactButton: "发送邮件咨询",
    responseTime: "回复时间",
    responseTimeText: "我们通常会在48小时内回复您的咨询。感谢您的耐心等待。",
    supportedLanguages: "支持的语言",
    supportedLanguagesText: "我们接受日语、英语、法语、德语、韩语和中文的咨询。",
    privacyPolicy: "隐私政策",
    privacyPolicyText: "请在此查看我们的隐私政策。",
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
      ja: "データは他のデバイスと同期されますか？",
      en: "Is my data synced across devices?",
      fr: "Mes données sont-elles synchronisées entre les appareils ?",
      de: "Werden meine Daten geräteübergreifend synchronisiert?",
      ko: "데이터가 다른 기기와 동기화되나요?",
      zh: "我的数据会在设备之间同步吗？",
    },
    answer: {
      ja: "現在、データはお使いのデバイス内にのみ保存されます。将来的にクラウド同期機能の追加を検討しています。",
      en: "Currently, your data is stored only on your device. We are considering adding cloud sync in the future.",
      fr: "Actuellement, vos données sont stockées uniquement sur votre appareil. Nous envisageons d'ajouter la synchronisation cloud à l'avenir.",
      de: "Derzeit werden Ihre Daten nur auf Ihrem Gerät gespeichert. Wir erwägen, in Zukunft Cloud-Synchronisierung hinzuzufügen.",
      ko: "현재 데이터는 사용 중인 기기에만 저장됩니다. 향후 클라우드 동기화 기능 추가를 검토하고 있습니다.",
      zh: "目前，您的数据仅存储在您的设备上。我们正在考虑在未来添加云同步功能。",
    },
  },
  {
    question: {
      ja: "通知が届きません",
      en: "I'm not receiving notifications",
      fr: "Je ne reçois pas de notifications",
      de: "Ich erhalte keine Benachrichtigungen",
      ko: "알림이 오지 않습니다",
      zh: "我没有收到通知",
    },
    answer: {
      ja: "端末の「設定」アプリから、本アプリの通知が許可されているかご確認ください。また、おやすみモードや集中モードが有効になっていないかもご確認ください。",
      en: "Please check if notifications are enabled for this app in your device Settings. Also, make sure Do Not Disturb or Focus mode is not enabled.",
      fr: "Veuillez vérifier si les notifications sont activées pour cette application dans les paramètres de votre appareil. Assurez-vous également que le mode Ne pas déranger ou Concentration n'est pas activé.",
      de: "Bitte überprüfen Sie, ob Benachrichtigungen für diese App in Ihren Geräteeinstellungen aktiviert sind. Stellen Sie außerdem sicher, dass der Nicht stören- oder Fokus-Modus nicht aktiviert ist.",
      ko: "기기 설정에서 이 앱의 알림이 허용되어 있는지 확인해 주세요. 또한 방해금지 모드나 집중 모드가 활성화되어 있지 않은지도 확인해 주세요.",
      zh: "请在设备设置中检查是否已为此应用启用通知。另外，请确保未启用勿扰模式或专注模式。",
    },
  },
  {
    question: {
      ja: "購入した機能を復元するには？",
      en: "How do I restore my purchases?",
      fr: "Comment restaurer mes achats ?",
      de: "Wie stelle ich meine Käufe wieder her?",
      ko: "구매한 기능을 복원하려면 어떻게 하나요?",
      zh: "如何恢复我的购买？",
    },
    answer: {
      ja: "アプリ内の「設定」→「購入を復元」をタップしてください。同じApple ID / Googleアカウントでサインインしている必要があります。",
      en: 'Go to "Settings" → "Restore Purchases" in the app. You must be signed in with the same Apple ID / Google account.',
      fr: 'Allez dans « Paramètres » → « Restaurer les achats » dans l\'application. Vous devez être connecté avec le même identifiant Apple / compte Google.',
      de: 'Gehen Sie in der App zu „Einstellungen" → „Käufe wiederherstellen". Sie müssen mit derselben Apple-ID / demselben Google-Konto angemeldet sein.',
      ko: '앱 내 "설정" → "구매 복원"을 탭해 주세요. 동일한 Apple ID / Google 계정으로 로그인되어 있어야 합니다.',
      zh: '请在应用内点击"设置"→"恢复购买"。您需要使用相同的Apple ID / Google账户登录。',
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

function AppSelector({
  currentApp,
  onSelectApp,
  label,
}: {
  currentApp: AppId | null;
  onSelectApp: (appId: AppId) => void;
  label: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-center text-sm text-gray-500 mb-3">{label}</p>
      <div className="flex flex-wrap justify-center gap-4">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => onSelectApp(app.id)}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              currentApp === app.id
                ? "bg-gray-100 ring-2 ring-gray-800"
                : "hover:bg-gray-50"
            }`}
          >
            <img
              src={app.icon}
              alt={app.name}
              className="w-16 h-16 rounded-2xl mb-2"
            />
            <span className="text-sm font-medium text-gray-700">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ========================================
// メインページ
// ========================================
export default function SupportPage() {
  const [lang, setLang] = useState<Language>("ja");
  const [selectedApp, setSelectedApp] = useState<AppId | null>(null);
  const t = TRANSLATIONS[lang];
  const currentYear = new Date().getFullYear();

  const currentAppData = APPS.find((app) => app.id === selectedApp);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {currentAppData ? currentAppData.name : t.support}
          </h1>
          <p className="text-gray-600">{t.support}</p>
        </header>

        {/* 言語切り替え */}
        <LanguageSelector currentLang={lang} onChangeLang={setLang} />

        {/* アプリ選択 */}
        <AppSelector
          currentApp={selectedApp}
          onSelectApp={setSelectedApp}
          label={t.selectApp}
        />

        {/* アプリが選択されている場合のみサポート内容を表示 */}
        {selectedApp && currentAppData && (
          <>
            {/* サポート案内 */}
            <Section>
              <SectionTitle>{t.aboutSupport}</SectionTitle>
              <p className="text-gray-700 leading-relaxed">
                {t.aboutSupportText(currentAppData.name)}
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
                      <p className="text-gray-700 leading-relaxed">{faq.answer[lang]}</p>
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
                href="/support/privacy"
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
          </>
        )}
      </div>

      {/* フッター */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-2xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {currentYear} {currentAppData?.name ?? "Support"}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
