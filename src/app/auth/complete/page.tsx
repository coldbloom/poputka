'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import inMemoryJWT from '@/utils/services/inMemoryJWT';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import s from './CompletePage.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const PROVIDER_NAMES: Record<string, string> = {
  vk: 'ВКонтакте',
  yandex: 'Яндекс',
  mailru: 'Mail.ru',
  telegram: 'Telegram',
};

function CompleteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshTokens } = useAuthStore();

  const linkToken = searchParams.get('linkToken') ?? '';
  const provider = searchParams.get('provider') ?? '';
  const providerName = PROVIDER_NAMES[provider] ?? provider;

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Введите ваше имя');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/complete-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${linkToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Ошибка регистрации');

      if (data.accessToken) {
        inMemoryJWT.setToken(data.accessToken, data.accessExpirationMs ?? 15 * 60 * 1000);
        if (provider) localStorage.setItem('lastAuthMethod', provider);
        await refreshTokens().catch(() => {});
      }

      router.replace('/');
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.card}>
        <div className={s.emoji}>👋</div>
        <h1 className={s.title}>Почти готово!</h1>
        <p className={s.desc}>
          Вы входите через <strong>{providerName}</strong> впервые.
          Укажите имя, чтобы другие пользователи могли вас узнать.
        </p>

        <div className={s.field}>
          <label className={s.label} htmlFor="name">Ваше имя</label>
          <div className={s.inputWrap}>
            <input
              id="name"
              type="text"
              className={s.input}
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Например, Алексей"
              autoFocus
              autoComplete="given-name"
              disabled={loading}
            />
          </div>
          {error && <p className={s.error}>{error}</p>}
        </div>

        <button
          className={s.btn}
          onClick={handleSubmit}
          disabled={loading || !name.trim()}
          type="button"
        >
          {loading
            ? <Icon path={mdiLoading} size="20px" className={s.spin} />
            : 'Создать аккаунт'
          }
        </button>
      </div>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense>
      <CompleteForm />
    </Suspense>
  );
}
