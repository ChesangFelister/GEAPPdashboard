
import React from 'react';

interface SectorItemProps {
  name: string;
  companies: number;
}

const SectorItem = ({ name, companies }: SectorItemProps) => (
  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <span className="text-sm">{name}</span>
    <span className="text-sm font-medium">{companies}</span>
  </div>
);

export default SectorItem;
