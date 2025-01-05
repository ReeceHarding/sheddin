import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface PermitPlansModalProps {
  onClose: () => void;
  onSelect: (include: boolean) => void;
}

export const PermitPlansModal: React.FC<PermitPlansModalProps> = ({ onClose, onSelect }) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6">
            <Dialog.Title className="text-xl font-medium">
              Do you want to include a permit plan set by Troo Solutions?
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* No Plan Set Option */}
              <div className="border rounded-lg p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-medium mb-4">No Plan Set Needed?</h3>
                  <p className="text-gray-600 text-sm">
                    For projects smaller than 120 square feet typically no permits are needed. 
                    However, you should check with your local building authority if you are not sure.
                  </p>
                </div>
                <button
                  onClick={() => onSelect(false)}
                  className="w-full bg-[#B87503] text-white py-3 rounded-md hover:bg-[#9A6203] transition-colors mt-8"
                >
                  <span className="block font-medium">Do not include / Un-permitted project</span>
                  <span className="text-sm">No plan set needed</span>
                </button>
              </div>

              {/* Include Plan Set Option */}
              <div className="border rounded-lg p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-medium mb-4">Include permit plan set by Troo Solutions</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    This supporting product is only necessary if you are required to permit your Troo Solutions.
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Includes: site, architectural, energy, structural, and electrical plans compliant with local codes for wind, snow, seismic, and soil.
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    Exclusions include, but are not limited to: Applications, Submittal, Fees, Deferred Submittals (i.e. sprinklers/solar), or work out of Troo Solutions scope.
                  </p>
                  <p className="text-gray-600 text-sm">
                    SHELL-ONLY Plan Set includes energy calculations and specifications for water heater and HVAC.
                  </p>
                </div>
                <button
                  onClick={() => onSelect(true)}
                  className="w-full bg-[#B87503] text-white py-3 rounded-md hover:bg-[#9A6203] transition-colors mt-8"
                >
                  <span className="block font-medium">Select permit plan set by Troo Solutions</span>
                  <span className="text-sm">$5,995 Additional Fee</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t">
            <button
              onClick={onClose}
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};