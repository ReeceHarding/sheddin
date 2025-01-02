import React from 'react';
import { Link } from 'react-router-dom';

export const FooterHero = () => {
  return (
    <div className="relative">
      <img
        src="/images/footer/1stFooter.png"
        alt="Design Center"
        className="w-full h-[600px] object-cover"
      />
      <div className="absolute inset-0 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-4">
              Design Your Studio Shed
            </h2>
            <p className="text-lg mb-8">
              One shed does not fit all. Our innovative prefab solution is a flat-packed, 
              panelized kits of parts with hundreds of customizations in the Design Center.
            </p>
            <Link
              to="/design"
              className="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-md transition-colors"
            >
              DESIGN & PRICE YOUR STUDIO SHED
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};