import React from 'react';

interface PriceBreakdownProps {
  options: Record<string, any>;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ options }) => {
  const items = [
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

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="px-6 py-4 border-t border-b">
      <h3 className="font-medium mb-4">Your Troo Solutions</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-gray-700">
            <span>{item.label}</span>
            <span>${item.price.toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between pt-4 border-t font-medium">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};