import React from 'react';
import { Calendar } from 'lucide-react';

export const ConsultationSection = () => (
  <div className="pt-8">
    <h2 className="text-xl font-medium mb-2">
      Schedule a Free Online Consultation with a Troo Solutions Advisor
    </h2>
    <p className="text-gray-600 mb-4">
      Book your free, no-obligation Zoom consultation with our friendly experts to discuss your
      project plans and get personalized guidance.
    </p>
    <button 
      onClick={() => window.location.href = '/consultation'}
      className="w-full bg-primary hover:bg-primary-hover text-white rounded-lg py-4 flex items-center justify-center space-x-2"
    >
      <Calendar className="w-5 h-5" />
      <span>Schedule a Free Online Consultation</span>
    </button>
    <p className="text-sm text-gray-500 text-center mt-2">
      Select the next available date and time on our calendar
    </p>
  </div>
);