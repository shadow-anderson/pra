import React from 'react';
import { Info } from 'lucide-react';

const BehaviouralCheckbox = ({ checked, onChange }) => {
  return (
    <div className="flex flex-col gap-2 justify-end">
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            Include Behavioural Competencies
          </span>
          <div className="relative group/tooltip">
            <Info size={16} className="text-gray-400 cursor-help" />
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 p-3 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-10 pointer-events-none">
              Adds behavioural competency scoring (0-30 scale) for Initiative, Communication, Punctuality & Discipline, and Teamwork to the APAR report.
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default BehaviouralCheckbox;
