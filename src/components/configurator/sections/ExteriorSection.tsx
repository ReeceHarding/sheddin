import React, { useState } from 'react';
import { ViewControls } from './exterior/ViewControls';
import { SidingSelector } from './exterior/SidingSelector';
import { ColorSelector } from './exterior/ColorSelector';
import { ExteriorPreview } from './exterior/ExteriorPreview';
import { OptionsSelector } from './exterior/OptionsSelector';
import { EXTERIOR_OPTIONS } from '../../../config/exteriorOptions';

interface ExteriorSectionProps {
  selectedOptions: Record<string, string>;
  onOptionChange: (category: string, value: string) => void;
}

export const ExteriorSection: React.FC<ExteriorSectionProps> = ({
  selectedOptions,
  onOptionChange
}) => {
  const [selectedView, setSelectedView] = React.useState('front');
  const [activeColorTab, setActiveColorTab] = useState<'siding' | 'doors' | 'trim'>('siding');
  const [activeOptionTab, setActiveOptionTab] = useState<'exterior' | 'roof'>('exterior');

  const getColorOptions = () => {
    switch (activeColorTab) {
      case 'siding':
        return {
          title: 'Siding Colors',
          options: EXTERIOR_OPTIONS.sidingColors
        };
      case 'doors':
        return {
          title: 'Door Colors',
          options: EXTERIOR_OPTIONS.doorsColors
        };
      case 'trim':
        return {
          title: 'Trim Colors',
          options: EXTERIOR_OPTIONS.trimColors
        };
      default:
        return {
          title: '',
          options: []
        };
    }
  };

  const { title, options } = getColorOptions();

  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-medium text-center mb-8">
        Choose your exterior finishes and options
      </h2>

      {/* Preview */}
      <div className="aspect-w-16 aspect-h-9 bg-[#F5F5F5] rounded-lg overflow-hidden mb-4">
        <ExteriorPreview selectedView={selectedView} />
      </div>

      {/* View Controls */}
      <ViewControls 
        selectedView={selectedView}
        onViewChange={setSelectedView}
      />

      <div className="grid md:grid-cols-2 gap-16 mt-12">
        {/* Left Column - Siding */}
        <div>
          <h3 className="text-sm font-medium uppercase mb-4">SIDING</h3>
          <div className="grid grid-cols-3 gap-4">
            {EXTERIOR_OPTIONS.siding.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionChange('siding', option.id)}
                className={`text-center ${
                  selectedOptions.siding === option.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-2" />
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-600">
                  {option.price === 0 ? '+$0' : `+$${option.price.toLocaleString()}`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Colors & Options */}
        <div className="space-y-8">
          {/* Color Tabs */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">COLORS</h3>
            <div className="flex gap-2 mb-4">
              {['SIDING', 'DOORS', 'TRIM'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveColorTab(tab.toLowerCase() as any)}
                  className={`px-4 py-2 text-sm font-medium rounded ${
                    activeColorTab === tab.toLowerCase()
                      ? 'bg-[#1A1F2C] text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <ColorSelector
              title={title}
              options={options}
              selectedId={selectedOptions[`${activeColorTab}Color`]}
              onSelect={(value) => onOptionChange(`${activeColorTab}Color`, value)}
            />
          </div>

          {/* Options */}
          <div>
            <h3 className="text-sm font-medium uppercase mb-4">OPTIONS</h3>
            <div className="flex gap-2 mb-4">
              {['EXTERIOR', 'ROOF'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveOptionTab(tab.toLowerCase() as any)}
                  className={`px-4 py-2 text-sm font-medium rounded ${
                    activeOptionTab === tab.toLowerCase()
                      ? 'bg-[#1A1F2C] text-white'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <OptionsSelector
              options={EXTERIOR_OPTIONS[`${activeOptionTab}Addons`]}
              selectedOption={selectedOptions[`${activeOptionTab}Addon`]}
              onOptionSelect={(value) => onOptionChange(`${activeOptionTab}Addon`, value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};