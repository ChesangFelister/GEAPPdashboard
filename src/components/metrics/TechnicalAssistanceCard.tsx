
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CapacityGapCard from './CapacityGapCard';

interface TechnicalAssistanceCardProps {
  capacityGaps: Record<string, {
    description: string;
    taFunded: string;
    gap: string;
  }>;
}

const TechnicalAssistanceCard = ({ capacityGaps }: TechnicalAssistanceCardProps) => {
  return (
    <Card className="md:col-span-2 card-hover">
      <CardHeader>
        <CardTitle>Technical Assistance Gaps</CardTitle>
        <CardDescription>Government capacity and implementation gaps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(capacityGaps).map(([area, details]) => (
            <CapacityGapCard
              key={area}
              title={area}
              description={details.description}
              taFunded={details.taFunded}
              gap={details.gap}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalAssistanceCard;
