import React from 'react';

interface Option {
  id: string;
  label: string;
  price: number;
}

interface OptionsSelectorProps {
  options: Option[];
  selectedOption: string;
  onOptionSelect: (id: string) => void;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  options,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onOptionSelect(option.id)}
          className={`p-4 text-center border rounded-lg ${
            selectedOption === option.id
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="aspect-video bg-gray-100 rounded mb-2" />
          <div className="font-medium">{option.label}</div>
          {option.price > 0 && (
            <div className="text-sm text-gray-600">+${option.price}</div>
          )}
        </button>
      ))}
    </div>
  );
};