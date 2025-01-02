import React from 'react';

interface SizeOption {
  id: string;
  name: string;
  dimensions: string;
  specs: string;
  image: string;
}

interface SizeSelectorProps {
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  onContinue: () => void;
}

const summitSizes: SizeOption[] = [
  {
    id: 'summit-308',
    name: 'Summit 308',
    dimensions: '14\' x 22\'',
    specs: 'Studio · 1 bath',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'summit-440',
    name: 'Summit 440',
    dimensions: '20\' x 22\'',
    specs: 'Studio or 1 bed · 1 bath',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'summit-476',
    name: 'Summit 476',
    dimensions: '14\' x 34\'',
    specs: '1 bed · 1 bath',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'summit-608',
    name: 'Summit 608',
    dimensions: '16\' x 38\'',
    specs: '1 bed · 1 bath',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'summit-680',
    name: 'Summit 680',
    dimensions: '20\' x 34\'',
    specs: '1 - 2 bed · 1 bath',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'summit-800',
    name: 'Summit 800',
    dimensions: '20\' x 40\'',
    specs: '2 bed · 1 - 2 bath',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'summit-1000',
    name: 'Summit 1000',
    dimensions: '20\' x 50\'',
    specs: '2 bed · 2 bath',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
  },
];

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  onSizeSelect,
  onContinue,
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Design & Price your Summit</h1>
        <h2 className="text-xl mt-8 mb-12">Choose your size</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summitSizes.map((size) => (
          <div
            key={size.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedSize === size.id
                ? 'border-orange-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => {
              onSizeSelect(size.id);
              onContinue();
            }}
          >
            <img
              src={size.image}
              alt={size.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold">{size.name}</h3>
              <p className="text-gray-600">{size.dimensions} · {size.specs}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};