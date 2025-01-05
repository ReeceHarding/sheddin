import React from 'react';
import { ProcessHero } from '../components/process/ProcessHero';
import { ProcessSections } from '../components/process/ProcessSections';

const ProcessPage: React.FC = () => {
  return (
    <div>
      <ProcessHero 
        title="How It Works!"
        subtitle="Planning, Design and Installation"
        description="Start with our 3D Design Center to create a design, then schedule a free consultation with a Troo Solutions advisor to plan your project. The Troo Solutions team will shepherd your project through permitting and fulfill your dream design in a matter of months."
        backgroundImage="/images/process/hero.webp"
      />
      
      <ProcessSections />
    </div>
  );
};

export default ProcessPage;