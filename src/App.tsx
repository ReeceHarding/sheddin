import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ModelSelectionPage } from './pages/ModelSelectionPage';
import { SummitSelectionPage } from './pages/SummitSelectionPage';
import ProcessPage from './pages/ProcessPage';
import { ConfiguratorLayout } from './components/configurator/ConfiguratorLayout';
import { SuccessPage } from './components/configurator/save-design/SuccessPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { ConfiguratorProvider } from './context/ConfiguratorContext';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { DesignSummaryPage } from './pages/DesignSummaryPage';

function App() {
  // Mock user and options for SuccessPage
  const mockSuccessPageProps = {
    userId: "demo-user",
    options: {
      model: "summit",
      size: "10x12",
      style: "modern"
    }
  };

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/design" element={<Layout><ModelSelectionPage /></Layout>} />
        <Route path="/design/summit" element={<Layout><SummitSelectionPage /></Layout>} />
        <Route path="/process" element={<Layout><ProcessPage /></Layout>} />
        <Route path="/design/summit/:modelId" element={
          <ConfiguratorProvider>
            <ConfiguratorLayout />
          </ConfiguratorProvider>
        } />
        <Route path="/consultation" element={<Layout><ConsultationPage /></Layout>} />
        <Route path="/designs/:id" element={<DesignSummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;