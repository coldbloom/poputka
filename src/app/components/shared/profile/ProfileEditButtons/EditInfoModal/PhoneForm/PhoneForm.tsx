'use client'

import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useUserInfoStore } from "@/store/userInfoStore";
import { authApiClient } from "@/utils/services/apiClient";
import { formatPhone, formatPhoneNumber } from "@/utils/functions";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/kit/Input";
import { Button } from "@/components/kit/Button";
import { ChangeEvent } from "react";
import s from './PhoneForm.module.scss';

type TForm = {
  phone: string,
};

type PhoneFormProps = {
  onCloseAction: () => void;
};

export const PhoneForm = ({ onCloseAction }: PhoneFormProps) => {
  const { userInfo, updateUserInfo } = useUserInfoStore();
  const formatedPhone = formatPhone(userInfo?.phone);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: { phone: formatedPhone || '+7 ' },
    mode: "onTouched",
  });

  const currentValues = watch();

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phone', formatted, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (currentValues.phone !== formatedPhone) {
      const phone = data.phone.replace(/ /g, '');
      try {
        const res = await authApiClient.poster('user-info/edit', { phone });

        if (res.message) {
          updateUserInfo('phone', phone);
          onCloseAction();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      onCloseAction();
    }
  };

  return (
    <>
      <h1 className="profile-heading">Введите номер телефона</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" disabled={!!errors.phone} className={s.button}>Изменить</Button>
      </form>
      <div className={s.infoWrapper}>
        <div>
          <Icon path={mdiInformationOutline} size="16px" />
        </div>
        <p>Ваш номер телефона будет виден другим пользователям и может быть использован для связи с вами</p>
      </div>
    </>
  )
};
