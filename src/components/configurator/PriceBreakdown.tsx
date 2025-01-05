import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { calculateTotalPrice } from '../../utils/pricing';

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
  selectedPlan,
  specs,
  options,
}) => {
  const { user } = useAuth();
  
  const formatOptionName = (key: string, value: string) => {
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleButtonClick = () => {
    if (!user) {
      // If user is not signed in, scroll to the save design form
      const saveDesignForm = document.querySelector('#save-design-form');
      if (saveDesignForm) {
        saveDesignForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // If user is signed in, navigate to their design details
      window.location.href = `/designs/${user.id}`;
    }
  };

  // Calculate individual prices
  const sidingPrice = options.siding === 'cedar-plank' ? 8624 : 
                     options.siding === 'plank' ? 2156 :
                     options.siding === 'block' ? 3500 : 0;
  const entryPrice = options.entry === 'side-entry' ? 2500 : 0;
  const windowsPrice = options.windows === 'more-glass' ? 3500 : 0;
  const interiorPrice = options.interior === 'fully-equipped' ? 25000 : 0;
  const exteriorAddonPrice = options.exteriorAddon === 'metal-wainscot' ? 500 : 0;
  const roofAddonPrice = options.roofAddon === 'back-eaves-6inches' ? 308 : 0;

  // Calculate design total (base + options)
  const designTotal = 41090 + sidingPrice + entryPrice + windowsPrice + interiorPrice + exteriorAddonPrice + roofAddonPrice;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Troo Solutions</h3>
        
        {/* Base Model */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="font-medium">Summit 308 Model B</h4>
            <p className="text-sm text-gray-600">14x22 (308 sq ft)</p>
            <p className="text-sm text-gray-600">{formatOptionName('entry', options.entry)} / {formatOptionName('windows', options.windows)}</p>
          </div>
          <span className="font-medium">$41,090</span>
        </div>

        <div className="space-y-3">
          {/* Entry and Windows */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Entry: {formatOptionName('entry', options.entry)}</p>
            </div>
            <span className="text-sm">${entryPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Windows: {formatOptionName('windows', options.windows)}</p>
            </div>
            <span className="text-sm">${windowsPrice.toLocaleString()}</span>
          </div>

          {/* Interior */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Interior: {formatOptionName('interior', options.interior)}</p>
            </div>
            <span className="text-sm">${interiorPrice.toLocaleString()}</span>
          </div>

          {/* Exterior Options */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Siding: {formatOptionName('siding', options.siding)} / {formatOptionName('sidingColor', options.sidingColor)}</p>
            </div>
            <span className="text-sm">${sidingPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Door: {formatOptionName('doorColor', options.doorColor)}</p>
            </div>
            <span className="text-sm">$0</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Trim: {formatOptionName('trimColor', options.trimColor)}</p>
            </div>
            <span className="text-sm">$0</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Fascia: {formatOptionName('sidingColor', options.sidingColor)}</p>
            </div>
            <span className="text-sm">$0</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Soffit: Unfinished</p>
            </div>
            <span className="text-sm">$0</span>
          </div>

          {options.exteriorAddon !== 'none' && (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Exterior Add-on: {formatOptionName('exteriorAddon', options.exteriorAddon)}</p>
              </div>
              <span className="text-sm">${exteriorAddonPrice.toLocaleString()}</span>
            </div>
          )}

          {options.roofAddon !== 'none' && (
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Roof Add-on: {formatOptionName('roofAddon', options.roofAddon)}</p>
              </div>
              <span className="text-sm">${roofAddonPrice.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <span className="font-medium">Design Total</span>
          <span className="font-medium">${designTotal.toLocaleString()}</span>
        </div>

        {/* Dynamic Button based on auth state */}
        <button 
          onClick={handleButtonClick}
          className="w-full mt-6 bg-[#B87503] hover:bg-[#9A6203] text-white font-medium py-3 px-4 rounded transition-colors"
        >
          {user ? 'VIEW YOUR DESIGN' : 'SAVE YOUR DESIGN'}
        </button>
      </div>
    </div>
  );
};