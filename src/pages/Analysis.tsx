
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectionsAnalysis from '@/components/analysis/ConnectionsAnalysis';
import PrivateSectorAnalysis from '@/components/analysis/PrivateSectorAnalysis';
import FundingAnalysis from '@/components/analysis/FundingAnalysis';
import CapacityGapsAnalysis from '@/components/analysis/CapacityGapsAnalysis';
import ProgramStatusAnalysis from '@/components/analysis/ProgramStatusAnalysis';
import ConcessionalCapitalAnalysis from '@/components/analysis/ConcessionalCapitalAnalysis';

const Analysis = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Decision Support System</h1>
        <p className="text-muted-foreground mt-2">
          Analyze DRC M300 Compact and program data to support implementation decisions
        </p>
      </div>

      <Tabs defaultValue="connections" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full h-auto">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="private-sector">Private Sector</TabsTrigger>
          <TabsTrigger value="funding">Funding Analysis</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Gaps</TabsTrigger>
          <TabsTrigger value="concessional">Concessional Capital</TabsTrigger>
          <TabsTrigger value="status">Program Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connections" className="space-y-4">
          <ConnectionsAnalysis />
        </TabsContent>
        
        <TabsContent value="private-sector" className="space-y-4">
          <PrivateSectorAnalysis />
        </TabsContent>
        
        <TabsContent value="funding" className="space-y-4">
          <FundingAnalysis />
        </TabsContent>
        
        <TabsContent value="capacity" className="space-y-4">
          <CapacityGapsAnalysis />
        </TabsContent>
        
        <TabsContent value="concessional" className="space-y-4">
          <ConcessionalCapitalAnalysis />
        </TabsContent>
        
        <TabsContent value="status" className="space-y-4">
          <ProgramStatusAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
