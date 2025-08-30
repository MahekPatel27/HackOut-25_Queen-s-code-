import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Globe Background */}
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-full border-2 border-blue-200 flex items-center justify-center relative overflow-hidden">
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-px bg-blue-300 absolute top-1/2"></div>
            <div className="w-full h-px bg-blue-300 absolute top-1/4"></div>
            <div className="w-full h-px bg-blue-300 absolute top-3/4"></div>
            <div className="h-full w-px bg-blue-300 absolute left-1/2"></div>
            <div className="h-full w-px bg-blue-300 absolute left-1/4"></div>
            <div className="h-full w-px bg-blue-300 absolute left-3/4"></div>
          </div>
          
          {/* India Map Silhouette */}
          <div className="relative w-3/4 h-3/4">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Simplified India map path */}
              <path
                d="M20 30 Q25 25 30 30 Q35 35 40 30 Q45 25 50 30 Q55 35 60 30 Q65 25 70 30 Q75 35 80 30 Q85 25 90 30 L85 40 Q80 45 75 40 Q70 35 65 40 Q60 45 55 40 Q50 35 45 40 Q40 45 35 40 Q30 35 25 40 Q20 45 15 40 Z"
                fill="url(#indiaGradient)"
                stroke="#1f4e79"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2c974b" />
                  <stop offset="100%" stopColor="#1f4e79" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* H₂ Symbol Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white font-bold text-center leading-none">
                <span className="text-lg">H</span>
                <span className="text-xs align-sub">₂</span>
              </div>
            </div>
          </div>
          
          {/* Partial Circular Arc */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2">
            <div className="w-full h-full border-4 border-transparent border-r-green-500 border-t-green-500 rounded-full transform rotate-45"></div>
          </div>
        </div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 ${textSizes[size]}`}>
            HYDROGEN ATLAS
          </span>
          <span className={`font-semibold text-green-600 ${textSizes[size]}`}>
            FOR INDIA
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
