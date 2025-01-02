import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="relative h-screen">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="/images/home/heroImage.webp"
          alt="Studio Shed Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            High-Quality Nimble Building Kit
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            16 Years in Business, 5000+ Completed Projects, <span className="text-[#FFD700]">Nationwide</span>.
          </p>
          <Link
            to="/design"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            DESIGN YOUR OWN
          </Link>
        </div>
      </div>
    </div>
  );
};