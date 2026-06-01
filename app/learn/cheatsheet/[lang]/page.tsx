import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const TRANSLATIONS = [
  {
    "langCode": "es",
    "langName": "Español",
    "heroTitle": "Chuleta de IA · la hoja única",
    "heroAccent": "Chuleta de IA",
    "verifyRuleTitle": "La regla de verificación · la única regla que importa",
    "verifyRuleBody": "La IA alucina con seguridad. Verifica siempre cualquier cita, cualquier consejo médico/legal/financiero, cualquier afirmación sobre actualidad, cualquier cálculo. Si equivocarse tiene coste real (auditoría, demanda, daño, dinero), busca la fuente tú mismo.",
    "neverPasteTitle": "Nunca pegues esto en IA en la nube",
    "neverPasteItems": [
      "Número de DNI/NIE, pasaporte, permiso de conducir",
      "Cuentas bancarias, tarjetas de crédito, IBAN/SWIFT",
      "Claves API, contraseñas, códigos de recuperación, claves SSH",
      "Nombres de pacientes + diagnósticos (datos sanitarios / LOPD)",
      "Nombres de clientes + hechos del caso (secreto profesional)",
      "PII de clientes, direcciones, teléfonos, correos electrónicos",
      "Secretos comerciales, producto sin anunciar, código bajo NDA",
      "Evaluaciones de desempeño / RRHH / expedientes de empleados"
    ],
    "promptStructureTitle": "El prompt de 7 partes",
    "promptStructureItems": [
      "ROL — «Eres un X senior que ha hecho esto 100 veces».",
      "CONTEXTO — cuál es la situación, qué sabes ya, cuál es la restricción.",
      "ENTRADA — pega el contenido real (borrador, código, datos, transcripción).",
      "TAREA — lo concreto que quieres conseguir. Sé exacto.",
      "FORMA — formato de salida: lista, tabla, prosa, JSON, extensión.",
      "AUDIENCIA — quién lee la salida. «Un consejo escéptico». «Un niño de 12 años».",
      "VOZ — «Sé directo. Sin la versión diplomática. Sin lenguaje corporativo»."
    ]
  },
  {
    "langCode": "fr",
    "langName": "Français",
    "heroTitle": "Antisèche IA · le récap d'une page",
    "heroAccent": "Antisèche IA",
    "verifyRuleTitle": "La règle de vérification · la seule qui compte",
    "verifyRuleBody": "L'IA hallucine avec aplomb. Vérifie toujours toute citation, tout conseil médical/juridique/financier, toute affirmation sur l'actualité, tout calcul. Si se tromper a un coût réel (audit, procès, préjudice, argent), va chercher la source toi-même.",
    "neverPasteTitle": "Ne jamais coller dans une IA cloud",
    "neverPasteItems": [
      "Numéro de sécurité sociale, passeport, permis de conduire",
      "Comptes bancaires, cartes de crédit, IBAN/RIB",
      "Clés API, mots de passe, codes de récupération, clés SSH",
      "Noms de patients + diagnostics (données de santé / RGPD)",
      "Noms de clients + faits du dossier (secret professionnel)",
      "PII clients, adresses, numéros de téléphone, e-mails",
      "Secrets industriels, produit non annoncé, code source sous NDA",
      "Évaluations / RH / dossiers du personnel"
    ],
    "promptStructureTitle": "Le prompt en 7 parties",
    "promptStructureItems": [
      "RÔLE — « Tu es un X senior qui a fait ça 100 fois. »",
      "CONTEXTE — quelle est la situation, ce que tu sais déjà, la contrainte.",
      "ENTRÉE — colle le contenu réel (brouillon, code, données, transcription).",
      "TÂCHE — la chose précise à accomplir. Sois exact.",
      "FORME — format de sortie : liste, tableau, prose, JSON, longueur.",
      "AUDIENCE — qui lit la sortie. « Un conseil sceptique. » « Un enfant de 12 ans. »",
      "TON — « Sois direct. Saute la version diplomatique. Pas de jargon corporate. »"
    ]
  },
  {
    "langCode": "pt",
    "langName": "Português",
    "heroTitle": "Cola de IA · a folha única",
    "heroAccent": "Cola de IA",
    "verifyRuleTitle": "A regra de verificação · a única regra que importa",
    "verifyRuleBody": "A IA alucina com confiança. Verifique sempre qualquer citação, qualquer conselho médico/jurídico/financeiro, qualquer afirmação sobre o noticiário, qualquer conta. Se errar tem custo real (auditoria, processo, dano, dinheiro), busque a fonte você mesmo.",
    "neverPasteTitle": "Nunca cole em IA na nuvem",
    "neverPasteItems": [
      "CPF, RG, passaporte, carteira de motorista",
      "Contas bancárias, cartões de crédito, chave Pix, dados bancários",
      "Chaves de API, senhas, códigos de recuperação, chaves SSH",
      "Nomes de pacientes + diagnósticos (dados de saúde / LGPD)",
      "Nomes de clientes + fatos do caso (sigilo profissional)",
      "Dados pessoais de clientes, endereços, telefones, e-mails",
      "Segredos comerciais, produto não anunciado, código sob NDA",
      "Avaliações de desempenho / RH / fichas de funcionário"
    ],
    "promptStructureTitle": "O prompt de 7 partes",
    "promptStructureItems": [
      "PAPEL — «Você é um X sênior que já fez isso 100 vezes.»",
      "CONTEXTO — qual é a situação, o que você já sabe, qual é a restrição.",
      "ENTRADA — cole o conteúdo real (rascunho, código, dados, transcrição).",
      "TAREFA — a coisa específica que você quer feita. Seja exato.",
      "FORMA — formato de saída: lista, tabela, prosa, JSON, extensão.",
      "PÚBLICO — quem lê a saída. «Um conselho cético.» «Uma criança de 12 anos.»",
      "VOZ — «Seja direto. Pule a versão diplomática. Nada de linguagem corporativa.»"
    ]
  },
  {
    "langCode": "hi",
    "langName": "हिन्दी",
    "heroTitle": "AI चीटशीट · एक-पन्ने का सार",
    "heroAccent": "AI चीटशीट",
    "verifyRuleTitle": "सत्यापन का नियम · एकमात्र नियम जो मायने रखता है",
    "verifyRuleBody": "AI पूरे आत्मविश्वास के साथ झूठ गढ़ता है। हर उद्धरण, हर चिकित्सकीय/कानूनी/वित्तीय सलाह, मौजूदा घटनाओं का हर दावा, हर गणित — हमेशा खुद जाँचो। अगर ग़लत होने की कीमत असली है (ऑडिट, मुक़दमा, नुक़सान, पैसा), तो स्रोत खुद निकालो।",
    "neverPasteTitle": "क्लाउड AI में कभी पेस्ट न करें",
    "neverPasteItems": [
      "आधार नंबर, PAN, पासपोर्ट, ड्राइविंग लाइसेंस",
      "बैंक खाते, क्रेडिट कार्ड, IFSC, UPI ID",
      "API कुंजियाँ, पासवर्ड, रिकवरी कोड, SSH कुंजियाँ",
      "मरीज़ के नाम + निदान (स्वास्थ्य डेटा / गोपनीयता)",
      "क्लाइंट के नाम + केस के तथ्य (विशेषाधिकार प्राप्त सूचना)",
      "ग्राहक की निजी जानकारी, पते, फ़ोन नंबर, ईमेल",
      "व्यापारिक रहस्य, अघोषित उत्पाद, NDA के तहत सोर्स कोड",
      "कर्मचारी मूल्यांकन / HR / कार्मिक रिकॉर्ड"
    ],
    "promptStructureTitle": "7-हिस्सों वाला प्रॉम्प्ट",
    "promptStructureItems": [
      "भूमिका — «तुम एक वरिष्ठ X हो जिसने यह 100 बार किया है।»",
      "संदर्भ — स्थिति क्या है, तुम्हें पहले से क्या पता है, बाधा क्या है।",
      "इनपुट — असली सामग्री चिपकाओ (मसौदा, कोड, डेटा, ट्रांसक्रिप्ट)।",
      "कार्य — वह ठोस चीज़ जो तुम कराना चाहते हो। सटीक रहो।",
      "स्वरूप — आउटपुट का प्रारूप: सूची, तालिका, गद्य, JSON, लंबाई।",
      "पाठक — आउटपुट कौन पढ़ेगा। «एक संदेहास्पद बोर्ड।» «एक 12 साल का बच्चा।»",
      "लहज़ा — «सीधी बात करो। कूटनीतिक संस्करण छोड़ो। कोई कॉर्पोरेट भाषा नहीं।»"
    ]
  },
  {
    "langCode": "zh",
    "langName": "简体中文",
    "heroTitle": "AI 速查表 · 一页搞定",
    "heroAccent": "AI 速查表",
    "verifyRuleTitle": "核实法则 · 唯一重要的法则",
    "verifyRuleBody": "AI 会自信满满地胡编乱造。任何引用、任何医疗/法律/财务建议、任何关于时事的说法、任何一道数学题——永远要自己核实一遍。如果犯错的代价是真实的(审计、官司、伤害、钱),就亲自把原始出处找出来。",
    "neverPasteTitle": "切勿粘贴进云端 AI",
    "neverPasteItems": [
      "身份证号、护照号、驾驶证号",
      "银行账户、信用卡、支付账号、卡号",
      "API 密钥、密码、恢复码、SSH 密钥",
      "患者姓名 + 诊断信息(个人健康信息 / 数据合规)",
      "客户姓名 + 案件事实(职业保密义务)",
      "客户个人信息、住址、电话、邮箱",
      "商业机密、未发布产品、保密协议下的源代码",
      "员工绩效 / 人力资源 / 人事档案"
    ],
    "promptStructureTitle": "七段式提示词",
    "promptStructureItems": [
      "角色 — 「你是一位做过这件事 100 次的资深 X。」",
      "上下文 — 当前是什么情况、你已经知道什么、限制条件是什么。",
      "输入 — 粘贴真实内容(草稿、代码、数据、对话记录)。",
      "任务 — 你想完成的具体那件事。要精确。",
      "形式 — 输出格式:列表、表格、散文、JSON、长度。",
      "受众 — 谁来看这份输出。「一群挑剔的董事会成员。」「一个 12 岁的孩子。」",
      "语气 — 「直接讲。跳过外交辞令。不要官话套话。」"
    ]
  },
  {
    "langCode": "ar",
    "langName": "العربية",
    "heroTitle": "ورقة AI المرجعية · الصفحة الواحدة",
    "heroAccent": "ورقة AI المرجعية",
    "verifyRuleTitle": "قاعدة التحقق · القاعدة الوحيدة التي تهم",
    "verifyRuleBody": "الذكاء الاصطناعي يهلوس بثقة تامة. تحقق دائمًا من أي اقتباس، وأي نصيحة طبية أو قانونية أو مالية، وأي ادعاء عن الأحداث الجارية، وأي عملية حسابية. إذا كانت تكلفة الخطأ حقيقية (تدقيق، دعوى قضائية، ضرر، مال)، فاستخرج المصدر بنفسك.",
    "neverPasteTitle": "لا تلصق هذا أبدًا في الذكاء الاصطناعي السحابي",
    "neverPasteItems": [
      "رقم الهوية الوطنية، جواز السفر، رخصة القيادة",
      "حسابات بنكية، بطاقات ائتمان، أرقام IBAN",
      "مفاتيح API، كلمات المرور، رموز الاسترداد، مفاتيح SSH",
      "أسماء المرضى + التشخيصات (بيانات صحية / خصوصية)",
      "أسماء الموكّلين + وقائع القضية (سر مهني)",
      "بيانات العملاء الشخصية، العناوين، أرقام الهواتف، البريد الإلكتروني",
      "أسرار تجارية، منتج غير معلن، كود مصدر تحت اتفاقية سرية",
      "تقييمات الأداء / الموارد البشرية / ملفات الموظفين"
    ],
    "promptStructureTitle": "البرومبت من 7 أجزاء",
    "promptStructureItems": [
      "الدور — «أنت X خبير قام بهذا 100 مرة».",
      "السياق — ما هو الوضع، ما الذي تعرفه بالفعل، ما هو القيد.",
      "المُدخَل — الصق المحتوى الفعلي (مسودة، كود، بيانات، نص محادثة).",
      "المهمة — الشيء المحدد الذي تريد إنجازه. كن دقيقًا.",
      "الشكل — صيغة الإخراج: قائمة، جدول، نص، JSON، الطول.",
      "الجمهور — مَن يقرأ الإخراج. «مجلس إدارة متشكك». «طفل في الثانية عشرة».",
      "الأسلوب — «كن مباشرًا. تجاوز النسخة الدبلوماسية. لا لغة شركات»."
    ]
  }
] as const;

type TParam = { lang: string };

export async function generateStaticParams() {
  return TRANSLATIONS.map((t) => ({ lang: t.langCode }));
}

export async function generateMetadata({ params }: { params: Promise<TParam> }): Promise<Metadata> {
  const { lang } = await params;
  const t = TRANSLATIONS.find((x) => x.langCode === lang);
  if (!t) return { title: "Cheatsheet · AtomEons" };
  return {
    title: `${t.heroTitle} · /learn · AtomEons`,
    description: `${t.verifyRuleBody.slice(0, 200)}`,
    alternates: { canonical: `https://atomeons.com/learn/cheatsheet/${t.langCode}` },
  };
}

export default async function CheatsheetLangPage({ params }: { params: Promise<TParam> }) {
  const { lang } = await params;
  const t = TRANSLATIONS.find((x) => x.langCode === lang);
  if (!t) notFound();
  const isRTL = t.langCode === "ar";
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cheatsheet" className="hover:text-[#22F0D5]">Cheatsheet</Link>{" "}
          <span className="text-[#1A2225]">/</span> {t.langName}
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::AtomEons · {t.langName} · CC-BY 4.0</p>
          <h1 className="mt-6 text-balance text-3xl font-medium tracking-tight md:text-4xl">{t.heroTitle}</h1>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-3xl px-6 py-12 space-y-6">
          <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/40 p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">{t.verifyRuleTitle}</p>
            <p className="mt-3 text-[15px] leading-[1.65] text-[#C8CCCE] md:text-base">{t.verifyRuleBody}</p>
          </div>
          <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/40 p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">{t.neverPasteTitle}</p>
            <ul className="mt-4 space-y-2 text-[14px] leading-[1.6]">
              {t.neverPasteItems.map((item, i) => (
                <li key={i} className="text-[#C8CCCE]">○ {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#0E1418] p-6 md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">{t.promptStructureTitle}</p>
            <ol className="mt-4 space-y-2 text-[14px] leading-[1.6]">
              {t.promptStructureItems.map((item, i) => (
                <li key={i} className="text-[#C8CCCE]"><strong className="text-[#22F0D5]">{i + 1}.</strong> {item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-3xl px-6 py-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">::other languages</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {TRANSLATIONS.map((tt) => (
              <Link
                key={tt.langCode}
                href={`/learn/cheatsheet/${tt.langCode}`}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] ${tt.langCode === t.langCode ? "border-[#22F0D5] bg-[#22F0D5]/10 text-[#22F0D5]" : "border-[#1A2225] bg-[#0A0F11] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"}`}
              >
                {tt.langName}
              </Link>
            ))}
            <Link href="/learn/cheatsheet" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              English
            </Link>
          </div>
          <div className="mt-8">
            <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
