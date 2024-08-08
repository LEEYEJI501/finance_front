import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../components';
import { fetchLogin } from '../api/auth/fetchLogin';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLoginClick = async () => {
    setError(null);
    setMessage(null);

    try {
      const data = await fetchLogin(username, password);
      console.log('Login successful:', data);
      localStorage.setItem('accessToken', data.accessToken);
      setMessage('Login successful!');
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error('Login failed:', err.message);
      } else {
        setError('An unexpected error occurred');
        console.error('Login failed:', err);
      }
    }
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
        <div className="flex justify-between mt-6 text-blue-500">
          <a href="#" className="text-sm">
            Forgot Password
          </a>
          <a href="#" className="text-sm">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
