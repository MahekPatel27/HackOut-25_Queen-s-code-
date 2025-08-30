import React from 'react';
import { Target, Info } from 'lucide-react';

const HeatmapLegend: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900 flex items-center">
          <Target className="w-4 h-4 mr-2 text-primary-600" />
          Suitability Score
        </h4>
        <button className="text-gray-400 hover:text-gray-600">
          <Info className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-[#2c974b]"></div>
          <span className="text-sm text-gray-700">Excellent (90-100)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-[#91cf60]"></div>
          <span className="text-sm text-gray-700">High (70-89)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-[#ff9933]"></div>
          <span className="text-sm text-gray-700">Medium (40-69)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-[#1f4e79]"></div>
          <span className="text-sm text-gray-700">Low (0-39)</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Based on renewable resources, infrastructure proximity, and policy factors for Indian hydrogen production sites
        </p>
      </div>
    </div>
  );
};

export default HeatmapLegend;
