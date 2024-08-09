import { post, get } from '@/api';
import { ILoginResponse } from '@/types/auth/login';

const AUTH_URL = 'auth';

export const fetchLogin = async (
  username: string,
  password: string
): Promise<ILoginResponse> => {
  const response = await post<ILoginResponse>(
    `${AUTH_URL}/login`,
    {
      username,
      password,
    },
    true
  );

  return response;
};
