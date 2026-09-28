"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/sleepwave.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

// ========================================
// 言語定義
// ========================================
type Language = "ja" | "en";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
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
    aboutSupportText: "スヤログ（SleepWave）をご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決しない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返信は通常48時間以内を目安としております。お時間をいただく場合がございますが、ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語でのお問い合わせに対応しております。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらでご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using SleepWave. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese and English.",
    privacyPolicy: "Privacy Policy",
    privacyPolicyText: "Please check here for our privacy policy.",
    backToHub: "Back to App List",
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
      ja: "スヤログ（SleepWave）はどのようなアプリですか？",
      en: "What kind of app is SleepWave?",
    },
    answer: {
      ja: "枕元に置いたiPhoneのマイクで寝息・いびき・寝返りの音を測り、睡眠の状態（覚醒・浅い・深い・REM）を推定して記録する、睡眠記録＆スマートアラームアプリです。睡眠グラフ、睡眠時間・睡眠効率・快眠スコアなどの統計、いびきの記録、睡眠の浅いタイミングで起こすアラームなどに対応しています。",
      en: "SleepWave is a sleep tracker and smart alarm app. It uses your iPhone's microphone by your pillow to measure breathing, snoring, and movement sounds, then estimates your sleep stages (Awake, Light, Deep, REM) and records them. It offers sleep graphs, stats such as sleep time, efficiency, and sleep score, snore recording, and an alarm that wakes you during light sleep.",
    },
  },
  {
    question: {
      ja: "睡眠の記録はどうやって始めますか？",
      en: "How do I start recording my sleep?",
    },
    answer: {
      ja: "画面下部中央の「おやすみ」ボタンをタップすると「おやすみ前の確認」画面が開きます。使うアラームを選び、必要に応じて行動メモを入力して「おやすみ」を押すと記録が始まります。初回はマイクの使用許可が必要です。\n記録中は暗い画面が表示されます。画面を伏せて、枕元に置いてください。画面は点灯したままになるため、充電しながらのご利用をおすすめします。\n朝は、アラームを止めると記録が終了し、その夜のグラフが表示されます。アラームを使わない場合は、画面下の「スワイプして停止」で終了できます。",
      en: "Tap the “Sleep” button at the bottom center of the screen to open the “Before you sleep” screen. Choose an alarm, enter activity notes if you like, then tap “Good night” to start recording. You'll need to allow microphone access the first time.\nWhile recording, a dark screen is shown. Place your phone face down by your pillow. The screen stays on, so we recommend keeping the phone plugged in.\nIn the morning, stopping the alarm ends the recording and shows that night's graph. If you're not using an alarm, you can end the recording with “Swipe to stop” at the bottom of the screen.",
    },
  },
  {
    question: {
      ja: "マイクの許可を求められます。音声は外部に送信されますか？",
      en: "The app asks for microphone access. Is my audio sent anywhere?",
    },
    answer: {
      ja: "マイクは、睡眠中のいびき・寝息・寝返りの音を解析するためだけに使用します。音声の解析はすべてお使いのiPhone内で行われ、外部のサーバーには一切送信されません。録音した音声全体を保存することもありません。保存されるのは、いびきなどが検出された場面の短いクリップ（最大15秒）のみで、この保存はマイページでオフにできます。詳しくはプライバシーポリシーをご確認ください。",
      en: "The microphone is used only to analyze snoring, breathing, and movement sounds while you sleep. All analysis happens on your iPhone, and no audio is ever sent to an external server. The app does not save a full recording of your night — only short clips (up to 15 seconds) of moments where snoring and similar sounds were detected, and you can turn this off on My Page. Please see our Privacy Policy for details.",
    },
  },
  {
    question: {
      ja: "睡眠の状態はどのように推定していますか？ 精度はどのくらいですか？",
      en: "How is my sleep estimated, and how accurate is it?",
    },
    answer: {
      ja: "マイクで寝息・いびき・寝返りの音の強さや周波数の変化を1秒に4回測り、30秒ごとにまとめます。体動の多さ、呼吸リズムの規則性、いびきの有無などから、覚醒・浅い・深い・REMを推定します。\n脳波を測る検査（PSG）と同等の精度ではなく、文献では音声のみの4段階判定で約70%の一致率が報告されています。周囲の騒音や、同じ部屋にいる人の音の影響も受けます。\n本アプリは医療機器ではなく、診断・治療の目的には使用できません。睡眠に関するお悩みや、いびき・無呼吸などが気になる場合は、医師などの専門家にご相談ください。詳細はマイページの「睡眠推定について」でも確認できます。",
      en: "The microphone measures the loudness and frequency of breathing, snoring, and movement sounds four times a second and summarizes them every 30 seconds. From how much you move, how regular your breathing is, and whether you snore, the app estimates Awake, Light, Deep, and REM.\nIt is not as accurate as polysomnography (PSG); studies report about 70% agreement for four-stage classification from audio alone. Background noise and other people in the room also affect the results.\nThis app is not a medical device and cannot be used for diagnosis or treatment. If you have concerns about your sleep, or about snoring or sleep apnea, please consult a doctor or other professional. You can also read more under “How sleep is estimated” on My Page.",
    },
  },
  {
    question: {
      ja: "うまく記録するためのコツはありますか？",
      en: "Any tips for getting good results?",
    },
    answer: {
      ja: "・画面を伏せて、マイクを塞がないように枕元（頭の近く）に置く\n・充電しながら使う（記録中は画面が点灯したままになります）\n・エアコン・扇風機・空気清浄機などの音が大きい場所は避ける\n・夜間は集中モード等で通知や着信が入らないようにしておく\n・寝息などが拾いにくい・反応しすぎる場合は、マイページの「センサー感度」（レベル1〜5）を調整する\nマイページの「センサーテスト」で、寝息・体動・いびきが検出される様子を事前に確認できます。",
      en: "• Place the phone face down near your head by your pillow, without covering the microphone.\n• Keep it plugged in (the screen stays on while recording).\n• Avoid places with loud fans, air conditioners, or air purifiers.\n• Use a Focus mode so notifications and calls don't come in overnight.\n• If breathing is hard to pick up, or it reacts too easily, adjust “Sensor sensitivity” (Level 1–5) on My Page.\nUse “Sensor test” on My Page to check in advance how your breathing, movement, and snoring are detected.",
    },
  },
  {
    question: {
      ja: "アラームの設定方法を教えてください",
      en: "How do I set an alarm?",
    },
    answer: {
      ja: "「おやすみ前の確認」画面の「アラームを追加」、またはアラームタブの「＋」から追加できます。時刻・繰り返し（曜日）・ラベル・アラーム音・停止方法・スヌーズを設定して保存してください。曜日を指定しない場合は、次の1回のみ鳴ります。\nアラーム音は、バイブレーションのみ、または5種類の内蔵音（チャイム・ベル・ビープ・メロディ・やさしい朝）、取り込んだ楽曲から選べます。",
      en: "You can add one from “Add Alarm” on the “Before you sleep” screen, or with the “+” on the Alarm tab. Set the time, repeat days, label, sound, stop method, and snooze, then save. If you don't choose any days, the alarm rings only once, the next time.\nFor the sound you can choose vibration only, one of five built-in sounds (Chime, Bell, Beep, Melody, Gentle Morning), or a song you've imported.",
    },
  },
  {
    question: {
      ja: "「睡眠サイクル」で起こす、とはどういうことですか？",
      en: "What does waking me by “Sleep cycle” mean?",
    },
    answer: {
      ja: "マイページの「アラームタイプ」で設定します。\n・設定方法：「時刻選択」（アラームの時刻に合わせる）または「睡眠時間」（就寝ボタンを押してから指定した時間後に起こす）\n・鳴らすタイミング：「睡眠サイクル」または「設定時刻」\n「睡眠サイクル」では、設定時刻の10・15・20・30・40分前から、浅い眠りに入ったタイミングでアラームを鳴らします（初期設定は30分前）。浅い眠りが見つからなかった場合は、設定時刻に鳴ります。「設定時刻」を選ぶと、ちょうど設定時刻に鳴ります。",
      en: "You can set this under “Alarm type” on My Page.\n• Set by: “Clock time” (match the alarm's time) or “Sleep duration” (wake you after the chosen time from when you start recording).\n• Wake timing: “Sleep cycle” or “Set time”.\nWith “Sleep cycle,” the alarm rings at the moment you enter light sleep, within 10, 15, 20, 30, or 40 minutes before your set time (30 minutes by default). If light sleep isn't detected, the alarm rings at the set time. With “Set time,” it rings exactly at the set time.",
    },
  },
  {
    question: {
      ja: "アラームが鳴りません／鳴らないのが心配です",
      en: "My alarm didn't ring / I'm worried it won't",
    },
    answer: {
      ja: "次の点をご確認ください。\n1. アラームが「オン」になっているか\n2. 「アラーム音を消して波形のみ記録」がオフになっているか（オンだとアラームは鳴りません）\n3. 端末の音量が小さすぎないか、アラーム音が「バイブレーションのみ」になっていないか\n4. iOSの「設定」→「SleepWave」→「通知」で通知が許可されているか（睡眠モードを使っていないときや、アプリが終了しているときのアラームは、通知で鳴らします）\n5. 集中モード・おやすみモード・マナーモードの設定（通知で鳴るアラームはiOSの設定の影響を受けます）\n6. 睡眠モードで記録しているときは、アプリを終了（スワイプで閉じる）していないか\nアラームは、大切な予定に使う前に、時刻を近くに設定して試してから使うことをおすすめします。",
      en: "Please check the following.\n1. Make sure the alarm is turned on.\n2. Make sure “Silence alarm, record sound only” is off (when it is on, alarms will not ring).\n3. Make sure your device volume isn't too low and the alarm sound isn't set to “Vibration only”.\n4. In iOS Settings → SleepWave → Notifications, make sure notifications are allowed (when you're not in Sleep mode, or the app has been closed, alarms ring through notifications).\n5. Check your Focus, Do Not Disturb, and silent mode settings (alarms that ring through notifications are affected by iOS settings).\n6. While recording in Sleep mode, make sure you didn't quit the app (swipe it away).\nBefore relying on an alarm for an important event, we recommend testing it first by setting it a few minutes ahead.",
    },
  },
  {
    question: {
      ja: "アラームの止め方（スライド・シェイク・計算）とスヌーズについて教えてください",
      en: "How do the stop methods (Slide, Shake, Math) and snooze work?",
    },
    answer: {
      ja: "アラームごとに、または既定の停止方法として、次の3つから選べます。\n・スライド：スライドして停止\n・シェイク：iPhoneを振って停止（初期設定は20回。5〜60回で変更可）\n・計算：計算問題に正解して停止（初期設定は3問。1〜10問で変更可）\nスヌーズは初期設定で最大3回・9分間隔です。回数（オフ〜10回）と間隔（1〜20分）はマイページで変更できます。アラームごとにスヌーズのオン・オフも設定できます。",
      en: "You can choose from three methods for each alarm, or as the default:\n• Slide: slide to stop.\n• Shake: shake your iPhone to stop (20 shakes by default, adjustable from 5 to 60).\n• Math: solve math problems to stop (3 correct answers by default, adjustable from 1 to 10).\nSnooze is up to 3 times at 9-minute intervals by default. You can change the count (off to 10) and interval (1 to 20 minutes) on My Page, and turn snooze on or off for each alarm.",
    },
  },
  {
    question: {
      ja: "「二度寝防止」とは何ですか？",
      en: "What is “Prevent oversleeping”?",
    },
    answer: {
      ja: "マイページの「二度寝防止」をオンにすると、アラームを止めた後に体を動かした様子が検知されない場合、しばらくしてからもう一度アラームが鳴ります（3・5・10・15・20分から選べます。初期設定はオフ、オンにした場合は5分です）。体動が確認できると、記録が終了します。",
      en: "When “Prevent oversleeping” is turned on in My Page, and no movement is detected after you stop the alarm, the alarm rings again after a while (choose from 3, 5, 10, 15, or 20 minutes; it is off by default, and 5 minutes once turned on). Once movement is detected, the recording ends.",
    },
  },
  {
    question: {
      ja: "好きな曲をアラーム音にできますか？",
      en: "Can I use my own song as an alarm sound?",
    },
    answer: {
      ja: "はい。アラームの編集画面でアラーム音を選ぶ画面に、「楽曲を追加」（ファイルから取り込み）と「ミュージックから選ぶ」の2つの方法があります。\nミュージックライブラリからは、iTunesで購入した曲、CDから取り込んだ曲、Apple Musicでダウンロード済みの曲を選べます。サブスク再生のみでダウンロードしていない曲や、保護された曲は使えません。ミュージックライブラリを使う場合は、iOSのメディアライブラリへのアクセス許可が必要です。\n取り込んだ曲はアプリ内に保存され、マイページの「取り込んだ楽曲」から試聴・名前の変更・削除ができます。削除すると、その曲を使っていたアラームは「チャイム」に戻ります。",
      en: "Yes. On the sound selection screen of the alarm edit screen, there are two ways: “Add a song” (import from a file) and “Choose from Music”.\nFrom your Music library you can choose songs purchased on iTunes, songs imported from CDs, and songs downloaded from Apple Music. Streaming-only songs that haven't been downloaded, and protected songs, can't be used. Using the Music library requires permission to access your media library in iOS.\nImported songs are stored inside the app, and you can preview, rename, or delete them under “Imported songs” on My Page. If you delete a song, alarms using it go back to “Chime”.",
    },
  },
  {
    question: {
      ja: "記録が保存されません",
      en: "My recording wasn't saved",
    },
    answer: {
      ja: "15分未満の記録は保存されません。記録を止めるときに「記録を保存しません」と表示された場合は、15分以上記録するか、そのまま停止すると記録は破棄されます。\nまた、記録中にアプリが終了してしまった場合は、5分ごとに保存されている途中経過から、次回アプリを開いたときに記録を復元します（15分以上記録されていた場合）。",
      en: "Recordings shorter than 15 minutes are not saved. If you see “Recording will not be saved” when stopping, keep recording for at least 15 minutes, or the recording will be discarded if you stop anyway.\nIf the app closes while recording, the next time you open the app, it restores your recording from progress saved every 5 minutes (if at least 15 minutes had been recorded).",
    },
  },
  {
    question: {
      ja: "グラフや統計の見方を教えてください",
      en: "How do I read the graphs and stats?",
    },
    answer: {
      ja: "「グラフ」タブでは、日ごとの睡眠ステージ（覚醒・REM・浅い・深い）をグラフで確認でき、就床・入眠・起床の時刻、睡眠時間、入眠潜時（寝付くまでの時間）、中途覚醒の回数、睡眠効率（就床時間に対する睡眠時間の割合）、快眠スコア、いびきの時間などを見られます。「メモ」「行動」「寝言・音」のタブでは、メモや行動の記録、保存された音を確認できます。\n「統計」タブでは、「睡眠」で月ごとの平均就床時刻・平均睡眠時間・平均睡眠効率、「いびき」でいびきの割合や時間、いびきのあった日数、「統計」で日・週・月・年ごとの平均や睡眠の傾向（睡眠周期・中途覚醒・睡眠時間・眠りの深さ・寝付き）、行動メモの集計を確認できます。\nこれらはすべて音声からの推定値です。",
      en: "On the “Graph” tab you can see each day's sleep stages (Awake, REM, Light, Deep) as a graph, along with bedtime, time you fell asleep, wake time, sleep time, sleep latency, number of awakenings, sleep efficiency (sleep time as a share of time in bed), sleep score, and snoring time. The “Memo,” “Activity,” and “Sounds” tabs let you view your notes, activity records, and saved sounds.\nOn the “Stats” tab, “Sleep” shows monthly averages of bedtime, sleep time, and sleep efficiency; “Snoring” shows your snoring ratio, time, and number of nights with snoring; and “Summary” shows averages by day, week, month, or year, your sleep trends (cycles, awakenings, duration, depth, falling asleep), and a summary of your activity notes.\nAll of these are estimates from audio.",
    },
  },
  {
    question: {
      ja: "行動メモ・メモは何のために使いますか？",
      en: "What are the activity notes and memos for?",
    },
    answer: {
      ja: "その日の行動（アルコール・カフェイン・運動・食事・喫煙・入浴）を記録して、睡眠との関係を振り返るための機能です。記録開始時に入力する設定は、マイページの「睡眠メモ」→「記録開始時に入力」で切り替えられます。グラフの詳細画面の「メモ」「行動」からも、あとから入力・編集できます。",
      en: "They let you record your day's activities (alcohol, caffeine, exercise, meals, smoking, bath) so you can look back at how they relate to your sleep. You can turn on entering them when you start recording under “Sleep memo” → “Ask when starting” on My Page. You can also add or edit them later from “Memo” and “Activity” on the graph detail screen.",
    },
  },
  {
    question: {
      ja: "いびきの録音について教えてください（保存期間・削除方法）",
      en: "How does snore recording work (retention and deletion)?",
    },
    answer: {
      ja: "「いびきを録音する」がオンの場合、いびきなどの音が検出された場面を、短いクリップ（最大15秒）として端末内に保存します。同じ夜に保存されるのは最大30件で、保存の間隔は2分以上あけられます。保存したクリップは、グラフ詳細の「寝言・音」タブで再生できます。\n保存期間は、マイページの「録音データ保存期間」で1・3・5・7・14・30日から選べます（初期設定は7日）。期間を過ぎたクリップは自動的に削除されます。\nすぐに削除したい場合は、マイページの「録音データ削除」で、保存されているいびき録音をすべて削除できます。録音自体を止めたい場合は、「いびきを録音する」をオフにしてください。",
      en: "When “Record snoring” is on, moments where snoring and similar sounds are detected are saved on your device as short clips (up to 15 seconds each). Up to 30 clips are saved per night, at least 2 minutes apart. You can play them from the “Sounds” tab on the graph detail screen.\nUnder “Keep recordings for” on My Page you can choose 1, 3, 5, 7, 14, or 30 days (7 days by default). Clips older than that are deleted automatically.\nTo delete them right away, use “Delete recordings” on My Page to delete all saved snore recordings. To stop recording clips altogether, turn “Record snoring” off.",
    },
  },
  {
    question: {
      ja: "記録を削除するにはどうすればよいですか？",
      en: "How do I delete my records?",
    },
    answer: {
      ja: "・睡眠の記録：グラフで日を選び、詳細画面のゴミ箱アイコンから1件ずつ削除できます（その夜のいびき録音も同時に削除されます）。\n・いびき録音：マイページの「録音データ削除」で、すべて削除できます。\n・取り込んだ楽曲：マイページの「取り込んだ楽曲」から削除できます。\n・アラーム：アラームを左にスワイプするか、アラームの編集画面から削除できます。\nいずれも元に戻せません。また、アプリを削除すると、端末内のデータはすべて消去されます。",
      en: "• Sleep records: select a day on the graph and tap the trash icon on the detail screen to delete them one at a time (that night's snore recordings are deleted too).\n• Snore recordings: use “Delete recordings” on My Page to delete them all.\n• Imported songs: delete them from “Imported songs” on My Page.\n• Alarms: swipe an alarm to the left, or delete it from the alarm edit screen.\nNone of these can be undone. Deleting the app also erases all data stored on your device.",
    },
  },
  {
    question: {
      ja: "睡眠の記録を共有できますか？",
      en: "Can I share my sleep records?",
    },
    answer: {
      ja: "はい。グラフの詳細画面の共有アイコンから、その日の睡眠時間・睡眠効率・快眠スコアをテキストとして、iOSの共有機能でメッセージなどに送れます。共有はご自身で操作したときだけ行われ、共有するのは表示されるテキストのみです（音声やグラフの詳細は含まれません）。",
      en: "Yes. From the share icon on the graph detail screen, you can send that day's sleep time, efficiency, and sleep score as text using the iOS share sheet, for example to a messaging app. Sharing only happens when you do it yourself, and only the text shown is shared (audio and graph details are not included).",
    },
  },
  {
    question: {
      ja: "パスコードロックを使えますか？ パスコードを忘れたら？",
      en: "Can I lock the app with a passcode? What if I forget it?",
    },
    answer: {
      ja: "はい。マイページの「セキュリティ」で「パスコードロック」をオンにし、4桁のパスコードを設定できます。パスコードを設定すると、Face ID（または端末の生体認証）でのロック解除も選べます。パスコードの変更もマイページからできます。\nパスコードを忘れた場合、お問い合わせいただいても解除できません。アプリを削除して再インストールする必要があり、その場合、端末内の記録データはすべて失われますのでご注意ください。",
      en: "Yes. Under “Security” on My Page, turn on “Passcode Lock” and set a 4-digit passcode. Once set, you can also choose to unlock with Face ID (or your device's biometrics). You can change the passcode from My Page as well.\nIf you forget your passcode, we cannot reset it. You'll need to delete and reinstall the app, and all records stored on your device will be lost.",
    },
  },
  {
    question: {
      ja: "ライトモードに切り替えたり、アプリの言語を変更したりできますか？",
      en: "Can I switch to light mode or change the app's language?",
    },
    answer: {
      ja: "画面の色は、マイページの「外観」の「ライトモード」で切り替えられます（初期設定はダークです）。\nアプリの言語は、iOSのシステム言語に従います。iOSの言語が日本語の場合は日本語、それ以外の場合は英語で表示されます。",
      en: "You can switch the screen colors with “Light mode” under “Appearance” on My Page (dark is the default).\nThe app's language follows your iOS system language: Japanese if your iOS language is Japanese, and English otherwise.",
    },
  },
  {
    question: {
      ja: "作成したデータはどこに保存されますか？ 機種変更時はどうなりますか？",
      en: "Where is my data stored, and what happens if I change devices?",
    },
    answer: {
      ja: "睡眠の記録・アラーム・設定・いびき録音・取り込んだ楽曲などのデータは、すべてお使いの端末内にのみ保存されます。アカウント登録やクラウド同期の機能はなく、開発者のサーバーにデータが送信されることもありません。そのため、アプリを削除したり機種変更したりすると、アプリの機能でデータを引き継ぐことはできません。ただし、iPhoneのバックアップ（iCloudバックアップやパソコンへのバックアップ）にアプリのデータが含まれる場合があり、その復元によって新しい端末に戻る場合があります。これはiOSの機能によるもので、アプリ側では制御していません。",
      en: "Your sleep records, alarms, settings, snore recordings, and imported songs are stored only on your device. There are no accounts or cloud sync, and no data is sent to the developer's servers. This means data can't be carried over using the app if you delete it or switch devices. However, app data may be included in your iPhone backups (iCloud Backup or a computer backup), so restoring from a backup may bring it to a new device. This is an iOS feature and is not controlled by the app.",
    },
  },
  {
    question: {
      ja: "広告の表示やアプリ内課金はありますか？",
      en: "Are there ads or in-app purchases?",
    },
    answer: {
      ja: "本アプリには、広告の表示やアプリ内課金・サブスクリプションの仕組みはありません。",
      en: "The app does not include ads, in-app purchases, or subscriptions.",
    },
  },
  {
    question: {
      ja: "不具合を見つけた・機能の要望があります",
      en: "I found a bug / I have a feature request",
    },
    answer: {
      ja: "ご連絡ありがとうございます。不具合の場合は、お使いの端末の機種・iOSのバージョン・アプリのバージョン（マイページの「バージョン」）、および症状（可能であれば発生までの操作手順）をお知らせいただけるとスムーズに確認できます。要望も、下記のお問い合わせからお気軽にお送りください。",
      en: "Thank you for letting us know. For bugs, please include your device model, iOS version, app version (“Version” on My Page), and a description of the problem (and the steps that led to it, if possible) so we can look into it quickly. Feature requests are also welcome — please send them through the contact form below.",
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
export default function SleepWaveSupportPage() {
  const [lang, setLang] = useState<Language>("ja");
  const t = TRANSLATIONS[lang];
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
            href="/support/sleepwave/privacy"
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
