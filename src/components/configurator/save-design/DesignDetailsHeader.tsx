import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DesignDetailsHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const DesignDetailsHeader: React.FC<DesignDetailsHeaderProps> = ({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
  >
    <div className="flex items-center space-x-2">
      <span className="text-xl">Design Details</span>
      <span className="text-gray-500">handling: t28957c2</span>
      <span className="text-gray-500">December 31, 2024</span>
    </div>
    {isOpen ? (
      <ChevronUp className="w-6 h-6 text-gray-400" />
    ) : (
      <ChevronDown className="w-6 h-6 text-gray-400" />
    )}
  </button>
);