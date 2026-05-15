/** Imagens padrão por categoria quando a matéria não tem capa. */
const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  politica: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80&auto=format&fit=crop",
  saude: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop",
  seguranca: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&auto=format&fit=crop",
  educacao: "https://images.unsplash.com/photo-1503676260728-1c00da280a02?w=1200&q=80&auto=format&fit=crop",
  "mobilidade-urbana": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80&auto=format&fit=crop",
  "causa-animal": "https://images.unsplash.com/photo-1450778869188-41d0601e46e5?w=1200&q=80&auto=format&fit=crop",
};

const DEFAULT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop";

export function resolveCoverImage(
  coverImage: string | null | undefined,
  categorySlug?: string | null
): string {
  if (coverImage?.trim()) return coverImage;
  if (categorySlug && CATEGORY_PLACEHOLDERS[categorySlug]) {
    return CATEGORY_PLACEHOLDERS[categorySlug];
  }
  return DEFAULT_PLACEHOLDER;
}
