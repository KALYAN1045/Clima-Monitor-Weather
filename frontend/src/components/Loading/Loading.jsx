import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="relative w-12 h-12">
        <div className="absolute w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin" />
        <div className="absolute w-12 h-12 border-4 border-r-blue-400 border-t-transparent border-b-transparent border-l-blue-200 rounded-full animate-spin animate-delay-150" />
      </div>
    </div>
  );
};

export default LoadingSpinner;