import React from 'react';

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = ''
}) => {
  const baseStyles = 'mt-auto pt-6';

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};