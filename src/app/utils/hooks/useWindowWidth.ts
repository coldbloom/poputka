import { useState, useEffect } from 'react';

export const useWindowWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Функция для обновления ширины экрана
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Добавляем обработчик события resize
    window.addEventListener('resize', handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenWidth; // Возвращаем текущее значение ширины экрана
};