import React from 'react';

interface ConfiguratorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ConfiguratorTabs: React.FC<ConfiguratorTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'floor-plan', label: 'Floor Plan' },
    { id: 'doors-windows', label: 'Doors & Windows' },
    { id: 'interior', label: 'Interior Finishes' },
    { id: 'exterior', label: 'Exterior Options' },
  ];

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-4 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};