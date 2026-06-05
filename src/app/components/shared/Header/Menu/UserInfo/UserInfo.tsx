import { Avatar } from '@/components/kit/Avatar';
import { useUserInfoStore } from '@/store/userInfoStore';

import s from './UserInfo.module.scss'

export const UserInfo = () => {
  const { userInfo } = useUserInfoStore();

  if (!userInfo) return null;

  const { name, login, avatarPath } = userInfo;
  console.log(avatarPath);
  return (
    <div className={s.userInfoWrapper}>
      <Avatar size="m" avatarPath={avatarPath}>{name}</Avatar>
      <div className={s.textWrapper}>
        <span>{name}</span>
        <span>{login}</span>
      </div>
    </div>
  )
};