import React from 'react';
import { Calendar } from 'lucide-react';

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
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-100">
      <h3 className="text-lg font-medium mb-4">Your Studio Shed</h3>
      
      <div className="space-y-4">
        {/* ... existing price breakdown content ... */}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <div className="text-right">
              <div className="font-bold text-lg">${totalPrice.toLocaleString()}</div>
              <div className="text-sm text-gray-600">
                or ${Math.round(totalPrice / 48).toLocaleString()}/month
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = '/consultation'}
          className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-md transition-colors flex items-center justify-center space-x-2"
        >
          <Calendar className="w-5 h-5" />
          <span>SCHEDULE A FREE CONSULTATION</span>
        </button>
      </div>
    </div>
  );
};