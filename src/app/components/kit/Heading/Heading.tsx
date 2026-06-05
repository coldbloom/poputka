import { CSSProperties, PropsWithChildren } from 'react';
import s from './HeadingText.module.scss';
import cn from 'classnames';

type HeadingTextProps = {
  className?: string;
  style?: CSSProperties
  variant?: 'dark' // отвечает за цвет текста
} & PropsWithChildren;

export const Heading = ({ children, className, style, variant }: HeadingTextProps) => {
  return (
    <h1 className={cn(s.headingText, className, { [s.dark]: !!variant })} style={style}>
      {children}
    </h1>
  );
};