import React from "react";
import { useRouter } from "next/router";
import { Button, Menu } from ".";

const Header: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div>
      <header className="flex justify-end p-4">
        <Button
          size="medium"
          color="none"
          purpose="primary"
          onClick={handleLoginClick}
        >
          로그인
        </Button>
      </header>
      <Menu></Menu>
    </div>
  );
};

export default Header;
