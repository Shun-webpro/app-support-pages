"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/Dairygram.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

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
    aboutSupportText: "日記グラム（Dairygram）をご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
    faq: "よくある質問",
    contactUs: "お問い合わせ",
    contactText: "上記で解決しない場合は、メールにてお問い合わせください。",
    contactButton: "メールでお問い合わせ",
    responseTime: "返信目安",
    responseTimeText: "お問い合わせへの返信は通常48時間以内を目安としております。お時間をいただく場合がございますが、ご了承ください。",
    supportedLanguages: "対応言語",
    supportedLanguagesText: "日本語・英語・韓国語でのお問い合わせに対応しております。",
    privacyPolicy: "プライバシーポリシー",
    privacyPolicyText: "プライバシーポリシーはこちらでご確認いただけます。",
    backToHub: "アプリ一覧に戻る",
  },
  ko: {
    support: "지원",
    aboutSupport: "지원 안내",
    aboutSupportText: "Dairygram을 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
    faq: "자주 묻는 질문",
    contactUs: "문의하기",
    contactText: "위에서 해결책을 찾지 못하셨다면 이메일로 문의해 주세요.",
    contactButton: "이메일로 문의",
    responseTime: "응답 시간",
    responseTimeText: "문의에 대한 답변은 보통 48시간 이내에 드리고 있습니다. 양해 부탁드립니다.",
    supportedLanguages: "지원 언어",
    supportedLanguagesText: "일본어, 영어, 한국어로 문의하실 수 있습니다.",
    privacyPolicy: "개인정보 처리방침",
    privacyPolicyText: "개인정보 처리방침은 여기에서 확인하세요.",
    backToHub: "앱 목록으로 돌아가기",
  },
  en: {
    support: "Support",
    aboutSupport: "About Support",
    aboutSupportText: "Thank you for using Dairygram. If you have any questions or issues, please check the FAQ below or contact us.",
    faq: "FAQ",
    contactUs: "Contact Us",
    contactText: "If you cannot find a solution above, please contact us by email.",
    contactButton: "Contact via Email",
    responseTime: "Response Time",
    responseTimeText: "We aim to respond to inquiries usually within 48 hours. Thank you for your patience.",
    supportedLanguages: "Supported Languages",
    supportedLanguagesText: "We accept inquiries in Japanese, English, and Korean.",
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
      ja: "日記グラム（Dairygram）はどのようなアプリですか？",
      ko: "Dairygram은 어떤 앱인가요?",
      en: "What kind of app is Dairygram?",
    },
    answer: {
      ja: "日記グラム（Dairygram）は、写真や動画を添えて日記を記録できるフォト日記アプリです。タイトルと本文に加えて、気分（5段階）と天気（5種類）を記録でき、ブックマークも付けられます。ホーム画面での一覧表示、月ごとに縦にスクロールして見返せる「閲覧」、気分・投稿数などの「統計」、パスコード・生体認証によるロックなどを利用できます。初回起動時には、使い方の見本となるサンプル日記が1件入っています（編集・削除できます）。",
      ko: "Dairygram은 사진과 동영상을 곁들여 일기를 기록할 수 있는 포토 다이어리 앱입니다. 제목과 본문에 더해 기분(5단계)과 날씨(5종류)를 기록할 수 있으며 북마크도 추가할 수 있습니다. 홈 화면의 목록 표시, 월별로 세로 스크롤하며 되돌아볼 수 있는 「열람」, 기분・게시 수 등의 「통계」, 패스코드・생체 인증 잠금 등을 사용할 수 있습니다. 최초 실행 시에는 사용법 예시용 샘플 일기가 1건 들어 있습니다(편집・삭제 가능).",
      en: "Dairygram is a photo diary app that lets you record entries with photos and videos. In addition to a title and body text, you can record your mood (5 levels) and the weather (5 types), and bookmark entries. You can use the list on the Home screen, \"Browse\" to scroll back through each month, \"Stats\" for mood and post-count charts, and passcode/biometric lock. On first launch, a sample entry is included to show how the app works (you can edit or delete it).",
    },
  },
  {
    question: {
      ja: "日記の書き方・写真や動画の追加方法を教えてください",
      ko: "일기 작성 방법・사진과 동영상 추가 방법을 알려주세요",
      en: "How do I write an entry and add photos or videos?",
    },
    answer: {
      ja: "画面下のタブバー中央にある「＋」ボタンから作成画面が開きます。タイトル（50文字以内）と本文を入力し、気分と天気を選択します。日付は初期状態で当日ですが、日付をタップして変更すれば過去の日付としても記録できます。写真・動画は「アルバムから選ぶ」または「カメラで撮影」から追加でき、複数追加できます。追加したものは、長押しして左右にドラッグすると並び替えられ、写真は切り抜き（トリミング）もできます。先頭のものが「表紙」として一覧に表示されます。タイトル・本文・写真/動画のいずれも空のままでは保存できません。",
      ko: "화면 하단 탭 바 중앙의 「＋」 버튼에서 작성 화면이 열립니다. 제목(50자 이내)과 본문을 입력하고 기분과 날씨를 선택합니다. 날짜는 기본적으로 당일이지만, 날짜를 탭하여 변경하면 과거 날짜로도 기록할 수 있습니다. 사진・동영상은 「앨범에서 선택」 또는 「카메라로 촬영」에서 추가할 수 있으며 여러 개 추가할 수 있습니다. 추가한 항목은 길게 누른 채 좌우로 드래그하면 순서를 바꿀 수 있고, 사진은 잘라내기(크롭)도 할 수 있습니다. 맨 앞의 항목이 「표지」로 목록에 표시됩니다. 제목・본문・사진/동영상이 모두 비어 있으면 저장할 수 없습니다.",
      en: "Tap the \"+\" button in the center of the tab bar to open the composer. Enter a title (up to 50 characters) and body text, then choose a mood and the weather. The date defaults to today, but you can tap it to record an entry for a past date. Add photos or videos via \"Choose from Album\" or \"Camera\" — you can add several. Long-press and drag left or right to reorder them, and photos can be cropped. The first item is used as the \"cover\" in lists. An entry cannot be saved if the title, body, and photos/videos are all empty.",
    },
  },
  {
    question: {
      ja: "1日に複数の日記を記録できますか？",
      ko: "하루에 여러 개의 일기를 기록할 수 있나요?",
      en: "Can I record more than one entry per day?",
    },
    answer: {
      ja: "はい、1日に何件でも記録できます。同じ日付の日記は、「閲覧」画面では先に書いたものが上、あとに書いたものが下の順で表示されます。",
      ko: "네, 하루에 몇 개든 기록할 수 있습니다. 같은 날짜의 일기는 「열람」 화면에서 먼저 쓴 것이 위, 나중에 쓴 것이 아래 순서로 표시됩니다.",
      en: "Yes, you can record as many entries as you like on a single day. On the Browse screen, entries from the same date are shown in the order they were written, with the earlier one on top.",
    },
  },
  {
    question: {
      ja: "気分や天気にはどのような種類がありますか？",
      ko: "기분이나 날씨에는 어떤 종류가 있나요?",
      en: "What mood and weather options are available?",
    },
    answer: {
      ja: "気分は「最悪」「悪い」「普通」「良い」「最高」の5段階、天気は「晴れ」「曇り」「雨」「雪」「雷」の5種類から選べます。作成画面を開いた時点の初期値は、気分が「普通」、天気が「晴れ」です。",
      ko: "기분은 「최악」「나쁨」「보통」「좋음」「최고」의 5단계, 날씨는 「맑음」「흐림」「비」「눈」「천둥」의 5종류 중에서 선택할 수 있습니다. 작성 화면을 열었을 때의 기본값은 기분이 「보통」, 날씨가 「맑음」입니다.",
      en: "Mood has 5 levels — Terrible, Bad, Okay, Good, and Great — and weather has 5 types — Sunny, Cloudy, Rainy, Snowy, and Thunder. When you open the composer, the defaults are \"Okay\" for mood and \"Sunny\" for weather.",
    },
  },
  {
    question: {
      ja: "ホーム画面のグリッド表示とリスト表示の違いは？ブックマークや複数削除もできますか？",
      ko: "홈 화면의 그리드 표시와 리스트 표시의 차이는? 북마크나 여러 개 삭제도 가능한가요?",
      en: "What is the difference between Grid and List view on the Home screen? Can I bookmark or delete multiple entries?",
    },
    answer: {
      ja: "ホーム画面の右上のボタンで、グリッド表示とリスト表示を切り替えられます。日記をタップすると詳細が開き、そこから編集・削除・ブックマークの付け外しができ、前後の日記へ移動もできます。ブックマークのボタンをオンにすると、ブックマークした日記だけを表示します。左上の選択ボタンを押すと複数選択モードになり、選んだ日記をまとめて削除できます。",
      ko: "홈 화면 오른쪽 위의 버튼으로 그리드 표시와 리스트 표시를 전환할 수 있습니다. 일기를 탭하면 상세 화면이 열리며, 여기에서 편집・삭제・북마크 설정/해제를 할 수 있고 앞뒤 일기로 이동할 수도 있습니다. 북마크 버튼을 켜면 북마크한 일기만 표시됩니다. 왼쪽 위의 선택 버튼을 누르면 다중 선택 모드가 되어 선택한 일기를 한꺼번에 삭제할 수 있습니다.",
      en: "Use the button at the top right of the Home screen to switch between Grid and List view. Tap an entry to open its details, where you can edit, delete, bookmark or unbookmark it, and move to the previous or next entry. Turn on the bookmark button to show only bookmarked entries. Tap the select button at the top left to enter multi-select mode and delete the selected entries at once.",
    },
  },
  {
    question: {
      ja: "「閲覧」画面ではどのようなことができますか？",
      ko: "「열람」 화면에서는 어떤 것을 할 수 있나요?",
      en: "What can I do on the Browse screen?",
    },
    answer: {
      ja: "月ごとの日記を、SNSのフィードのように縦にスクロールして見返せる画面です。古い日記が上、新しい日記が下に並びます。上部の矢印で月を切り替えられ、各投稿のメニューから編集・削除、ブックマークの付け外しができます。動画はその場で再生できます。",
      ko: "월별 일기를 SNS 피드처럼 세로로 스크롤하며 되돌아볼 수 있는 화면입니다. 오래된 일기가 위, 새로운 일기가 아래에 나열됩니다. 상단의 화살표로 월을 전환할 수 있으며, 각 게시물의 메뉴에서 편집・삭제, 북마크 설정/해제를 할 수 있습니다. 동영상은 그 자리에서 재생할 수 있습니다.",
      en: "Browse lets you scroll back through each month's entries vertically, like a social feed, with older entries at the top and newer ones below. Use the arrows at the top to switch months, and use each post's menu to edit, delete, or bookmark it. Videos can be played right there.",
    },
  },
  {
    question: {
      ja: "「統計」画面では何がわかりますか？",
      ko: "「통계」 화면에서는 무엇을 알 수 있나요?",
      en: "What does the Stats screen show?",
    },
    answer: {
      ja: "総記録数、連続記録（現在・最長）、記録した日数、写真の枚数、平均の文字数のほか、選んだ月の気分の内訳（円グラフ）と気分の推移、天気の内訳、曜日別の投稿数、文字数、写真・動画の数、投稿数（週別／月別）のグラフを確認できます。月は矢印で切り替えて、過去の記録も振り返れます。",
      ko: "총 기록 수, 연속 기록(현재・최장), 기록한 일수, 사진 수, 평균 글자 수 외에 선택한 달의 기분 내역(원 그래프)과 기분 추이, 날씨 내역, 요일별 게시 수, 글자 수, 사진・동영상 수, 게시 수(주별/월별) 그래프를 확인할 수 있습니다. 달은 화살표로 전환하여 과거 기록도 되돌아볼 수 있습니다.",
      en: "You can see your total entries, streaks (current and longest), days written, photo count, and average length, plus — for the selected month — a mood breakdown (pie chart) and mood trend, a weather breakdown, posts by weekday, character counts, photo/video counts, and a post-count chart (weekly/monthly). Use the arrows to switch months and look back at past records.",
    },
  },
  {
    question: {
      ja: "起動時に表示される「連続記録」とは何ですか？",
      ko: "실행 시 표시되는 「연속 기록」이란 무엇인가요?",
      en: "What is the \"streak\" shown when I open the app?",
    },
    answer: {
      ja: "アプリを開いた日が何日連続しているかを、1日1回、起動時に表示するものです（直近7日間の様子も表示されます）。「統計」画面の連続記録は、日記を書いた日の連続日数を表すもので、こちらとは別に集計されています。",
      ko: "앱을 연 날이 며칠 연속인지를 하루에 한 번, 실행 시에 표시하는 것입니다(최근 7일간의 상황도 표시됩니다). 「통계」 화면의 연속 기록은 일기를 쓴 날의 연속 일수를 나타내며, 이것과는 별도로 집계됩니다.",
      en: "It shows, once a day when you open the app, how many days in a row you have opened it (along with the past 7 days). The streak on the Stats screen counts consecutive days on which you wrote an entry and is tallied separately.",
    },
  },
  {
    question: {
      ja: "下書きの自動保存機能について教えてください",
      ko: "임시 저장 자동 저장 기능에 대해 알려주세요",
      en: "How does draft auto-save work?",
    },
    answer: {
      ja: "マイページの「自動下書き保存」がオン（初期設定）の場合、新規作成中のタイトル・本文・写真・気分・天気などが自動的に下書きとして保存されます。保存前に作成画面を閉じたりアプリを終了したりしても、次に作成画面を開いたときに下書きが復元されます。日記を保存すると下書きはクリアされます。既存の日記の編集中は下書き保存の対象外です。",
      ko: "마이페이지의 「자동 임시 저장」이 켜져 있는 경우(기본 설정), 새로 작성 중인 제목・본문・사진・기분・날씨 등이 자동으로 임시 저장됩니다. 저장하기 전에 작성 화면을 닫거나 앱을 종료해도 다음에 작성 화면을 열 때 임시 저장 내용이 복원됩니다. 일기를 저장하면 임시 저장 내용은 삭제됩니다. 기존 일기를 편집하는 중에는 임시 저장 대상에서 제외됩니다.",
      en: "When \"Auto-Save Drafts\" on My Page is on (the default), the title, body, photos, mood, weather, and more of a new entry are saved automatically as a draft. Even if you close the composer or quit the app before saving, the draft is restored the next time you open the composer. The draft is cleared once the entry is saved. Editing an existing entry is not covered by draft auto-save.",
    },
  },
  {
    question: {
      ja: "写真の「自動圧縮」と「使った写真を元から削除」について教えてください",
      ko: "사진의 「자동 압축」과 「사용한 사진을 원본에서 삭제」에 대해 알려주세요",
      en: "What are \"Auto Compress\" and \"Delete used photos\"?",
    },
    answer: {
      ja: "どちらもマイページの「日記」で切り替えられます（初期設定はどちらもオン）。「自動圧縮」は、追加した写真をJPEG形式に圧縮して保存し、容量を節約します（動画は圧縮されません）。「使った写真を元から削除」は、アルバムから選んだ写真を日記に保存したあと、アルバム側の元の写真を削除する機能です。削除前に確認が表示され、削除した写真は「最近削除した項目」に移ります。日記に入れた写真はアプリ内に残ります。元の写真を残したい場合は、確認画面で「残す」を選ぶか、この設定をオフにしてください。",
      ko: "둘 다 마이페이지의 「일기」에서 전환할 수 있습니다(기본 설정은 둘 다 켜짐). 「자동 압축」은 추가한 사진을 JPEG 형식으로 압축하여 저장해 용량을 절약합니다(동영상은 압축되지 않습니다). 「사용한 사진을 원본에서 삭제」는 앨범에서 선택한 사진을 일기에 저장한 후 앨범의 원본 사진을 삭제하는 기능입니다. 삭제 전에 확인 화면이 표시되며, 삭제한 사진은 「최근 삭제된 항목」으로 이동합니다. 일기에 넣은 사진은 앱 안에 남아 있습니다. 원본을 남기고 싶다면 확인 화면에서 「남기기」를 선택하거나 이 설정을 꺼 주세요.",
      en: "Both can be toggled under \"Diary\" on My Page (both are on by default). \"Auto Compress\" saves added photos compressed as JPEG to save storage (videos are not compressed). \"Delete used photos\" deletes the original photo from your photo library after you save an album photo into an entry. A confirmation is shown first, and deleted photos go to \"Recently Deleted\". The photo inside your diary stays in the app. To keep your originals, choose \"Keep\" in the confirmation or turn this setting off.",
    },
  },
  {
    question: {
      ja: "「写真ライブラリー」とは何ですか？",
      ko: "「사진 라이브러리」란 무엇인가요?",
      en: "What is the \"Photo Library\" in the app?",
    },
    answer: {
      ja: "マイページの「写真ライブラリー」では、日記に使った写真・動画を月ごとのフォルダーで見られ、選択して削除することもできます。日記に使われている写真・動画を削除した場合は、その日記からも外れ、元に戻すことはできません。なお、日記そのものを削除しても、添付していた写真・動画のファイルが端末内に残る場合があります。容量を空けたいときは、日記を削除する前に写真ライブラリーから削除してください。",
      ko: "마이페이지의 「사진 라이브러리」에서는 일기에 사용한 사진・동영상을 월별 폴더로 볼 수 있고, 선택하여 삭제할 수도 있습니다. 일기에 사용 중인 사진・동영상을 삭제하면 해당 일기에서도 제거되며 되돌릴 수 없습니다. 또한 일기 자체를 삭제해도 첨부했던 사진・동영상 파일이 기기 내에 남을 수 있습니다. 용량을 확보하려면 일기를 삭제하기 전에 사진 라이브러리에서 삭제해 주세요.",
      en: "In \"Photo Library\" on My Page, you can browse the photos and videos used in your diary in monthly folders and select items to delete. Deleting a photo or video used in an entry also removes it from that entry and cannot be undone. Note that deleting an entry itself may leave its attached photo and video files on your device. To free up storage, delete them from the Photo Library before deleting the entry.",
    },
  },
  {
    question: {
      ja: "パスコードやFace ID（顔認証）でアプリをロックできますか？",
      ko: "패스코드나 Face ID(안면 인식)로 앱을 잠글 수 있나요?",
      en: "Can I lock the app with a passcode or Face ID?",
    },
    answer: {
      ja: "はい。マイページの「セキュリティ」で「パスコードロック」をオンにすると、4桁のパスコードを設定できます。設定後は、アプリを開くときやバックグラウンドから戻ったときにロック画面が表示されます。「生体認証でロック解除」をオンにすると、Face ID／Touch IDでも解除できます。パスコードの変更や解除も同じ場所から行えます。\n※パスコードを忘れるとアプリを開けなくなります。その場合はアプリを再インストールする必要があり、端末内の日記や写真も削除されますのでご注意ください。",
      ko: "네. 마이페이지의 「보안」에서 「패스코드 잠금」을 켜면 4자리 패스코드를 설정할 수 있습니다. 설정 후에는 앱을 열 때나 백그라운드에서 돌아올 때 잠금 화면이 표시됩니다. 「생체 인증으로 잠금 해제」를 켜면 Face ID/Touch ID로도 해제할 수 있습니다. 패스코드 변경이나 해제도 같은 곳에서 할 수 있습니다.\n※ 패스코드를 잊어버리면 앱을 열 수 없게 됩니다. 이 경우 앱을 재설치해야 하며, 기기 내의 일기와 사진도 삭제되므로 주의해 주세요.",
      en: "Yes. Turn on \"Passcode Lock\" under \"Security\" on My Page to set a 4-digit passcode. Afterward, a lock screen appears when you open the app or return to it from the background. Turn on \"Unlock with Biometrics\" to also unlock with Face ID / Touch ID. You can change or turn off the passcode from the same place.\n※ If you forget your passcode, you will not be able to open the app. You would need to reinstall it, which also deletes the diary entries and photos on your device.",
    },
  },
  {
    question: {
      ja: "ダークモードやテーマカラーは変更できますか？",
      ko: "다크 모드나 테마 색상을 변경할 수 있나요?",
      en: "Can I change dark mode or the theme color?",
    },
    answer: {
      ja: "マイページの「外観」から、ライト・ダーク・システムの切り替えと、ローズ・オレンジ・ミント・グリーン・ティール・ブルー・インディゴの7色のテーマカラーを選べます。ダークモードとテーマカラーは「プレミアム」の特典です。プレミアムに登録していない場合は、ライトモード・ローズ色で表示されます。",
      ko: "마이페이지의 「외관」에서 라이트・다크・시스템 전환과 로즈・오렌지・민트・그린・틸・블루・인디고의 7가지 테마 색상을 선택할 수 있습니다. 다크 모드와 테마 색상은 「프리미엄」 혜택입니다. 프리미엄에 가입하지 않은 경우 라이트 모드・로즈 색상으로 표시됩니다.",
      en: "Under \"Appearance\" on My Page, you can switch between Light, Dark, and System, and choose from 7 theme colors: Rose, Orange, Mint, Green, Teal, Blue, and Indigo. Dark Mode and theme colors are Premium benefits. Without Premium, the app is shown in Light mode with the Rose color.",
    },
  },
  {
    question: {
      ja: "プレミアム（広告の非表示）について教えてください。購入の復元はできますか？",
      ko: "프리미엄(광고 제거)에 대해 알려주세요. 구매 복원은 가능한가요?",
      en: "Tell me about Premium (ad removal). Can I restore my purchase?",
    },
    answer: {
      ja: "プレミアムは、年額プランまたは月額プランの自動更新サブスクリプションです。登録すると、広告が表示されなくなり、ダークモードと7色のテーマカラーも使えます。料金は購入画面に表示されます。登録は、広告の✕ボタンやマイページの「広告を非表示にする」から行えます。機種変更や再インストールをした場合は、マイページの「購入を復元」から購入済みの内容を復元できます。サブスクリプションの管理・解約は、App Storeのアカウント設定（マイページのプレミアム欄の「サブスクリプションを管理」）から行えます。お支払いはApple IDに請求され、現在の期間が終了する24時間前までに解約しない限り自動的に更新されます。",
      ko: "프리미엄은 연간 플랜 또는 월간 플랜의 자동 갱신 구독입니다. 가입하면 광고가 표시되지 않으며 다크 모드와 7가지 테마 색상도 사용할 수 있습니다. 요금은 구매 화면에 표시됩니다. 가입은 광고의 ✕ 버튼이나 마이페이지의 「광고 숨기기」에서 할 수 있습니다. 기기 변경이나 재설치를 한 경우 마이페이지의 「구매 복원」에서 구매한 내용을 복원할 수 있습니다. 구독의 관리・해지는 App Store의 계정 설정(마이페이지 프리미엄 란의 「구독 관리」)에서 할 수 있습니다. 결제는 Apple ID로 청구되며, 현재 기간이 끝나기 24시간 전까지 해지하지 않으면 자동으로 갱신됩니다.",
      en: "Premium is an auto-renewing subscription, available as a yearly or monthly plan. Subscribing removes all ads and unlocks Dark Mode and the 7 theme colors. Prices are shown on the purchase screen. You can subscribe from the ✕ button on an ad or from \"Remove Ads\" on My Page. If you changed devices or reinstalled the app, use \"Restore Purchases\" on My Page to restore your purchase. You can manage or cancel your subscription in your App Store account settings (\"Manage Subscription\" in the Premium section on My Page). Payment is charged to your Apple ID, and the subscription renews automatically unless canceled at least 24 hours before the end of the current period.",
    },
  },
  {
    question: {
      ja: "広告はどこに表示されますか？",
      ko: "광고는 어디에 표시되나요?",
      en: "Where are ads shown?",
    },
    answer: {
      ja: "無料でご利用の場合、画面下部のバナー広告のほか、ホームの一覧の末尾、日記の作成画面、統計・マイページの途中にも広告が表示され、日記を新規作成した際には2回に1回の割合で全画面広告が表示されます。プレミアムに登録すると、これらの広告はすべて表示されなくなります。なお、通信状況などにより広告が表示されない場合は、広告の枠も表示されません。",
      ko: "무료로 이용하시는 경우 화면 하단의 배너 광고 외에 홈 목록의 끝, 일기 작성 화면, 통계・마이페이지 중간에도 광고가 표시되며, 일기를 새로 작성했을 때에는 2회에 1회 비율로 전체 화면 광고가 표시됩니다. 프리미엄에 가입하면 이러한 광고는 모두 표시되지 않습니다. 또한 통신 상황 등으로 광고가 표시되지 않는 경우에는 광고 영역도 표시되지 않습니다.",
      en: "If you use the app for free, you will see a banner ad at the bottom of the screen, additional ads at the end of the Home list, in the entry composer, and in the middle of the Stats and My Page screens, and a full-screen ad once every 2 times you create a new entry. Subscribing to Premium removes all of these ads. If ads cannot be shown, for example because of your connection, the ad space is not shown either.",
    },
  },
  {
    question: {
      ja: "日記や写真のデータはどこに保存されますか？バックアップやエクスポートはできますか？",
      ko: "일기나 사진 데이터는 어디에 저장되나요? 백업이나 내보내기를 할 수 있나요?",
      en: "Where is my diary and photo data saved? Can I back it up or export it?",
    },
    answer: {
      ja: "日記の内容や写真・動画は、すべてお使いの端末内にのみ保存され、開発者のサーバーへは送信されません。アカウント登録も不要で、クラウド同期にも対応していません。現時点ではアプリ内のバックアップ・エクスポート機能はご用意しておりません。アプリを削除したり端末を初期化したりすると、すべてのデータが失われますのでご注意ください。マイページの「ストレージ」で、日記数・写真数・使用容量を確認できます。",
      ko: "일기 내용과 사진・동영상은 모두 사용 중인 기기 내에만 저장되며 개발자의 서버로 전송되지 않습니다. 계정 등록도 필요 없으며 클라우드 동기화도 지원하지 않습니다. 현재 앱 내 백업・내보내기 기능은 제공되지 않습니다. 앱을 삭제하거나 기기를 초기화하면 모든 데이터가 사라지므로 주의해 주세요. 마이페이지의 「스토리지」에서 일기 수・사진 수・사용 용량을 확인할 수 있습니다.",
      en: "All diary content, photos, and videos are stored only on your device and are not sent to the developer's servers. No account is needed, and cloud sync is not supported. There is currently no in-app backup or export feature. Deleting the app or resetting your device will erase all data, so please be careful. You can check the number of entries, number of photos, and storage used under \"Storage\" on My Page.",
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
export default function DairygramSupportPage() {
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
              alt={lang === "ja" ? "日記グラム" : "Dairygram"}
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {lang === "ja" ? "日記グラム" : "Dairygram"}
          </h1>
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
            href="/support/dairygram/privacy"
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
          <p>&copy; {currentYear} Dairygram. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
