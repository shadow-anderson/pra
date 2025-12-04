import React from 'react';
import { Building2, MapPin, Calendar, TrendingUp, Award, Users, Activity } from 'lucide-react';

const APARPreviewCard = ({ employee, period, includeBehavioural, systemKpis }) => {
  const getRoleBadge = (role) => {
    const badges = {
      hq: { label: 'HQ Role', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      field: { label: 'Field Role', color: 'bg-green-100 text-green-700 border-green-200' },
      mixed: { label: 'Mixed Role', color: 'bg-blue-100 text-blue-700 border-blue-200' }
    };
    return badges[role] || badges.mixed;
  };

  const badge = getRoleBadge(employee.role);

  return (
    <div className="border-2 border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">
      {/* Header Block */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{employee.name}</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <Building2 size={14} className="opacity-80" />
                <span>{employee.designation}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="opacity-80" />
                <span>{employee.division}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="opacity-80" />
                <span>FY {period}</span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${badge.color}`}>
            {badge.label}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-6">
        
        {/* HQ KPIs Section */}
        {employee.hqKpis && (
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-200">
              <Building2 size={18} className="text-gray-700" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                Headquarters KPIs
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <KPIItem label="File Disposal Rate" value={`${employee.hqKpis.fileDisposalRate}%`} />
              <KPIItem label="Median TAT" value={`${employee.hqKpis.medianTAT} days`} />
              <KPIItem label="TAT SLA Compliance" value={`${employee.hqKpis.tatSLACompliance}%`} />
              <KPIItem label="Queue Length" value={employee.hqKpis.queueLength} />
              <KPIItem label="Doc Processing/Hour" value={employee.hqKpis.docProcessingPerHour} />
              <KPIItem label="Email Response Latency" value={`${employee.hqKpis.emailResponseLatency}h`} />
            </div>
          </div>
        )}

        {/* Field KPIs Section */}
        {employee.fieldKpis && (
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-200">
              <MapPin size={18} className="text-gray-700" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                Field KPIs
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <KPIItem label="DPR Timeliness" value={`${employee.fieldKpis.dprTimeliness}%`} />
              <KPIItem label="DPR Quality Score" value={`${employee.fieldKpis.dprQuality}%`} />
              <KPIItem label="Survey Accuracy (RMSE)" value={employee.fieldKpis.surveyAccuracy} />
              <KPIItem label="Milestone Hit Rate" value={`${employee.fieldKpis.milestoneHitRate}%`} />
              <KPIItem label="Physical Progress Index" value={`${employee.fieldKpis.physicalProgressIndex}%`} />
              <KPIItem label="Budget Variance" value={`${employee.fieldKpis.budgetVariance}%`} />
              <KPIItem label="QC Pass Rate" value={`${employee.fieldKpis.qcPassRate}%`} />
              <KPIItem label="Evidence Completeness" value={`${employee.fieldKpis.evidenceCompleteness}%`} />
            </div>
          </div>
        )}

        {/* Behavioural KPIs Section */}
        {includeBehavioural && employee.behaviouralKpis && (
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-200">
              <Award size={18} className="text-gray-700" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                Behavioural Competencies
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <BehaviouralItem 
                label="Initiative" 
                score={employee.behaviouralKpis.initiative} 
                maxScore={30} 
              />
              <BehaviouralItem 
                label="Communication" 
                score={employee.behaviouralKpis.communication} 
                maxScore={30} 
              />
              <BehaviouralItem 
                label="Punctuality & Discipline" 
                score={employee.behaviouralKpis.punctuality} 
                maxScore={30} 
              />
              <BehaviouralItem 
                label="Teamwork" 
                score={employee.behaviouralKpis.teamwork} 
                maxScore={30} 
              />
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Total Behavioural Score</span>
                <span className="text-lg font-bold text-blue-600">
                  {Object.values(employee.behaviouralKpis).reduce((sum, val) => sum + val, 0)} / 120
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Team KPIs Section */}
        {employee.teamKpis && (
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-gray-200">
              <Users size={18} className="text-gray-700" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                Team Performance Metrics
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <KPIItem label="Project Success Rate" value={`${employee.teamKpis.projectSuccessRate}%`} />
              <KPIItem label="Milestone Performance" value={`${employee.teamKpis.milestonePerformance}%`} />
              <KPIItem label="Team Quality Score" value={`${employee.teamKpis.teamQualityScore}%`} />
            </div>
          </div>
        )}

        {/* System KPIs Summary - Appendix */}
        <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-gray-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">
              System-Level Context (Appendix)
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <div className="text-gray-600 mb-1">Project Success Rate</div>
              <div className="font-bold text-gray-900">{systemKpis.projectSuccessRate}%</div>
            </div>
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <div className="text-gray-600 mb-1">Avg Time to Unblock</div>
              <div className="font-bold text-gray-900">{systemKpis.avgTimeToUnblock} days</div>
            </div>
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <div className="text-gray-600 mb-1">Training Completion</div>
              <div className="font-bold text-gray-900">{systemKpis.trainingCompletionRate}%</div>
            </div>
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <div className="text-gray-600 mb-1">System Adoption</div>
              <div className="font-bold text-gray-900">{systemKpis.systemAdoptionRate}%</div>
            </div>
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <div className="text-gray-600 mb-1">Avg Logins/User</div>
              <div className="font-bold text-gray-900">{systemKpis.avgLogins}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded px-3 py-2">
              <div className="text-gray-600 mb-1">Avg Uploads/User</div>
              <div className="font-bold text-gray-900">{systemKpis.avgUploads}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-300 px-6 py-3">
        <p className="text-xs text-gray-600 text-center italic">
          Generated via Prabhaav Performance System — Automated Report • {new Date().toLocaleDateString('en-IN')}
        </p>
      </div>
    </div>
  );
};

// Helper component for standard KPI items
const KPIItem = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
    <div className="text-xs text-gray-600 mb-1">{label}</div>
    <div className="text-lg font-bold text-gray-900">{value}</div>
  </div>
);

// Helper component for behavioural items with progress bar
const BehaviouralItem = ({ label, score, maxScore }) => {
  const percentage = (score / maxScore) * 100;
  const getColor = () => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-600">{label}</div>
        <div className="text-sm font-bold text-gray-900">
          {score}/{maxScore}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default APARPreviewCard;
