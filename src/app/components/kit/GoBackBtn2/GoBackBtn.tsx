import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "@mdi/react";

import { CSSProperties } from 'react';
import Link from 'next/link';
import s from './GoBackBtn.module.scss';
import cn from 'classnames';

type GoBackBtnProps = {
  href: string;
  style?: CSSProperties;
  className?: string;
};

export const GoBackBtn = ({ href, className, style }: GoBackBtnProps) => {
  //@FIXME удалить лог
  console.log(
    'компонента GoBackBtn работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );
  return (
    <Link href={href} className={cn(s.goBackWrapper, className)} style={style}>
      <Icon path={mdiArrowLeftCircle} size="36px" />
    </Link>
  );
};