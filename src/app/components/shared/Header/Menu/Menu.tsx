'use client';

import Icon from "@mdi/react";
import {
  mdiAccountCogOutline,
  mdiPlusBoxOutline,
  mdiLogout,
  mdiRoutes,
  mdiCarSearchOutline
} from "@mdi/js";
import { useRouter } from 'next/navigation';

import { Tab, LinkTab } from './Tab';

import s from './Menu.module.scss';
import { UserInfo } from './UserInfo';
import { useAuthStore } from '@/store/authStore';

type WithOnCloseProps = {
  onClose: () => void;
};

const AuthorizedTabs = ({ onClose }: WithOnCloseProps) => {
  const { logout } = useAuthStore();

  return (
    <div className={s.tabsWrapper}>
      <LinkTab href="/" text="Найти поездку" icon={<Icon path={mdiCarSearchOutline} size={1} />} onClick={onClose} />
      <LinkTab href="/create-trip/from" text="Создать поездку" icon={<Icon path={mdiPlusBoxOutline} size={1} />} onClick={onClose} />
      <LinkTab href="/" text="Мои поездки" icon={<Icon path={mdiRoutes} size={1} />} onClick={onClose} />
      <LinkTab href="/profile" text="Профиль" icon={<Icon path={mdiAccountCogOutline} size={1} />} onClick={onClose} />
      <hr />
      <Tab text="Выйти" icon={<Icon path={mdiLogout} size={1} />} onClick={logout} chevronIconLarge={false} />
    </div>
  );
};

const UnauthorizedTabs = ({ onClose }: WithOnCloseProps) => {
  const router = useRouter();

  const goToLogin = () => {
    onClose();
    router.push('/auth/login');
  };

  return (
    <div className={s.tabsWrapper}>
      <LinkTab href="/" text="Найти поездку" icon={<Icon path={mdiCarSearchOutline} size={1} />} onClick={onClose} />
      <hr />
      <div className={s.loginSection}>
        <p className={s.loginHint}>Войдите, чтобы бронировать и публиковать поездки</p>
        <button className={s.loginBtn} onClick={goToLogin}>
          Войти в аккаунт
        </button>
      </div>
    </div>
  );
};

export const Menu = ({ onClose }: WithOnCloseProps) => {
  const { isAuth } = useAuthStore();

  return (
    <div className={s.modalWrapper}>
      {isAuth ? (
        <>
          <UserInfo />
          <hr />
          <AuthorizedTabs onClose={onClose} />
        </>
      ) : (
        <UnauthorizedTabs onClose={onClose} />
      )}
    </div>
  );
};
