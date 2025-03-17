
// Map component types and interfaces
export interface LocationData {
  name: string;
  coordinates: [number, number];
  description?: string;
}

export interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  locationData?: LocationData[];
  onLocationsUpdate?: (locations: LocationData[]) => void;
}

// DRC region data structure
export interface RegionData {
  center: [number, number];
  zoom: number;
  label: string;
  polygon: number[][];
  funding: number;
  programs: string[];
  connections: number;
}

export interface DrcRegions {
  [key: string]: RegionData;
}
