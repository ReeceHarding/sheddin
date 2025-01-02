import React from 'react';
import { StateSelector } from './StateSelector';
import { ProjectTypeSelector } from './ProjectTypeSelector';
import { PricingPreview } from './PricingPreview';

interface InitialCalculatorProps {
  selectedState: string;
  selectedType: string;
  onStateChange: (state: string) => void;
  onTypeChange: (type: string) => void;
  onContinue: () => void;
}

export const InitialCalculator: React.FC<InitialCalculatorProps> = ({
  selectedState,
  selectedType,
  onStateChange,
  onTypeChange,
  onContinue,
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Project Cost Calculator</h1>
        <p className="text-gray-600 mb-2">
          Average costs for your backyard ADU or Studio.
        </p>
        <p className="text-gray-500 text-sm">
          (Site work quoted by 3rd party contractors)
        </p>
      </div>

      <div className="space-y-12">
        <StateSelector
          selectedState={selectedState}
          onStateChange={onStateChange}
        />

        <ProjectTypeSelector
          selectedType={selectedType}
          onSelectType={onTypeChange}
        />

        {selectedState && selectedType && (
          <>
            <PricingPreview />
            <div className="text-center">
              <button
                onClick={onContinue}
                className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors"
              >
                DESIGN & PRICE YOUR STUDIO SHED
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};