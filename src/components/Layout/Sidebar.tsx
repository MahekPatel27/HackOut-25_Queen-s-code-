import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Map, 
  BarChart3, 
  FileText, 
  Settings, 
  Home,
  Layers,
  TrendingUp,
  Building2,
  Globe,
  Zap
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { state: authState } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Dashboard', roles: ['planner', 'investor', 'policyAnalyst', 'researcher'] },
    { path: '/map', icon: Map, label: 'Interactive Map', roles: ['planner', 'investor', 'policyAnalyst', 'researcher'] },
    { path: '/analysis', icon: BarChart3, label: 'Suitability Analysis', roles: ['planner', 'investor', 'policyAnalyst'] },
    { path: '/reports', icon: FileText, label: 'Reports & Export', roles: ['planner', 'investor', 'policyAnalyst', 'researcher'] },
    { path: '/settings', icon: Settings, label: 'Settings', roles: ['planner', 'investor', 'policyAnalyst', 'researcher'] },
  ];

  const getRoleSpecificItems = () => {
    const { role } = authState.user!;
    
    switch (role) {
      case 'investor':
        return [
          { icon: TrendingUp, label: 'ROI Calculator', action: () => console.log('ROI Calculator') },
          { icon: Building2, label: 'Investment Zones', action: () => console.log('Investment Zones') },
        ];
      case 'policyAnalyst':
        return [
          { icon: Globe, label: 'Policy Database', action: () => console.log('Policy Database') },
          { icon: Zap, label: 'Incentive Tracker', action: () => console.log('Incentive Tracker') },
        ];
      case 'planner':
        return [
          { icon: Layers, label: 'Layer Manager', action: () => console.log('Layer Manager') },
          { icon: BarChart3, label: 'Scenario Planning', action: () => console.log('Scenario Planning') },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo and Title */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-hydrogen-500 to-primary-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Hydrogen Atlas</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={authState.user?.avatar}
            alt={authState.user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {authState.user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {authState.user?.role.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          if (!item.roles.includes(authState.user?.role!)) return null;
          
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Role-specific Quick Actions */}
      {getRoleSpecificItems().length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {getRoleSpecificItems().map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="sidebar-item w-full text-left"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Powered by NITI Aayog
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
