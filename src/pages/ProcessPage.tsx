import React from 'react';
import { ProcessHero } from '../components/process/ProcessHero';
import { ProcessNav } from '../components/process/ProcessNav';
import { ProcessSections } from '../components/process/ProcessSections';
import { ProcessGlance } from '../components/process/ProcessGlance';
import { ProcessFAQ } from '../components/process/ProcessFAQ';

const ProcessPage: React.FC = () => {
  return (
    <div>
      <ProcessHero 
        title="How It Works!"
        subtitle="Planning, Design and Installation"
        description="Start with our 3D Design Center to create a design, then schedule a free consultation with a Studio Shed advisor to plan your project. The Studio team will shepherd your project through permitting and fulfill your dream design in a matter of months."
        ctaText="See our process at-a-glance"
        ctaLink="#toc-glance"
        backgroundImage="/images/process/hero.webp"
      />
      
      <ProcessNav />
      
      <ProcessSections />
      
      <ProcessGlance />
      
      <ProcessFAQ />
    </div>
  );
};

export default ProcessPage;