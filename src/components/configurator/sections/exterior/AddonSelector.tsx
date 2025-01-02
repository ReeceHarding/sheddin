import React from 'react';

interface Option {
  id: string;
  label: string;
  price: number;
}

interface AddonSelectorProps {
  label: string;
  options: Option[];
  selectedId: string;
  onChange: (id: string) => void;
}

export const AddonSelector: React.FC<AddonSelectorProps> = ({
  label,
  options,
  selectedId,
  onChange
}) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-gray-500 tracking-wide">{label}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`w-full px-4 py-3 rounded-md text-left transition-all ${
            selectedId === option.id
              ? 'bg-primary text-white shadow-md transform scale-[1.02]'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-primary/20 hover:bg-primary/5'
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{option.label}</span>
            <span className={selectedId === option.id ? 'text-white/90' : 'text-gray-500'}>
              {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
            </span>
          </div>
        </button>
      ))}
    </div>
  </div>
);