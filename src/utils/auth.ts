import ky from 'ky';
import { LoginResponse } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await ky.post(`${API_URL}/v1/auth/login`, {
      json: { username, password },
    });

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'An error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
