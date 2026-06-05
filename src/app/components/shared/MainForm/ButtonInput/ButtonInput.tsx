import { getPassengerString } from "@/utils/functions";
import Icon from "@mdi/react";

import s from './ButtonInput.module.scss';
import cn from "classnames";

type ButtonInputProps = {
  iconPath?: string;
  placeholder?: string;
  onClick?: () => void;
  className?: string;
  value?: string | number;
  error?: boolean;
};

export const ButtonInput = ({ iconPath, placeholder, onClick, className, value, error = false }: ButtonInputProps) => {
  // Логика для отображения значения на кнопке
  const displayValue = typeof value === 'number'
    ? getPassengerString(value) // Если value - число, отображаем с правильным склонением
    : (value ?? placeholder); // Иначе, если есть значение, отображаем его, или показываем placeholder

  return (
    <button onClick={onClick} className={cn(s.buttonInput, {[s.disabledColor]: !value}, {[s.error]: error}, className)}>
      {iconPath && <Icon path={iconPath} className={s.icon} />}
      <span>{displayValue}</span>
    </button>
  )
};