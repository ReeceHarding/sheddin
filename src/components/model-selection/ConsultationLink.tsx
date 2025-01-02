import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ConsultationLink = () => (
  <div className="text-center py-8">
    <Link
      to="/consultation"
      className="inline-flex items-center text-[#B87503] hover:text-[#9A6203] 
                font-medium transition-colors group gap-2"
    >
      Request a Free Consultation with a Studio Shed Advisor
      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
    </Link>
  </div>
);