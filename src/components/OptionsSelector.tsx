import React from 'react';
import type { Option } from '../types';

interface OptionsSelectorProps {
  options: Record<string, Option[]>;
  selectedOptions: Record<string, string>;
  onOptionChange: (category: string, optionId: string) => void;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  options,
  selectedOptions,
  onOptionChange,
}) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose your interior options</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(options).map(([category, categoryOptions]) => (
          <div key={category} className="space-y-2">
            {categoryOptions.map((option) => (
              <button
                key={option.id}
                className={`w-full p-4 text-left rounded ${
                  selectedOptions[category] === option.id
                    ? 'bg-orange-100 border-orange-500'
                    : 'bg-gray-50 border-gray-200'
                } border`}
                onClick={() => onOptionChange(category, option.id)}
              >
                <div className="flex justify-between">
                  <span>{option.name}</span>
                  <span className="font-semibold">
                    {option.price > 0 ? `+$${option.price.toLocaleString()}` : 'Included'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};