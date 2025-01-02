import React from 'react';

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = ''
}) => {
  const baseStyles = 'relative w-full pt-[75%] mb-6';

  return (
    <div className={`${baseStyles} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
};