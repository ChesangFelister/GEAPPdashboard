
import React from 'react';
import { Program, Component } from '@/data/programData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import TimelineChart from './TimelineChart';

interface ProgramDetailProps {
  program: Program;
  onBack: () => void;
}

const ProgramDetail = ({ program, onBack }: ProgramDetailProps) => {
  // Calculate program timeline progress
  const startDate = new Date(program.startDate);
  const endDate = new Date(program.endDate);
  const today = new Date();
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();
  const progressPercentage = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  // Prepare timeline data
  const timelineData = program.components.map(comp => ({
    id: comp.id,
    name: comp.name,
    start: new Date(comp.startDate),
    end: new Date(comp.endDate),
    status: comp.status
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Programs
        </Button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{program.name}</CardTitle>
                  <CardDescription className="mt-2">{program.description}</CardDescription>
                </div>
                <StatusBadge status={program.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Objective</h3>
                  <p className="text-sm text-muted-foreground">{program.objective}</p>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Lead Agency</h3>
                    <p className="text-sm">{program.leadAgency}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Total Funding</h3>
                    <p className="text-sm">${program.totalFunding.toLocaleString()} {program.currency}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Implementation Period</h3>
                    <p className="text-sm">{formatDate(program.startDate)} - {formatDate(program.endDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Target Regions</h3>
                    <div className="flex flex-wrap gap-1">
                      {program.targetRegions.map(region => (
                        <Badge key={region} variant="secondary" className="font-normal">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Implementing Partners</h3>
                  <div className="flex flex-wrap gap-1">
                    {program.implementingPartners.map(partner => (
                      <Badge key={partner} variant="outline" className="font-normal">
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <h3 className="font-medium">Implementation Progress</h3>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <StatusItem label="Planned" count={program.components.filter(c => c.status === 'planned').length} total={program.components.length} />
                <StatusItem label="In Progress" count={program.components.filter(c => c.status === 'in progress').length} total={program.components.length} />
                <StatusItem label="Completed" count={program.components.filter(c => c.status === 'completed').length} total={program.components.length} />
                <StatusItem label="Delayed" count={program.components.filter(c => c.status === 'delayed').length} total={program.components.length} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="components">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="components" className="mt-6 animate-in fade-in">
          <div className="space-y-6">
            {program.components.map(component => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="timeline" className="mt-6 animate-in fade-in">
          <TimelineChart components={timelineData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatusItemProps {
  label: string;
  count: number;
  total: number;
}

const StatusItem = ({ label, count, total }: StatusItemProps) => {
  const percentage = (count / total) * 100;
  
  let color = '';
  switch (label.toLowerCase()) {
    case 'planned':
      color = 'bg-gray-500';
      break;
    case 'in progress':
      color = 'bg-blue-500';
      break;
    case 'completed':
      color = 'bg-emerald-500';
      break;
    case 'delayed':
      color = 'bg-amber-500';
      break;
    default:
      color = 'bg-gray-500';
  }
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{count} of {total}</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface ComponentCardProps {
  component: Component;
}

const ComponentCard = ({ component }: ComponentCardProps) => {
  // Calculate component timeline progress
  const startDate = new Date(component.startDate);
  const endDate = new Date(component.endDate);
  const today = new Date();
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();
  const progressPercentage = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{component.name}</CardTitle>
          <StatusBadge status={component.status} />
        </div>
        <CardDescription>{component.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            <InfoItem label="Funding Type" value={component.fundingType} />
            <InfoItem label="Funding Source" value={component.fundingSource} />
            <InfoItem label="Amount" value={`$${(component.fundingAmount / 1000000).toFixed(1)}M`} />
            <InfoItem label="Category" value={component.fundingCategory.toUpperCase()} />
          </div>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <InfoItem 
              label="Timeline" 
              value={`${formatDate(component.startDate)} - ${formatDate(component.endDate)}`} 
            />
            <InfoItem label="Sector" value={component.sector} />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Key Partners</h4>
            <div className="flex flex-wrap gap-1">
              {component.partners.map(partner => (
                <Badge key={partner} variant="outline" className="font-normal">
                  {partner}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-2">Expected Outputs</h4>
              <ul className="text-sm space-y-1 list-disc pl-4">
                {component.outputs.map((output, idx) => (
                  <li key={idx}>{output}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Expected Outcomes</h4>
              <ul className="text-sm space-y-1 list-disc pl-4">
                {component.outcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div>
    <h4 className="text-xs text-muted-foreground">{label}</h4>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  let color = '';
  
  switch (status) {
    case 'planned':
      color = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      break;
    case 'in progress':
      color = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      break;
    case 'completed':
      color = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      break;
    case 'delayed':
      color = 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      break;
    default:
      color = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <Badge variant="outline" className={`${color} font-normal capitalize`}>
      {status}
    </Badge>
  );
};

export default ProgramDetail;
