import OpenAI from "openai";

export type FormattedArticle = {
  title: string;
  subtitle: string;
  contentHtml: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
};

const SYSTEM_PROMPT = `Você é um editor jornalístico brasileiro especializado em notícias locais.
Sua tarefa é formatar textos brutos para publicação em um portal de notícias de Piraquara, PR.

REGRAS OBRIGATÓRIAS:
- Corrija gramática e pontuação em português brasileiro
- Organize parágrafos com clareza jornalística
- Melhore legibilidade sem alterar fatos
- NÃO invente informações, números, nomes ou citações
- NÃO adicione opinião editorial não presente no texto original
- Remova repetições desnecessárias
- Mantenho o contexto e sentido original
- Retorne APENAS JSON válido no formato especificado`;

export async function formatArticleWithAI(
  rawText: string,
  optionalTitle?: string
): Promise<FormattedArticle> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não configurada");
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const userPrompt = optionalTitle
    ? `Título sugerido pelo autor: "${optionalTitle}"\n\nTexto bruto:\n${rawText}`
    : `Texto bruto:\n${rawText}`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `${userPrompt}

Retorne JSON com exatamente estas chaves:
{
  "title": "título final",
  "subtitle": "subtítulo/linha fina",
  "contentHtml": "corpo em HTML com tags <p>, <h2>, <strong> quando apropriado",
  "excerpt": "resumo de até 160 caracteres",
  "seoTitle": "título SEO até 60 caracteres",
  "seoDescription": "meta description até 155 caracteres"
}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Resposta vazia da OpenAI");

  const parsed = JSON.parse(content) as FormattedArticle;

  if (!parsed.title || !parsed.contentHtml) {
    throw new Error("Formato de resposta inválido da IA");
  }

  return parsed;
}
