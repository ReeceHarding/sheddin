import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const TabGroup: React.FC<TabGroupProps> = ({ tabs, activeTab, onChange }) => (
  <div className="flex space-x-2">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === tab.id
            ? 'bg-[#1A1F2C] text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);