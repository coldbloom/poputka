'use client'

import React, { useMemo } from 'react';
import { useUserInfoStore } from "@/store/userInfoStore";
import Image from "next/image";
import Icon from "@mdi/react";
import {mdiAlertCircleOutline} from "@mdi/js";
import {useWindowWidth} from "@/utils/hooks/useWindowWidth";

import s from './AvatarPreview.module.scss';

const NoPhoto = ({ size, onClick }: { size: number, onClick: () => void }) => (
  <div className={s.noPhotoWrapper}>
    <div className={s.circle} style={{ width: size, height: size }} onClick={onClick}>
      <Icon path={mdiAlertCircleOutline} size={1.2} />
      <span>Нет фото</span>
    </div>
  </div>
);

type AvatarPreviewProps = {
  preview: string | null,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
}

export const AvatarPreview = ({ preview, fileInputRef}: AvatarPreviewProps) => {
  const screenWidth = useWindowWidth();
  const { userInfo } = useUserInfoStore();
  const { avatarPath } = userInfo || {};

  const imageUrl = useMemo(() => {
    return preview || (avatarPath ? `${process.env.NEXT_PUBLIC_API_URL}/${avatarPath}` : null);
  }, [preview, avatarPath]);

  const onNoPhoto = () => fileInputRef.current?.click();
  return (
    <div className={s.avatarWrapper}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={"аватарка"}
          width={screenWidth / 2}
          height={screenWidth / 2}
          className={s.avatarPreview}
        />
      ) : (
        <NoPhoto size={screenWidth / 2} onClick={onNoPhoto} />
      )}
    </div>
  );
};