
import React from 'react';
import MetricCard from './MetricCard';
import { getTotalProgramFunding, getPrivateSectorPartners } from '@/data/programData';

const MetricsSection = () => {
  const totalFunding = getTotalProgramFunding();
  const privateSectorPartners = getPrivateSectorPartners();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard 
        title="Total Funding" 
        value={`$ 1.681B`} 
        description="Across all programs"
        trend={"+5.2%"}
        trendUp={true}
        color="blue-accent"
      />
      <MetricCard 
        title="Active Programs" 
        value="31" 
        description="Currently in progress"
        color="blue-light"
      />
      <MetricCard 
        title="Private Partners" 
        value={privateSectorPartners.length.toString()} 
        description="Working in DRC energy"
        trend={"+2"}
        trendUp={true}
        color="blue"
      />
      <MetricCard 
        title="Target Connections" 
        value="8.2M" 
        description="By 2028"
        progress={35}
        color="blue"
      />
    </div>
  );
};

export default MetricsSection;
