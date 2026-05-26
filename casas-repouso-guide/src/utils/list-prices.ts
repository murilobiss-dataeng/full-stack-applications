import type { Facility } from "../data/facilities";

/** Resumo curto de preços para a lista lateral. */
export function formatListPrices(f: Facility): string | null {
  const parts: string[] = [];
  if (f.priceSingle) parts.push(f.priceSingle);
  if (f.priceCouple) parts.push(`casal ${f.priceCouple}`);
  return parts.length > 0 ? parts.join(" · ") : null;
}
