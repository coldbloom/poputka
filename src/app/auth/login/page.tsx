'use client';

import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from 'react';
import { ProviderButton } from '@/components/shared/auth/ProviderButton/ProviderButton';
import { TelegramOtpFlow } from '@/components/shared/auth/TelegramOtpFlow/TelegramOtpFlow';
import { TelegramIcon, VkIcon, YandexIcon, MailruIcon } from '@/components/shared/auth/icons/ProviderIcons';
import s from './LoginPage.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

type View = 'providers' | 'telegram';

export default function LoginPage() {
  const [view, setView] = useState<View>('providers');

  const handleOAuth = (provider: 'vk' | 'yandex' | 'mailru') => {
    window.location.href = `${API_URL}/auth/${provider}`;
  };

  if (view === 'telegram') {
    return (
      <div className={s.container}>
        <TelegramOtpFlow onBack={() => setView('providers')} />
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.providers}>
        <ProviderButton variant="telegram" onClick={() => setView('telegram')}>
          <TelegramIcon size={22} />
          <span>Войти через Telegram</span>
        </ProviderButton>

        <ProviderButton variant="vk" onClick={() => handleOAuth('vk')}>
          <VkIcon size={22} />
          <span>Войти через ВКонтакте</span>
        </ProviderButton>

        <ProviderButton variant="yandex" onClick={() => handleOAuth('yandex')}>
          <YandexIcon size={28} />
          <span>Войти через Яндекс</span>
        </ProviderButton>

        <ProviderButton variant="mailru" onClick={() => handleOAuth('mailru')}>
          <MailruIcon size={28} />
          <span>Войти через Mail.ru</span>
        </ProviderButton>
      </div>
    </div>
  );
}
