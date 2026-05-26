import type { Facility } from "../data/facilities";
import { formatBrl, parseBrlRange } from "./money";

function pickAmount(
  range: { min: number; max: number },
  conservative: boolean
): number {
  return conservative ? range.max : (range.min + range.max) / 2;
}

export function getSingleMonthly(
  facility: Facility,
  conservative = false
): number | null {
  const single = parseBrlRange(facility.priceSingle);
  return single ? pickAmount(single, conservative) : null;
}

/**
 * Mensalidade casal para 2 moradores.
 * Se individual e casal forem iguais → individual × 2.
 * Se casal for menor que individual → preço casal da tabela (ex.: desconto).
 * Se casal for maior → valor casal da tabela (ex.: regra própria da casa).
 */
export function getCoupleMonthly(
  facility: Facility,
  conservative = false
): number | null {
  const single = parseBrlRange(facility.priceSingle);
  const couple = parseBrlRange(facility.priceCouple);

  if (single && couple) {
    const s = pickAmount(single, conservative);
    const c = pickAmount(couple, conservative);
    if (c < s) return c;
    if (c === s) return s * 2;
    return c;
  }
  if (couple) return pickAmount(couple, conservative);
  if (single) return pickAmount(single, conservative) * 2;
  return null;
}

export function formatListPrices(facility: Facility): string | null {
  const parts: string[] = [];
  const single = getSingleMonthly(facility);
  const couple = getCoupleMonthly(facility);

  if (single != null) parts.push(formatBrl(single));
  if (couple != null) parts.push(`casal ${formatBrl(couple)}`);

  return parts.length > 0 ? parts.join(" · ") : null;
}
