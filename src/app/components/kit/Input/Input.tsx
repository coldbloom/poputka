'use client'

import React, { forwardRef, useRef, useState, HTMLProps, CSSProperties } from 'react';
import s from './Input.module.scss'
import cn from 'classnames';
import Icon from "@mdi/react";
import {mdiEyeOutline, mdiEyeOffOutline, mdiClose} from '@mdi/js';

type InputProps = {
  value?: string;
  onFocus?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  errorText?: string;
  placeholder?: string;
  isLabel?: boolean;
  autoFocus?: boolean;
  /** свойство disabled для input типа submit */
  disabled?: boolean;
  handleClear?: () => void;
  className?: string;
  classNameWrapper?: string;
  style?: CSSProperties;
} & HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onFocus,
  onBlur,
  isLabel = true,
  type = "text",
  errorText,
  placeholder,
  autoFocus,
  disabled = false,
  handleClear,
  className,
  classNameWrapper,
  style,
  ...props
}, ref) => {

  if (type === "submit") {
    return (
      <input
        type="submit"
        value={value}
        disabled={disabled}
        className={cn(s.submitButton, className, {[s.disabled]: disabled})}
        {...props}
      />
    )
  }

  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = React.useId();

  const onPasswordVisible = () => setPasswordVisible(prev => !prev);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const onClear = () =>  {
    handleClear?.();
    inputRef?.current?.focus();
  };

  return (
    <div className={cn(s.wrapper, classNameWrapper)}>
      <div className={cn(s.formInput, className, {[s.error]: errorText})}>
        <input
          id={inputId}
          value={value}
          type={passwordVisible ? "text" : type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          ref={ref || inputRef}
          disabled={disabled}
          {...props}
        />
        {isLabel &&
          <label
            htmlFor={inputId}
            className={cn({[s.focus]: isFocused && value?.length !== 0, [s.error]: errorText && value?.length !== 0})}
          >
            {placeholder}
          </label>
        }
        {type === 'password' && (
          <div
            onClick={onPasswordVisible}
            aria-label={passwordVisible ? "Скрыть пароль" : "Показать пароль"}
            className={s.eyesButton}
          >
            <Icon path={passwordVisible ? mdiEyeOffOutline : mdiEyeOutline} size="24px" />
          </div>
        )}
        {handleClear && value?.length !== 0 && (
          <div onClick={onClear} className={s.eyesButton}>
            <Icon path={mdiClose} size="24px" />
          </div>
        )}
      </div>
      {errorText && <span className={s.errorMessage}>{errorText}</span>}
    </div>
  );
});