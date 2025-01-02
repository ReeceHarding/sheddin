import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { InstallationModal } from '../modals/InstallationModal';
import { calculateEstimatedTotal, calculateTotalPrice, formatPrice } from '../../../utils/pricing';

interface OptionsSectionProps {
  zipCode: string;
  options: Record<string, any>;
  onOptionChange: (category: string, value: string | null) => void;
  onPermitPlansClick: () => void;
  onFoundationClick: () => void;
  onOrderClick: () => void;
}

export const OptionsSection: React.FC<OptionsSectionProps> = ({
  zipCode,
  options,
  onOptionChange,
  onPermitPlansClick,
  onFoundationClick,
  onOrderClick,
}) => {
  const [isInstallationModalOpen, setIsInstallationModalOpen] = useState(false);

  const basePrice = calculateTotalPrice({ ...options, model: options.model || 'model-a' });
  const estimatedTotal = calculateEstimatedTotal(basePrice, options);

  return (
    <div className="px-6 py-4 space-y-6">
      {/* Shipping */}
      <div className="flex justify-between items-center">
        <span>Shipping to {zipCode}</span>
        <span className="text-gray-600">Included</span>
      </div>

      {/* ProAssembly */}
      <div className="flex justify-between items-center">
        <button 
          className="text-primary hover:text-primary-hover flex items-center space-x-2"
          onClick={() => setIsInstallationModalOpen(true)}
        >
          <span>ProAssembly: Shell + Lifestyle Interior</span>
          <Info className="w-4 h-4" />
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {options.installation === 'proassembly' ? 'Included' : '-'}
          </span>
          {options.installation === 'proassembly' && (
            <button
              onClick={() => onOptionChange('installation', null)}
              className="text-primary hover:text-primary-hover"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Permit Plans */}
      <div className="flex justify-between items-center">
        <button 
          className="text-primary hover:text-primary-hover flex items-center space-x-2"
          onClick={onPermitPlansClick}
        >
          <span>Include Permit Plans</span>
          <Info className="w-4 h-4" />
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {options.permitPlans === 'include' ? 'Included' : '-'}
          </span>
          {options.permitPlans === 'include' && (
            <button
              onClick={() => onOptionChange('permitPlans', null)}
              className="text-primary hover:text-primary-hover"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Foundation Type */}
      <div className="flex justify-between items-center">
        <button 
          className="text-primary hover:text-primary-hover flex items-center space-x-2"
          onClick={onFoundationClick}
        >
          <span>Select your foundation type</span>
          <Info className="w-4 h-4" />
        </button>
        <span className="text-gray-600">
          {options.foundation ? 'Priced by local installer' : '-'}
        </span>
      </div>

      {/* Site Work */}
      <div className="flex justify-between items-center">
        <span>Site work and permitting</span>
        <span className="text-gray-600">Cost not included</span>
      </div>

      {/* Total */}
      <div className="pt-6 border-t">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">Estimated Total</div>
            <div className="text-sm text-gray-600">
              Includes product, delivery, assembly, and permit plans.
            </div>
            <button className="text-primary hover:text-primary-hover text-sm">
              Learn more about typical project costs
            </button>
          </div>
          <div className="text-right">
            <div className="text-xl font-medium">{formatPrice(estimatedTotal)}</div>
            <button 
              onClick={onOrderClick}
              className="text-primary hover:text-primary-hover"
            >
              Start your order →
            </button>
          </div>
        </div>
      </div>

      <InstallationModal
        isOpen={isInstallationModalOpen}
        onClose={() => setIsInstallationModalOpen(false)}
        onSelect={(type) => {
          onOptionChange('installation', type);
          setIsInstallationModalOpen(false);
        }}
      />
    </div>
  );
};