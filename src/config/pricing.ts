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
    },
    doorStyle: {
      'door-5': 0,
      'door-6': 500,
      'door-7': 800,
      'door-8': 1200
    }
  }
} as const;

export const calculateTotalPrice = (selectedOptions: Record<string, string>): number => {
  const basePrice = PRICING.base;
  
  return Object.entries(selectedOptions).reduce<number>((total, [category, option]) => {
    const categoryPricing = PRICING.options[category as keyof typeof PRICING.options];
    if (!categoryPricing) return total;
    return total + (categoryPricing[option as keyof typeof categoryPricing] ?? 0);
  }, basePrice);
};