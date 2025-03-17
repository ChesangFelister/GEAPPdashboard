
import React, { useState } from 'react';
import { programsData, Program } from '@/data/programData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface ProgramListProps {
  onSelectProgram: (program: Program) => void;
}

const ProgramList = ({ onSelectProgram }: ProgramListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPrograms = programsData.filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="mb-6">
        <Input
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map(program => (
          <ProgramCard 
            key={program.id} 
            program={program} 
            onClick={() => onSelectProgram(program)} 
          />
        ))}
      </div>
    </div>
  );
};

interface ProgramCardProps {
  program: Program;
  onClick: () => void;
}

const ProgramCard = ({ program, onClick }: ProgramCardProps) => {
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
    return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <Card 
      className="card-hover transition-all cursor-pointer hover:border-primary/40" 
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{program.name}</CardTitle>
          <StatusBadge status={program.status} />
        </div>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lead Agency:</span>
            <span className="font-medium">{program.leadAgency}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Funding:</span>
            <span className="font-medium">${(program.totalFunding / 1000000).toFixed(1)}M</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Timeline:</span>
            <span className="font-medium">
              {formatDate(program.startDate)} - {formatDate(program.endDate)}
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
          
          <div>
            <h4 className="text-xs font-medium mb-2 text-muted-foreground">Components:</h4>
            <div className="flex flex-wrap gap-2">
              {program.components.slice(0, 3).map(component => (
                <div 
                  key={component.id}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md"
                >
                  {component.name}
                </div>
              ))}
              {program.components.length > 3 && (
                <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md">
                  +{program.components.length - 3} more
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
    <Badge variant="outline" className={`${color} font-normal capitalize text-xs`}>
      {status}
    </Badge>
  );
};

export default ProgramList;
