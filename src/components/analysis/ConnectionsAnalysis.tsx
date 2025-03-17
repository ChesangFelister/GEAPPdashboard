
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getConnectionsProjection } from '@/data/programData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ConnectionsAnalysis = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const connectionsData = getConnectionsProjection();
  const regions = Object.keys(connectionsData);

  const getRegionData = (region: string) => {
    if (!region) return [];
    
    const years = Object.keys(connectionsData[region])
      .filter(key => !isNaN(Number(key)))
      .map(Number);
    
    return years.map(year => ({
      year,
      connections: connectionsData[region][year]
    }));
  };

  const getTotalConnections = () => {
    let totals: Record<number, number> = {};
    
    regions.forEach(region => {
      Object.entries(connectionsData[region])
        .forEach(([key, value]) => {
          const year = Number(key);
          if (!isNaN(year)) {
            if (!totals[year]) totals[year] = 0;
            totals[year] += value as number;
          }
        });
    });
    
    return Object.entries(totals)
      .map(([year, connections]) => ({ 
        year: Number(year), 
        connections 
      }))
      .sort((a, b) => a.year - b.year);
  };

  const chartData = selectedRegion 
    ? getRegionData(selectedRegion)
    : getTotalConnections();

  const getContributingPrograms = (region: string) => {
    return connectionsData[region]?.programs || [];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Electricity Connections Analysis</CardTitle>
          <CardDescription>
            Projected electricity connections by region and contributing programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-64">
              <label className="text-sm font-medium mb-2 block">
                Select Region:
              </label>
              <Select 
                onValueChange={(value) => setSelectedRegion(value)}
                value={selectedRegion || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="h-80 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'Connections', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [Number(value).toLocaleString(), 'Connections']}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Legend />
                <Bar dataKey="connections" name="Projected Connections" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {selectedRegion && (
            <div>
              <h3 className="text-lg font-medium mb-4">Contributing Programs in {selectedRegion}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getContributingPrograms(selectedRegion).map((program, index) => (
                    <TableRow key={index}>
                      <TableCell>{program}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionsAnalysis;
