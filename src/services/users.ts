import { get, post } from '@/api';
import { ICheckUsernameResponse, ISignUpResponse } from '@/types/user/signup';

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

export const fetchSignUp = async (
  username: string,
  password: string,
  email: string,
  profile: File
): Promise<ISignUpResponse> => {
  const response = await post<ISignUpResponse>(
    `${USERS_URL}/register`,
    {
      username,
      password,
      email,
      profile,
    },
    true
  );
  console.log(response);

  return response;
};
