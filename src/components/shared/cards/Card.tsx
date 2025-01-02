import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  highlighted = false
}) => {
  const baseStyles = `
    relative flex flex-col h-full
    bg-white rounded-lg p-8
    transition-shadow hover:shadow-lg
    ${highlighted ? 'border-2 border-[#FFB800]' : 'border border-gray-200'}
  `;

  return (
    <div className={`${baseStyles} ${className}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-block bg-[#FFB800] text-white text-sm font-medium px-4 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      {children}
    </div>
  );
};