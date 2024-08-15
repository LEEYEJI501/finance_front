import React from 'react';
import Link from 'next/link';

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="p-4 bg-transparent text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          🏠
        </Link>
        <div>{children}</div>
      </div>
    </header>
  );
};

export default Header;
