import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Map, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Building2, 
  Globe,
  Zap,
  Layers,
  ArrowRight,
  Users,
  Target,
  Award,
  MapPin,
  Leaf,
  Sun,
  Wind,
  Droplets,
  Factory,
  Zap as Lightning
} from 'lucide-react';
import Logo from '../components/Logo/Logo';

const Dashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  const getRoleBasedStats = () => {
    const { role } = authState.user!;
    
    switch (role) {
      case 'investor':
        return [
          { label: 'Investment Zones', value: '28', icon: Building2, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'ROI Range', value: '15-25%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
          { label: 'Active Projects', value: '156', icon: Target, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        ];
      case 'policyAnalyst':
        return [
          { label: 'Active Policies', value: '42', icon: Globe, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
          { label: 'State Incentives', value: '18', icon: Award, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
          { label: 'Policy Updates', value: '7', icon: FileText, color: 'text-red-600', bgColor: 'bg-red-50' },
        ];
      case 'planner':
        return [
          { label: 'Suitable Sites', value: '1,247', icon: Target, color: 'text-green-600', bgColor: 'bg-green-50' },
          { label: 'Active Layers', value: '6', icon: Layers, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'Saved Projects', value: '23', icon: FileText, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        ];
      default:
        return [
          { label: 'Total Sites', value: '1,247', icon: Target, color: 'text-green-600', bgColor: 'bg-green-50' },
          { label: 'States Covered', value: '28', icon: Globe, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'Data Sources', value: '15', icon: FileText, color: 'text-purple-600', bgColor: 'bg-purple-50' },
        ];
    }
  };

  const getRoleBasedQuickActions = () => {
    const { role } = authState.user!;
    
    switch (role) {
      case 'investor':
        return [
          { title: 'ROI Calculator', description: 'Calculate potential returns on hydrogen investments', icon: TrendingUp, action: () => console.log('ROI Calculator'), color: 'from-blue-500 to-blue-600' },
          { title: 'Investment Zones', description: 'Explore high-potential investment areas', icon: Building2, action: () => console.log('Investment Zones'), color: 'from-green-500 to-green-600' },
          { title: 'Market Analysis', description: 'View market trends and projections', icon: BarChart3, action: () => console.log('Market Analysis'), color: 'from-purple-500 to-purple-600' },
        ];
      case 'policyAnalyst':
        return [
          { title: 'Policy Database', description: 'Access comprehensive policy information', icon: Globe, action: () => console.log('Policy Database'), color: 'from-indigo-500 to-indigo-600' },
          { title: 'Incentive Tracker', description: 'Monitor state and national incentives', icon: Award, action: () => console.log('Incentive Tracker'), color: 'from-yellow-500 to-yellow-600' },
          { title: 'Impact Assessment', description: 'Evaluate policy effectiveness', icon: BarChart3, action: () => console.log('Impact Assessment'), color: 'from-red-500 to-red-600' },
        ];
      case 'planner':
        return [
          { title: 'Layer Manager', description: 'Customize map layers and visualization', icon: Layers, action: () => console.log('Layer Manager'), color: 'from-blue-500 to-blue-600' },
          { title: 'Scenario Planning', description: 'Create and compare different scenarios', icon: BarChart3, action: () => console.log('Scenario Planning'), color: 'from-green-500 to-green-600' },
          { title: 'Site Comparison', description: 'Compare multiple sites side by side', icon: Target, action: () => console.log('Site Comparison'), color: 'from-purple-500 to-purple-600' },
        ];
      default:
        return [
          { title: 'Explore Map', description: 'Interactive mapping and analysis', icon: Map, action: () => navigate('/map'), color: 'from-green-500 to-green-600' },
          { title: 'Run Analysis', description: 'Site suitability and feasibility analysis', icon: BarChart3, action: () => navigate('/analysis'), color: 'from-blue-500 to-blue-600' },
          { title: 'Generate Report', description: 'Create comprehensive reports', icon: FileText, action: () => navigate('/reports'), color: 'from-purple-500 to-purple-600' },
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-700 to-green-800"></div>
        <div className="relative z-10 px-6 py-16 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Logo size="lg" showText={false} className="mr-4" />
              <h1 className="text-5xl font-bold">Indian Hydrogen Atlas</h1>
            </div>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome back, {authState.user?.name}! 👋
            </p>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Comprehensive geospatial analysis for optimal green hydrogen production and distribution across India. 
              Supporting the National Green Hydrogen Mission with data-driven insights and planning tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/map')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Map className="w-6 h-6 mr-2 inline" />
                Explore Interactive Atlas
              </button>
              <button 
                onClick={() => navigate('/analysis')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
              >
                <BarChart3 className="w-6 h-6 mr-2 inline" />
                Run Analysis
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/10 rounded-full"></div>
        </div>
      </div>

      <div className="px-6 py-12 max-w-7xl mx-auto">
        {/* Role-based Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {getRoleBasedStats().map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Indian Hydrogen Atlas?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform integrates multiple data sources to provide actionable insights for hydrogen infrastructure development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Geospatial Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Interactive maps showing renewable potential, water resources, and demand centers across all Indian states.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Site Suitability Scoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced algorithms evaluate locations based on multiple criteria to identify optimal hydrogen production sites.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Renewable Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Analyze solar, wind, and hydro potential to maximize green hydrogen production efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getRoleBasedQuickActions().map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={action.action}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{action.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-3xl p-12 text-white mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Indian Hydrogen Atlas</h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Supporting India's National Green Hydrogen Mission through data-driven insights and geospatial analysis. 
                Identify optimal locations for hydrogen production based on renewable resources, water availability, 
                infrastructure, and demand centers.
              </p>
              <button 
                onClick={() => navigate('/map')}
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started
              </button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sun className="w-8 h-8 text-yellow-300" />
                    </div>
                    <p className="text-sm text-green-100">Solar Potential</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Wind className="w-8 h-8 text-blue-300" />
                    </div>
                    <p className="text-sm text-green-100">Wind Resources</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Droplets className="w-8 h-8 text-cyan-300" />
                    </div>
                    <p className="text-sm text-green-100">Water Availability</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Factory className="w-8 h-8 text-purple-300" />
                    </div>
                    <p className="text-sm text-green-100">Industrial Proximity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">New solar potential data updated for Rajasthan</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Wind assessment completed for Gujarat coast</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Policy update: New incentives for Tamil Nadu</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Lightning className="w-5 h-5 text-white" />
              </div>
              System Updates
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">New heatmap visualization</span>
                <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">Live</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Enhanced site comparison tool</span>
                <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">New</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700">Updated policy database</span>
                <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full font-medium">Updated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 via-green-50 to-blue-100 rounded-3xl p-12 border border-blue-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to explore India's hydrogen potential?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Start with the interactive map to visualize renewable resources, analyze site suitability, 
              and generate comprehensive reports for your hydrogen projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigate('/map')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Map className="w-6 h-6 mr-3 inline" />
                Explore Interactive Map
              </button>
              <button 
                onClick={() => navigate('/analysis')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <BarChart3 className="w-6 h-6 mr-3 inline" />
                Run Suitability Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-green-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Logo size="md" showText={false} className="mr-3" />
              <h4 className="text-2xl font-bold">Indian Hydrogen Atlas</h4>
            </div>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Supporting India's National Green Hydrogen Mission through data-driven insights and geospatial analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-lg font-semibold mb-4 text-green-300">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Interactive Atlas</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">State Reports</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Policy Documents</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4 text-green-300">Resources</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Methodology</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Data Sources</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Research Papers</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4 text-green-300">Contact Us</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Partnerships</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Technical Support</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Feedback</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Data Contributions</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-blue-700">
            <p className="text-blue-200 mb-2">
              Indian Hydrogen Atlas - Supporting National Green Hydrogen Mission | Data Sources: MNRE, NIWE, CWC, Bhuvan, Invest India
            </p>
            <p className="text-blue-300 text-sm">All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
