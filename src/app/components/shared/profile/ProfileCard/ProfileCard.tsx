'use client'

import React from 'react';
import s from "./ProfileCard.module.scss";
import {Avatar} from "@/components/kit/Avatar";
import Icon from "@mdi/react";
import {mdiChevronRight} from "@mdi/js";
import { useUserInfoStore } from "@/store/userInfoStore";

export const ProfileCard = () => {
  const { userInfo } = useUserInfoStore();
  const { name = '', avatarPath, login } = userInfo || {};

  console.log(
    'компонента Profile Card работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <div className={s.profileWrapper}>
      <div className={s.content}>
        <Avatar size="xxl" avatarPath={avatarPath}>
          {name}
        </Avatar>
        <div className={s.row}>
          <span>{name}</span>
          <span>{login}</span>
        </div>
      </div>
      {/* добавить функционал клика чтобы посмотреть карточку профиля ползьователя так как она видна другим пользователям */}
      {/*<Icon path={mdiChevronRight} size="36px" className={s.chevronIcon}/>*/}
    </div>
  );
};