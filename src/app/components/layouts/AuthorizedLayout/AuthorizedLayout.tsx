'use client'

import React, {PropsWithChildren, useEffect} from 'react';
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore';
import { FullScreenLoader } from "@/components/kit/Loader";

export const AuthorizedLayout = ({ children }: PropsWithChildren) => {
  const { isAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuth === false) {
      router.push('/');
    }
  }, [isAuth, router]);

  return isAuth ? children : <FullScreenLoader />;
};