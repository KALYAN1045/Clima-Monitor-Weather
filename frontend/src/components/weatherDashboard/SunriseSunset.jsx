import React from 'react';

const SunriseSunsetCard = ({ data = {
  sunrise: "6:17 AM",
  sunset: "5:55 PM"
}}) => {
  return (
    <div className="max-w-sm xl:max-w-lg bg-blue-900 text-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-xl text-gray-300">Sunrise & Sunset</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="flex items-center space-x-4">
          <svg 
            className="w-8 h-8 text-gray-300" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="M4.93 4.93l1.41 1.41"/>
            <path d="M17.66 17.66l1.41 1.41"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="M6.34 17.66l-1.41 1.41"/>
            <path d="M19.07 4.93l-1.41 1.41"/>
          </svg>
          <div className="space-y-1">
            <div className="text-sm text-gray-300">Sunrise</div>
            <div className="text-xl font-semibold">{data.sunrise}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <svg 
            className="w-8 h-8 text-gray-300" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z"/>
            <path d="M12 3v18"/>
            <path d="M3 12h18"/>
          </svg>
          <div className="space-y-1">
            <div className="text-sm text-gray-300">Sunset</div>
            <div className="text-xl font-semibold">{data.sunset}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunsetCard;