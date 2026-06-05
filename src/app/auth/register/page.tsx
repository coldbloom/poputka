import { mdiEmailOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { AuthButton, GoogleAuthButton, AuthSeparator } from '@/components/shared/auth'
import Link from 'next/link';

export default function Register() {
  console.log(
    '1) page register работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );
  return (
    <>
      <Link href="/auth/register/email">
        <AuthButton variant="local">
          <Icon path={mdiEmailOutline} size="24px" style={{ marginRight: "4px" }} />
          Email и пароль
        </AuthButton>
      </Link>
      <AuthSeparator />
      <GoogleAuthButton />
    </>
  );
}