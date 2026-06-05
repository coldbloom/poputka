import { create } from 'zustand';

import { instanceAxios } from "@/utils/services/apiClient";
import inMemoryJWT from "@/utils/services/inMemoryJWT";

type UserData = { login: string; password: string; name: string; }

interface AuthStore {
  isAuth: boolean | null;
  handleLogOut: () => Promise<void>;
  handleSignUp: (data: UserData) => Promise<void>;
  handleSignIn: (data: { login: string; password: string }) => Promise<void>;
  handleGoogleSign: (data: { token: string; }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: null,

  handleLogOut: async () =>  {
    try {
      await instanceAxios.post('/auth/logout');
      inMemoryJWT.deleteToken();
      set({ isAuth: false });

    } catch (error) {
      console.error(error);
    }
  },

  handleSignUp: async (data: UserData) => {
    try {
      const res = await instanceAxios.post('/auth/sign-up', data);
      const { accessToken, accessTokenExpiration } = res.data;
      inMemoryJWT.setToken(accessToken, accessTokenExpiration);

      //oauthNow
      set({ isAuth: true });
    } catch (error) {
      console.error(error);
    }
  },

  handleSignIn: async (data: { login: string; password: string }) => {
    try {
      const res = await instanceAxios.post('/auth/sign-in');
      const { accessToken, accessTokenExpiration } = res.data;
      inMemoryJWT.setToken(accessToken, accessTokenExpiration);

      //oauthNow
      set({ isAuth: true });
    } catch (error) {
      console.error(error);
    }
  },

  handleGoogleSign: async (data: { token: string; }) => {
    try {
      const res = await instanceAxios.post('/auth/gmail-login', data);
      const { accessToken, accessTokenExpiration } = res.data;
      inMemoryJWT.setToken(accessToken, accessTokenExpiration);

      set({ isAuth: true });
    } catch (error) {
      console.error(error);
    }
  }
}));