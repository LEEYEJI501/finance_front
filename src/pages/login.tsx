import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../components";
import { fetchLogin } from "@/services/auth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLoginClick = async () => {
    setError(null);
    setMessage(null);

    await fetchLogin(username, password);
    router.push("/");
  };

  const handleSignUpClick = () => {
    router.push("/signup");
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
