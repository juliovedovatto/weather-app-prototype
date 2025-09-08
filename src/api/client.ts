import axios, { AxiosError, type AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  timeout: 10000,
  headers: { 'Accept': 'application/json' },
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url;
    console.error('[api] Request failed', { status, url, message: error.message });
    return Promise.reject(error);
  }
);

export default client;
