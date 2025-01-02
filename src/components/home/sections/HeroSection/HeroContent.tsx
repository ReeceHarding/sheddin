import React from 'react';
import { Container } from '../../Container';
import { Button } from '../../../shared/Button';

export const HeroContent = () => (
  <div className="relative z-10 h-full flex items-center">
    <Container>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          High-Quality Nimble Building Kit
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          16 Years in Business, 5000+ Completed Projects, {' '}
          <span className="text-[#FFD700]">Nationwide</span>.
        </p>
        <Button as="link" href="/design" variant="secondary">
          DESIGN YOUR OWN
        </Button>
      </div>
    </Container>
  </div>
);