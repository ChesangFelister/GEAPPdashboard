
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SectorItem from './SectorItem';

interface PrivateSectorCardProps {
  partners: string[];
}

const PrivateSectorCard = ({ partners }: PrivateSectorCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>Private Sector Engagement</CardTitle>
        <CardDescription>Companies developing energy projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {partners.map(partner => (
            <div 
              key={partner}
              className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
            >
              {partner}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Sector Involvement</h4>
          <div className="grid grid-cols-2 gap-4">
            <SectorItem name="Off-Grid Solar" companies={3} />
            <SectorItem name="Mini-Grids" companies={4} />
            <SectorItem name="Grid Infrastructure" companies={1} />
            <SectorItem name="Utility Services" companies={2} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivateSectorCard;
