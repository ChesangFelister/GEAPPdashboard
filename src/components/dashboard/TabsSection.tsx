
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetricsOverview from '@/components/metrics/MetricsOverview';
import GapCard from './GapCard';

const TabsSection = () => {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="gaps">Funding Gaps</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-6">
        <MetricsOverview />
      </TabsContent>
      <TabsContent value="gaps" className="mt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <GapCard 
            title="Generation " 
            required={450}
            available={120}
            description="Significant gap in funding for rural areas outside provincial capitals"
          />
          <GapCard 
            title="Transmision" 
            required={300}
            available={205}
            description="Additional funding needed for complete grid modernization"
          />
           <GapCard 
            title="Sector reform" 
            required={75}
            available={45}
            description="More TA required for local government and utility capacity"
          />
          <GapCard 
            title="Capacity Building" 
            required={75}
            available={45}
            description="More TA required for local government and utility capacity"
          />
        </div>
      </TabsContent>
      <TabsContent value="timeline" className="mt-6">
        <div className="chart-container min-h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Timeline visualization would appear here</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabsSection;
