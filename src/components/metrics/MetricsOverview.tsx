
import React from 'react';
import { 
  getCapacityGaps, 
  getFundingGaps, 
  getPrivateSectorPartners, 
  getTargetRegions 
} from '@/data/programData';
import RegionalFocusCard from './RegionalFocusCard';
import PrivateSectorCard from './PrivateSectorCard';
import TechnicalAssistanceCard from './TechnicalAssistanceCard';

const MetricsOverview = () => {
  const regions = getTargetRegions();
  const privateSectorPartners = getPrivateSectorPartners();
  const capacityGaps = getCapacityGaps();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <RegionalFocusCard regions={regions} />
      <PrivateSectorCard partners={privateSectorPartners} />
      <TechnicalAssistanceCard capacityGaps={capacityGaps} />
    </div>
  );
};

export default MetricsOverview;
