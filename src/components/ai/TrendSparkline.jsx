import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TrendSparkline = ({ name, data, direction, caption }) => {
  const getTrendIcon = () => {
    if (direction === 'up') return <TrendingUp size={16} className="text-green-600" />;
    if (direction === 'down') return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-500" />;
  };

  const getTrendColor = () => {
    if (direction === 'up') return 'text-green-600';
    if (direction === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">{name}</h4>
        <div className="flex items-center gap-1.5">
          {getTrendIcon()}
          <span className={`text-sm font-semibold ${getTrendColor()}`}>
            {direction === 'up' ? 'Trending Up' : direction === 'down' ? 'Trending Down' : 'Stable'}
          </span>
        </div>
      </div>
      
      <svg width="100%" height="60" viewBox="0 0 100 100" preserveAspectRatio="none" className="mb-2">
        <polyline
          points={points}
          fill="none"
          stroke={direction === 'up' ? '#16a34a' : direction === 'down' ? '#dc2626' : '#6b7280'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="text-xs text-gray-500">{caption || 'Trend over last 30 days'}</p>
    </div>
  );
};

export default TrendSparkline;
