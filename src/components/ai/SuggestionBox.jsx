import React from 'react';
import { Lightbulb } from 'lucide-react';

const SuggestionBox = ({ text }) => {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
        <Lightbulb size={16} className="text-amber-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{text}</p>
      </div>
    </div>
  );
};

export default SuggestionBox;
