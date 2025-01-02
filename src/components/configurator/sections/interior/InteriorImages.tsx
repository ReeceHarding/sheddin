import React from 'react';

export const InteriorImages = () => (
  <div className="grid md:grid-cols-2 gap-8">
    <div className="aspect-w-3 aspect-h-2 bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80"
        alt="Kitchen Interior"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="aspect-w-3 aspect-h-2 bg-white rounded-lg overflow-hidden shadow-md">
      <img
        src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80"
        alt="Bathroom Interior"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);