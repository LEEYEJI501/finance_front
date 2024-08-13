import { post, get } from '@/api';
import { ILoginResponse } from '@/types/auth';
import { getLoginModel } from '@/models/auth';

const AUTH_URL = 'auth';

export const fetchLogin = async (
  username: string,
  password: string
) => {
  const response = await post<ILoginResponse>(
    `${AUTH_URL}/login`,
    {
      username,
      password,
    },
    true
  );

  return getLoginModel(response);
};