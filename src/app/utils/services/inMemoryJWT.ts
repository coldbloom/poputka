import { instanceAxios } from './apiClient';

const inMemoryJWT = () => {
  // Приватные переменные
  let inMemoryJWT: string | null = null;
  let refreshTimeoutId: string | number | NodeJS.Timeout | null | undefined = null;

  // Возвращает текущий JWT-токен из памяти.
  // Если токен не установлен — вернет null.
  const getToken = () => inMemoryJWT;

  // Сохраняет новый токен в памяти.
  // Запускает отложенное обновление токена перед истечением срока.
  const setToken = (token: string, tokenExpiration: number) => {
    inMemoryJWT = token;
    refreshToken(tokenExpiration);
  };

  const abortRefreshToken = () => {
    if (refreshTimeoutId) {
      clearInterval(refreshTimeoutId);
    }
  }

  // Метод, который удаляет токен, очищает таймер обновления и устанавливает значение в localStorage, чтобы другие вкладки могли отреагировать на выход пользователя.
  const deleteToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();

    localStorage.setItem(process.env.REACT_APP_LOGOUT_STORAGE_KEY!, String(Date.now())); // для того чтобы осуществлялся выход на всех вкладках, указывает TypeScript; "!" гарантирует, что process.env.REACT_APP_LOGOUT_STORAGE_KEY точно существует и не является undefined
  };

  // Механизм обновления токена
  const refreshToken = (expiration: number) => {
    const timeoutTrigger = expiration - 10000; // Обновляем за 10 сек до истечения

    refreshTimeoutId = setTimeout(() => {
      instanceAxios.post('/auth/refresh')
        .then(res => {
          const { accessToken, accessTokenExpiration } = res.data;
          setToken(accessToken, accessTokenExpiration);
        })
        .catch(console.error)
    }, timeoutTrigger);
  }

  // Публичные методы
  return { getToken, setToken, deleteToken };
}

export default inMemoryJWT();
// экспортируем и сразу вызываем чтобы getToken и setToken были доступны через "." как методы у обхекта