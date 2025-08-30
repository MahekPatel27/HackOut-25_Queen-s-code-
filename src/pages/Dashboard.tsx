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
  Award
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  const getRoleBasedStats = () => {
    const { role } = authState.user!;
    
    switch (role) {
      case 'investor':
        return [
          { label: 'Investment Zones', value: '28', icon: Building2, color: 'text-blue-600' },
          { label: 'ROI Range', value: '15-25%', icon: TrendingUp, color: 'text-green-600' },
          { label: 'Active Projects', value: '156', icon: Target, color: 'text-purple-600' },
        ];
      case 'policyAnalyst':
        return [
          { label: 'Active Policies', value: '42', icon: Globe, color: 'text-indigo-600' },
          { label: 'State Incentives', value: '18', icon: Award, color: 'text-yellow-600' },
          { label: 'Policy Updates', value: '7', icon: FileText, color: 'text-red-600' },
        ];
      case 'planner':
        return [
          { label: 'Suitable Sites', value: '1,247', icon: Target, color: 'text-green-600' },
          { label: 'Active Layers', value: '6', icon: Layers, color: 'text-blue-600' },
          { label: 'Saved Projects', value: '23', icon: FileText, color: 'text-purple-600' },
        ];
      default:
        return [
          { label: 'Total Sites', value: '1,247', icon: Target, color: 'text-green-600' },
          { label: 'States Covered', value: '28', icon: Globe, color: 'text-blue-600' },
          { label: 'Data Sources', value: '15', icon: FileText, color: 'text-purple-600' },
        ];
    }
  };

  const getRoleBasedQuickActions = () => {
    const { role } = authState.user!;
    
    switch (role) {
      case 'investor':
        return [
          { title: 'ROI Calculator', description: 'Calculate potential returns on hydrogen investments', icon: TrendingUp, action: () => console.log('ROI Calculator') },
          { title: 'Investment Zones', description: 'Explore high-potential investment areas', icon: Building2, action: () => console.log('Investment Zones') },
          { title: 'Market Analysis', description: 'View market trends and projections', icon: BarChart3, action: () => console.log('Market Analysis') },
        ];
      case 'policyAnalyst':
        return [
          { title: 'Policy Database', description: 'Access comprehensive policy information', icon: Globe, action: () => console.log('Policy Database') },
          { title: 'Incentive Tracker', description: 'Monitor state and national incentives', icon: Award, action: () => console.log('Incentive Tracker') },
          { title: 'Impact Assessment', description: 'Evaluate policy effectiveness', icon: BarChart3, action: () => console.log('Impact Assessment') },
        ];
      case 'planner':
        return [
          { title: 'Layer Manager', description: 'Customize map layers and visualization', icon: Layers, action: () => console.log('Layer Manager') },
          { title: 'Scenario Planning', description: 'Create and compare different scenarios', icon: BarChart3, action: () => console.log('Scenario Planning') },
          { title: 'Site Comparison', description: 'Compare multiple sites side by side', icon: Target, action: () => console.log('Site Comparison') },
        ];
      default:
        return [
          { title: 'Explore Map', description: 'Interactive mapping and analysis', icon: Map, action: () => navigate('/map') },
          { title: 'Run Analysis', description: 'Site suitability and feasibility analysis', icon: BarChart3, action: () => navigate('/analysis') },
          { title: 'Generate Report', description: 'Create comprehensive reports', icon: FileText, action: () => navigate('/reports') },
        ];
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {authState.user?.name}! 👋
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          India's Hydrogen Atlas - Plan smarter, invest better. 
          Access comprehensive data and tools for hydrogen infrastructure planning.
        </p>
      </div>

      {/* Role-based Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getRoleBasedStats().map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getRoleBasedQuickActions().map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={action.action}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary-50 text-primary-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600 mb-4">{action.description}</p>
                    <div className="flex items-center text-primary-600 font-medium">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity & Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New solar potential data updated for Rajasthan</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Wind assessment completed for Gujarat coast</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Policy update: New incentives for Tamil Nadu</span>
            </div>
          </div>
        </div>

        {/* System Updates */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Updates</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">New heatmap visualization</span>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Live</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Enhanced site comparison tool</span>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">New</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Updated policy database</span>
              <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Updated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary-50 to-hydrogen-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to explore India's hydrogen potential?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Start with the interactive map to visualize renewable resources, analyze site suitability, 
            and generate comprehensive reports for your hydrogen projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/map')}
              className="btn-primary flex items-center justify-center"
            >
              <Map className="w-5 h-5 mr-2" />
              Explore Interactive Map
            </button>
            <button 
              onClick={() => navigate('/analysis')}
              className="btn-secondary flex items-center justify-center"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Run Suitability Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
