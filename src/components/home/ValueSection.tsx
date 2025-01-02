import React from 'react';

export const ValueSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="/images/home/addValueGenerateIncomeADU.webp" 
              alt="Add Value"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Add Value</h3>
            <p className="text-gray-600">Generate income and increase your property value with an ADU</p>
          </div>
          <div className="text-center">
            <img 
              src="/images/home/predictableProcess.jpg" 
              alt="Predictable Process"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Predictable Process</h3>
            <p className="text-gray-600">Streamlined design and installation process nationwide</p>
          </div>
          <div className="text-center">
            <img 
              src="/images/home/fastTrackADUPeoplePic.jpg" 
              alt="Fast Track"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Fast Track</h3>
            <p className="text-gray-600">Quick delivery and installation with our proven system</p>
          </div>
        </div>
      </div>
    </section>
  );
};