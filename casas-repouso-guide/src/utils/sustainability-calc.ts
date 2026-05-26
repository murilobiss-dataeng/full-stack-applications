import type { Facility } from "../data/facilities";
import { parseBrlRange } from "./money";

export type OccupancyType = "individual" | "casal";

export type CalculatorInputs = {
  principal: number;
  annualRatePct: number;
  taxOnReturnsPct: number;
  monthlySalary1: number;
  monthlySalary2: number;
  monthlyRentAtuba: number;
  monthlyHealthAndOther: number;
  monthlyRepouso: number;
};

export type TimelinePoint = {
  month: number;
  balance: number;
};

export type CalculatorResult = {
  months: number | null;
  infinite: boolean;
  monthlyGrossReturn: number;
  monthlyNetReturn: number;
  monthlyTax: number;
  monthlySalary1: number;
  monthlySalary2: number;
  monthlyRentAtuba: number;
  monthlySalaries: number;
  monthlyTotalInflow: number;
  monthlyExpenses: number;
  monthlyNetBurn: number;
  finalBalance: number;
  timeline: TimelinePoint[];
  warning?: string;
};

const MAX_MONTHS = 600;
const TIMELINE_CAP = 120;

export function getRepousoMonthly(
  facility: Facility | undefined,
  occupancy: OccupancyType,
  useConservative: boolean
): { value: number | null; label: string } {
  if (!facility) return { value: null, label: "" };

  const priceText =
    occupancy === "casal" ? facility.priceCouple : facility.priceSingle;
  const fallback =
    occupancy === "casal" ? facility.priceSingle : facility.priceCouple;

  const range = parseBrlRange(priceText) ?? parseBrlRange(fallback);
  if (!range) {
    return { value: null, label: facility.name };
  }

  const value = useConservative ? range.max : (range.min + range.max) / 2;
  return { value, label: facility.name };
}

export function simulateSustainability(
  inputs: CalculatorInputs
): CalculatorResult {
  const {
    principal,
    annualRatePct,
    taxOnReturnsPct,
    monthlySalary1,
    monthlySalary2,
    monthlyRentAtuba,
    monthlyHealthAndOther,
    monthlyRepouso,
  } = inputs;

  const monthlyExpenses = monthlyHealthAndOther + monthlyRepouso;
  const monthlySalaries =
    monthlySalary1 + monthlySalary2 + monthlyRentAtuba;

  const monthlyRate = annualRatePct / 100 / 12;
  const monthlyGrossReturn = principal * monthlyRate;
  const monthlyTax = monthlyGrossReturn * (taxOnReturnsPct / 100);
  const monthlyNetReturn = monthlyGrossReturn - monthlyTax;
  const monthlyTotalInflow = monthlyNetReturn + monthlySalaries;
  const monthlyNetBurn = monthlyExpenses - monthlyTotalInflow;

  const base = {
    monthlyGrossReturn,
    monthlyNetReturn,
    monthlyTax,
    monthlySalary1,
    monthlySalary2,
    monthlyRentAtuba,
    monthlySalaries,
    monthlyTotalInflow,
    monthlyExpenses,
    monthlyNetBurn,
  };

  const runSimulation = () => {
    const timeline: TimelinePoint[] = [{ month: 0, balance: principal }];
    let balance = principal;
    let months = 0;

    while (balance > 0 && months < MAX_MONTHS) {
      const grossReturn = balance * monthlyRate;
      const tax = grossReturn * (taxOnReturnsPct / 100);
      const netReturn = grossReturn - tax;
      balance = balance + netReturn + monthlySalaries - monthlyExpenses;
      months += 1;
      timeline.push({ month: months, balance: Math.max(0, balance) });
      if (balance <= 0) break;
    }

    return { timeline, months, finalBalance: Math.max(0, balance) };
  };

  if (principal <= 0 && monthlySalaries <= 0) {
    return {
      ...base,
      months: 0,
      infinite: false,
      finalBalance: 0,
      timeline: [{ month: 0, balance: 0 }],
      warning: "Informe o montante investido ou os salários.",
    };
  }

  if (monthlyExpenses <= 0) {
    return {
      ...base,
      months: null,
      infinite: true,
      finalBalance: principal,
      timeline: [{ month: 0, balance: principal }],
      warning: "Nenhuma despesa mensal informada.",
    };
  }

  if (monthlyNetBurn <= 0) {
    return {
      ...base,
      months: null,
      infinite: true,
      finalBalance: principal,
      timeline: [{ month: 0, balance: principal }],
    };
  }

  const { timeline, months, finalBalance } = runSimulation();

  if (months >= MAX_MONTHS && finalBalance > 0) {
    return {
      ...base,
      months: MAX_MONTHS,
      infinite: false,
      finalBalance,
      timeline: trimTimeline(timeline, TIMELINE_CAP),
      warning: `Projeção limitada a ${MAX_MONTHS} meses; o saldo ainda seria positivo.`,
    };
  }

  return {
    ...base,
    months,
    infinite: false,
    finalBalance,
    timeline: trimTimeline(timeline, TIMELINE_CAP),
  };
}

function trimTimeline(points: TimelinePoint[], maxPoints: number): TimelinePoint[] {
  if (points.length <= maxPoints) return points;
  const last = points[points.length - 1];
  const step = Math.ceil((points.length - 1) / (maxPoints - 2));
  const trimmed: TimelinePoint[] = [points[0]];
  for (let i = step; i < points.length - 1; i += step) {
    trimmed.push(points[i]);
  }
  if (trimmed[trimmed.length - 1]?.month !== last.month) {
    trimmed.push(last);
  }
  return trimmed;
}
