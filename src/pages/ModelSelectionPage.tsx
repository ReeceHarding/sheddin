import React from 'react';
import { Header } from '../components/model-selection/Header';
import { ModelGrid } from '../components/model-selection/ModelGrid';
import { SavedDesigns } from '../components/model-selection/SavedDesigns';
import { ConsultationLink } from '../components/model-selection/ConsultationLink';

export const ModelSelectionPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Header />
        <ModelGrid />
        <SavedDesigns />
        <ConsultationLink />
      </div>
    </div>
  );
};