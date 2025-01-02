import React, { useState } from 'react';
import { Header } from './Header';
import { FloorPlanSelector } from './FloorPlanSelector';
import { OptionsSelector } from './OptionsSelector';
import { floorplans } from '../data/floorplans';
import { interiorOptions } from '../data/options';

interface FloorplanConfiguratorProps {
  selectedOptions: Record<string, string>;
  onOptionChange: (category: string, option: string, price: number) => void;
  totalPrice: number;
}

export const FloorplanConfigurator: React.FC<FloorplanConfiguratorProps> = ({
  selectedOptions,
  onOptionChange,
  totalPrice,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(floorplans[0].id);
  const [kitchenPosition, setKitchenPosition] = useState<'LEFT' | 'RIGHT'>('LEFT');

  const specs = {
    dimensions: '20x50',
    sqft: 1000,
    features: ['More Living', 'More Operable', 'Standard Roof'],
  };

  return (
    <div>
      <Header
        totalPrice={totalPrice}
        selectedPlan={selectedPlan}
        specs={specs}
        options={selectedOptions}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <FloorPlanSelector
          floorplans={floorplans}
          selectedPlan={selectedPlan}
          kitchenPosition={kitchenPosition}
          onSelectPlan={setSelectedPlan}
          onKitchenPositionChange={setKitchenPosition}
        />
        <OptionsSelector
          options={interiorOptions}
          selectedOptions={selectedOptions}
          onOptionChange={(category, optionId) => {
            const option = interiorOptions[category].find(opt => opt.id === optionId);
            if (option) {
              onOptionChange(category, optionId, option.price);
            }
          }}
        />
      </div>
    </div>
  );
};