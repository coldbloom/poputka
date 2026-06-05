import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

import Link from "next/link";
import { GoBackBtn } from "@/components/kit/GoBackBtn";
import s from './AuthHeader.module.scss';
import cn from 'classnames';

type AuthHeaderProps = {
  withGoBack?: boolean;
};

export const AuthHeader = ({ withGoBack }: AuthHeaderProps) => {
  return (
    <header className={cn(s.headerWrapper, { [s.spaceBetween]: withGoBack })}>
      {withGoBack && <GoBackBtn style={{ marginTop: 0 }} />}
      <Link href="/">
        <button className={s.closeBtn}>
          <Icon path={mdiClose} size="32px"/>
        </button>
      </Link>
    </header>
  );
};