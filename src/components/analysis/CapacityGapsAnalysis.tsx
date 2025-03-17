
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCapacityGaps, programsData } from '@/data/programData';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const CapacityGapsAnalysis = () => {
  const capacityGaps = getCapacityGaps();
  
  // Find TA components across all programs
  const getTAComponents = () => {
    const taComponents: any[] = [];
    
    programsData.forEach(program => {
      program.components.forEach(component => {
        if (component.fundingCategory === 'TA') {
          taComponents.push({
            ...component,
            programName: program.name
          });
        }
      });
    });
    
    return taComponents;
  };
  
  const taComponents = getTAComponents();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Capacity Gaps Analysis</CardTitle>
          <CardDescription>
            Government capacity gaps and technical assistance coverage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Capacity Gaps</h3>
              <div className="space-y-4">
                {Object.entries(capacityGaps).map(([area, details], index) => (
                  <Alert key={index} variant={details.taFunded.startsWith('Yes') ? 'default' : 'destructive'}>
                    <div className="flex items-center gap-2">
                      {details.taFunded.startsWith('Yes') ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : details.taFunded.startsWith('Partial') ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>{area}</AlertTitle>
                    </div>
                    <AlertDescription className="mt-2">
                      <p className="mb-1">{details.description}</p>
                      <div className="mt-2">
                        <span className="text-sm font-medium">TA Funded: </span>
                        <span className="text-sm">{details.taFunded}</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-sm font-medium">Gap: </span>
                        <span className="text-sm">{details.gap}</span>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Technical Assistance Components</h3>
              <ScrollArea className="h-[500px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Component</TableHead>
                      <TableHead>Funding</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taComponents.map((component, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm font-medium">{component.programName}</TableCell>
                        <TableCell className="text-sm">{component.name}</TableCell>
                        <TableCell className="text-sm">${(component.fundingAmount / 1000000).toFixed(1)}M</TableCell>
                        <TableCell>
                          <div className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${component.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                            ${component.status === 'in progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                            ${component.status === 'planned' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : ''}
                            ${component.status === 'delayed' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' : ''}
                          `}>
                            {component.status}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CapacityGapsAnalysis;
