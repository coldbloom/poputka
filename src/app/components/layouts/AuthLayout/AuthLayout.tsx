import { FC, PropsWithChildren } from 'react';

import { Heading } from "@/components/kit/Heading/Heading";
import { GoogleOAuthProviderWrapper } from '@/components/shared/auth/GoogleOAuthProviderWrapper';
import { AuthHeader } from './AuthHeader';
import { AuthFooter } from './AuthFooter';

import s from './AuthLayout.module.scss';
import cn from 'classnames';

type AuthLayoutProps = {
  className?: string,
  title: string,
  description: string,
  variant: "register" | "login",
  withGoBack?: boolean,
} & PropsWithChildren

export const AuthLayout: FC<AuthLayoutProps> = ({ children, className, title, description, variant, withGoBack }) => {
  return (
    <div className={cn(className, s.wrapper)}>
      <AuthHeader withGoBack={withGoBack} />
      <div className={s.contentWrapper}>
        <div className={s.content}>
          <Heading variant="dark">{title}</Heading>
          <p>{description}</p>
          <div className={s.childrenWrapper}>
            <GoogleOAuthProviderWrapper>{children}</GoogleOAuthProviderWrapper>
          </div>
        </div>

        <AuthFooter variant={variant} />
      </div>
    </div>
  );
};