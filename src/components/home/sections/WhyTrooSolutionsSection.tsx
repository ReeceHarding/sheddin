import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, XCircle } from 'lucide-react';

export const WhyTrooSolutionsSection = () => {
  const [activeTab, setActiveTab] = useState<'national' | 'quick' | 'complete'>('national');

  const tabs = [
    { id: 'national', label: 'National Footprint' },
    { id: 'quick', label: 'Quick Install' },
    { id: 'complete', label: 'On-Time, On-Budget' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'national':
        return (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/home/dreamSpaceNationalADULeaderMap.jpg"
                alt="National Coverage Map"
                className="w-full rounded-lg shadow-md"
              />
              <div className="mt-6 text-center">
                <div className="font-bold text-xl">16 Years in Business</div>
                <div className="text-gray-600">5,000+ Completed Projects</div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                Build Your Dream Space with the National Leader in ADUs
              </h3>
              <p className="text-gray-600">
                At Troo Solutions, we combine innovative design with superior craftsmanship to create structures that stand the test of time.
              </p>
              <Link
                to="/design"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors"
              >
                Design & Price Your Troo Solutions
              </Link>
            </div>
          </div>
        );
      case 'quick':
        return (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                Fast-Track Your ADU with Our Innovative System
              </h3>
              <div className="flex items-center justify-center space-x-12">
                <div className="text-center">
                  <Truck className="w-12 h-12 text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">We Pack & Ship</div>
                </div>
                <div className="text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">No Cranes</div>
                </div>
              </div>
              <p className="text-gray-600">
                Our innovative panelized system brings your backyard vision to life quickly and easily, without heavy machinery or complex installations.
              </p>
              <Link
                to="/design"
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-hover transition-colors"
              >
                Start Your Design
              </Link>
            </div>
            <div>
              <img
                src="/images/home/fastTrackADUPeoplePic.jpg"
                alt="Happy Troo Solutions Customers"
                className="w-full rounded-lg shadow-md"
              />
              <p className="mt-4 text-sm italic text-gray-600">
                "We were amazed at how straightforward the Troo Solutions process was. No cranes, no fuss - just a beautiful, functional space." - The Jumps, Arizona
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Troo Solutions?</h2>
        
        <div className="flex justify-center gap-4 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </section>
  );
};