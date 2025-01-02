import React from 'react';
import { INTERIOR_OPTIONS } from '../../../config/interiorOptions';

interface InteriorSectionProps {
  selectedOptions: Record<string, string>;
  onOptionChange: (category: string, value: string) => void;
}

export const InteriorSection: React.FC<InteriorSectionProps> = ({
  selectedOptions,
  onOptionChange
}) => {
  const [activeFinishTab, setActiveFinishTab] = React.useState<'fixtures' | 'countertops' | 'cabinets'>('fixtures');
  const [activeFlooringTab, setActiveFlooringTab] = React.useState<'main' | 'bath'>('main');

  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-medium text-center mb-12">
        Choose your interior finishes
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
            alt="Kitchen Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80"
            alt="Bathroom Interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Finishes Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">FINISHES</h3>
          <div className="flex space-x-2 mb-6">
            {['FIXTURES', 'COUNTERTOPS', 'CABINETS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFinishTab(tab.toLowerCase() as any)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeFinishTab === tab.toLowerCase()
                    ? 'bg-[#1A1F2C] text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {INTERIOR_OPTIONS[activeFinishTab].map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionChange(activeFinishTab, option.id)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedOptions[activeFinishTab] === option.id
                    ? 'ring-2 ring-primary'
                    : 'hover:ring-2 hover:ring-primary/50'
                }`}
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: option.color }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-sm text-white font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Flooring Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">FLOORING</h3>
          <div className="flex space-x-2 mb-6">
            {['MAIN', 'BATH'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFlooringTab(tab.toLowerCase() as any)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeFlooringTab === tab.toLowerCase()
                    ? 'bg-[#1A1F2C] text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {INTERIOR_OPTIONS[`${activeFlooringTab}Flooring`].map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionChange(`${activeFlooringTab}Flooring`, option.id)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedOptions[`${activeFlooringTab}Flooring`] === option.id
                    ? 'ring-2 ring-primary'
                    : 'hover:ring-2 hover:ring-primary/50'
                }`}
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: option.color }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-sm text-white font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};