
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip } from 'react-leaflet';
import { LocationData } from './types';
import { drcRegions } from './constants';
import MapController from './MapController';
import RegionFundingInfo from './RegionFundingInfo';
import 'leaflet/dist/leaflet.css';

interface MapDisplayProps {
  initialCenter: [number, number];
  initialZoom: number;
  locations: LocationData[];
  mapStyle: string;
  fitMapToMarkers: boolean;
  currentRegion: keyof typeof drcRegions | undefined;
  highlightedRegion: keyof typeof drcRegions | undefined;
  setHighlightedRegion: (region: keyof typeof drcRegions | undefined) => void;
  navigateToRegion: (region: keyof typeof drcRegions) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  initialCenter,
  initialZoom,
  locations,
  mapStyle,
  fitMapToMarkers,
  currentRegion,
  highlightedRegion,
  setHighlightedRegion,
  navigateToRegion
}) => {
  // Get region style based on if it's highlighted
  const getRegionStyle = (region: keyof typeof drcRegions) => {
    const isHighlighted = region === highlightedRegion;
    
    return {
      fillColor: isHighlighted ? '#013f39' : '#3b82f6',
      fillOpacity: isHighlighted ? 0.4 : 0.15,
      color: isHighlighted ? '#013f39' : '#3b82f6',
      weight: isHighlighted ? 3 : 2
    };
  };

  // Get style for the whole DRC
  const getWholeCountryStyle = () => {
    return {
      fillColor: '#013f39',
      fillOpacity: 0.1,
      color: '#013f39',
      weight: 2
    };
  };

  return (
    <div className="rounded-lg overflow-hidden flex-1 min-h-[400px] border border-gray-200 relative">
      <MapContainer 
        center={initialCenter} 
        zoom={initialZoom} 
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapStyle}
        />
        
        {locations.map((location, index) => (
          <Marker 
            key={`${location.name}-${index}`} 
            position={[location.coordinates[1], location.coordinates[0]]}
          >
            <Popup>
              <div className="p-1">
                <h3 className="text-lg font-bold text-blue-600">{location.name}</h3>
                {location.description && <p className="text-sm mt-1">{location.description}</p>}
                <div className="mt-2 text-xs text-gray-500">
                  Coordinates: {location.coordinates[0].toFixed(4)}, {location.coordinates[1].toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* DRC outline - always visible */}
        <GeoJSON
          data={{
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [drcRegions.whole.polygon]
            },
            properties: {}
          } as GeoJSON.Feature}
          style={getWholeCountryStyle()}
        >
          <Tooltip sticky>{drcRegions.whole.label}</Tooltip>
        </GeoJSON>
        
        {/* Region polygon highlights */}
        {Object.entries(drcRegions).filter(([key]) => key !== 'whole').map(([key, region]) => (
          <GeoJSON
            key={key}
            data={{
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [region.polygon || []]
              },
              properties: {}
            } as GeoJSON.Feature}
            style={getRegionStyle(key as keyof typeof drcRegions)}
            eventHandlers={{
              click: () => navigateToRegion(key as keyof typeof drcRegions),
              mouseover: () => {
                if (highlightedRegion !== key) {
                  setHighlightedRegion(key as keyof typeof drcRegions);
                }
              },
              mouseout: () => {
                if (highlightedRegion !== currentRegion && key !== currentRegion) {
                  setHighlightedRegion(currentRegion);
                }
              }
            }}
          >
            <Tooltip sticky>{region.label}</Tooltip>
          </GeoJSON>
        ))}
        
        <MapController 
          locations={locations} 
          fitBounds={fitMapToMarkers} 
          region={currentRegion}
        />
      </MapContainer>
      
      {/* Region funding info */}
      <RegionFundingInfo region={highlightedRegion} />
    </div>
  );
};

export default MapDisplay;
