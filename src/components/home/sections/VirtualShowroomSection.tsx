import React from 'react';
import { Link } from 'react-router-dom';

export const VirtualShowroomSection = () => {
  const showroomImages = [
    '/images/home/virtualShowroom1.webp',
    '/images/home/virtualShowroom2.webp',
    '/images/home/virtualShowroom3.webp'
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Tour our virtual showroom
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore the Summit Series in a full 360° experience and visualize ADU sizes, interior furnishings and finishes, and sample staged interiors.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {showroomImages.map((image, index) => (
            <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <img
                src={image}
                alt={`Virtual Showroom ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/virtual-tour"
            className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-hover transition-colors"
          >
            TAKE THE TOUR
          </Link>
        </div>
      </div>
    </section>
  );
};