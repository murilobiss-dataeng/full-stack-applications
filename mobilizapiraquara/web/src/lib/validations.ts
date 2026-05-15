import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

/** Login da área /publique (usuário + senha). */
export const publishLoginSchema = z.object({
  username: z.string().min(1, "Informe o usuário"),
  password: z.string().min(1, "Informe a senha"),
});

export const joinSchema = z.object({
  fullName: z
    .string()
    .min(3, "Informe nome e sobrenome")
    .max(120, "Nome muito longo")
    .regex(/\s+\S+/, "Informe nome e sobrenome completos"),
  whatsapp: z
    .string()
    .min(10, "WhatsApp inválido")
    .max(20, "WhatsApp inválido")
    .regex(/^[\d\s()+-]+$/, "Use apenas números e símbolos de telefone"),
});

export const postDraftSchema = z.object({
  title: z.string().optional(),
  rawText: z.string().min(50, "O texto deve ter pelo menos 50 caracteres"),
  categoryId: z.string().optional(),
  featured: z.boolean().optional(),
});

export const postUpdateSchema = z.object({
  title: z.string().min(5),
  subtitle: z.string().optional(),
  content: z.string().min(20),
  excerpt: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  featured: z.boolean(),
  published: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type PublishLoginInput = z.infer<typeof publishLoginSchema>;
export type JoinInput = z.infer<typeof joinSchema>;
export type PostDraftInput = z.infer<typeof postDraftSchema>;
