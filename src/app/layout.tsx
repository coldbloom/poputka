import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";

import { AuthStoreInitializer } from '@/components/shared/auth/AuthStoreInitializer';
import { getSession } from '@/utils/services/auth.server';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin", "cyrillic"],
  display: 'swap',
  variable: "--font-roboto",
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    template: 'Попутка',
    default: 'Попутка - поиск попутчиков на автомобиле по России | Сервис совместных поездок',
  },
  description: 'Совместные поездки на авто по России - найти попутчиков быстро | Попутка',
};

/**
 * Root layout — Server Component.
 * Читает сессию на сервере (SSR) и передаёт её в клиентский AuthStoreInitializer.
 * Страница отрендерится с данными пользователя без мигания и лишних запросов.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Один SSR-запрос, результат кешируется React cache() на время рендера
  const user = await getSession();

  return (
    <html lang="ru">
      <body className={`${roboto.variable}`}>
        {/* initialUser передаётся с сервера — клиент сразу знает статус авторизации */}
        <AuthStoreInitializer initialUser={user} />
        {children}
      </body>
    </html>
  );
}
