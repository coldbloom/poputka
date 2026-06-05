import Icon from "@mdi/react";
import {
  mdiAccountCogOutline,
  mdiPlusBoxOutline,
  mdiAccountOutline,
  mdiAccountPlusOutline,
  mdiLogout,
  mdiRoutes,
  mdiCarSearchOutline
} from "@mdi/js";

import { Tab, LinkTab } from './Tab';

import s from './Menu.module.scss';

import { UserInfo } from './UserInfo';
import { useAuthStore } from '@/store/authStore';

type WithOnCloseProps = {
  onClose: () => void;
};

const AuthorizedTabs = ({ onClose }: WithOnCloseProps) => {
  const { handleLogOut } = useAuthStore();

  return (
    <div className={s.tabsWrapper}>
      <LinkTab href="/" text="Найти поездку" icon={<Icon path={mdiCarSearchOutline} size={1} />} onClick={onClose} />
      <LinkTab href="/create-trip/from" text="Создать поездку" icon={<Icon path={mdiPlusBoxOutline} size={1} />} onClick={onClose} />
      <LinkTab href="/" text="Мои поездки" icon={<Icon path={mdiRoutes} size={1} />} onClick={onClose} />
      <LinkTab href="/profile" text="Профиль" icon={<Icon path={mdiAccountCogOutline} size={1} />} onClick={onClose} />
      <hr/>
      <Tab text="Выйти" icon={<Icon path={mdiLogout} size={1} />} onClick={handleLogOut} chevronIconLarge={false} />
    </div>
  )
}

const UnauthorizedTabs = () => {
  // const router = useRouter();
  // const handleLogin = () => router.push("/auth/login");
  // const handleRegister = () => router.push("/auth/register");

  return (
    <div className={s.tabsWrapper}>
      <LinkTab href="/auth/register" text="Зарегистрироваться" icon={<Icon path={mdiAccountPlusOutline} size={1} />} />
      <LinkTab href="/auth/login" text="Войти" icon={<Icon path={mdiAccountOutline} size={1} />} />
      {/*<Tab icon={<Icon path={mdiAccountPlusOutline} size={1.2} />} onClick={handleRegister}>*/}
      {/*  <span style={{fontSize: '18px', fontWeight: '500'}}>Зарегистрироваться</span>*/}
      {/*</Tab>*/}
      {/*<Tab icon={<Icon path={mdiAccountOutline} size={1.2}/>} onClick={handleLogin}>*/}
      {/*  <span style={{fontSize: '18px', fontWeight: '500'}}>Войти</span>*/}
      {/*</Tab>*/}
    </div>
  )
}

export const Menu = ({ onClose }: WithOnCloseProps) => {
  console.log(
    '1) компонент Menu работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );
  const { isAuth } = useAuthStore();

  return (
    <div className={s.modalWrapper}>
      <>
        {isAuth ? (
          <>
            <UserInfo />
            <hr/>
            <AuthorizedTabs onClose={onClose} />
          </>
        ) : (
          <UnauthorizedTabs />
        )}
      </>
    </div>
  );
};