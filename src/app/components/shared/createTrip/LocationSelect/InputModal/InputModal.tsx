'use client'

import {mdiArrowLeft, mdiClose} from "@mdi/js";
import Icon from "@mdi/react";
import { useRef } from "react";
import cn from 'classnames';
import s from './InputModal.module.scss';

type InputModalProps = {
  name: string;
  value: string;
  onChangeAction: (value: string) => void;
  onCloseAction: () => void;
  placeholder?: string;
  isError?: boolean;
}

export const InputModal = ({ name, value, onChangeAction, onCloseAction, placeholder, isError }: InputModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClear = () => {
    onChangeAction('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn(s.fieldWrapper, {[s.error]: isError})}>
      <button onClick={onCloseAction}>
        <Icon path={mdiArrowLeft} size="24px" className={s.icon}/>
      </button>
      <input
        ref={inputRef}
        name={name}
        type="text"
        autoFocus={true}
        value={value}
        onChange={(e) => onChangeAction(e.target.value)}
        placeholder={placeholder}
      />
      {value.length > 0 && (
        <button onClick={handleClear}>
          <Icon path={mdiClose} size="24px" className={s.icon}/>
        </button>
      )}
    </div>
  );
};