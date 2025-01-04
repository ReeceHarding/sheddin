import React from 'react';

interface ColorOption {
  id: string;
  label: string;
  color: string;
  price?: number;
}

interface ColorSelectorProps {
  title: string;
  options: readonly ColorOption[] | ColorOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  title,
  options,
  selectedId,
  onSelect,
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`relative w-12 h-12 rounded-full ${
              selectedId === option.id
                ? 'ring-2 ring-offset-2 ring-primary'
                : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
            }`}
            title={`${option.label}${option.price ? ` (+$${option.price})` : ''}`}
          >
            <span
              className="block w-full h-full rounded-full"
              style={{ backgroundColor: option.color }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};