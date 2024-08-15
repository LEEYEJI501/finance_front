import { useNavigate } from '@/hooks/useNavigate';
import { Button } from '..';
import constants from '@/constants';
import { removeItem } from '@/utils/localStorage';
import { fetchLogout } from '@/services/auth';
import { useStorage } from '@/hooks/useStorage';

const MainHeader: React.FC = () => {
  const { navigateToLogin } = useNavigate();
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
    <div className="flex justify-end">
      {isLoggedIn && user ? (
        <div className="flex items-center space-x-2">
          <span className="font-bold text-blue-400">{user.username}</span>
          <Button
            size="medium"
            color="none"
            purpose="primary"
            onClick={handleLogoutClick}
            className="ml-4"
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
        >
          로그인
        </Button>
      )}
    </div>
  );
};

export default MainHeader;
