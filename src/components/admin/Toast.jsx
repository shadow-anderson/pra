import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={18} className="text-green-600" />,
    error: <XCircle size={18} className="text-red-600" />,
    warning: <AlertCircle size={18} className="text-amber-600" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-amber-50 border-amber-200'
  };

  return (
    <div className={`fixed top-20 right-6 z-50 animate-slide-in-right`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-md border shadow-lg ${bgColors[type]} min-w-[300px]`}>
        {icons[type]}
        <span className="flex-1 text-sm text-gray-800">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
