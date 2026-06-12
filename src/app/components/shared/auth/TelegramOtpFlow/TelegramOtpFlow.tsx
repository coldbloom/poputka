'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { mdiArrowLeft, mdiPhone, mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import { OtpInput } from '../OtpInput/OtpInput';
import s from './TelegramOtpFlow.module.scss';
import cn from 'classnames';
import {PhoneForm} from "@/components/shared/auth/TelegramOtpFlow/PhoneForm";

type Step = 'phone' | 'otp' | 'name';

type TelegramOtpFlowProps = {
  onBack: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const RESEND_TIMEOUT = 60;

export const TelegramOtpFlow = ({ onBack }: TelegramOtpFlowProps) => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [linkToken, setLinkToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLeft, setResendLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    phoneRef.current?.focus();
  }, []);

  useEffect(() => {
    if (otp.length === 4 && step === 'otp') {
      verifyOtp(otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const startResendTimer = () => {
    setResendLeft(RESEND_TIMEOUT);
    timerRef.current = setInterval(() => {
      setResendLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return '';
    let result = '+';
    if (digits.startsWith('7') || digits.startsWith('8')) {
      result += '7';
      const rest = digits.slice(1);
      if (rest.length > 0) result += ' (' + rest.slice(0, 3);
      if (rest.length >= 3) result += ') ' + rest.slice(3, 6);
      if (rest.length >= 6) result += '-' + rest.slice(6, 8);
      if (rest.length >= 8) result += '-' + rest.slice(8, 10);
    } else {
      result += digits.slice(0, 12);
    }
    return result;
  };

  const rawPhone = () => {
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('8') ? '7' + digits.slice(1) : digits;
  };

  const sendOtp = async () => {
    const digits = rawPhone();
    if (digits.length < 11) {
      setError('Введите корректный номер телефона');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/telegram/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '+' + digits }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Ошибка отправки кода');
      setStep('otp');
      setOtp('');
      startResendTimer();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (code: string) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/telegram/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone: '+' + rawPhone(), code }),
      });
      const data = await res.json();
      if (res.status === 201 && data.linkToken) {
        setLinkToken(data.linkToken);
        setStep('name');
      } else if (res.ok && data.accessToken) {
        localStorage.setItem('lastAuthMethod', 'telegram');
        router.push('/');
        router.refresh();
      } else {
        throw new Error(data.message ?? 'Неверный код');
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Неверный код');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async () => {
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
      localStorage.setItem('lastAuthMethod', 'telegram');
      router.push('/');
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.flow}>
      <button
        className={s.backBtn}
        onClick={step === 'phone' ? onBack : () => { setStep(step === 'name' ? 'otp' : 'phone'); setError(''); setOtp(''); }}
        type="button"
      >
        <Icon path={mdiArrowLeft} size="20px" />
        <span>Назад</span>
      </button>

      {step === 'phone' && (
        <>
          {/*<div className={s.stepContent}>*/}
          {/*  <div className={s.stepIcon}>*/}
          {/*    <Icon path={mdiPhone} size="28px" />*/}
          {/*  </div>*/}
          {/*  <h2 className={s.stepTitle}>Введите номер телефона</h2>*/}
          {/*  <p className={s.stepDesc}>*/}
          {/*    Мы отправим 4-значный код в ваш Telegram-бот*/}
          {/*  </p>*/}
          {/*  <div className={cn(s.inputWrap, { [s.inputError]: !!error })}>*/}
          {/*    <input*/}
          {/*      ref={phoneRef}*/}
          {/*      type="tel"*/}
          {/*      className={s.phoneInput}*/}
          {/*      value={phone}*/}
          {/*      onChange={(e) => {*/}
          {/*        setPhone(formatPhone(e.target.value));*/}
          {/*        setError('');*/}
          {/*      }}*/}
          {/*      onKeyDown={(e) => e.key === 'Enter' && sendOtp()}*/}
          {/*      placeholder="+7 (___) ___-__-__"*/}
          {/*      disabled={loading}*/}
          {/*      autoComplete="tel"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  {error && <p className={s.errorText}>{error}</p>}*/}
          {/*  <button*/}
          {/*    className={s.submitBtn}*/}
          {/*    onClick={sendOtp}*/}
          {/*    disabled={loading}*/}
          {/*    type="button"*/}
          {/*  >*/}
          {/*    {loading ? <Icon path={mdiLoading} size="20px" className={s.spin} /> : 'Продолжить'}*/}
          {/*  </button>*/}
          {/*</div>*/}
          <PhoneForm />
        </>
        // <div className={s.stepContent}>
        //   <div className={s.stepIcon}>
        //     <Icon path={mdiPhone} size="28px" />
        //   </div>
        //   <h2 className={s.stepTitle}>Введите номер телефона</h2>
        //   <p className={s.stepDesc}>
        //     Мы отправим 4-значный код в ваш Telegram-бот
        //   </p>
        //   <div className={cn(s.inputWrap, { [s.inputError]: !!error })}>
        //     <input
        //       ref={phoneRef}
        //       type="tel"
        //       className={s.phoneInput}
        //       value={phone}
        //       onChange={(e) => {
        //         setPhone(formatPhone(e.target.value));
        //         setError('');
        //       }}
        //       onKeyDown={(e) => e.key === 'Enter' && sendOtp()}
        //       placeholder="+7 (___) ___-__-__"
        //       disabled={loading}
        //       autoComplete="tel"
        //     />
        //   </div>
        //   {error && <p className={s.errorText}>{error}</p>}
        //   <button
        //     className={s.submitBtn}
        //     onClick={sendOtp}
        //     disabled={loading}
        //     type="button"
        //   >
        //     {loading ? <Icon path={mdiLoading} size="20px" className={s.spin} /> : 'Продолжить'}
        //   </button>
        // </div>
      )}

      {step === 'otp' && (
        <div className={s.stepContent}>
          <div className={cn(s.stepIcon, s.telegram)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M5.128 11.816c3.628-1.58 6.047-2.62 7.258-3.123 3.455-1.437 4.172-1.687 4.637-1.695.103-.002.333.024.482.146.126.103.16.241.177.339.016.097.037.319.021.492-.188 1.977-.999 6.775-1.412 8.993-.175.937-.52 1.25-.854 1.281-.725.067-1.276-.479-1.978-.94-1.099-.72-1.72-1.168-2.787-1.87-1.233-.81-.434-1.255.269-1.982.184-.191 3.381-3.1 3.443-3.363.008-.033.015-.155-.058-.22-.073-.065-.181-.042-.259-.025-.11.025-1.865 1.185-5.264 3.481-.498.342-.949.509-1.353.5-.445-.01-1.3-.252-1.937-.459-.781-.253-1.402-.387-1.348-.817.028-.224.336-.453.924-.687z"
                fill="white"
              />
            </svg>
          </div>
          <h2 className={s.stepTitle}>Введите код из Telegram</h2>
          <p className={s.stepDesc}>
            Отправили на <strong>{phone}</strong>
          </p>
          <div className={s.otpWrap}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              disabled={loading}
              error={!!error}
            />
          </div>
          {error && <p className={s.errorText}>{error}</p>}
          {loading && (
            <div className={s.verifying}>
              <Icon path={mdiLoading} size="18px" className={s.spin} />
              <span>Проверяем...</span>
            </div>
          )}
          <div className={s.resend}>
            {resendLeft > 0 ? (
              <span className={s.resendTimer}>Отправить повторно через {resendLeft} с</span>
            ) : (
              <button className={s.resendBtn} onClick={sendOtp} type="button" disabled={loading}>
                Отправить повторно
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'name' && (
        <div className={s.stepContent}>
          <div className={s.stepIcon}>
            <span style={{ fontSize: 28 }}>👋</span>
          </div>
          <h2 className={s.stepTitle}>Как вас зовут?</h2>
          <p className={s.stepDesc}>
            Вы входите впервые. Укажите имя для профиля.
          </p>
          <div className={cn(s.inputWrap, { [s.inputError]: !!error })}>
            <input
              type="text"
              className={s.phoneInput}
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && completeRegistration()}
              placeholder="Ваше имя"
              disabled={loading}
              autoFocus
              autoComplete="given-name"
            />
          </div>
          {error && <p className={s.errorText}>{error}</p>}
          <button
            className={s.submitBtn}
            onClick={completeRegistration}
            disabled={loading}
            type="button"
          >
            {loading ? <Icon path={mdiLoading} size="20px" className={s.spin} /> : 'Создать аккаунт'}
          </button>
        </div>
      )}
    </div>
  );
};
