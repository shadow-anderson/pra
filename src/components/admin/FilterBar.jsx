import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, searchPlaceholder = 'Search...' }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Dynamic Dropdown Filters */}
        {filters.dropdowns && filters.dropdowns.map((dropdown, idx) => (
          <select
            key={idx}
            value={dropdown.value}
            onChange={(e) => onFilterChange(dropdown.key, e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">{dropdown.label}</option>
            {dropdown.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}

        {/* Filter Count Badge */}
        {filters.activeCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-200">
            <Filter size={14} />
            <span>{filters.activeCount} active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
