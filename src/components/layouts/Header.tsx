import React from "react";
import { useNavigate } from "@/hooks/useNavigate";
import { Button } from "..";
import constants from "@/constants";
import { removeItem } from "@/utils/localStorage";
import { fetchLogout } from "@/services/auth";
import { useStorage } from "@/hooks/useStorage";
import { DivideIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { navigateToLogin, navigateToMainPage } = useNavigate();
  const { user, isLoggedIn } = useStorage();

  const handleLoginClick = () => {
    navigateToLogin();
  };

  const handleLogoutClick = async () => {
    if (user) {
      const success = await fetchLogout(user.id);

      if (success) {
        removeItem(constants.LOCAL_STORAGE.LOGIN);
        removeItem(constants.LOCAL_STORAGE.USER);

        navigateToLogin();
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 shadow-lg bg-black text-green-400 border-b border-green-500"
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container mx-auto flex justify-between items-center border-2 border-transparent rounded">
        <div className="flex items-center space-x-4">
          <Button
            onClick={navigateToMainPage}
            color="none"
            className="text-lg font-bold text-green-500 hover:text-green-300"
          >
            HOME
          </Button>
        </div>

        <div className="">
          {isLoggedIn && user ? (
            <img
              src="/razer-logo.svg"
              alt="Razer Logo"
              className="w-6 h-auto block"
            />
          ) : (
            <div></div>
          )}
        </div>

        <div>
          {isLoggedIn && user ? (
            <div className="flex items-center space-x-2">
              <span className="font-bold text-green-500">{user.username}</span>
              <Button
                size="medium"
                color="none"
                purpose="primary"
                onClick={handleLogoutClick}
                className="ml-4 text-green-500 hover:text-green-300"
              >
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              size="medium"
              color="none"
              purpose="primary"
              onClick={handleLoginClick}
              className="text-green-500 hover:text-green-300"
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
