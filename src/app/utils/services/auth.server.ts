import { cookies } from 'next/headers';
import { cache } from 'react';

export type SessionUser = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatarPath: string | null;
};

/**
 * Получает сессию текущего пользователя на сервере.
 * Обёрнут в React cache() — вызов дедуплицируется в рамках одного SSR-запроса.
 *
 * Используется в Server Components и layouts:
 *   const session = await getSession();
 *   if (!session) redirect('/auth/login');
 */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: 'GET',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user ?? null;
  } catch {
    return null;
  }
});
