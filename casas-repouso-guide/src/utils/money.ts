/** Extrai valores em reais (formato BR: 6.200 = 6200). */
export function parseBrlValues(text: string): number[] {
  const matches = text.match(/\d{1,3}(?:\.\d{3})+|\d+/g) ?? [];
  return matches.map((part) => Number(part.replace(/\./g, "")));
}

export function parseBrlRange(text?: string): { min: number; max: number } | null {
  if (!text?.trim()) return null;
  const values = parseBrlValues(text);
  if (values.length === 0) return null;
  return { min: Math.min(...values), max: Math.max(...values) };
}

export function formatBrl(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatDuration(months: number): string {
  if (!Number.isFinite(months) || months <= 0) return "—";
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem} ${rem === 1 ? "mês" : "meses"}`;
  if (rem === 0) return `${years} ${years === 1 ? "ano" : "anos"}`;
  return `${years} ${years === 1 ? "ano" : "anos"} e ${rem} ${rem === 1 ? "mês" : "meses"}`;
}
