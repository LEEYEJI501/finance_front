import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="p-4 bg-gray-300 text-white">
      <div className="container mx-auto">{children}</div>
    </header>
  );
};

export default Header;
