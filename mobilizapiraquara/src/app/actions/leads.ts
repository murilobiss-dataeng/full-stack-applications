"use server";

import { joinSchema, type JoinInput } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { SOCIAL_LINKS } from "@/lib/constants";

export async function submitJoinForm(data: JoinInput) {
  const parsed = joinSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  const { fullName, whatsapp } = parsed.data;

  try {
    if (process.env.DATABASE_URL) {
      await prisma.lead.create({ data: { fullName, whatsapp } });
    }
  } catch {
    // fallback: abre WhatsApp com mensagem pré-preenchida
    return {
      success: true,
      redirect: `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
        `Olá! Me chamo ${fullName} e quero saber mais sobre o Mobiliza Piraquara. Meu WhatsApp: ${whatsapp}`
      )}`,
    };
  }

  return { success: true };
}
