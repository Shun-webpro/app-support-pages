"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/sleepwave.png";

const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";
const LAST_UPDATED_JA = "2026年9月28日";
const LAST_UPDATED_EN = "September 28, 2026";

type Language = "ja" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
];

const TRANSLATIONS: Record<Language, {
  title: string;
  lastUpdated: string;
  lastUpdatedDate: string;
  backToSupport: string;
  sections: {
    intro: { title: string; content: string; medical: string; consent: string };
    dataCollection: {
      title: string;
      local: { title: string; intro: string; items: string[]; audioNote: string };
      notCollected: { title: string; intro: string; items: string[] };
    };
    purpose: { title: string; intro: string; items: string[] };
    thirdParty: { title: string; content: string; share: string; links: string; note: string };
    retention: { title: string; content: string; clips: string; backup: string };
    permissions: { title: string; intro: string; items: { name: string; detail: string }[] };
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
        content: "スヤログ（英語表記：SleepWave、以下「本アプリ」）は、枕元に置いたiPhoneのマイクで寝息・いびき・寝返りの音を測り、睡眠の状態を推定して記録する睡眠記録＆スマートアラームアプリです。本プライバシーポリシーは、本アプリをご利用いただく際の情報の取り扱いについて説明します。",
        medical: "本アプリは音声から睡眠を推定するもので、医療機器ではありません。診断・治療の目的には使用できません。",
        consent: "本アプリをご利用いただくことで、本プライバシーポリシーに同意したものとみなします。",
      },
      dataCollection: {
        title: "2. 収集する情報",
        local: {
          title: "2-1. 端末内に保存されるデータ",
          intro: "以下のデータは、お使いの端末内にのみ保存されます：",
          items: [
            "睡眠の記録（就床・入眠・起床の時刻、30秒ごとの睡眠ステージの推定結果、体動の強さ、いびきの有無、呼吸数の推定値、睡眠時間・睡眠効率・快眠スコアなどの集計値、スヌーズの回数）",
            "ご自身で入力したメモ・行動メモ（アルコール・カフェイン・運動・食事・喫煙・入浴）",
            "いびきなどが検出された場面の短い音声クリップ（1件あたり最大15秒）",
            "アラームの設定（時刻・曜日・ラベル・アラーム音・停止方法・スヌーズ）",
            "アラーム音として取り込んだ楽曲のファイル（ご自身が選んだ曲を、アプリ内にコピーして保存します）",
            "アプリ設定（センサー感度・スヌーズや停止方法の設定・録音の保存期間・表示テーマなど）",
            "パスコードロックを設定した場合の、パスコードの検証用データ（ハッシュ化したもの）とロック・生体認証の設定状態",
            "記録中の一時データ（アプリが途中で終了しても記録を復元できるよう、5分ごとに保存される途中経過）",
          ],
          audioNote: "睡眠中の音声は、端末内でリアルタイムに解析され、その場で破棄されます。夜通しの録音データを保存することはありません。保存されるのは、上記のとおり、いびきなどが検出された場面の短いクリップのみで、この保存は設定でオフにできます。",
        },
        notCollected: {
          title: "2-2. 収集しない情報",
          intro: "本アプリは以下の情報を収集・送信しません：",
          items: [
            "氏名・メールアドレスなどの個人識別情報（アカウント登録はありません）",
            "位置情報",
            "連絡先・写真・カメラなどへのアクセスデータ",
            "Appleの「ヘルスケア」アプリのデータ（本アプリはヘルスケアと連携しません）",
            "アプリ利用状況の分析データ・クラッシュレポート",
            "広告識別子（IDFA）その他の端末を追跡するための識別子",
          ],
        },
      },
      purpose: {
        title: "3. 情報の利用目的",
        intro: "端末内に保存されるデータは、以下の目的のみに使用されます：",
        items: [
          "睡眠中の音（寝息・いびき・寝返り）の解析による、睡眠ステージの推定と睡眠の記録",
          "睡眠グラフ・統計（睡眠時間・睡眠効率・快眠スコア・いびきの傾向など）の表示",
          "アラームの動作（浅い眠りのタイミングでの起床アラーム、停止方法の判定、二度寝防止の体動検知など）",
          "いびきなどの音のクリップの保存と再生",
          "アラームの通知の予約と表示（端末内で完結します）",
          "パスコードロック・生体認証によるアプリのロック解除",
        ],
      },
      thirdParty: {
        title: "4. 第三者への提供",
        content: "本アプリは、ユーザーの情報を第三者に提供・販売・共有することはありません。また、本アプリはサーバーとの通信を行わず、広告や分析のための外部サービス（SDK）も組み込んでいないため、睡眠の記録や音声が外部に送信されることはありません。",
        share: "グラフの詳細画面の共有ボタンを押した場合に限り、その日の睡眠時間・睡眠効率・快眠スコアのテキストが、iOSの共有機能を通じて、ユーザーご自身が選んだ宛先（メッセージなど）に送られます。共有はユーザーが操作したときのみ行われ、音声は含まれません。",
        links: "「睡眠推定について」の画面には、参考文献へのリンクが表示されます。リンクをタップすると、端末のブラウザで外部のウェブサイトが開きます。これらのサイトでの情報の取り扱いは、各サイトのプライバシーポリシーに従います。",
        note: "なお、Appleが提供するApp Store Connectを通じて、ユーザーが共有を許可した場合に限り、ダウンロード数やクラッシュに関する統計情報が匿名の集計データとして開発者に提供されることがあります。これらにはユーザーが本アプリに記録した内容（睡眠の記録や音声など）は含まれません。",
      },
      retention: {
        title: "5. データの保持と削除",
        content: "すべてのデータはお使いの端末内に保存されます。睡眠の記録・メモ・アラーム・取り込んだ楽曲は、ユーザーが削除するか、アプリをアンインストールするまで端末内に保持されます。アプリをアンインストールすると、端末内に保存されたすべてのデータおよび設定情報が削除されます。削除されたデータの復元はできませんのでご注意ください。",
        clips: "いびきなどの音声クリップは、マイページの「録音データ保存期間」で選んだ期間（1・3・5・7・14・30日、初期設定は7日）を過ぎると自動的に削除されます。また、マイページの「録音データ削除」で、いつでもすべて削除できます。15分未満の記録は保存されず、その際に作られた音声クリップも破棄されます。",
        backup: "なお、iPhoneのバックアップ（iCloudバックアップやパソコンへのバックアップ）にアプリのデータが含まれる場合があります。これはiOSの機能によるもので、バックアップの保存先や内容はユーザーご自身がiOSの設定で管理します。本アプリが開発者のサーバーにデータを送信することはありません。",
      },
      permissions: {
        title: "6. アプリのアクセス権限",
        intro: "本アプリが使用するシステム権限・機能は以下のとおりです：",
        items: [
          {
            name: "マイク",
            detail: "睡眠中のいびき・寝息・寝返りの音を解析して睡眠を記録するために使用します。音声は端末内でのみ処理され、外部には送信されません。記録中は、画面をロックしたりアプリを閉じたりしても記録を続けられるよう、バックグラウンドでも音声処理を行います。マイクは、睡眠の記録中と、マイページの「センサーテスト」の実行中にのみ使用します。マイクを許可しない場合、睡眠の記録機能は使用できません。",
          },
          {
            name: "通知",
            detail: "設定したアラームの時刻にお知らせするために使用します。通知は端末内で予約・表示されるローカル通知で、外部のサーバーを経由しません。睡眠モード中は、アプリが終了してしまった場合に備えた保険としても使用します。通知を許可しなくても本アプリを利用できます（アプリが閉じているときにアラームが鳴らなくなる場合があります）。",
          },
          {
            name: "Face ID",
            detail: "パスコードロックを設定した場合に、パスコードの代わりにFace IDなどの生体認証でロックを解除するために使用します。生体認証の処理はiOSが行い、本アプリが顔などの生体情報を取得・保存することはありません。生体認証は任意です。",
          },
          {
            name: "メディアとApple Music（ミュージックライブラリ）",
            detail: "アラーム音に、端末内の曲（購入した曲・CDから取り込んだ曲・ダウンロード済みのApple Musicの曲）を選ぶときにのみ使用します。選んだ曲は、アプリ内にコピーして保存されます。保護された曲は使用できません。ライブラリの情報が外部に送信されることはありません。許可しなくても、その他の機能は利用できます。また、「ファイル」から曲を取り込む場合は、ご自身が選んだファイルのみがアプリ内にコピーされます。",
          },
          {
            name: "加速度センサー（モーション）",
            detail: "アラームの停止方法で「シェイク」を選んだとき、端末を振った回数を数えるために使用します。センサーの値は端末内で処理され、保存・送信されません。この機能に、iOSの許可ダイアログは表示されません。",
          },
        ],
      },
      security: {
        title: "7. セキュリティ",
        content: "本アプリはネットワーク通信を行わないため、外部からの情報漏洩リスクは最小限です。データはお使いの端末のストレージに保存されており、端末のセキュリティ設定（パスコード・Face ID等）によって保護されます。パスコードロックを設定した場合、パスコード自体は保存せず、ハッシュ化した検証用データをiOSのキーチェーン（安全な保管領域）に保存します。睡眠に関する情報は機微な内容を含む場合があるため、端末の紛失・盗難に備えて、端末のロックを必ず設定してください。なお、パスコードを忘れた場合は、アプリの再インストールが必要となり、端末内のデータは失われます。",
      },
      children: {
        title: "8. お子様のプライバシー",
        content: "本アプリは年齢制限なくご利用いただけますが、個人情報の収集は一切行っておりません。お子様が本アプリを使用することに保護者の方の懸念がある場合は、サポートまでお問い合わせください。",
      },
      userRights: {
        title: "9. ユーザーの権利",
        intro: "ユーザーは以下の権利を有します：",
        items: [
          "端末内のデータを自由に閲覧・編集・削除する権利",
          "アプリをアンインストールすることですべてのデータを消去する権利",
          "マイクなどのアクセス許可を、iOSの「設定」からいつでも変更・取り消す権利",
        ],
        howTo: {
          title: "データの削除方法",
          content: "睡眠の記録は、グラフの詳細画面から1件ずつ削除できます（その夜の音声クリップも同時に削除されます）。いびきの音声クリップは、マイページの「録音データ削除」からすべて削除できます。取り込んだ楽曲はマイページの「取り込んだ楽曲」から、アラームは各アラームの削除操作から削除できます。アプリをアンインストールすることでも、端末内のすべてのデータを削除できます。",
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
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated",
    lastUpdatedDate: LAST_UPDATED_EN,
    backToSupport: "Back to Support",
    sections: {
      intro: {
        title: "1. Introduction",
        content: "SleepWave (known in Japan as スヤログ; hereinafter “the App”) is a sleep tracker and smart alarm app that uses your iPhone's microphone by your pillow to measure breathing, snoring, and movement sounds, and estimates and records your sleep. This Privacy Policy explains how information is handled when you use the App.",
        medical: "The App estimates sleep from sound and is not a medical device. It cannot be used for diagnosis or treatment.",
        consent: "By using the App, you agree to this Privacy Policy.",
      },
      dataCollection: {
        title: "2. Information We Collect",
        local: {
          title: "2-1. Data Stored on Your Device",
          intro: "The following data is stored only on your device:",
          items: [
            "Sleep records (bedtime, time you fell asleep, and wake time; sleep stage estimates for every 30 seconds; movement strength; whether snoring was detected; estimated breathing rate; summary values such as sleep time, efficiency, and sleep score; and the number of snoozes)",
            "Memos and activity notes you enter yourself (alcohol, caffeine, exercise, meals, smoking, bath)",
            "Short audio clips (up to 15 seconds each) of moments where snoring and similar sounds were detected",
            "Alarm settings (time, days, label, sound, stop method, and snooze)",
            "Files of songs you import as alarm sounds (songs you choose are copied and stored inside the App)",
            "App settings (sensor sensitivity, snooze and stop method settings, recording retention period, display theme, and so on)",
            "If you set a passcode lock, verification data for the passcode (hashed) and the lock and biometric settings",
            "Temporary data during recording (progress saved every 5 minutes so your recording can be restored if the app closes unexpectedly)",
          ],
          audioNote: "Audio captured while you sleep is analyzed in real time on your device and discarded immediately. The App does not save a recording of your whole night. The only audio saved is the short clips described above of moments where snoring and similar sounds were detected, and you can turn this off in settings.",
        },
        notCollected: {
          title: "2-2. Information We Do Not Collect",
          intro: "The App does not collect or transmit the following:",
          items: [
            "Personally identifiable information such as your name or email address (there is no account registration)",
            "Location information",
            "Data from your contacts, photos, camera, or similar",
            "Data from Apple's Health app (the App does not connect to Health)",
            "Usage analytics or crash reports",
            "Advertising identifiers (IDFA) or any other identifiers used to track your device",
          ],
        },
      },
      purpose: {
        title: "3. How We Use Information",
        intro: "Data stored on your device is used only for the following purposes:",
        items: [
          "Analyzing sounds during sleep (breathing, snoring, movement) to estimate your sleep stages and record your sleep",
          "Showing sleep graphs and stats (sleep time, efficiency, sleep score, snoring trends, and so on)",
          "Alarm operation (waking you during light sleep, checking how you stop the alarm, detecting movement to prevent oversleeping, and so on)",
          "Saving and playing back audio clips of snoring and similar sounds",
          "Scheduling and displaying alarm notifications (handled entirely on your device)",
          "Unlocking the App with a passcode or biometric authentication",
        ],
      },
      thirdParty: {
        title: "4. Disclosure to Third Parties",
        content: "The App does not provide, sell, or share your information with any third party. The App does not communicate with any server and does not include any third-party SDKs for advertising or analytics, so your sleep records and audio are never sent externally.",
        share: "Only when you tap the share button on the graph detail screen, a text of that day's sleep time, efficiency, and sleep score is sent through the iOS share sheet to the destination you choose (such as a messaging app). Sharing happens only when you do it, and audio is not included.",
        links: "The “How sleep is estimated” screen shows links to references. Tapping a link opens an external website in your device's browser. How information is handled on those sites is governed by each site's own privacy policy.",
        note: "Note that, through Apple's App Store Connect, the developer may receive anonymous, aggregated statistics such as download counts and crash data, but only from users who have chosen to share such data with developers. These do not include any content you record in the App (such as your sleep records or audio).",
      },
      retention: {
        title: "5. Data Retention and Deletion",
        content: "All data is stored on your device. Your sleep records, memos, alarms, and imported songs are kept on your device until you delete them or uninstall the App. When you uninstall the App, all data and settings stored on your device are deleted. Please note that deleted data cannot be restored.",
        clips: "Audio clips of snoring and similar sounds are deleted automatically once they are older than the period you choose under “Keep recordings for” on My Page (1, 3, 5, 7, 14, or 30 days; 7 days by default). You can also delete them all at any time with “Delete recordings” on My Page. Recordings shorter than 15 minutes are not saved, and any audio clips created during them are discarded.",
        backup: "Please also note that app data may be included in your iPhone backups (iCloud Backup or a computer backup). This is an iOS feature, and you manage where backups are stored and what they include in iOS settings. The App never sends your data to the developer's servers.",
      },
      permissions: {
        title: "6. App Permissions",
        intro: "The App uses the following system permissions and features:",
        items: [
          {
            name: "Microphone",
            detail: "Used to analyze snoring, breathing, and movement sounds while you sleep so your sleep can be recorded. Audio is processed only on your device and is never sent externally. While recording, audio processing continues in the background so recording can keep going when your screen locks or you leave the app. The microphone is used only while you are recording your sleep and while running “Sensor test” on My Page. If you don't allow the microphone, the sleep recording feature can't be used.",
          },
          {
            name: "Notifications",
            detail: "Used to notify you at your alarm times. These are local notifications scheduled and displayed on your device and do not pass through any external server. During Sleep mode, they also serve as a backup in case the app is closed. You can use the App without allowing notifications (alarms may not ring when the app is closed).",
          },
          {
            name: "Face ID",
            detail: "If you set a passcode lock, used to unlock the App with biometric authentication such as Face ID instead of the passcode. Biometric processing is handled by iOS, and the App never obtains or stores your face or other biometric data. Biometric unlock is optional.",
          },
          {
            name: "Media & Apple Music (Music library)",
            detail: "Used only when you choose a song from your device (a purchased song, a song imported from a CD, or a downloaded Apple Music song) as an alarm sound. The selected song is copied and stored inside the App. Protected songs can't be used. Information from your library is never sent externally. You can use the rest of the App without allowing this. When you import a song from Files instead, only the file you choose is copied into the App.",
          },
          {
            name: "Accelerometer (Motion)",
            detail: "When you choose “Shake” as the alarm stop method, used to count how many times you shake your device. Sensor values are processed on your device and are neither stored nor sent. No iOS permission dialog is shown for this feature.",
          },
        ],
      },
      security: {
        title: "7. Security",
        content: "Because the App does not communicate over the network, the risk of information leaking externally is minimal. Your data is stored in your device's storage and protected by your device's security settings (passcode, Face ID, etc.). If you set a passcode lock, the passcode itself is not stored; only hashed verification data is kept in the iOS Keychain (secure storage). Because sleep-related information can be sensitive, please make sure to set a lock on your device in case it is lost or stolen. If you forget your App passcode, you'll need to reinstall the App, and the data on your device will be lost.",
      },
      children: {
        title: "8. Children's Privacy",
        content: "The App can be used without age restrictions, and it does not collect any personal information. If you are a parent or guardian with concerns about your child using the App, please contact us.",
      },
      userRights: {
        title: "9. Your Rights",
        intro: "You have the following rights:",
        items: [
          "The right to freely view, edit, and delete the data on your device",
          "The right to erase all data by uninstalling the App",
          "The right to change or withdraw permissions such as the microphone at any time in iOS Settings",
        ],
        howTo: {
          title: "How to Delete Your Data",
          content: "You can delete sleep records one at a time from the graph detail screen (that night's audio clips are deleted along with them). You can delete all snore audio clips with “Delete recordings” on My Page. Imported songs can be deleted from “Imported songs” on My Page, and alarms can be deleted from each alarm's delete action. You can also delete all data on your device by uninstalling the App.",
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
export default function SleepWavePrivacyPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
  const s = t.sections;
  const brandName = lang === "ja" ? "スヤログ" : "SleepWave";
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
            href="/support/sleepwave"
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
          <p className="text-gray-700 leading-relaxed mb-3">{s.intro.medical}</p>
          <p className="text-gray-700 leading-relaxed">{s.intro.consent}</p>
        </Section>

        {/* 2. 収集する情報 */}
        <Section>
          <SectionTitle>{s.dataCollection.title}</SectionTitle>

          <h3 className="font-medium text-gray-800 mb-2">{s.dataCollection.local.title}</h3>
          <p className="text-gray-700 mb-2">{s.dataCollection.local.intro}</p>
          <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">
            {s.dataCollection.local.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 leading-relaxed">{s.dataCollection.local.audioNote}</p>
          </div>

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
          <p className="text-gray-700 leading-relaxed mb-3">{s.thirdParty.content}</p>
          <p className="text-gray-700 leading-relaxed mb-3">{s.thirdParty.share}</p>
          <p className="text-gray-700 leading-relaxed mb-3">{s.thirdParty.links}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{s.thirdParty.note}</p>
        </Section>

        {/* 5. データ保持 */}
        <Section>
          <SectionTitle>{s.retention.title}</SectionTitle>
          <p className="text-gray-700 leading-relaxed mb-3">{s.retention.content}</p>
          <p className="text-gray-700 leading-relaxed mb-3">{s.retention.clips}</p>
          <p className="text-gray-700 leading-relaxed">{s.retention.backup}</p>
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
          <p>&copy; {currentYear} {brandName}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
