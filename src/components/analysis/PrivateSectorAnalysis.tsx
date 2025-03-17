
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPrivateSectorPartners, programsData } from '@/data/programData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const PrivateSectorAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const privateSectorPartners = getPrivateSectorPartners();
  
  const getPartnersWithPrograms = () => {
    const partnerMap: Record<string, Set<string>> = {};
    
    programsData.forEach(program => {
      program.components.forEach(component => {
        if (component.privatePartners) {
          component.privatePartners.forEach(partner => {
            if (!partnerMap[partner]) partnerMap[partner] = new Set();
            partnerMap[partner].add(program.name);
          });
        }
      });
    });
    
    return Object.entries(partnerMap).map(([partner, programs]) => ({
      name: partner,
      programs: Array.from(programs)
    }));
  };
  
  const partnersWithPrograms = getPartnersWithPrograms();
  
  const getPartnersWithSectors = () => {
    const partnerSectors: Record<string, Set<string>> = {};
    
    programsData.forEach(program => {
      program.components.forEach(component => {
        if (component.privatePartners) {
          component.privatePartners.forEach(partner => {
            if (!partnerSectors[partner]) partnerSectors[partner] = new Set();
            partnerSectors[partner].add(component.sector);
          });
        }
      });
    });
    
    return Object.entries(partnerSectors).map(([partner, sectors]) => ({
      name: partner,
      sectors: Array.from(sectors)
    }));
  };
  
  const partnersWithSectors = getPartnersWithSectors();
  
  const filteredPartners = partnersWithPrograms.filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Private Sector Participation Analysis</CardTitle>
          <CardDescription>
            Private sector partners developing projects in the DRC energy sector
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Input
              placeholder="Search private sector partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Tabs defaultValue="by-program" className="space-y-4">
            <TabsList>
              <TabsTrigger value="by-program">By Program</TabsTrigger>
              <TabsTrigger value="by-sector">By Sector</TabsTrigger>
            </TabsList>
            
            <TabsContent value="by-program">
              <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Partner</TableHead>
                      <TableHead>Programs</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPartners.map((partner, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {partner.programs.map((program, idx) => (
                              <Badge key={idx} variant="outline">
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="by-sector">
              <ScrollArea className="h-[400px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Partner</TableHead>
                      <TableHead>Sectors</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnersWithSectors
                      .filter(partner => partner.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((partner, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{partner.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {partner.sectors.map((sector, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {sector}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivateSectorAnalysis;
