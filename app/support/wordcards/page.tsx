"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/wordcards.png";

// ========================================
// 設定値
// ========================================
const SUPPORT_EMAIL = "shun_soccer_iino@icloud.com";

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
    aboutSupportText: "WordCardsをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "WordCards를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using WordCards. If you have any questions or issues, please check the FAQ below or contact us.",
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
  "zh-TW": {
    support: "支援",
    aboutSupport: "關於支援",
    aboutSupportText: "感謝您使用 WordCards。如有任何疑問或問題，請參閱以下常見問題，或與我們聯絡。",
    faq: "常見問題",
    contactUs: "聯絡我們",
    contactText: "若上述內容未能解決您的問題，請透過電子郵件與我們聯絡。",
    contactButton: "透過電子郵件聯絡",
    responseTime: "回覆時間",
    responseTimeText: "我們通常會在 48 小時內回覆您的問題，感謝您的耐心等候。",
    supportedLanguages: "支援語言",
    supportedLanguagesText: "我們接受以日文、英文及韓文提出的詢問。",
    privacyPolicy: "隱私權政策",
    privacyPolicyText: "請點此查看我們的隱私權政策。",
    backToHub: "返回應用程式列表",
  },
  zh: {
    support: "支持",
    aboutSupport: "关于支持",
    aboutSupportText: "感谢您使用 WordCards。如有任何疑问或问题，请查阅以下常见问题，或与我们联系。",
    faq: "常见问题",
    contactUs: "联系我们",
    contactText: "若上述内容未能解决您的问题，请通过电子邮件与我们联系。",
    contactButton: "通过电子邮件联系",
    responseTime: "回复时间",
    responseTimeText: "我们通常会在 48 小时内回复您的问题，感谢您的耐心等候。",
    supportedLanguages: "支持语言",
    supportedLanguagesText: "我们接受以日文、英文及韩文提出的咨询。",
    privacyPolicy: "隐私政策",
    privacyPolicyText: "请点此查看我们的隐私政策。",
    backToHub: "返回应用列表",
  },
  ar: {
    support: "الدعم",
    aboutSupport: "حول الدعم",
    aboutSupportText: "شكرًا لاستخدامك WordCards. إذا كان لديك أي أسئلة أو مشكلات، يُرجى مراجعة الأسئلة الشائعة أدناه أو التواصل معنا.",
    faq: "الأسئلة الشائعة",
    contactUs: "تواصل معنا",
    contactText: "إذا لم تجد حلاً مما سبق، يُرجى التواصل معنا عبر البريد الإلكتروني.",
    contactButton: "تواصل عبر البريد الإلكتروني",
    responseTime: "وقت الرد",
    responseTimeText: "نهدف إلى الرد على الاستفسارات خلال 48 ساعة عادةً. شكرًا لصبرك.",
    supportedLanguages: "اللغات المدعومة",
    supportedLanguagesText: "نقبل الاستفسارات باللغات اليابانية والإنجليزية والكورية.",
    privacyPolicy: "سياسة الخصوصية",
    privacyPolicyText: "يُرجى الاطلاع على سياسة الخصوصية من هنا.",
    backToHub: "العودة إلى قائمة التطبيقات",
  },
  es: {
    support: "Soporte",
    aboutSupport: "Acerca del soporte",
    aboutSupportText: "Gracias por usar WordCards. Si tienes alguna pregunta o problema, consulta las preguntas frecuentes a continuación o contáctanos.",
    faq: "Preguntas frecuentes",
    contactUs: "Contáctanos",
    contactText: "Si no encuentras una solución arriba, contáctanos por correo electrónico.",
    contactButton: "Contactar por correo electrónico",
    responseTime: "Tiempo de respuesta",
    responseTimeText: "Normalmente respondemos a las consultas en un plazo de 48 horas. Gracias por tu paciencia.",
    supportedLanguages: "Idiomas admitidos",
    supportedLanguagesText: "Aceptamos consultas en japonés, inglés y coreano.",
    privacyPolicy: "Política de privacidad",
    privacyPolicyText: "Consulta aquí nuestra política de privacidad.",
    backToHub: "Volver a la lista de aplicaciones",
  },
  fr: {
    support: "Assistance",
    aboutSupport: "À propos de l'assistance",
    aboutSupportText: "Merci d'utiliser WordCards. Si vous avez des questions ou des problèmes, veuillez consulter la FAQ ci-dessous ou nous contacter.",
    faq: "FAQ",
    contactUs: "Nous contacter",
    contactText: "Si vous ne trouvez pas de solution ci-dessus, contactez-nous par e-mail.",
    contactButton: "Contacter par e-mail",
    responseTime: "Délai de réponse",
    responseTimeText: "Nous répondons généralement aux demandes dans les 48 heures. Merci de votre patience.",
    supportedLanguages: "Langues prises en charge",
    supportedLanguagesText: "Nous acceptons les demandes en japonais, anglais et coréen.",
    privacyPolicy: "Politique de confidentialité",
    privacyPolicyText: "Consultez notre politique de confidentialité ici.",
    backToHub: "Retour à la liste des applications",
  },
  pt: {
    support: "Suporte",
    aboutSupport: "Sobre o suporte",
    aboutSupportText: "Obrigado por usar o WordCards. Se tiver alguma dúvida ou problema, consulte as perguntas frequentes abaixo ou entre em contato conosco.",
    faq: "Perguntas frequentes",
    contactUs: "Fale conosco",
    contactText: "Se não encontrar uma solução acima, entre em contato por e-mail.",
    contactButton: "Contato por e-mail",
    responseTime: "Tempo de resposta",
    responseTimeText: "Normalmente respondemos às consultas em até 48 horas. Obrigado pela sua paciência.",
    supportedLanguages: "Idiomas com suporte",
    supportedLanguagesText: "Aceitamos consultas em japonês, inglês e coreano.",
    privacyPolicy: "Política de privacidade",
    privacyPolicyText: "Consulte nossa política de privacidade aqui.",
    backToHub: "Voltar para a lista de aplicativos",
  },
  de: {
    support: "Support",
    aboutSupport: "Über den Support",
    aboutSupportText: "Vielen Dank, dass Sie WordCards verwenden. Bei Fragen oder Problemen schauen Sie bitte in die FAQ unten oder kontaktieren Sie uns.",
    faq: "Häufig gestellte Fragen",
    contactUs: "Kontakt",
    contactText: "Wenn Sie oben keine Lösung finden, kontaktieren Sie uns bitte per E-Mail.",
    contactButton: "Per E-Mail kontaktieren",
    responseTime: "Antwortzeit",
    responseTimeText: "Wir antworten auf Anfragen in der Regel innerhalb von 48 Stunden. Vielen Dank für Ihre Geduld.",
    supportedLanguages: "Unterstützte Sprachen",
    supportedLanguagesText: "Wir nehmen Anfragen auf Japanisch, Englisch und Koreanisch entgegen.",
    privacyPolicy: "Datenschutzrichtlinie",
    privacyPolicyText: "Unsere Datenschutzrichtlinie finden Sie hier.",
    backToHub: "Zurück zur App-Liste",
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
      ja: "デッキ（単語帳）の作り方を教えてください",
      ko: "덱(단어장)은 어떻게 만드나요?",
      en: "How do I create a deck?",
      "zh-TW": "如何建立牌組（單字本）？",
      zh: "如何创建牌组（单词本）？",
      ar: "كيف أنشئ مجموعة بطاقات (مفردات)؟",
      es: "¿Cómo creo un mazo?",
      fr: "Comment créer un paquet ?",
      pt: "Como criar um baralho?",
      de: "Wie erstelle ich ein Deck?",
    },
    answer: {
      ja: "単語帳タブの右下にある「＋」ボタンをタップしてください。デッキ名・学習言語・カラーを設定して作成できます。作成後はデッキをタップして単語を追加できます。",
      ko: "단어장 탭의 오른쪽 하단에 있는 「＋」버튼을 탭하세요. 덱 이름, 학습 언어, 색상을 설정하여 만들 수 있습니다. 만든 후 덱을 탭하면 단어를 추가할 수 있습니다.",
      en: "Tap the「＋」button at the bottom right of the Cards tab. Set a deck name, study language, and color to create your deck. After creation, tap the deck to start adding words.",
      "zh-TW": "請點選單字本標籤右下角的「＋」按鈕。設定牌組名稱、學習語言及顏色後即可建立。建立後點選牌組即可新增單字。",
      zh: "请点击单词本标签右下角的「＋」按钮。设置牌组名称、学习语言及颜色后即可创建。创建后点击牌组即可添加单词。",
      ar: "اضغط على زر「＋」في أسفل يمين تبويب البطاقات. عيّن اسم المجموعة ولغة الدراسة واللون لإنشائها. بعد الإنشاء، اضغط على المجموعة لإضافة مفردات.",
      es: "Toca el botón「＋」en la parte inferior derecha de la pestaña Tarjetas. Establece un nombre para el mazo, el idioma de estudio y el color para crearlo. Después de crearlo, toca el mazo para empezar a añadir palabras.",
      fr: "Appuyez sur le bouton「＋」en bas à droite de l'onglet Cartes. Définissez un nom de paquet, une langue d'étude et une couleur pour le créer. Après la création, appuyez sur le paquet pour commencer à ajouter des mots.",
      pt: "Toque no botão「＋」no canto inferior direito da aba Cartões. Defina um nome para o baralho, idioma de estudo e cor para criá-lo. Após a criação, toque no baralho para começar a adicionar palavras.",
      de: "Tippen Sie auf die Schaltfläche「＋」unten rechts im Tab \"Karten\". Legen Sie einen Decknamen, eine Lernsprache und eine Farbe fest. Nach der Erstellung tippen Sie auf das Deck, um Wörter hinzuzufügen.",
    },
  },
  {
    question: {
      ja: "AI入力機能の使い方を教えてください",
      ko: "AI 입력 기능은 어떻게 사용하나요?",
      en: "How do I use the AI fill feature?",
      "zh-TW": "如何使用 AI 自動填入功能？",
      zh: "如何使用 AI 自动填写功能？",
      ar: "كيف أستخدم ميزة الإدخال التلقائي بالذكاء الاصطناعي؟",
      es: "¿Cómo uso la función de relleno con IA?",
      fr: "Comment utiliser la fonction de remplissage IA ?",
      pt: "Como usar o recurso de preenchimento com IA?",
      de: "Wie verwende ich die KI-Ausfüll-Funktion?",
    },
    answer: {
      ja: "カード追加画面で単語を入力した後、「AI入力」ボタンをタップすると、意味・発音記号・例文・関連語・語源などをAIが自動で入力します。Premiumプランではさらに学習用イラストも自動生成できます。無料プランでは月ごとに利用回数の上限があります。",
      ko: "카드 추가 화면에서 단어를 입력한 후 「AI 입력」버튼을 탭하면 의미, 발음 기호, 예문, 관련어, 어원 등을 AI가 자동으로 입력해 줍니다. Premium 플랜에서는 학습용 일러스트도 자동 생성할 수 있습니다. 무료 플랜은 월별 이용 횟수에 제한이 있습니다.",
      en: "On the add card screen, enter a word and tap the「AI Fill」button. The AI will automatically fill in the meaning, phonetics, example sentences, related words, etymology, and more. Premium plan users can also generate learning illustrations automatically. The free plan has a monthly usage limit.",
      "zh-TW": "在新增卡片畫面中輸入單字後，點選「AI 填入」按鈕，AI 即會自動填入意思、發音符號、例句、相關詞彙、字源等內容。Premium 方案還可自動生成學習插圖。免費方案每月有使用次數上限。",
      zh: "在添加卡片界面输入单词后，点击「AI 填写」按钮，AI 即会自动填入释义、音标、例句、相关词汇、词源等内容。Premium 方案还可自动生成学习插图。免费方案每月有使用次数上限。",
      ar: "في شاشة إضافة البطاقة، أدخل الكلمة ثم اضغط على زر「AI Fill」. سيقوم الذكاء الاصطناعي تلقائيًا بملء المعنى والنطق والأمثلة والكلمات المرتبطة والأصل اللغوي وغيرها. يمكن لمستخدمي خطة Premium أيضًا توليد رسوم توضيحية تلقائيًا. الخطة المجانية لها حد شهري للاستخدام.",
      es: "En la pantalla de añadir tarjeta, introduce una palabra y toca el botón「AI Fill」. La IA rellenará automáticamente el significado, la fonética, oraciones de ejemplo, palabras relacionadas, etimología y más. Los usuarios del plan Premium también pueden generar ilustraciones automáticamente. El plan gratuito tiene un límite de uso mensual.",
      fr: "Sur l'écran d'ajout de carte, saisissez un mot et appuyez sur le bouton「AI Fill」. L'IA remplira automatiquement le sens, la phonétique, les exemples de phrases, les mots associés, l'étymologie, etc. Les utilisateurs du plan Premium peuvent également générer des illustrations automatiquement. Le plan gratuit a une limite d'utilisation mensuelle.",
      pt: "Na tela de adicionar cartão, insira uma palavra e toque no botão「AI Fill」. A IA preencherá automaticamente o significado, fonética, frases de exemplo, palavras relacionadas, etimologia e mais. Usuários do plano Premium também podem gerar ilustrações automaticamente. O plano gratuito tem um limite de uso mensal.",
      de: "Auf dem Bildschirm zum Hinzufügen einer Karte geben Sie ein Wort ein und tippen auf die Schaltfläche「AI Fill」. Die KI füllt automatisch Bedeutung, Aussprache, Beispielsätze, verwandte Wörter, Etymologie und mehr aus. Premium-Nutzer können auch automatisch Lernillustrationen generieren. Der kostenlose Plan hat ein monatliches Nutzungslimit.",
    },
  },
  {
    question: {
      ja: "クイズの種類を教えてください",
      ko: "퀴즈 종류에 대해 알려주세요",
      en: "What types of quizzes are available?",
      "zh-TW": "有哪些測驗模式？",
      zh: "有哪些测验模式？",
      ar: "ما أنواع الاختبارات المتاحة؟",
      es: "¿Qué tipos de cuestionarios hay?",
      fr: "Quels types de quiz sont disponibles ?",
      pt: "Quais tipos de quizzes estão disponíveis?",
      de: "Welche Quiz-Typen gibt es?",
    },
    answer: {
      ja: "5種類のクイズモードがあります：\n1. 母国語→学習言語（意味から単語を選ぶ）\n2. 学習言語→母国語（単語から意味を選ぶ）\n3. 音声→母国語（音声を聞いて意味を選ぶ）\n4. スペリング（単語のスペルを入力する）\n5. 画像（画像に対応する単語を選ぶ・画像付きカードが必要）",
      ko: "5가지 퀴즈 모드가 있습니다:\n1. 모국어→학습 언어(의미에서 단어 선택)\n2. 학습 언어→모국어(단어에서 의미 선택)\n3. 음성→모국어(음성을 듣고 의미 선택)\n4. 스펠링(단어 스펠을 입력)\n5. 이미지(이미지에 해당하는 단어 선택·이미지 첨부 카드 필요)",
      en: "There are 5 quiz modes:\n1. Native → Target language (choose the word from the meaning)\n2. Target → Native language (choose the meaning from the word)\n3. Audio → Native (listen and choose the meaning)\n4. Spelling (type the spelling of the word)\n5. Image (choose the word matching the image — requires cards with images)",
      "zh-TW": "共有 5 種測驗模式：\n1. 母語→學習語言（從意思選出單字）\n2. 學習語言→母語（從單字選出意思）\n3. 聽力→母語（聽音頻選出意思）\n4. 拼字（輸入單字的拼法）\n5. 圖片（選出與圖片對應的單字，需有附圖的卡片）",
      zh: "共有 5 种测验模式：\n1. 母语→学习语言（从意思选出单词）\n2. 学习语言→母语（从单词选出意思）\n3. 听力→母语（听音频选出意思）\n4. 拼写（输入单词的拼法）\n5. 图片（选出与图片对应的单词，需有附图的卡片）",
      ar: "يوجد 5 أنواع من أوضاع الاختبار:\n1. لغتك الأصلية ← لغة الدراسة (اختر الكلمة من المعنى)\n2. لغة الدراسة ← لغتك الأصلية (اختر المعنى من الكلمة)\n3. الصوت ← لغتك الأصلية (استمع واختر المعنى)\n4. التهجئة (اكتب تهجئة الكلمة)\n5. الصورة (اختر الكلمة المطابقة للصورة - يتطلب بطاقات بصور)",
      es: "Hay 5 modos de quiz:\n1. Lengua materna → Idioma objetivo (elige la palabra por su significado)\n2. Idioma objetivo → Lengua materna (elige el significado por la palabra)\n3. Audio → Lengua materna (escucha y elige el significado)\n4. Ortografía (escribe la palabra)\n5. Imagen (elige la palabra que corresponde a la imagen — requiere tarjetas con imágenes)",
      fr: "Il y a 5 modes de quiz :\n1. Langue maternelle → Langue cible (choisir le mot par son sens)\n2. Langue cible → Langue maternelle (choisir le sens par le mot)\n3. Audio → Langue maternelle (écouter et choisir le sens)\n4. Orthographe (saisir l'orthographe du mot)\n5. Image (choisir le mot correspondant à l'image — nécessite des cartes avec images)",
      pt: "Há 5 modos de quiz:\n1. Língua nativa → Idioma alvo (escolha a palavra pelo significado)\n2. Idioma alvo → Língua nativa (escolha o significado pela palavra)\n3. Áudio → Língua nativa (ouça e escolha o significado)\n4. Ortografia (escreva a palavra)\n5. Imagem (escolha a palavra que corresponde à imagem — requer cartões com imagens)",
      de: "Es gibt 5 Quiz-Modi:\n1. Muttersprache → Zielsprache (Wort anhand der Bedeutung wählen)\n2. Zielsprache → Muttersprache (Bedeutung anhand des Wortes wählen)\n3. Audio → Muttersprache (hören und Bedeutung wählen)\n4. Rechtschreibung (Wort eintippen)\n5. Bild (das zur Abbildung passende Wort wählen — erfordert Karten mit Bildern)",
    },
  },
  {
    question: {
      ja: "復習機能はどのように動作しますか？",
      ko: "복습 기능은 어떻게 작동하나요?",
      en: "How does the review feature work?",
      "zh-TW": "複習功能如何運作？",
      zh: "复习功能如何运作？",
      ar: "كيف تعمل ميزة المراجعة؟",
      es: "¿Cómo funciona la función de repaso?",
      fr: "Comment fonctionne la fonction de révision ?",
      pt: "Como funciona o recurso de revisão?",
      de: "Wie funktioniert die Wiederholungsfunktion?",
    },
    answer: {
      ja: "復習機能は間隔反復法（スペースドリピティション）を採用しています。カードを確認すると復習スケジュールに追加され、以下のタイミングで復習が促されます：\n・初回確認後 → 1日後\n・1日後 → 1週間後\n・1週間後 → 1ヶ月後\n・1ヶ月後 → 3ヶ月後\n復習タブから毎日の復習カードを確認できます。",
      ko: "복습 기능은 간격 반복법(스페이스드 리피티션)을 채택하고 있습니다. 카드를 확인하면 복습 일정에 추가되며, 다음 타이밍에 복습이 안내됩니다:\n・첫 확인 후 → 1일 후\n・1일 후 → 1주 후\n・1주 후 → 1개월 후\n・1개월 후 → 3개월 후\n복습 탭에서 매일의 복습 카드를 확인할 수 있습니다.",
      en: "The review feature uses spaced repetition. When you view a card, it is added to your review schedule and you will be prompted to review at the following intervals:\n・After first view → 1 day later\n・1 day later → 1 week later\n・1 week later → 1 month later\n・1 month later → 3 months later\nCheck your daily review cards from the Review tab.",
      "zh-TW": "複習功能採用間隔重複法（Spaced Repetition）。確認卡片後，會加入複習排程，並依以下時間提醒複習：\n・首次確認後 → 1 天後\n・1 天後 → 1 週後\n・1 週後 → 1 個月後\n・1 個月後 → 3 個月後\n可從複習標籤查看每日複習卡片。",
      zh: "复习功能采用间隔重复法（Spaced Repetition）。确认卡片后，会加入复习日程，并按以下时间提醒复习：\n・首次确认后 → 1 天后\n・1 天后 → 1 周后\n・1 周后 → 1 个月后\n・1 个月后 → 3 个月后\n可从复习标签查看每日复习卡片。",
      ar: "تستخدم ميزة المراجعة أسلوب التكرار المتباعد (Spaced Repetition). عند مراجعة بطاقة، تُضاف إلى جدول المراجعة وتُذكَّر بمراجعتها وفق الفترات التالية:\n・بعد المشاهدة الأولى ← بعد يوم\n・بعد يوم ← بعد أسبوع\n・بعد أسبوع ← بعد شهر\n・بعد شهر ← بعد 3 أشهر\nيمكنك الاطلاع على بطاقات مراجعة اليوم من تبويب المراجعة.",
      es: "La función de repaso usa repetición espaciada. Al ver una tarjeta, se añade a tu programa de repaso y se te pedirá que repases en los siguientes intervalos:\n・Después de la primera vista → 1 día después\n・1 día después → 1 semana después\n・1 semana después → 1 mes después\n・1 mes después → 3 meses después\nConsulta tus tarjetas de repaso diarias en la pestaña Repaso.",
      fr: "La fonction de révision utilise la répétition espacée. Lorsque vous consultez une carte, elle est ajoutée à votre programme de révision et vous serez invité à réviser aux intervalles suivants :\n・Après la première vue → 1 jour plus tard\n・1 jour plus tard → 1 semaine plus tard\n・1 semaine plus tard → 1 mois plus tard\n・1 mois plus tard → 3 mois plus tard\nConsultez vos cartes de révision quotidiennes dans l'onglet Révision.",
      pt: "O recurso de revisão usa repetição espaçada. Ao ver um cartão, ele é adicionado ao seu programa de revisão e você será solicitado a revisar nos seguintes intervalos:\n・Após a primeira visualização → 1 dia depois\n・1 dia depois → 1 semana depois\n・1 semana depois → 1 mês depois\n・1 mês depois → 3 meses depois\nConsulte seus cartões de revisão diários na aba Revisão.",
      de: "Die Wiederholungsfunktion nutzt Spaced Repetition. Wenn Sie eine Karte ansehen, wird sie Ihrem Wiederholungsplan hinzugefügt und Sie werden zu folgenden Zeitpunkten zum Wiederholen aufgefordert:\n・Nach der ersten Ansicht → 1 Tag später\n・1 Tag später → 1 Woche später\n・1 Woche später → 1 Monat später\n・1 Monat später → 3 Monate später\nSehen Sie Ihre täglichen Wiederholungskarten im Tab \"Wiederholen\".",
    },
  },
  {
    question: {
      ja: "サブスクリプションを復元するには？",
      ko: "구독을 복원하려면 어떻게 하나요?",
      en: "How do I restore my subscription?",
      "zh-TW": "如何恢復訂閱？",
      zh: "如何恢复订阅？",
      ar: "كيف أستعيد اشتراكي؟",
      es: "¿Cómo restauro mi suscripción?",
      fr: "Comment restaurer mon abonnement ?",
      pt: "Como restaurar minha assinatura?",
      de: "Wie stelle ich mein Abonnement wieder her?",
    },
    answer: {
      ja: "設定タブの「購入を復元する」をタップしてください。同じApple IDでサインインしている必要があります。復元できない場合は、App Storeの購入履歴をご確認ください。",
      ko: "설정 탭의 「구매 복원」을 탭해 주세요. 동일한 Apple ID로 로그인되어 있어야 합니다. 복원이 되지 않으면 App Store 구매 내역을 확인해 주세요.",
      en: "Tap \"Restore Purchases\" in the Settings tab. You must be signed in with the same Apple ID. If restoration fails, please check your App Store purchase history.",
      "zh-TW": "請點選設定標籤中的「恢復購買」。必須使用相同的 Apple ID 登入。若無法恢復，請確認 App Store 的購買記錄。",
      zh: "请点击设置标签中的「恢复购买」。必须使用相同的 Apple ID 登录。若无法恢复，请确认 App Store 的购买记录。",
      ar: "اضغط على «استعادة المشتريات» في تبويب الإعدادات. يجب أن تكون مسجلاً بنفس Apple ID. إذا فشلت الاستعادة، تحقق من سجل المشتريات في App Store.",
      es: "Toca \"Restaurar compras\" en la pestaña Ajustes. Debes estar con la misma Apple ID. Si falla la restauración, comprueba tu historial de compras en App Store.",
      fr: "Appuyez sur \"Restaurer les achats\" dans l'onglet Paramètres. Vous devez être connecté avec le même Apple ID. Si la restauration échoue, vérifiez votre historique d'achats dans l'App Store.",
      pt: "Toque em \"Restaurar Compras\" na aba Configurações. Você deve estar com o mesmo Apple ID. Se a restauração falhar, verifique seu histórico de compras na App Store.",
      de: "Tippen Sie auf \"Käufe wiederherstellen\" im Tab \"Einstellungen\". Sie müssen mit derselben Apple ID angemeldet sein. Falls die Wiederherstellung fehlschlägt, prüfen Sie Ihren Kaufverlauf im App Store.",
    },
  },
  {
    question: {
      ja: "音声読み上げが動作しません",
      ko: "음성 읽기가 작동하지 않습니다",
      en: "Text-to-speech is not working",
      "zh-TW": "文字轉語音無法使用",
      zh: "文字转语音无法使用",
      ar: "تحويل النص إلى كلام لا يعمل",
      es: "La síntesis de voz no funciona",
      fr: "La synthèse vocale ne fonctionne pas",
      pt: "A conversão de texto em fala não está funcionando",
      de: "Text-to-Speech funktioniert nicht",
    },
    answer: {
      ja: "以下をご確認ください：\n1. 端末のサイレントモード（マナーモード）がオフになっていること\n2. 音量が適切に設定されていること\n3. 設定タブの「TTS」でご希望の音声が選択されていること\n高品質な音声を利用するには、iOSの設定 → アクセシビリティ → 読み上げコンテンツ → 声 から追加のダウンロードが必要です。",
      ko: "다음을 확인해 주세요:\n1. 기기의 무음 모드(매너 모드)가 꺼져 있는지\n2. 볼륨이 적절하게 설정되어 있는지\n3. 설정 탭의 「TTS」에서 원하는 음성이 선택되어 있는지\n고품질 음성을 이용하려면 iOS 설정 → 손쉬운 사용 → 말하기 콘텐츠 → 목소리에서 추가 다운로드가 필요합니다.",
      en: "Please check the following:\n1. Silent mode (mute) is turned off on your device\n2. Volume is set appropriately\n3. The desired voice is selected under TTS in the Settings tab\nFor high-quality voices, you can download additional voices from iOS Settings → Accessibility → Spoken Content → Voices.",
      "zh-TW": "請確認以下事項：\n1. 裝置的靜音模式已關閉\n2. 音量設定適當\n3. 設定標籤的「TTS」中已選擇所需語音\n如需使用高品質語音，請至 iOS 設定 → 輔助使用 → 口語內容 → 語音 進行額外下載。",
      zh: "请确认以下事项：\n1. 设备的静音模式已关闭\n2. 音量设置适当\n3. 设置标签的「TTS」中已选择所需语音\n如需使用高品质语音，请前往 iOS 设置 → 辅助功能 → 语音内容 → 声音 进行额外下载。",
      ar: "يرجى التحقق مما يلي:\n1. تأكد من إيقاف وضع الصامت في جهازك\n2. تأكد من ضبط مستوى الصوت بشكل مناسب\n3. تأكد من اختيار الصوت المطلوب في إعداد «TTS» بتبويب الإعدادات\nللحصول على أصوات عالية الجودة، يمكنك تنزيل أصوات إضافية من: iOS الإعدادات ← إمكانية الوصول ← المحتوى المنطوق ← الأصوات.",
      es: "Por favor, comprueba lo siguiente:\n1. El modo silencio está desactivado en tu dispositivo\n2. El volumen está ajustado correctamente\n3. La voz deseada está seleccionada en TTS en la pestaña Ajustes\nPara voces de alta calidad, puedes descargar voces adicionales desde Ajustes de iOS → Accesibilidad → Contenido hablado → Voces.",
      fr: "Veuillez vérifier les points suivants :\n1. Le mode silencieux est désactivé sur votre appareil\n2. Le volume est réglé correctement\n3. La voix souhaitée est sélectionnée sous TTS dans l'onglet Paramètres\nPour des voix de haute qualité, vous pouvez télécharger des voix supplémentaires depuis Réglages iOS → Accessibilité → Contenu spoken → Voix.",
      pt: "Por favor, verifique o seguinte:\n1. O modo silencioso está desativado no seu dispositivo\n2. O volume está ajustado adequadamente\n3. A voz desejada está selecionada em TTS na aba Configurações\nPara vozes de alta qualidade, você pode baixar vozes adicionais em Ajustes do iOS → Acessibilidade → Conteúdo falado → Vozes.",
      de: "Bitte prüfen Sie Folgendes:\n1. Der Stumm-Modus ist auf Ihrem Gerät deaktiviert\n2. Die Lautstärke ist angemessen eingestellt\n3. Die gewünschte Stimme ist unter TTS im Tab \"Einstellungen\" ausgewählt\nFür hochwertige Stimmen können Sie zusätzliche Stimmen unter iOS-Einstellungen → Bedienungshilfen → Gesprochene Inhalte → Stimmen herunterladen.",
    },
  },
  {
    question: {
      ja: "データのバックアップはできますか？",
      ko: "데이터 백업이 가능한가요?",
      en: "Can I back up my data?",
      "zh-TW": "可以備份資料嗎？",
      zh: "可以备份数据吗？",
      ar: "هل يمكنني نسخ بياناتي احتياطيًا؟",
      es: "¿Puedo hacer una copia de seguridad de mis datos?",
      fr: "Puis-je sauvegarder mes données ?",
      pt: "Posso fazer backup dos meus dados?",
      de: "Kann ich meine Daten sichern?",
    },
    answer: {
      ja: "現在、WordCardsのデッキや単語データはお使いの端末内にのみ保存されます。クラウド同期機能は現在対応しておりません。アプリをアンインストールするとデータが削除されますのでご注意ください。端末の買い替え時にはデータの引き継ぎができませんので、あらかじめご了承ください。",
      ko: "현재 WordCards의 덱과 단어 데이터는 사용 중인 기기 내에만 저장됩니다. 클라우드 동기화 기능은 현재 지원하지 않습니다. 앱을 삭제하면 데이터가 삭제되므로 주의해 주세요. 기기를 교체할 때 데이터를 이전할 수 없으니 미리 양해 부탁드립니다.",
      en: "Currently, WordCards deck and word data is stored only on your device. Cloud sync is not currently supported. Please note that uninstalling the app will delete your data, and data cannot be transferred when changing devices.",
      "zh-TW": "目前 WordCards 的牌組及單字資料僅儲存在您的裝置中，目前不支援雲端同步。解除安裝應用程式後資料將會被刪除，請注意。更換裝置時無法移轉資料，敬請見諒。",
      zh: "目前 WordCards 的牌组及单词数据仅储存在您的设备中，暂不支持云端同步。卸载应用后数据将被删除，请注意。更换设备时无法转移数据，敬请谅解。",
      ar: "حاليًا، تُخزَّن بيانات المجموعات والمفردات في WordCards على جهازك فقط، ولا يتوفر مزامنة سحابية في الوقت الحالي. يُرجى ملاحظة أن إلغاء تثبيت التطبيق سيؤدي إلى حذف بياناتك، ولا يمكن نقل البيانات عند تغيير الجهاز.",
      es: "Actualmente, los datos de mazos y palabras de WordCards se almacenan solo en tu dispositivo. La sincronización en la nube no está disponible actualmente. Ten en cuenta que desinstalar la aplicación eliminará tus datos y estos no se pueden transferir al cambiar de dispositivo.",
      fr: "Actuellement, les données de paquets et de mots de WordCards sont stockées uniquement sur votre appareil. La synchronisation cloud n'est pas disponible pour l'instant. Notez que la désinstallation de l'application supprimera vos données et qu'elles ne peuvent pas être transférées lors d'un changement d'appareil.",
      pt: "Atualmente, os dados de baralhos e palavras do WordCards são armazenados apenas no seu dispositivo. A sincronização na nuvem não está disponível no momento. Observe que desinstalar o aplicativo excluirá seus dados e eles não podem ser transferidos ao trocar de dispositivo.",
      de: "Derzeit werden Deck- und Wortdaten von WordCards nur auf Ihrem Gerät gespeichert. Cloud-Synchronisation ist derzeit nicht verfügbar. Bitte beachten Sie, dass das Deinstallieren der App Ihre Daten löscht und diese beim Gerätewechsel nicht übertragen werden können.",
    },
  },
  {
    question: {
      ja: "サブスクリプションを解約するにはどうすればよいですか？",
      ko: "구독을 해지하려면 어떻게 하나요?",
      en: "How do I cancel my subscription?",
      "zh-TW": "如何取消訂閱？",
      zh: "如何取消订阅？",
      ar: "كيف أُلغي اشتراكي؟",
      es: "¿Cómo cancelo mi suscripción?",
      fr: "Comment annuler mon abonnement ?",
      pt: "Como cancelo minha assinatura?",
      de: "Wie kündige ich mein Abonnement?",
    },
    answer: {
      ja: "サブスクリプションの解約はiOSの「設定」→「Apple ID」→「サブスクリプション」から行えます。解約後も現在の請求期間が終了するまでプレミアム機能を引き続きご利用いただけます。",
      ko: "구독 해지는 iOS 「설정」→ 「Apple ID」→ 「구독」에서 할 수 있습니다. 해지 후에도 현재 결제 기간이 끝날 때까지 프리미엄 기능을 계속 이용하실 수 있습니다.",
      en: "You can cancel your subscription from iOS Settings → Apple ID → Subscriptions. After cancellation, you can continue using premium features until the end of the current billing period.",
      "zh-TW": "可從 iOS「設定」→「Apple ID」→「訂閱」取消訂閱。取消後，在當前計費週期結束前仍可繼續使用進階功能。",
      zh: "可从 iOS「设置」→「Apple ID」→「订阅」取消订阅。取消后，在当前计费周期结束前仍可继续使用高级功能。",
      ar: "يمكنك إلغاء اشتراكك من خلال: iOS الإعدادات ← Apple ID ← الاشتراكات. بعد الإلغاء، يمكنك الاستمرار في استخدام الميزات المميزة حتى نهاية فترة الفوترة الحالية.",
      es: "Puedes cancelar tu suscripción desde Ajustes de iOS → Apple ID → Suscripciones. Después de la cancelación, puedes seguir usando las funciones premium hasta el final del período de facturación actual.",
      fr: "Vous pouvez annuler votre abonnement depuis Réglages iOS → Apple ID → Abonnements. Après l'annulation, vous pouvez continuer à utiliser les fonctionnalités premium jusqu'à la fin de la période de facturation actuelle.",
      pt: "Você pode cancelar sua assinatura em Ajustes do iOS → Apple ID → Assinaturas. Após o cancelamento, você pode continuar usando os recursos premium até o final do período de cobrança atual.",
      de: "Sie können Ihr Abonnement unter iOS-Einstellungen → Apple ID → Abonnements kündigen. Nach der Kündigung können Sie die Premium-Funktionen bis zum Ende des aktuellen Abrechnungszeitraums weiterhin nutzen.",
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
export default function WordCardsSupportPage() {
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
              alt="WordCards"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">WordCards</h1>
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
            href="/support/wordcards/privacy"
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
          <p>&copy; {currentYear} WordCards. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
