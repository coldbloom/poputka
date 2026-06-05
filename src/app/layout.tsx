import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";

import { AuthStoreInitializer } from '@/components/shared/auth/AuthStoreInitializer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'], // Укажите нужные начертания
  subsets: ["latin", "cyrillic"], // Добавьте нужные языковые подмножества
  display: 'swap', // Для лучшей производительности
  variable: "--font-roboto", // CSS переменная для использования
  // Fallback-шрифты: Важно указать резервные шрифты на случай проблем с загрузкой Roboto
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    template: 'Попутка',
    default: 'Попутка - поиск попутчиков на автомобиле по России | Сервис совместных поездок',
  },
  description: 'Совместные поездки на авто по России - найти попутчиков быстро | Попутка',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const authData = await checkAuthOnServer();
  // if (authData) {
  //   inMemoryJWT.setToken(authData.accessToken, authData.accessTokenExpiration);
  // }

  // const cookieStore = await cookies();
  // const refreshToken = cookieStore.get('refreshToken');
  // console.log('refreshToken = ', refreshToken?.value);

  return (
    <html lang="ru">
      <body className={`${roboto.variable}`}>
        <AuthStoreInitializer />
        {children}
      </body>
    </html>
  );
}
