'use client'

import { AuthButton } from "@/components/shared/auth";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/authStore'

type GmailData = {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  picture: string;
  sub: string;
};

export const GoogleAuthButton = () => {
  const { handleGoogleSign } = useAuthStore();
  const router = useRouter();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await handleGoogleSign({ token: response.access_token })
          .then(() => {
            localStorage.setItem('lastAuthMethod', 'google');
            router.push('/');
          });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <AuthButton onClick={() => handleGoogleLogin()} variant="google">
      <Image src="/google-g-2015.svg" alt="google" width={24} height={24} style={{margin: "0 6px 0 6px"}}/>
      <span>Вход через аккаунт Google</span>
    </AuthButton>
  );
};