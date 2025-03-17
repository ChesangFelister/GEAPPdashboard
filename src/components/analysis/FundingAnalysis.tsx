
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getFundingGaps, programsData } from '@/data/programData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FundingAnalysis = () => {
  const [fundingType, setFundingType] = useState('all');
  
  const fundingGaps = getFundingGaps();
  
  // Calculate funding by source
  const getFundingBySource = () => {
    const fundingSources: Record<string, number> = {};
    
    programsData.forEach(program => {
      program.components.forEach(component => {
        if (!fundingSources[component.fundingSource]) {
          fundingSources[component.fundingSource] = 0;
        }
        
        if (fundingType === 'all' || component.fundingType === fundingType) {
          fundingSources[component.fundingSource] += component.fundingAmount;
        }
      });
    });
    
    return Object.entries(fundingSources)
      .map(([source, amount]) => ({
        name: source,
        value: amount / 1000000 // Convert to millions
      }))
      .sort((a, b) => b.value - a.value);
  };
  
  const getFundingByType = () => {
    const fundingTypes: Record<string, number> = {};
    
    programsData.forEach(program => {
      program.components.forEach(component => {
        if (!fundingTypes[component.fundingType]) {
          fundingTypes[component.fundingType] = 0;
        }
        
        fundingTypes[component.fundingType] += component.fundingAmount;
      });
    });
    
    return Object.entries(fundingTypes)
      .map(([type, amount]) => ({
        name: type,
        value: amount / 1000000 // Convert to millions
      }))
      .sort((a, b) => b.value - a.value);
  };
  
  const sourceData = getFundingBySource();
  const typeData = getFundingByType();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  const getFundingGapsData = () => {
    return Object.entries(fundingGaps).map(([sector, data]) => ({
      name: sector,
      required: data.required,
      available: data.available,
      gap: data.gap
    }));
  };
  
  const gapsData = getFundingGapsData();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Funding Analysis</CardTitle>
          <CardDescription>
            Analysis of available funding and gaps by sector and source
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources" className="space-y-4">
            <TabsList>
              <TabsTrigger value="sources">Funding Sources</TabsTrigger>
              <TabsTrigger value="types">Funding Types</TabsTrigger>
              <TabsTrigger value="gaps">Funding Gaps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sources">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-64">
                  <label className="text-sm font-medium mb-2 block">
                    Filter by Funding Type:
                  </label>
                  <Select 
                    onValueChange={setFundingType}
                    defaultValue="all"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Grant">Grants</SelectItem>
                      <SelectItem value="Loan">Loans</SelectItem>
                      <SelectItem value="Concessional Loan">Concessional Loans</SelectItem>
                      <SelectItem value="Mixed (Grants & Loans)">Mixed Funding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => {
                          return typeof value === 'number' 
                            ? [`$${value.toFixed(1)}M`, 'Funding'] 
                            : [value, 'Funding'];
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Funding by Source (USD Millions)</h3>
                  {sourceData.map((entry, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{entry.name}</span>
                        <span className="font-medium">${entry.value.toFixed(1)}M</span>
                      </div>
                      <Progress 
                        value={(entry.value / Math.max(...sourceData.map(d => d.value))) * 100} 
                        className="h-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] + '40' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="types">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {typeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => {
                          return typeof value === 'number' 
                            ? [`$${value.toFixed(1)}M`, 'Funding'] 
                            : [value, 'Funding'];
                        }} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Funding by Type (USD Millions)</h3>
                  {typeData.map((entry, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{entry.name}</span>
                        <span className="font-medium">${entry.value.toFixed(1)}M</span>
                      </div>
                      <Progress 
                        value={(entry.value / Math.max(...typeData.map(d => d.value))) * 100} 
                        className="h-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] + '40' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gaps">
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={gapsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'USD (Millions)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`$${value}M`, '']} />
                    <Legend />
                    <Bar dataKey="required" name="Required Funding" fill="#8884d8" />
                    <Bar dataKey="available" name="Available Funding" fill="#82ca9d" />
                    <Bar dataKey="gap" name="Funding Gap" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Funding Gaps by Sector</h3>
                {Object.entries(fundingGaps).map(([sector, data], index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{sector}</span>
                      <span className="text-red-500 font-medium">Gap: ${data.gap}M</span>
                    </div>
                    
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-sm">
                        <span>Required: ${data.required}M</span>
                        <span>Available: ${data.available}M</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-blue-500" 
                          style={{ width: `${(data.available / data.required) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{data.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingAnalysis;
