import React from 'react';
import { TrooSolutionsLogo } from './TrooSolutionsLogo';
import { DesignDetails } from './DesignDetails';
import { FinancingSection } from './FinancingSection';
import { ConsultationSection } from './ConsultationSection';
import { calculateTotalPrice } from '../../../utils/pricing';

interface SuccessPageProps {
  userId: string;
  options: Record<string, string>;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ userId, options: initialOptions }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState({
    model: 'model-a', // Set default model
    ...initialOptions
  });

  const basePrice = calculateTotalPrice(options);

  const handleOptionChange = (category: string, value: string | null) => {
    setOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <TrooSolutionsLogo />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Main Image */}
            <div>
              <img
                src="/summit308/doorsAndWindows/sideEntryMorePrivacyFullyEquipped1.jpg"
                alt="Summit 308 Model A"
                className="w-full rounded-lg"
              />
            </div>

            {/* Right Column - Design Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-medium mb-2">Summit 308 Model A 14x22</h1>
                <p className="text-gray-600">Studio · 1 Bath</p>
                <p className="text-gray-600">Lifestyle ADU Interior Kit</p>
                <p className="text-gray-600">(A-2-b) Side Entry / More Privacy</p>
                <div className="mt-4">
                  <div className="text-2xl font-medium">${basePrice.toLocaleString()}</div>
                  <a href="/" className="text-primary hover:text-primary-hover">
                    Edit your design →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Design Details */}
          <DesignDetails
            zipCode="54403"
            options={options}
            onOptionChange={handleOptionChange}
          />

          {/* Floor Plan */}
          <div className="mt-12">
            <img
              src="/summit308/floorPlans/modelA.jpg"
              alt="Floor Plan"
              className="w-full rounded-lg"
            />
          </div>

          {/* Financing Section */}
          <div className="mt-12">
            <FinancingSection />
          </div>

          {/* Consultation Section */}
          <div className="mt-12">
            <ConsultationSection />
          </div>
        </div>
      </main>
    </div>
  );
};