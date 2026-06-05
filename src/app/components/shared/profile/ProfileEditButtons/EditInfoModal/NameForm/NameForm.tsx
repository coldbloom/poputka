'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { useUserInfoStore } from "@/store/userInfoStore";
import { authApiClient } from "@/utils/services/apiClient";
import { Input } from "@/components/kit/Input";
import { Button } from "@/components/kit/Button";

type NameFormProps = {
  onCloseAction: () => void;
};

type TForm = {
  name: string,
};

export const NameForm = ({ onCloseAction }: NameFormProps) => {
  const { userInfo, updateUserInfo } = useUserInfoStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: { name: userInfo?.name },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    const { name } = data;

    if (name !== userInfo?.name) {
      try {
        const res = await authApiClient.poster('user-info/edit', { name });
        if (res.message) {
          updateUserInfo('name', name as string)
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
      <h1 className="profile-heading">Введите ваше имя</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Имя"
          errorText={errors.name?.message}
          autoFocus={true}
          {...register('name', {
            required: 'Имя обязательно'
          })}
        />
        <Button type="submit" style={{ width: '100%', margin: 0 }}>Изменить</Button>
      </form>
    </>
  );
};
