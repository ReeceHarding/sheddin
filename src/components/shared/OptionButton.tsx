import React from 'react';

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  price?: number;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  isSelected,
  onClick,
  price,
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
      ${isSelected 
        ? 'bg-orange-500 text-white' 
        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
      }`}
  >
    <span>{label}</span>
    {price !== undefined && (
      <span className="ml-2 text-xs">
        {price === 0 ? 'Included' : `+$${price.toLocaleString()}`}
      </span>
    )}
  </button>
);