import React from 'react';
import { Link } from 'react-router-dom';

const models = [
  {
    id: 'aspect',
    name: 'Aspect',
    image: '/images/home/ourModelsAspect.png',
    description: 'Modern ADU designs with flexible layouts'
  },
  {
    id: 'summit',
    name: 'Summit Series',
    image: '/images/home/ourModelsSummit.png',
    description: 'Versatile spaces for any backyard need'
  },
  {
    id: 'signature',
    name: 'Signature Series',
    image: '/images/home/ourModelsSigniture.png',
    description: 'Classic designs with timeless appeal'
  },
  {
    id: 'portland',
    name: 'Portland Series',
    image: '/images/home/ourModelsPortland.png',
    description: 'Pacific Northwest inspired designs'
  }
];

export const ModelsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Models</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our backyard studios and accessory dwelling units.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {models.map(model => (
            <Link 
              key={model.id}
              to={`/models/${model.id}`}
              className="group block"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                  <p className="text-white/90">{model.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};