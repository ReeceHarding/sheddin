import React from 'react';
import { ConsultationForm } from '../components/consultation/ConsultationForm';
import { ConsultationHeader } from '../components/consultation/ConsultationHeader';

export const ConsultationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black/60">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Column - Form */}
              <div className="p-8 md:p-12">
                <ConsultationHeader />
                <ConsultationForm />
              </div>

              {/* Right Column - Image */}
              <div className="relative h-full min-h-[600px]">
                <img
                  src="/images/consultation/consultation.png"
                  alt="Studio Shed Consultation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};