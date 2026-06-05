'use client'

import { mdiMenu, mdiTextAccount, mdiClose } from '@mdi/js';

import { useState } from 'react';
import { IconButton } from '../IconButton';
import { Menu } from '../Menu';
import { ModalPageWindow } from '@/components/kit/ModalPageWindow';
import { useAuthStore } from '@/store/authStore';

import cn from 'classnames';
import s from './Burger.module.scss'

export const Burger = () => {
  const { isAuth } = useAuthStore();
  const [isOpen, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const iconMenu = () => isAuth ? mdiTextAccount : mdiMenu;

  console.log(
    '1) компонент Burger работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <>
      <IconButton
        path={isOpen ? mdiClose : iconMenu()}
        size="32px"
        onClick={() => setOpen(open => !open)}
        classNameIcon={cn({ [s.authBurger]: isAuth })}
      />

      <ModalPageWindow
        isOpen={isOpen}
        onCloseAction={onClose}
        className={s.modalPage}
        backdropClassName={s.backdrop}
        slidePosition="x"
        exitActiveFast={true}
      >
        <Menu onClose={onClose} />
      </ModalPageWindow>
    </>
  );
};