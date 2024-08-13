import ky from "ky";
import { handleApiResponse } from "./handleApiResponse"; 
import { IApiResponse } from '@/types/common';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  credentials: "include",
});

export const get = async <T>(
  url: string,
  params?: Record<string, string | number | boolean>
): Promise<IApiResponse<T>> => {
  return handleApiResponse<T>(api.get(url, { searchParams: params }).json<T>());
};

export const post = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  withCredentials: boolean = false
): Promise<IApiResponse<T>> => {
  const options: any = {
    method: "POST",
    credentials: withCredentials ? "include" : "same-origin",
  };

  if (data instanceof FormData) {
    options.body = data;
  } else {
    options.json = data;
  }

  return handleApiResponse<T>(api.post(url, options).json<T>());
};

export const put = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false
): Promise<IApiResponse<T>> => {
  const options: any = {
    json: data,
    credentials: withCredentials ? "include" : "same-origin",
  };
  return handleApiResponse<T>(api.put(url, options).json<T>());
};

export const patch = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false
): Promise<IApiResponse<T>> => {
  const options: any = {
    json: data,
    credentials: withCredentials ? "include" : "same-origin",
  };
  return handleApiResponse<T>(api.patch(url, options).json<T>());
};

export const del = async (
  url: string,
  withCredentials: boolean = false
): Promise<IApiResponse<void>> => {
  const options: any = {
    credentials: withCredentials ? "include" : "same-origin",
  };
  return handleApiResponse<void>(api.delete(url, options).json<void>());
};
