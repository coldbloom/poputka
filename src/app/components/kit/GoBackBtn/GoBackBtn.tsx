'use client'

import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "@mdi/react";

import { CSSProperties } from 'react';
import { useRouter } from "next/navigation";
import s from './GoBackBtn.module.scss';

type GoBackBtnProps = {
  onClick?: () => void;
  style?: CSSProperties;
};

export const GoBackBtn = ({ onClick, style }: GoBackBtnProps) => {
  const { back } = useRouter();

  return (
    <div onClick={onClick || back} className={s.goBackWrapper} tabIndex={0} style={style}>
      <Icon path={mdiArrowLeftCircle} size="36px" />
    </div>
  );
};