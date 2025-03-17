
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { programsData } from '@/data/programData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgramStatusAnalysis = () => {
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedComponent, setSelectedComponent] = useState('');
  
  // Get program progress data
  const getProgramProgress = () => {
    return programsData.map(program => {
      const startDate = new Date(program.startDate).getTime();
      const endDate = new Date(program.endDate).getTime();
      const today = new Date().getTime();
      
      const totalDuration = endDate - startDate;
      const elapsedDuration = today - startDate;
      const timeProgress = Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);
      
      // Calculate completed components
      const completedComponents = program.components.filter(c => c.status === 'completed').length;
      const totalComponents = program.components.length;
      const componentProgress = (completedComponents / totalComponents) * 100;
      
      return {
        id: program.id,
        name: program.name,
        timeProgress: timeProgress,
        componentProgress: componentProgress,
        completedComponents,
        totalComponents,
        startDate: program.startDate,
        endDate: program.endDate,
        status: program.status,
        components: program.components
      };
    });
  };
  
  const programProgress = getProgramProgress();
  const filteredPrograms = selectedProgram === 'all' 
    ? programProgress 
    : programProgress.filter(p => p.id === selectedProgram);
  
  // Get components for selected program
  const getComponentsForProgram = () => {
    if (selectedProgram === 'all') return [];
    
    const program = programsData.find(p => p.id === selectedProgram);
    return program ? program.components : [];
  };
  
  const componentsForProgram = getComponentsForProgram();
  
  // Get component details if selected
  const getSelectedComponentDetails = () => {
    if (!selectedComponent) return null;
    
    const program = programsData.find(p => p.id === selectedProgram);
    if (!program) return null;
    
    return program.components.find(c => c.id === selectedComponent) || null;
  };
  
  const selectedComponentDetails = getSelectedComponentDetails();
  
  // Calculate program component status breakdown for charts
  const getComponentStatusBreakdown = () => {
    if (selectedProgram === 'all') {
      // Aggregate across all programs
      let statusCounts = { planned: 0, 'in progress': 0, completed: 0, delayed: 0 };
      
      programsData.forEach(program => {
        program.components.forEach(component => {
          statusCounts[component.status]++;
        });
      });
      
      return Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count
      }));
    } else {
      // For specific program
      const program = programsData.find(p => p.id === selectedProgram);
      if (!program) return [];
      
      let statusCounts = { planned: 0, 'in progress': 0, completed: 0, delayed: 0 };
      
      program.components.forEach(component => {
        statusCounts[component.status]++;
      });
      
      return Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count
      }));
    }
  };
  
  const componentStatusData = getComponentStatusBreakdown();
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };
  
  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'in progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'delayed': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Program Status Analysis</CardTitle>
          <CardDescription>
            Status and progress tracking for programs and components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-72">
              <label className="text-sm font-medium mb-2 block">
                Select Program:
              </label>
              <Select 
                onValueChange={(value) => {
                  setSelectedProgram(value);
                  setSelectedComponent('');
                }}
                defaultValue="all"
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {programsData.map(program => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedProgram !== 'all' && (
              <div className="w-full md:w-72">
                <label className="text-sm font-medium mb-2 block">
                  Select Component:
                </label>
                <Select 
                  onValueChange={setSelectedComponent}
                  value={selectedComponent}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Component" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Overview</SelectItem>
                    {componentsForProgram.map(component => (
                      <SelectItem key={component.id} value={component.id}>
                        {component.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {!selectedComponentDetails ? (
            <div className="space-y-6">
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={componentStatusData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Components" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Components</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{program.name}</TableCell>
                        <TableCell>
                          <div className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${getStatusColor(program.status)}
                          `}>
                            {program.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(program.startDate)} - {formatDate(program.endDate)}
                        </TableCell>
                        <TableCell>
                          <div className="w-32">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Time Progress</span>
                              <span>{Math.round(program.timeProgress)}%</span>
                            </div>
                            <Progress value={program.timeProgress} className="h-1.5 mb-2" />
                            
                            <div className="flex justify-between text-xs mb-1">
                              <span>Completion</span>
                              <span>{Math.round(program.componentProgress)}%</span>
                            </div>
                            <Progress value={program.componentProgress} className="h-1.5" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {program.completedComponents} of {program.totalComponents} completed
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">{selectedComponentDetails.name}</h3>
                  <p className="text-muted-foreground mb-4">{selectedComponentDetails.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Status</h4>
                      <div className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${getStatusColor(selectedComponentDetails.status)}
                      `}>
                        {selectedComponentDetails.status}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Timeline</h4>
                      <p className="text-sm">
                        {formatDate(selectedComponentDetails.startDate)} - {formatDate(selectedComponentDetails.endDate)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Funding</h4>
                      <p className="text-sm">
                        {selectedComponentDetails.fundingType} from {selectedComponentDetails.fundingSource}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${(selectedComponentDetails.fundingAmount / 1000000).toFixed(1)}M {selectedComponentDetails.currency}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Sector</h4>
                      <p className="text-sm">{selectedComponentDetails.sector}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Expected Outputs</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {selectedComponentDetails.outputs.map((output, idx) => (
                          <li key={idx}>{output}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Expected Outcomes</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {selectedComponentDetails.outcomes.map((outcome, idx) => (
                          <li key={idx}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Location</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedComponentDetails.location.map((loc, idx) => (
                          <div 
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md"
                          >
                            {loc}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Partners</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedComponentDetails.partners.map((partner, idx) => (
                          <div 
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md"
                          >
                            {partner}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedComponentDetails.privatePartners && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Private Sector Partners</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedComponentDetails.privatePartners.map((partner, idx) => (
                            <div 
                              key={idx}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-xs rounded-md"
                            >
                              {partner}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramStatusAnalysis;
