import React, { createContext, useContext, useEffect, useState } from 'react';
import { calculateTotalPrice } from '../utils/pricing';
import { supabase } from '../lib/supabase';

interface ConfiguratorState {
  selectedModel: 'model-a' | 'model-b';
  options: Record<string, string>;
  totalPrice: number;
}

interface ConfiguratorContextType {
  state: ConfiguratorState;
  updateModel: (model: 'model-a' | 'model-b') => void;
  updateOption: (category: string, value: string) => void;
  refreshTotal: () => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export const ConfiguratorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ConfiguratorState>({
    selectedModel: 'model-a',
    options: {
      entry: 'front-entry',
      windows: 'more-glass',
      interior: 'fully-equipped',
      siding: 'lap',
      sidingColor: 'iron-gray',
      doorColor: 'factory-primed-white',
      trimColor: 'aluminum',
      exteriorAddon: 'none',
      roofAddon: 'none',
      permitPlans: '',     // empty or 'include'
      installation: '',    // empty or 'proassembly'
      foundation: ''       // 'concrete'|'wood'|'tbd'|''
    },
    totalPrice: 0
  });

  // On mount or when state updates, recalc price
  useEffect(() => {
    refreshTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshTotal = () => {
    const newPrice = calculateTotalPrice({
      model: state.selectedModel,
      ...state.options
    });
    setState(prev => ({ ...prev, totalPrice: newPrice }));
  };

  // Sync to supabase
  const syncToSupabase = async (newOptions: Record<string, string>, newTotal: number) => {
    // If user is logged in, update user_configs
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const user = session?.user;

    if (user) {
      // upsert user_configs with these new values
      const { error } = await supabase.from('user_configs').upsert({
        user_id: user.id,
        config_name: 'Current Configuration',
        options: newOptions,
        total_price: newTotal
      }, { onConflict: 'user_id' });
      if (error) {
        console.error('Error saving config to supabase:', error);
      }
    }
  };

  const updateModel = (model: 'model-a' | 'model-b') => {
    setState(prev => {
      const newOptions = { ...prev.options };
      const newTotal = calculateTotalPrice({ model, ...newOptions });
      syncToSupabase(newOptions, newTotal);
      return {
        ...prev,
        selectedModel: model,
        totalPrice: newTotal
      };
    });
  };

  const updateOption = (category: string, value: string) => {
    setState(prev => {
      const newOptions = { ...prev.options, [category]: value };
      const newTotal = calculateTotalPrice({ model: prev.selectedModel, ...newOptions });
      // store
      syncToSupabase(newOptions, newTotal);
      return {
        ...prev,
        options: newOptions,
        totalPrice: newTotal
      };
    });
  };

  return (
    <ConfiguratorContext.Provider
      value={{
        state,
        updateModel,
        updateOption,
        refreshTotal
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfigurator = () => {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
};