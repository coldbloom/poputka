import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import cn from 'classnames';
import { FC, isValidElement, ReactNode } from 'react';

import s from './Plug.module.scss';

type PlugProps = {
  title?: ReactNode;
  icon?: ReactNode;
  text?: ReactNode;
  className?: string;
};

export const Plug: FC<PlugProps> = ({ icon, title, text, className }) => {
  return (
    <div className={cn(s.wrapper, className)}>
      {icon || <Icon path={mdiMagnify} size="64px" />}
      {isValidElement(title) ? title : <h3 className={s.title}>{title}</h3>}
      {isValidElement(text) ? (
        text
      ) : (
        <p className={s.textCompact}>
          {text}
        </p>
      )}
    </div>
  );
};
