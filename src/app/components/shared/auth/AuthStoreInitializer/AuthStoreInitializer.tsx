'use client'

import { useEffect } from 'react';
import { instanceAxios } from "@/utils/services/apiClient";
import inMemoryJWT from "@/utils/services/inMemoryJWT";
import { useAuthStore, useUserInfoStore } from '@/store';

type AuthStoreInitializerProps = {

};

export const AuthStoreInitializer = ({  }: AuthStoreInitializerProps) => {
  const { setUserInfo, userInfo } = useUserInfoStore();

  console.log(userInfo, ' userInfo')

  useEffect(() => {

    //@Fixme убрать консоль
    console.log(' запрос на рефреш с клиента');

    const refreshAuth = async () => {
      try {
        const res = await instanceAxios.post('auth/refresh');
        const { accessToken, accessTokenExpiration, userInfo } = res.data;

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        useAuthStore.setState({ isAuth: true });
        setUserInfo(userInfo);
      } catch (error) {
        inMemoryJWT.deleteToken();
        useAuthStore.setState({ isAuth: false });
      }
    }

    refreshAuth();
  }, []);

  return null;
};