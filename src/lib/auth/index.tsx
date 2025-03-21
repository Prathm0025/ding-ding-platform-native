import { isAxiosError } from 'axios';
import * as Crypto from 'expo-crypto';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

import { client } from '@/api';
import { showErrorMessage, showSuccess } from '@/components/ui';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import {
  getToken,
  removeName,
  removePlatformId,
  removeToken,
  setName,
  setPlatformId,
  setToken,
} from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  platformId: string | null;
  name: string | null;
  signIn: (data: TokenType) => void;
  login: (username: string, password: string) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle' as 'idle' | 'signOut' | 'signIn',
  token: null,
  platformId: null,
  name: null,
  errorMsg: null,
  login: async (username: string, password: string) => {
    try {
      const response = await client.post(`/api/users/login`, {
        username,
        password,
      });
      const data = response.data;
      console.log('data', data);

      const token = data.token;

      signIn(token);
      showSuccess('Login successful');
      return { success: true };
    } catch (e: any) {
      if (isAxiosError(e)) {
        showErrorMessage(e.response?.data?.message || e.message);
        return {
          success: false,
          error: e.message || e.response?.data?.message,
        };
      } else {
        console.log('Login error:', e);
        return { success: false, error: e.message };
      }
    }
  },
  signIn: async (token) => {
    const decoded: any = jwtDecode(token);
    //generate platformId
    const platformId = await generateUUID();
    setToken(token);
    setName(decoded.username);
    setPlatformId(platformId);
    set({ status: 'signIn', token, platformId, name: decoded.username });
  },
  signOut: () => {
    removeToken();
    removeName();
    removePlatformId();
    set({ status: 'signOut', token: null, platformId: null, name: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e: any) {
      console.log('Hydrate error:', e.message);
      signOut();
      // catch error here
      // Maybe sign_out user!
    }
  },
}));
const generateUUID = async () => {
  const randomBytes = await Crypto.getRandomBytesAsync(16);
  return uuidv4({ random: randomBytes });
};

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
