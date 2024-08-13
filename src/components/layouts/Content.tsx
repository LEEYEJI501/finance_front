import React from "react";

type ContentProps = {
  children?: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="p-4 bg-white">
      <div className="container mx-auto">{children}</div>
    </main>
  );
};

export default Content;
