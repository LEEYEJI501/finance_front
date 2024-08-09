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
  profileImage?: File
): Promise<ISignUpResponse> => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('email', email);

  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  const response = await post<ISignUpResponse>(
    `${USERS_URL}/register`,
    formData,
    true
  );

  return response;
};
