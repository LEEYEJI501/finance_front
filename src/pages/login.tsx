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
      })
      setItem(
        constants.LOCAL_STORAGE.LOGIN, 
        String(constants.DEFAULT_BOOL_TRUE)
      )
      setItem(
        constants.LOCAL_STORAGE.USER,
        user
      )
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="mb-6">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-black"
            placeholder="USER NAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-black"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <Button
          type="submit"
          size="medium"
          color="slate"
          purpose="primary"
          className="w-full mt-2"
          onClick={handleLoginClick}
        >
          LOGIN
        </Button>
        <div className="flex justify-between mt-6 text-blue-700">
          <div
            onClick={handleSignUpClick}
            className="text-sm hover:cursor-pointer"
          >
            Forgot Password
          </div>
          <div
            onClick={handleSignUpClick}
            className="text-sm hover:cursor-pointer"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
