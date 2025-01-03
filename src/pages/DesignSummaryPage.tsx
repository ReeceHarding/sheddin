import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useParams } from 'react-router-dom';

export const DesignSummaryPage: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Info */}
          <div className="mb-4">
            <p className="text-gray-600">a aa</p>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">a</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Images */}
            <div className="space-y-8">
              {/* 3D Model */}
              <div>
                <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/summit308Final.jpg"
                    alt="Summit 308 Model B"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floor Plan */}
              <div>
                <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/floorPlan.jpg"
                    alt="Floor Plan"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Interior Design Previews */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/interiorDesignKitchen.png"
                    alt="Kitchen Design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/interiorDesignBathroom.png"
                    alt="Bathroom Design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Design Info and Details */}
            <div>
              {/* Design Info */}
              <div className="mb-8">
                <div>
                  <h1 className="text-2xl font-medium mb-2">Summit 308 Model B 14x22</h1>
                  <p className="text-gray-600">Studio · 1 Bath</p>
                  <p className="text-gray-600">Shell Only</p>
                  <p className="text-gray-600">(B-2-b) Side Entry / More Privacy</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="text-sm bg-gray-100 px-3 py-1 rounded-md">Design Details</button>
                    <p className="text-gray-500 text-sm">aa-ef0aa6fd</p>
                    <p className="text-gray-500 text-sm">January 2, 2025</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-medium mb-2">$41,090</p>
                  <Link to="/design/summit/308" className="text-[#B87503] hover:text-[#9A6203]">
                    Edit your design →
                  </Link>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-8 border-t pt-8">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Shipping to Wausau, WI (54403)</p>
                  <p className="font-medium">Included</p>
                </div>
              </div>

              {/* Assembly Info */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#B87503] hover:text-[#9A6203] cursor-pointer">ProAssembly: Shell Only →</p>
                    <p className="text-sm text-gray-500">Subject to availability</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Included</p>
                    <p className="text-[#B87503] hover:text-[#9A6203] text-sm cursor-pointer">Remove</p>
                  </div>
                </div>
              </div>

              {/* Permit Plans */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <p className="text-[#B87503] hover:text-[#9A6203] cursor-pointer">Include Permit Plans →</p>
                  <p className="font-medium">Included</p>
                </div>
              </div>

              {/* Foundation Type */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <p className="text-[#B87503] hover:text-[#9A6203] cursor-pointer">Select your foundation type →</p>
                  <p className="font-medium">-</p>
                </div>
              </div>

              {/* Site Work Info */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Site work and permitting</p>
                  <p className="font-medium">Cost not included</p>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-medium">Estimated Total</p>
                    <p className="text-gray-600">Includes product, delivery, assembly, and permit plans.</p>
                    <p className="text-[#B87503] hover:text-[#9A6203] cursor-pointer underline">Learn more about typical project costs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-medium mb-1">$64,464</p>
                    <Link to="/start-order" className="text-[#B87503] hover:text-[#9A6203]">
                      Start your order →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financing Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-500">💰</span>
              <h2 className="text-xl font-medium">Monthly Financing Available</h2>
            </div>
            <p className="text-gray-600 mb-4 underline cursor-pointer">
              Explore finance options from our lending partners
            </p>
            <div className="flex justify-between items-center">
              <img 
                src="/summit308/final/acorn-finance-logo-compressed.svg" 
                alt="Acorn Finance" 
                className="h-8"
              />
              <img 
                src="/summit308/final/renofiLogo.svg" 
                alt="RenoFi" 
                className="h-8"
              />
            </div>
          </div>

          {/* Consultation Section */}
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Schedule a Free Online Consultation with a Studio Shed Advisor</h2>
            <p className="text-gray-600 mb-8">
              Book your free, no-obligation Zoom consultation with our friendly experts to discuss your project plans and get personalized guidance.
            </p>
            <Link
              to="/consultation"
              className="block bg-[#B87503] hover:bg-[#9A6203] text-white font-medium py-4 px-6 rounded-lg text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">📅</span>
                <div className="text-left">
                  <p className="font-medium">Schedule a Free Online Consultation →</p>
                  <p className="text-sm">Select the next available date and time on our calendar</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 