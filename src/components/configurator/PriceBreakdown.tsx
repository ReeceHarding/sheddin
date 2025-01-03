import React from 'react';
import { useAuth } from '../../hooks/useAuth';

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

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Studio Shed</h3>
        
        {/* Base Model */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="font-medium">Summit 308 Model B</h4>
            <p className="text-sm text-gray-600">14x22 (308 sq ft)</p>
            <p className="text-sm text-gray-600">Side Entry / More Glass</p>
          </div>
          <span className="font-medium">${totalPrice.toLocaleString()}</span>
        </div>

        <div className="space-y-3">
          {/* Exterior Options */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Siding: {formatOptionName('siding', options.siding)} / {formatOptionName('sidingColor', options.sidingColor)}</p>
            </div>
            <span className="text-sm">$0</span>
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

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Exterior Options</p>
            </div>
            <span className="text-sm">$0</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Roof Options</p>
            </div>
            <span className="text-sm">$0</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Window Options</p>
            </div>
            <span className="text-sm">$0</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <span className="font-medium">Total</span>
          <span className="font-medium">${totalPrice.toLocaleString()}</span>
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