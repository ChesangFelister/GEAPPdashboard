
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegionItem from './RegionItem';

interface RegionalFocusCardProps {
  regions: Record<string, number>;
}

const RegionalFocusCard = ({ regions }: RegionalFocusCardProps) => {
  const totalAmount = Object.values(regions).reduce((a, b) => a + b, 0);

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>Regional Focus</CardTitle>
        <CardDescription>Funding allocation by region</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(regions).map(([region, amount]) => (
            <RegionItem 
              key={region}
              name={region}
              amount={amount}
              totalAmount={totalAmount}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalFocusCard;
