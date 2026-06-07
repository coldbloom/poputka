import { mdiEmailOutline } from "@mdi/js";
import Icon from "@mdi/react";

import Link from 'next/link';
import { AuthButton, GoogleAuthButton, AuthSeparator } from '@/components/shared/auth'

export default function Login() {
  console.log(
    '1) Page login работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );
  return (
    <>
      <Link href="/auth/login/email">
        <AuthButton variant="local">
          <Icon path={mdiEmailOutline} size="24px" style={{marginRight: "4px"}} />
          Email и пароль
        </AuthButton>
      </Link>
      <AuthSeparator />
      <GoogleAuthButton />
    </>
  );
}