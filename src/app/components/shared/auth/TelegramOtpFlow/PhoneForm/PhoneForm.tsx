'use client';

import React, {ChangeEvent} from 'react';
import s from './PhoneForm.module.scss';
import Icon from "@mdi/react";
import { mdiPhone } from "@mdi/js";
import {SubmitHandler, useForm} from "react-hook-form";
import { formatPhoneNumber } from "@/utils/functions";
import { Input } from "@/components/kit/Input";
import {Button} from "@/components/kit/Button";

// @TODO может быть layout для страницы
const PhoneFormLayout = ({ children }: React.PropsWithChildren) => (
  <div className={s.stepContent}>
    <div className={s.stepIcon}>
      <Icon path={mdiPhone} size="28px" />
    </div>
    <h2 className={s.stepTitle}>Введите номер телефона</h2>
    <p className={s.stepDesc}>
      Мы отправим 4-значный код в ваш Telegram-бот
    </p>
    {children}
  </div>
);

type TForm = {
  phone: string,
};

export const PhoneForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: { phone: '+7 ' },
    mode: "onSubmit",
    shouldFocusError: false, // <- отключаем
  });

  const currentValues = watch();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted);
  };

  const onSubmit: SubmitHandler<TForm> = async (data) => {

  }

  return (
    <PhoneFormLayout>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
        <Input
          type="tel"
          inputMode="numeric"
          placeholder="+7 *** *** ** **"
          errorText={errors.phone?.message}
          autoFocus={true}
          {...register('phone', {
            required: 'Номер телефона обязателен',
            pattern: {
              value: /^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/,
              message: 'Неверный формат номера телефона'
            },
          })}
          value={currentValues.phone}
          onChange={handlePhoneChange}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
            }
          }}
        />
        <Button type="submit" className={s.submitButton}>Продолжить</Button>
      </form>
    </PhoneFormLayout>
  );
};
