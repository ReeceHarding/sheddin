import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../shared/Button';

interface PermitPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: 'include' | 'no-plan') => void;
}

export const PermitPlansModal: React.FC<PermitPlansModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 transition-opacity" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-medium">Include permit plan set?</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Option */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">No Plan Set Needed</h3>
                <p className="text-gray-600">
                  For projects smaller than 120 square feet typically no permits are needed. 
                  However, you should check with your local building authority if you are not sure.
                </p>
                <Button 
                  variant="secondary"
                  onClick={() => {
                    onSelect('no-plan');
                    onClose();
                  }}
                  fullWidth
                >
                  Do not include
                </Button>
              </div>

              {/* Right Option */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Include Permit Plan Set</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <p>
                    Includes: site, architectural, energy, structural, and electrical plans 
                    compliant with local codes.
                  </p>
                  <p>
                    SHELL-ONLY Plan Set includes energy calculations and specifications for 
                    water heater and HVAC.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    onSelect('include');
                    onClose();
                  }}
                  fullWidth
                >
                  Include permit plans
                  <span className="block text-sm">$5,995</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};