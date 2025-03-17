
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getConnectionsProjection } from '@/data/programData';

const ConnectionsChart = () => {
  const connectionsProjection = getConnectionsProjection();
  
  // Transform the data for Recharts
  const chartData = Object.entries(connectionsProjection).map(([region, data]) => {
    const { programs, ...yearlyData } = data as any;
    return {
      region,
      ...yearlyData
    };
  });
  
  // Get all years for the chart
  const years = Object.keys(chartData[0]).filter(key => key !== 'region');
  
  const colors = {
    '2023': '#94a3b8',
    '2024': '#64748b',
    '2025': '#475569',
    '2026': '#334155',
    '2027': '#1e293b'
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="region" />
          <YAxis tickFormatter={(value) => `${value / 1000}k`} />
          <Tooltip 
            formatter={(value) => [`${value.toLocaleString()} connections`, '']}
            labelFormatter={(label) => `Region: ${label}`}
          />
          <Legend />
          {years.map((year, index) => (
            <Bar 
              key={year} 
              dataKey={year} 
              name={`${year}`} 
              fill={colors[year as keyof typeof colors] || `#${(index + 3).toString(16)}0a0b0`}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConnectionsChart;
