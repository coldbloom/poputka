'use client'

import { ChangeEvent, CSSProperties, RefObject, forwardRef, useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import s from './TextArea.module.scss';

type TextAreaProps = {
  value: string;
  defaultValue?: string;
  defaultRows?: number;
  onChangeAction?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string | boolean;
  size?: 'auto' | 'fixed';
  className?: string;
  style?: CSSProperties;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
     value,
     defaultValue,
     defaultRows = 4,
     onChangeAction,
     placeholder,
     disabled,
     errorText,
     size = 'auto',
     className,
     style
   }, ref) => {
    const [currentValue, setCurrentValue] = useState(value || defaultValue || '');
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    // Функция для автоматического изменения высоты
    const adjustHeight = () => {
      const textArea = ref ? (ref as RefObject<HTMLTextAreaElement>).current : textAreaRef.current;

      if (textArea && size === 'auto') {
        // Сбрасываем высоту, чтобы получить правильную высоту содержимого
        textArea.style.height = 'auto';
        // Устанавливаем высоту на основе scrollHeight
        textArea.style.height = `${textArea.scrollHeight}px`;
      }
    };

    // Обработчик изменения значения
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);
      onChangeAction?.(newValue);
    };

    // Регулируем высоту при изменении значения
    useEffect(() => {
      adjustHeight();
    }, [currentValue]);

    // Регулируем высоту при монтировании компонента
    useEffect(() => {
      adjustHeight();
      // Также регулируем высоту при изменении размера окна
      window.addEventListener('resize', adjustHeight);
      return () => {
        window.removeEventListener('resize', adjustHeight);
      };
    }, []);

    return (
      <div className={s.wrapper}>
        <textarea
          ref={(node) => {
            // Обрабатываем оба ref - переданный извне и внутренний
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as RefObject<HTMLTextAreaElement | null>).current = node;
            }
            textAreaRef.current = node;
          }}
          rows={defaultRows}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            s.textArea,
            {[s.error]: errorText, [s.autoSize]: size === 'auto'},
            className
          )}
          style={style}
          disabled={disabled}
        />
        {errorText && <span className={s.errorMessage}>{errorText}</span>}
      </div>
  );
});

// Добавляем displayName для отладки
TextArea.displayName = 'TextArea';