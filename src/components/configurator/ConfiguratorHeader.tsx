import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PriceBreakdown } from './PriceBreakdown';

interface ConfiguratorHeaderProps {
  totalPrice: number;
  selectedPlan: string;
  specs: {
    dimensions: string;
    sqft: number;
    features: string[];
  };
  options: Record<string, string>;
  onTabClick: (tab: string) => void;
}

export const ConfiguratorHeader: React.FC<ConfiguratorHeaderProps> = ({
  totalPrice,
  selectedPlan,
  specs,
  options,
  onTabClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { id: 'floor-plan', label: 'Floor Plan' },
    { id: 'doors-windows', label: 'Doors & Windows' },
    { id: 'interior', label: 'Interior Finishes' },
    { id: 'exterior', label: 'Exterior Options' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8">
            <img src="/studio-shed-logo.svg" alt="Studio Shed" className="h-8" />
            <nav className="hidden md:flex space-x-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-white group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-xl font-bold">${totalPrice.toLocaleString()}</span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
      </div>
      
      <div className={`
        absolute right-0 mt-1 w-96 transform transition-all duration-300 ease-in-out
        ${isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <PriceBreakdown
          totalPrice={totalPrice}
          selectedPlan={selectedPlan}
          specs={specs}
          options={options}
        />
      </div>
    </header>
  );
};