import React, { useEffect, useState } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import { Button } from "..";
import constants from "@/constants";
import { removeItem } from "@/utils/localStorage";
import { fetchLogout } from "@/services/auth";
import { useStorage } from "@/hooks/useStorage";
import { useSockJS } from '@/hooks/useSockJS';
import NotificationDropdown from "../NotificationDropdown";
import { fetchGetActivitiesUnRead } from '@/services/social';

const Header: React.FC = () => {
  const { navigateToLogin, navigateToMainPage, navigateToMy } = useNavigate();
  const { user, isLoggedIn } = useStorage();
  const { subscribe, send } = useSockJS();
  const [activities, setActivities] = useState<any[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    const loadMarketList = async () => {
      if (isLoggedIn && user) {
        await fetchGetActivitiesUnRead();
      }
    };

    loadMarketList();
  })

  useEffect(() => {
    if (isLoggedIn && user) {
      subscribe(`/topic/activities/${user.id}`, (message) => {
        const data = JSON.parse(message.body);
        setActivities((prevActivities) => [...prevActivities, data]);
      })
    }
  }, [isLoggedIn, user, subscribe])

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
        {isLoggedIn && user && (
          <div className="relative cursor-pointer" onClick={toggleDropdown}>
            <img
              src="/razer-logo.svg"
              alt="Razer Logo"
              className="w-6 h-auto block"
            />
            {activities.length > 0 && (
              <span className="absolute bottom-0 left-6 block w-1 h-1 bg-red-500 rounded-full"></span>
            )}
            {isDropdownOpen && (
              <NotificationDropdown activities={activities} />
            )}
          </div>
        )}
        <div>
          {isLoggedIn && user ? (
            <div className="flex items-center space-x-2">
              <Button
                size="medium"
                color="none"
                purpose="primary"
                onClick={navigateToMy}
                className="ml-4 text-green-500 hover:text-green-300"
              >
                {user.username}
              </Button>
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
