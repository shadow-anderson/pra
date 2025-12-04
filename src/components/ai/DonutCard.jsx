import React from 'react';

const DonutCard = ({ name, percentage, label, color = '#3b82f6' }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="border border-gray-300 rounded-lg p-5 bg-white flex items-center gap-5">
      <div className="relative flex-shrink-0">
        <svg width="100" height="100" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-700 mb-1">{name}</h4>
        {label && <p className="text-xs text-gray-500">{label}</p>}
      </div>
    </div>
  );
};

export default DonutCard;
