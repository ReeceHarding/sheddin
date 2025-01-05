import React, { useState } from 'react';
import { NationalFootprint } from './NationalFootprint';
import { QuickInstall } from './QuickInstall';
import { CompleteContent } from './CompleteContent';
import { TabSelector } from './TabSelector';

type ActiveTab = 'quick-install' | 'national-footprint' | 'sustainable';

export const WhyStudioShedSection = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quick-install');

  const renderContent = () => {
    switch (activeTab) {
      case 'national-footprint':
        return <NationalFootprint />;
      case 'quick-install':
        return <QuickInstall />;
      case 'sustainable':
        return <CompleteContent />;
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Troo Solutions?</h2>
        
        <TabSelector activeTab={activeTab} onTabChange={(tab: ActiveTab) => setActiveTab(tab)} />
        
        <div className="mt-12">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};