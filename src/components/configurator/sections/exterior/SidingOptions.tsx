import React from 'react';
import { ColorSelector } from './ColorSelector';
import { EXTERIOR_OPTIONS } from '../../../../config/exteriorOptions';

interface SidingOptionsProps {
  selectedSiding: string;
  selectedColor: string;
  onSidingChange: (id: string) => void;
  onColorChange: (id: string) => void;
}

export const SidingOptions: React.FC<SidingOptionsProps> = ({
  selectedSiding,
  selectedColor,
  onSidingChange,
  onColorChange,
}) => (
  <div className="space-y-8">
    <ColorSelector
      label="SIDING TYPE"
      options={EXTERIOR_OPTIONS.siding}
      selectedId={selectedSiding}
      onChange={onSidingChange}
      showPrices
    />
    <ColorSelector
      label="SIDING COLOR"
      options={EXTERIOR_OPTIONS.sidingColors}
      selectedId={selectedColor}
      onChange={onColorChange}
    />
  </div>
);