import React from 'react';
import { OptionButton } from './OptionButton';

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
}) => (
  <div className="space-y-3">
    <h3 className="text-sm font-medium text-gray-500 tracking-wide">{label}</h3>
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <OptionButton
          key={option.id}
          selected={selectedId === option.id}
          onClick={() => onChange(option.id)}
          label={option.label}
          sublabel={option.sublabel}
          price={option.price}
        />
      ))}
    </div>
  </div>
);