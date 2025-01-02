import React, { createContext, useContext, useState } from 'react';
import { calculateTotalPrice } from '../utils/pricing';

interface ConfiguratorState {
  selectedModel: 'model-a' | 'model-b';
  options: Record<string, string>;
  totalPrice: number;
}

interface ConfiguratorContextType {
  state: ConfiguratorState;
  updateModel: (model: 'model-a' | 'model-b') => void;
  updateOption: (category: string, value: string) => void;
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
    },
    totalPrice: calculateTotalPrice({
      model: 'model-a',
      entry: 'front-entry',
      windows: 'more-glass',
      interior: 'fully-equipped',
    })
  });

  const updateModel = (model: 'model-a' | 'model-b') => {
    setState(prev => ({
      ...prev,
      selectedModel: model,
      totalPrice: calculateTotalPrice({ ...prev.options, model })
    }));
  };

  const updateOption = (category: string, value: string) => {
    setState(prev => {
      const newOptions = { ...prev.options, [category]: value };
      return {
        ...prev,
        options: newOptions,
        totalPrice: calculateTotalPrice({ ...newOptions, model: prev.selectedModel })
      };
    });
  };

  return (
    <ConfiguratorContext.Provider value={{ state, updateModel, updateOption }}>
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