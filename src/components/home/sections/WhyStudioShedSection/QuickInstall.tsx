import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, XCircle } from 'lucide-react';

export const QuickInstall = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className="space-y-8">
      <h3 className="text-3xl font-bold leading-tight">
        Fast-Track Your ADU with Our Innovative System
      </h3>
      <div className="flex items-center justify-center space-x-16">
        <div className="text-center">
          <Truck className="w-16 h-16 text-[#B87503] mx-auto mb-3" />
          <div className="text-lg font-medium">We Pack & Ship</div>
        </div>
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
          <div className="text-lg font-medium">No Cranes</div>
        </div>
      </div>
      <p className="text-lg text-gray-600">
        Our innovative panelized system brings your backyard vision to life quickly 
        and easily, without heavy machinery or complex installations.
      </p>
      <Link
        to="/design"
        className="inline-block bg-[#B87503] text-white px-8 py-4 rounded-md 
                 hover:bg-[#9A6203] transition-all transform hover:scale-105 duration-200"
      >
        Start Your Design
      </Link>
    </div>
    <div>
      <img
        src="/images/home/fastTrackADUPeoplePic.jpg"
        alt="Happy Studio Shed Customers"
        className="w-full rounded-lg shadow-lg mb-4"
      />
      <p className="text-sm italic text-gray-600">
        "We were amazed at how straightforward the Studio Shed process was. 
        No cranes, no fuss - just a beautiful, functional space." 
        - The Jumps, Arizona
      </p>
    </div>
  </div>
);