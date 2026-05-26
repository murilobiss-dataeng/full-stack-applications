import type { TimelinePoint } from "../utils/sustainability-calc";
import { formatBrl, formatDuration } from "../utils/money";

type Props = {
  months: number | null;
  infinite: boolean;
  timeline: TimelinePoint[];
  initialBalance: number;
};

export function SimulatorTimeline({
  months,
  infinite,
  timeline,
  initialBalance,
}: Props) {
  if (infinite) {
    return (
      <div className="sim-timeline sim-timeline--ok">
        <p className="sim-timeline-months">Sem prazo definido</p>
        <p className="sim-timeline-hint">
          As entradas mensais cobrem as despesas — o patrimônio não precisa ser
          usado.
        </p>
        <div className="sim-timeline-track sim-timeline-track--full" aria-hidden />
      </div>
    );
  }

  const totalMonths = months ?? 0;
  if (totalMonths <= 0) {
    return null;
  }

  const lastMonth = Math.max(totalMonths, timeline[timeline.length - 1]?.month ?? 1);
  const ticks = buildTicks(lastMonth);

  return (
    <div className="sim-timeline">
      <p className="sim-timeline-months">
        <strong>{totalMonths}</strong> {totalMonths === 1 ? "mês" : "meses"}
        <span className="sim-timeline-duration">
          ({formatDuration(totalMonths)})
        </span>
      </p>

      <div
        className="sim-timeline-track"
        role="img"
        aria-label={`Linha do tempo de ${totalMonths} meses até o patrimônio se esgotar`}
      >
        <div className="sim-timeline-fill" />
        {ticks.map((t) => (
          <span
            key={t}
            className="sim-timeline-marker"
            style={{ left: `${(t / lastMonth) * 100}%` }}
          >
            <i />
            <em>{formatTimelineMonth(t)}</em>
          </span>
        ))}
        <span className="sim-timeline-end" style={{ left: "100%" }}>
          <i />
          <em>{formatTimelineMonth(lastMonth)}</em>
        </span>
      </div>

      <div className="sim-timeline-labels">
        <span>{formatBrl(initialBalance)}</span>
        <span>0</span>
      </div>
    </div>
  );
}

function formatTimelineMonth(month: number): string {
  if (month % 12 === 0 && month >= 12) {
    const years = month / 12;
    return years === 1 ? "1 ano" : `${years} anos`;
  }
  return `${month} ${month === 1 ? "mês" : "meses"}`;
}

function buildTicks(lastMonth: number): number[] {
  if (lastMonth <= 12) {
    return Array.from({ length: lastMonth }, (_, i) => i + 1).filter(
      (m) => m < lastMonth
    );
  }
  const step = lastMonth <= 36 ? 6 : lastMonth <= 72 ? 12 : 24;
  const ticks: number[] = [];
  for (let m = step; m < lastMonth; m += step) {
    ticks.push(m);
  }
  return ticks.slice(0, 8);
}
