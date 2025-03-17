
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { drcRegions } from './constants';

interface RegionFundingInfoProps {
  region: keyof typeof drcRegions | undefined;
}

const RegionFundingInfo: React.FC<RegionFundingInfoProps> = ({ region }) => {
  if (!region || !drcRegions[region].funding) {
    return null;
  }

  const regionData = drcRegions[region];
  
  // Prepare data for funding distribution chart
  const fundingData = [
    { name: 'Connections', value: regionData.funding * 0.4 },
    { name: 'Infrastructure', value: regionData.funding * 0.3 },
    { name: 'Training', value: regionData.funding * 0.15 },
    { name: 'Technical Assistance', value: regionData.funding * 0.15 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Program connection data
  const connectionsData = [
    { name: 'Households', connections: regionData.connections * 0.7 },
    { name: 'Businesses', connections: regionData.connections * 0.2 },
    { name: 'Public Facilities', connections: regionData.connections * 0.1 }
  ];

  return (
    <Card className="absolute bottom-4 right-4 z-[1000] w-96 bg-white/95 shadow-lg border-2 border-[#013f39]/20">
      <CardHeader className="py-3 px-4 bg-[#013f39]/10">
        <CardTitle className="text-md font-bold text-[#013f39]">
          {regionData.label}
        </CardTitle>
        <CardDescription className="text-xs">
          Region statistics
        </CardDescription>
      </CardHeader>
      <CardContent className="py-3 px-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Funding:</span>
            <span className="font-bold">${(regionData.funding / 1000000).toFixed(1)}M</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs text-center font-medium mb-2">Funding Distribution</h4>
              <ChartContainer className="h-32" config={{}}>
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={fundingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {fundingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-2 bg-white shadow rounded border">
                            <p className="font-medium">{data.name}</p>
                            <p>${(data.value / 1000000).toFixed(1)}M</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
            </div>
            
            <div>
              <h4 className="text-xs text-center font-medium mb-2">Connection Types</h4>
              <ChartContainer className="h-32" config={{}}>
                <BarChart data={connectionsData}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} width={30} />
                  <Bar dataKey="connections" fill="#013f39" />
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="p-2 bg-white shadow rounded border">
                            <p className="font-medium">{data.name}</p>
                            <p>{data.connections.toLocaleString()} connections</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
          
          <div className="pt-2 text-xs text-muted-foreground">
            <span>Active programs: </span>
            <ul className="list-disc pl-4 mt-1">
              {regionData.programs.map((program, i) => (
                <li key={i}>{program}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionFundingInfo;
