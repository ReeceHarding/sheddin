import React from 'react';
import { OptionButton } from './OptionButton';
import type { Option } from '../../types/configurator';

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
    <h3 className="text-sm font-medium uppercase text-gray-500">{label}</h3>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <OptionButton
          key={option.id}
          label={option.label}
          isSelected={selectedId === option.id}
          onClick={() => onChange(option.id)}
          price={option.price}
        />
      ))}
    </div>
  </div>
);