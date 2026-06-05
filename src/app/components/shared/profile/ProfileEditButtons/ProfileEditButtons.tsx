'use client'

import { mdiAccountEditOutline, mdiImageEditOutline, mdiImagePlusOutline } from '@mdi/js'
import Icon from "@mdi/react";
import { useState } from 'react';
import { useUserInfoStore } from "@/store";

import { EditInfoModal } from './EditInfoModal';
import { EditAvatarModal } from './EditAvatarModal';

import s from './ProfileEditButtons.module.scss';

export const ProfileEditButtons = () => {
  const [editModalOpen, setEditModalOpen] = useState<'info' | 'avatar' | null>(null);

  const { userInfo } = useUserInfoStore();
  const { avatarPath } = userInfo || {};

  const handleClose = () => setEditModalOpen(null);
  return (
    <>
      <div style={{marginTop: '20px'}}>
        <div className={s.btnWrapper} onClick={() => setEditModalOpen('info')}>
          <Icon path={mdiAccountEditOutline} size={1}/>
          <p>Редактировать информацию о себе</p>
        </div>
        <div className={s.btnWrapper} onClick={() => setEditModalOpen('avatar')}>
          <Icon path={avatarPath ? mdiImageEditOutline : mdiImagePlusOutline} size={1}/>
          <p>{avatarPath ? 'Изменить фото профиля' : 'Добавить фото профиля'}</p>
        </div>
      </div>

      <EditInfoModal isOpen={editModalOpen === 'info'} onCloseAction={handleClose}/>
      <EditAvatarModal isOpen={editModalOpen === 'avatar'} onCloseAction={handleClose}/>
    </>
  );
};