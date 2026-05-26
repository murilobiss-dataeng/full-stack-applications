import { FACILITIES, REFERENCE_HOMES, type Facility } from "../data/facilities";
import { haversineKm } from "./distance";

export type FacilityWithDistances = Facility & {
  distances: Record<string, number>;
};

export function enrichFacilities(): FacilityWithDistances[] {
  return FACILITIES.map((facility) => {
    const distances: Record<string, number> = {};
    for (const ref of REFERENCE_HOMES) {
      distances[ref.id] = haversineKm(
        facility.lat,
        facility.lng,
        ref.lat,
        ref.lng
      );
    }
    return { ...facility, distances };
  }).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export const MAP_CENTER: [number, number] = [-25.43, -49.25];
