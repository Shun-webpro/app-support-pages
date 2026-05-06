"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/quizcards.png";

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
    aboutSupportText: "SnapQuizをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "SnapQuiz를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using SnapQuiz. If you have any questions or issues, please check the FAQ below or contact us.",
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
    aboutSupportText: "感謝您使用 SnapQuiz。如有任何疑問或問題，請參閱以下常見問題，或與我們聯絡。",
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
    aboutSupportText: "感谢您使用 SnapQuiz。如有任何疑问或问题，请查阅以下常见问题，或与我们联系。",
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
    aboutSupportText: "شكرًا لاستخدامك SnapQuiz. إذا كان لديك أي أسئلة أو مشكلات، يُرجى مراجعة الأسئلة الشائعة أدناه أو التواصل معنا.",
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
    aboutSupportText: "Gracias por usar SnapQuiz. Si tienes alguna pregunta o problema, consulta las preguntas frecuentes a continuación o contáctanos.",
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
    aboutSupportText: "Merci d'utiliser SnapQuiz. Si vous avez des questions ou des problèmes, veuillez consulter la FAQ ci-dessous ou nous contacter.",
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
    aboutSupportText: "Obrigado por usar o SnapQuiz. Se tiver alguma dúvida ou problema, consulte as perguntas frequentes abaixo ou entre em contato conosco.",
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
    aboutSupportText: "Vielen Dank, dass Sie SnapQuiz verwenden. Bei Fragen oder Problemen schauen Sie bitte in die FAQ unten oder kontaktieren Sie uns.",
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
      ja: "フォルダ（問題集）の作り方を教えてください",
      ko: "폴더(문제집)는 어떻게 만드나요?",
      en: "How do I create a folder?",
      "zh-TW": "如何建立資料夾（題庫）？",
      zh: "如何创建文件夹（题库）？",
      ar: "كيف أنشئ مجلدًا (مجموعة أسئلة)؟",
      es: "¿Cómo creo una carpeta?",
      fr: "Comment créer un dossier ?",
      pt: "Como criar uma pasta?",
      de: "Wie erstelle ich einen Ordner?",
    },
    answer: {
      ja: "ホーム画面右下の「＋」ボタンをタップしてください。フォルダ名・カラーを設定して作成できます。作成後はフォルダをタップして問題を追加できます。",
      ko: "홈 화면 오른쪽 하단의 「＋」버튼을 탭하세요. 폴더 이름과 색상을 설정하여 만들 수 있습니다. 만든 후 폴더를 탭하면 문제를 추가할 수 있습니다.",
      en: "Tap the「＋」button at the bottom right of the Home screen. Set a folder name and color to create your folder. After creation, tap the folder to start adding questions.",
      "zh-TW": "請點選首頁右下角的「＋」按鈕。設定資料夾名稱及顏色後即可建立。建立後點選資料夾即可新增問題。",
      zh: "请点击首页右下角的「＋」按钮。设置文件夹名称及颜色后即可创建。创建后点击文件夹即可添加问题。",
      ar: "اضغط على زر「＋」في أسفل يمين الشاشة الرئيسية. عيّن اسم المجلد واللون لإنشائه. بعد الإنشاء، اضغط على المجلد لإضافة أسئلة.",
      es: "Toca el botón「＋」en la parte inferior derecha de la pantalla de inicio. Establece un nombre y color para la carpeta. Después de crearla, tócala para agregar preguntas.",
      fr: "Appuyez sur le bouton「＋」en bas à droite de l'écran d'accueil. Définissez un nom et une couleur pour le dossier. Après la création, appuyez sur le dossier pour ajouter des questions.",
      pt: "Toque no botão「＋」no canto inferior direito da tela inicial. Defina um nome e cor para a pasta. Após a criação, toque na pasta para adicionar perguntas.",
      de: "Tippen Sie auf die Schaltfläche「＋」unten rechts auf dem Startbildschirm. Legen Sie einen Ordnernamen und eine Farbe fest. Nach der Erstellung tippen Sie auf den Ordner, um Fragen hinzuzufügen.",
    },
  },
  {
    question: {
      ja: "問題の作り方を教えてください",
      ko: "문제는 어떻게 만드나요?",
      en: "How do I create a question?",
      "zh-TW": "如何建立問題？",
      zh: "如何创建问题？",
      ar: "كيف أنشئ سؤالاً؟",
      es: "¿Cómo creo una pregunta?",
      fr: "Comment créer une question ?",
      pt: "Como criar uma pergunta?",
      de: "Wie erstelle ich eine Frage?",
    },
    answer: {
      ja: "フォルダを開き、右下の「＋」ボタンをタップします。問題文・回答・問題形式・難易度を設定して保存してください。カメラや写真ライブラリから画像を追加することもできます。AIを使って問題文から自動で問題を生成することも可能です（Premiumプラン）。",
      ko: "폴더를 열고 오른쪽 하단의 「＋」버튼을 탭합니다. 문제, 답변, 문제 형식, 난이도를 설정하고 저장하세요. 카메라나 사진 라이브러리에서 이미지를 추가할 수도 있습니다. AI를 사용하여 문제를 자동으로 생성할 수도 있습니다(Premium 플랜).",
      en: "Open a folder and tap the「＋」button at the bottom right. Set the question, answer, question type, and difficulty, then save. You can also add images from the camera or photo library. AI can automatically generate questions from your input (Premium plan).",
      "zh-TW": "開啟資料夾，點選右下角的「＋」按鈕。設定題目、答案、題型及難度後儲存。也可從相機或相片庫新增圖片。AI 可自動生成問題（Premium 方案）。",
      zh: "打开文件夹，点击右下角的「＋」按钮。设置题目、答案、题型及难度后保存。也可从相机或相册添加图片。AI 可自动生成问题（Premium 方案）。",
      ar: "افتح المجلد واضغط على زر「＋」في أسفل اليمين. عيّن السؤال والإجابة ونوع السؤال والصعوبة ثم احفظ. يمكنك أيضًا إضافة صور من الكاميرا أو مكتبة الصور. يمكن للذكاء الاصطناعي توليد الأسئلة تلقائيًا (خطة Premium).",
      es: "Abre una carpeta y toca el botón「＋」en la parte inferior derecha. Configura la pregunta, respuesta, tipo y dificultad, luego guarda. También puedes agregar imágenes desde la cámara o biblioteca de fotos. La IA puede generar preguntas automáticamente (plan Premium).",
      fr: "Ouvrez un dossier et appuyez sur le bouton「＋」en bas à droite. Configurez la question, la réponse, le type et la difficulté, puis enregistrez. Vous pouvez également ajouter des images depuis la caméra ou la bibliothèque. L'IA peut générer des questions automatiquement (plan Premium).",
      pt: "Abra uma pasta e toque no botão「＋」no canto inferior direito. Configure a pergunta, resposta, tipo e dificuldade, depois salve. Você também pode adicionar imagens da câmera ou biblioteca de fotos. A IA pode gerar perguntas automaticamente (plano Premium).",
      de: "Öffnen Sie einen Ordner und tippen Sie auf die Schaltfläche「＋」unten rechts. Konfigurieren Sie Frage, Antwort, Typ und Schwierigkeitsgrad und speichern Sie. Sie können auch Bilder aus der Kamera oder Fotobibliothek hinzufügen. Die KI kann Fragen automatisch generieren (Premium-Plan).",
    },
  },
  {
    question: {
      ja: "問題の種類を教えてください",
      ko: "문제 종류에 대해 알려주세요",
      en: "What types of questions are available?",
      "zh-TW": "有哪些題型？",
      zh: "有哪些题型？",
      ar: "ما أنواع الأسئلة المتاحة؟",
      es: "¿Qué tipos de preguntas hay?",
      fr: "Quels types de questions sont disponibles ?",
      pt: "Quais tipos de perguntas estão disponíveis?",
      de: "Welche Fragetypen gibt es?",
    },
    answer: {
      ja: "以下の問題形式に対応しています：\n1. 穴埋め問題（空欄に答えを入力）\n2. 四択問題（4つの選択肢から選ぶ）\n3. 複数選択問題（複数の正解を選ぶ）\n4. 画像問題（画像を見て答える）\n5. ○×問題（正誤判定）\n6. 記述問題（自由記述で答える）\n7. スピーキング問題（声で答える）\n8. スペリング問題（文字を並べてスペルを完成させる）\n9. 並べ替え問題（単語・文を正しい順に並べる）",
      ko: "다음 문제 형식을 지원합니다:\n1. 빈칸 채우기(빈칸에 답 입력)\n2. 사지선다(4개 선택지 중 선택)\n3. 복수 선택(여러 정답 선택)\n4. 이미지 문제(이미지 보고 답하기)\n5. O×문제(정오 판정)\n6. 서술형(자유 서술로 답하기)\n7. 스피킹 문제(음성으로 답하기)\n8. 스펠링 문제(글자 배열로 스펠 완성)\n9. 배열 문제(단어/문장을 올바른 순서로 배열)",
      en: "The following question types are supported:\n1. Fill in the blank (type the answer)\n2. Four-choice (choose from 4 options)\n3. Multi-select (choose multiple correct answers)\n4. Image question (answer based on an image)\n5. True/False (judge correct or incorrect)\n6. Written (free-form written answer)\n7. Speaking (answer by voice)\n8. Spelling (arrange letters to complete the spelling)\n9. Rearrangement (arrange words/sentences in correct order)",
      "zh-TW": "支援以下題型：\n1. 填空題（在空白處輸入答案）\n2. 四選一（從4個選項中選擇）\n3. 複選題（選擇多個正確答案）\n4. 圖片題（看圖作答）\n5. 是非題（判斷對錯）\n6. 問答題（自由書寫作答）\n7. 口說題（用語音作答）\n8. 拼字題（排列字母完成拼字）\n9. 排序題（將單字/句子排成正確順序）",
      zh: "支持以下题型：\n1. 填空题（在空白处输入答案）\n2. 四选一（从4个选项中选择）\n3. 多选题（选择多个正确答案）\n4. 图片题（看图作答）\n5. 判断题（判断正误）\n6. 问答题（自由书写作答）\n7. 口语题（用语音作答）\n8. 拼写题（排列字母完成拼写）\n9. 排序题（将单词/句子排成正确顺序）",
      ar: "أنواع الأسئلة المدعومة:\n1. ملء الفراغات (اكتب الإجابة)\n2. اختيار من أربعة (اختر من 4 خيارات)\n3. اختيار متعدد (اختر إجابات صحيحة متعددة)\n4. سؤال صوري (أجب بناءً على صورة)\n5. صح وخطأ (حكم بصحة أو خطأ)\n6. مكتوب (إجابة حرة)\n7. محادثة (أجب بالصوت)\n8. التهجئة (رتب الحروف لإكمال الكلمة)\n9. إعادة الترتيب (رتب الكلمات/الجمل بالترتيب الصحيح)",
      es: "Los siguientes tipos de preguntas están disponibles:\n1. Completar (escribe la respuesta)\n2. Cuatro opciones (elige entre 4 opciones)\n3. Selección múltiple (elige varias respuestas correctas)\n4. Pregunta de imagen (responde basándote en una imagen)\n5. Verdadero/Falso (juzga correcto o incorrecto)\n6. Escrita (respuesta escrita libre)\n7. Hablada (responde con voz)\n8. Ortografía (ordena letras para completar la palabra)\n9. Ordenar (ordena palabras/frases en el orden correcto)",
      fr: "Les types de questions suivants sont disponibles :\n1. Remplir les blancs (tapez la réponse)\n2. Quatre choix (choisissez parmi 4 options)\n3. Sélection multiple (choisissez plusieurs bonnes réponses)\n4. Question image (répondez en regardant une image)\n5. Vrai/Faux (jugez correct ou incorrect)\n6. Écrit (réponse écrite libre)\n7. Parlé (répondez par la voix)\n8. Orthographe (arrangez des lettres pour compléter le mot)\n9. Réarrangement (arrangez des mots/phrases dans le bon ordre)",
      pt: "Os seguintes tipos de perguntas estão disponíveis:\n1. Preencher (escreva a resposta)\n2. Quatro opções (escolha entre 4 opções)\n3. Múltipla escolha (escolha várias respostas corretas)\n4. Pergunta de imagem (responda com base em uma imagem)\n5. Verdadeiro/Falso (julgue correto ou incorreto)\n6. Escrita (resposta escrita livre)\n7. Fala (responda por voz)\n8. Ortografia (organize letras para completar a palavra)\n9. Reorganização (organize palavras/frases na ordem correta)",
      de: "Folgende Fragetypen sind verfügbar:\n1. Lückentext (Antwort eingeben)\n2. Vier Optionen (aus 4 Optionen wählen)\n3. Mehrfachauswahl (mehrere richtige Antworten wählen)\n4. Bildfrage (anhand eines Bildes antworten)\n5. Wahr/Falsch (richtig oder falsch beurteilen)\n6. Schriftlich (freie schriftliche Antwort)\n7. Sprechen (per Stimme antworten)\n8. Rechtschreibung (Buchstaben zum Wort zusammensetzen)\n9. Umordnung (Wörter/Sätze in die richtige Reihenfolge bringen)",
    },
  },
  {
    question: {
      ja: "AI機能の使い方を教えてください",
      ko: "AI 기능은 어떻게 사용하나요?",
      en: "How do I use the AI features?",
      "zh-TW": "如何使用 AI 功能？",
      zh: "如何使用 AI 功能？",
      ar: "كيف أستخدم ميزات الذكاء الاصطناعي؟",
      es: "¿Cómo uso las funciones de IA?",
      fr: "Comment utiliser les fonctionnalités IA ?",
      pt: "Como usar os recursos de IA?",
      de: "Wie verwende ich die KI-Funktionen?",
    },
    answer: {
      ja: "SnapQuizには2つのAI機能があります：\n\n【AI問題生成】\n問題作成画面でカメラ撮影または写真ライブラリから画像を選択すると、AIが画像の内容をもとに問題を自動生成します（Premiumプラン）。\n\n【AIチャット】\nフォルダ内のAIチャット機能を使うと、そのフォルダの問題に関連した内容をAIに質問できます。学習内容の深掘りや補足説明に役立てることができます（Premiumプラン）。\n\n無料プランでは月ごとに利用回数の上限があります。",
      ko: "SnapQuiz에는 두 가지 AI 기능이 있습니다:\n\n【AI 문제 생성】\n문제 생성 화면에서 카메라 촬영 또는 사진 라이브러리에서 이미지를 선택하면 AI가 이미지 내용을 기반으로 문제를 자동 생성합니다(Premium 플랜).\n\n【AI 채팅】\n폴더 내의 AI 채팅 기능을 사용하면 해당 폴더의 문제와 관련된 내용을 AI에게 질문할 수 있습니다. 학습 내용을 심화하거나 보충 설명에 활용할 수 있습니다(Premium 플랜).\n\n무료 플랜은 월별 이용 횟수에 제한이 있습니다.",
      en: "SnapQuiz has two AI features:\n\n【AI Question Generation】\nOn the question creation screen, take a photo with the camera or select an image from the photo library. The AI will automatically generate questions based on the image content (Premium plan).\n\n【AI Chat】\nUse the AI chat feature inside a folder to ask the AI questions related to that folder's content. Great for deeper exploration or additional explanations (Premium plan).\n\nThe free plan has a monthly usage limit.",
      "zh-TW": "SnapQuiz 有兩種 AI 功能：\n\n【AI 生成問題】\n在建立問題畫面中，使用相機拍攝或從相片庫選取圖片，AI 將根據圖片內容自動生成問題（Premium 方案）。\n\n【AI 聊天】\n使用資料夾內的 AI 聊天功能，可向 AI 詢問與該資料夾題目相關的內容，有助於深入學習或補充說明（Premium 方案）。\n\n免費方案每月有使用次數上限。",
      zh: "SnapQuiz 有两种 AI 功能：\n\n【AI 生成问题】\n在创建问题界面，使用相机拍照或从相册选取图片，AI 将根据图片内容自动生成问题（Premium 方案）。\n\n【AI 聊天】\n使用文件夹内的 AI 聊天功能，可向 AI 询问与该文件夹题目相关的内容，有助于深入学习或补充说明（Premium 方案）。\n\n免费方案每月有使用次数上限。",
      ar: "يحتوي SnapQuiz على ميزتين للذكاء الاصطناعي:\n\n【توليد الأسئلة بالذكاء الاصطناعي】\nفي شاشة إنشاء الأسئلة، التقط صورة بالكاميرا أو اختر صورة من مكتبة الصور. سيقوم الذكاء الاصطناعي تلقائيًا بإنشاء أسئلة بناءً على محتوى الصورة (خطة Premium).\n\n【الدردشة بالذكاء الاصطناعي】\nاستخدم ميزة دردشة الذكاء الاصطناعي داخل المجلد لطرح أسئلة على الذكاء الاصطناعي تتعلق بمحتوى ذلك المجلد. مفيد للاستكشاف العميق أو الشرح الإضافي (خطة Premium).\n\nالخطة المجانية لها حد شهري للاستخدام.",
      es: "SnapQuiz tiene dos funciones de IA:\n\n【Generación de preguntas con IA】\nEn la pantalla de creación de preguntas, toma una foto con la cámara o selecciona una imagen de la biblioteca. La IA generará automáticamente preguntas basadas en el contenido de la imagen (plan Premium).\n\n【Chat con IA】\nUsa la función de chat de IA dentro de una carpeta para hacer preguntas relacionadas con su contenido. Ideal para profundizar o agregar explicaciones (plan Premium).\n\nEl plan gratuito tiene un límite de uso mensual.",
      fr: "SnapQuiz dispose de deux fonctionnalités IA :\n\n【Génération de questions par IA】\nSur l'écran de création de question, prenez une photo avec la caméra ou sélectionnez une image depuis la bibliothèque. L'IA générera automatiquement des questions basées sur le contenu de l'image (plan Premium).\n\n【Chat IA】\nUtilisez la fonction de chat IA dans un dossier pour poser des questions à l'IA sur le contenu de ce dossier. Idéal pour approfondir l'apprentissage (plan Premium).\n\nLe plan gratuit a une limite d'utilisation mensuelle.",
      pt: "O SnapQuiz tem dois recursos de IA:\n\n【Geração de perguntas com IA】\nNa tela de criação de perguntas, tire uma foto com a câmera ou selecione uma imagem da biblioteca. A IA gerará automaticamente perguntas com base no conteúdo da imagem (plano Premium).\n\n【Chat com IA】\nUse o recurso de chat de IA dentro de uma pasta para fazer perguntas relacionadas ao conteúdo dessa pasta. Ideal para aprofundar o aprendizado (plano Premium).\n\nO plano gratuito tem um limite de uso mensal.",
      de: "SnapQuiz hat zwei KI-Funktionen:\n\n【KI-Fragengenerierung】\nAuf dem Fragenerstell-Bildschirm machen Sie ein Foto mit der Kamera oder wählen ein Bild aus der Bibliothek. Die KI generiert automatisch Fragen basierend auf dem Bildinhalt (Premium-Plan).\n\n【KI-Chat】\nVerwenden Sie die KI-Chat-Funktion in einem Ordner, um der KI Fragen zum Inhalt dieses Ordners zu stellen. Ideal zum Vertiefen des Lernstoffs (Premium-Plan).\n\nDer kostenlose Plan hat ein monatliches Nutzungslimit.",
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
      ja: "復習機能は間隔反復法（スペースドリピティション）を採用しています。問題に回答するたびに復習スケジュールが更新され、以下のタイミングで再度出題されます：\n・初回回答後 → 1日後\n・1日後 → 1週間後\n・1週間後 → 1ヶ月後\n・1ヶ月後 → 3ヶ月後\n\n復習タブから本日の復習問題を確認できます。正解・不正解に応じてスケジュールが最適化されます。",
      ko: "복습 기능은 간격 반복법(스페이스드 리피티션)을 채택하고 있습니다. 문제에 답할 때마다 복습 일정이 업데이트되며, 다음 타이밍에 다시 출제됩니다:\n・첫 답변 후 → 1일 후\n・1일 후 → 1주 후\n・1주 후 → 1개월 후\n・1개월 후 → 3개월 후\n\n복습 탭에서 오늘의 복습 문제를 확인할 수 있습니다. 정답/오답에 따라 일정이 최적화됩니다.",
      en: "The review feature uses spaced repetition. Every time you answer a question, the review schedule is updated and the question will appear again at the following intervals:\n・After first answer → 1 day later\n・1 day later → 1 week later\n・1 week later → 1 month later\n・1 month later → 3 months later\n\nCheck today's review questions from the Review tab. The schedule is optimized based on correct and incorrect answers.",
      "zh-TW": "複習功能採用間隔重複法（Spaced Repetition）。每次回答問題後複習排程會更新，並依以下時間再次出題：\n・首次回答後 → 1 天後\n・1 天後 → 1 週後\n・1 週後 → 1 個月後\n・1 個月後 → 3 個月後\n\n可從複習標籤查看今日複習題目。排程會根據答對/答錯進行最佳化。",
      zh: "复习功能采用间隔重复法（Spaced Repetition）。每次回答问题后复习日程会更新，并按以下时间再次出题：\n・首次回答后 → 1 天后\n・1 天后 → 1 周后\n・1 周后 → 1 个月后\n・1 个月后 → 3 个月后\n\n可从复习标签查看今日复习题目。日程会根据答对/答错进行优化。",
      ar: "تستخدم ميزة المراجعة أسلوب التكرار المتباعد (Spaced Repetition). في كل مرة تجيب على سؤال، يتم تحديث جدول المراجعة وسيظهر السؤال مرة أخرى في المواعيد التالية:\n・بعد الإجابة الأولى ← بعد يوم\n・بعد يوم ← بعد أسبوع\n・بعد أسبوع ← بعد شهر\n・بعد شهر ← بعد 3 أشهر\n\nيمكنك الاطلاع على أسئلة المراجعة اليومية من تبويب المراجعة. يتم تحسين الجدول بناءً على الإجابات الصحيحة والخاطئة.",
      es: "La función de repaso usa repetición espaciada. Cada vez que respondes una pregunta, el programa de repaso se actualiza y la pregunta aparecerá de nuevo en los siguientes intervalos:\n・Después de la primera respuesta → 1 día después\n・1 día después → 1 semana después\n・1 semana después → 1 mes después\n・1 mes después → 3 meses después\n\nConsulta las preguntas de repaso de hoy en la pestaña Repaso. El programa se optimiza según las respuestas correctas e incorrectas.",
      fr: "La fonction de révision utilise la répétition espacée. À chaque fois que vous répondez à une question, le programme de révision est mis à jour et la question apparaîtra à nouveau aux intervalles suivants :\n・Après la première réponse → 1 jour plus tard\n・1 jour plus tard → 1 semaine plus tard\n・1 semaine plus tard → 1 mois plus tard\n・1 mois plus tard → 3 mois plus tard\n\nConsultez les questions du jour dans l'onglet Révision. Le programme est optimisé en fonction des bonnes et mauvaises réponses.",
      pt: "O recurso de revisão usa repetição espaçada. Toda vez que você responde uma pergunta, o cronograma de revisão é atualizado e a pergunta aparecerá novamente nos seguintes intervalos:\n・Após a primeira resposta → 1 dia depois\n・1 dia depois → 1 semana depois\n・1 semana depois → 1 mês depois\n・1 mês depois → 3 meses depois\n\nConsulte as perguntas de revisão de hoje na aba Revisão. O cronograma é otimizado com base em respostas corretas e incorretas.",
      de: "Die Wiederholungsfunktion nutzt Spaced Repetition. Jedes Mal, wenn Sie eine Frage beantworten, wird der Wiederholungsplan aktualisiert und die Frage erscheint erneut zu folgenden Zeitpunkten:\n・Nach der ersten Antwort → 1 Tag später\n・1 Tag später → 1 Woche später\n・1 Woche später → 1 Monat später\n・1 Monat später → 3 Monate später\n\nSehen Sie die heutigen Wiederholungsfragen im Tab „Wiederholen\". Der Plan wird basierend auf richtigen und falschen Antworten optimiert.",
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
      ja: "マイページの「購入を復元する」をタップしてください。同じApple IDでサインインしている必要があります。復元できない場合は、App Storeの購入履歴をご確認ください。",
      ko: "마이페이지의 「구매 복원」을 탭해 주세요. 동일한 Apple ID로 로그인되어 있어야 합니다. 복원이 되지 않으면 App Store 구매 내역을 확인해 주세요.",
      en: "Tap \"Restore Purchases\" on the My Page screen. You must be signed in with the same Apple ID. If restoration fails, please check your App Store purchase history.",
      "zh-TW": "請點選「我的頁面」中的「恢復購買」。必須使用相同的 Apple ID 登入。若無法恢復，請確認 App Store 的購買記錄。",
      zh: "请点击「我的页面」中的「恢复购买」。必须使用相同的 Apple ID 登录。若无法恢复，请确认 App Store 的购买记录。",
      ar: "اضغط على «استعادة المشتريات» في شاشة صفحتي. يجب أن تكون مسجلاً بنفس Apple ID. إذا فشلت الاستعادة، تحقق من سجل المشتريات في App Store.",
      es: "Toca \"Restaurar compras\" en la pantalla Mi página. Debes estar con la misma Apple ID. Si falla la restauración, comprueba tu historial de compras en App Store.",
      fr: "Appuyez sur \"Restaurer les achats\" sur l'écran Ma page. Vous devez être connecté avec le même Apple ID. Si la restauration échoue, vérifiez votre historique d'achats dans l'App Store.",
      pt: "Toque em \"Restaurar Compras\" na tela Minha Página. Você deve estar com o mesmo Apple ID. Se a restauração falhar, verifique seu histórico de compras na App Store.",
      de: "Tippen Sie auf \"Käufe wiederherstellen\" auf dem Bildschirm \"Meine Seite\". Sie müssen mit derselben Apple ID angemeldet sein. Falls die Wiederherstellung fehlschlägt, prüfen Sie Ihren Kaufverlauf im App Store.",
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
      ja: "現在、SnapQuizの問題データはお使いの端末内にのみ保存されます。クラウド同期機能は現在対応しておりません。アプリをアンインストールするとデータが削除されますのでご注意ください。端末の買い替え時にはデータの引き継ぎができませんので、あらかじめご了承ください。",
      ko: "현재 SnapQuiz의 문제 데이터는 사용 중인 기기 내에만 저장됩니다. 클라우드 동기화 기능은 현재 지원하지 않습니다. 앱을 삭제하면 데이터가 삭제되므로 주의해 주세요. 기기를 교체할 때 데이터를 이전할 수 없으니 미리 양해 부탁드립니다.",
      en: "Currently, SnapQuiz question data is stored only on your device. Cloud sync is not currently supported. Please note that uninstalling the app will delete your data, and data cannot be transferred when changing devices.",
      "zh-TW": "目前 SnapQuiz 的問題資料僅儲存在您的裝置中，目前不支援雲端同步。解除安裝應用程式後資料將會被刪除，請注意。更換裝置時無法移轉資料，敬請見諒。",
      zh: "目前 SnapQuiz 的问题数据仅储存在您的设备中，暂不支持云端同步。卸载应用后数据将被删除，请注意。更换设备时无法转移数据，敬请谅解。",
      ar: "حاليًا، تُخزَّن بيانات أسئلة SnapQuiz على جهازك فقط، ولا يتوفر مزامنة سحابية في الوقت الحالي. يُرجى ملاحظة أن إلغاء تثبيت التطبيق سيؤدي إلى حذف بياناتك، ولا يمكن نقل البيانات عند تغيير الجهاز.",
      es: "Actualmente, los datos de preguntas de SnapQuiz se almacenan solo en tu dispositivo. La sincronización en la nube no está disponible. Ten en cuenta que desinstalar la aplicación eliminará tus datos y no se pueden transferir al cambiar de dispositivo.",
      fr: "Actuellement, les données de questions de SnapQuiz sont stockées uniquement sur votre appareil. La synchronisation cloud n'est pas disponible. Notez que la désinstallation de l'application supprimera vos données et qu'elles ne peuvent pas être transférées lors d'un changement d'appareil.",
      pt: "Atualmente, os dados de perguntas do SnapQuiz são armazenados apenas no seu dispositivo. A sincronização na nuvem não está disponível. Observe que desinstalar o aplicativo excluirá seus dados e eles não podem ser transferidos ao trocar de dispositivo.",
      de: "Derzeit werden Fragendaten von SnapQuiz nur auf Ihrem Gerät gespeichert. Cloud-Synchronisation ist derzeit nicht verfügbar. Bitte beachten Sie, dass das Deinstallieren der App Ihre Daten löscht und diese beim Gerätewechsel nicht übertragen werden können.",
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
              ? "bg-blue-600 text-white"
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
export default function SnapQuizSupportPage() {
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
              alt="SnapQuiz"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">SnapQuiz</h1>
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
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
            href="/support/quizcards/privacy"
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
          <p>&copy; {currentYear} SnapQuiz. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
