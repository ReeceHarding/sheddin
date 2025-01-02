import React from 'react';
import { Home } from 'lucide-react';

interface Home3DProps {
  view: string;
  sidingColor: string;
  doorColor: string;
  trimColor: string;
  hasWainscot: boolean;
  hasShortEaves: boolean;
}

export const Home3D: React.FC<Home3DProps> = ({
  view,
  sidingColor,
  doorColor,
  trimColor,
  hasWainscot,
  hasShortEaves
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Placeholder 3D visualization */}
      <div className="text-center">
        <Home className="w-32 h-32 mx-auto mb-4 text-gray-400" />
        <div className="space-y-2 text-sm text-gray-500">
          <p className="font-medium">3D Preview - {view.toUpperCase()} VIEW</p>
          <div className="flex items-center justify-center space-x-4">
            <ColorSwatch label="Siding" color={sidingColor} />
            <ColorSwatch label="Door" color={doorColor} />
            <ColorSwatch label="Trim" color={trimColor} />
          </div>
          <div className="text-xs">
            {hasWainscot && <p>+ Metal Wainscot</p>}
            {hasShortEaves && <p>+ Shortened Back Eaves</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ColorSwatchProps {
  label: string;
  color: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ label, color }) => (
  <div className="flex items-center space-x-1">
    <div 
      className="w-4 h-4 rounded-full border border-gray-200" 
      style={{ backgroundColor: color }}
    />
    <span>{label}</span>
  </div>
);