import { TokenType, getToken } from '@/lib/auth/utils';
import { Env } from '@env';
import axios from 'axios';
export const client = axios.create({
  baseURL: Env.API_URL,
});

//configure token
client.interceptors.request.use(async (config) => {
  const token: TokenType = await getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
})
