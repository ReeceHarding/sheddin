import React from 'react';

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  sublabel?: string;
  price: number;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  selected,
  onClick,
  label,
  sublabel,
  price
}) => (
  <button 
    className={`w-full px-4 py-3 rounded-md text-left transition-all ${
      selected
        ? 'bg-primary text-white shadow-md transform scale-[1.02]'
        : 'bg-white border border-gray-200 text-gray-700 hover:border-primary/20 hover:bg-primary/5'
    }`}
    onClick={onClick}
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="font-medium">{label}</div>
        {sublabel && (
          <div className={`text-sm mt-0.5 ${selected ? 'text-white/90' : 'text-gray-500'}`}>
            {sublabel}
          </div>
        )}
      </div>
      <div className={`text-sm ${selected ? 'text-white/90' : 'text-gray-500'}`}>
        {price === 0 ? 'Included' : `+$${price.toLocaleString()}`}
      </div>
    </div>
  </button>
);