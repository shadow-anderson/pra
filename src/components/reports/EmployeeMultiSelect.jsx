import React, { useState, useRef, useEffect } from 'react';
import { Users, Search, X, ChevronDown } from 'lucide-react';

const EmployeeMultiSelect = ({ employees, selectedEmployees, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.division.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleEmployee = (employee) => {
    const isSelected = selectedEmployees.some(emp => emp.id === employee.id);
    if (isSelected) {
      onChange(selectedEmployees.filter(emp => emp.id !== employee.id));
    } else {
      onChange([...selectedEmployees, employee]);
    }
  };

  const removeEmployee = (employeeId) => {
    onChange(selectedEmployees.filter(emp => emp.id !== employeeId));
  };

  return (
    <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        Employees
        <span className="text-red-500">*</span>
      </label>
      
      {/* Selected Chips */}
      {selectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1">
          {selectedEmployees.map(emp => (
            <div
              key={emp.id}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200 text-xs font-medium"
            >
              <span>{emp.name}</span>
              <button
                onClick={() => removeEmployee(emp.id)}
                className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Users size={18} className="text-gray-400" />
          <span className="text-gray-700">
            {selectedEmployees.length === 0
              ? 'Select employees...'
              : `${selectedEmployees.length} selected`}
          </span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-80 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Employee List */}
          <div className="overflow-y-auto flex-1">
            {filteredEmployees.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No employees found
              </div>
            ) : (
              filteredEmployees.map(emp => {
                const isSelected = selectedEmployees.some(e => e.id === emp.id);
                return (
                  <label
                    key={emp.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleEmployee(emp)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                      <div className="text-xs text-gray-500">
                        {emp.designation} • {emp.division}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      emp.role === 'hq' ? 'bg-purple-100 text-purple-700' :
                      emp.role === 'field' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {emp.role === 'hq' ? 'HQ' : emp.role === 'field' ? 'Field' : 'Mixed'}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeMultiSelect;
