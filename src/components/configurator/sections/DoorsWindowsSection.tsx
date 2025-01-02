import React from 'react';
import { ImagePreview } from './doors-windows/ImagePreview';
import { OptionGroup } from './doors-windows/OptionGroup';
import { MirroredPlanMessage } from './doors-windows/MirroredPlanMessage';
import { useDoorsWindowsImages } from '../../../hooks/useDoorsWindowsImages';

interface DoorsWindowsSectionProps {
  selectedOptions: {
    entry: string;
    windows: string;
    interior: string;
  };
  onOptionChange: (category: string, value: string) => void;
}

export const DoorsWindowsSection: React.FC<DoorsWindowsSectionProps> = ({
  selectedOptions,
  onOptionChange,
}) => {
  const { exteriorImage, floorPlanImage } = useDoorsWindowsImages(selectedOptions);

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-medium text-center mb-12">
        Choose your door and window options
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="flex flex-col">
          <div className="flex-1">
            <ImagePreview
              src={exteriorImage}
              alt="Exterior View"
              className="h-full"
            />
          </div>
        </div>

        {/* Right Column - Floor Plan */}
        <div className="flex flex-col">
          <div className="flex-1">
            <ImagePreview
              src={floorPlanImage}
              alt="Floor Plan"
              className="h-full"
            />
            <div className="mt-4">
              <MirroredPlanMessage />
            </div>
          </div>
        </div>
      </div>

      {/* Options Section - Below Images */}
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="space-y-8">
          <OptionGroup
            label="ENTRY OPTIONS"
            options={[
              { id: 'front-entry', label: 'Front Entry', price: 0 },
              { id: 'side-entry', label: 'Side Entry', price: 2500 }
            ]}
            selectedId={selectedOptions.entry}
            onChange={(id) => onOptionChange('entry', id)}
          />

          <OptionGroup
            label="WINDOW OPTIONS"
            options={[
              { id: 'more-glass', label: 'More Glass', price: 3500 },
              { id: 'more-privacy', label: 'More Privacy', price: 0 }
            ]}
            selectedId={selectedOptions.windows}
            onChange={(id) => onOptionChange('windows', id)}
          />

          <OptionGroup
            label="INTERIOR OPTIONS"
            options={[
              { 
                id: 'fully-equipped',
                label: 'Fully Equipped',
                sublabel: 'With Kitchen/Bath/etc',
                price: 25000
              },
              { 
                id: 'shell-only',
                label: 'Shell Only',
                sublabel: 'No Interior',
                price: 0
              }
            ]}
            selectedId={selectedOptions.interior}
            onChange={(id) => onOptionChange('interior', id)}
          />
        </div>
      </div>
    </section>
  );
};