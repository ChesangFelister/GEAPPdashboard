
import React, { useState } from 'react';
import ProgramList from "@/components/programs/ProgramList";
import ProgramDetail from "@/components/programs/ProgramDetail";
import { Program } from "@/data/programData";

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Programs Overview</h1>
        <p className="text-muted-foreground mt-2">
          Browse and analyze energy sector programs in the Democratic Republic of Congo
        </p>
      </div>

      {selectedProgram ? (
        <ProgramDetail 
          program={selectedProgram} 
          onBack={() => setSelectedProgram(null)} 
        />
      ) : (
        <ProgramList onSelectProgram={setSelectedProgram} />
      )}
    </div>
  );
};

export default Programs;
