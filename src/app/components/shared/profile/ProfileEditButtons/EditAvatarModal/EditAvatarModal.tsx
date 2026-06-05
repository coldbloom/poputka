'use client'

import { useState, ChangeEvent, useEffect, useRef } from 'react';
import Icon from "@mdi/react";
import  { mdiImagePlusOutline } from "@mdi/js";
import { AvatarCropper } from './AvatarCropper';
import { AvatarPreview} from './AvatarPreview';
import { Button } from "@/components/kit/Button";
import { useUserInfoStore } from "@/store/userInfoStore";
import { authApiClient } from "@/utils/services/apiClient";
import {ModalWrapper} from "@/components/shared/profile/ProfileEditButtons/ModalWrapper";

import s from './EditAvatarModal.module.scss';

type EditAvatarModalProps = {
  isOpen: boolean;
  onCloseAction: () => void;
}

export const EditAvatarModal = ({ isOpen, onCloseAction }: EditAvatarModalProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUserInfo } = useUserInfoStore();

  const stopCropping = () => setIsCropping(false);

  const onCloseClose = () => {
    onCloseAction();
    // @INFO: таймаут нужен для сброса текущего preview после завершения анимации
    setTimeout(() => {
      setIsCropping(false);
      setPreview(null);
      setImage(null);
    }, 300);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Валидация размера (например, макс. 5MB)
      // if (file.size > 5 * 1024 * 1024) {
      //   setError('Размер файла не должен превышать 5MB');
      //   return;
      // }
      console.log(file, ' file');

      // Создаем превью
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      setIsCropping(true);

      // Очищаем URL при размонтировании
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSave = async () => {
    console.log(preview, ' этот файл надо отправить на сервер')
    const formdata = new FormData();
    imageFile && formdata.append('avatar', imageFile);
    try {
      setLoading(true);
      const { avatarPath } = await authApiClient.poster('user-info/upload-avatar', formdata);
      updateUserInfo('avatarPath', avatarPath);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onCloseClose();
    }
  };

  //@FIXME убрать этот эффект и продебажить его
  useEffect(() => {
    console.log(error, ' error')
  }, [error]);

  return (
    <ModalWrapper isOpen={isOpen} onCloseAction={onCloseClose}>
      {!isCropping && <AvatarPreview preview={preview} fileInputRef={fileInputRef} />}

      {/* Компонент обрезки изображения */}
      {isCropping && image && (
        <AvatarCropper
          image={image}
          setPreview={setPreview}
          setImageFile={setImageFile}
          stopCropping={stopCropping}
        />
      )}

      <div className={s.editAvatarWrapper}>
        {/* Скрытый input */}
        <input
          type="file"
          accept="image/*"
          className={s.hiddenInput}
          id="avatar-upload"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        {/* Кастомная кнопка */}
        <label
          htmlFor="avatar-upload"
          className={`${s.customButton} ${preview ? s.changeButton : ''}`}
        >
          <Icon path={mdiImagePlusOutline} size={1}/>
          <span>{preview ? 'Изменить фото' : 'Выбрать фото'}</span>
        </label>

        <Button onClick={handleSave} disabled={!preview} loading={loading}>Сохранить</Button>
      </div>
    </ModalWrapper>
  );
};