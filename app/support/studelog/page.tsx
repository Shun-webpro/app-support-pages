"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import appIcon from "@/app/images/studelog.png";

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
    aboutSupportText: "StudyLogをご利用いただきありがとうございます。ご不明な点やお困りのことがございましたら、以下のよくある質問をご確認いただくか、お問い合わせください。",
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
    aboutSupportText: "StudyLog를 이용해 주셔서 감사합니다. 질문이나 문제가 있으시면 아래 FAQ를 확인하시거나 문의해 주세요.",
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
    aboutSupportText: "Thank you for using StudyLog. If you have any questions or issues, please check the FAQ below or contact us.",
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
    aboutSupportText: "感謝您使用 StudyLog。如有任何疑問或問題，請參閱以下常見問題，或與我們聯絡。",
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
    aboutSupportText: "感谢您使用 StudyLog。如有任何疑问或问题，请查阅以下常见问题，或与我们联系。",
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
    aboutSupportText: "شكرًا لاستخدامك StudyLog. إذا كان لديك أي أسئلة أو مشكلات، يُرجى مراجعة الأسئلة الشائعة أدناه أو التواصل معنا.",
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
    aboutSupportText: "Gracias por usar StudyLog. Si tienes alguna pregunta o problema, consulta las preguntas frecuentes a continuación o contáctanos.",
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
    aboutSupportText: "Merci d'utiliser StudyLog. Si vous avez des questions ou des problèmes, veuillez consulter la FAQ ci-dessous ou nous contacter.",
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
    aboutSupportText: "Obrigado por usar o StudyLog. Se tiver alguma dúvida ou problema, consulte as perguntas frequentes abaixo ou entre em contato conosco.",
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
    aboutSupportText: "Vielen Dank, dass Sie StudyLog verwenden. Bei Fragen oder Problemen schauen Sie bitte in die FAQ unten oder kontaktieren Sie uns.",
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
      ja: "ストップウォッチとタイマーの違いは何ですか？",
      ko: "스톱워치와 타이머의 차이는 무엇인가요?",
      en: "What is the difference between the stopwatch and timer?",
      "zh-TW": "碼錶和計時器有什麼不同？",
      zh: "秒表和计时器有什么区别？",
      ar: "ما الفرق بين الساعة الإيقافية والمؤقت؟",
      es: "¿Cuál es la diferencia entre el cronómetro y el temporizador?",
      fr: "Quelle est la différence entre le chronomètre et le minuteur ?",
      pt: "Qual é a diferença entre o cronômetro e o temporizador?",
      de: "Was ist der Unterschied zwischen Stoppuhr und Timer?",
    },
    answer: {
      ja: "ストップウォッチは勉強を始めてから経過時間を計ります。タイマーは目標時間を設定してカウントダウンします。どちらも記録として保存されます。また、「手動」タブから開始・終了時刻を入力して過去の勉強時間を記録することもできます。",
      ko: "스톱워치는 공부를 시작한 후 경과 시간을 잽니다. 타이머는 목표 시간을 설정하여 카운트다운합니다. 둘 다 기록으로 저장됩니다. 또한 「수동」탭에서 시작・종료 시각을 입력하여 과거 공부 시간을 기록할 수도 있습니다.",
      en: "The stopwatch counts up from when you start studying. The timer counts down from a target time you set. Both are saved as records. You can also log past study sessions manually from the Manual tab by entering start and end times.",
      "zh-TW": "碼錶從您開始學習時計算經過時間。計時器從您設定的目標時間倒數計時。兩者都會儲存為記錄。您也可以在「手動」標籤中輸入開始和結束時間，記錄過去的學習時間。",
      zh: "秒表从您开始学习时计算经过时间。计时器从您设定的目标时间倒数。两者都会保存为记录。您也可以在「手动」标签中输入开始和结束时间，记录过去的学习时间。",
      ar: "تقيس الساعة الإيقافية الوقت المنقضي منذ بدء الدراسة. أما المؤقت فيعدّ تنازليًا من الوقت المستهدف الذي تحدده. يُحفظ كلاهما كسجل. يمكنك أيضًا تسجيل جلسات دراسة سابقة يدويًا من تبويب المدخل اليدوي عبر إدخال وقت البدء والانتهاء.",
      es: "El cronómetro cuenta hacia arriba desde que empiezas a estudiar. El temporizador cuenta hacia atrás desde el tiempo objetivo que establezcas. Ambos se guardan como registros. También puedes registrar sesiones de estudio pasadas manualmente desde la pestaña Manual introduciendo horas de inicio y fin.",
      fr: "Le chronomètre compte à partir du moment où vous commencez à étudier. Le minuteur effectue un compte à rebours à partir d'un temps cible que vous définissez. Les deux sont enregistrés. Vous pouvez également enregistrer manuellement des sessions d'étude passées depuis l'onglet Manuel en saisissant les heures de début et de fin.",
      pt: "O cronômetro conta a partir do momento em que você começa a estudar. O temporizador faz contagem regressiva a partir de um tempo alvo que você define. Ambos são salvos como registros. Você também pode registrar sessões de estudo passadas manualmente na aba Manual inserindo horários de início e fim.",
      de: "Die Stoppuhr zählt ab dem Beginn des Lernens hoch. Der Timer zählt von einer von Ihnen festgelegten Zielzeit herunter. Beide werden als Aufzeichnungen gespeichert. Sie können vergangene Lernsitzungen auch manuell im Tab \"Manuell\" durch Eingabe von Start- und Endzeiten erfassen.",
    },
  },
  {
    question: {
      ja: "タイマーが終わっても音が鳴りません",
      ko: "타이머가 끝나도 소리가 나지 않습니다",
      en: "The timer alarm is not sounding",
      "zh-TW": "計時器結束後沒有聲音",
      zh: "计时器结束后没有声音",
      ar: "لا يُصدر المؤقت صوتًا عند الانتهاء",
      es: "La alarma del temporizador no suena",
      fr: "L'alarme du minuteur ne sonne pas",
      pt: "O alarme do temporizador não está tocando",
      de: "Der Timer-Alarm ertönt nicht",
    },
    answer: {
      ja: "以下をご確認ください：\n1. iPhoneのマナーモード（サイレントスイッチ）がオフになっていること\n2. 音量が適切に設定されていること\n3. iOSの設定アプリ → StudyLog → 通知でサウンドが許可されていること\n設定画面のアラーム音から好みのアラーム音に変更することもできます。",
      ko: "다음을 확인해 주세요:\n1. iPhone의 매너 모드(사일런트 스위치)가 꺼져 있는지\n2. 볼륨이 적절하게 설정되어 있는지\n3. iOS 설정 앱 → StudyLog → 알림에서 소리가 허용되어 있는지\n설정 화면의 알람 소리에서 원하는 알람 소리로 변경할 수도 있습니다.",
      en: "Please check the following:\n1. iPhone silent mode (mute switch) is turned off\n2. Volume is set appropriately\n3. Sound is allowed in iOS Settings → StudyLog → Notifications\nYou can also change the alarm sound from the alarm sound setting in the Settings screen.",
      "zh-TW": "請確認以下事項：\n1. iPhone 靜音模式（靜音開關）已關閉\n2. 音量設定適當\n3. iOS 設定 → StudyLog → 通知中已允許聲音\n您也可以在設定畫面的鬧鐘音效中更改喜好的鬧鐘音效。",
      zh: "请确认以下事项：\n1. iPhone 静音模式（静音开关）已关闭\n2. 音量设置适当\n3. iOS 设置 → StudyLog → 通知中已允许声音\n您也可以在设置界面的闹钟声音中更改喜好的闹钟声音。",
      ar: "يرجى التحقق مما يلي:\n1. وضع الصامت (مفتاح الصمت) على iPhone مُوقَّف\n2. مستوى الصوت مضبوط بشكل مناسب\n3. الصوت مسموح به في: iOS الإعدادات ← StudyLog ← الإشعارات\nيمكنك أيضًا تغيير صوت المنبه من إعداد صوت المنبه في شاشة الإعدادات.",
      es: "Por favor, comprueba lo siguiente:\n1. El modo silencio del iPhone (interruptor de silencio) está desactivado\n2. El volumen está ajustado correctamente\n3. El sonido está permitido en Ajustes de iOS → StudyLog → Notificaciones\nTambién puedes cambiar el sonido de alarma desde el ajuste de sonido de alarma en la pantalla de Ajustes.",
      fr: "Veuillez vérifier les points suivants :\n1. Le mode silencieux (interrupteur de silence) de l'iPhone est désactivé\n2. Le volume est réglé correctement\n3. Le son est autorisé dans Réglages iOS → StudyLog → Notifications\nVous pouvez également changer le son de l'alarme depuis le réglage du son d'alarme dans l'écran Réglages.",
      pt: "Por favor, verifique o seguinte:\n1. O modo silencioso do iPhone (interruptor de silêncio) está desativado\n2. O volume está ajustado adequadamente\n3. O som é permitido em Ajustes do iOS → StudyLog → Notificações\nVocê também pode alterar o som do alarme nas configurações de som do alarme na tela de Configurações.",
      de: "Bitte prüfen Sie Folgendes:\n1. Der Stummschaltmodus (Stummschalter) des iPhones ist deaktiviert\n2. Die Lautstärke ist angemessen eingestellt\n3. Ton ist erlaubt unter iOS-Einstellungen → StudyLog → Mitteilungen\nSie können den Alarmton auch in den Alarmton-Einstellungen im Einstellungsbildschirm ändern.",
    },
  },
  {
    question: {
      ja: "計測中にアプリを閉じたらどうなりますか？",
      ko: "측정 중에 앱을 닫으면 어떻게 되나요?",
      en: "What happens if I close the app while measuring?",
      "zh-TW": "計時中關閉應用程式會怎樣？",
      zh: "计时中关闭应用程序会怎样？",
      ar: "ماذا يحدث إذا أغلقت التطبيق أثناء القياس؟",
      es: "¿Qué pasa si cierro la app mientras mido?",
      fr: "Que se passe-t-il si je ferme l'app pendant la mesure ?",
      pt: "O que acontece se eu fechar o app durante a medição?",
      de: "Was passiert, wenn ich die App während der Messung schließe?",
    },
    answer: {
      ja: "アプリをバックグラウンドに移動しても計測は継続されます。再度アプリを開くと計測画面が復元されます。ただし、アプリを完全に終了（スワイプで削除）すると計測が止まる場合があります。正確な記録のために、計測中はアプリを開いたままにしておくことをおすすめします。",
      ko: "앱을 백그라운드로 이동해도 측정은 계속됩니다. 앱을 다시 열면 측정 화면이 복원됩니다. 단, 앱을 완전히 종료(스와이프로 삭제)하면 측정이 멈출 수 있습니다. 정확한 기록을 위해 측정 중에는 앱을 열어 두시기 바랍니다.",
      en: "Measurement continues even when the app is moved to the background. When you open the app again, the measurement screen will be restored. However, completely terminating the app (swiping it away) may stop the measurement. For accurate records, we recommend keeping the app open while measuring.",
      "zh-TW": "即使將應用程式移至背景，計時仍會繼續。重新開啟應用程式後，計時畫面將恢復。但完全關閉應用程式（向上滑動關閉）可能會停止計時。為確保記錄準確，建議計時中保持應用程式開啟。",
      zh: "即使将应用程序移至后台，计时仍会继续。重新打开应用程序后，计时界面将恢复。但完全关闭应用程序（向上滑动关闭）可能会停止计时。为确保记录准确，建议计时中保持应用程序开启。",
      ar: "يستمر القياس حتى عند نقل التطبيق إلى الخلفية. عند إعادة فتح التطبيق، ستتم استعادة شاشة القياس. ومع ذلك، قد يؤدي إنهاء التطبيق بالكامل (سحبه للأعلى وإغلاقه) إلى إيقاف القياس. للحصول على سجلات دقيقة، نوصي بإبقاء التطبيق مفتوحًا أثناء القياس.",
      es: "La medición continúa incluso cuando la app se mueve al fondo. Cuando vuelvas a abrir la app, se restaurará la pantalla de medición. Sin embargo, terminar completamente la app (deslizándola hacia arriba) puede detener la medición. Para registros precisos, recomendamos mantener la app abierta mientras mides.",
      fr: "La mesure continue même lorsque l'app est mise en arrière-plan. Quand vous rouvrez l'app, l'écran de mesure sera restauré. Cependant, terminer complètement l'app (en la faisant glisser vers le haut) peut arrêter la mesure. Pour des enregistrements précis, nous recommandons de garder l'app ouverte pendant la mesure.",
      pt: "A medição continua mesmo quando o app é movido para o plano de fundo. Ao abrir o app novamente, a tela de medição será restaurada. No entanto, encerrar completamente o app (deslizando para fechar) pode parar a medição. Para registros precisos, recomendamos manter o app aberto durante a medição.",
      de: "Die Messung läuft weiter, auch wenn die App in den Hintergrund verschoben wird. Wenn Sie die App erneut öffnen, wird der Messbildschirm wiederhergestellt. Das vollständige Beenden der App (durch Hochschwenken) kann die Messung jedoch stoppen. Für genaue Aufzeichnungen empfehlen wir, die App während der Messung geöffnet zu lassen.",
    },
  },
  {
    question: {
      ja: "Todoのリマインダーが届きません",
      ko: "Todo 알림이 오지 않습니다",
      en: "I'm not receiving Todo reminders",
      "zh-TW": "收不到 Todo 提醒",
      zh: "收不到 Todo 提醒",
      ar: "لا أتلقى تذكيرات المهام",
      es: "No recibo recordatorios de tareas",
      fr: "Je ne reçois pas les rappels de tâches",
      pt: "Não estou recebendo lembretes de tarefas",
      de: "Ich erhalte keine Aufgabenerinnerungen",
    },
    answer: {
      ja: "以下をご確認ください：\n1. 設定画面の「通知」でTodoリマインダーがONになっているか\n2. iOSの設定アプリ → StudyLog → 通知で通知が許可されているか\n3. 集中モード（おやすみモード等）がONになっていないか\n設定を確認後、アプリを再起動してみてください。",
      ko: "다음을 확인해 주세요:\n1. 설정 화면의 「알림」에서 Todo 리마인더가 ON인지\n2. iOS 설정 앱 → StudyLog → 알림에서 알림이 허용되어 있는지\n3. 집중 모드(방해 금지 모드 등)가 ON인지\n설정을 확인한 후 앱을 재시작해 보세요.",
      en: "Please check the following:\n1. Todo reminders are turned ON in the Settings screen under Notifications\n2. Notifications are allowed in iOS Settings → StudyLog → Notifications\n3. Focus mode (Do Not Disturb, etc.) is not turned ON\nAfter checking the settings, try restarting the app.",
      "zh-TW": "請確認以下事項：\n1. 設定畫面的「通知」中 Todo 提醒已開啟\n2. iOS 設定 → StudyLog → 通知中已允許通知\n3. 專注模式（勿擾模式等）未開啟\n確認設定後，請嘗試重新啟動應用程式。",
      zh: "请确认以下事项：\n1. 设置界面的「通知」中 Todo 提醒已开启\n2. iOS 设置 → StudyLog → 通知中已允许通知\n3. 专注模式（勿扰模式等）未开启\n确认设置后，请尝试重新启动应用程序。",
      ar: "يرجى التحقق مما يلي:\n1. تذكيرات المهام مفعّلة في شاشة الإعدادات تحت الإشعارات\n2. الإشعارات مسموح بها في: iOS الإعدادات ← StudyLog ← الإشعارات\n3. وضع التركيز (عدم الإزعاج، إلخ) غير مفعّل\nبعد التحقق من الإعدادات، جرّب إعادة تشغيل التطبيق.",
      es: "Por favor, comprueba lo siguiente:\n1. Los recordatorios de tareas están activados en la pantalla de Ajustes bajo Notificaciones\n2. Las notificaciones están permitidas en Ajustes de iOS → StudyLog → Notificaciones\n3. El modo Enfoque (No molestar, etc.) no está activado\nDespués de comprobar los ajustes, intenta reiniciar la app.",
      fr: "Veuillez vérifier les points suivants :\n1. Les rappels de tâches sont activés dans l'écran Réglages sous Notifications\n2. Les notifications sont autorisées dans Réglages iOS → StudyLog → Notifications\n3. Le mode Concentration (Ne pas déranger, etc.) n'est pas activé\nAprès avoir vérifié les réglages, essayez de redémarrer l'app.",
      pt: "Por favor, verifique o seguinte:\n1. Os lembretes de tarefas estão ativados na tela de Configurações em Notificações\n2. As notificações são permitidas em Ajustes do iOS → StudyLog → Notificações\n3. O modo Foco (Não Perturbe, etc.) não está ativado\nApós verificar as configurações, tente reiniciar o app.",
      de: "Bitte prüfen Sie Folgendes:\n1. Aufgabenerinnerungen sind im Einstellungsbildschirm unter Benachrichtigungen aktiviert\n2. Benachrichtigungen sind erlaubt unter iOS-Einstellungen → StudyLog → Mitteilungen\n3. Der Fokusmodus (Nicht stören usw.) ist nicht aktiviert\nÜberprüfen Sie die Einstellungen und starten Sie dann die App neu.",
    },
  },
  {
    question: {
      ja: "データはどこに保存されますか？",
      ko: "데이터는 어디에 저장되나요?",
      en: "Where is my data stored?",
      "zh-TW": "資料儲存在哪裡？",
      zh: "数据存储在哪里？",
      ar: "أين يتم تخزين بياناتي؟",
      es: "¿Dónde se almacenan mis datos?",
      fr: "Où mes données sont-elles stockées ?",
      pt: "Onde meus dados são armazenados?",
      de: "Wo werden meine Daten gespeichert?",
    },
    answer: {
      ja: "すべてのデータ（勉強記録、教科、Todoなど）はお使いのiPhone内にのみ保存されます。外部サーバーへの送信や、クラウド同期は一切行いません。アプリをアンインストールするとデータは削除されます。iCloudバックアップをONにしておくと、端末のバックアップとともにアプリデータも保護されます。",
      ko: "모든 데이터(학습 기록, 과목, Todo 등)는 사용 중인 iPhone 내에만 저장됩니다. 외부 서버 전송이나 클라우드 동기화는 일절 하지 않습니다. 앱을 삭제하면 데이터가 삭제됩니다. iCloud 백업을 ON으로 설정해 두면 기기 백업과 함께 앱 데이터도 보호됩니다.",
      en: "All data (study records, subjects, Todos, etc.) is stored only on your iPhone. No data is sent to external servers and there is no cloud sync. Uninstalling the app will delete your data. Turning on iCloud backup will protect your app data along with your device backup.",
      "zh-TW": "所有資料（學習記錄、科目、Todo 等）僅儲存在您的 iPhone 中。不會傳送至外部伺服器，也不進行雲端同步。解除安裝應用程式後資料將被刪除。開啟 iCloud 備份可在裝置備份時一同保護應用程式資料。",
      zh: "所有数据（学习记录、科目、Todo 等）仅存储在您的 iPhone 中。不会发送至外部服务器，也不进行云端同步。卸载应用程序后数据将被删除。开启 iCloud 备份可在设备备份时一同保护应用程序数据。",
      ar: "جميع البيانات (سجلات الدراسة والمواد والمهام وما إلى ذلك) مُخزَّنة فقط على iPhone الخاص بك. لا يتم إرسال أي بيانات إلى خوادم خارجية ولا توجد مزامنة سحابية. ستؤدي إزالة تثبيت التطبيق إلى حذف بياناتك. سيحمي تفعيل النسخ الاحتياطي على iCloud بيانات تطبيقك مع نسخة احتياطية لجهازك.",
      es: "Todos los datos (registros de estudio, materias, tareas, etc.) se almacenan solo en tu iPhone. No se envían datos a servidores externos y no hay sincronización en la nube. Desinstalar la app eliminará tus datos. Activar la copia de seguridad de iCloud protegerá los datos de tu app junto con la copia de seguridad del dispositivo.",
      fr: "Toutes les données (enregistrements d'études, matières, tâches, etc.) sont stockées uniquement sur votre iPhone. Aucune donnée n'est envoyée à des serveurs externes et il n'y a pas de synchronisation cloud. Désinstaller l'app supprimera vos données. Activer la sauvegarde iCloud protégera les données de votre app avec la sauvegarde de l'appareil.",
      pt: "Todos os dados (registros de estudo, disciplinas, tarefas, etc.) são armazenados apenas no seu iPhone. Nenhum dado é enviado para servidores externos e não há sincronização em nuvem. Desinstalar o app excluirá seus dados. Ativar o backup do iCloud protegerá os dados do app junto com o backup do dispositivo.",
      de: "Alle Daten (Lernaufzeichnungen, Fächer, Aufgaben usw.) werden nur auf Ihrem iPhone gespeichert. Es werden keine Daten an externe Server gesendet und es gibt keine Cloud-Synchronisation. Das Deinstallieren der App löscht Ihre Daten. Das Aktivieren des iCloud-Backups schützt Ihre App-Daten zusammen mit dem Geräte-Backup.",
    },
  },
  {
    question: {
      ja: "教科を削除すると記録も消えますか？",
      ko: "과목을 삭제하면 기록도 사라지나요?",
      en: "Will my records be deleted if I delete a subject?",
      "zh-TW": "刪除科目後記錄也會消失嗎？",
      zh: "删除科目后记录也会消失吗？",
      ar: "هل ستُحذف سجلاتي إذا حذفت مادة؟",
      es: "¿Se eliminarán mis registros si elimino una materia?",
      fr: "Mes enregistrements seront-ils supprimés si je supprime une matière ?",
      pt: "Meus registros serão excluídos se eu excluir uma disciplina?",
      de: "Werden meine Aufzeichnungen gelöscht, wenn ich ein Fach lösche?",
    },
    answer: {
      ja: "教科を削除しても、その教科で記録した勉強時間のデータは残ります。ただし、教科名の表示は「削除済み」となります。個別の記録を削除したい場合は、記録画面のリストから削除してください。削除した記録は復元できませんのでご注意ください。",
      ko: "과목을 삭제해도 해당 과목으로 기록한 공부 시간 데이터는 남습니다. 단, 과목명 표시가 「삭제됨」이 됩니다. 개별 기록을 삭제하고 싶은 경우는 기록 화면의 목록에서 삭제하세요. 삭제한 기록은 복원할 수 없으니 주의해 주세요.",
      en: "Even if you delete a subject, the study time data recorded for that subject remains. However, the subject name will be displayed as \"Deleted\". If you want to delete individual records, delete them from the list on the Records screen. Please note that deleted records cannot be restored.",
      "zh-TW": "即使刪除科目，該科目的學習時間記錄仍會保留。但科目名稱將顯示為「已刪除」。若要刪除個別記錄，請從記錄畫面的列表中刪除。請注意，已刪除的記錄無法復原。",
      zh: "即使删除科目，该科目的学习时间记录仍会保留。但科目名称将显示为「已删除」。若要删除个别记录，请从记录界面的列表中删除。请注意，已删除的记录无法恢复。",
      ar: "حتى لو حذفت مادة، تبقى بيانات وقت الدراسة المسجّلة لتلك المادة. ومع ذلك، سيُعرض اسم المادة كـ «محذوفة». إذا أردت حذف سجلات فردية، فاحذفها من القائمة في شاشة السجلات. يُرجى ملاحظة أن السجلات المحذوفة لا يمكن استعادتها.",
      es: "Aunque elimines una materia, los datos de tiempo de estudio registrados para esa materia permanecen. Sin embargo, el nombre de la materia se mostrará como \"Eliminado\". Si deseas eliminar registros individuales, elimínalos de la lista en la pantalla de Registros. Ten en cuenta que los registros eliminados no se pueden restaurar.",
      fr: "Même si vous supprimez une matière, les données de temps d'étude enregistrées pour cette matière restent. Cependant, le nom de la matière sera affiché comme \"Supprimé\". Si vous souhaitez supprimer des enregistrements individuels, supprimez-les de la liste dans l'écran Enregistrements. Veuillez noter que les enregistrements supprimés ne peuvent pas être restaurés.",
      pt: "Mesmo que você exclua uma disciplina, os dados de tempo de estudo registrados para essa disciplina permanecem. No entanto, o nome da disciplina será exibido como \"Excluído\". Se você quiser excluir registros individuais, exclua-os da lista na tela de Registros. Observe que os registros excluídos não podem ser restaurados.",
      de: "Auch wenn Sie ein Fach löschen, bleiben die für dieses Fach aufgezeichneten Lernzeitdaten erhalten. Der Name des Fachs wird jedoch als \"Gelöscht\" angezeigt. Wenn Sie einzelne Aufzeichnungen löschen möchten, löschen Sie sie aus der Liste im Aufzeichnungsbildschirm. Bitte beachten Sie, dass gelöschte Aufzeichnungen nicht wiederhergestellt werden können.",
    },
  },
  {
    question: {
      ja: "パスコードを忘れてしまいました",
      ko: "패스코드를 잊어버렸습니다",
      en: "I forgot my passcode",
      "zh-TW": "我忘記了密碼",
      zh: "我忘记了密码",
      ar: "نسيت رمز المرور",
      es: "Olvidé mi código de acceso",
      fr: "J'ai oublié mon code d'accès",
      pt: "Esqueci meu código de acesso",
      de: "Ich habe meine Passode vergessen",
    },
    answer: {
      ja: "現在、パスコードを忘れた場合のリセット機能はありません。iPhoneの設定アプリ → 一般 → iPhoneストレージ からStudyLogを削除して再インストールすることでリセットできますが、すべてのデータが消えます。パスコードは必ず覚えておいてください。Face ID / Touch IDを設定しておくと、パスコードを入力せずにロック解除できます。",
      ko: "현재 패스코드를 잊었을 때 리셋하는 기능이 없습니다. iPhone 설정 앱 → 일반 → iPhone 저장 공간에서 StudyLog를 삭제하고 재설치하면 리셋할 수 있지만 모든 데이터가 사라집니다. 패스코드는 반드시 기억해 두세요. Face ID / Touch ID를 설정해 두면 패스코드를 입력하지 않고 잠금을 해제할 수 있습니다.",
      en: "There is currently no reset function if you forget your passcode. You can reset it by deleting StudyLog from iPhone Settings → General → iPhone Storage and reinstalling, but all data will be erased. Please make sure to remember your passcode. Setting up Face ID / Touch ID allows you to unlock without entering the passcode.",
      "zh-TW": "目前沒有忘記密碼時的重設功能。您可以從 iPhone 設定 → 一般 → iPhone 儲存空間中刪除 StudyLog 並重新安裝來重設，但所有資料將被清除。請務必記住您的密碼。設定 Face ID / Touch ID 可以不輸入密碼直接解鎖。",
      zh: "目前没有忘记密码时的重置功能。您可以从 iPhone 设置 → 通用 → iPhone 储存空间中删除 StudyLog 并重新安装来重置，但所有数据将被清除。请务必记住您的密码。设置 Face ID / Touch ID 可以不输入密码直接解锁。",
      ar: "لا توجد حاليًا وظيفة إعادة تعيين في حالة نسيان رمز المرور. يمكنك إعادة التعيين عن طريق حذف StudyLog من إعدادات iPhone ← عام ← تخزين iPhone وإعادة تثبيته، لكن سيتم محو جميع البيانات. تأكد من تذكر رمز المرور. يتيح لك إعداد Face ID / Touch ID فتح القفل دون إدخال رمز المرور.",
      es: "Actualmente no hay función de restablecimiento si olvidas tu código de acceso. Puedes restablecerlo eliminando StudyLog desde Ajustes de iPhone → General → Almacenamiento de iPhone y reinstalándolo, pero todos los datos se borrarán. Asegúrate de recordar tu código de acceso. Configurar Face ID / Touch ID te permite desbloquear sin introducir el código de acceso.",
      fr: "Il n'existe actuellement pas de fonction de réinitialisation en cas d'oubli du code d'accès. Vous pouvez le réinitialiser en supprimant StudyLog depuis Réglages iPhone → Général → Stockage iPhone et en le réinstallant, mais toutes les données seront effacées. Assurez-vous de vous souvenir de votre code d'accès. La configuration de Face ID / Touch ID vous permet de déverrouiller sans saisir le code d'accès.",
      pt: "Atualmente não há função de redefinição se você esquecer seu código de acesso. Você pode redefini-lo excluindo o StudyLog em Ajustes do iPhone → Geral → Armazenamento do iPhone e reinstalando, mas todos os dados serão apagados. Certifique-se de lembrar seu código de acesso. Configurar o Face ID / Touch ID permite desbloquear sem inserir o código de acesso.",
      de: "Es gibt derzeit keine Reset-Funktion, wenn Sie Ihren Passcode vergessen. Sie können ihn zurücksetzen, indem Sie StudyLog unter iPhone-Einstellungen → Allgemein → iPhone-Speicher löschen und neu installieren, aber alle Daten werden dabei gelöscht. Bitte merken Sie sich unbedingt Ihren Passcode. Durch Einrichten von Face ID / Touch ID können Sie entsperren, ohne den Passcode einzugeben.",
    },
  },
  {
    question: {
      ja: "テーマカラーやダークモードの変更はできますか？",
      ko: "테마 색상이나 다크 모드를 변경할 수 있나요?",
      en: "Can I change the theme color or dark mode?",
      "zh-TW": "可以更改主題色或深色模式嗎？",
      zh: "可以更改主题色或深色模式吗？",
      ar: "هل يمكنني تغيير لون السمة أو الوضع الداكن؟",
      es: "¿Puedo cambiar el color de tema o el modo oscuro?",
      fr: "Puis-je changer la couleur du thème ou le mode sombre ?",
      pt: "Posso mudar a cor do tema ou o modo escuro?",
      de: "Kann ich die Themenfarbe oder den Dunkelmodus ändern?",
    },
    answer: {
      ja: "はい。設定画面の「外観」から変更できます。\n・テーマカラー: 好みのアクセントカラーを選択できます\n・ダークモード / ライトモード: トグルで切り替えられます\n・1日の目標時間: 「目標」から設定でき、記録画面に進捗が表示されます",
      ko: "네. 설정 화면의 「외관」에서 변경할 수 있습니다.\n・테마 색상: 원하는 액센트 색상을 선택할 수 있습니다\n・다크 모드 / 라이트 모드: 토글로 전환할 수 있습니다\n・1일 목표 시간: 「목표」에서 설정할 수 있으며, 기록 화면에 진행 상황이 표시됩니다",
      en: "Yes. You can change these from Appearance in the Settings screen.\n・Theme color: Choose your preferred accent color\n・Dark mode / Light mode: Toggle to switch\n・Daily study goal: Set from Goal, and progress is displayed on the Records screen",
      "zh-TW": "是的。可以從設定畫面的「外觀」中更改。\n・主題色：可選擇喜好的強調色\n・深色模式 / 淺色模式：切換開關即可\n・每日學習目標：從「目標」設定，進度會顯示在記錄畫面",
      zh: "是的。可以从设置界面的「外观」中更改。\n・主题色：可选择喜好的强调色\n・深色模式 / 浅色模式：切换开关即可\n・每日学习目标：从「目标」设置，进度会显示在记录界面",
      ar: "نعم. يمكنك تغيير ذلك من «المظهر» في شاشة الإعدادات.\n・لون السمة: اختر لون التمييز المفضل لديك\n・الوضع الداكن / الوضع الفاتح: بدّل بين الوضعين باستخدام المفتاح\n・هدف الدراسة اليومي: اضبطه من «الهدف»، وسيظهر التقدم في شاشة السجلات",
      es: "Sí. Puedes cambiarlos desde Apariencia en la pantalla de Ajustes.\n・Color de tema: Elige tu color de acento preferido\n・Modo oscuro / Modo claro: Alterna para cambiar\n・Objetivo de estudio diario: Configúralo desde Objetivo, y el progreso se muestra en la pantalla de Registros",
      fr: "Oui. Vous pouvez les modifier depuis Apparence dans l'écran Réglages.\n・Couleur du thème: Choisissez votre couleur d'accentuation préférée\n・Mode sombre / Mode clair: Basculer pour changer\n・Objectif d'étude quotidien: Configurez depuis Objectif, et la progression est affichée dans l'écran Enregistrements",
      pt: "Sim. Você pode alterá-los em Aparência na tela de Configurações.\n・Cor do tema: Escolha sua cor de destaque preferida\n・Modo escuro / Modo claro: Alternar para mudar\n・Meta de estudo diária: Configure em Meta, e o progresso é exibido na tela de Registros",
      de: "Ja. Sie können diese unter Erscheinungsbild im Einstellungsbildschirm ändern.\n・Themenfarbe: Wählen Sie Ihre bevorzugte Akzentfarbe\n・Dunkelmodus / Hellmodus: Umschalten zum Wechseln\n・Tägliches Lernziel: Unter Ziel einstellen, Fortschritt wird im Aufzeichnungsbildschirm angezeigt",
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
export default function StudyLogSupportPage() {
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
              alt="StudyLog"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">StudyLog</h1>
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
            href="/support/studelog/privacy"
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
          <p>&copy; {currentYear} StudyLog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
