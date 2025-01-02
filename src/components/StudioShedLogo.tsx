import React from 'react';
import { Home } from 'lucide-react';

export const StudioShedLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Home className="h-6 w-6 text-orange-500" />
      <div>
        <div className="text-lg font-bold leading-none">STUDIO SHED</div>
        <div className="text-xs text-gray-500 leading-none">DESIGN CENTER</div>
      </div>
    </div>
  );
};