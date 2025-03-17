
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from 'recharts';
import { Component } from '@/data/programData';

interface TimelineChartProps {
  components: Array<{
    id: string;
    name: string;
    start: Date;
    end: Date;
    status: Component['status'];
  }>;
}

const TimelineChart = ({ components }: TimelineChartProps) => {
  const statusColors = {
    'planned': '#9ca3af',
    'in progress': '#3b82f6',
    'completed': '#10b981',
    'delayed': '#f59e0b'
  };
  
  // Transform the data for the chart
  const data = components.map(comp => {
    const startTime = comp.start.getTime();
    const endTime = comp.end.getTime();
    const duration = endTime - startTime;
    
    return {
      name: comp.name,
      start: startTime,
      duration: duration,
      end: endTime,
      status: comp.status
    };
  });
  
  // Get the min and max dates for the domain
  const allDates = components.flatMap(comp => [comp.start, comp.end]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  const formatTick = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short'
    });
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const startDate = new Date(data.start);
      const endDate = new Date(data.start + data.duration);
      
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium mb-1">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
          <p className="text-sm mt-1 capitalize">
            Status: <span className="font-medium">{data.status}</span>
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 150, bottom: 40 }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            dataKey="start"
            type="number"
            domain={[minDate.getTime(), maxDate.getTime()]}
            tickFormatter={formatTick}
            tickCount={7}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={140} 
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="duration" 
            fill="#8884d8"
            name="Timeline"
            background={{ fill: '#eee' }}
            radius={[4, 4, 4, 4]}
            barSize={15}
            minPointSize={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
