import React from 'react';
import { ColorSelector } from './ColorSelector';
import { EXTERIOR_OPTIONS } from '../../../../config/exteriorOptions';

interface TrimOptionsProps {
  selectedColor: string;
  onColorChange: (id: string) => void;
}

export const TrimOptions: React.FC<TrimOptionsProps> = ({
  selectedColor,
  onColorChange,
}) => (
  <ColorSelector
    label="TRIM COLOR"
    options={EXTERIOR_OPTIONS.trimColors}
    selectedId={selectedColor}
    onChange={onColorChange}
  />
);