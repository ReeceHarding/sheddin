import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export const ValuePropositionSection = () => {
  const benefits = [
    'Flexible rental income, short or long term',
    'Proven ROI that adds property value',
    'Investment that pays for itself'
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <h2 className="text-4xl font-bold leading-tight">
              Add Value & Generate Income with an ADU
            </h2>
            
            <ul className="space-y-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFD700] 
                                flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Series Grid */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { name: 'Summit Series', image: '/images/home/exploreSummit.webp', path: '/models/summit' },
                { name: 'Aspect Series', image: '/images/home/exploreAspect.webp', path: '/models/aspect' }
              ].map(series => (
                <div key={series.name} className="group">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={series.image}
                      alt={series.name}
                      className="w-full h-full object-cover transition-transform duration-300 
                               group-hover:scale-105"
                    />
                  </div>
                  <Link
                    to={series.path}
                    className="inline-flex items-center text-[#B87503] hover:text-[#9A6203] 
                             font-medium group-hover:underline"
                  >
                    Explore {series.name}
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src="/images/home/addValueGenerateIncomeADU.webp"
              alt="Add value with an ADU"
              className="w-full rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};