  import type { Metadata } from 'next';
  import { AuthLayout } from '@/components/layouts/AuthLayout';

  export const metadata: Metadata = {
    title: "Вход в аккаунт | Название сервиса",
    description: "Войдите в свой аккаунт для доступа к персональным данным",
    openGraph: {
      title: "Вход | Название сервиса",
      description: "Страница авторизации",
    }
  };

  export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <AuthLayout
        variant="login"
        title="Вход в сервис Попутка"
        description="Войдите в аккаунт чтобы бронировать и создавать поездки"
      >
        {children}
      </AuthLayout>
    )
  }