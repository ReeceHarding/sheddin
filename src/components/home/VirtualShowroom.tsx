import React from 'react';
import { Link } from 'react-router-dom';

export const VirtualShowroom = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Virtual Showroom</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <img 
            src="/images/home/virtualShowroom1.webp" 
            alt="Virtual Showroom 1"
            className="w-full aspect-video object-cover rounded-lg"
          />
          <img 
            src="/images/home/virtualShowroom2.webp" 
            alt="Virtual Showroom 2"
            className="w-full aspect-video object-cover rounded-lg"
          />
          <img 
            src="/images/home/virtualShowroom3.webp" 
            alt="Virtual Showroom 3"
            className="w-full aspect-video object-cover rounded-lg"
          />
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/design" 
            className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-hover transition-colors"
          >
            DESIGN YOUR OWN
          </Link>
        </div>
      </div>
    </section>
  );
};