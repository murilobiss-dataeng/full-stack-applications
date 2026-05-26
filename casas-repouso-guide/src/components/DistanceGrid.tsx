import { REFERENCE_HOMES } from "../data/facilities";
import { formatKm } from "../utils/distance";

type Props = {
  distances: Record<string, number>;
  compact?: boolean;
};

export function DistanceGrid({ distances, compact = false }: Props) {
  return (
    <div className={`distance-grid ${compact ? "distance-grid--compact" : ""}`}>
      {REFERENCE_HOMES.map((ref) => (
        <div key={ref.id} className="distance-chip">
          <span className="distance-chip-dot" style={{ background: ref.color }} />
          <span className="distance-chip-label">{ref.shortLabel}</span>
          <span className="distance-chip-value">{formatKm(distances[ref.id])}</span>
        </div>
      ))}
    </div>
  );
}
