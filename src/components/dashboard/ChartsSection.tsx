import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getComponentsByFundingCategory, getTotalProgramFunding } from '@/data/programData';
import ConnectionsChart from '@/components/charts/ConnectionsChart';
import FundingChart from '@/components/charts/FundingChart';
import FundingCategoryItem from './FundingCategoryItem';

const ChartsSection = () => {
  const totalFunding = getTotalProgramFunding();
  const fundingByCategory = getComponentsByFundingCategory();
  
  // Calculate funding by category
  const capexTotal = fundingByCategory.capex.reduce((sum, comp) => sum + comp.fundingAmount, 0);
  const taTotal = fundingByCategory.TA.reduce((sum, comp) => sum + comp.fundingAmount, 0);
  const opexTotal = fundingByCategory.opex.reduce((sum, comp) => sum + comp.fundingAmount, 0);
  const otherTotal = fundingByCategory.other.reduce((sum, comp) => sum + comp.fundingAmount, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Connections Projection by Region</CardTitle>
          <CardDescription>Yearly electricity connection targets</CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectionsChart />
        </CardContent>
      </Card>
      
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Funding Allocation</CardTitle>
          <CardDescription>By funding category</CardDescription>
        </CardHeader>
        <CardContent>
          <FundingChart 
            capex={capexTotal}
            ta={taTotal}
            opex={opexTotal}
            other={otherTotal}
          />
          <div className="mt-6 space-y-4">
            <FundingCategoryItem
              name="Capital Expenditure"
              amount={capexTotal}
              percentage={(capexTotal / totalFunding) * 100}
              color="bg-blue-500"
            />
            <FundingCategoryItem
              name="Technical Assistance"
              amount={taTotal}
              percentage={(taTotal / totalFunding) * 100}
              color="bg-emerald-500"
            />
            <FundingCategoryItem
              name="Operating Expense"
              amount={opexTotal}
              percentage={(opexTotal / totalFunding) * 100}
              color="bg-amber-500"
            />
            <FundingCategoryItem
              name="Other"
              amount={otherTotal}
              percentage={(otherTotal / totalFunding) * 100}
              color="bg-purple-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;