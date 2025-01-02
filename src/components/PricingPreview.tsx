import React from 'react';

export const PricingPreview: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-5 text-center">
        <div className="bg-[#B87503] text-white p-4">
          <div className="text-2xl font-bold">$154K</div>
          <div className="text-sm mt-2">Product / Plans / Shipping</div>
          <div className="text-xs mt-1">20x50 Summit with 2 bedrooms, 2 baths, kitchen and Lifestyle interior</div>
        </div>
        <div className="bg-[#FDB913] text-white p-4">
          <div className="text-2xl font-bold">$83K</div>
          <div className="text-sm mt-2">Assembly</div>
          <div className="text-xs mt-1">Pro or DIY</div>
        </div>
        <div className="bg-[#808285] text-white p-4">
          <div className="text-2xl font-bold">$59K</div>
          <div className="text-sm mt-2">Site Work / Foundation</div>
        </div>
        <div className="bg-[#D1D3D4] text-gray-800 p-4">
          <div className="text-2xl font-bold">$11K</div>
          <div className="text-sm mt-2">Estimated taxes and permit fees</div>
        </div>
        <div className="bg-white border p-4">
          <div className="text-2xl font-bold">$307K</div>
          <div className="text-sm mt-2">Total</div>
          <div className="text-xs mt-1">or $2,366/month</div>
        </div>
      </div>
    </div>
  );
};