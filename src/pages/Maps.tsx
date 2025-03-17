
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Table2, Map as MapIcon, Download, Info } from 'lucide-react';
import Map from '@/components/Map';
import LocationTable from '@/components/LocationTable';
import { LocationData } from '@/components/map/types';

const Maps = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("map");

  // This function will be passed to the Map component
  const handleLocationsUpdate = (newLocations: LocationData[]) => {
    setLocations(newLocations);
  };

  // Export data as CSV
  const exportToCSV = () => {
    if (locations.length === 0) return;

    // Create CSV content
    const csvContent = [
      // Header row
      ['Program Name', 'Longitude', 'Latitude', 'Description'].join(','),
      // Data rows
      ...locations.map(loc => [
        loc.name.replace(/,/g, ';'), // Replace commas with semicolons to avoid CSV issues
        loc.coordinates[0],
        loc.coordinates[1],
        (loc.description || '').replace(/,/g, ';')
      ].join(','))
    ].join('\n');

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'drc_program_locations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Geographic Overview</h1>
        <p className="text-muted-foreground mt-2">
          Explore energy sector and development programs across the Democratic Republic of Congo
        </p>
      </div>

      {/* Info banner styled like ElectrifyNow */}
      <div className="bg-[#013f39]/5 border-l-4 border-[#013f39] p-4 mb-6 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-[#013f39]" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-[#013f39]/90">
              This interactive map shows key energy and development programs in the DRC. 
              You can upload your own location data or use the sample dataset to explore program coverage across regions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <Card className="overflow-hidden border-t-4 border-t-[#013f39] bg-[#013f39]/5">
          <CardHeader className="bg-[#013f39]/10 dark:bg-[#013f39]/20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <CardTitle className="text-xl text-[#013f39] dark:text-[#013f39]/90">Program Locations</CardTitle>
                <CardDescription className="mt-1">
                  Interactive map showing key projects in DRC. Upload your own data or use the sample dataset.
                </CardDescription>
              </div>
              
              {locations.length > 0 && (
                <Button
                  onClick={exportToCSV}
                  size="sm"
                  className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#013f39] hover:bg-[#013f39]/90"
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 py-4 bg-white/90 dark:bg-gray-700/90">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="p-1 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger value="map" className="flex items-center gap-2 data-[state=active]:bg-[#013f39] data-[state=active]:text-white">
                      <MapIcon className="h-4 w-4" />
                      Map View
                    </TabsTrigger>
                    <TabsTrigger value="table" className="flex items-center gap-2 data-[state=active]:bg-[#013f39] data-[state=active]:text-white">
                      <Table2 className="h-4 w-4" />
                      Table View
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex gap-2">
                    {locations.length > 0 && (
                      <div className="text-sm font-medium px-3 py-1 bg-[#013f39]/10 text-[#013f39] dark:bg-[#013f39]/30 dark:text-[#013f39]/90 rounded-full">
                        {locations.length} locations loaded
                      </div>
                    )}
                  </div>
                </div>
                <TabsContent value="map" className="h-[600px] border rounded-md overflow-hidden">
                  <Map onLocationsUpdate={handleLocationsUpdate} />
                </TabsContent>
                <TabsContent value="table" className="border rounded-md overflow-hidden">
                  <LocationTable locations={locations} />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Maps;
