import React from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className = '',
  centered = false
}) => {
  const baseStyles = `
    font-bold text-gray-900
    ${centered ? 'text-center' : ''}
    ${level === 1 ? 'text-4xl md:text-6xl' : ''}
    ${level === 2 ? 'text-3xl md:text-4xl' : ''}
    ${level === 3 ? 'text-2xl md:text-3xl' : ''}
    ${level === 4 ? 'text-xl md:text-2xl' : ''}
  `;

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${baseStyles} ${className}`}>
      {children}
    </Tag>
  );
};