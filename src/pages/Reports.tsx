import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  FileText, 
  Download, 
  Share2, 
  Mail, 
  Link, 
  FileText as FilePdf, 
  FileSpreadsheet, 
  Map,
  BarChart3,
  Globe,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'site' | 'analysis' | 'policy' | 'comprehensive';
  estimatedTime: string;
}

const Reports: React.FC = () => {
  const { state: authState } = useAuth();
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'geojson'>('pdf');
  const [includeMaps, setIncludeMaps] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeData, setIncludeData] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'site-analysis',
      name: 'Site Suitability Report',
      description: 'Detailed analysis of selected hydrogen production sites with suitability scores and resource indices',
      icon: Map,
      category: 'site',
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'comparative-analysis',
      name: 'Site Comparison Report',
      description: 'Side-by-side comparison of multiple sites with visual charts and metrics',
      icon: BarChart3,
      category: 'analysis',
      estimatedTime: '3-4 minutes'
    },
    {
      id: 'policy-insights',
      name: 'Policy & Investment Insights',
      description: 'Comprehensive overview of state and national policies, incentives, and investment opportunities',
      icon: Globe,
      category: 'policy',
      estimatedTime: '4-5 minutes'
    },
    {
      id: 'comprehensive-atlas',
      name: 'Comprehensive Hydrogen Atlas',
      description: 'Complete report including all data layers, analysis results, and policy recommendations',
      icon: FileText,
      category: 'comprehensive',
      estimatedTime: '8-10 minutes'
    }
  ];

  const handleTemplateSelection = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleGenerateReport = async () => {
    if (selectedTemplates.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    
    // Show success message or download
    console.log('Report generated successfully');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'site': return 'bg-blue-100 text-blue-800';
      case 'analysis': return 'bg-green-100 text-green-800';
      case 'policy': return 'bg-purple-100 text-purple-800';
      case 'comprehensive': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'site': return 'Site Analysis';
      case 'analysis': return 'Comparative';
      case 'policy': return 'Policy';
      case 'comprehensive': return 'Comprehensive';
      default: return 'Other';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Export</h1>
          <p className="text-gray-600">Generate comprehensive reports and export data for your hydrogen projects</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Report Templates */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Report Templates</h2>
              <div className="text-sm text-gray-500">
                {selectedTemplates.length} of {reportTemplates.length} selected
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedTemplates.includes(template.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleTemplateSelection(template.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedTemplates.includes(template.id) ? 'bg-primary-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          selectedTemplates.includes(template.id) ? 'text-primary-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(template.category)}`}>
                            {getCategoryLabel(template.category)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Est. time: {template.estimatedTime}
                        </div>
                      </div>
                      {selectedTemplates.includes(template.id) && (
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Options */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={exportFormat === 'pdf'}
                      onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'geojson')}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FilePdf className="w-4 h-4 text-red-600 mr-2" />
                      <span>PDF Report</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      checked={exportFormat === 'excel'}
                      onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'geojson')}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <FileSpreadsheet className="w-4 h-4 text-green-600 mr-2" />
                      <span>Excel Spreadsheet</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="geojson"
                      checked={exportFormat === 'geojson'}
                      onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel' | 'geojson')}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <Map className="w-4 h-4 text-blue-600 mr-2" />
                      <span>GeoJSON Data</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Content Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Include Content</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeMaps}
                      onChange={(e) => setIncludeMaps(e.target.checked)}
                      className="mr-3"
                    />
                    <span>Interactive Maps</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeCharts}
                      onChange={(e) => setIncludeCharts(e.target.checked)}
                      className="mr-3"
                    />
                    <span>Charts & Graphs</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeData}
                      onChange={(e) => setIncludeData(e.target.checked)}
                      className="mr-3"
                    />
                    <span>Raw Data Tables</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Preview */}
        <div className="lg:col-span-1">
          {/* Generate Report */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Report</h3>
            
            <button
              onClick={handleGenerateReport}
              disabled={selectedTemplates.length === 0 || isGenerating}
              className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <FileText className="w-5 h-5 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </button>

            {selectedTemplates.length === 0 && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Select at least one template to generate a report
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full btn-secondary flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download Sample Report
              </button>
              
              <button className="w-full btn-secondary flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Report
              </button>
              
              <button className="w-full btn-secondary flex items-center justify-center">
                <Link className="w-4 h-4 mr-2" />
                Share Link
              </button>
            </div>
          </div>

          {/* Report Preview */}
          {selectedTemplates.length > 0 && (
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h3>
              
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-600">Selected Templates:</p>
                  <ul className="mt-2 space-y-1">
                    {selectedTemplates.map(templateId => {
                      const template = reportTemplates.find(t => t.id === templateId);
                      return (
                        <li key={templateId} className="text-gray-800">
                          • {template?.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                <div className="text-sm">
                  <p className="text-gray-600">Format: <span className="font-medium">{exportFormat.toUpperCase()}</span></p>
                  <p className="text-gray-600">Estimated Size: <span className="font-medium">2-5 MB</span></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
