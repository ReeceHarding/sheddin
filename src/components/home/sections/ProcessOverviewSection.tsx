import React from 'react';
import { Link } from 'react-router-dom';

export const ProcessOverviewSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From design through installation, we're here for you every step of the way. Get started with our 3D Design Center to see options and schedule a free consultation with a Studio Shed advisor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-500 font-bold text-xl">1</span>
            </div>
            <h3 className="font-bold text-xl mb-2">Design</h3>
            <p className="text-gray-600">Create your custom design using our 3D Design Center</p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-500 font-bold text-xl">2</span>
            </div>
            <h3 className="font-bold text-xl mb-2">Plan</h3>
            <p className="text-gray-600">Work with our team to finalize details and obtain permits</p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-500 font-bold text-xl">3</span>
            </div>
            <h3 className="font-bold text-xl mb-2">Build</h3>
            <p className="text-gray-600">Professional installation or DIY with our detailed guides</p>
          </div>
        </div>

        <div className="text-center">
          <Link 
            to="/process"
            className="inline-block bg-[#B87503] text-white px-8 py-4 rounded-md hover:bg-[#9A6203] transition-all transform hover:scale-105 duration-200"
          >
            LEARN MORE ABOUT THE PROCESS
          </Link>
        </div>
      </div>
    </section>
  );
};