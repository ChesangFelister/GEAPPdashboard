
import React from 'react';

interface RegionItemProps {
  name: string;
  amount: number;
  totalAmount: number;
}

const RegionItem = ({ name, amount, totalAmount }: RegionItemProps) => {
  const percentage = (amount / totalAmount) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm">${(amount / 1000000).toFixed(1)}M</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
        <div 
          className="h-2 rounded-full bg-blue-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-right text-muted-foreground mt-1">
        {percentage.toFixed(1)}% of total funding
      </div>
    </div>
  );
};

export default RegionItem;
