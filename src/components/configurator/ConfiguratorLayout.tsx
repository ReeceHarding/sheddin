import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConfiguratorHeader } from './ConfiguratorHeader';
import { FloorPlanSection } from './sections/FloorPlanSection';
import { DoorsWindowsSection } from './sections/DoorsWindowsSection';
import { InteriorSection } from './sections/InteriorSection';
import { ExteriorSection } from './sections/ExteriorSection';
import { SaveDesignForm } from './save-design/SaveDesignForm';
import { calculateTotalPrice } from '../../utils/pricing';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

type SectionId = 'floor-plan' | 'doors-windows' | 'interior' | 'exterior';

export const ConfiguratorLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { modelId } = useParams();
  const [configId, setConfigId] = React.useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = React.useState({
    // Base options
    entry: 'front-entry',
    windows: 'more-privacy',
    interior: 'shell-only',
    
    // Exterior options
    siding: 'lap',
    sidingColor: '',
    doorColor: '',
    trimColor: '',
    exteriorAddon: 'none',
    roofAddon: '',
    
    // Interior finishes
    fixtures: '',
    countertops: '',
    cabinets: '',
    mainFlooring: '',
    bathFlooring: ''
  });

  const [totalPrice, setTotalPrice] = React.useState(calculateTotalPrice(selectedOptions));

  // Create or update configuration in database
  const saveConfiguration = async (options: typeof selectedOptions) => {
    if (!user) return;

    try {
      console.log('Saving configuration with options:', options);
      const calculatedPrice = calculateTotalPrice(options);
      console.log('Calculated total price:', calculatedPrice);
      
      if (configId) {
        console.log('Updating existing configuration:', configId);
        const { error: updateError } = await supabase
          .from('user_configs')
          .update({ 
            options,
            total_price: calculatedPrice
          })
          .eq('id', configId);

        if (updateError) throw updateError;
        console.log('Successfully updated configuration');
      } else {
        console.log('Creating new configuration');
        const { data: configData, error: insertError } = await supabase
          .from('user_configs')
          .insert({
            user_id: user.id,
            config_name: 'Summit 308 Configuration',
            options,
            model_id: modelId || '308',
            total_price: calculatedPrice
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (configData) {
          console.log('Successfully created configuration:', configData.id);
          setConfigId(configData.id);
        }
      }
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  const handleOptionChange = async (category: string, value: string) => {
    console.log(`Changing ${category} to ${value}`);
    const newOptions = { ...selectedOptions, [category]: value };
    const newTotalPrice = calculateTotalPrice(newOptions);
    console.log('New total price:', newTotalPrice);
    
    setSelectedOptions(newOptions);
    setTotalPrice(newTotalPrice);
    
    // Save to database if user is logged in
    if (user) {
      await saveConfiguration(newOptions);
    }
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

  const handleViewDesign = async () => {
    console.log('1. handleViewDesign called');
    console.log('1a. User:', user);
    
    if (!user) {
      console.log('2. No user found, scrolling to save form');
      const saveDesignForm = document.querySelector('#save-design-form');
      if (saveDesignForm) {
        saveDesignForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      console.log('3. Starting design save process');
      console.log('3a. Current options:', selectedOptions);
      console.log('3b. Current total price:', totalPrice);
      console.log('3c. Current configId:', configId);
      
      let designId = configId;
      
      // If no existing config, create a new one
      if (!designId) {
        console.log('4. Creating new configuration');
        const { data: configData, error: configError } = await supabase
          .from('user_configs')
          .insert({
            user_id: user.id,
            config_name: 'Summit 308 Configuration',
            options: selectedOptions,
            model_id: modelId || '308',
            total_price: totalPrice
          })
          .select()
          .single();

        if (configError) {
          console.error('5. Error saving configuration:', configError);
          throw configError;
        }

        if (!configData?.id) {
          console.error('6. No configuration ID returned');
          throw new Error('No configuration ID returned after save');
        }

        designId = configData.id;
        setConfigId(designId);
        console.log('7. Successfully created configuration:', designId);
      } else {
        console.log('8. Updating existing configuration:', designId);
        const { error: updateError } = await supabase
          .from('user_configs')
          .update({ 
            options: selectedOptions,
            total_price: totalPrice
          })
          .eq('id', designId);

        if (updateError) {
          console.error('9. Error updating configuration:', updateError);
          throw updateError;
        }
        console.log('10. Successfully updated configuration');
      }

      console.log('11. Navigating to:', `/designs/${designId}`);
      navigate(`/designs/${designId}`);
    } catch (error) {
      console.error('12. Error in handleViewDesign:', error);
      alert('There was an error saving your design. Please try again.');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // Load existing configuration if user is logged in
  useEffect(() => {
    async function loadConfiguration() {
      if (!user) return;

      try {
        const { data: configData, error: configError } = await supabase
          .from('user_configs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (configError) throw configError;
        if (configData) {
          setConfigId(configData.id);
          setSelectedOptions(configData.options);
          setTotalPrice(calculateTotalPrice(configData.options));
        }
      } catch (error) {
        console.error('Error loading configuration:', error);
      }
    }

    loadConfiguration();
  }, [user]);

  return (
    <div className="min-h-screen bg-white">
      <ConfiguratorHeader 
        totalPrice={totalPrice}
        selectedPlan="model-a"
        specs={{
          dimensions: '14x22',
          sqft: 308,
          features: ['Side Entry', 'More Privacy'],
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
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleViewDesign}
                  className="bg-[#B87503] hover:bg-[#9A6203] text-white font-medium py-3 px-8 rounded-md transition-colors"
                >
                  VIEW YOUR DESIGN
                </button>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};