import React from 'react';
import { Link } from 'react-router-dom';

export const InvestmentSection = () => {
  return (
    <section className="relative h-[50vh]">
      <div className="absolute inset-0">
        <img
          src="/images/home/yourNextGreatInvestment.webp"
          alt="Your Next Great Investment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Your Next Great Investment
            </h2>
            <Link
              to="/design"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md 
                       font-medium hover:bg-gray-100 transition-all duration-200 
                       transform hover:scale-105"
            >
              DESIGN & PRICE YOUR STUDIO SHED
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};