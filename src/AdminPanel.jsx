import React, { useState } from 'react';
import { Settings, Scale, FileText, Menu, X } from 'lucide-react';
import WeightEditor from './components/admin/WeightEditor';
import CalibrationPreview from './components/admin/CalibrationPreview';
import AuditTrail from './components/admin/AuditTrail';

const AdminPanel = () => {
  const [activeModule, setActiveModule] = useState('weights');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const modules = [
    { id: 'weights', label: 'Weight Editor', icon: Settings, component: WeightEditor },
    { id: 'calibration', label: 'Calibration Preview', icon: Scale, component: CalibrationPreview },
    { id: 'audit', label: 'Audit Trail', icon: FileText, component: AuditTrail }
  ];

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              <div className="text-xs text-gray-500 mt-0.5">
                Prabhaav KPI System / {modules.find(m => m.id === activeModule)?.label}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
            Senior Admin Access
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            bg-white border-r border-gray-200 transition-all duration-300
            ${sidebarOpen ? 'w-64' : 'w-0 lg:w-64'}
            overflow-hidden lg:overflow-visible
            fixed lg:sticky top-16 h-[calc(100vh-4rem)] z-30
          `}
        >
          <nav className="p-4 space-y-1">
            {modules.map(module => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium
                    transition-all duration-150
                    ${isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{module.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500 space-y-1">
              <div>System Version: v2.1.0</div>
              <div>Last Updated: Dec 2025</div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:ml-0 ml-0">
          <div className="max-w-7xl mx-auto">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
