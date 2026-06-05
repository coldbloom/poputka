import Icon from '@mdi/react';
import cn from 'classnames';
import { FC, ReactNode, PropsWithChildren, CSSProperties } from 'react';

import s from './Label.module.scss';

export type LabelColor =
  | 'red'
  | 'green'
  | 'grey'
  | 'violet'
  | 'cyan'
  | 'blue'

export type LabelProps = {
  className?: string;
  text?: string;
  variant?: 'light' | 'heavy' | 'alert';
  color?: LabelColor;
  disabled?: boolean;
  size?: 'xs' | 's' | 'm';
  icon?: string | ReactNode;
  title?: string;
  style?: CSSProperties;
} & PropsWithChildren;

export const Label: FC<LabelProps> = ({
                                        children,
                                        className,
                                        text,
                                        variant = 'light',
                                        color = 'grey',
                                        disabled,
                                        size = 's',
                                        icon,
                                        title,
                                        style,
                                      }) => {
  const getIconComponent = () => {
    if (icon) {
      return <div className={s.icon}>{typeof icon === 'string' ? <Icon path={icon} size={'16px'} /> : icon}</div>;
    }
    return null;
  };

  return (
    <div
      className={cn(className, s.label, s[size], s[variant === 'alert' ? 'alert' : color], s[variant], {
        [s.disabled]: disabled,
      })}
      title={title}
      style={style}
    >
      {children && !text ? (
        children
      ) : (
        <span className={s.content}>
          {getIconComponent()}
          <span className={cn({ [s.withIcon]: icon })}>{text}</span>
        </span>
      )}
    </div>
  );
};