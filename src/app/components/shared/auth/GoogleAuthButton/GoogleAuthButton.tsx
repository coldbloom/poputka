'use client'

import { AuthButton } from "@/components/shared/auth";
import Image from "next/image";

/**
 * Google OAuth временно отключён — перенесён на новую passwordless-систему.
 * Вход через Google будет заменён на VK / Яндекс / Mail.ru.
 */
export const GoogleAuthButton = () => {
  const handleClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/yandex`;
  };

  return (
    <AuthButton onClick={handleClick} variant="google">
      <Image src="/google-g-2015.svg" alt="yandex" width={24} height={24} style={{margin: "0 6px 0 6px"}}/>
      <span>Войти через Яндекс</span>
    </AuthButton>
  );
};