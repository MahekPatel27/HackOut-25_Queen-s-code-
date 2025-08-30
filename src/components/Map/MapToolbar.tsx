import React from 'react';
import { useMap } from '../../contexts/MapContext';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Crosshair, 
  Layers,
  Search,
  Download,
  Share2
} from 'lucide-react';

const MapToolbar: React.FC = () => {
  const { state, dispatch } = useMap();

  const handleZoomIn = () => {
    // Implement zoom in functionality
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    // Implement zoom out functionality
    console.log('Zoom out');
  };

  const handleResetView = () => {
    // Reset map to default view
    console.log('Reset view');
  };

  const handleLocateMe = () => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleExportMap = () => {
    // Export current map view
    console.log('Export map');
  };

  const handleShareMap = () => {
    // Share current map view
    console.log('Share map');
  };

  return (
    <div className="map-control">
      <div className="flex flex-col space-y-2">
        {/* Zoom Controls */}
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </button>
        
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-gray-700" />
        </button>

        {/* Reset View */}
        <button
          onClick={handleResetView}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4 text-gray-700" />
        </button>

        {/* Locate Me */}
        <button
          onClick={handleLocateMe}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Locate Me"
        >
          <Crosshair className="w-4 h-4 text-gray-700" />
        </button>

        {/* Layer Toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_LAYER', layerId: 'all' })}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Toggle All Layers"
        >
          <Layers className="w-4 h-4 text-gray-700" />
        </button>

        {/* Search */}
        <button
          onClick={() => {
            const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
            searchInput?.focus();
          }}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Search"
        >
          <Search className="w-4 h-4 text-gray-700" />
        </button>

        {/* Export */}
        <button
          onClick={handleExportMap}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Export Map"
        >
          <Download className="w-4 h-4 text-gray-700" />
        </button>

        {/* Share */}
        <button
          onClick={handleShareMap}
          className="p-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          title="Share Map"
        >
          <Share2 className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Heatmap Toggle */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_HEATMAP_MODE' })}
          className={`w-full p-2 rounded-lg transition-all duration-200 ${
            state.heatmapMode
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
          title="Toggle Heatmap"
        >
          <div className="w-4 h-4 mx-auto mb-1">
            <div className={`w-full h-2 rounded-full ${
              state.heatmapMode ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>
          </div>
          <span className="text-xs">Heatmap</span>
        </button>
      </div>
    </div>
  );
};

export default MapToolbar;
