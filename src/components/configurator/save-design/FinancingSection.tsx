import React from 'react';

export const FinancingSection = () => (
  <div className="pt-4 border-t text-center">
    <div className="flex items-center justify-center text-sm mb-2">
      <span className="mr-2">💳</span>
      Monthly Financing Available
    </div>
    <button className="text-primary hover:text-primary-hover text-sm">
      Explore finance options from our lending partners
    </button>
    <div className="flex items-center justify-center space-x-8 mt-4">
      <img src="/acorn-finance-logo.png" alt="Acorn Finance" className="h-6" />
      <img src="/renofi-logo.png" alt="RenoFi" className="h-6" />
    </div>
  </div>
);