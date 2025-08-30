import React from 'react';
import { SiteData } from '../../contexts/MapContext';
import { X, Download, Share2, BarChart3, MapPin, Building2, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface SiteInfoPanelProps {
  site: SiteData;
  onClose: () => void;
}

const SiteInfoPanel: React.FC<SiteInfoPanelProps> = ({ site, onClose }) => {
  const getSuitabilityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Poor';
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const chartData = [
    { name: 'Solar', value: site.solarIndex, color: '#f59e0b' },
    { name: 'Wind', value: site.windIndex, color: '#3b82f6' },
    { name: 'Water', value: site.waterIndex, color: '#0ea5e9' },
    { name: 'Industry', value: site.industryProximity, color: '#8b5cf6' },
    { name: 'Grid', value: site.gridProximity, color: '#10b981' },
    { name: 'Land', value: site.landAvailability, color: '#84cc16' },
  ];

  const handleExportReport = () => {
    // Generate and download site report
    console.log('Exporting report for:', site.name);
  };

  const handleShare = () => {
    // Share site information
    console.log('Sharing site:', site.name);
  };

  return (
    <div className="map-control w-96 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary-600" />
          Site Information
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Site Basic Info */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{site.name}</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{site.state}, {site.district}</span>
          </div>
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            <span>Policy Zone: {site.policyZone}</span>
          </div>
        </div>
      </div>

      {/* Suitability Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h5 className="font-semibold text-gray-900">Overall Suitability</h5>
          <span className={`suitability-score score-${getSuitabilityLabel(site.suitabilityScore).toLowerCase()}`}>
            {site.suitabilityScore}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-300"
            style={{
              width: `${site.suitabilityScore}%`,
              backgroundColor: getSuitabilityColor(site.suitabilityScore)
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {getSuitabilityLabel(site.suitabilityScore)} suitability for hydrogen production
        </p>
      </div>

      {/* Resource Indices Chart */}
      <div className="mb-6">
        <h5 className="font-semibold text-gray-900 mb-3">Resource Indices</h5>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number) => [`${value}/100`, 'Score']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="value" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="mb-6">
        <h5 className="font-semibold text-gray-900 mb-3">Detailed Metrics</h5>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Solar Index</p>
            <p className="text-lg font-semibold text-solar-600">{site.solarIndex}/100</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Wind Index</p>
            <p className="text-lg font-semibold text-wind-600">{site.windIndex}/100</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Water Index</p>
            <p className="text-lg font-semibold text-blue-600">{site.waterIndex}/100</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Industry Proximity</p>
            <p className="text-lg font-semibold text-purple-600">{site.industryProximity}/100</p>
          </div>
        </div>
      </div>

      {/* Existing Infrastructure */}
      {site.existingInfrastructure.length > 0 && (
        <div className="mb-6">
          <h5 className="font-semibold text-gray-900 mb-3">Existing Infrastructure</h5>
          <div className="flex flex-wrap gap-2">
            {site.existingInfrastructure.map((infra, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {infra}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={handleExportReport}
          className="flex-1 btn-primary flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
        <button
          onClick={handleShare}
          className="btn-secondary flex items-center justify-center"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
      </div>

      {/* Additional Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full btn-secondary flex items-center justify-center">
          <BarChart3 className="w-4 h-4 mr-2" />
          Run Detailed Analysis
        </button>
      </div>
    </div>
  );
};

export default SiteInfoPanel;
