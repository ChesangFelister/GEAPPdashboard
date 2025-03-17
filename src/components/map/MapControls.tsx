
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, RotateCcw, ZoomIn, Compass } from 'lucide-react';
import { toast } from 'sonner';
import { drcRegions, mapTileStyles } from './constants';

interface MapControlsProps {
  mapStyle: string;
  setMapStyle: (style: string) => void;
  highlightedRegion: keyof typeof drcRegions | undefined;
  setHighlightedRegion: (region: keyof typeof drcRegions | undefined) => void;
  currentRegion: keyof typeof drcRegions | undefined;
  setCurrentRegion: (region: keyof typeof drcRegions | undefined) => void;
  locations: any[];
  fitBounds: () => void;
  resetView: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  mapStyle,
  setMapStyle,
  highlightedRegion,
  currentRegion,
  setCurrentRegion,
  setHighlightedRegion,
  locations,
  fitBounds,
  resetView
}) => {
  const navigateToRegion = (region: keyof typeof drcRegions) => {
    setCurrentRegion(region);
    setHighlightedRegion(region);
    toast.success(`Viewing ${drcRegions[region].label} region`);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Tabs defaultValue="map-style" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="map-style" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            Map Style
          </TabsTrigger>
          <TabsTrigger value="regions" className="flex items-center gap-1">
            <Compass className="h-4 w-4" />
            DRC Regions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map-style" className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant={mapStyle === mapTileStyles.openStreetMap ? 'default' : 'outline'}
              onClick={() => setMapStyle(mapTileStyles.openStreetMap)}
            >
              OpenStreetMap
            </Button>
            <Button 
              size="sm" 
              variant={mapStyle === mapTileStyles.light ? 'default' : 'outline'}
              onClick={() => setMapStyle(mapTileStyles.light)}
            >
              Light
            </Button>
            <Button 
              size="sm" 
              variant={mapStyle === mapTileStyles.dark ? 'default' : 'outline'}
              onClick={() => setMapStyle(mapTileStyles.dark)}
            >
              Dark
            </Button>
            <Button 
              size="sm" 
              variant={mapStyle === mapTileStyles.satellite ? 'default' : 'outline'}
              onClick={() => setMapStyle(mapTileStyles.satellite)}
            >
              Satellite
            </Button>
            <Button 
              size="sm" 
              variant={mapStyle === mapTileStyles.detailed ? 'default' : 'outline'}
              onClick={() => setMapStyle(mapTileStyles.detailed)}
            >
              Detailed
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="regions" className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={highlightedRegion === 'whole' ? 'default' : 'outline'}
              onClick={resetView}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Whole DRC
            </Button>
            <Button
              size="sm"
              variant={highlightedRegion === 'north' ? 'default' : 'outline'}
              onClick={() => navigateToRegion('north')}
              className="flex items-center gap-1"
            >
              North
            </Button>
            <Button
              size="sm"
              variant={highlightedRegion === 'south' ? 'default' : 'outline'}
              onClick={() => navigateToRegion('south')}
              className="flex items-center gap-1"
            >
              South
            </Button>
            <Button
              size="sm"
              variant={highlightedRegion === 'east' ? 'default' : 'outline'}
              onClick={() => navigateToRegion('east')}
              className="flex items-center gap-1"
            >
              East
            </Button>
            <Button
              size="sm"
              variant={highlightedRegion === 'west' ? 'default' : 'outline'}
              onClick={() => navigateToRegion('west')}
              className="flex items-center gap-1"
            >
              West
            </Button>
            {locations.length > 0 && (
              <Button 
                size="sm" 
                onClick={fitBounds}
                className="flex items-center gap-1"
              >
                <ZoomIn className="h-3 w-3" />
                Fit Markers
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapControls;
