import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainNavigation } from '../MainNavigation';
import { Footer } from './Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideFooter = ['/design', '/price'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};