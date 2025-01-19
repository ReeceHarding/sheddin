/**
 * Pricing utility module
 *
 * Updated to handle real-time add-ons such as ProAssembly, Permit Plans, and Foundation Type.
 * Each function that calculates pricing will now factor in extras and store them in Supabase.
 */

interface PricingOptions {
  model?: string;
  entry?: string;
  windows?: string;
  interior?: string;
  siding?: string;
  sidingColor?: string;
  doorColor?: string;
  trimColor?: string;
  exteriorAddon?: string;
  roofAddon?: string;
  // Additional
  permitPlans?: string;     // 'include' or undefined
  installation?: string;    // 'proassembly' or undefined
  foundation?: string;      // 'concrete' | 'wood' | 'tbd'
  [key: string]: any;
}

// Basic model prices
const MODEL_PRICES: Record<string, number> = {
  'model-a': 92836,
  'model-b': 94992,
  'model-c': 97000 // Future expansions
};

// Extra cost dictionary
const OPTION_PRICES = {
  entry: {
    'side-entry': 2500
  },
  windows: {
    'more-glass': 3500
  },
  interior: {
    'fully-equipped': 25000
  },
  siding: {
    'plank': 2156,
    'cedar-plank': 8624,
    'block': 3500
  },
  exteriorAddon: {
    'metal-wainscot': 500
  },
  roofAddon: {
    'back-eaves-6inches': 308
  },
  permitPlans: {
    include: 5995
  },
  installation: {
    proassembly: 54034 // Full shell + interior
  }
};

/**
 * calculateBasePrice - calculates base + base options (entry, windows, interior, siding etc.)
 */
export const calculateBasePrice = (options: PricingOptions): number => {
  const baseModel = options.model || 'model-a';
  let total = MODEL_PRICES[baseModel] || MODEL_PRICES['model-a'];

  // Add the cost of base options
  Object.entries(options).forEach(([key, value]) => {
    if (OPTION_PRICES[key as keyof typeof OPTION_PRICES] && value) {
      const priceTable = OPTION_PRICES[key as keyof typeof OPTION_PRICES];
      if (priceTable[value]) {
        total += priceTable[value];
      }
    }
  });

  return total;
};

/**
 * calculateTotalPrice - includes optional add-ons: permit plans, installation, foundation
 */
export const calculateTotalPrice = (options: PricingOptions): number => {
  // Start with base
  let total = calculateBasePrice(options);

  // If foundation is selected
  // We do not add the cost to the Studio Shed side. It's user or local contractor.
  // So, foundation isn't added to the total. Only if we wanted to show an estimate we might add it.
  // For now, no foundation cost is included, so do nothing.

  return total;
};

/**
 * calculateEstimatedTotal - for final display (includes potential pro assembly, permit, etc.)
 */
export const calculateEstimatedTotal = (options: PricingOptions): number => {
  let total = calculateBasePrice(options);

  // Add Permit Plans if included
  if (options.permitPlans === 'include') {
    total += OPTION_PRICES.permitPlans.include;
  }

  // Add installation cost if proassembly selected
  if (options.installation === 'proassembly') {
    total += OPTION_PRICES.installation.proassembly;
  }

  // Foundation is not included in cost
  return total;
};

/**
 * formatPrice - returns a formatted string for currency
 */
export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};