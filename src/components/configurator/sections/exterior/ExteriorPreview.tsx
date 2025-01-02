import React from 'react';

interface ExteriorPreviewProps {
  selectedView: string;
}

export const ExteriorPreview: React.FC<ExteriorPreviewProps> = ({ selectedView }) => {
  return (
    <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
      <img 
        src="/summit308/exteriorOptions/exteriorFinishesPlaceholder.png"
        alt={`Exterior View - ${selectedView}`}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};