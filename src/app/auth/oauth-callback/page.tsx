'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import inMemoryJWT from '@/utils/services/inMemoryJWT';
import s from './OAuthCallbackPage.module.scss';
import { mdiLoading, mdiCheckCircleOutline, mdiAlertCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshTokens } = useAuthStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const accessToken = searchParams.get('at');
    const expirationMs = searchParams.get('exp');
    const linkToken = searchParams.get('linkToken');
    const error = searchParams.get('error');
    const provider = searchParams.get('provider') as string | null;

    if (error) {
      setErrorMsg(decodeURIComponent(error));
      setStatus('error');
      return;
    }

    if (linkToken) {
      router.replace(`/auth/complete?linkToken=${encodeURIComponent(linkToken)}&provider=${provider ?? ''}`);
      return;
    }

    if (accessToken && expirationMs) {
      inMemoryJWT.setToken(accessToken, Number(expirationMs));
      if (provider) {
        localStorage.setItem('lastAuthMethod', provider);
      }
      refreshTokens().catch(() => {});
      setStatus('success');
      setTimeout(() => {
        router.replace('/');
        router.refresh();
      }, 800);
      return;
    }

    setErrorMsg('Не удалось войти. Попробуйте ещё раз.');
    setStatus('error');
  }, []);

  return (
    <div className={s.page}>
      {status === 'loading' && (
        <div className={s.center}>
          <Icon path={mdiLoading} size="40px" className={s.spin} color="#3B945E" />
          <p>Входим в систему...</p>
        </div>
      )}
      {status === 'success' && (
        <div className={s.center}>
          <Icon path={mdiCheckCircleOutline} size="48px" color="#3B945E" />
          <p>Вход выполнен!</p>
        </div>
      )}
      {status === 'error' && (
        <div className={s.center}>
          <Icon path={mdiAlertCircleOutline} size="48px" color="#f44336" />
          <p className={s.error}>{errorMsg}</p>
          <button className={s.retryBtn} onClick={() => router.replace('/auth/login')}>
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
}
