'use client'

import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "@mdi/react";

import { CSSProperties } from 'react';
import { useRouter } from "next/navigation";
import s from './GoBackBtn.module.scss';

type GoBackBtnProps = {
  onClickAction?: () => void;
  style?: CSSProperties;
};

export const GoBackBtn = ({ onClickAction, style }: GoBackBtnProps) => {
  const { back } = useRouter();

  return (
    <div onClick={onClickAction || back} className={s.goBackWrapper} tabIndex={0} style={style}>
      <Icon path={mdiArrowLeftCircle} size="36px" />
    </div>
  );
};