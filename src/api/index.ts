import ky from "ky";
import { logError } from "./logger";
import { extractErrorMessage } from './extractErrorMessage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const api = ky.create({
  prefixUrl: API_URL,
  timeout: 10000,
  credentials: "include",
});

export const get = async <T>(
  url: string,
  params?: Record<string, string | number | boolean>,
  bypassError: boolean = false
): Promise<T | null> => {
  try {
    const response = await api.get(url, { searchParams: params }).json<T>();
    return response;
  } catch (error) {
    const errorMessage = await extractErrorMessage(error);
    logError(`GET request to ${url} failed: ${errorMessage}`, error);
    if (bypassError) {
      return null;
    }
    throw error;
  }
};

export const post = async <T>(
  url: string,
  data: Record<string, any> | FormData,
  withCredentials: boolean = false,
  bypassError: boolean = false
): Promise<T | null> => {
  try {
    const options: any = {
      method: "POST",
      credentials: withCredentials ? "include" : "same-origin",
    };
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.json = data;
    }
    const response = await api.post(url, options).json<T>();
    return response;
  } catch (error) {
    const errorMessage = await extractErrorMessage(error);
    logError(`POST request to ${url} failed: ${errorMessage}`, error);
    if (bypassError) {
      return null;
    }
    throw error;
  }
};

export const put = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false,
  bypassError: boolean = false
): Promise<T | null> => {
  try {
    const options: any = {
      json: data,
      credentials: withCredentials ? "include" : "same-origin",
    };
    const response = await api.put(url, options).json<T>();
    return response;
  } catch (error) {
    const errorMessage = await extractErrorMessage(error);
    logError(`PUT request to ${url} failed: ${errorMessage}`, error);
    if (bypassError) {
      return null;
    }
    throw error;
  }
};

export const patch = async <T>(
  url: string,
  data: Record<string, any>,
  withCredentials: boolean = false,
  bypassError: boolean = false
): Promise<T | null> => {
  try {
    const options: any = {
      json: data,
      credentials: withCredentials ? "include" : "same-origin",
    };
    const response = await api.patch(url, options).json<T>();
    return response;
  } catch (error) {
    const errorMessage = await extractErrorMessage(error);
    logError(`PATCH request to ${url} failed: ${errorMessage}`, error);
    if (bypassError) {
      return null;
    }
    throw error;
  }
};

export const del = async (
  url: string,
  withCredentials: boolean = false,
  bypassError: boolean = false
): Promise<void | null> => {
  try {
    await api.delete(url, {
      credentials: withCredentials ? "include" : "same-origin",
    });
  } catch (error) {
    const errorMessage = await extractErrorMessage(error);
    logError(`DELETE request to ${url} failed: ${errorMessage}`, error);
    if (bypassError) {
      return null;
    }
    throw error;
  }
};
