import { useRef, useEffect } from 'react';
import { ConfiguratorHeader } from './ConfiguratorHeader';
import { FloorPlanSection } from './sections/FloorPlanSection';
import { DoorsWindowsSection } from './sections/DoorsWindowsSection';
import { InteriorSection } from './sections/InteriorSection';
import { ExteriorSection } from './sections/ExteriorSection';
import { SaveDesignForm } from './save-design/SaveDesignForm';
import { calculateEstimatedTotal } from '../../utils/pricing';
import { useAuth } from '../../hooks/useAuth';
import { useConfigurator } from '../../context/ConfiguratorContext';
import { HouseVisualizer } from './threeD/HouseVisualizer';

type SectionId = 'floor-plan' | 'doors-windows' | 'interior' | 'exterior';

// Define the expected options type
interface ConfigOptions {
  entry: string;
  windows: string;
  interior: string;
  doorStyle: string;
  [key: string]: string; // Allow additional string properties
}

export const ConfiguratorLayout = () => {
  const { user } = useAuth();
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

  const handleAddOnChange = (category: string, value: string) => {
    updateOption(category, value);
  };

  const estimatedTotal = calculateEstimatedTotal({
    model: state.selectedModel,
    ...state.options
  });

  // Cast options to the expected type
  const options = state.options as ConfigOptions;

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
        options={options}
        onTabClick={scrollToSection}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-24">
          <div ref={sectionRefs['floor-plan']}>
            <FloorPlanSection onSelect={() => scrollToSection('doors-windows')} />
          </div>

          <div ref={sectionRefs['doors-windows']}>
            <DoorsWindowsSection
              selectedOptions={options}
              onOptionChange={updateOption}
            />
          </div>

          <div ref={sectionRefs['interior']}>
            <InteriorSection
              selectedOptions={options}
              onOptionChange={updateOption}
            />
          </div>

          <div ref={sectionRefs['exterior']}>
            <ExteriorSection
              selectedOptions={options}
              onOptionChange={updateOption}
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900">3D Model Preview</h2>
            <div className="w-full">
              <HouseVisualizer />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['door-5', 'door-6', 'door-7', 'door-8'].map((doorId) => (
                <button
                  key={doorId}
                  onClick={() => updateOption('doorStyle', doorId)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    options.doorStyle === doorId
                      ? 'border-[#B87503] bg-[#B87503] text-white'
                      : 'border-gray-200 hover:border-[#B87503]'
                  }`}
                >
                  Door Style {doorId.split('-')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-16">
            {!user ? (
              <SaveDesignForm options={options} />
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
        </div>
      </main>
    </div>
  );
};