import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'white'
}) => {
  const baseStyles = `
    py-24
    ${background === 'white' ? 'bg-white' : 'bg-gray-50'}
  `;

  return (
    <section className={`${baseStyles} ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {children}
      </div>
    </section>
  );
};