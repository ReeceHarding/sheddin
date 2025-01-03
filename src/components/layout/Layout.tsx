import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainNavigation } from '../MainNavigation';
import { Footer } from './Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideFooter = ['/design', '/price'].includes(location.pathname) || location.pathname.startsWith('/designs/');
  const isConsultationPage = location.pathname === '/consultation';

  return (
    <div className="min-h-screen flex flex-col">
      <div className={isConsultationPage ? 'bg-black/60' : ''}>
        <MainNavigation />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};