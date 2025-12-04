import React, { useState } from 'react';
import { FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';
import PeriodSelector from './components/reports/PeriodSelector';
import EmployeeMultiSelect from './components/reports/EmployeeMultiSelect';
import BehaviouralCheckbox from './components/reports/BehaviouralCheckbox';
import APARPreviewCard from './components/reports/APARPreviewCard';
import GeneratePDFButton from './components/reports/GeneratePDFButton';
import Toast from './components/admin/Toast';

// Mock employee data
const mockEmployees = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    designation: 'Assistant Engineer',
    role: 'field',
    division: 'Infrastructure',
    hqKpis: null,
    fieldKpis: {
      dprTimeliness: 92,
      dprQuality: 88,
      surveyAccuracy: 3.2,
      milestoneHitRate: 85,
      physicalProgressIndex: 78,
      budgetVariance: 5.2,
      qcPassRate: 94,
      evidenceCompleteness: 90
    },
    behaviouralKpis: {
      initiative: 24,
      communication: 26,
      punctuality: 28,
      teamwork: 25
    },
    teamKpis: {
      projectSuccessRate: 88,
      milestonePerformance: 82,
      teamQualityScore: 87
    }
  },
  {
    id: 2,
    name: 'Priya Sharma',
    designation: 'Senior Officer',
    role: 'hq',
    division: 'Administration',
    hqKpis: {
      fileDisposalRate: 94,
      medianTAT: 2.3,
      tatSLACompliance: 89,
      queueLength: 12,
      docProcessingPerHour: 8.5,
      emailResponseLatency: 1.2
    },
    fieldKpis: null,
    behaviouralKpis: {
      initiative: 27,
      communication: 28,
      punctuality: 30,
      teamwork: 26
    },
    teamKpis: null
  },
  {
    id: 3,
    name: 'Anil Verma',
    designation: 'Site Supervisor',
    role: 'field',
    division: 'Construction',
    hqKpis: null,
    fieldKpis: {
      dprTimeliness: 88,
      dprQuality: 85,
      surveyAccuracy: 4.1,
      milestoneHitRate: 82,
      physicalProgressIndex: 80,
      budgetVariance: 6.8,
      qcPassRate: 91,
      evidenceCompleteness: 87
    },
    behaviouralKpis: {
      initiative: 22,
      communication: 24,
      punctuality: 26,
      teamwork: 27
    },
    teamKpis: {
      projectSuccessRate: 85,
      milestonePerformance: 79,
      teamQualityScore: 84
    }
  },
  {
    id: 4,
    name: 'Sunita Patel',
    designation: 'Deputy Manager',
    role: 'mixed',
    division: 'Planning',
    hqKpis: {
      fileDisposalRate: 91,
      medianTAT: 2.8,
      tatSLACompliance: 86,
      queueLength: 15,
      docProcessingPerHour: 7.2,
      emailResponseLatency: 1.5
    },
    fieldKpis: {
      dprTimeliness: 90,
      dprQuality: 87,
      surveyAccuracy: 3.5,
      milestoneHitRate: 84,
      physicalProgressIndex: 82,
      budgetVariance: 4.9,
      qcPassRate: 93,
      evidenceCompleteness: 89
    },
    behaviouralKpis: {
      initiative: 26,
      communication: 27,
      punctuality: 29,
      teamwork: 28
    },
    teamKpis: {
      projectSuccessRate: 90,
      milestonePerformance: 86,
      teamQualityScore: 89
    }
  },
  {
    id: 5,
    name: 'Vikram Singh',
    designation: 'Junior Engineer',
    role: 'field',
    division: 'Operations',
    hqKpis: null,
    fieldKpis: {
      dprTimeliness: 86,
      dprQuality: 82,
      surveyAccuracy: 4.5,
      milestoneHitRate: 80,
      physicalProgressIndex: 75,
      budgetVariance: 7.2,
      qcPassRate: 89,
      evidenceCompleteness: 85
    },
    behaviouralKpis: {
      initiative: 21,
      communication: 23,
      punctuality: 25,
      teamwork: 24
    },
    teamKpis: {
      projectSuccessRate: 83,
      milestonePerformance: 77,
      teamQualityScore: 82
    }
  }
];

const systemKpis = {
  projectSuccessRate: 87,
  avgTimeToUnblock: 2.4,
  trainingCompletionRate: 92,
  systemAdoptionRate: 88,
  avgLogins: 4.2,
  avgUploads: 12.5
};

const ReportsAPAR = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [includeBehavioural, setIncludeBehavioural] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);

  const canGenerate = selectedPeriod && selectedEmployees.length > 0;

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      setToast({
        message: `APAR PDF generated successfully for ${selectedEmployees.length} employee(s)`,
        type: 'success'
      });
      
      // Trigger download (mock)
      const filename = `APAR_Report_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log(`Downloading: ${filename}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Reports & APAR Generation</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Generate formal performance assessment reports for selected employees
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Selection Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Report Configuration
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <PeriodSelector 
              value={selectedPeriod} 
              onChange={setSelectedPeriod} 
            />
            <EmployeeMultiSelect
              employees={mockEmployees}
              selectedEmployees={selectedEmployees}
              onChange={setSelectedEmployees}
            />
            <BehaviouralCheckbox
              checked={includeBehavioural}
              onChange={setIncludeBehavioural}
            />
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-sm">
            {canGenerate ? (
              <>
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-green-700 font-medium">
                  Ready to generate • {selectedEmployees.length} employee(s) selected
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={16} className="text-amber-600" />
                <span className="text-amber-700 font-medium">
                  Select period and at least one employee to continue
                </span>
              </>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Report Preview
            </h2>
          </div>

          <div className="p-6">
            {selectedEmployees.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-500 text-sm">
                  Select employees to preview their APAR reports
                </p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {selectedEmployees.map((emp) => (
                  <APARPreviewCard
                    key={emp.id}
                    employee={emp}
                    period={selectedPeriod}
                    includeBehavioural={includeBehavioural}
                    systemKpis={systemKpis}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6">
          <GeneratePDFButton
            onClick={handleGenerate}
            disabled={!canGenerate}
            isGenerating={isGenerating}
            employeeCount={selectedEmployees.length}
          />
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
              <div>
                <p className="text-lg font-semibold text-gray-900">Generating Report...</p>
                <p className="text-sm text-gray-600 mt-1">
                  Please wait while we prepare your APAR documents
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAPAR;
