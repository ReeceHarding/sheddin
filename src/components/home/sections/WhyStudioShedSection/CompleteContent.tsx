import React from 'react';
import { Link } from 'react-router-dom';
import { ProcessImages } from '../ProcessSection/ProcessImages';
import { ProcessSteps } from '../ProcessSection/ProcessSteps';

export const CompleteContent = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <ProcessImages />
    <ProcessSteps />
    <div className="md:col-span-2 text-center mt-8">
      <Link
        to="/design"
        className="inline-block bg-[#B87503] text-white px-8 py-4 rounded-md 
                 hover:bg-[#9A6203] transition-all transform hover:scale-105 duration-200"
      >
        DESIGN & PRICE YOUR STUDIO SHED
      </Link>
    </div>
  </div>
);