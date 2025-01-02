import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  price?: number;
  image: string;
}

interface OptionsSectionProps {
  activeTab: 'exterior' | 'roof';
  onTabChange: (tab: 'exterior' | 'roof') => void;
  options: Option[];
  selectedOption: string;
  onOptionSelect: (id: string) => void;
}

export const OptionsSection: React.FC<OptionsSectionProps> = ({
  activeTab,
  onTabChange,
  options,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-medium text-gray-700">OPTIONS</h3>
      
      {/* Tab Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onTabChange('exterior')}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'exterior'
              ? 'bg-[#1A1F2C] text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          EXTERIOR
        </button>
        <button
          onClick={() => onTabChange('roof')}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'roof'
              ? 'bg-[#1A1F2C] text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          ROOF
        </button>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option.id)}
            className={`relative group ${
              selectedOption === option.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={option.image}
                alt={option.label}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium">{option.label}</div>
              {option.price && option.price > 0 && (
                <div className="text-sm text-gray-600">+${option.price}</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-md flex items-center space-x-2">
          <span>NEXT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};