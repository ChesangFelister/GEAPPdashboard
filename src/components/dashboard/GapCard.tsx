
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GapCardProps {
  title: string;
  required: number;
  available: number;
  description: string;
}

const GapCard = ({ title, required, available, description }: GapCardProps) => {
  const gap = required - available;
  const percentage = (available / required) * 100;
  
  return (
    <Card className="overflow-hidden border-l-4 border-blue-500 dark:border-l-blue-400">
      <CardHeader className="pb-2 bg-blue-50/50 dark:bg-blue-900/20">
        <CardTitle className="text-lg text-blue-700 dark:text-blue-300">{title}</CardTitle>
      </CardHeader>
      <CardContent className="bg-white dark:bg-gray-800">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Required</span>
              <span className="text-sm font-medium">${required}M</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Available</span>
              <span className="text-sm font-medium">${available}M</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-red-500">Gap</span>
              <span className="text-sm font-medium text-red-500">${gap}M</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Funding Progress</span>
              <span className="text-xs">{percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full bg-blue-500" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GapCard;
