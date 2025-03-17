
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { LocationData } from './types';
import { drcRegions } from './constants';

interface MapControllerProps {
  locations: LocationData[];
  fitBounds: boolean;
  region?: keyof typeof drcRegions;
}

const MapController: React.FC<MapControllerProps> = ({ locations, fitBounds, region }) => {
  const map = useMap();
  
  useEffect(() => {
    if (region && drcRegions[region]) {
      map.setView(
        [drcRegions[region].center[0], drcRegions[region].center[1]] as [number, number],
        drcRegions[region].zoom
      );
    }
    else if (fitBounds && locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.coordinates[1], loc.coordinates[0]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, locations, fitBounds, region]);
  
  return null;
};

export default MapController;
