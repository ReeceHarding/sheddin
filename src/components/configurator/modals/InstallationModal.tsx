import React from 'react';
import { X } from 'lucide-react';

interface InstallationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'diy' | 'proassembly') => void;
}

export const InstallationModal: React.FC<InstallationModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6">
            <h2 className="text-xl font-medium">Select your installation type</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* DIY Option */}
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Do-It-Yourself (DIY)</h3>
              <p className="text-gray-600 mb-6">
                Every DIY Troo Solutions purchase gives you access to the same resources and instructions 
                we use to train and certify our network of installers, including 3D assembly instructions, 
                construction plans for the Troo Solutions you purchased, and a video that walks through the 
                entire installation process. And, of course, we are only a phone call away if you have questions.
              </p>
              <button
                onClick={() => {
                  onSelect('diy');
                  onClose();
                }}
                className="w-full py-3 bg-[#B87503] text-white rounded-md hover:bg-[#9A6203]"
              >
                DIY Assembly
                <span className="block text-sm">$0</span>
              </button>
            </div>

            {/* ProAssembly Option */}
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">ProAssembly</h3>
              <p className="text-gray-600 mb-4">
                Our installation partner takes delivery of your Troo Solutions and installs all wall panels, 
                roofing and siding. Every member of our professional team of installers is certified and insured, 
                and will deliver the same service we would expect in our own home. Troo Solutions will manage the 
                scheduling of your delivery and installation, and your installer will perform a walk-through 
                with you at the completion of your installation.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Subject to availability. Flat rate, included in Troo Solutions order.
              </p>
              <button
                onClick={() => {
                  onSelect('proassembly');
                  onClose();
                }}
                className="w-full py-3 bg-[#B87503] text-white rounded-md hover:bg-[#9A6203]"
              >
                ProAssembly: Shell + Lifestyle Interior
                <span className="block text-sm">$54,034</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t">
            <button
              onClick={onClose}
              className="w-full py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};