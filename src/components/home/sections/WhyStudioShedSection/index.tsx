import React from 'react';
import { NationalFootprint } from './NationalFootprint';
import { QuickInstall } from './QuickInstall';
import { CompleteContent } from './CompleteContent';
import { TabSelector } from './TabSelector';

type ActiveTab = 'national' | 'quick' | 'complete';

export const WhyStudioShedSection = () => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('national');

  const renderContent = () => {
    switch (activeTab) {
      case 'national':
        return <NationalFootprint />;
      case 'quick':
        return <QuickInstall />;
      case 'complete':
        return <CompleteContent />;
      default:
        return null;
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Studio Shed?</h2>
        
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-12">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};