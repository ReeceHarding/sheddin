import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface FoundationTypeModalProps {
  onClose: () => void;
  onSelect: (type: 'concrete' | 'wood' | 'tbd') => void;
}

export const FoundationTypeModal: React.FC<FoundationTypeModalProps> = ({ onClose, onSelect }) => {
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
        <Dialog.Panel className="mx-auto max-w-5xl w-full bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6">
            <Dialog.Title className="text-xl font-medium">
              Select your foundation type
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
            <div className="grid md:grid-cols-3 gap-6">
              {/* Concrete Slab Option */}
              <div className="border rounded-lg p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-medium mb-4">Concrete Slab</h3>
                  <p className="text-gray-600 text-sm">
                    Because every site is different, other than for our pre-configured selections, 
                    Troo Solutions does not directly quote the cost of foundations or pour concrete. 
                    However, this is a service that the majority of our professional installers provide, 
                    and they will work with you directly to get the best foundation for your site in an 
                    efficient way.
                  </p>
                </div>
                <button
                  onClick={() => onSelect('concrete')}
                  className="w-full bg-[#B87503] text-white py-3 rounded-md hover:bg-[#9A6203] transition-colors mt-8"
                >
                  <span className="block font-medium">Select Concrete Slab</span>
                  <span className="text-sm">Priced by local installer</span>
                </button>
              </div>

              {/* Wood Frame Floor Option */}
              <div className="border rounded-lg p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-medium mb-4">Wood Frame Floor</h3>
                  <p className="text-gray-600 text-sm">
                    A self-supported joisted floor system similar to a deck is the most popular 
                    method and consists of simple poured or pre-cast concrete piers. For small, 
                    unfinished units, a 4×4 skid foundation may suffice.
                  </p>
                </div>
                <button
                  onClick={() => onSelect('wood')}
                  className="w-full bg-[#B87503] text-white py-3 rounded-md hover:bg-[#9A6203] transition-colors mt-8"
                >
                  <span className="block font-medium">Select Wood Frame Floor</span>
                  <span className="text-sm">Priced by local installer</span>
                </button>
              </div>

              {/* Not Sure Option */}
              <div className="border rounded-lg p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-medium mb-4">Not Sure?</h3>
                  <p className="text-gray-600 text-sm">
                    Contact us to talk about the various factors to consider when choosing 
                    your foundation type.
                  </p>
                </div>
                <button
                  onClick={() => onSelect('tbd')}
                  className="w-full bg-[#B87503] text-white py-3 rounded-md hover:bg-[#9A6203] transition-colors mt-8"
                >
                  <span className="block font-medium">Select Foundation TBD</span>
                  <span className="text-sm">Priced by local installer</span>
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