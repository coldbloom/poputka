'use client'

import { useState } from 'react';
import { formatPhone } from "@/utils/functions";
import { NameForm } from './NameForm';
import { PhoneForm } from './PhoneForm';
import { BirthDateForm } from './BirthDateForm';
import { useUserInfoStore } from "@/store";

import s from './EditInfoModal.module.scss';
import { ModalWrapper } from '../ModalWrapper';

type EditInfoModalProps = {
  isOpen: boolean;
  onCloseAction: () => void;
};

export const EditInfoModal = ({ isOpen, onCloseAction }: EditInfoModalProps) => {
  const [editFieldModalOpen, setEditFieldModalOpen] = useState<number>(0);
  const { userInfo } = useUserInfoStore();
  const { name, birthDate, phone  } = userInfo || {};

  const handleCloseClose = () => setEditFieldModalOpen(0);

  return (
    <ModalWrapper isOpen={isOpen} onCloseAction={onCloseAction}>
      <>
        <h1 className={s.heading}>Информация о себе</h1>

        <div className={s.inputBtn} onClick={() => setEditFieldModalOpen(1)}>
          <span>Имя</span>
          <span>{name}</span>
        </div>
        <div className={s.inputBtn} onClick={() => setEditFieldModalOpen(2)}>
          <span>Дата рождения</span>
          <span>{birthDate || 'Не указано'}</span>
        </div>
        <div className={s.inputBtn} onClick={() => setEditFieldModalOpen(3)}>
          <span>Номер телефона</span>
          <span>{formatPhone(phone) || 'Не указано'}</span>
        </div>

        <ModalWrapper isOpen={!!editFieldModalOpen} onCloseAction={handleCloseClose}>
          {editFieldModalOpen === 1 && <NameForm onCloseAction={handleCloseClose}/>}
          {editFieldModalOpen === 2 && <BirthDateForm onCloseAction={handleCloseClose}/>}
          {editFieldModalOpen === 3 && <PhoneForm onCloseAction={handleCloseClose}/>}
        </ModalWrapper>
      </>
    </ModalWrapper>
  );
};