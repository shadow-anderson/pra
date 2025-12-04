import React from 'react';

const InsightTextBlock = ({ title, content, bullets }) => {
  return (
    <div className="border-l-4 border-blue-600 bg-blue-50 bg-opacity-30 p-4 rounded-r-lg">
      {title && (
        <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      )}
      
      {content && (
        <p className="text-sm text-gray-700 leading-relaxed mb-3">{content}</p>
      )}
      
      {bullets && bullets.length > 0 && (
        <ul className="space-y-1.5">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 mt-1">•</span>
              <span className="flex-1">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsightTextBlock;
