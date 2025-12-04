import React, { useState, useMemo } from 'react';
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import FilterBar from './FilterBar';

// Mock employee data
const generateEmployeeData = () => {
  const employees = [];
  const kpis = ['DPR Quality', 'Safety', 'Material', 'Quality', 'Schedule', 'Budget', 'Stakeholder', 'Innovation'];
  const divisions = ['Infrastructure', 'Construction', 'Planning', 'Operations'];
  const roles = ['Engineer', 'Site Manager', 'Supervisor', 'Coordinator'];

  for (let i = 1; i <= 30; i++) {
    const empData = {
      id: i,
      name: `Employee ${i}`,
      division: divisions[Math.floor(Math.random() * divisions.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      kpiScores: {}
    };

    kpis.forEach(kpi => {
      empData.kpiScores[kpi] = Math.floor(Math.random() * 40) + 60; // 60-100
    });

    employees.push(empData);
  }

  return employees;
};

const employees = generateEmployeeData();
const kpiNames = ['DPR Quality', 'Safety', 'Material', 'Quality', 'Schedule', 'Budget', 'Stakeholder', 'Innovation'];

const CalibrationPreview = () => {
  const [activeTab, setActiveTab] = useState('before');
  const [filters, setFilters] = useState({
    search: '',
    division: '',
    role: '',
    year: '2025',
    activeCount: 0,
    dropdowns: [
      {
        key: 'division',
        label: 'All Divisions',
        value: '',
        options: [
          { value: 'Infrastructure', label: 'Infrastructure' },
          { value: 'Construction', label: 'Construction' },
          { value: 'Planning', label: 'Planning' },
          { value: 'Operations', label: 'Operations' }
        ]
      },
      {
        key: 'role',
        label: 'All Roles',
        value: '',
        options: [
          { value: 'Engineer', label: 'Engineer' },
          { value: 'Site Manager', label: 'Site Manager' },
          { value: 'Supervisor', label: 'Supervisor' },
          { value: 'Coordinator', label: 'Coordinator' }
        ]
      },
      {
        key: 'year',
        label: 'Year',
        value: '2025',
        options: [
          { value: '2025', label: '2025' },
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' }
        ]
      }
    ]
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      // Update dropdown values
      if (key !== 'search' && key !== 'activeCount') {
        newFilters.dropdowns = prev.dropdowns.map(d => 
          d.key === key ? { ...d, value } : d
        );
      }

      // Calculate active filters
      let count = 0;
      if (newFilters.search) count++;
      if (newFilters.division) count++;
      if (newFilters.role) count++;
      newFilters.activeCount = count;

      return newFilters;
    });
  };

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      if (filters.search && !emp.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.division && emp.division !== filters.division) return false;
      if (filters.role && emp.role !== filters.role) return false;
      return true;
    });
  }, [filters]);

  // Calculate scores (mock before/after)
  const calculateTotalScore = (emp, isAfter = false) => {
    const weights = isAfter 
      ? { 'DPR Quality': 15, 'Safety': 22, 'Material': 10, 'Quality': 18, 'Schedule': 15, 'Budget': 10, 'Stakeholder': 7, 'Innovation': 3 }
      : { 'DPR Quality': 15, 'Safety': 20, 'Material': 12, 'Quality': 18, 'Schedule': 15, 'Budget': 10, 'Stakeholder': 10, 'Innovation': 0 };
    
    let total = 0;
    Object.keys(weights).forEach(kpi => {
      if (emp.kpiScores[kpi]) {
        total += (emp.kpiScores[kpi] * weights[kpi]) / 100;
      }
    });
    return total;
  };

  // Get color for heatmap
  const getHeatmapColor = (score) => {
    if (score >= 85) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 70) return 'bg-green-50 text-green-700 border-green-100';
    if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-100';
    return 'bg-red-50 text-red-700 border-red-100';
  };

  // Score distribution data
  const scoreDistribution = useMemo(() => {
    const beforeScores = filteredEmployees.map(emp => calculateTotalScore(emp, false));
    const afterScores = filteredEmployees.map(emp => calculateTotalScore(emp, true));

    const createBuckets = (scores) => {
      const buckets = Array(10).fill(0); // 0-10, 10-20, ... 90-100
      scores.forEach(score => {
        const bucketIndex = Math.min(Math.floor(score / 10), 9);
        buckets[bucketIndex]++;
      });
      return buckets;
    };

    return {
      before: createBuckets(beforeScores),
      after: createBuckets(afterScores)
    };
  }, [filteredEmployees]);

  const maxCount = Math.max(...scoreDistribution.before, ...scoreDistribution.after);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Calibration Impact Preview</h2>
            <p className="text-sm text-gray-600">
              Visualize how weight adjustments affect employee scoring distribution
            </p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
            <RefreshCw size={16} />
            Recalculate
          </button>
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} searchPlaceholder="Search employees..." />
      </div>

      {/* Heatmap Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex">
            <button
              onClick={() => setActiveTab('before')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'before'
                  ? 'bg-white text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Before Weight Changes
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'after'
                  ? 'bg-white text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              After Weight Changes
            </button>
          </div>
        </div>

        <div className="p-5 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="sticky left-0 bg-white px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-200">
                  Employee
                </th>
                {kpiNames.map(kpi => (
                  <th key={kpi} className="px-3 py-2 text-center font-semibold text-gray-700 min-w-[80px]">
                    {kpi}
                  </th>
                ))}
                <th className="px-3 py-2 text-center font-semibold text-gray-700 bg-gray-50 min-w-[80px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.slice(0, 15).map((emp, idx) => {
                const isAfter = activeTab === 'after';
                const totalScore = calculateTotalScore(emp, isAfter);

                return (
                  <tr key={emp.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="sticky left-0 bg-inherit px-3 py-2 text-left font-medium text-gray-900 border-r border-gray-200">
                      <div className="min-w-[120px]">
                        <div className="text-sm">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.role}</div>
                      </div>
                    </td>
                    {kpiNames.map(kpi => {
                      const score = emp.kpiScores[kpi] || 0;
                      return (
                        <td key={kpi} className="px-2 py-2">
                          <div className={`text-center py-1.5 rounded border ${getHeatmapColor(score)}`}>
                            {score}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-2 py-2 bg-gray-50">
                      <div className={`text-center py-1.5 rounded border font-semibold ${getHeatmapColor(totalScore)}`}>
                        {totalScore.toFixed(1)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Score Distribution Histogram */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h3 className="text-md font-semibold text-gray-900 mb-4">Score Distribution</h3>
        
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-700">Before</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span className="text-gray-700">After</span>
            </div>
          </div>

          {/* Histogram */}
          <div className="flex items-end gap-2 h-64">
            {scoreDistribution.before.map((beforeCount, idx) => {
              const afterCount = scoreDistribution.after[idx];
              const beforeHeight = (beforeCount / maxCount) * 100;
              const afterHeight = (afterCount / maxCount) * 100;
              const change = afterCount - beforeCount;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Bars */}
                  <div className="w-full flex gap-1 items-end h-52">
                    <div
                      className="flex-1 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 relative"
                      style={{ height: `${beforeHeight}%` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold opacity-0 group-hover:opacity-100">
                        {beforeCount}
                      </div>
                    </div>
                    <div
                      className="flex-1 bg-gray-400 rounded-t transition-all duration-300 hover:bg-gray-500 relative"
                      style={{ height: `${afterHeight}%` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold opacity-0 group-hover:opacity-100">
                        {afterCount}
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-xs text-gray-600 text-center">
                    {idx * 10}-{(idx + 1) * 10}
                  </div>

                  {/* Change indicator */}
                  {change !== 0 && (
                    <div className={`flex items-center gap-0.5 text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      <span>{Math.abs(change)}</span>
                    </div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 w-32 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10">
                    <div>Before: {beforeCount}</div>
                    <div>After: {afterCount}</div>
                    <div className={change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      Change: {change >= 0 ? '+' : ''}{change}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis label */}
          <div className="text-center text-xs text-gray-600 font-medium pt-2 border-t border-gray-200">
            Score Range
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationPreview;
