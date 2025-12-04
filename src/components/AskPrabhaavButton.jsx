import React from 'react';
import { Sparkles } from 'lucide-react';

const AskPrabhaavButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Ask Prabhaav AI"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
        
        {/* Main button */}
        <div className="relative flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105">
          <Sparkles size={20} className="animate-pulse" />
          <span className="font-semibold text-sm">Ask Prabhaav</span>
        </div>
      </div>
    </button>
  );
};

export default AskPrabhaavButton;
