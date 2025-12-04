import React from 'react';

const KPIValueCard = ({ name, value, unit, subtext, trend }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="border border-gray-300 rounded-lg p-5 bg-white hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">{name}</h4>
        {trend && (
          <span className={`text-xl font-bold ${getTrendColor()}`}>
            {getTrendIcon()}
          </span>
        )}
      </div>
      <div className="mb-2">
        <span className="text-4xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-xl text-gray-600 ml-1">{unit}</span>}
      </div>
      <p className="text-xs text-gray-500">{subtext || 'as of last update'}</p>
    </div>
  );
};

export default KPIValueCard;
