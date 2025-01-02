// Types
interface PricingOptions {
  model?: string;
  entry?: string;
  windows?: string;
  interior?: string;
  [key: string]: string | undefined;
}

// Constants
const MODEL_PRICES: Record<string, number> = {
  'model-a': 92836,
  'model-b': 94992,
};

const OPTION_PRICES = {
  entry: {
    'side-entry': 2500,
  },
  windows: {
    'more-glass': 3500,
  },
  interior: {
    'fully-equipped': 25000,
  },
  siding: {
    'plank': 2156,
    'cedar-plank': 8624,
  },
  exteriorAddon: {
    'metal-wainscot': 500,
  },
  roofAddon: {
    'back-eaves-6inches': 308,
  },
  permitPlans: {
    'include': 5995,
  },
  installation: {
    'proassembly': 54034,
  },
} as const;

// Calculate base price with options
export const calculateTotalPrice = (options: PricingOptions): number => {
  // Default to model-a if no model specified
  const basePrice = MODEL_PRICES[options.model || 'model-a'] || MODEL_PRICES['model-a'];

  return Object.entries(options).reduce((total, [category, value]) => {
    if (value && OPTION_PRICES[category]?.[value]) {
      return total + OPTION_PRICES[category][value];
    }
    return total;
  }, basePrice);
};

// Calculate estimated total including all additional costs
export const calculateEstimatedTotal = (basePrice: number, options: Record<string, any>): number => {
  let total = basePrice;

  // Add permit plans if selected
  if (options.permitPlans === 'include') {
    total += OPTION_PRICES.permitPlans.include;
  }

  // Add installation cost if ProAssembly selected
  if (options.installation === 'proassembly') {
    total += OPTION_PRICES.installation.proassembly;
  }

  return total;
};

// Format price as currency string
export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};