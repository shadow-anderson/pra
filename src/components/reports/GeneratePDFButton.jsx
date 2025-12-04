import React from 'react';
import { Download, FileCheck } from 'lucide-react';

const GeneratePDFButton = ({ onClick, disabled, isGenerating, employeeCount }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        disabled={disabled || isGenerating}
        className={`
          flex items-center gap-3 px-8 py-4 text-base font-semibold rounded-lg
          transition-all duration-200 shadow-md hover:shadow-xl
          ${disabled || isGenerating
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
          }
        `}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent"></div>
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <Download size={20} />
            <span>Generate Signed PDF</span>
            {employeeCount > 0 && (
              <span className="ml-1 px-2.5 py-0.5 bg-white bg-opacity-20 rounded-full text-sm">
                {employeeCount} {employeeCount === 1 ? 'report' : 'reports'}
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default GeneratePDFButton;
