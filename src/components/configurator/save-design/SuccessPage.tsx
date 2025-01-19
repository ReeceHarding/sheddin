import React from 'react';
import { StudioShedLogo } from './StudioShedLogo';
import { DesignDetails } from './DesignDetails';
import { FinancingSection } from './FinancingSection';
import { ConsultationSection } from './ConsultationSection';
import { calculateTotalPrice } from '../../../utils/pricing';

interface SuccessPageProps {
  userId: string;
  options: Record<string, string>;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ userId, options: initialOptions }) => {
  const basePrice = calculateTotalPrice(initialOptions);

  // For the time being we just show the "thank you" portion
  // This can be expanded in the future
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <StudioShedLogo />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-medium mb-2">Design Saved Successfully</h1>
            <p className="text-gray-600">
              Your current design total is ${basePrice.toLocaleString()} (not including installation, permit, or foundation).
            </p>
            <p className="mt-4">
              <a
                href={`/designs/${userId}`}
                className="text-[#B87503] hover:text-[#9A6203] underline"
              >
                View or Edit Your Design
              </a>
            </p>
          </div>

          <DesignDetails zipCode="" options={initialOptions} onOptionChange={() => {}} />

          <div className="mt-12">
            <FinancingSection />
          </div>
          <div className="mt-12">
            <ConsultationSection />
          </div>
        </div>
      </main>
    </div>
  );
};