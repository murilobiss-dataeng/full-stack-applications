import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Building2, Heart, Home, MapPin, RotateCcw } from "lucide-react";
import { REFERENCE_HOMES } from "./data/facilities";
import { FacilityList } from "./components/FacilityList";
import { FacilityDetailPanel } from "./components/FacilityDetailPanel";
import { RepousoMap } from "./components/RepousoMap";
import { SustainabilityCalculator } from "./components/SustainabilityCalculator";
import { enrichFacilities } from "./utils/facility-metrics";

export default function App() {
  const facilities = useMemo(() => enrichFacilities(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightRefId, setHighlightRefId] = useState<string | null>(null);
  const [mapResetKey, setMapResetKey] = useState(0);

  const selected = facilities.find((f) => f.id === selectedId) ?? null;
  const detailRef = useRef<HTMLDivElement>(null);

  const resetMapView = () => {
    setMapResetKey((k) => k + 1);
  };

  const handleSelect = (id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
      resetMapView();
      return;
    }
    setSelectedId(id);
  };

  const handleReset = () => {
    setSelectedId(null);
    setHighlightRefId(null);
    resetMapView();
  };

  useEffect(() => {
    if (selectedId && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  return (
    <div className="app">
      <div className="page-bg" aria-hidden="true" />

      <header className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow">
            <Heart size={15} aria-hidden />
            Curitiba e Grande Curitiba
          </p>
          <h1>
            Guia de <em>Casas de Repouso</em>
          </h1>
          <p className="hero-lead">
            Mapa à esquerda, lista à direita — clique em uma casa para ver todos
            os detalhes abaixo.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <Building2 size={20} aria-hidden />
              <span>
                <strong>{facilities.length}</strong> casas
              </span>
            </div>
            <div className="hero-stat">
              <Home size={20} aria-hidden />
              <span>
                <strong>3</strong> referências
              </span>
            </div>
            <div className="hero-stat">
              <MapPin size={20} aria-hidden />
              <span>
                <strong>Mapa</strong> interativo
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="main-wrap">
        <section className="refs-section panel">
          <div className="section-head">
            <span className="section-icon" aria-hidden>
              <Home size={18} />
            </span>
            <div>
              <h2>Referências</h2>
              <p className="section-desc">Gislaine · Crislaine · Túlio</p>
            </div>
          </div>
          <div className="ref-cards">
            {REFERENCE_HOMES.map((ref) => (
              <button
                key={ref.id}
                type="button"
                className={`ref-card ${highlightRefId === ref.id ? "active" : ""}`}
                style={{ "--ref-color": ref.color } as CSSProperties}
                onClick={() =>
                  setHighlightRefId((prev) => (prev === ref.id ? null : ref.id))
                }
              >
                <span className="ref-dot" />
                <div className="ref-card-body">
                  <strong>{ref.label}</strong>
                  <span>{ref.address}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <main className="workspace">
          <div className="workspace-split panel">
            <section className="map-column" aria-label="Mapa">
              <div className="map-column-header">
                <h2 className="column-title">Mapa</h2>
                <button
                  type="button"
                  className="map-reset-btn"
                  onClick={handleReset}
                  title="Limpar seleção e restaurar o mapa"
                >
                  <RotateCcw size={15} aria-hidden />
                  <span>Resetar</span>
                </button>
              </div>
              <RepousoMap
                facilities={facilities}
                selectedId={selectedId}
                highlightRefId={highlightRefId}
                mapResetKey={mapResetKey}
                onSelect={handleSelect}
              />
            </section>

            <section className="list-column" aria-label="Lista de casas">
              <h2 className="column-title">
                Casas
                <span className="column-count">{facilities.length}</span>
              </h2>
              <FacilityList
                facilities={facilities}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </section>
          </div>

          {selected && (
            <div ref={detailRef}>
              <FacilityDetailPanel
                facility={selected}
                onClose={() => setSelectedId(null)}
              />
            </div>
          )}
        </main>

        <SustainabilityCalculator facilities={facilities} />
      </div>
    </div>
  );
}
