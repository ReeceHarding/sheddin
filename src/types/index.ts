export interface FloorPlan {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
  };
}

export interface Option {
  id: string;
  name: string;
  price: number;
}

export interface ConfiguratorState {
  selectedPlan: string;
  kitchenPosition: 'LEFT' | 'RIGHT';
  options: {
    [key: string]: string;
  };
  basePrice: number;
}