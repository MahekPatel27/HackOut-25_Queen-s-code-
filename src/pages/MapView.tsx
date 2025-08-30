import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useMap as useMapHook } from '../contexts/MapContext';
import { SiteData } from '../contexts/MapContext';
import LayerControlPanel from '../components/Map/LayerControlPanel';
import SiteInfoPanel from '../components/Map/SiteInfoPanel';
import HeatmapLegend from '../components/Map/HeatmapLegend';
import { 
  Eye, 
  EyeOff, 
  Target,
  Zap
} from 'lucide-react';

// Enhanced mock data with realistic Indian geographical and energy data
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
  { coordinates: [12.9716, 77.5946], name: "Bengaluru Tech Corridor", level: "Very High" }
];

// Heatmap component
const HeatmapLayer: React.FC<{ 
  sites: SiteData[], 
  weights: any, 
  visible: boolean,
  intensity: number 
}> = ({ sites, weights, visible, intensity }) => {
  
  const heatmapData = useMemo(() => {
    if (!visible) return [];
    
    const points = [];
    for (const site of sites) {
      const score = calculateSuitabilityScore(site, weights);
      const lat = site.coordinates[0];
      const lng = site.coordinates[1];
      
      // Generate multiple points around the site center for heatmap effect
      const pointCount = 30;
      for (let i = 0; i < pointCount; i++) {
        const latOffset = (Math.random() - 0.5) * 2;
        const lngOffset = (Math.random() - 0.5) * 2;
        
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
          radius={intensity * (point.score / 20)}
          pathOptions={{
            color: getColorForScore(point.score),
            fillColor: getColorForScore(point.score),
            fillOpacity: 0.6,
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
  if (score >= 90) return '#1a9850'; // Excellent - Green
  if (score >= 70) return '#91cf60'; // High - Light Green
  if (score >= 40) return '#fee090'; // Medium - Yellow
  return '#d73027'; // Low - Red
};

const MapView: React.FC = () => {
  const { state, dispatch } = useMapHook();
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [showSitePanel, setShowSitePanel] = useState(false);
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null);
  const [heatmapIntensity, setHeatmapIntensity] = useState(15);
  const [criteriaWeights, setCriteriaWeights] = useState({
    solar: 35,
    wind: 15,
    water: 20,
    industryProximity: 15,
    gridProximity: 10,
    landAvailability: 5
  });

  const handleSiteClick = (site: SiteData) => {
    setSelectedSite(site);
    setShowSitePanel(true);
    dispatch({ type: 'SELECT_SITE', site });
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

  return (
    <div className="h-full flex flex-col">
      {/* Map Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">भारत H2-Atlas - Interactive Map</h1>
            <p className="text-gray-600">India's first geospatial decision support tool for green hydrogen</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowLayerPanel(!showLayerPanel)}
              className="btn-secondary flex items-center"
            >
              {showLayerPanel ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showLayerPanel ? 'Hide' : 'Show'} Layers
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_HEATMAP_MODE' })}
              className={`btn-primary flex items-center ${state.heatmapMode ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              <Target className="w-4 h-4 mr-2" />
              {state.heatmapMode ? 'Heatmap On' : 'Heatmap Mode'}
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
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Heatmap Layer */}
          <HeatmapLayer 
            sites={mockSites}
            weights={criteriaWeights}
            visible={state.heatmapMode}
            intensity={heatmapIntensity}
          />

          {/* Render sites as markers */}
          {mockSites.map((site) => {
            const score = calculateSuitabilityScore(site, criteriaWeights);
            return (
              <Circle
                key={site.id}
                center={site.coordinates}
                radius={50000} // 50km radius
                pathOptions={{
                  color: getSuitabilityColor(score),
                  fillColor: getSuitabilityColor(score),
                  fillOpacity: 0.3,
                  weight: 2
                }}
                eventHandlers={{
                  click: () => handleSiteClick(site)
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900 mb-2">{site.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>State:</strong> {site.state}</p>
                      <p><strong>District:</strong> {site.district}</p>
                      <p><strong>Suitability Score:</strong> 
                        <span className={`ml-2 suitability-score score-${getSuitabilityLabel(score).toLowerCase()}`}>
                          {score}/100
                        </span>
                      </p>
                      <p><strong>Policy Zone:</strong> {site.policyZone}</p>
                    </div>
                    <button
                      onClick={() => handleSiteClick(site)}
                      className="mt-3 w-full btn-primary text-sm py-1"
                    >
                      View Details
                    </button>
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
                html: `<div class="demand-marker">
                          <i class="fas fa-industry"></i>
                        </div>`,
                className: '',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
              })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">{center.name}</h3>
                  <p className="text-sm text-gray-600">Demand Level: {center.level}</p>
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

        {/* Criteria Weights Panel */}
        {showLayerPanel && (
          <div className="absolute top-4 left-4 z-[1000] mt-80">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                Project Criteria Weights
              </h3>
              
              <div className="space-y-4">
                {Object.entries(criteriaWeights).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-semibold text-primary-600">{value}%</span>
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
                
                <div className="pt-2 border-t border-gray-200">
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

        {/* Heatmap Intensity Control */}
        {state.heatmapMode && (
          <div className="absolute top-4 right-4 z-[1000] mt-48">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Heatmap Intensity</h4>
              <input
                type="range"
                min="1"
                max="30"
                value={heatmapIntensity}
                onChange={(e) => setHeatmapIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
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


      </div>
    </div>
  );
};

export default MapView;
