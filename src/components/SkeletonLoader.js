import React from 'react';

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-300 h-4 rounded w-3/4"></div>
      <div className="bg-gray-300 h-4 rounded w-1/2"></div>
      <div className="bg-gray-300 h-6 rounded w-1/4"></div>
    </div>
  </div>
);

export default SkeletonLoader;