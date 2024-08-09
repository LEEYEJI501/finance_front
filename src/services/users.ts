import { get } from '@/api';
import { ICheckUsernameResponse } from '@/types/auth/login';

const USERS_URL = 'users';

export const fetchCheckUsername = async (
  username: string
): Promise<ICheckUsernameResponse> => {
  const response = await get<ICheckUsernameResponse>(
    `${USERS_URL}/check-username`,
    { username }
  );
  return response;
};
