import React from 'react';

type ActiveTab = 'quick-install' | 'national-footprint' | 'sustainable';

interface TabSelectorProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'quick-install', label: 'Quick Install' },
    { id: 'national-footprint', label: 'National Footprint' },
    { id: 'sustainable', label: 'Sustainable' }
  ] as const;

  return (
    <div className="flex justify-center space-x-4">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === tab.id
              ? 'bg-[#B87503] text-white'
              : 'text-gray-600 hover:text-[#B87503]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};