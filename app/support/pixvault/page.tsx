"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/Pixvault.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en" | "ko" | "zh-TW";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
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
    aboutSupportText: "KeyAlbumをご利用いただきありがとうございます。ご質問や問題がございましたら、下記のFAQをご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決策が見つからない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返答は通常48時間以内を目安にしております。ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語でお問い合わせいただけます。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらでご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using KeyAlbum. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "Frequently Asked Questions",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact by Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "You can contact us in Japanese or English.",
    privacyPolicy: "Privacy Policy",
    privacyPolicyText: "You can view our privacy policy here.",
    backToHub: "Back to App List",
  },
  ko: {
    support: "지원",
    aboutSupport: "지원 안내",
    aboutSupportText: "KeyAlbum을 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
    faq: "자주 묻는 질문",
    contactUs: "문의하기",
    contactText: "위에서 해결책을 찾지 못하셨다면 이메일로 문의해 주세요.",
    contactButton: "이메일로 문의",
    responseTime: "응답 시간",
    responseTimeText: "문의에 대한 답변은 보통 48시간 이내에 드리고 있습니다. 양해 부탁드립니다.",
    supportedLanguages: "지원 언어",
    supportedLanguagesText: "일본어 또는 영어로 문의하실 수 있습니다.",
    privacyPolicy: "개인정보 처리방침",
    privacyPolicyText: "개인정보 처리방침은 여기에서 확인하실 수 있습니다.",
    backToHub: "앱 목록으로 돌아가기",
  },
  "zh-TW": {
    support: "支援",
    aboutSupport: "關於支援",
    aboutSupportText: "感謝您使用 KeyAlbum。如果您有任何問題，請查看下方的常見問題或聯繫我們。",
    faq: "常見問題",
    contactUs: "聯繫我們",
    contactText: "如果您在上方找不到解決方案，請透過電子郵件聯繫我們。",
    contactButton: "透過電子郵件聯繫",
    responseTime: "回覆時間",
    responseTimeText: "我們通常會在 48 小時內回覆您的諮詢。感謝您的耐心等候。",
    supportedLanguages: "支援語言",
    supportedLanguagesText: "您可以使用日語或英語聯繫我們。",
    privacyPolicy: "隱私權政策",
    privacyPolicyText: "您可以在這裡查看我們的隱私權政策。",
    backToHub: "返回應用程式列表",
  },
};

// ========================================
// FAQデータ
// ========================================
const FAQ_DATA: {
  question: Record<Language, string>;
  answer: Record<Language, string>;
}[] = [
  {
    question: {
      ja: "写真や動画はどこに保存されますか？",
      en: "Where are my photos and videos stored?",
      ko: "사진과 동영상은 어디에 저장되나요?",
      "zh-TW": "我的照片和影片儲存在哪裡？",
    },
    answer: {
      ja: "すべての写真・動画はお使いの端末内のアプリ専用フォルダにのみ保存されます。クラウドやサーバーにアップロードされることはありません。他のアプリからアクセスすることもできません。",
      en: "All photos and videos are stored only in the app's private folder on your device. They are never uploaded to the cloud or any server, and cannot be accessed by other apps.",
      ko: "모든 사진과 동영상은 기기 내 앱 전용 폴더에만 저장됩니다. 클라우드나 서버에 업로드되지 않으며, 다른 앱에서 접근할 수 없습니다.",
      "zh-TW": "所有照片和影片僅儲存在您裝置上的應用程式專用資料夾中。它們不會上傳到雲端或任何伺服器，也無法被其他應用程式存取。",
    },
  },
  {
    question: {
      ja: "PINを忘れた場合はどうすればよいですか？",
      en: "What should I do if I forget my PIN?",
      ko: "PIN을 잊어버린 경우 어떻게 해야 하나요?",
      "zh-TW": "如果我忘記了 PIN 碼該怎麼辦？",
    },
    answer: {
      ja: "セキュリティ上の理由から、PINのリセット機能は提供しておりません。PINを忘れた場合はアプリを再インストールする必要がありますが、保存されていた写真・動画はすべて削除されますのでご注意ください。",
      en: "For security reasons, we do not provide a PIN reset feature. If you forget your PIN, you will need to reinstall the app. Please note that all saved photos and videos will be deleted.",
      ko: "보안상의 이유로 PIN 재설정 기능을 제공하지 않습니다. PIN을 잊어버린 경우 앱을 재설치해야 하며, 저장된 모든 사진과 동영상이 삭제되니 주의해 주세요.",
      "zh-TW": "基於安全考量，我們不提供 PIN 碼重置功能。如果您忘記了 PIN 碼，您需要重新安裝應用程式。請注意，所有已儲存的照片和影片將會被刪除。",
    },
  },
  {
    question: {
      ja: "Face IDや指紋認証でロック解除できますか？",
      en: "Can I unlock the app with Face ID or fingerprint?",
      ko: "Face ID나 지문 인증으로 잠금 해제할 수 있나요?",
      "zh-TW": "可以使用 Face ID 或指紋解鎖嗎？",
    },
    answer: {
      ja: "はい、PINロックに加えてFace ID（iPhone）や指紋認証（Android）による生体認証ロック解除に対応しています。設定画面から有効・無効を切り替えることができます。生体認証に失敗した場合はPINでロック解除できます。",
      en: "Yes, in addition to PIN lock, the app supports biometric unlock via Face ID (iPhone) or fingerprint (Android). You can enable or disable it in the settings. If biometric authentication fails, you can unlock with your PIN.",
      ko: "네, PIN 잠금 외에도 Face ID(iPhone) 또는 지문 인증(Android)을 통한 생체 인증 잠금 해제를 지원합니다. 설정 화면에서 활성화/비활성화할 수 있습니다. 생체 인증에 실패한 경우 PIN으로 잠금 해제할 수 있습니다.",
      "zh-TW": "是的，除了 PIN 碼鎖定外，還支援 Face ID（iPhone）或指紋（Android）生物辨識解鎖。您可以在設定中啟用或停用此功能。如果生物辨識驗證失敗，您可以使用 PIN 碼解鎖。",
    },
  },
  {
    question: {
      ja: "写真はどのくらい圧縮されますか？",
      en: "How much are photos compressed?",
      ko: "사진은 얼마나 압축되나요?",
      "zh-TW": "照片會被壓縮多少？",
    },
    answer: {
      ja: "インポートされた写真はJPEG形式（品質80%）に自動圧縮されます。圧縮率はアプリの設定画面で確認でき、元のファイルサイズと圧縮後のサイズ、節約できた容量を比較できます。",
      en: "Imported photos are automatically compressed to JPEG format (80% quality). You can check the compression ratio in the app's settings, including original size, compressed size, and storage saved.",
      ko: "가져온 사진은 JPEG 형식(품질 80%)으로 자동 압축됩니다. 앱 설정 화면에서 원본 파일 크기, 압축 후 크기, 절약된 저장 공간을 확인할 수 있습니다.",
      "zh-TW": "匯入的照片會自動壓縮為 JPEG 格式（80% 品質）。您可以在應用程式的設定中查看壓縮率，包括原始大小、壓縮後大小和節省的儲存空間。",
    },
  },
  {
    question: {
      ja: "動画もインポートできますか？",
      en: "Can I also import videos?",
      ko: "동영상도 가져올 수 있나요?",
      "zh-TW": "我也可以匯入影片嗎？",
    },
    answer: {
      ja: "はい、動画のインポートにも対応しています。動画は圧縮されずにそのまま保存されます。インポート時にサムネイルが自動生成されます。",
      en: "Yes, video import is supported. Videos are saved as-is without compression. Thumbnails are automatically generated upon import.",
      ko: "네, 동영상 가져오기도 지원합니다. 동영상은 압축 없이 그대로 저장됩니다. 가져올 때 썸네일이 자동으로 생성됩니다.",
      "zh-TW": "是的，支援影片匯入。影片會以原始格式儲存，不進行壓縮。匯入時會自動生成縮圖。",
    },
  },
  {
    question: {
      ja: "アプリ内で写真を撮影できますか？",
      en: "Can I take photos within the app?",
      ko: "앱 내에서 사진을 촬영할 수 있나요?",
      "zh-TW": "可以在應用程式內拍照嗎？",
    },
    answer: {
      ja: "はい、アプリ内のカメラ機能で写真や動画を直接撮影し、そのままフォルダに保存できます。撮影した写真・動画は端末のカメラロールには保存されず、アプリ内にのみ保存されます。",
      en: "Yes, you can take photos and videos directly using the in-app camera and save them to your folders. Captured media is saved only within the app and not in your device's camera roll.",
      ko: "네, 앱 내 카메라 기능으로 사진과 동영상을 직접 촬영하고 폴더에 바로 저장할 수 있습니다. 촬영된 사진과 동영상은 기기의 카메라 롤에는 저장되지 않고 앱 내에만 저장됩니다.",
      "zh-TW": "是的，您可以使用應用程式內的相機功能直接拍攝照片和影片，並儲存到資料夾中。拍攝的內容僅儲存在應用程式中，不會儲存到裝置的相簿。",
    },
  },
  {
    question: {
      ja: "写真の編集機能はありますか？",
      en: "Are there photo editing features?",
      ko: "사진 편집 기능이 있나요?",
      "zh-TW": "有照片編輯功能嗎？",
    },
    answer: {
      ja: "はい、写真エディターを搭載しています。クロップ（切り抜き）、回転、反転、テキストの追加、画像スタンプの貼り付け、フィルターの適用が可能です。テキストはフォントサイズ・色・影・縁取りなどを細かく設定でき、画像スタンプはサイズ・位置・透明度・回転を調整できます。編集後は元の写真を上書き、または新しい写真として保存できます。",
      en: "Yes, the app includes a photo editor. You can crop, rotate, flip, add text overlays, place image stickers, and apply filters. Text can be customized with font size, color, shadow, and stroke. Image stickers support size, position, opacity, and rotation adjustments. Edited photos can overwrite the original or be saved as a new photo.",
      ko: "네, 사진 편집기를 제공합니다. 자르기, 회전, 반전, 텍스트 추가, 이미지 스티커 붙이기, 필터 적용이 가능합니다. 텍스트는 글꼴 크기, 색상, 그림자, 외곽선 등을 세밀하게 설정할 수 있으며, 이미지 스티커는 크기, 위치, 투명도, 회전을 조정할 수 있습니다. 편집 후 원본을 덮어쓰거나 새 사진으로 저장할 수 있습니다.",
      "zh-TW": "是的，應用程式內建照片編輯器。您可以裁切、旋轉、翻轉、新增文字、放置圖片貼紙以及套用濾鏡。文字可以自訂字型大小、顏色、陰影和描邊。圖片貼紙支援調整大小、位置、透明度和旋轉。編輯後可以覆蓋原始照片或儲存為新照片。",
    },
  },
  {
    question: {
      ja: "写真を端末のカメラロールに戻すことはできますか？",
      en: "Can I export photos back to my device's camera roll?",
      ko: "사진을 기기의 카메라 롤로 내보낼 수 있나요?",
      "zh-TW": "我可以將照片匯出回裝置的相簿嗎？",
    },
    answer: {
      ja: "はい、アプリ内から写真や動画を選択して端末の写真ライブラリにエクスポートできます。複数選択による一括エクスポートやシステムの共有機能にも対応しています。",
      en: "Yes, you can select photos and videos within the app and export them to your device's photo library. Batch export via multi-select and sharing through the system share sheet are also supported.",
      ko: "네, 앱 내에서 사진과 동영상을 선택하여 기기의 사진 라이브러리로 내보낼 수 있습니다. 다중 선택을 통한 일괄 내보내기와 시스템 공유 기능도 지원합니다.",
      "zh-TW": "是的，您可以在應用程式中選擇照片和影片，匯出到裝置的照片圖庫。也支援透過多選進行批次匯出和使用系統分享功能。",
    },
  },
  {
    question: {
      ja: "フォルダの並び替えはできますか？",
      en: "Can I reorder folders?",
      ko: "폴더 순서를 변경할 수 있나요?",
      "zh-TW": "可以重新排列資料夾嗎？",
    },
    answer: {
      ja: "はい、フォルダは複数の方法で並び替えができます。新しい順・古い順・名前順・写真枚数順のほか、ドラッグ操作でお好みの順番に手動で並び替えることもできます。フォルダ内の写真の並び順もドラッグで自由に変更できます。",
      en: "Yes, folders can be sorted in multiple ways: by newest, oldest, name, or photo count. You can also drag and drop to arrange them in your preferred custom order. Photos within folders can also be reordered by dragging.",
      ko: "네, 폴더는 여러 방법으로 정렬할 수 있습니다. 최신순, 오래된순, 이름순, 사진 수순 외에도 드래그하여 원하는 순서로 수동 정렬할 수 있습니다. 폴더 내 사진 순서도 드래그로 자유롭게 변경할 수 있습니다.",
      "zh-TW": "是的，資料夾可以透過多種方式排序：按最新、最舊、名稱或照片數量。您也可以拖放來按照自訂順序排列。資料夾內的照片也可以透過拖放重新排序。",
    },
  },
  {
    question: {
      ja: "アプリを削除するとデータはどうなりますか？",
      en: "What happens to my data if I delete the app?",
      ko: "앱을 삭제하면 데이터는 어떻게 되나요?",
      "zh-TW": "如果我刪除應用程式，我的資料會怎樣？",
    },
    answer: {
      ja: "アプリを削除すると、アプリ内に保存されたすべての写真・動画・フォルダ情報が完全に削除されます。クラウドバックアップはないため、復元はできません。大切なデータは事前にエクスポートしてください。",
      en: "Deleting the app will permanently delete all photos, videos, and folder data stored within the app. Since there is no cloud backup, recovery is not possible. Please export important data beforehand.",
      ko: "앱을 삭제하면 앱 내에 저장된 모든 사진, 동영상, 폴더 정보가 완전히 삭제됩니다. 클라우드 백업이 없으므로 복구할 수 없습니다. 중요한 데이터는 미리 내보내 주세요.",
      "zh-TW": "刪除應用程式將永久刪除應用程式中儲存的所有照片、影片和資料夾資料。由於沒有雲端備份，因此無法恢復。請事先匯出重要資料。",
    },
  },
  {
    question: {
      ja: "インポート時に元の写真を自動削除できますか？",
      en: "Can I automatically delete original photos after importing?",
      ko: "가져올 때 원본 사진을 자동으로 삭제할 수 있나요?",
      "zh-TW": "匯入後可以自動刪除原始照片嗎？",
    },
    answer: {
      ja: "はい、設定画面で「インポート後に元データを削除」をオンにすると、写真をアプリにインポートした後にカメラロールから元の写真を自動的に削除できます。この設定はいつでもオン・オフを切り替えられます。",
      en: "Yes, by enabling \"Delete originals after import\" in the settings, the original photos will be automatically removed from your camera roll after being imported into the app. This setting can be toggled on or off at any time.",
      ko: "네, 설정에서 \"가져오기 후 원본 삭제\"를 활성화하면 앱으로 가져온 후 카메라 롤에서 원본 사진이 자동으로 삭제됩니다. 이 설정은 언제든지 켜거나 끌 수 있습니다.",
      "zh-TW": "是的，在設定中啟用「匯入後刪除原始資料」後，照片匯入應用程式後會自動從相簿中刪除原始照片。此設定可以隨時開啟或關閉。",
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
export default function KeyAlbumSupportPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src={appIcon}
              alt="KeyAlbum"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">KeyAlbum</h1>
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
            href="/support/pixvault/privacy"
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
          <p>&copy; {currentYear} KeyAlbum. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
