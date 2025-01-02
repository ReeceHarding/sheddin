import React from 'react';
import { Layout } from '../components/home/Layout';
import { MainNavigation } from '../components/MainNavigation';
import { HeroSection } from '../components/home/sections/HeroSection';
import { ModelsSection } from '../components/home/sections/ModelsSection';
import { InvestmentSection } from '../components/home/sections/InvestmentSection';
import { ProcessOverviewSection } from '../components/home/sections/ProcessOverviewSection';
import { ValuePropositionSection } from '../components/home/sections/ValuePropositionSection';
import { WhyStudioShedSection } from '../components/home/sections/WhyStudioShedSection';
import { ProcessSection } from '../components/home/sections/ProcessSection';
import { VirtualShowroomSection } from '../components/home/sections/VirtualShowroomSection';

export const HomePage = () => {
  return (
    <Layout>
      <MainNavigation />
      <HeroSection />
      <ModelsSection />
      <InvestmentSection />
      <ProcessOverviewSection />
      <ValuePropositionSection />
      <WhyStudioShedSection />
      <ProcessSection />
      <VirtualShowroomSection />
    </Layout>
  );
};