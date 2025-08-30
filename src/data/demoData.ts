// Demo data for भारत H2-Atlas
// Realistic data based on actual Indian geographical and energy information

export interface HydrogenSite {
  id: string;
  name: string;
  coordinates: [number, number];
  state: string;
  district: string;
  solarIndex: number; // kWh/m²/day
  windIndex: number; // m/s
  waterIndex: number; // 1-5 scale
  industryProximity: number; // km to nearest industrial cluster
  gridProximity: number; // km to nearest grid connection
  waterSourceDistance: number; // km to water source
  landAvailability: number; // 1-10 scale
  suitabilityScore: number;
  policyZone: string;
  existingInfrastructure: string[];
  annualSunshine: string;
  elevation: number; // km
  landType: string;
  policyIncentives: string[];
  estimatedROI: string;
  projectTimeline: string;
}

export interface PolicyIncentive {
  id: string;
  name: string;
  type: 'central' | 'state' | 'local';
  description: string;
  eligibility: string;
  value: string;
  validity: string;
  source: string;
}

export const hydrogenSites: HydrogenSite[] = [
  {
    id: '1',
    name: 'Jaisalmer Solar Hub',
    coordinates: [26.9117, 70.9228],
    state: 'Rajasthan',
    district: 'Jaisalmer',
    solarIndex: 6.2,
    windIndex: 4.1,
    waterIndex: 3,
    industryProximity: 22,
    gridProximity: 18,
    waterSourceDistance: 12,
    landAvailability: 9,
    suitabilityScore: 88,
    policyZone: 'SEZ',
    existingInfrastructure: ['Solar Plant', 'Grid Connection', 'Road Network'],
    annualSunshine: '300+ days',
    elevation: 1.5,
    landType: 'Barren / Wasteland',
    policyIncentives: [
      'National Green Hydrogen Mission subsidy',
      'Rajasthan SEZ benefits',
      'Solar energy incentives',
      'Land lease benefits'
    ],
    estimatedROI: '18-25%',
    projectTimeline: '18-24 months'
  },
  {
    id: '2',
    name: 'Gujarat Wind Corridor',
    coordinates: [22.2587, 71.1924],
    state: 'Gujarat',
    district: 'Surendranagar',
    solarIndex: 5.8,
    windIndex: 4.8,
    waterIndex: 4,
    industryProximity: 12,
    gridProximity: 8,
    waterSourceDistance: 8,
    landAvailability: 9,
    suitabilityScore: 85,
    policyZone: 'GIFT City',
    existingInfrastructure: ['Wind Farm', 'Port Access', 'Industrial Zone'],
    annualSunshine: '280+ days',
    elevation: 0.1,
    landType: 'Coastal / Barren',
    policyIncentives: [
      'Gujarat Green Hydrogen Policy',
      'GIFT City benefits',
      'Coastal project incentives',
      'Export zone benefits'
    ],
    estimatedROI: '20-28%',
    projectTimeline: '16-22 months'
  },
  {
    id: '3',
    name: 'Tamil Nadu Industrial Zone',
    coordinates: [13.0827, 80.2707],
    state: 'Tamil Nadu',
    district: 'Chennai',
    solarIndex: 5.5,
    windIndex: 5.5,
    waterIndex: 4,
    industryProximity: 15,
    gridProximity: 10,
    waterSourceDistance: 10,
    landAvailability: 7,
    suitabilityScore: 78,
    policyZone: 'SEZ',
    existingInfrastructure: ['Industrial Park', 'Port', 'Airport', 'Tech Hub'],
    annualSunshine: '270+ days',
    elevation: 0.08,
    landType: 'Mixed Use',
    policyIncentives: [
      'Tamil Nadu Green Hydrogen Policy',
      'SEZ benefits',
      'Wind energy incentives',
      'Industrial cluster benefits'
    ],
    estimatedROI: '16-22%',
    projectTimeline: '20-26 months'
  },
  {
    id: '4',
    name: 'Karnataka Plateau',
    coordinates: [14.5, 76],
    state: 'Karnataka',
    district: 'Tumkur',
    solarIndex: 5.7,
    windIndex: 3.8,
    waterIndex: 4,
    industryProximity: 18,
    gridProximity: 14,
    waterSourceDistance: 15,
    landAvailability: 8,
    suitabilityScore: 82,
    policyZone: 'Tech Park',
    existingInfrastructure: ['Tech Hub', 'Grid Connection', 'Research Center'],
    annualSunshine: '290+ days',
    elevation: 0.9,
    landType: 'Plateau / Barren',
    policyIncentives: [
      'Karnataka Renewable Energy Policy',
      'Tech park benefits',
      'R&D incentives',
      'Startup benefits'
    ],
    estimatedROI: '17-24%',
    projectTimeline: '19-25 months'
  },
  {
    id: '5',
    name: 'Maharashtra Industrial Cluster',
    coordinates: [19.5, 76],
    state: 'Maharashtra',
    district: 'Aurangabad',
    solarIndex: 5.4,
    windIndex: 3.5,
    waterIndex: 4,
    industryProximity: 8,
    gridProximity: 6,
    waterSourceDistance: 9,
    landAvailability: 7,
    suitabilityScore: 79,
    policyZone: 'SEZ',
    existingInfrastructure: ['Industrial Park', 'Port', 'Airport', 'Logistics Hub'],
    annualSunshine: '260+ days',
    elevation: 0.06,
    landType: 'Mixed Use',
    policyIncentives: [
      'Maharashtra Industrial Policy',
      'SEZ benefits',
      'Port connectivity benefits',
      'Logistics incentives'
    ],
    estimatedROI: '19-26%',
    projectTimeline: '17-23 months'
  },
  {
    id: '6',
    name: 'Ladakh High-Altitude Desert',
    coordinates: [34.5, 77.5],
    state: 'Ladakh',
    district: 'Leh',
    solarIndex: 6.0,
    windIndex: 3.2,
    waterIndex: 2,
    industryProximity: 350,
    gridProximity: 200,
    waterSourceDistance: 25,
    landAvailability: 6,
    suitabilityScore: 65,
    policyZone: 'Special Category',
    existingInfrastructure: ['Solar Plant', 'Research Station'],
    annualSunshine: '320+ days',
    elevation: 3.5,
    landType: 'High-Altitude Desert',
    policyIncentives: [
      'Special category region status',
      'Border area development funds',
      'Renewable energy grants',
      'Central government subsidies'
    ],
    estimatedROI: '12-18%',
    projectTimeline: '30-36 months'
  }
];

export const demandCenters = [
  {
    id: '1',
    name: 'Mumbai Industrial Zone',
    coordinates: [19.0760, 72.8777],
    level: 'Very High',
    industries: ['Petrochemicals', 'Steel', 'Automotive', 'Pharmaceuticals'],
    hydrogenDemand: '500+ TPD',
    infrastructure: ['Port', 'Airport', 'Railway', 'Highway']
  },
  {
    id: '2',
    name: 'Delhi-NCR Demand Center',
    coordinates: [28.6139, 77.2090],
    level: 'Very High',
    industries: ['Automotive', 'Electronics', 'Textiles', 'Food Processing'],
    hydrogenDemand: '400+ TPD',
    infrastructure: ['Airport', 'Railway', 'Highway', 'Metro']
  },
  {
    id: '3',
    name: 'Chennai Industrial Corridor',
    coordinates: [13.0827, 80.2707],
    level: 'High',
    industries: ['Automotive', 'Electronics', 'Textiles', 'Chemicals'],
    hydrogenDemand: '300+ TPD',
    infrastructure: ['Port', 'Airport', 'Railway', 'Highway']
  },
  {
    id: '4',
    name: 'Kolkata Industrial Area',
    coordinates: [22.5726, 88.3639],
    level: 'Medium',
    industries: ['Steel', 'Textiles', 'Food Processing', 'Chemicals'],
    hydrogenDemand: '200+ TPD',
    infrastructure: ['Port', 'Railway', 'Highway']
  },
  {
    id: '5',
    name: 'Hyderabad Tech Zone',
    coordinates: [17.3850, 78.4867],
    level: 'High',
    industries: ['IT', 'Pharmaceuticals', 'Biotechnology', 'Electronics'],
    hydrogenDemand: '250+ TPD',
    infrastructure: ['Airport', 'Railway', 'Highway', 'Metro']
  },
  {
    id: '6',
    name: 'Jaipur Innovation Hub',
    coordinates: [26.9124, 75.7873],
    level: 'Medium',
    industries: ['Textiles', 'Handicrafts', 'Tourism', 'Food Processing'],
    hydrogenDemand: '150+ TPD',
    infrastructure: ['Airport', 'Railway', 'Highway']
  },
  {
    id: '7',
    name: 'Bengaluru Tech Corridor',
    coordinates: [12.9716, 77.5946],
    level: 'Very High',
    industries: ['IT', 'Biotechnology', 'Electronics', 'Aerospace'],
    hydrogenDemand: '350+ TPD',
    infrastructure: ['Airport', 'Railway', 'Highway', 'Metro']
  }
];

export const policyIncentives: PolicyIncentive[] = [
  {
    id: '1',
    name: 'National Green Hydrogen Mission',
    type: 'central',
    description: 'Comprehensive support for green hydrogen production and infrastructure',
    eligibility: 'All green hydrogen projects meeting technical criteria',
    value: 'Up to 50% of project cost',
    validity: '2023-2030',
    source: 'Ministry of New and Renewable Energy'
  },
  {
    id: '2',
    name: 'Gujarat Green Hydrogen Policy',
    type: 'state',
    description: 'State-specific incentives for green hydrogen projects',
    eligibility: 'Projects located in Gujarat',
    value: 'Additional 10-15% state benefits',
    validity: '2023-2028',
    source: 'Gujarat Government'
  },
  {
    id: '3',
    name: 'Tamil Nadu Green Hydrogen Policy',
    type: 'state',
    description: 'Comprehensive state policy for green hydrogen development',
    eligibility: 'Projects in Tamil Nadu with local value addition',
    value: 'Land subsidies and tax benefits',
    validity: '2023-2027',
    source: 'Tamil Nadu Government'
  },
  {
    id: '4',
    name: 'SEZ Benefits',
    type: 'central',
    description: 'Special Economic Zone benefits for export-oriented projects',
    eligibility: 'Projects in designated SEZs',
    value: 'Tax exemptions and duty benefits',
    validity: 'Ongoing',
    source: 'Ministry of Commerce'
  },
  {
    id: '5',
    name: 'Renewable Energy Incentives',
    type: 'central',
    description: 'Support for renewable energy integration',
    eligibility: 'Projects using renewable energy for hydrogen production',
    value: 'Generation-based incentives',
    validity: '2023-2030',
    source: 'MNRE'
  }
];

export const resourceData = {
  solar: {
    title: 'Solar Resource Assessment',
    description: 'Daily solar radiation data across India',
    unit: 'kWh/m²/day',
    source: 'National Institute of Solar Energy',
    ranges: {
      excellent: '6.0+',
      good: '5.0-5.9',
      moderate: '4.0-4.9',
      poor: '<4.0'
    }
  },
  wind: {
    title: 'Wind Resource Assessment',
    description: 'Wind speed and direction data',
    unit: 'm/s',
    source: 'National Institute of Wind Energy',
    ranges: {
      excellent: '5.5+',
      good: '4.5-5.4',
      moderate: '3.5-4.4',
      poor: '<3.5'
    }
  },
  water: {
    title: 'Water Resource Availability',
    description: 'Water availability and quality assessment',
    unit: 'Index (1-5)',
    source: 'Central Water Commission',
    ranges: {
      excellent: '4.5-5.0',
      good: '3.5-4.4',
      moderate: '2.5-3.4',
      poor: '1.0-2.4'
    }
  }
};

export const statesList = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Ladakh'
];

export default {
  hydrogenSites,
  demandCenters,
  policyIncentives,
  resourceData,
  statesList
};

