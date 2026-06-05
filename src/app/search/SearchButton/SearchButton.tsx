'use client'

import { mdiMagnify } from '@mdi/js';
import Icon from "@mdi/react";

import React, { useState } from 'react';
import s from './SearchButton.module.scss';
import {ModalPageWindow} from "@/components/kit/ModalPageWindow";

type SearchButtonProps = {
  fromCity?: string;
  toCity?: string;
  date?: string;
  passengers?: string;
}

export const SearchButton = ({ fromCity, toCity, date, passengers }: SearchButtonProps) => {
  if (!fromCity || !toCity || !date || !passengers) return null;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={s.wrapper} onClick={() => setOpen(true)}>
        <Icon path={mdiMagnify} size={1} />
        <div>
          <p>{fromCity} → {toCity}</p>
          <p></p>
        </div>
      </button>
      <ModalPageWindow isOpen={open} onCloseAction={() => setOpen(false)}>
        <div className={s.modalWrapper}>
          <h1>Form</h1>
        </div>
      </ModalPageWindow>
    </>
  );
};