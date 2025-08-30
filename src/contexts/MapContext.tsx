import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  type: 'solar' | 'wind' | 'water' | 'grid' | 'landuse' | 'infrastructure';
  color: string;
}

export interface SuitabilityWeights {
  solar: number;
  wind: number;
  water: number;
  industryProximity: number;
  gridProximity: number;
  landAvailability: number;
}

export interface SiteData {
  id: string;
  name: string;
  coordinates: [number, number];
  state: string;
  district: string;
  solarIndex: number;
  windIndex: number;
  waterIndex: number;
  industryProximity: number;
  gridProximity: number;
  landAvailability: number;
  suitabilityScore: number;
  policyZone: string;
  existingInfrastructure: string[];
}

interface MapState {
  layers: MapLayer[];
  suitabilityWeights: SuitabilityWeights;
  selectedSite: SiteData | null;
  heatmapMode: boolean;
  searchQuery: string;
  filteredSites: SiteData[];
}

type MapAction =
  | { type: 'TOGGLE_LAYER'; layerId: string }
  | { type: 'SET_LAYER_OPACITY'; layerId: string; opacity: number }
  | { type: 'UPDATE_SUITABILITY_WEIGHTS'; weights: Partial<SuitabilityWeights> }
  | { type: 'SELECT_SITE'; site: SiteData | null }
  | { type: 'TOGGLE_HEATMAP_MODE' }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SET_FILTERED_SITES'; sites: SiteData[] };

const initialState: MapState = {
  layers: [
    { id: 'solar', name: 'Solar Potential', visible: true, opacity: 0.7, type: 'solar', color: '#f59e0b' },
    { id: 'wind', name: 'Wind Potential', visible: true, opacity: 0.7, type: 'wind', color: '#3b82f6' },
    { id: 'water', name: 'Water Availability', visible: true, opacity: 0.7, type: 'water', color: '#0ea5e9' },
    { id: 'grid', name: 'Power Grid & Transport', visible: true, opacity: 0.8, type: 'grid', color: '#8b5cf6' },
    { id: 'landuse', name: 'Land Use', visible: false, opacity: 0.6, type: 'landuse', color: '#84cc16' },
    { id: 'infrastructure', name: 'Existing Infrastructure', visible: true, opacity: 0.9, type: 'infrastructure', color: '#ef4444' },
  ],
  suitabilityWeights: {
    solar: 30,
    wind: 25,
    water: 20,
    industryProximity: 15,
    gridProximity: 5,
    landAvailability: 5,
  },
  selectedSite: null,
  heatmapMode: false,
  searchQuery: '',
  filteredSites: [],
};

function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case 'TOGGLE_LAYER':
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === action.layerId
            ? { ...layer, visible: !layer.visible }
            : layer
        ),
      };
    case 'SET_LAYER_OPACITY':
      return {
        ...state,
        layers: state.layers.map(layer =>
          layer.id === action.layerId
            ? { ...layer, opacity: action.opacity }
            : layer
        ),
      };
    case 'UPDATE_SUITABILITY_WEIGHTS':
      return {
        ...state,
        suitabilityWeights: { ...state.suitabilityWeights, ...action.weights },
      };
    case 'SELECT_SITE':
      return {
        ...state,
        selectedSite: action.site,
      };
    case 'TOGGLE_HEATMAP_MODE':
      return {
        ...state,
        heatmapMode: !state.heatmapMode,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.query,
      };
    case 'SET_FILTERED_SITES':
      return {
        ...state,
        filteredSites: action.sites,
      };
    default:
      return state;
  }
}

interface MapContextType {
  state: MapState;
  dispatch: React.Dispatch<MapAction>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
