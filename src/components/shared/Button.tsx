import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  as?: 'button' | 'link';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  as = 'button',
  href,
  onClick,
  children,
  fullWidth = false,
  variant = 'primary'
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    h-[50px] px-8
    text-base font-medium
    rounded-md
    transition-all duration-200
    ${fullWidth ? 'w-full' : 'w-[200px]'}
    ${variant === 'primary' 
      ? 'bg-[#B87503] text-white hover:bg-[#9A6203] active:bg-[#805203]' 
      : 'bg-white text-[#B87503] border-2 border-[#B87503] hover:bg-[#B87503] hover:text-white'
    }
  `;

  if (as === 'link' && href) {
    return (
      <Link to={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {children}
    </button>
  );
};