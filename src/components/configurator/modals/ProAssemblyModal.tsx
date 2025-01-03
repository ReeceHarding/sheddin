import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface ProAssemblyModalProps {
  onClose: () => void;
  onSelect: (type: 'diy' | 'proassembly', price: number) => void;
}

export const ProAssemblyModal: React.FC<ProAssemblyModalProps> = ({ onClose, onSelect }) => {
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
              Select your installation type
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
              {/* DIY Option */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Do-It-Yourself (DIY)</h3>
                <p className="text-gray-600 text-sm mb-8">
                  Every DIY Studio Shed purchase gives you access to the same resources and instructions 
                  we use to train and certify our network of installers, including 3D assembly instructions, 
                  construction plans for the Studio Shed you purchased, and a video that walks through the 
                  entire installation process. And, of course, we are only a phone call away if you have questions.
                </p>
                <button
                  onClick={() => onSelect('diy', 0)}
                  className="w-full bg-[#B87503] text-white py-3 rounded-md hover:bg-[#9A6203] transition-colors"
                >
                  <span className="block font-medium">DIY Assembly</span>
                  <span className="text-sm">$0</span>
                </button>
              </div>

              {/* ProAssembly Option */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">ProAssembly</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our installation partner takes delivery of your Studio Shed and installs all wall panels, 
                  roofing and siding. Every member of our professional team of installers is certified and insured, 
                  and will deliver the same service we would expect in our own home. Studio Shed will manage the 
                  scheduling of your delivery and installation, and your installer will perform a walk-through 
                  with you at the completion of your installation.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Subject to availability. Flat rate, included in Studio Shed order.
                </p>
                <button
                  onClick={() => onSelect('proassembly', 14181)}
                  className="w-full bg-[#B87503] text-white py-3 rounded-md hover:bg-[#9A6203] transition-colors"
                >
                  <span className="block font-medium">ProAssembly: Shell Only</span>
                  <span className="text-sm">$14,181</span>
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