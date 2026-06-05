import React, { useState } from 'react';
import s from './AvatarZoomSlider.module.scss';

type AvatarZoomSliderProps = {
  initialValue?: number; // Начальное значение слайдера
  min?: number; // Минимальное значение
  max?: number; // Максимальное значение
  step?: number;
  onZoomChange: (value: number) => void; // Функция обратного вызова для изменения масштаба
};

export const AvatarZoomSlider: React.FC<AvatarZoomSliderProps> = ({
   initialValue = 10,
   min = 10,
   max = 50,
   step = 5,
   onZoomChange,
 }) => {
  const [slideValue, setSlideValue] = useState<number>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSlideValue(newValue);
    onZoomChange(newValue); // Вызываем функцию обратного вызова для изменения масштаба
  };

  return (
    <div style={{ margin: '0 auto', width: '80%' }}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={slideValue}
        onChange={handleChange}
        className={s.range}
      />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <span>Масштаб: {slideValue}</span>
      </div>
    </div>
  );
};