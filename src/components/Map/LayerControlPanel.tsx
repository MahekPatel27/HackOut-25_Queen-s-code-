import React from 'react';
import { useMap } from '../../contexts/MapContext';
import { MapLayer } from '../../contexts/MapContext';
import { Layers, Eye, EyeOff, Settings } from 'lucide-react';

const LayerControlPanel: React.FC = () => {
  const { state, dispatch } = useMap();

  const handleToggleLayer = (layerId: string) => {
    dispatch({ type: 'TOGGLE_LAYER', layerId });
  };

  const handleOpacityChange = (layerId: string, opacity: number) => {
    dispatch({ type: 'SET_LAYER_OPACITY', layerId, opacity });
  };

  const getLayerIcon = (type: MapLayer['type']) => {
    switch (type) {
      case 'solar':
        return '☀️';
      case 'wind':
        return '💨';
      case 'water':
        return '💧';
      case 'grid':
        return '⚡';
      case 'landuse':
        return '🌱';
      case 'infrastructure':
        return '🏗️';
      default:
        return '📍';
    }
  };

  const getLayerColor = (type: MapLayer['type']) => {
    switch (type) {
      case 'solar':
        return 'border-solar-500 bg-solar-50';
      case 'wind':
        return 'border-wind-500 bg-wind-50';
      case 'water':
        return 'border-blue-500 bg-blue-50';
      case 'grid':
        return 'border-purple-500 bg-purple-50';
      case 'landuse':
        return 'border-green-500 bg-green-50';
      case 'infrastructure':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="map-control w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Layers className="w-5 h-5 mr-2" />
          Map Layers
        </h3>
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {state.layers.map((layer) => (
          <div key={layer.id} className="layer-toggle">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{getLayerIcon(layer.type)}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                  <button
                    onClick={() => handleToggleLayer(layer.id)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    {layer.visible ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                
                {layer.visible && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Opacity</span>
                      <span>{Math.round(layer.opacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={layer.opacity}
                      onChange={(e) => handleOpacityChange(layer.id, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Layer Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Solar: Renewable energy potential</p>
          <p>• Wind: Wind resource assessment</p>
          <p>• Water: Water availability & quality</p>
          <p>• Grid: Power infrastructure</p>
          <p>• Land: Land use classification</p>
          <p>• Infrastructure: Existing facilities</p>
        </div>
      </div>
    </div>
  );
};

export default LayerControlPanel;
