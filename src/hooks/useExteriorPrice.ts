import { useMemo } from 'react';
import { calculateExteriorPrice } from '../utils/pricing';

export const useExteriorPrice = (options: {
  siding: string;
  sidingColor: string;
  doorColor: string;
  trimColor: string;
  exteriorAddon: string;
  roofAddon: string;
}) => {
  return useMemo(() => calculateExteriorPrice(options), [
    options.siding,
    options.exteriorAddon,
    options.roofAddon
  ]);
};