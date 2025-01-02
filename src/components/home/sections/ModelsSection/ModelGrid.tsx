import React from 'react';
import { ModelCard } from './ModelCard';
import { models } from '../../../../data/models';

export const ModelGrid = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {models.map(model => (
      <ModelCard key={model.id} {...model} />
    ))}
  </div>
);