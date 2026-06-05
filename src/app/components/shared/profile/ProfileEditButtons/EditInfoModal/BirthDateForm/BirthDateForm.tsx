'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { useUserInfoStore } from "@/store/userInfoStore";
import { authApiClient } from "@/utils/services/apiClient";
import { Input } from "@/components/kit/Input";
import { Button } from "@/components/kit/Button";
import { ChangeEvent } from "react";

type TForm = {
  birthDate: string;
}

type BirthDateFormProps = {
  onCloseAction: () => void;
}

export const BirthDateForm = ({ onCloseAction }: BirthDateFormProps) => {
  const { userInfo, updateUserInfo } = useUserInfoStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: { birthDate: userInfo?.birthDate || '' },
    mode: "onTouched",
  });

  const currentValues = watch();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (input.length > 0) {
      formatted = input.substring(0, 2);
    }
    if (input.length > 2) {
      formatted += '/' + input.substring(2, 4);
    }
    if (input.length > 4) {
      formatted += '/' + input.substring(4, 8);
    }

    setValue('birthDate', formatted, { shouldValidate: true });
  };

  const validateDate = (value: string) => {
    if (!value) return 'Введите дату рождения';

    // Проверяем формат даты
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return 'Используйте формат ДД/ММ/ГГГГ';
    }

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    // Проверяем, что дата валидна
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      return 'Некорректная дата';
    }

    // Проверяем, что дата не в будущем
    if (date > today) {
      return 'Дата не может быть в будущем';
    }

    // Проверяем возраст (например, минимум 14 лет)
    const minAge = 14;
    const maxAge = 100;
    const yearDiff = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    const age = yearDiff - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0);

    if (age < minAge) {
      return `Минимальный возраст: ${minAge} лет`;
    }

    if (age > maxAge) {
      return `Максимальный возраст: ${maxAge} лет`;
    }

    return true;
  };

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (data.birthDate !== userInfo?.birthDate) {
      try {
        const res = await authApiClient.poster('user-info/edit', { birthDate: data.birthDate });
        if (res.message) {
          updateUserInfo('birthDate', data.birthDate);
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
      <h1 className="profile-heading">Введите дату рождения</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="ДД/ММ/ГГГГ"
          errorText={errors.birthDate?.message}
          autoFocus={true}
          {...register('birthDate', {
            validate: validateDate
          })}
          value={currentValues.birthDate}
          onChange={handleDateChange}
          maxLength={10} // ДД/ММ/ГГГГ = 10 символов
        />
        <Button type="submit" style={{ width: '100%', margin: 0 }} disabled={!!errors.birthDate}>Изменить</Button>
      </form>
    </>
  );
};