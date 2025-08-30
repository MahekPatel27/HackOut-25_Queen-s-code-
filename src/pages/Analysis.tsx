import React, { useState } from 'react';
import { useMap } from '../contexts/MapContext';
import { SuitabilityWeights, SiteData } from '../contexts/MapContext';
import { 
  Sliders, 
  Target, 
  TrendingUp, 
  BarChart3, 
  Download,
  Share2,
  GitCompare,
  Filter,
  Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

// Mock data for demonstration
const mockSites: SiteData[] = [
  {
    id: '1',
    name: 'Jaisalmer Solar Hub',
    coordinates: [26.9117, 70.9228],
    state: 'Rajasthan',
    district: 'Jaisalmer',
    solarIndex: 95,
    windIndex: 65,
    waterIndex: 30,
    industryProximity: 70,
    gridProximity: 85,
    landAvailability: 90,
    suitabilityScore: 88,
    policyZone: 'SEZ',
    existingInfrastructure: ['Solar Plant', 'Grid Connection']
  },
  {
    id: '2',
    name: 'Gujarat Wind Corridor',
    coordinates: [22.2587, 71.1924],
    state: 'Gujarat',
    district: 'Surendranagar',
    solarIndex: 75,
    windIndex: 92,
    waterIndex: 60,
    industryProximity: 85,
    gridProximity: 90,
    landAvailability: 80,
    suitabilityScore: 85,
    policyZone: 'GIFT City',
    existingInfrastructure: ['Wind Farm', 'Port Access']
  },
  {
    id: '3',
    name: 'Tamil Nadu Industrial Zone',
    coordinates: [13.0827, 80.2707],
    state: 'Tamil Nadu',
    district: 'Chennai',
    solarIndex: 70,
    windIndex: 60,
    waterIndex: 85,
    industryProximity: 95,
    gridProximity: 90,
    landAvailability: 50,
    suitabilityScore: 78,
    policyZone: 'SEZ',
    existingInfrastructure: ['Industrial Park', 'Port', 'Airport']
  }
];

const Analysis: React.FC = () => {
  const { state, dispatch } = useMap();
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [filterState, setFilterState] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleWeightChange = (key: keyof SuitabilityWeights, value: number) => {
    const newWeights = { ...state.suitabilityWeights, [key]: value };
    dispatch({ type: 'UPDATE_SUITABILITY_WEIGHTS', weights: newWeights });
  };

  const handleSiteSelection = (siteId: string) => {
    setSelectedSites(prev => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId]
    );
  };

  const filteredSites = mockSites.filter(site => {
    const matchesState = filterState === 'all' || site.state === filterState;
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  const topSites = [...filteredSites]
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 5);

  const weightChartData = Object.entries(state.suitabilityWeights).map(([key, value]) => ({
    name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value,
    color: key === 'solar' ? '#f59e0b' : 
           key === 'wind' ? '#3b82f6' : 
           key === 'water' ? '#0ea5e9' : 
           key === 'industryProximity' ? '#8b5cf6' : 
           key === 'gridProximity' ? '#10b981' : '#84cc16'
  }));

  const totalWeight = Object.values(state.suitabilityWeights).reduce((sum, weight) => sum + weight, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suitability Analysis</h1>
          <p className="text-gray-600">Customize analysis parameters and compare hydrogen production sites</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </button>
          <button className="btn-primary flex items-center">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Weight Adjustment */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center mb-6">
              <Sliders className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Analysis Weights</h2>
            </div>

            <div className="space-y-6">
              {Object.entries(state.suitabilityWeights).map(([key, value]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <span className="text-sm font-semibold text-primary-600">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => handleWeightChange(key as keyof SuitabilityWeights, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Weight</span>
                  <span className={`text-sm font-semibold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalWeight}%
                  </span>
                </div>
                {totalWeight !== 100 && (
                  <p className="text-xs text-red-500 mt-1">
                    Total must equal 100% for accurate analysis
                  </p>
                )}
              </div>
            </div>

            {/* Weight Distribution Chart */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Weight Distribution</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={weightChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {weightChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}%`, 'Weight']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results and Comparison */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Sites */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Target className="w-6 h-6 text-green-600 mr-3" />
                Top 5 Suitable Sites
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`btn-secondary flex items-center ${showComparison ? 'bg-primary-100 text-primary-700' : ''}`}
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  Compare
                </button>
                <button className="btn-secondary flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-4 flex space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All States</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>

            {/* Sites List */}
            <div className="space-y-3">
              {topSites.map((site, index) => (
                <div
                  key={site.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedSites.includes(site.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSiteSelection(site.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{site.name}</h3>
                        <p className="text-sm text-gray-600">{site.state}, {site.district}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">{site.suitabilityScore}</div>
                      <div className="text-sm text-gray-500">/100</div>
                    </div>
                  </div>
                  
                  {/* Site Metrics */}
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium text-solar-600">{site.solarIndex}</div>
                      <div className="text-gray-500">Solar</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-wind-600">{site.windIndex}</div>
                      <div className="text-gray-500">Wind</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-600">{site.waterIndex}</div>
                      <div className="text-gray-500">Water</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Site Comparison */}
          {showComparison && selectedSites.length >= 2 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Metric</th>
                      {selectedSites.map(siteId => {
                        const site = mockSites.find(s => s.id === siteId);
                        return (
                          <th key={siteId} className="text-center py-2 px-4">
                            {site?.name}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-medium">Suitability Score</td>
                      {selectedSites.map(siteId => {
                        const site = mockSites.find(s => s.id === siteId);
                        return (
                          <td key={siteId} className="text-center py-2 px-4">
                            <span className="font-semibold text-primary-600">{site?.suitabilityScore}/100</span>
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-medium">Solar Index</td>
                      {selectedSites.map(siteId => {
                        const site = mockSites.find(s => s.id === siteId);
                        return (
                          <td key={siteId} className="text-center py-2 px-4 text-solar-600">
                            {site?.solarIndex}/100
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-medium">Wind Index</td>
                      {selectedSites.map(siteId => {
                        const site = mockSites.find(s => s.id === siteId);
                        return (
                          <td key={siteId} className="text-center py-2 px-4 text-wind-600">
                            {site?.windIndex}/100
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 font-medium">Water Index</td>
                      {selectedSites.map(siteId => {
                        const site = mockSites.find(s => s.id === siteId);
                        return (
                          <td key={siteId} className="text-center py-2 px-4 text-blue-600">
                            {site?.waterIndex}/100
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Policy Zone</td>
                      {selectedSites.map(siteId => {
                        const site = mockSites.find(s => s.id === siteId);
                        return (
                          <td key={siteId} className="text-center py-2 px-4">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {site?.policyZone}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
