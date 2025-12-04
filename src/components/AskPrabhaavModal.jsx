import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Lightbulb, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import KPIValueCard from './ai/KPIValueCard';
import TrendSparkline from './ai/TrendSparkline';
import DonutCard from './ai/DonutCard';
import InsightTextBlock from './ai/InsightTextBlock';
import SuggestionBox from './ai/SuggestionBox';
import MiniBarChart from './ai/MiniBarChart';
import { generateAIResponse } from './ai/aiResponseGenerator';

const AskPrabhaavModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState(null);
  const [hasUnsavedInput, setHasUnsavedInput] = useState(false);
  const textareaRef = useRef(null);
  const modalRef = useRef(null);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      if (!hasUnsavedInput || window.confirm('Close without submitting your query?')) {
        onClose();
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [query]);

  const handleSubmit = async () => {
    if (!query.trim() || isProcessing) return;

    setIsProcessing(true);
    setHasUnsavedInput(false);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(query);
      setResponse(aiResponse);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setHasUnsavedInput(e.target.value.trim().length > 0 && !response);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col mx-4 animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Ask Prabhaav</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Input Area */}
          <div className="mb-6">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={handleQueryChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any KPI, trend, or performance insight…"
                disabled={isProcessing}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-gray-900 placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
                style={{ minHeight: '60px', maxHeight: '120px' }}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">
                Press Enter to submit, Shift+Enter for new line
              </span>
              <button
                onClick={handleSubmit}
                disabled={!query.trim() || isProcessing}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Generate Insight'}
              </button>
            </div>
          </div>

          {/* Response Area */}
          {isProcessing && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-sm text-gray-600">Analyzing your query...</p>
            </div>
          )}

          {response && !isProcessing && (
            <div className="space-y-5">
              {/* KPI Value Cards */}
              {response.kpiValues && response.kpiValues.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {response.kpiValues.map((kpi, idx) => (
                    <KPIValueCard key={idx} {...kpi} />
                  ))}
                </div>
              )}

              {/* Trend Sparklines */}
              {response.trends && response.trends.length > 0 && (
                <div className="space-y-3">
                  {response.trends.map((trend, idx) => (
                    <TrendSparkline key={idx} {...trend} />
                  ))}
                </div>
              )}

              {/* Donut Charts */}
              {response.donuts && response.donuts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {response.donuts.map((donut, idx) => (
                    <DonutCard key={idx} {...donut} />
                  ))}
                </div>
              )}

              {/* Insight Text Blocks */}
              {response.insights && response.insights.length > 0 && (
                <div className="space-y-4">
                  {response.insights.map((insight, idx) => (
                    <InsightTextBlock key={idx} {...insight} />
                  ))}
                </div>
              )}

              {/* Mini Bar Charts */}
              {response.charts && response.charts.length > 0 && (
                <div className="space-y-4">
                  {response.charts.map((chart, idx) => (
                    <MiniBarChart key={idx} {...chart} />
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {response.suggestions && response.suggestions.length > 0 && (
                <div className="space-y-3">
                  {response.suggestions.map((suggestion, idx) => (
                    <SuggestionBox key={idx} text={suggestion} />
                  ))}
                </div>
              )}

              {/* Fallback Message */}
              {response.fallback && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-600 text-sm">{response.fallback}</p>
                </div>
              )}
            </div>
          )}

          {!response && !isProcessing && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-blue-600" size={36} />
              </div>
              <p className="text-gray-600 text-sm mb-2">Ready to provide insights</p>
              <p className="text-gray-500 text-xs max-w-md mx-auto">
                Ask about KPIs, trends, comparisons, or performance patterns across HQ, Field, Behavioural, Team, or System metrics
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskPrabhaavModal;
