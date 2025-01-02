import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}

export const Grid: React.FC<GridProps> = ({
  children,
  className = '',
  cols = 4
}) => {
  const baseStyles = `
    grid gap-8
    grid-cols-1
    ${cols >= 2 ? 'md:grid-cols-2' : ''}
    ${cols >= 3 ? 'lg:grid-cols-3' : ''}
    ${cols >= 4 ? 'xl:grid-cols-4' : ''}
  `;

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};