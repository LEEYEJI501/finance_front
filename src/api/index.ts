import ky from 'ky';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = ky.create({
  prefixUrl: `${API_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export const get = async <T>(url: string): Promise<T> => {
  const response = await api.get(url).json<T>();
  return response;
};

export const post = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false
): Promise<T> => {
  const options: any = {
    json: data,
    credentials: withCredentials ? 'include' : 'same-origin',
  };
  const response = await api.post(url, options).json<T>();
  return response;
};

export const put = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false
): Promise<T> => {
  const response = await api
    .put(url, {
      json: data,
      credentials: withCredentials ? 'include' : 'same-origin',
    })
    .json<T>();
  return response;
};

export const patch = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false
): Promise<T> => {
  const response = await api
    .patch(url, {
      json: data,
      credentials: withCredentials ? 'include' : 'same-origin',
    })
    .json<T>();
  return response;
};

export const del = async (
  url: string,
  withCredentials: boolean = false
): Promise<void> => {
  await api.delete(url, {
    credentials: withCredentials ? 'include' : 'same-origin',
  });
};
