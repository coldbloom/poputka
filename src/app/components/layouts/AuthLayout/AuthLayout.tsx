import { FC, PropsWithChildren } from 'react';
import { Heading } from "@/components/kit/Heading/Heading";
import { AuthHeader } from './AuthHeader';
import { LegalNotice } from './LegalNotice';
import s from './AuthLayout.module.scss';
import cn from 'classnames';

type AuthLayoutProps = {
  className?: string;
  title: string;
  description: string;
  variant: "register" | "login";
  withGoBack?: boolean;
} & PropsWithChildren;

export const AuthLayout: FC<AuthLayoutProps> = ({ children, className, title, description, withGoBack }) => {
  return (
    <div className={cn(className, s.wrapper)}>
      <AuthHeader withGoBack={withGoBack} />
      <div className={s.contentWrapper}>
        <div className={s.content}>
          <div className={s.contentContainer}>
            <Heading variant="dark">{title}</Heading>
            <p className={s.description}>{description}</p>
            <div className={s.childrenWrapper}>
              {children}
            </div>
          </div>
          <LegalNotice />
        </div>
      </div>
    </div>
  );
};
