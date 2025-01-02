import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../shared/Button';

interface FoundationTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'concrete' | 'wood-frame' | 'tbd') => void;
}

export const FoundationTypeModal: React.FC<FoundationTypeModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 transition-opacity" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl w-full max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-medium">Select your foundation type</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Concrete Slab */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Concrete Slab</h3>
                <p className="text-gray-600 min-h-[160px]">
                  Because every site is different, Studio Shed does not directly quote concrete costs. 
                  This service is provided by our professional installers who will work with you to 
                  determine the best foundation for your site.
                </p>
                <Button
                  onClick={() => {
                    onSelect('concrete');
                    onClose();
                  }}
                  fullWidth
                >
                  Select Concrete Slab
                </Button>
              </div>

              {/* Wood Frame Floor */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Wood Frame Floor</h3>
                <p className="text-gray-600 min-h-[160px]">
                  A self-supported joisted floor system similar to a deck with simple poured or 
                  pre-cast concrete piers. For small, unfinished units, a 4×4 skid foundation may suffice.
                </p>
                <Button
                  onClick={() => {
                    onSelect('wood-frame');
                    onClose();
                  }}
                  fullWidth
                >
                  Select Wood Frame
                </Button>
              </div>

              {/* Not Sure */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Not Sure?</h3>
                <p className="text-gray-600 min-h-[160px]">
                  Contact us to discuss the various factors to consider when choosing your foundation type.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    onSelect('tbd');
                    onClose();
                  }}
                  fullWidth
                >
                  Foundation TBD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};