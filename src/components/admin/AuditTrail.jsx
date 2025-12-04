import React, { useState, useMemo } from 'react';
import { Download, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import FilterBar from './FilterBar';

// Mock audit data
const generateAuditData = () => {
  const editors = [
    { name: 'Dr. Rajesh Kumar', role: 'Senior Admin' },
    { name: 'Priya Sharma', role: 'HR Lead' },
    { name: 'Anil Verma', role: 'Governance Officer' },
    { name: 'Sunita Patel', role: 'System Admin' }
  ];

  const changes = [
    { param: 'Weight: DPR Quality Score', old: 12, new: 15 },
    { param: 'Weight: Safety Incident Rate', old: 20, new: 22 },
    { param: 'Weight: Material Wastage %', old: 15, new: 10 },
    { param: 'Weight: Quality Non-Conformance', old: 18, new: 18 },
    { param: 'Weight: Schedule Adherence', old: 15, new: 15 },
    { param: 'Behavioural: Teamwork Scale', old: '0-3', new: '0-5' },
    { param: 'New KPI Added: Innovation Count', old: 'N/A', new: '5%' },
    { param: 'Weight: Budget Variance', old: 12, new: 10 },
    { param: 'Weight: Stakeholder Satisfaction', old: 8, new: 7 },
    { param: 'KPI Removed: Overtime Hours', old: '5%', new: 'N/A' }
  ];

  const changeTypes = ['Weight Update', 'Scale Change', 'KPI Addition', 'KPI Removal', 'Config Change'];

  const logs = [];
  for (let i = 0; i < 50; i++) {
    const editor = editors[Math.floor(Math.random() * editors.length)];
    const change = changes[Math.floor(Math.random() * changes.length)];
    const changeType = changeTypes[Math.floor(Math.random() * changeTypes.length)];
    
    const date = new Date(2025, 11, 4);
    date.setHours(date.getHours() - Math.floor(Math.random() * 720)); // Last 30 days

    logs.push({
      id: i + 1,
      timestamp: date,
      editor: editor.name,
      role: editor.role,
      parameter: change.param,
      oldValue: change.old,
      newValue: change.new,
      changeType: changeType,
      reason: 'Policy update as per governance review'
    });
  }

  return logs.sort((a, b) => b.timestamp - a.timestamp);
};

const auditLogs = generateAuditData();

const AuditTrail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedRow, setExpandedRow] = useState(null);
  const rowsPerPage = 25;

  const [filters, setFilters] = useState({
    search: '',
    editor: '',
    changeType: '',
    dateRange: '',
    activeCount: 0,
    dropdowns: [
      {
        key: 'editor',
        label: 'All Editors',
        value: '',
        options: [
          { value: 'Dr. Rajesh Kumar', label: 'Dr. Rajesh Kumar' },
          { value: 'Priya Sharma', label: 'Priya Sharma' },
          { value: 'Anil Verma', label: 'Anil Verma' },
          { value: 'Sunita Patel', label: 'Sunita Patel' }
        ]
      },
      {
        key: 'changeType',
        label: 'All Change Types',
        value: '',
        options: [
          { value: 'Weight Update', label: 'Weight Update' },
          { value: 'Scale Change', label: 'Scale Change' },
          { value: 'KPI Addition', label: 'KPI Addition' },
          { value: 'KPI Removal', label: 'KPI Removal' },
          { value: 'Config Change', label: 'Config Change' }
        ]
      },
      {
        key: 'dateRange',
        label: 'Date Range',
        value: '',
        options: [
          { value: 'today', label: 'Today' },
          { value: '7days', label: 'Last 7 Days' },
          { value: '30days', label: 'Last 30 Days' },
          { value: '90days', label: 'Last 90 Days' }
        ]
      }
    ]
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      
      if (key !== 'search' && key !== 'activeCount') {
        newFilters.dropdowns = prev.dropdowns.map(d => 
          d.key === key ? { ...d, value } : d
        );
      }

      let count = 0;
      if (newFilters.search) count++;
      if (newFilters.editor) count++;
      if (newFilters.changeType) count++;
      if (newFilters.dateRange) count++;
      newFilters.activeCount = count;

      return newFilters;
    });
    setCurrentPage(1);
  };

  // Filter and sort logs
  const filteredLogs = useMemo(() => {
    let filtered = auditLogs.filter(log => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!log.parameter.toLowerCase().includes(searchLower) &&
            !log.editor.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      if (filters.editor && log.editor !== filters.editor) return false;
      if (filters.changeType && log.changeType !== filters.changeType) return false;
      
      if (filters.dateRange) {
        const now = new Date();
        const logDate = new Date(log.timestamp);
        const diffDays = Math.floor((now - logDate) / (1000 * 60 * 60 * 24));
        
        if (filters.dateRange === 'today' && diffDays > 0) return false;
        if (filters.dateRange === '7days' && diffDays > 7) return false;
        if (filters.dateRange === '30days' && diffDays > 30) return false;
        if (filters.dateRange === '90days' && diffDays > 90) return false;
      }
      
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'timestamp') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [auditLogs, filters, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Editor', 'Role', 'Parameter', 'Old Value', 'New Value', 'Change Type'];
    const rows = filteredLogs.map(log => [
      log.timestamp.toLocaleString(),
      log.editor,
      log.role,
      log.parameter,
      log.oldValue,
      log.newValue,
      log.changeType
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getChangeArrow = (oldVal, newVal) => {
    const oldNum = parseFloat(oldVal);
    const newNum = parseFloat(newVal);
    
    if (isNaN(oldNum) || isNaN(newNum)) return '→';
    if (newNum > oldNum) return <ArrowUp size={14} className="text-green-600 inline" />;
    if (newNum < oldNum) return <ArrowDown size={14} className="text-red-600 inline" />;
    return '→';
  };

  const formatTimestamp = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en', { month: 'short' });
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Audit Trail</h2>
            <p className="text-sm text-gray-600">
              Complete transparency log of all configuration changes
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} searchPlaceholder="Search by parameter or editor..." />
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{filteredLogs.length}</div>
          <div className="text-xs text-gray-600 mt-1">Total Changes</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(filteredLogs.map(l => l.editor)).size}
          </div>
          <div className="text-xs text-gray-600 mt-1">Unique Editors</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">
            {filteredLogs.filter(l => {
              const diff = (new Date() - new Date(l.timestamp)) / (1000 * 60 * 60 * 24);
              return diff <= 7;
            }).length}
          </div>
          <div className="text-xs text-gray-600 mt-1">Last 7 Days</div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  onClick={() => handleSort('timestamp')}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    Timestamp
                    {sortField === 'timestamp' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('editor')}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    Editor
                    {sortField === 'editor' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Parameter Changed
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Value Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedLogs.map((log, idx) => (
                <React.Fragment key={log.id}>
                  <tr
                    onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                    className={`
                      ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      hover:bg-blue-50 cursor-pointer transition-colors
                    `}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                          {log.editor.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.editor}</div>
                          <div className="text-xs text-gray-500">{log.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {log.parameter}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{log.oldValue}</span>
                        <span className="text-gray-400">{getChangeArrow(log.oldValue, log.newValue)}</span>
                        <span className="font-semibold text-gray-900">{log.newValue}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {log.changeType}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Expanded Row - JSON Diff */}
                  {expandedRow === log.id && (
                    <tr className="bg-gray-100">
                      <td colSpan="5" className="px-6 py-4">
                        <div className="bg-white rounded-md border border-gray-300 p-4">
                          <div className="text-xs font-semibold text-gray-700 uppercase mb-2">Full Change Details</div>
                          <pre className="text-xs text-gray-800 bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto">
{JSON.stringify({
  timestamp: log.timestamp.toISOString(),
  editor: { name: log.editor, role: log.role },
  change: {
    parameter: log.parameter,
    before: log.oldValue,
    after: log.newValue,
    type: log.changeType
  },
  reason: log.reason,
  systemVersion: 'v2.1.0'
}, null, 2)}
                          </pre>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-semibold">{(currentPage - 1) * rowsPerPage + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(currentPage * rowsPerPage, filteredLogs.length)}</span> of{' '}
            <span className="font-semibold">{filteredLogs.length}</span> results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
