import React from 'react';

interface ViewSelectorProps {
  selectedView: 'front' | 'back' | 'left' | 'right';
  onViewChange: (view: 'front' | 'back' | 'left' | 'right') => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ selectedView, onViewChange }) => (
  <div className="flex justify-center space-x-2">
    {['FRONT', 'BACK', 'LEFT', 'RIGHT'].map((view) => (
      <button
        key={view}
        onClick={() => onViewChange(view.toLowerCase() as any)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          selectedView === view.toLowerCase()
            ? 'bg-[#1A1F2C] text-white'
            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        {view}
      </button>
    ))}
  </div>
);