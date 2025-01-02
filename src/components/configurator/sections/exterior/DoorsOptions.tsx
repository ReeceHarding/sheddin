import React from 'react';
import { ColorSelector } from './ColorSelector';
import { EXTERIOR_OPTIONS } from '../../../../config/exteriorOptions';

interface DoorsOptionsProps {
  selectedColor: string;
  onColorChange: (id: string) => void;
}

export const DoorsOptions: React.FC<DoorsOptionsProps> = ({
  selectedColor,
  onColorChange,
}) => (
  <ColorSelector
    label="DOOR COLOR"
    options={EXTERIOR_OPTIONS.doorColors}
    selectedId={selectedColor}
    onChange={onColorChange}
  />
);