import React from 'react';

const tabs = [
  { id: 'national', label: 'National Footprint' },
  { id: 'quick', label: 'Quick Install' },
  { id: 'complete', label: 'On-Time, On-Budget' }
] as const;

interface TabSelectorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => (
  <div className="flex justify-center gap-4">
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
          ${activeTab === tab.id
            ? 'bg-[#B87503] text-white'
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);