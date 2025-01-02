import React from 'react';

interface Option {
  id: string;
  label: string;
  sublabel?: string;
  price: number;
}

interface OptionGroupProps {
  label: string;
  options: Option[];
  selectedId: string;
  onChange: (id: string) => void;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({
  label,
  options,
  selectedId,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`w-full px-4 py-3 rounded-md text-left transition-colors ${
              selectedId === option.id
                ? 'bg-orange-500 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{option.label}</span>
                {option.sublabel && (
                  <span className="block text-sm opacity-80">{option.sublabel}</span>
                )}
              </div>
              {option.price > 0 && (
                <span className="text-sm">+${option.price.toLocaleString()}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};