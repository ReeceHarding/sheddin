import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { OptionsSection } from './OptionsSection';
import { PriceBreakdown } from './PriceBreakdown';
import { PermitPlansModal } from '../modals/PermitPlansModal';
import { FoundationTypeModal } from '../modals/FoundationTypeModal';
import { OrderModal } from '../modals/OrderModal';

interface DesignDetailsProps {
  zipCode: string;
  options: Record<string, any>;
  onOptionChange: (category: string, value: string | null) => void;
}

export const DesignDetails: React.FC<DesignDetailsProps> = ({
  zipCode,
  options,
  onOptionChange,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isPermitPlansModalOpen, setIsPermitPlansModalOpen] = useState(false);
  const [isFoundationModalOpen, setIsFoundationModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <div className="border rounded-lg">
      {/* Header */}
      <button
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div className="flex items-center">
          <span className="font-medium">Design Details</span>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isDetailsOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      {isDetailsOpen && (
        <>
          <PriceBreakdown options={options} />
          <OptionsSection
            zipCode={zipCode}
            options={options}
            onOptionChange={onOptionChange}
            onPermitPlansClick={() => setIsPermitPlansModalOpen(true)}
            onFoundationClick={() => setIsFoundationModalOpen(true)}
            onOrderClick={() => setIsOrderModalOpen(true)}
          />
        </>
      )}

      {/* Modals */}
      <PermitPlansModal
        isOpen={isPermitPlansModalOpen}
        onClose={() => setIsPermitPlansModalOpen(false)}
        onSelect={(option) => {
          onOptionChange('permitPlans', option);
          setIsPermitPlansModalOpen(false);
        }}
      />

      <FoundationTypeModal
        isOpen={isFoundationModalOpen}
        onClose={() => setIsFoundationModalOpen(false)}
        onSelect={(type) => {
          onOptionChange('foundation', type);
          setIsFoundationModalOpen(false);
        }}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        orderDetails={{
          productTotal: 94992,
          shippingCost: 0,
          installationType: options.installation || 'diy'
        }}
      />
    </div>
  );
};