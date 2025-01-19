import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConfiguratorHeader } from './ConfiguratorHeader';
import { FloorPlanSection } from './sections/FloorPlanSection';
import { DoorsWindowsSection } from './sections/DoorsWindowsSection';
import { InteriorSection } from './sections/InteriorSection';
import { ExteriorSection } from './sections/ExteriorSection';
import { SaveDesignForm } from './save-design/SaveDesignForm';
import { calculateEstimatedTotal } from '../../utils/pricing';
import { useAuth } from '../../hooks/useAuth';
import { useConfigurator } from '../../context/ConfiguratorContext';

type SectionId = 'floor-plan' | 'doors-windows' | 'interior' | 'exterior';

export const ConfiguratorLayout = () => {
  const { user } = useAuth();
  const { modelId } = useParams();
  const { state, refreshTotal, updateOption } = useConfigurator();

  const sectionRefs = {
    'floor-plan': useRef<HTMLDivElement>(null),
    'doors-windows': useRef<HTMLDivElement>(null),
    'interior': useRef<HTMLDivElement>(null),
    'exterior': useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    refreshTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Add a function to handle changes for "permitPlans", "installation", or "foundation"
  // This can be used by child components to update add-on choices in real-time
  const handleAddOnChange = (category: string, value: string) => {
    updateOption(category, value);
  };

  const estimatedTotal = calculateEstimatedTotal({
    model: state.selectedModel,
    ...state.options
  });

  return (
    <div className="min-h-screen bg-white">
      <ConfiguratorHeader
        totalPrice={state.totalPrice}
        selectedPlan={state.selectedModel}
        specs={{
          dimensions: '14x22',
          sqft: 308,
          features: ['Front Entry', 'More Glass'],
        }}
        options={state.options}
        onTabClick={scrollToSection}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div ref={sectionRefs['floor-plan']}>
          <FloorPlanSection onSelect={() => scrollToSection('doors-windows')} />
        </div>

        <div ref={sectionRefs['doors-windows']} className="mt-24">
          <DoorsWindowsSection
            selectedOptions={state.options}
            onOptionChange={updateOption}
          />
        </div>

        <div ref={sectionRefs['interior']} className="mt-24">
          <InteriorSection
            selectedOptions={state.options}
            onOptionChange={updateOption}
          />
        </div>

        <div ref={sectionRefs['exterior']} className="mt-24">
          <ExteriorSection
            selectedOptions={state.options}
            onOptionChange={updateOption}
          />
        </div>

        <div className="mt-24 border-t border-gray-200 pt-16">
          {!user ? (
            <SaveDesignForm options={state.options} />
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="text-center text-xl">
                Estimated Total: ${estimatedTotal.toLocaleString()}
              </div>
              <div className="flex justify-center">
                <a
                  href={`/designs/${user.id}`}
                  className="bg-[#B87503] hover:bg-[#9A6203] text-white font-medium py-3 px-8 rounded-md transition-colors"
                >
                  VIEW YOUR DESIGN
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};