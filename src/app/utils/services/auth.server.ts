import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { cache } from 'react';

export const  checkAuthOnServer = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  console.log('checkAuthOnServer server log');
  console.log('refreshToken = ', refreshToken);

  if (!refreshToken) {
    return { isAuthenticated: false };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `refreshToken=${refreshToken}`,
    },
    // next: {
    //   tags: ['auth'], // Для ручной инвалидации
    //   revalidate: 60 // Кэшируем на 60 секунд
    // },
  });

  const data = await res.json();
  return {
    data
  };
};