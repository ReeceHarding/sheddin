import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConfiguratorHeader } from './ConfiguratorHeader';
import { FloorPlanSection } from './sections/FloorPlanSection';
import { DoorsWindowsSection } from './sections/DoorsWindowsSection';
import { InteriorSection } from './sections/InteriorSection';
import { ExteriorSection } from './sections/ExteriorSection';
import { SaveDesignForm } from './save-design/SaveDesignForm';
import { calculateTotalPrice } from '../../config/pricing';
import { useAuth } from '../../hooks/useAuth';

type SectionId = 'floor-plan' | 'doors-windows' | 'interior' | 'exterior';

export const ConfiguratorLayout = () => {
  const { user } = useAuth();
  const { modelId } = useParams();
  const [selectedOptions, setSelectedOptions] = React.useState({
    // Base options
    entry: 'front-entry',
    windows: 'more-glass',
    interior: 'fully-equipped',
    
    // Exterior options
    siding: 'lap',
    sidingColor: 'iron-gray',
    doorColor: 'factory-primed-white',
    trimColor: 'aluminum',
    exteriorAddon: 'none',
    roofAddon: 'none',
    
    // Interior finishes
    fixtures: 'matte-black',
    countertops: 'white-shaker',
    cabinets: 'white-shaker',
    mainFlooring: 'ashlar-oak',
    bathFlooring: 'ice-fog'
  });

  const [totalPrice, setTotalPrice] = React.useState(calculateTotalPrice(selectedOptions));

  useEffect(() => {
    const savedOptions = sessionStorage.getItem('savedDesignOptions');
    if (savedOptions) {
      setSelectedOptions(JSON.parse(savedOptions));
      sessionStorage.removeItem('savedDesignOptions');
    }
  }, []);

  const handleOptionChange = (category: string, value: string) => {
    setSelectedOptions(prev => {
      const newOptions = { ...prev, [category]: value };
      setTotalPrice(calculateTotalPrice(newOptions));
      return newOptions;
    });
  };

  const sectionRefs = {
    'floor-plan': useRef<HTMLDivElement>(null),
    'doors-windows': useRef<HTMLDivElement>(null),
    'interior': useRef<HTMLDivElement>(null),
    'exterior': useRef<HTMLDivElement>(null)
  };

  const scrollToSection = (sectionId: SectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <ConfiguratorHeader 
        totalPrice={totalPrice}
        selectedPlan="model-a"
        specs={{
          dimensions: '14x22',
          sqft: 308,
          features: ['Front Entry', 'More Glass'],
        }}
        options={selectedOptions}
        onTabClick={scrollToSection}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div ref={sectionRefs['floor-plan']}>
          <FloorPlanSection 
            onSelect={() => scrollToSection('doors-windows')}
          />
        </div>
        
        <div ref={sectionRefs['doors-windows']} className="mt-24">
          <DoorsWindowsSection 
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        </div>

        <div ref={sectionRefs['interior']} className="mt-24">
          <InteriorSection 
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        </div>

        <div ref={sectionRefs['exterior']} className="mt-24">
          <ExteriorSection 
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        </div>

        <div className="mt-24 border-t border-gray-200 pt-16">
          {!user ? (
            <SaveDesignForm options={selectedOptions} />
          ) : (
            <div className="max-w-2xl mx-auto">
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