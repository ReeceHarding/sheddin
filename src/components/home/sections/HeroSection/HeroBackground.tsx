import React from 'react';

export const HeroBackground = () => (
  <div className="absolute inset-0">
    <img
      src="/images/home/heroImage.webp"
      alt="Studio Shed Hero"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
  </div>
);