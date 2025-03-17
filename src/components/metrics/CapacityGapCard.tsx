
import React from 'react';

interface CapacityGapCardProps {
  title: string;
  description: string;
  taFunded: string;
  gap: string;
}

const CapacityGapCard = ({ title, description, taFunded, gap }: CapacityGapCardProps) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
    <h4 className="text-sm font-medium mb-2">{title}</h4>
    <p className="text-xs text-muted-foreground mb-3">{description}</p>
    <div className="space-y-2">
      <div>
        <span className="text-xs font-medium block mb-1">TA Funded Status:</span>
        <span className={`text-xs ${taFunded.startsWith('Yes') ? 'text-emerald-500' : taFunded.startsWith('Partial') ? 'text-amber-500' : 'text-red-500'}`}>
          {taFunded}
        </span>
      </div>
      <div>
        <span className="text-xs font-medium block mb-1">Gap:</span>
        <span className="text-xs text-red-500">{gap}</span>
      </div>
    </div>
  </div>
);

export default CapacityGapCard;
