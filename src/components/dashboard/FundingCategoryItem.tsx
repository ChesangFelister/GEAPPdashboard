
import React from 'react';

interface FundingCategoryItemProps {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const FundingCategoryItem = ({ name, amount, percentage, color }: FundingCategoryItemProps) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium">{name}</span>
      <span className="text-sm font-medium">${(amount / 1000000).toFixed(1)}M</span>
    </div>
    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 mb-1">
      <div 
        className={`h-2.5 rounded-full ${color}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <div className="text-xs text-right text-muted-foreground">
      {percentage.toFixed(1)}%
    </div>
  </div>
);

export default FundingCategoryItem;
