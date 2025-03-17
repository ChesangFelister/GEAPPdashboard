
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import 'leaflet/dist/leaflet.css';
import { LocationData } from './map/types';
import { drcRegions, initializeLeafletIcons, mapTileStyles } from './map/constants';
import DataUploadForm from './map/DataUploadForm';
import MapControls from './map/MapControls';
import MapDisplay from './map/MapDisplay';

interface MapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  locationData?: LocationData[];
  onLocationsUpdate?: (locations: LocationData[]) => void;
}

const Map: React.FC<MapProps> = ({
  initialCenter = [-2.8767, 23.6345], // DRC center coordinates (note: Leaflet uses [lat, lng])
  initialZoom = 5,
  locationData = [],
  onLocationsUpdate,
}) => {
  const [locations, setLocations] = useState<LocationData[]>(locationData);
  const [uploadedData, setUploadedData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<string>(mapTileStyles.openStreetMap);
  const [fitMapToMarkers, setFitMapToMarkers] = useState<boolean>(false);
  const [currentRegion, setCurrentRegion] = useState<keyof typeof drcRegions | undefined>('whole');
  const [highlightedRegion, setHighlightedRegion] = useState<keyof typeof drcRegions | undefined>('whole');

  // Initialize Leaflet icons
  useEffect(() => {
    initializeLeafletIcons();
  }, []);

  const updateLocations = (newLocations: LocationData[]) => {
    setLocations(newLocations);
    if (onLocationsUpdate) {
      onLocationsUpdate(newLocations);
    }
  };

  const fitBounds = () => {
    if (locations.length === 0) return;
    setFitMapToMarkers(true);
    setCurrentRegion(undefined);
    setHighlightedRegion(undefined);
    
    // Reset the fit to bounds flag after a short delay
    setTimeout(() => setFitMapToMarkers(false), 100);
    
    toast.success('Map view adjusted to show all locations');
  };

  const resetView = () => {
    setFitMapToMarkers(false);
    setCurrentRegion('whole');
    setHighlightedRegion('whole');
    toast.success('Map view reset to show all of DRC');
  };

  const navigateToRegion = (region: keyof typeof drcRegions) => {
    setCurrentRegion(region);
    setHighlightedRegion(region);
    setFitMapToMarkers(false);
    toast.success(`Viewing ${drcRegions[region].label} region`);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <DataUploadForm
          isLoading={isLoading}
          uploadedData={uploadedData}
          setUploadedData={setUploadedData}
          updateLocations={(newLocations) => {
            updateLocations(newLocations);
            setFitMapToMarkers(true);
            setTimeout(() => setFitMapToMarkers(false), 100);
          }}
        />
        
        {locations.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {locations.length} location{locations.length !== 1 ? 's' : ''} loaded
            </span>
          </div>
        )}
      </div>
      
      <MapControls
        mapStyle={mapStyle}
        setMapStyle={setMapStyle}
        highlightedRegion={highlightedRegion}
        setHighlightedRegion={setHighlightedRegion}
        currentRegion={currentRegion}
        setCurrentRegion={setCurrentRegion}
        locations={locations}
        fitBounds={fitBounds}
        resetView={resetView}
      />
      
      <MapDisplay
        initialCenter={initialCenter}
        initialZoom={initialZoom}
        locations={locations}
        mapStyle={mapStyle}
        fitMapToMarkers={fitMapToMarkers}
        currentRegion={currentRegion}
        highlightedRegion={highlightedRegion}
        setHighlightedRegion={setHighlightedRegion}
        navigateToRegion={navigateToRegion}
      />
    </div>
  );
};

export default Map;
