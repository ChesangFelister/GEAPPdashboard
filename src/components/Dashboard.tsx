
import React from 'react';
import MetricsSection from './dashboard/MetricsSection';
import ChartsSection from './dashboard/ChartsSection';
import TabsSection from './dashboard/TabsSection';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white -mt-26 p-8 rounded-b-xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">DRC Energy Data Hub</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Explore power sector programs in the Democratic Republic of Congo
          </p>
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors text-sm">
              Explore Programs
            </button>
            
            <button className="bg-blue-700/30 border border-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700/50 transition-colors text-sm ">
              View Map
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Program Metrics</h2>
          <MetricsSection />
        </div>
        
        <div className="bg-white/50 dark:bg-blue-800/50 backdrop-blur-sm p-5 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/20 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-gray-100 mb-4">Program Overview</h2>
          <ChartsSection />
        </div>
        
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-5 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900/20">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Program Details</h2>
          <TabsSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
