import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useMap as useMapHook } from '../contexts/MapContext';
import { SiteData } from '../contexts/MapContext';
import LayerControlPanel from '../components/Map/LayerControlPanel';
import SiteInfoPanel from '../components/Map/SiteInfoPanel';
import HeatmapLegend from '../components/Map/HeatmapLegend';
import Logo from '../components/Logo/Logo';
import { 
  Eye, 
  EyeOff, 
  Target,
  Zap,
  MapPin,
  Globe,
  Leaf,
  Filter,
  GitCompare,
  Satellite,
  Map as MapIcon,
  Search,
  X,
  BarChart3
} from 'lucide-react';

// Enhanced mock data with more realistic Indian geographical and energy data
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
  },
  {
    id: '4',
    name: 'Karnataka Plateau',
    coordinates: [14.5, 76],
    state: 'Karnataka',
    district: 'Tumkur',
    solarIndex: 80,
    windIndex: 55,
    waterIndex: 65,
    industryProximity: 75,
    gridProximity: 80,
    landAvailability: 85,
    suitabilityScore: 82,
    policyZone: 'Tech Park',
    existingInfrastructure: ['Tech Hub', 'Grid Connection']
  },
  {
    id: '5',
    name: 'Maharashtra Industrial Cluster',
    coordinates: [19.5, 76],
    state: 'Maharashtra',
    district: 'Aurangabad',
    solarIndex: 72,
    windIndex: 50,
    waterIndex: 70,
    industryProximity: 95,
    gridProximity: 85,
    landAvailability: 60,
    suitabilityScore: 79,
    policyZone: 'SEZ',
    existingInfrastructure: ['Industrial Park', 'Port', 'Airport']
  },
  {
    id: '6',
    name: 'Ladakh High-Altitude Desert',
    coordinates: [34.5, 77.5],
    state: 'Ladakh',
    district: 'Leh',
    solarIndex: 90,
    windIndex: 45,
    waterIndex: 20,
    industryProximity: 30,
    gridProximity: 40,
    landAvailability: 95,
    suitabilityScore: 65,
    policyZone: 'Special Category',
    existingInfrastructure: ['Solar Plant']
  },
  {
    id: '7',
    name: 'Andhra Pradesh Coastal Zone',
    coordinates: [15.9129, 79.7400],
    state: 'Andhra Pradesh',
    district: 'Prakasam',
    solarIndex: 85,
    windIndex: 80,
    waterIndex: 90,
    industryProximity: 75,
    gridProximity: 80,
    landAvailability: 70,
    suitabilityScore: 82,
    policyZone: 'Coastal SEZ',
    existingInfrastructure: ['Port', 'Industrial Park']
  },
  {
    id: '8',
    name: 'Telangana Tech Corridor',
    coordinates: [17.3850, 78.4867],
    state: 'Telangana',
    district: 'Hyderabad',
    solarIndex: 78,
    windIndex: 40,
    waterIndex: 75,
    industryProximity: 95,
    gridProximity: 90,
    landAvailability: 45,
    suitabilityScore: 76,
    policyZone: 'Tech Hub',
    existingInfrastructure: ['Tech Park', 'Airport', 'Metro']
  },
  {
    id: '9',
    name: 'Kerala Green Belt',
    coordinates: [10.8505, 76.2711],
    state: 'Kerala',
    district: 'Thrissur',
    solarIndex: 65,
    windIndex: 70,
    waterIndex: 95,
    industryProximity: 60,
    gridProximity: 75,
    landAvailability: 40,
    suitabilityScore: 71,
    policyZone: 'Green Zone',
    existingInfrastructure: ['Hydroelectric Plant', 'Grid']
  },
  {
    id: '10',
    name: 'Punjab Agricultural Hub',
    coordinates: [31.1471, 75.3412],
    state: 'Punjab',
    district: 'Jalandhar',
    solarIndex: 72,
    windIndex: 35,
    waterIndex: 85,
    industryProximity: 80,
    gridProximity: 85,
    landAvailability: 60,
    suitabilityScore: 74,
    policyZone: 'Agricultural SEZ',
    existingInfrastructure: ['Agricultural Processing', 'Grid']
  },
  {
    id: '11',
    name: 'Haryana Industrial Zone',
    coordinates: [28.4595, 77.0266],
    state: 'Haryana',
    district: 'Gurugram',
    solarIndex: 75,
    windIndex: 45,
    waterIndex: 70,
    industryProximity: 95,
    gridProximity: 90,
    landAvailability: 50,
    suitabilityScore: 77,
    policyZone: 'Industrial SEZ',
    existingInfrastructure: ['Industrial Park', 'Airport', 'Metro']
  },
  {
    id: '12',
    name: 'Uttar Pradesh Solar Belt',
    coordinates: [26.8467, 80.9462],
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    solarIndex: 82,
    windIndex: 30,
    waterIndex: 80,
    industryProximity: 85,
    gridProximity: 80,
    landAvailability: 75,
    suitabilityScore: 78,
    policyZone: 'Solar Zone',
    existingInfrastructure: ['Solar Plant', 'Grid']
  }
];

// Demand centers data
const demandCenters = [
  { coordinates: [19.0760, 72.8777], name: "Mumbai Industrial Zone", level: "Very High" },
  { coordinates: [28.6139, 77.2090], name: "Delhi-NCR Demand Center", level: "Very High" },
  { coordinates: [13.0827, 80.2707], name: "Chennai Industrial Corridor", level: "High" },
  { coordinates: [22.5726, 88.3639], name: "Kolkata Industrial Area", level: "Medium" },
  { coordinates: [17.3850, 78.4867], name: "Hyderabad Tech Zone", level: "High" },
  { coordinates: [26.9124, 75.7873], name: "Jaipur Innovation Hub", level: "Medium" },
  { coordinates: [12.9716, 77.5946], name: "Bengaluru Tech Corridor", level: "Very High" },
  { coordinates: [23.0225, 72.5714], name: "Ahmedabad Industrial Hub", level: "High" },
  { coordinates: [25.3176, 82.9739], name: "Varanasi Cultural Zone", level: "Medium" },
  { coordinates: [30.7333, 76.7794], name: "Chandigarh Smart City", level: "Medium" }
];

// Heatmap component with fixed low intensity for beautiful visualization
const HeatmapLayer: React.FC<{ 
  sites: SiteData[], 
  weights: any, 
  visible: boolean
}> = ({ sites, weights, visible }) => {
  
  const heatmapData = useMemo(() => {
    if (!visible) return [];
    
    const points = [];
    for (const site of sites) {
      const score = calculateSuitabilityScore(site, weights);
      const lat = site.coordinates[0];
      const lng = site.coordinates[1];
      
      // Generate multiple points around the site center for heatmap effect
      const pointCount = 25; // Reduced for better visualization
      for (let i = 0; i < pointCount; i++) {
        const latOffset = (Math.random() - 0.5) * 1.5; // Reduced spread
        const lngOffset = (Math.random() - 0.5) * 1.5;
        
        points.push({
          lat: lat + latOffset,
          lng: lng + lngOffset,
          score: score
        });
      }
    }
    return points;
  }, [sites, weights, visible]);

  if (!visible) return null;

  return (
    <>
      {heatmapData.map((point, index) => (
        <CircleMarker
          key={`heatmap-${index}`}
          center={[point.lat, point.lng]}
          radius={8 * (point.score / 100)} // Fixed low intensity
          pathOptions={{
            color: getColorForScore(point.score),
            fillColor: getColorForScore(point.score),
            fillOpacity: 0.4, // Reduced opacity for subtle effect
            weight: 0
          }}
        />
      ))}
    </>
  );
};

// Helper function to calculate suitability score
const calculateSuitabilityScore = (site: SiteData, weights: any) => {
  let score = 0;
  
  // Calculate weighted score based on criteria
  score += (site.solarIndex / 100) * weights.solar;
  score += (site.windIndex / 100) * weights.wind;
  score += (site.waterIndex / 100) * weights.water;
  score += (site.industryProximity / 100) * weights.industryProximity;
  score += (site.gridProximity / 100) * weights.gridProximity;
  score += (site.landAvailability / 100) * weights.landAvailability;
  
  // Normalize to 100
  return Math.min(Math.round(score), 100);
};

// Helper function to get color based on suitability score
const getColorForScore = (score: number) => {
  if (score >= 90) return '#2c974b'; // Excellent - Green (Indian flag green)
  if (score >= 70) return '#91cf60'; // High - Light Green
  if (score >= 40) return '#ff9933'; // Medium - Saffron (Indian flag)
  return '#1f4e79'; // Low - Blue (Indian flag blue)
};

const MapView: React.FC = () => {
  const { state, dispatch } = useMapHook();
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [showSitePanel, setShowSitePanel] = useState(false);
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [comparedSites, setComparedSites] = useState<SiteData[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    state: '',
    minScore: 0,
    maxScore: 100,
    policyZone: '',
    hasInfrastructure: false
  });
  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
  const [criteriaWeights, setCriteriaWeights] = useState({
    solar: 35,
    wind: 15,
    water: 20,
    industryProximity: 15,
    gridProximity: 10,
    landAvailability: 5
  });

  // Filter sites based on current filters
  const filteredSites = useMemo(() => {
    return mockSites.filter(site => {
      const score = calculateSuitabilityScore(site, criteriaWeights);
      return (
        (!filters.state || site.state === filters.state) &&
        score >= filters.minScore &&
        score <= filters.maxScore &&
        (!filters.policyZone || site.policyZone === filters.policyZone) &&
        (!filters.hasInfrastructure || site.existingInfrastructure.length > 0)
      );
    });
  }, [filters, criteriaWeights]);

  const handleSiteClick = (site: SiteData) => {
    setSelectedSite(site);
    setShowSitePanel(true);
    dispatch({ type: 'SELECT_SITE', site });
  };

  const handleSiteCompare = (site: SiteData) => {
    if (comparedSites.find(s => s.id === site.id)) {
      setComparedSites(comparedSites.filter(s => s.id !== site.id));
    } else if (comparedSites.length < 3) {
      setComparedSites([...comparedSites, site]);
    }
  };

  const handleWeightChange = (key: string, value: number) => {
    setCriteriaWeights(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSuitabilityColor = (score: number) => {
    return getColorForScore(score);
  };

  const getSuitabilityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Poor';
  };

  // Calculate total weight
  const totalWeight = Object.values(criteriaWeights).reduce((sum, weight) => sum + weight, 0);

  // Get unique states and policy zones for filters
  const states = Array.from(new Set(mockSites.map(site => site.state)));
  const policyZones = Array.from(new Set(mockSites.map(site => site.policyZone)));

  return (
    <div className="h-full flex flex-col">
      {/* Map Header with Indian Hydrogen Atlas branding */}
      <div className="bg-gradient-to-r from-green-600 via-blue-700 to-green-800 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo size="md" showText={false} className="text-white" />
            <div>
              <h1 className="text-2xl font-bold">Indian Hydrogen Atlas</h1>
              <p className="text-green-100">भारत H2-Atlas - Supporting National Green Hydrogen Mission</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${showFilters ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'}`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${showComparison ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'}`}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </button>
            <button
              onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              {mapType === 'street' ? <Satellite className="w-4 h-4 mr-2" /> : <MapIcon className="w-4 h-4 mr-2" />}
              {mapType === 'street' ? 'Satellite' : 'Street'}
            </button>
            <button
              onClick={() => setShowLayerPanel(!showLayerPanel)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              {showLayerPanel ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showLayerPanel ? 'Hide' : 'Show'} Layers
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_HEATMAP_MODE' })}
              className={`bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors ${state.heatmapMode ? 'ring-2 ring-green-300' : ''}`}
            >
              <Target className="w-4 h-4 mr-2" />
              {state.heatmapMode ? 'Heatmap Active' : 'Enable Heatmap'}
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[23.5937, 78.9629]} // Center of India
          zoom={5}
          className="h-full w-full"
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          {mapType === 'street' ? (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          ) : (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            />
          )}

          {/* Heatmap Layer */}
          <HeatmapLayer 
            sites={filteredSites}
            weights={criteriaWeights}
            visible={state.heatmapMode}
          />

          {/* Render sites as markers */}
          {filteredSites.map((site) => {
            const score = calculateSuitabilityScore(site, criteriaWeights);
            const isCompared = comparedSites.find(s => s.id === site.id);
            return (
              <Circle
                key={site.id}
                center={site.coordinates}
                radius={50000} // 50km radius
                pathOptions={{
                  color: getSuitabilityColor(score),
                  fillColor: getSuitabilityColor(score),
                  fillOpacity: 0.3,
                  weight: isCompared ? 4 : 2
                }}
                eventHandlers={{
                  click: () => handleSiteClick(site)
                }}
              >
                <Popup>
                  <div className="p-3 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900">{site.name}</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">State:</span>
                        <span className="font-medium">{site.state}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">District:</span>
                        <span className="font-medium">{site.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Suitability:</span>
                        <span className={`font-bold px-2 py-1 rounded text-white text-xs ${score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-blue-600' : score >= 40 ? 'bg-orange-500' : 'bg-red-600'}`}>
                          {score}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Policy Zone:</span>
                        <span className="font-medium">{site.policyZone}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleSiteClick(site)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleSiteCompare(site)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isCompared 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {isCompared ? 'Remove' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </Popup>
              </Circle>
            );
          })}

          {/* Demand Centers */}
          {demandCenters.map((center, index) => (
            <Marker
              key={`demand-${index}`}
              position={center.coordinates as [number, number]}
              icon={L.divIcon({
                html: `<div class="demand-marker bg-gradient-to-r from-blue-600 to-green-600 text-white p-2 rounded-full shadow-lg">
                          <i class="fas fa-industry"></i>
                        </div>`,
                className: '',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
            >
              <Popup>
                <div className="p-3 bg-white rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{center.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">Demand Level: <span className="font-medium text-blue-600">{center.level}</span></p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Heatmap legend when enabled */}
          {state.heatmapMode && (
            <div className="absolute top-4 right-4 z-[1000]">
              <HeatmapLegend />
            </div>
          )}
        </MapContainer>

        {/* Layer Control Panel */}
        {showLayerPanel && (
          <div className="absolute top-4 left-4 z-[1000]">
            <LayerControlPanel />
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className="absolute top-4 left-4 z-[1000] mt-80">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-5 w-80">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                Site Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={filters.state}
                    onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suitability Score Range</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.minScore}
                      onChange={(e) => setFilters(prev => ({ ...prev, minScore: parseInt(e.target.value) || 0 }))}
                      className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.maxScore}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxScore: parseInt(e.target.value) || 100 }))}
                      className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Zone</label>
                  <select
                    value={filters.policyZone}
                    onChange={(e) => setFilters(prev => ({ ...prev, policyZone: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Zones</option>
                    {policyZones.map(zone => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasInfrastructure"
                    checked={filters.hasInfrastructure}
                    onChange={(e) => setFilters(prev => ({ ...prev, hasInfrastructure: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="hasInfrastructure" className="ml-2 text-sm text-gray-700">
                    Has Existing Infrastructure
                  </label>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Showing {filteredSites.length} of {mockSites.length} sites
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Criteria Weights Panel */}
        {showLayerPanel && (
          <div className="absolute top-4 left-4 z-[1000] mt-80">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-5 w-80">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-500" />
                Site Suitability Criteria
              </h3>
              
              <div className="space-y-4">
                {Object.entries(criteriaWeights).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-semibold text-green-600">{value}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleWeightChange(key, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                ))}
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="text-center">
                    <span className="text-sm font-semibold text-gray-700">Total Weight: </span>
                    <span className={`text-lg font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalWeight}%
                    </span>
                  </div>
                  {totalWeight !== 100 && (
                    <p className="text-xs text-red-500 text-center mt-1">
                      Total must equal 100%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Site Comparison Panel */}
        {showComparison && comparedSites.length > 0 && (
          <div className="absolute top-4 right-4 z-[1000] w-96">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <GitCompare className="w-5 h-5 mr-2 text-blue-600" />
                  Site Comparison ({comparedSites.length}/3)
                </h3>
                <button
                  onClick={() => setComparedSites([])}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {comparedSites.map((site, index) => {
                  const score = calculateSuitabilityScore(site, criteriaWeights);
                  return (
                    <div key={site.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{site.name}</h4>
                        <button
                          onClick={() => handleSiteCompare(site)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">State:</span>
                          <span className="font-medium">{site.state}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Score:</span>
                          <span className={`font-bold px-2 py-1 rounded text-white text-xs ${score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-blue-600' : score >= 40 ? 'bg-orange-500' : 'bg-red-600'}`}>
                            {score}/100
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Solar:</span>
                          <span className="font-medium">{site.solarIndex}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Wind:</span>
                          <span className="font-medium">{site.windIndex}/100</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button
                onClick={() => setShowComparison(false)}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2 inline" />
                Generate Comparison Report
              </button>
            </div>
          </div>
        )}

        {/* Site Information Panel */}
        {showSitePanel && selectedSite && (
          <div className="absolute top-4 right-4 z-[1000] w-96">
            <SiteInfoPanel 
              site={selectedSite} 
              onClose={() => {
                setShowSitePanel(false);
                setSelectedSite(null);
                dispatch({ type: 'SELECT_SITE', site: null });
              }}
            />
          </div>
        )}

        {/* National Mission Info Panel */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80">
            <div className="flex items-center space-x-2 mb-2">
              <Logo size="sm" showText={false} />
              <h4 className="font-semibold text-gray-900">National Green Hydrogen Mission</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Supporting India's target of 5 MMT annual green hydrogen production by 2030
            </p>
            <div className="text-xs text-gray-500">
              <p>• MNRE • NIWE • CWC • Bhuvan • Invest India</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapView;
