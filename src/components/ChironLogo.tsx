import React from 'react';

interface ChironLogoProps {
  size?: number;
  className?: string;
}

const ChironLogo: React.FC<ChironLogoProps> = ({ size = 60, className = '' }) => {
  // Colors for the logo
  const rodColor = "#d1d5db";
  const snakeColor = "#ef4444";
  const snakeHighlight = "#f87171";
  const backgroundColor = "#4b5563";
  const circleGlow = "#991b1b";

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Circular background */}
      <div 
        className="absolute inset-0 rounded-full shadow-lg" 
        style={{ 
          backgroundColor, 
          boxShadow: `0 0 20px 2px ${circleGlow}`,
        }}
      />
      
      {/* Staff of Asclepius */}
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        style={{ padding: '10%' }}
      >
        {/* Rod */}
        <rect x="46" y="15" width="8" height="70" rx="4" fill={rodColor} />
        
        {/* Snake */}
        <path
          d="M32,30 C38,35 50,30 50,40 C50,50 38,45 38,50 C38,55 50,50 50,60 C50,70 38,65 45,72"
          fill="none"
          stroke={snakeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Snake details/highlights */}
        <path
          d="M32,30 C38,35 50,30 50,40 C50,50 38,45 38,50 C38,55 50,50 50,60 C50,70 38,65 45,72"
          fill="none"
          stroke={snakeHighlight}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        />
        
        {/* Snake head */}
        <circle cx="32" cy="30" r="5" fill={snakeColor} />
        <circle cx="30" cy="28" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
};

export default ChironLogo;