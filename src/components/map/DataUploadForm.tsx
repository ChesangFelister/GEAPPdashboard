
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { LocationData } from './types';

interface DataUploadFormProps {
  isLoading: boolean;
  uploadedData: string;
  setUploadedData: (data: string) => void;
  updateLocations: (locations: LocationData[]) => void;
}

const DataUploadForm: React.FC<DataUploadFormProps> = ({ 
  isLoading, 
  uploadedData, 
  setUploadedData, 
  updateLocations 
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const contents = e.target?.result as string;
        setUploadedData(contents);
        parseAndProcessData(contents);
      } catch (error) {
        console.error('Error processing file:', error);
        toast.error('Failed to process file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const handleManualDataInput = () => {
    try {
      parseAndProcessData(uploadedData);
    } catch (error) {
      console.error('Error parsing manual input:', error);
      toast.error('Failed to process data. Please check the format.');
    }
  };

  const parseAndProcessData = (dataString: string) => {
    try {
      const parsedData = JSON.parse(dataString);
      if (Array.isArray(parsedData)) {
        // Process JSON array format
        const validLocations = parsedData
          .filter(item => Array.isArray(item.coordinates) && item.coordinates.length >= 2)
          .map(item => ({
            name: item.name || 'Location',
            coordinates: [item.coordinates[0], item.coordinates[1]] as [number, number],
            description: item.description || ''
          } as LocationData));
        updateLocations(validLocations);
        toast.success(`Loaded ${validLocations.length} locations`);
      } else if (parsedData.features) {
        // Process GeoJSON format
        const extractedLocations = parsedData.features
          .filter((feature: any) => 
            feature.geometry && 
            feature.geometry.type === 'Point' &&
            Array.isArray(feature.geometry.coordinates) && 
            feature.geometry.coordinates.length >= 2
          )
          .map((feature: any) => ({
            name: feature.properties?.name || 'Location',
            coordinates: [
              feature.geometry.coordinates[0], 
              feature.geometry.coordinates[1]
            ] as [number, number],
            description: feature.properties?.description || '',
          } as LocationData));
        updateLocations(extractedLocations);
        toast.success(`Loaded ${extractedLocations.length} locations from GeoJSON`);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Try parsing as CSV
      try {
        const lines = dataString.split('\n');
        if (lines.length > 1) {
          const parsedLocations = lines.slice(1)
            .map(line => {
              const [name, lon, lat, description = ''] = line.split(',');
              const longitude = parseFloat(lon);
              const latitude = parseFloat(lat);
              
              // Skip invalid coordinates
              if (isNaN(longitude) || isNaN(latitude)) return null;
              
              return {
                name,
                coordinates: [longitude, latitude] as [number, number],
                description
              } as LocationData;
            })
            .filter((loc): loc is LocationData => loc !== null);
          
          updateLocations(parsedLocations);
          toast.success(`Loaded ${parsedLocations.length} locations from CSV`);
        } else {
          toast.error('Invalid data format. Please check your input.');
        }
      } catch (csvError) {
        console.error('Error parsing CSV:', csvError);
        toast.error('Failed to process data. Please check the format.');
      }
    }
  };

  const loadSampleData = () => {
    // DRC regions within correct boundaries
    const sampleData: LocationData[] = [
      { name: "North Kivu Region", coordinates: [29.0469, -1.1748], description: "North Kivu - Major development zone" },
      { name: "South Kivu Region", coordinates: [28.8707, -2.8055], description: "South Kivu - Rural electrification" },
      { name: "Kinshasa Metro", coordinates: [15.3125, -4.3316], description: "Capital region - Urban grid expansion" },
      { name: "Lubumbashi Area", coordinates: [27.4688, -11.6772], description: "Mining region electrification" },
      { name: "Mbuji-Mayi", coordinates: [23.5962, -6.1466], description: "Central region program" },
      { name: "Kisangani", coordinates: [25.2001, 0.5153], description: "Northern hub - mini-grid installation" },
      { name: "Equateur West", coordinates: [19.1406, 0.9668], description: "Equateur province development" },
      { name: "Kasai Region", coordinates: [21.0938, -5.0032], description: "Kasai electrification initiative" },
      { name: "Tanganyika", coordinates: [28.3007, -5.8722], description: "Southeastern region program" },
      { name: "Kongo Central", coordinates: [14.0625, -5.2246], description: "Western development corridor" }
    ];
    
    updateLocations(sampleData);
    setUploadedData(JSON.stringify(sampleData, null, 2));
    toast.success('Loaded sample data with DRC regional programs');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">
          Upload location data file (JSON, GeoJSON, or CSV):
        </label>
        <input
          type="file"
          accept=".json,.geojson,.csv,.txt"
          onChange={handleFileUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">
          Or paste data here:
        </label>
        <div className="flex flex-col gap-2">
          <Textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder='[{"name": "Location 1", "coordinates": [23.4, -3.2], "description": "Description"}]'
            rows={3}
            value={uploadedData}
            onChange={(e) => setUploadedData(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <Button
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={handleManualDataInput}
              disabled={isLoading || !uploadedData}
            >
              Load Data
            </Button>
            <Button
              variant="outline"
              className="px-4 py-2 rounded-md"
              onClick={loadSampleData}
              disabled={isLoading}
            >
              Load Sample Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUploadForm;
