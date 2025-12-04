import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, RotateCcw, Info } from 'lucide-react';
import Toast from './Toast';
import ConfirmDialog from './ConfirmDialog';

// Mock KPI data
const initialKpis = [
  { id: 1, name: 'Daily Progress Report (DPR) Quality Score', weight: 15, range: '10-30', description: 'Measures completeness and accuracy of daily reports' },
  { id: 2, name: 'Safety Incident Rate', weight: 20, range: '15-25', description: 'Zero-tolerance safety tracking metric' },
  { id: 3, name: 'Material Wastage %', weight: 12, range: '5-20', description: 'Efficiency in resource utilization' },
  { id: 4, name: 'Quality Non-Conformance Rate', weight: 18, range: '10-25', description: 'Defect rate in deliverables' },
  { id: 5, name: 'Schedule Adherence %', weight: 15, range: '10-20', description: 'On-time milestone completion' },
  { id: 6, name: 'Budget Variance %', weight: 10, range: '5-15', description: 'Cost control effectiveness' },
  { id: 7, name: 'Stakeholder Satisfaction Score', weight: 10, range: '5-15', description: 'Feedback from project stakeholders' },
  { id: 8, name: 'Innovation Implementation Count', weight: 5, range: '0-10', description: 'Process improvement initiatives' },
  { id: 9, name: 'Team Collaboration Score', weight: 8, range: '5-15', description: 'Cross-functional teamwork rating' },
  { id: 10, name: 'Environmental Compliance Score', weight: 7, range: '5-15', description: 'Adherence to environmental norms' }
];

const WeightEditor = () => {
  const [kpis, setKpis] = useState(initialKpis);
  const [editedRows, setEditedRows] = useState(new Set());
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setHasUnsavedChanges(editedRows.size > 0);
  }, [editedRows]);

  const parseRange = (rangeStr) => {
    const [min, max] = rangeStr.split('-').map(s => parseInt(s.trim()));
    return { min, max };
  };

  const validateWeight = (kpi, newWeight) => {
    const weight = parseFloat(newWeight);
    if (isNaN(weight)) {
      return 'Must be a number';
    }
    const { min, max } = parseRange(kpi.range);
    if (weight < min || weight > max) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  };

  const handleWeightChange = (kpiId, newWeight) => {
    const kpi = kpis.find(k => k.id === kpiId);
    const error = validateWeight(kpi, newWeight);
    
    setErrors(prev => ({
      ...prev,
      [kpiId]: error
    }));

    setKpis(prev => prev.map(k => 
      k.id === kpiId ? { ...k, weight: newWeight } : k
    ));

    if (!error) {
      setEditedRows(prev => new Set([...prev, kpiId]));
    }
  };

  const handleSave = (kpiId) => {
    const kpi = kpis.find(k => k.id === kpiId);
    const error = validateWeight(kpi, kpi.weight);
    
    if (error) {
      setToast({ message: 'Please fix validation errors before saving', type: 'error' });
      return;
    }

    // Simulate API save
    setTimeout(() => {
      setEditedRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(kpiId);
        return newSet;
      });
      setToast({ message: `Weight for "${kpi.name}" saved successfully`, type: 'success' });
    }, 300);
  };

  const handleReset = (kpiId) => {
    const original = initialKpis.find(k => k.id === kpiId);
    setKpis(prev => prev.map(k => 
      k.id === kpiId ? { ...k, weight: original.weight } : k
    ));
    setEditedRows(prev => {
      const newSet = new Set(prev);
      newSet.delete(kpiId);
      return newSet;
    });
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[kpiId];
      return newErrors;
    });
  };

  const totalWeight = kpis.reduce((sum, k) => sum + parseFloat(k.weight || 0), 0);
  const isValidTotal = Math.abs(totalWeight - 100) < 0.01;

  return (
    <div>
      {/* Header Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">KPI Weight Configuration</h2>
            <p className="text-sm text-gray-600">
              Adjust individual KPI weights within allowed ranges. Total must equal 100%.
            </p>
          </div>
          <div className={`px-4 py-2 rounded-md text-sm font-semibold ${
            isValidTotal ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            Total: {totalWeight.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {hasUnsavedChanges && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5 flex items-start gap-3">
          <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">Unsaved Changes</p>
            <p className="text-xs text-amber-700 mt-1">
              You have {editedRows.size} unsaved change(s). Please save or reset before navigating away.
            </p>
          </div>
        </div>
      )}

      {/* KPI Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  KPI Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                  Current Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                  Allowed Range
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kpis.map((kpi, idx) => {
                const isEdited = editedRows.has(kpi.id);
                const hasError = errors[kpi.id];
                const isZebra = idx % 2 === 0;

                return (
                  <tr
                    key={kpi.id}
                    className={`
                      transition-colors duration-150
                      ${isEdited ? 'bg-yellow-50' : isZebra ? 'bg-white' : 'bg-gray-50'}
                      hover:bg-gray-100
                    `}
                  >
                    {/* KPI Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 group">
                        <span className="text-sm text-gray-900">{kpi.name}</span>
                        <div className="relative">
                          <Info size={14} className="text-gray-400 cursor-help" />
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-64 p-3 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                            {kpi.description}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900"></div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Current Weight Input */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <input
                          type="number"
                          step="0.1"
                          value={kpi.weight}
                          onChange={(e) => handleWeightChange(kpi.id, e.target.value)}
                          className={`
                            w-24 px-3 py-2 text-sm text-right border rounded-md
                            focus:outline-none focus:ring-2 transition-all
                            ${hasError
                              ? 'border-red-300 focus:ring-red-500 bg-red-50'
                              : 'border-gray-300 focus:ring-blue-500'
                            }
                          `}
                        />
                        {hasError && (
                          <span className="text-xs text-red-600">{hasError}</span>
                        )}
                      </div>
                    </td>

                    {/* Allowed Range */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 group">
                        <span className="text-sm text-gray-500">{kpi.range}</span>
                        <Info size={12} className="text-gray-400 cursor-help" />
                        <div className="absolute left-full ml-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                          Range set by governance policy
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {isEdited && (
                          <>
                            <button
                              onClick={() => handleReset(kpi.id)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                              title="Reset to original"
                            >
                              <RotateCcw size={16} />
                            </button>
                            <button
                              onClick={() => handleSave(kpi.id)}
                              disabled={hasError}
                              className={`
                                flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors
                                ${hasError
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                                }
                              `}
                            >
                              <Save size={14} />
                              Save
                            </button>
                          </>
                        )}
                        {!isEdited && (
                          <span className="text-xs text-gray-400 italic px-3 py-2">No changes</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false })}
      />
    </div>
  );
};

export default WeightEditor;
