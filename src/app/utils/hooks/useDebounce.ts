import { useState, useEffect } from 'react';
/**
 * Хук useDebounce, который задерживает обновление значения до тех пор,
 * пока пользователь не прекратит ввод на заданное количество миллисекунд.
 *
 * @param value - Значение, которое требуется дебаунсить (например, текст ввода).
 * @param delay - Задержка (в миллисекундах) перед обновлением значения.
 * @returns debouncedValue - Дебаунсенное значение, которое обновляется с задержкой.
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Устанавливаем таймер, который обновит debouncedValue после задержки.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Убираем таймер, если значение изменилось или компонент размонтирован.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Зависимости: если value или delay изменятся, эффект снова сработает.

  // Возвращаем дебаунсенное значение.
  return debouncedValue;
};