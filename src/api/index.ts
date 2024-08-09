import ky from 'ky';
import { logError } from './logger';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export const get = async <T>(
  url: string,
  params?: Record<string, string | number | boolean>
): Promise<T> => {
  try {
    const response = await api.get(url, { searchParams: params }).json<T>();
    return response;
  } catch (error) {
    logError(`GET request to ${url} failed`, error);
    throw error;
  }
};

export const post = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  withCredentials: boolean = false
): Promise<T> => {
  try {
    let headers: HeadersInit = {};
    const options: any = {
      method: 'POST',
      credentials: withCredentials ? 'include' : 'same-origin',
    };
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
      options.body = data;
    } else {
      headers['Content-Type'] = 'application/json';
      options.json = JSON.stringify(data);
    }
    options.headers = headers;
    const response = await api.post(url, options).json<T>();
    return response;
  } catch (error) {
    logError(`POST request to ${url} failed`, error);
    throw error;
  }
};

export const put = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false
): Promise<T> => {
  try {
    const options: any = {
      json: data,
      credentials: withCredentials ? 'include' : 'same-origin',
    };
    const response = await api.put(url, options).json<T>();
    return response;
  } catch (error) {
    logError(`PUT request to ${url} failed`, error);
    throw error;
  }
};

export const patch = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false
): Promise<T> => {
  try {
    const options: any = {
      json: data,
      credentials: withCredentials ? 'include' : 'same-origin',
    };
    const response = await api.patch(url, options).json<T>();
    return response;
  } catch (error) {
    logError(`PATCH request to ${url} failed`, error);
    throw error;
  }
};

export const del = async (
  url: string,
  withCredentials: boolean = false
): Promise<void> => {
  try {
    await api.delete(url, {
      credentials: withCredentials ? 'include' : 'same-origin',
    });
  } catch (error) {
    logError(`DELETE request to ${url} failed`, error);
    throw error;
  }
};
