'use client'

import { useEffect } from 'react';
import { useAuthStore, AuthUser } from '@/store/authStore';
import inMemoryJWT from '@/utils/services/inMemoryJWT';

type AuthStoreInitializerProps = {
  /** Пользователь, полученный на сервере через getSession() в root layout */
  initialUser: AuthUser | null;
};

/**
 * Клиентский компонент, инициализирующий auth-состояние на основе SSR-данных.
 * - На старте: записывает initialUser в Zustand (без лишнего запроса к API)
 * - Затем делает refresh для получения access-токена в память
 */
export const AuthStoreInitializer = ({ initialUser }: AuthStoreInitializerProps) => {
  const { init, refreshTokens } = useAuthStore();

  // Синхронная инициализация — до любого useEffect
  // (Zustand.init вызывается во время рендера, это намеренно)
  if (useAuthStore.getState().isAuth === null) {
    init(initialUser);
  }

  useEffect(() => {
    if (!initialUser) return;

    // Пользователь найден на сервере — получаем access-токен для клиентских запросов
    refreshTokens();
  }, []);

  useEffect(() => {
    // Синхронизация logout между вкладками
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'auth_logout') {
        inMemoryJWT.deleteToken();
        init(null);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return null;
};
