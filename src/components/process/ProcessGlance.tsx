import React from 'react';

export const ProcessGlance = () => {
  return (
    <div className="bg-white py-24" id="process-at-a-glance">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">PROCESS AT A GLANCE</h2>
        <div className="relative">
          <img 
            src="/images/process/processAtAGlance.png"
            alt="Troo Solutions Process Timeline"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};