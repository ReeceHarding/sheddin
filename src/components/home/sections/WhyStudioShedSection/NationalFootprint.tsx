import React from 'react';
import { Link } from 'react-router-dom';

export const NationalFootprint = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <img
        src="/images/home/dreamSpaceNationalADULeaderMap.jpg"
        alt="National Coverage Map"
        className="w-full rounded-lg shadow-md"
      />
      <div className="mt-6 text-center">
        <div className="font-bold text-2xl">16 Years in Business</div>
        <div className="text-gray-600">5,000+ Completed Projects</div>
      </div>
    </div>
    <div className="space-y-6">
      <h3 className="text-3xl font-bold leading-tight">
        Build Your Dream Space with the National Leader in ADUs
      </h3>
      <p className="text-lg text-gray-600">
        At Studio Shed, we combine innovative design with superior craftsmanship 
        to create structures that stand the test of time.
      </p>
      <Link
        to="/design"
        className="inline-block bg-[#B87503] text-white px-8 py-4 rounded-md 
                 hover:bg-[#9A6203] transition-all transform hover:scale-105 duration-200"
      >
        Design & Price Your Studio Shed
      </Link>
    </div>
  </div>
);