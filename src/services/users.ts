import { get, post } from '@/api';
import { ICheckUsernameResponse, ISignUpResponse } from '@/types/user';
import { getCheckUsernameModel } from '@/models/users'

const USERS_URL = 'users';

export const fetchCheckUsername = async (
  username: string
) => {
  const response = await get<ICheckUsernameResponse>(
    `${USERS_URL}/check-username`,
    { username }
  );
  return getCheckUsernameModel(response);
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
    formData
  );

  return response;
};
