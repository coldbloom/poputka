import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { PropsWithChildren } from 'react';
import { ModalPageWindow } from '@/components/kit/ModalPageWindow';

import s from './ModalWrapper.module.scss';

type ModalWrapperProps = {
  isOpen: boolean;
  onCloseAction: () => void;
} & PropsWithChildren;

export const ModalWrapper = ({ isOpen, onCloseAction, children }: ModalWrapperProps) => {
  return (
    <ModalPageWindow isOpen={isOpen}>
      <div className={s.modalWrapper}>
        <div onClick={onCloseAction} className={s.closeBtn}>
          <Icon path={mdiClose} size="36px"/>
        </div>
        {children}
      </div>
    </ModalPageWindow>
  );
};