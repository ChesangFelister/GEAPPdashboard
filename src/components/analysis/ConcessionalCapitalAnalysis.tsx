
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { programsData } from '@/data/programData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

const ConcessionalCapitalAnalysis = () => {
  // Get all components that involve concessional capital
  const getConcessionalComponents = () => {
    const concessionalComponents: any[] = [];
    
    programsData.forEach(program => {
      program.components.forEach(component => {
        if (component.fundingType === 'Concessional Loan' || 
            component.fundingType === 'Mixed (Grants & Loans)') {
          concessionalComponents.push({
            ...component,
            programName: program.name
          });
        }
      });
    });
    
    return concessionalComponents;
  };
  
  const concessionalComponents = getConcessionalComponents();
  
  // Calculate total concessional capital
  const getTotalConcessionalCapital = () => {
    return concessionalComponents.reduce((total, component) => {
      // For mixed funding, estimate that 60% is concessional
      const multiplier = component.fundingType === 'Mixed (Grants & Loans)' ? 0.6 : 1;
      return total + (component.fundingAmount * multiplier);
    }, 0);
  };
  
  const totalConcessionalCapital = getTotalConcessionalCapital();
  
  // Get concessional funding by sector
  const getConcessionalBySector = () => {
    const sectorData: Record<string, number> = {};
    
    concessionalComponents.forEach(component => {
      if (!sectorData[component.sector]) {
        sectorData[component.sector] = 0;
      }
      
      // For mixed funding, estimate that 60% is concessional
      const multiplier = component.fundingType === 'Mixed (Grants & Loans)' ? 0.6 : 1;
      sectorData[component.sector] += component.fundingAmount * multiplier;
    });
    
    return Object.entries(sectorData)
      .map(([sector, amount]) => ({
        name: sector,
        value: amount / 1000000 // Convert to millions
      }))
      .sort((a, b) => b.value - a.value);
  };
  
  const sectorData = getConcessionalBySector();
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Concessional Capital Analysis</CardTitle>
          <CardDescription>
            Analysis of concessional funding requirements and allocations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-medium">Total Concessional Capital</h3>
                    <p className="text-3xl font-bold mt-2">${(totalConcessionalCapital / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Across {concessionalComponents.length} components
                    </p>
                  </div>
                  
                  <div className="space-y-4 mt-8">
                    <h3 className="text-lg font-medium">Concessional Capital by Sector</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sector</TableHead>
                          <TableHead className="text-right">Amount (USD)</TableHead>
                          <TableHead className="text-right">Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sectorData.map((entry, index) => (
                          <TableRow key={index}>
                            <TableCell>{entry.name}</TableCell>
                            <TableCell className="text-right">${entry.value.toFixed(1)}M</TableCell>
                            <TableCell className="text-right">
                              {((entry.value * 1000000 / totalConcessionalCapital) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {sectorData.map((entry, index) => (
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
              </div>
            </TabsContent>
            
            <TabsContent value="components">
              <ScrollArea className="h-[500px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Component</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                      <TableHead className="text-right">Est. Concessional</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {concessionalComponents.map((component, index) => {
                      // For mixed funding, estimate that 60% is concessional
                      const multiplier = component.fundingType === 'Mixed (Grants & Loans)' ? 0.6 : 1;
                      const concessionalAmount = component.fundingAmount * multiplier;
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{component.programName}</TableCell>
                          <TableCell>{component.name}</TableCell>
                          <TableCell>{component.fundingType}</TableCell>
                          <TableCell>{component.sector}</TableCell>
                          <TableCell className="text-right">${(component.fundingAmount / 1000000).toFixed(1)}M</TableCell>
                          <TableCell className="text-right">${(concessionalAmount / 1000000).toFixed(1)}M</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConcessionalCapitalAnalysis;
