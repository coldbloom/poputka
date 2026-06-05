import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import inMemoryJWT from './inMemoryJWT';

export const instanceAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // запросы, отправляемые с помощью этого экземпляра Axios, будут отправлять куки (cookies) при кросс-доменных запросах.
});

const resourceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

resourceClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const fetcher = (url: string, params?: Record<string, any>) => resourceClient.get(url, { params }).then(res => res.data);
const poster = (url: string, data: any) => resourceClient.post(url, data).then(res => res.data);

export const authApiClient = {
  client: resourceClient,  // базовый axios-инстанс
  fetcher,
  poster
};