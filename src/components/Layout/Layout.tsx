import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout: React.FC = () => {
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login');
    }
  }, [authState.isAuthenticated, navigate]);

  if (!authState.isAuthenticated) {
    return null;
  }

  // Check if current route is map view
  const isMapView = location.pathname === '/map';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 ${isMapView ? 'p-0' : ''}`}>
          {isMapView ? (
            <Outlet />
          ) : (
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
