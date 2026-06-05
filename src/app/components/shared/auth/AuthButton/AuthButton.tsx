'use client'

import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState
} from 'react';

import s from './AuthButton.module.scss';
import cn from 'classnames';

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant: 'local' | 'google';
} & PropsWithChildren;

export const AuthButton = ({
  variant,
  children,
  className,
  ...otherProps
}: AuthButtonProps) => {
  console.log(
    '2) компонент AuthButton работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );
  const [lastAuthMethod, setLastAuthMethod] = useState<string | null>(null)

  useEffect(() => {
    // Этот код выполняется только на клиенте
    setLastAuthMethod(localStorage.getItem('lastAuthMethod'))
  }, [])
  return (
    <button {...otherProps} className={cn(s.authButton, className)}>
      {lastAuthMethod === variant && <div className={s.lastAuthInfo}>Последний вход</div>}
      {children}
    </button>
  );
};