import React from 'react';

export const ProcessGlance = () => {
  return (
    <div id="toc-glance" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">PROCESS AT A GLANCE</h2>
        </div>
        
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/images/process/processAtAGlance.png"
              alt="Studio Shed Process at a Glance"
              className="w-full h-full object-contain bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};