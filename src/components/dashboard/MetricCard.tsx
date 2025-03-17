
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend?: string;
  trendUp?: boolean;
  progress?: number;
  color?: 'blue' | 'blue-light' | 'blue-dark' | 'blue-accent';
}

const MetricCard = ({ 
  title, 
  value, 
  description, 
  trend, 
  trendUp, 
  progress,
  color = 'blue'
}: MetricCardProps) => {
  const colorStyles = {
    blue: {
      card: 'bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-800/40 hover:border-blue-400',
      title: 'text-blue-700 dark:text-blue-300',
      value: 'text-blue-900 dark:text-blue-100',
      progress: 'bg-blue-500'
    },
    'blue-light': {
      card: 'bg-blue-50/80 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30 hover:border-blue-300',
      title: 'text-blue-600 dark:text-blue-300',
      value: 'text-blue-800 dark:text-blue-100',
      progress: 'bg-blue-400'
    },
    'blue-dark': {
      card: 'bg-blue-100 border-blue-400 dark:bg-blue-900/40 dark:border-blue-700/50 hover:border-blue-500',
      title: 'text-blue-800 dark:text-blue-200',
      value: 'text-blue-900 dark:text-blue-100',
      progress: 'bg-blue-600'
    },
    'blue-accent': {
      card: 'bg-blue-50/70 border-l-4 border-l-blue-500 border-t-blue-200 border-r-blue-200 border-b-blue-200 dark:border-t-blue-800/30 dark:border-r-blue-800/30 dark:border-b-blue-800/30 dark:bg-blue-900/20 hover:border-l-blue-600',
      title: 'text-blue-700 dark:text-blue-300',
      value: 'text-blue-900 dark:text-blue-100',
      progress: 'bg-blue-500'
    }
  };

  return (
    <Card className={cn("overflow-hidden rounded-lg shadow-sm transition-all duration-200 hover:shadow-md", colorStyles[color].card)}>
      <CardContent className="p-5">
        <div className="flex flex-col h-full">
          <div className="mb-2">
            <h3 className={cn("text-sm font-medium", colorStyles[color].title)}>{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          </div>
          
          <div className="flex items-baseline justify-between mt-auto">
            <div className={cn("text-2xl font-bold", colorStyles[color].value)}>{value}</div>
            {trend && (
              <div className={cn(
                "text-sm font-medium",
                trendUp ? "text-emerald-500" : "text-red-500"
              )}>
                {trend}
              </div>
            )}
          </div>
          
          {typeof progress === 'number' && (
            <Progress value={progress} className={cn("h-1.5 mt-3", colorStyles[color].progress)} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
