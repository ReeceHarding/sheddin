export const PRICING = {
  base: 92836,
  options: {
    // Base options
    entry: {
      'front-entry': 0,
      'side-entry': 2500
    },
    windows: {
      'more-glass': 3500,
      'more-privacy': 0
    },
    interior: {
      'fully-equipped': 25000,
      'shell-only': 0
    },
    // Exterior options
    siding: {
      'lap': 0,
      'plank': 2156,
      'cedar-plank': 8624,
      'block': 3500
    },
    exteriorAddon: {
      'none': 0,
      'metal-wainscot': 500
    },
    roofAddon: {
      'none': 0,
      'back-eaves-6inches': 308
    }
  }
} as const;

export const calculateTotalPrice = (selectedOptions: Record<string, string>): number => {
  const basePrice = PRICING.base;
  
  return Object.entries(selectedOptions).reduce((total, [category, option]) => {
    const categoryPricing = PRICING.options[category as keyof typeof PRICING.options];
    return total + (categoryPricing?.[option] || 0);
  }, basePrice);
};