import React from 'react';
import { formatPrice } from '../../../utils/pricing';

interface PricingDetailsProps {
  options: Record<string, any>;
  basePrice: number;
}

export const PricingDetails: React.FC<PricingDetailsProps> = ({ options, basePrice }) => {
  const pricingItems = [
    { label: 'Summit 308 Model A', price: 92836 },
    { label: 'Siding: Plank / Iron Gray', price: 2156 },
    { label: 'Door: Factory Primed White', price: 0 },
    { label: 'Trim: Clear Anodized Aluminum', price: 0 },
    { label: 'Fascia: Iron Gray', price: 0 },
    { label: 'Soffit: Unfinished', price: 0 },
    { label: 'Exterior Options', price: 0 },
    { label: 'Roof Options', price: 0 },
    { label: 'Window Options', price: 0 }
  ];

  return (
    <div className="space-y-4 p-6 border-t border-b">
      <h3 className="text-xl font-medium text-gray-900">Your Troo Solutions</h3>
      
      <div className="space-y-3">
        {pricingItems.map((item, index) => (
          <div key={index} className="flex justify-between text-gray-900">
            <span>{item.label}</span>
            <span>{formatPrice(item.price)}</span>
          </div>
        ))}
        
        <div className="flex justify-between pt-4 border-t">
          <span className="font-medium text-gray-900">Total</span>
          <span className="font-medium text-gray-900">{formatPrice(basePrice)}</span>
        </div>
      </div>
    </div>
  );
};