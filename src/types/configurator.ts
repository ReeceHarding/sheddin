export type TabType = 'floor-plan' | 'doors-windows' | 'interior' | 'exterior';

export interface Option {
  id: string;
  label: string;
  price: number;
  image?: string;
  description?: string;
}

export interface OptionGroup {
  id: string;
  label: string;
  options: Option[];
}

export interface FloorPlan {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}