import React from 'react';
import { Link } from 'react-router-dom';

export const ProcessSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="/images/home/predictableProcess.jpg"
              alt="Predictable Process"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="mt-4 text-sm italic text-gray-600">
              "Our project was completed exactly as planned, both in terms of time and budget. It's refreshing to work with a company that delivers on its promises!" - The Sandersons
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Predictable Process, Exceptional Results</h2>
            <p className="text-gray-600 mb-8">
              Studio Shed has a proven track record of completing every project on-time and on-budget. Fixed pricing ensures you can start your project with confidence.
            </p>
            <img
              src="/images/home/cyclePic.png"
              alt="Process Cycle"
              className="w-full max-w-md mx-auto"
            />
            <div className="mt-8 text-center">
              <Link
                to="/design"
                className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-hover transition-colors"
              >
                DESIGN & PRICE YOUR STUDIO SHED
              </Link>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] mb-20">
          <img
            src="/images/home/thirdHeroImage.jpg"
            alt="Studio Shed Exterior"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="relative h-[600px]">
          <img
            src="/images/home/fourthHeroImage.webp"
            alt="Studio Shed Interior"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};