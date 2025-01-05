import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[70vh]">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <img
          src="/images/home/heroImage.webp"
          alt="Troo Solutions Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              High-Quality Nimble Building Kit
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              16 Years in Business, 5000+ Completed Projects, {' '}
              <span className="text-[#FFD700]">Nationwide</span>.
            </p>
            <Link
              to="/design"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md 
                       font-medium hover:bg-gray-100 transition-all duration-200 
                       transform hover:scale-105"
            >
              DESIGN YOUR OWN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};