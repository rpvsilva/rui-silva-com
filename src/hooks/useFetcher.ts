import { API_URL } from 'constants/index';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: API_URL,
});

export const useFetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await instance.get<T>(url, config);

  return res?.data;
};
