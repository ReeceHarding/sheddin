import React from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    <div className="aspect-w-4 aspect-h-3">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);