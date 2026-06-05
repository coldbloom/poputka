import { mdiCarLimousine, mdiBellOutline } from '@mdi/js';
import Icon from '@mdi/react';

import React from 'react';
import s from './Header.module.scss';
import Link from 'next/link';
import { Burger } from './Burger';
import { IconButton } from './IconButton';

export const Header = () => {
  console.log(
    '1) компонент Header работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <header className={s.header}>
      <IconButton path={mdiBellOutline} size="24px" classNameIcon={s.iconButton} />

      <Link href="/" className={s.logoWrapper}>
        {/* poputka.app */}
        <span>Попутка</span>
        <div className={s.iconWrapper}>
          <Icon path={mdiCarLimousine} size="40px"/>
        </div>
      </Link>

      <Burger />
    </header>
  );
};