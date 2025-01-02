import React from 'react';
import type { FloorPlan } from '../types';

interface FloorPlanSelectorProps {
  floorplans: FloorPlan[];
  selectedPlan: string;
  kitchenPosition: 'LEFT' | 'RIGHT';
  onSelectPlan: (id: string) => void;
  onKitchenPositionChange: (position: 'LEFT' | 'RIGHT') => void;
}

export const FloorPlanSelector: React.FC<FloorPlanSelectorProps> = ({
  floorplans,
  selectedPlan,
  kitchenPosition,
  onSelectPlan,
  onKitchenPositionChange,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Design & Price your Studio Shed</h2>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className={`px-4 py-2 rounded ${
              kitchenPosition === 'LEFT' ? 'bg-gray-900 text-white' : 'bg-gray-100'
            }`}
            onClick={() => onKitchenPositionChange('LEFT')}
          >
            LEFT KITCHEN
          </button>
          <button
            className={`px-4 py-2 rounded ${
              kitchenPosition === 'RIGHT' ? 'bg-gray-900 text-white' : 'bg-gray-100'
            }`}
            onClick={() => onKitchenPositionChange('RIGHT')}
          >
            RIGHT KITCHEN
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {floorplans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPlan === plan.id ? 'border-orange-500 shadow-lg' : 'border-gray-200'
            }`}
            onClick={() => onSelectPlan(plan.id)}
          >
            <img src={plan.image} alt={plan.title} className="w-full h-auto mb-4" />
            <h3 className="text-xl font-semibold text-center">{plan.title}</h3>
            <p className="text-gray-600 text-center">{plan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};