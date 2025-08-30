import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { state: authState, login, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
  };

  const demoAccounts = [
    {
      role: 'Planner',
      email: 'planner@hydrogenatlas.com',
      password: 'demo123',
      description: 'Site planning and infrastructure analysis',
      color: 'from-blue-500 to-blue-600'
    },
    {
      role: 'Investor',
      email: 'enterprise@hydrogenatlas.com',
      password: 'demo123',
      description: 'Investment analysis and ROI calculations',
      color: 'from-green-500 to-green-600'
    },
    {
      role: 'Policy Analyst',
      email: 'policy@gov.in',
      password: 'demo123',
      description: 'Policy research and incentive tracking',
      color: 'from-purple-500 to-purple-600'
    },
    {
      role: 'Researcher',
      email: 'researcher@hydrogenatlas.com',
      password: 'demo123',
      description: 'Data analysis and research tools',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-hydrogen-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Hero */}
        <div className="text-center lg:text-left">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-hydrogen-500 to-primary-600 rounded-2xl mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Hydrogen Atlas
              <span className="block text-3xl text-primary-600">India</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Plan smarter, invest better. Comprehensive mapping and analysis tool for hydrogen infrastructure planning across India.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-hydrogen-500 rounded-full"></div>
              <span className="text-gray-700">Interactive GIS mapping with renewable resource layers</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span className="text-gray-700">AI-powered site suitability analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-solar-500 rounded-full"></div>
              <span className="text-gray-700">Policy database and investment insights</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your hydrogen planning tools</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authState.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{authState.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-700 hover:to-primary-800 focus:ring-4 focus:ring-primary-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">Try Demo Accounts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoAccount(account.email, account.password)}
                  className={`p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 text-left group`}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${account.color} mb-2`}></div>
                  <p className="text-sm font-medium text-gray-900">{account.role}</p>
                  <p className="text-xs text-gray-500">{account.description}</p>
                  <p className="text-xs text-primary-600 mt-1 group-hover:underline">
                    Click to fill credentials
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Powered by NITI Aayog • Data from MNRE, CEA, and other government sources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
