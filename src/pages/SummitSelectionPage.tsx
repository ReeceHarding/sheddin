import React from 'react';
import { SummitSizeCard } from '../components/summit/SummitSizeCard';

const summitSizes = [
  {
    id: '308',
    name: 'Summit 308',
    dimensions: '14\' x 22\'',
    specs: 'Studio · 1 bath',
    image: '/images/designYourSummit/summit308.png'
  },
  {
    id: '440',
    name: 'Summit 440',
    dimensions: '20\' x 22\'',
    specs: 'Studio or 1 bed · 1 bath',
    image: '/images/designYourSummit/summit440.png'
  },
  {
    id: '476',
    name: 'Summit 476',
    dimensions: '14\' x 34\'',
    specs: '1 bed · 1 bath',
    image: '/images/designYourSummit/summit476.png'
  },
  {
    id: '608',
    name: 'Summit 608',
    dimensions: '16\' x 38\'',
    specs: '1 bed · 1 bath',
    image: '/images/designYourSummit/summit608.png'
  },
  {
    id: '680',
    name: 'Summit 680',
    dimensions: '20\' x 34\'',
    specs: '1 - 2 bed · 1 bath',
    image: '/images/designYourSummit/summit680.png'
  },
  {
    id: '800',
    name: 'Summit 800',
    dimensions: '20\' x 40\'',
    specs: '2 bed · 1 - 2 bath',
    image: '/images/designYourSummit/summit800.png'
  },
  {
    id: '1000',
    name: 'Summit 1000',
    dimensions: '20\' x 50\'',
    specs: '2 bed · 2 bath',
    image: '/images/designYourSummit/summit1000.png'
  }
];

export const SummitSelectionPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-4">Design & Price your Summit</h1>
          <h2 className="text-xl text-gray-600">Choose your size</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {summitSizes.map((size) => (
            <SummitSizeCard key={size.id} {...size} />
          ))}
        </div>

        <div className="text-center text-sm text-gray-500">
          © <a href="/" className="hover:text-gray-700">Troo Solutions - ADUs and Studios</a>
        </div>
      </div>
    </div>
  );
};