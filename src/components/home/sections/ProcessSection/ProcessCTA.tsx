import React from 'react';
import { Link } from 'react-router-dom';

export const ProcessCTA = () => (
  <div className="text-center">
    <Link
      to="/design"
      className="inline-block bg-[#B87503] text-white px-8 py-4 rounded-md 
               hover:bg-[#9A6203] transition-all transform hover:scale-105 duration-200"
    >
      DESIGN & PRICE YOUR STUDIO SHED
    </Link>
  </div>
);