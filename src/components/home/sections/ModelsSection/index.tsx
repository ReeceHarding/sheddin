import React from 'react';
import { Container } from '../../Container';
import { SectionHeader } from './SectionHeader';
import { ModelGrid } from './ModelGrid';

export const ModelsSection = () => (
  <section className="py-24 bg-white">
    <Container>
      <SectionHeader />
      <ModelGrid />
    </Container>
  </section>
);