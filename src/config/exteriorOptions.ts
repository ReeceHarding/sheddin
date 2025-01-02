export const EXTERIOR_OPTIONS = {
  siding: [
    { id: 'lap', label: 'Lap Siding', price: 0, color: '#B0BEC5' },
    { id: 'plank', label: 'Plank Siding', price: 2156, color: '#78909C' },
    { id: 'cedar-plank', label: 'Cedar Plank', price: 8624, color: '#6D4C41' },
    { id: 'block', label: 'Block Siding', price: 3500, color: '#546E7A' }
  ],
  sidingColors: [
    { id: 'iron-gray', label: 'Iron Gray', color: '#4A5568' },
    { id: 'pearl-gray', label: 'Pearl Gray', color: '#CBD5E0' },
    { id: 'arctic-white', label: 'Arctic White', color: '#F7FAFC' },
    { id: 'boothbay-blue', label: 'Boothbay Blue', color: '#63B3ED' },
    { id: 'rich-espresso', label: 'Rich Espresso', color: '#6B4226' },
    { id: 'night-gray', label: 'Night Gray', color: '#2D3748' },
    { id: 'cobble-stone', label: 'Cobble Stone', color: '#A0AEC0' },
    { id: 'mountain-sage', label: 'Mountain Sage', color: '#90A4AE' }
  ],
  doorsColors: [
    { id: 'factory-primed-white', label: 'Factory Primed White', color: '#FFFFFF' },
    { id: 'iron-gray', label: 'Iron Gray', color: '#4A5568' },
    { id: 'pearl-gray', label: 'Pearl Gray', color: '#CBD5E0' },
    { id: 'arctic-white', label: 'Arctic White', color: '#F7FAFC' },
    { id: 'boothbay-blue', label: 'Boothbay Blue', color: '#63B3ED' },
    { id: 'rich-espresso', label: 'Rich Espresso', color: '#6B4226' },
    { id: 'tricorn-black', label: 'Tricorn Black', color: '#1A202C' },
    { id: 'naval', label: 'Naval', color: '#2C5282' }
  ],
  trimColors: [
    { id: 'aluminum', label: 'Aluminum', color: '#DCDCDC' },
    { id: 'studio-shed-bronze', label: 'Studio Shed Bronze', color: '#CD7F32' }
  ],
  exteriorAddons: [
    { id: 'none', label: 'None', price: 0 },
    { id: 'metal-wainscot', label: 'Metal Wainscot', price: 500 }
  ],
  roofAddons: [
    { id: 'none', label: 'None', price: 0 },
    { id: 'back-eaves-6inches', label: 'Back Eaves Shortened to 6 inches', price: 308 }
  ]
} as const;