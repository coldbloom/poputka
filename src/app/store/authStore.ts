import { create } from 'zustand';
import { instanceAxios } from '@/utils/services/apiClient';
import inMemoryJWT from '@/utils/services/inMemoryJWT';

export type AuthUser = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatarPath: string | null;
};

interface AuthStore {
  /** null — не определено (первый рендер), false — не авторизован, true — авторизован */
  isAuth: boolean | null;
  user: AuthUser | null;

  /** Инициализация на клиенте: вызывается в AuthStoreInitializer */
  init: (user: AuthUser | null) => void;

  /** Обновляет access-токен по refresh-cookie (вызывается inMemoryJWT автоматически) */
  refreshTokens: () => Promise<void>;

  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: null,
  user: null,

  init: (user) => {
    set({ isAuth: !!user, user: user ?? null });
  },

  refreshTokens: async () => {
    try {
      const res = await instanceAxios.post('/auth/refresh');
      const { accessToken, accessExpirationMs, user } = res.data;
      inMemoryJWT.setToken(accessToken, accessExpirationMs);
      set({ isAuth: true, user });
    } catch {
      inMemoryJWT.deleteToken();
      set({ isAuth: false, user: null });
    }
  },

  logout: async () => {
    try {
      await instanceAxios.post('/auth/logout');
    } finally {
      inMemoryJWT.deleteToken();
      set({ isAuth: false, user: null });
    }
  },

  logoutAll: async () => {
    try {
      await instanceAxios.post('/auth/logout-all');
    } finally {
      inMemoryJWT.deleteToken();
      set({ isAuth: false, user: null });
    }
  },
}));
