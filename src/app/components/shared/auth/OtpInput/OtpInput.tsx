'use client';

import { useRef, KeyboardEvent, ClipboardEvent } from 'react';
import s from './OtpInput.module.scss';
import cn from 'classnames';

type OtpInputProps = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
};

export const OtpInput = ({ value, onChange, length = 4, disabled, error }: OtpInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.split('');

  const handleChange = (index: number, char: string) => {
    const sanitized = char.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = sanitized;
    const joined = next.join('').slice(0, length);
    onChange(joined);

    if (sanitized && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits];
        next[index] = '';
        onChange(next.join(''));
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const next = [...digits];
        next[index - 1] = '';
        onChange(next.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div className={s.container}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[i] ?? ''}
          disabled={disabled}
          className={cn(s.box, {
            [s.filled]: !!digits[i],
            [s.error]: error,
          })}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};
