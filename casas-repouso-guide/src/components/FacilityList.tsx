import { MapPin } from "lucide-react";
import { REFERENCE_HOMES } from "../data/facilities";
import { formatKm } from "../utils/distance";
import { formatListPrices } from "../utils/list-prices";
import type { FacilityWithDistances } from "../utils/facility-metrics";

type Props = {
  facilities: FacilityWithDistances[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function FacilityList({ facilities, selectedId, onSelect }: Props) {
  return (
    <ul className="facility-list" role="listbox" aria-label="Casas de repouso">
      {facilities.map((f) => {
        const isSelected = selectedId === f.id;
        const prices = formatListPrices(f);
        return (
          <li key={f.id} role="option" aria-selected={isSelected}>
            <button
              type="button"
              className={`facility-list-item ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(f.id)}
            >
              <span className="facility-list-top">
                <span className="facility-list-name">{f.name}</span>
                {prices && (
                  <span className="facility-list-prices" title={prices}>
                    {prices}
                  </span>
                )}
              </span>
              <span className="facility-list-address">
                <MapPin size={12} aria-hidden />
                {f.address.split("—")[0].trim()}
              </span>
              <span className="facility-list-dists">
                {REFERENCE_HOMES.map((ref) => (
                  <span
                    key={ref.id}
                    className="facility-list-dist"
                    title={`Até ${ref.shortLabel}`}
                  >
                    <i style={{ background: ref.color }} />
                    {formatKm(f.distances[ref.id])}
                  </span>
                ))}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
