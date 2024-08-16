import React, { useState } from "react";
import { Button } from "../components";
import { fetchLogin } from "@/services/auth";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";
import { setItem } from '@/utils/localStorage';
import { useNavigate } from '@/hooks/useNavigate';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const { navigateToMainPage, navigateToSignUp } = useNavigate();

  const handleLoginClick = async () => {
    setError(null);

    const { success, authenticated, userId, accessToken } = await fetchLogin(username, password);

    if (success && authenticated) {
      const user = JSON.stringify({
        id: userId,
        username,
        accessToken
      });
      setItem(
        constants.LOCAL_STORAGE.LOGIN, 
        String(constants.DEFAULT_BOOL_TRUE)
      );
      setItem(
        constants.LOCAL_STORAGE.USER,
        user
      );
      navigateToMainPage();

      showToast(`반갑습니다. ${username}님`, constants.TOAST_TYPES.SUCCESS);
    } else {
      showToast(`로그인에 실패하였습니다.`, constants.TOAST_TYPES.ERROR);
    }
  };

  const handleSignUpClick = () => {
    navigateToSignUp();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="p-8 w-full max-w-sm bg-gray-900 rounded-lg shadow-lg border border-green-500">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-400">
          Login
        </h1>

        <div className="mb-6">
          <input
            type="text"
            className="w-full p-2 bg-black text-green-400 border-b border-gray-500 focus:outline-none focus:border-green-500 placeholder-gray-500"
            placeholder="USER NAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            className="w-full p-2 bg-black text-green-400 border-b border-gray-500 focus:outline-none focus:border-green-500 placeholder-gray-500"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <Button
          type="submit"
          size="medium"
          color="none"
          purpose="primary"
          className="w-full mt-2 text-green-400 border border-green-400 hover:text-green-300 hover:border-green-300"
          onClick={handleLoginClick}
        >
          LOGIN
        </Button>
        <div className="flex justify-between mt-6 text-green-400">
          <div
            onClick={handleSignUpClick}
            className="text-sm hover:cursor-pointer hover:text-green-300"
          >
            Forgot Password
          </div>
          <div
            onClick={handleSignUpClick}
            className="text-sm hover:cursor-pointer hover:text-green-300"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
