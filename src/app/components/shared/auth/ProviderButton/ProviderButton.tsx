'use client';

import { ButtonHTMLAttributes, PropsWithChildren, useEffect, useState } from 'react';
import cn from 'classnames';
import s from './ProviderButton.module.scss';

export type ProviderVariant = 'telegram' | 'vk' | 'yandex' | 'mailru';

type ProviderButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ProviderVariant;
  isLast?: boolean;
} & PropsWithChildren;

const PROVIDER_LABELS: Record<ProviderVariant, string> = {
  telegram: 'Последний вход',
  vk: 'Последний вход',
  yandex: 'Последний вход',
  mailru: 'Последний вход',
};

export const ProviderButton = ({
  variant,
  children,
  className,
  isLast,
  ...props
}: ProviderButtonProps) => {
  const [lastMethod, setLastMethod] = useState<string | null>(null);

  useEffect(() => {
    setLastMethod(localStorage.getItem('lastAuthMethod'));
  }, []);

  const showBadge = isLast !== undefined ? isLast : lastMethod === variant;

  return (
    <button
      {...props}
      className={cn(s.button, s[variant], className)}
    >
      {showBadge && (
        <span className={s.badge}>{PROVIDER_LABELS[variant]}</span>
      )}
      <span className={s.inner}>{children}</span>
    </button>
  );
};
