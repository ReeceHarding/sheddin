import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PriceBreakdown } from './PriceBreakdown';

interface HeaderProps {
  totalPrice: number;
  selectedPlan: string;
  specs: {
    dimensions: string;
    sqft: number;
    features: string[];
  };
  options: Record<string, string>;
}

export const Header: React.FC<HeaderProps> = ({ totalPrice, selectedPlan, specs, options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-8">
            <img src="/troo-solutions-logo.svg" alt="Troo Solutions" className="h-8" />
            <nav className="hidden md:flex space-x-6">
              <button className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded">Floor Plan</button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500">Interior Kit</button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500">Interior Finishes</button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500">Exterior Options</button>
            </nav>
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-xl font-bold">${totalPrice.toLocaleString()}</span>
            {isDropdownOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-96 bg-white shadow-lg border border-gray-200 rounded-md z-50">
          <PriceBreakdown
            totalPrice={totalPrice}
            selectedPlan={selectedPlan}
            specs={specs}
            options={options}
          />
        </div>
      )}
    </header>
  );
};