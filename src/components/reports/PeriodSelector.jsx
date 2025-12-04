import React from 'react';
import { Calendar } from 'lucide-react';

const periods = [
  { value: '2024-25', label: 'FY 2024-25' },
  { value: '2023-24', label: 'FY 2023-24' },
  { value: '2022-23', label: 'FY 2022-23' },
  { value: '2021-22', label: 'FY 2021-22' }
];

const PeriodSelector = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        Assessment Period
        <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em'
          }}
        >
          <option value="">Select assessment period</option>
          {periods.map(period => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PeriodSelector;
