
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FundingChartProps {
  capex: number;
  ta: number;
  opex: number;
  other: number;
}

const FundingChart = ({ capex, ta, opex, other }: FundingChartProps) => {
  const data = [
    { name: 'Capital Expenditure', value: capex },
    { name: 'Technical Assistance', value: ta },
    { name: 'Operating Expense', value: opex },
    { name: 'Other', value: other }
  ];
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
  
  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, '']}
          />
          <Legend 
            formatter={(value: string) => <span className="text-xs">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundingChart;
