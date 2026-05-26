import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FACILITIES, REFERENCE_HOMES } from "../data/facilities";
import { formatPhoneDisplay, googleMapsDirectionsUrl } from "../utils/distance";
import { MAP_CENTER, MAP_DEFAULT_ZOOM } from "../utils/facility-metrics";
import type { FacilityWithDistances } from "../utils/facility-metrics";
import { DistanceGrid } from "./DistanceGrid";
import { WhatsAppButton } from "./WhatsAppButton";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function refIcon(color: string) {
  return L.divIcon({
    className: "ref-marker",
    html: `<span style="background:${color}"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

const facilityIcon = L.divIcon({
  className: "facility-marker",
  html: `<span></span>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

type Props = {
  facilities: FacilityWithDistances[];
  selectedId: string | null;
  highlightRefId: string | null;
  mapResetKey: number;
  onSelect: (id: string) => void;
};

function MapController({
  selectedId,
  facilities,
  mapResetKey,
}: {
  selectedId: string | null;
  facilities: FacilityWithDistances[];
  mapResetKey: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const facility = facilities.find((f) => f.id === selectedId);
    if (facility) {
      map.flyTo([facility.lat, facility.lng], 14, { duration: 0.8 });
    }
  }, [selectedId, facilities, map]);

  useEffect(() => {
    map.flyTo(MAP_CENTER, MAP_DEFAULT_ZOOM, { duration: 0.8 });
  }, [mapResetKey, map]);

  return null;
}

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const fix = () => {
      map.invalidateSize({ animate: false });
    };
    fix();
    const t = window.setTimeout(fix, 150);
    window.addEventListener("resize", fix);
    window.addEventListener("orientationchange", fix);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", fix);
      window.removeEventListener("orientationchange", fix);
    };
  }, [map]);

  return null;
}

export function RepousoMap({
  facilities,
  selectedId,
  highlightRefId,
  mapResetKey,
  onSelect,
}: Props) {
  const selected = facilities.find((f) => f.id === selectedId);
  const activeRef = highlightRefId
    ? REFERENCE_HOMES.find((r) => r.id === highlightRefId)
    : null;

  const connectionLine = useMemo(() => {
    if (!selected || !activeRef) return null;
    return [
      [activeRef.lat, activeRef.lng] as [number, number],
      [selected.lat, selected.lng] as [number, number],
    ];
  }, [selected, activeRef]);

  return (
    <div className="map-shell">
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_DEFAULT_ZOOM}
        scrollWheelZoom
        className="repouso-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizeHandler />
        <MapController
          selectedId={selectedId}
          facilities={facilities}
          mapResetKey={mapResetKey}
        />

        {REFERENCE_HOMES.map((ref) => (
          <Marker
            key={ref.id}
            position={[ref.lat, ref.lng]}
            icon={refIcon(ref.color)}
          >
            <Popup>
              <strong>{ref.label}</strong>
              <p className="popup-address">{ref.address}</p>
            </Popup>
          </Marker>
        ))}

        {FACILITIES.map((f) => {
          const enriched = facilities.find((x) => x.id === f.id)!;
          return (
            <Marker
              key={f.id}
              position={[f.lat, f.lng]}
              icon={facilityIcon}
              eventHandlers={{
                click: () => onSelect(f.id),
              }}
              opacity={selectedId && selectedId !== f.id ? 0.55 : 1}
            >
              <Popup>
                <strong>{f.name}</strong>
                <p className="popup-address">{f.address}</p>
                <p className="popup-phone">{formatPhoneDisplay(f.phone)}</p>
                <div className="popup-distances">
                  <p className="popup-dist-title">Distâncias</p>
                  <DistanceGrid distances={enriched.distances} compact />
                </div>
                <div className="popup-actions">
                  <WhatsAppButton phone={f.phone} facilityName={f.name} variant="button" />
                  <a
                    href={googleMapsDirectionsUrl(f.lat, f.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="maps-link"
                  >
                    Como chegar
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {connectionLine && (
          <Polyline
            positions={connectionLine}
            pathOptions={{ color: "#2a6b5e", weight: 3, dashArray: "8 6" }}
          />
        )}
      </MapContainer>

      <div className="map-legend">
        <span className="legend-title">Referência familiar</span>
        {REFERENCE_HOMES.map((ref) => (
          <span key={ref.id} className="legend-item">
            <i style={{ background: ref.color }} />
            {ref.shortLabel}
          </span>
        ))}
        <span className="legend-item legend-facility">
          <i className="dot-facility" />
          Casa de repouso
        </span>
      </div>
    </div>
  );
}
