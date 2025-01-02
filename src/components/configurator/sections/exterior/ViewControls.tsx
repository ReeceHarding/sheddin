import React from 'react';

interface ViewControlsProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

export const ViewControls: React.FC<ViewControlsProps> = ({ selectedView, onViewChange }) => {
  const views = ['FRONT', 'BACK', 'LEFT', 'RIGHT'];
  
  return (
    <div className="flex justify-center gap-2">
      {views.map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view.toLowerCase())}
          className={`px-6 py-2 text-sm font-medium rounded ${
            selectedView === view.toLowerCase()
              ? 'bg-[#1A1F2C] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
};