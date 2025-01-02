import React from 'react';
import { ModelCard } from './ModelCard';
import { models } from '../../data/models';

export const ModelGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
    {models.map((model) => (
      <ModelCard key={model.id} {...model} />
    ))}
  </div>
);