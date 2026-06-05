import type { Metadata } from 'next';
import { AuthLayout } from "@/components/layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Регистрация | Название сервиса",
  description: "Создайте новый аккаунт для доступа ко всем возможностям",
  openGraph: {
    title: "Регистрация | Название сервиса",
    description: "Страница создания аккаунта",
  }
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout
      variant="register"
      title="Регистрация в сервисе Попутка"
      description="Создайте аккаунт чтобы бронировать и создавать поездки"
    >
      {children}
    </AuthLayout>
  )
}