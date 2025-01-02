import React from 'react';
import { Container } from '../../Container';
import { ProcessSteps } from './ProcessSteps';
import { ProcessImages } from './ProcessImages';
import { ProcessCTA } from './ProcessCTA';

export const ProcessSection = () => (
  <section className="bg-white">
    <Container className="py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <ProcessImages />
        <ProcessSteps />
      </div>
      <ProcessCTA />
    </Container>
  </section>
);