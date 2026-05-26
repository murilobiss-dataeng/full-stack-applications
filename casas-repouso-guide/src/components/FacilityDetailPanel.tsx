import { ExternalLink, MapPin, Phone, X } from "lucide-react";
import {
  formatPhoneDisplay,
  googleMapsDirectionsUrl,
} from "../utils/distance";
import type { FacilityWithDistances } from "../utils/facility-metrics";
import { DistanceGrid } from "./DistanceGrid";
import { WhatsAppButton } from "./WhatsAppButton";

type Props = {
  facility: FacilityWithDistances;
  onClose: () => void;
};

export function FacilityDetailPanel({ facility, onClose }: Props) {
  return (
    <section className="detail-panel" aria-label={`Detalhes — ${facility.name}`}>
      <div className="detail-panel-inner">
        <button
          type="button"
          className="detail-panel-close"
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          <X size={22} />
        </button>

        <header className="detail-panel-header">
          <h2>{facility.name}</h2>
          <div className="detail-panel-actions">
            <WhatsAppButton
              phone={facility.phone}
              facilityName={facility.name}
              variant="button"
            />
            <a
              href={googleMapsDirectionsUrl(facility.lat, facility.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-maps-btn"
            >
              <ExternalLink size={18} aria-hidden />
              Como chegar
            </a>
          </div>
        </header>

        <div className="detail-panel-grid">
          <div className="detail-block">
            <h3>
              <MapPin size={18} aria-hidden />
              Endereço
            </h3>
            <p>{facility.address}</p>
          </div>

          <div className="detail-block">
            <h3>
              <Phone size={18} aria-hidden />
              Telefone
            </h3>
            <p className="detail-phone">{formatPhoneDisplay(facility.phone)}</p>
          </div>

          <div className="detail-block">
            <h3>Preço por pessoa</h3>
            <p className="detail-price">{facility.priceSingle ?? "Não informado"}</p>
          </div>

          <div className="detail-block">
            <h3>Preço para casal</h3>
            <p className="detail-price">{facility.priceCouple ?? "Não informado"}</p>
          </div>
        </div>

        <div className="detail-distances-block">
          <h3>Distâncias em linha reta</h3>
          <p className="detail-distances-hint">
            Até os lares de referência da família (Gislaine, Crislaine e Túlio)
          </p>
          <DistanceGrid distances={facility.distances} />
        </div>
      </div>
    </section>
  );
}
