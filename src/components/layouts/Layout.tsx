import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MainHeader from '@/components/main/MainHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <MainHeader />
      </Header>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
