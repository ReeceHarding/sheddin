import React from 'react';

interface FinishOptionProps {
  id: string;
  label: string;
  image: string;
  selected: boolean;
  onClick: () => void;
}

export const FinishOption: React.FC<FinishOptionProps> = ({
  label,
  image,
  selected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`group relative aspect-square rounded-lg overflow-hidden transition-all ${
      selected ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
    }`}
  >
    <img
      src={image}
      alt={label}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
      <span className="text-sm text-white font-medium">{label}</span>
    </div>
  </button>
);