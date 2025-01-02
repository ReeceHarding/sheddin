import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <div className="relative h-screen">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/home/heroImage.webp"
          alt="Studio Shed Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white max-w-4xl mx-auto leading-tight">
            High-Quality Nimble Building Kit
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            16 Years in Business, 5000+ Completed Projects, <span className="text-[#FFD700]">Nationwide</span>.
          </p>
          <Link
            to="/design"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md font-medium 
                     hover:bg-gray-100 transition-colors transform hover:scale-105 duration-200"
          >
            DESIGN YOUR OWN
          </Link>
        </div>
      </div>
    </div>
  );
};