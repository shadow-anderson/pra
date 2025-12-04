import React from 'react';

const MiniBarChart = ({ title, data, label }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <h4 className="text-sm font-medium text-gray-700 mb-4">{title}</h4>
      
      <div className="space-y-3">
        {data.map((item, idx) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">{item.label}</span>
                <span className="text-xs font-semibold text-gray-900">{item.value}{item.unit || ''}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {label && (
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">{label}</p>
      )}
    </div>
  );
};

export default MiniBarChart;
