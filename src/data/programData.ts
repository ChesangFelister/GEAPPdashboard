
export interface Component {
  id: string;
  name: string;
  description: string;
  fundingType: string;
  fundingSource: string;
  fundingAmount: number;
  currency: string;
  fundingCategory: 'capex' | 'opex' | 'TA' | 'other';
  startDate: string;
  endDate: string;
  outputs: string[];
  outcomes: string[];
  status: 'planned' | 'in progress' | 'completed' | 'delayed';
  location: string[];
  sector: string;
  partners: string[];
  privatePartners?: string[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  objective: string;
  components: Component[];
  totalFunding: number;
  currency: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in progress' | 'completed' | 'delayed';
  leadAgency: string;
  implementingPartners: string[];
  targetRegions: string[];
}

// Sample DRC M300 Compact data
export const programsData: Program[] = [
  {
    id: 'drc-m300',
    name: 'DRC M300 Compact',
    description: 'A comprehensive program to accelerate electricity access in the Democratic Republic of the Congo.',
    objective: 'Provide reliable electricity to 5 million households while enabling private investment in the electricity sector.',
    totalFunding: 300000000,
    currency: 'USD',
    startDate: '2023-06-01',
    endDate: '2028-05-31',
    status: 'in progress',
    leadAgency: 'Ministry of Energy',
    implementingPartners: ['MCA-DRC', 'ANSER', 'SNEL', 'USAID'],
    targetRegions: ['Kinshasa', 'North Kivu', 'South Kivu', 'Haut-Katanga'],
    components: [
      {
        id: 'drc-m300-c1',
        name: 'Grid Modernization',
        description: 'Upgrading and expansion of existing electricity grid infrastructure.',
        fundingType: 'Grant',
        fundingSource: 'World Bank',
        fundingAmount: 120000000,
        currency: 'USD',
        fundingCategory: 'capex',
        startDate: '2023-06-01',
        endDate: '2026-12-31',
        outputs: [
          'Rehabilitation of 500km of transmission lines',
          'Installation of smart meters in 250,000 households',
          'Upgrade of 10 substations'
        ],
        outcomes: [
          'Reduced technical losses by 30%',
          'Improved grid reliability with 50% fewer outages',
          'Increased revenue collection by 40%'
        ],
        status: 'in progress',
        location: ['Kinshasa', 'Lubumbashi'],
        sector: 'Grid Infrastructure',
        partners: ['SNEL', 'Ministry of Energy', 'REA'],
      },
      {
        id: 'drc-m300-c2',
        name: 'Off-Grid Solar Expansion',
        description: 'Supporting private sector investment in off-grid solar solutions.',
        fundingType: 'Concessional Loan',
        fundingSource: 'AfDB',
        fundingAmount: 85000000,
        currency: 'USD',
        fundingCategory: 'capex',
        startDate: '2023-09-01',
        endDate: '2027-08-31',
        outputs: [
          'Deployment of 1.5 million solar home systems',
          'Installation of 200 mini-grids in rural areas',
          'Training of 500 local technicians'
        ],
        outcomes: [
          'Electricity access to 3 million rural households',
          'Creation of 2000 jobs in the renewable energy sector',
          'Reduction of 1.5 million tons of CO2 emissions annually'
        ],
        status: 'in progress',
        location: ['North Kivu', 'South Kivu', 'Équateur', 'Kasai'],
        sector: 'Off-Grid Solar',
        partners: ['ANSER', 'Ministry of Energy'],
        privatePartners: ['Bboxx', 'ENGIE PowerCorner', 'Nuru'],
      },
      {
        id: 'drc-m300-c3',
        name: 'Capacity Building & Technical Assistance',
        description: 'Strengthening institutional capacity and technical expertise.',
        fundingType: 'Grant',
        fundingSource: 'USAID',
        fundingAmount: 45000000,
        currency: 'USD',
        fundingCategory: 'TA',
        startDate: '2023-07-01',
        endDate: '2028-05-31',
        outputs: [
          'Training of 200 government officials',
          'Development of electricity sector masterplan',
          'Implementation of energy access monitoring system'
        ],
        outcomes: [
          'Improved regulatory environment for private investment',
          'Enhanced planning and monitoring capacity',
          'Strengthened governance in the energy sector'
        ],
        status: 'in progress',
        location: ['Kinshasa', 'Nationwide'],
        sector: 'Capacity Building',
        partners: ['Ministry of Energy', 'SNEL', 'ANSER'],
      },
      {
        id: 'drc-m300-c4',
        name: 'Policy Reform and Private Sector Enablement',
        description: 'Reforms to enable private sector participation in the energy sector.',
        fundingType: 'Grant',
        fundingSource: 'Multiple Donors',
        fundingAmount: 50000000,
        currency: 'USD',
        fundingCategory: 'other',
        startDate: '2023-06-01',
        endDate: '2027-05-31',
        outputs: [
          'Review and update of energy sector legislation',
          'Establishment of public-private partnership framework',
          'Development of electricity tariff reform strategy'
        ],
        outcomes: [
          'Increased private sector investment in energy sector',
          'Improved financial sustainability of utilities',
          'More conducive business environment for energy companies'
        ],
        status: 'in progress',
        location: ['Nationwide'],
        sector: 'Policy & Regulatory Reform',
        partners: ['Ministry of Energy', 'Ministry of Finance', 'ANSER'],
      }
    ]
  },
  {
    id: 'snel-rehabilitation',
    name: 'SNEL Infrastructure Rehabilitation Project',
    description: 'Comprehensive rehabilitation of SNEL\'s electricity transmission and distribution infrastructure.',
    objective: 'Improve reliability and expand access to grid electricity by rehabilitating aging infrastructure.',
    totalFunding: 150000000,
    currency: 'USD',
    startDate: '2022-03-01',
    endDate: '2026-12-31',
    status: 'in progress',
    leadAgency: 'SNEL',
    implementingPartners: ['Ministry of Energy', 'ANSER', 'World Bank'],
    targetRegions: ['Kinshasa', 'Lubumbashi', 'Matadi', 'Kananga'],
    components: [
      {
        id: 'snel-rehab-c1',
        name: 'Transmission Network Upgrade',
        description: 'Rehabilitation and expansion of high-voltage transmission network.',
        fundingType: 'Loan',
        fundingSource: 'World Bank',
        fundingAmount: 85000000,
        currency: 'USD',
        fundingCategory: 'capex',
        startDate: '2022-03-01',
        endDate: '2025-12-31',
        outputs: [
          'Rehabilitation of 800km of transmission lines',
          'Upgrade of 15 major substations',
          'Installation of SCADA systems'
        ],
        outcomes: [
          'Reduced technical losses from 22% to 15%',
          'Improved grid stability and reduced outages',
          'Increased electricity supply to urban centers'
        ],
        status: 'in progress',
        location: ['Kinshasa', 'Lubumbashi', 'Matadi'],
        sector: 'Grid Infrastructure',
        partners: ['SNEL', 'Ministry of Energy'],
      },
      {
        id: 'snel-rehab-c2',
        name: 'Distribution Network Modernization',
        description: 'Modernization of distribution network and customer connections.',
        fundingType: 'Loan',
        fundingSource: 'AfDB',
        fundingAmount: 65000000,
        currency: 'USD',
        fundingCategory: 'capex',
        startDate: '2022-06-01',
        endDate: '2026-12-31',
        outputs: [
          'Installation of 300,000 prepaid meters',
          'Rehabilitation of distribution networks in 4 cities',
          'Establishment of computerized billing system'
        ],
        outcomes: [
          'Improved revenue collection by 60%',
          'Reduced non-technical losses by 20%',
          '150,000 new household connections'
        ],
        status: 'in progress',
        location: ['Kinshasa', 'Lubumbashi', 'Matadi', 'Kananga'],
        sector: 'Grid Infrastructure',
        partners: ['SNEL', 'Ministry of Energy'],
      }
    ]
  },
  {
    id: 'green-mini-grid',
    name: 'Green Mini-Grid Development Program',
    description: 'Support for development of renewable energy mini-grids in underserved areas.',
    objective: 'Establish sustainable mini-grid ecosystem to serve rural and peri-urban communities.',
    totalFunding: 75000000,
    currency: 'USD',
    startDate: '2021-09-01',
    endDate: '2026-08-31',
    status: 'in progress',
    leadAgency: 'ANSER',
    implementingPartners: ['Ministry of Energy', 'SNEL', 'REA'],
    targetRegions: ['North Kivu', 'South Kivu', 'Équateur', 'Kasai', 'Tanganyika'],
    components: [
      {
        id: 'gmg-c1',
        name: 'Mini-Grid Investment Facility',
        description: 'Financing facility for private developers of renewable mini-grids.',
        fundingType: 'Mixed (Grants & Loans)',
        fundingSource: 'Multiple Donors',
        fundingAmount: 50000000,
        currency: 'USD',
        fundingCategory: 'capex',
        startDate: '2021-09-01',
        endDate: '2026-08-31',
        outputs: [
          'Financing for 150 mini-grid projects',
          'Connection of 100,000 households',
          'Installation of 20MW renewable capacity'
        ],
        outcomes: [
          'Sustainable electricity access for 100,000 households',
          'Reduced energy costs for rural businesses',
          'Established commercial mini-grid sector'
        ],
        status: 'in progress',
        location: ['North Kivu', 'South Kivu', 'Équateur', 'Kasai', 'Tanganyika'],
        sector: 'Mini-Grids',
        partners: ['ANSER', 'Ministry of Energy'],
        privatePartners: ['PowerGen', 'ENGIE PowerCorner', 'Nuru', 'Virunga Power'],
      },
      {
        id: 'gmg-c2',
        name: 'Technical Assistance for Mini-Grid Development',
        description: 'Technical support for mini-grid developers and regulatory improvement.',
        fundingType: 'Grant',
        fundingSource: 'FCDO',
        fundingAmount: 25000000,
        currency: 'USD',
        fundingCategory: 'TA',
        startDate: '2021-09-01',
        endDate: '2026-08-31',
        outputs: [
          'Development of mini-grid regulatory framework',
          'Site identification and feasibility studies for 300 sites',
          'Training for 50 mini-grid developers'
        ],
        outcomes: [
          'Clear regulatory environment for mini-grid development',
          'Reduced development costs and risks',
          'Increased private sector participation'
        ],
        status: 'in progress',
        location: ['Nationwide'],
        sector: 'Mini-Grids',
        partners: ['ANSER', 'Ministry of Energy', 'REA'],
      }
    ]
  }
];

// Utility functions for data analysis

export const getTotalProgramFunding = (): number => {
  return programsData.reduce((total, program) => total + program.totalFunding, 0);
};

export const getComponentsByFundingCategory = (): Record<string, Component[]> => {
  const categories: Record<string, Component[]> = {
    capex: [],
    opex: [],
    TA: [],
    other: []
  };
  
  programsData.forEach(program => {
    program.components.forEach(component => {
      categories[component.fundingCategory].push(component);
    });
  });
  
  return categories;
};

export const getPrivateSectorPartners = (): string[] => {
  const partners = new Set<string>();
  
  programsData.forEach(program => {
    program.components.forEach(component => {
      if (component.privatePartners) {
        component.privatePartners.forEach(partner => {
          partners.add(partner);
        });
      }
    });
  });
  
  return Array.from(partners);
};

export const getTargetRegions = (): Record<string, number> => {
  const regions: Record<string, number> = {};
  
  programsData.forEach(program => {
    program.targetRegions.forEach(region => {
      if (!regions[region]) regions[region] = 0;
      regions[region] += program.totalFunding / program.targetRegions.length;
    });
  });
  
  return regions;
};

export const getProgramTimelines = () => {
  return programsData.map(program => ({
    id: program.id,
    name: program.name,
    start: new Date(program.startDate),
    end: new Date(program.endDate),
    components: program.components.map(comp => ({
      id: comp.id,
      name: comp.name,
      start: new Date(comp.startDate),
      end: new Date(comp.endDate),
      status: comp.status
    }))
  }));
};

export const getConnectionsProjection = (): Record<string, any> => {
  // This is a simplified projection - in a real app, this would be calculated from actual data
  return {
    Kinshasa: {
      2023: 50000,
      2024: 120000,
      2025: 200000,
      2026: 250000,
      2027: 300000,
      programs: ['DRC M300 Compact', 'SNEL Infrastructure Rehabilitation Project']
    },
    'North Kivu': {
      2023: 15000,
      2024: 45000,
      2025: 80000,
      2026: 120000,
      2027: 150000,
      programs: ['DRC M300 Compact', 'Green Mini-Grid Development Program']
    },
    'South Kivu': {
      2023: 12000,
      2024: 35000,
      2025: 65000,
      2026: 90000,
      2027: 120000,
      programs: ['DRC M300 Compact', 'Green Mini-Grid Development Program']
    },
    'Haut-Katanga': {
      2023: 20000,
      2024: 50000,
      2025: 85000,
      2026: 110000,
      2027: 150000,
      programs: ['DRC M300 Compact']
    }
  };
};

// Helper function to identify funding gaps
export const getFundingGaps = (): Record<string, any> => {
  // This would be based on needs assessment vs. available funding
  return {
    'Rural Electrification': {
      required: 450000000,
      available: 120000000,
      gap: 330000000,
      description: 'Significant gap in funding for rural areas outside provincial capitals'
    },
    'Grid Strengthening': {
      required: 300000000,
      available: 205000000,
      gap: 95000000,
      description: 'Additional funding needed for complete grid modernization'
    },
    'Capacity Building': {
      required: 75000000,
      available: 45000000,
      gap: 30000000,
      description: 'More TA required for local government and utility capacity'
    }
  };
};

// Helper function to identify capacity gaps
export const getCapacityGaps = (): Record<string, any> => {
  return {
    'Regulatory Development': {
      description: 'Need for enhanced capacity in energy regulation and oversight',
      taFunded: 'Partial - covered under DRC M300 Component 3',
      gap: 'Additional support needed for regulatory body strengthening'
    },
    'Project Management': {
      description: 'Limited capacity for managing large-scale infrastructure projects',
      taFunded: 'Yes - covered under multiple programs',
      gap: 'Gaps in local-level project management capacity'
    },
    'Financial Management': {
      description: 'Weaknesses in financial oversight and management of energy sector',
      taFunded: 'Partial - some aspects covered in SNEL rehabilitation',
      gap: 'Need for comprehensive financial management systems and training'
    },
    'Technical Operations': {
      description: 'Limited technical capacity for grid management and maintenance',
      taFunded: 'Yes - through SNEL rehabilitation project',
      gap: 'Need for expanded training programs for field technicians'
    }
  };
};
