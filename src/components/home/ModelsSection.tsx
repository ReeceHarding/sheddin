import React from 'react';
import { ModelCard } from './ModelCard';

export const ModelsSection = () => {
  const models = [
    {
      id: 'summit',
      name: 'Summit Series',
      image: '/images/home/exploreSummit.webp',
      description: 'ADUs and studios with bath, kitchen and bedroom interiors up to 1000 sf'
    },
    {
      id: 'aspect',
      name: 'Aspect',
      image: '/images/home/exploreAspect.webp',
      description: 'Accessory dwelling units in 1bd/1ba or 2bd/2ba floor plans'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Models</h2>
        <p className="text-gray-600 text-center mb-12">
          Explore our backyard studios and accessory dwelling units.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {models.map(model => (
            <ModelCard key={model.id} {...model} />
          ))}
        </div>
      </div>
    </section>
  );
};