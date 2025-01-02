import React from 'react';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = ''
}) => {
  const baseStyles = 'flex-grow flex flex-col space-y-4';

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};