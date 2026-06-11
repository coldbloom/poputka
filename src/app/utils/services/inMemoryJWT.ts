import { instanceAxios } from './apiClient';

const LOGOUT_EVENT_KEY = 'auth_logout';

const inMemoryJWT = (() => {
  let token: string | null = null;
  let refreshTimer: ReturnType<typeof setTimeout> | null = null;

  const getToken = () => token;

  /**
   * Сохраняет access-токен и запускает автоматическое обновление
   * за 30 секунд до истечения.
   */
  const setToken = (newToken: string, expirationMs: number) => {
    token = newToken;

    if (refreshTimer) clearTimeout(refreshTimer);

    const refreshIn = expirationMs - 30_000;
    if (refreshIn > 0) {
      refreshTimer = setTimeout(async () => {
        try {
          const res = await instanceAxios.post('/auth/refresh');
          const { accessToken, accessExpirationMs } = res.data;
          setToken(accessToken, accessExpirationMs);
        } catch {
          deleteToken();
        }
      }, refreshIn);
    }
  };

  const deleteToken = () => {
    token = null;
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
    // Сигнализируем другим вкладкам о выходе
    try {
      localStorage.setItem(LOGOUT_EVENT_KEY, String(Date.now()));
    } catch {
      // localStorage может быть недоступен (SSR или private mode)
    }
  };

  return { getToken, setToken, deleteToken };
})();

export default inMemoryJWT;
