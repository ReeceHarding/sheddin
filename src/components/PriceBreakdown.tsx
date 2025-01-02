import React from 'react';

interface PriceBreakdownProps {
  totalPrice: number;
  selectedPlan: string;
  specs: {
    dimensions: string;
    sqft: number;
    features: string[];
  };
  options: Record<string, string>;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  totalPrice,
  specs,
  options,
}) => {
  const breakdown = [
    { label: 'Product / Plans / Shipping', price: 154000 },
    { label: 'Assembly', price: 83000 },
    { label: 'Site Work / Foundation', price: 59000 },
    { label: 'Estimated taxes and permit fees', price: 11000 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg">
      <h3 className="text-lg font-medium mb-4">Your Studio Shed</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="font-medium">Aspect</p>
            <p className="text-sm text-gray-600">{specs.dimensions} ({specs.sqft} sq ft)</p>
            {specs.features.map((feature, index) => (
              <p key={index} className="text-sm text-gray-600">{feature}</p>
            ))}
          </div>
          <span className="font-medium">${(breakdown[0].price).toLocaleString()}</span>
        </div>

        {breakdown.slice(1).map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">${item.price.toLocaleString()}</span>
          </div>
        ))}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <div className="text-right">
              <div className="font-bold text-lg">${totalPrice.toLocaleString()}</div>
              <div className="text-sm text-gray-600">or $2,366/month</div>
            </div>
          </div>
        </div>

        <button className="w-full py-3 px-4 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors">
          SAVE YOUR DESIGN
        </button>
      </div>
    </div>
  );
};