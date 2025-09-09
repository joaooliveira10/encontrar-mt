import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://abitus-api.geia.vip',
  timeout: 10000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    return Promise.reject({
      message: error?.response?.data?.message || 'Erro inesperado',
      status: error?.response?.status,
    });
  }
);
