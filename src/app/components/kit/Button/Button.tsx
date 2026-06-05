import { ReactNode, CSSProperties, ButtonHTMLAttributes, forwardRef } from 'react';
import Link from "next/link";
import cn from 'classnames';

import { Loader } from '../Loader';
import s from './Button.module.scss';

type ButtonVariant = 'primary' | 'input' | 'continue';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  disabled?: boolean;
  error?: boolean;
  active?: boolean; // пропс active отвечает за анимацию при клике на кнопку
  errorText?: string;
  className?: string;
  style?: CSSProperties;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
};

// Компонент для содержимого кнопки, чтобы избежать дублирования
const ButtonContent = ({ iconLeft, iconRight, loading, children }: {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}) => (
  <>
    {iconLeft && <div className={cn(s.icon, s.iconLeft)}>{iconLeft}</div>}
    {!loading ? children : <Loader size="m" color="light" />}
    {iconRight && <div className={cn(s.icon, s.iconRight)}>{iconRight}</div>}
  </>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
     children,
     variant = 'primary',
     href,
     disabled = false,
     error = false,
     active = true,
     errorText,
     className,
     style,
     iconLeft,
     iconRight,
     loading,
     ...commonButtonProps
   }, ref) => {
    // Общие классы для кнопки
    const buttonClasses = cn(
      s.button,
      className,
      s[`variant-${variant}`],
      {[s.disabled]: disabled, [s.error]: error, [s.active]: active}
    );

    // Компонент сообщения об ошибке
    const ErrorMessage = error && errorText ? (
      <p className={s.errorMessage}>{errorText}</p>
    ) : null;

    //@FIXME удалить лог
    console.log(
      'компонента Button работает на:',
      typeof window === 'undefined' ? 'сервере' : 'клиенте'
    );

    // Если это кнопка-ссылка (continue вариант с href)
    if (variant === 'continue' && href) {
      return (
        <>
          <Link
            href={href}
            tabIndex={disabled || loading ? -1 : undefined}
          >
            <button className={buttonClasses} style={style}>
              <ButtonContent
                iconLeft={iconLeft}
                iconRight={iconRight}
                loading={loading}
              >
                {children}
              </ButtonContent>
            </button>
          </Link>
          {ErrorMessage}
        </>
      );
    }

    // Обычная кнопка
    return (
      <>
        <button
          {...commonButtonProps}
          disabled={loading || disabled}
          style={style}
          className={buttonClasses}
          ref={ref}
          type={commonButtonProps.type || 'button'} // Явно указываем тип кнопки по умолчанию
        >
          <ButtonContent
            iconLeft={iconLeft}
            iconRight={iconRight}
            loading={loading}
          >
            {children}
          </ButtonContent>
        </button>
        {ErrorMessage}
      </>
    );
  }
);

// Добавляем displayName для улучшения отладки
Button.displayName = 'Button';
