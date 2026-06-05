import Icon from '@mdi/react';
import React from 'react';
import s from './IconButton.module.scss';
import cn from 'classnames';

type IconButtonProps = {
  path: string;
  size: number | string;
  className?: string;
  classNameIcon?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ path, size, className, classNameIcon, ...props }: IconButtonProps) => {
  return (
    <button className={cn(s.button, className)} {...props}>
      <Icon path={path} size={size} className={classNameIcon} />
    </button>
  );
};