import React from 'react';
import { useConfigurator } from '../../../context/ConfiguratorContext';

interface FloorPlanSectionProps {
  onSelect: () => void;
}

export const FloorPlanSection: React.FC<FloorPlanSectionProps> = ({ onSelect }) => {
  const { state, updateModel } = useConfigurator();

  return (
    <section className="mb-24">
      <h2 className="text-2xl font-medium text-center mb-8">Choose your floorplan</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div 
          className={`border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow ${
            state.selectedModel === 'model-a' ? 'border-orange-500' : 'border-gray-200'
          }`}
          onClick={() => {
            updateModel('model-a');
            onSelect();
          }}
        >
          <div className="aspect-w-4 aspect-h-3 mb-4">
            <img 
              src="/summit308/floorPlans/modelA.jpg"
              alt="Model A - Larger Kitchen"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="font-medium">Model A</h3>
            <p className="text-gray-600">Larger Kitchen</p>
          </div>
        </div>

        <div 
          className={`border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow ${
            state.selectedModel === 'model-b' ? 'border-orange-500' : 'border-gray-200'
          }`}
          onClick={() => {
            updateModel('model-b');
            onSelect();
          }}
        >
          <div className="aspect-w-4 aspect-h-3 mb-4">
            <img 
              src="/summit308/floorPlans/modelB.jpg"
              alt="Model B - Smaller Kitchen"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="font-medium">Model B</h3>
            <p className="text-gray-600">Smaller Kitchen</p>
          </div>
        </div>
      </div>
    </section>
  );
};