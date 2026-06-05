import classNames from 'classnames';
import { CSSProperties, forwardRef, PropsWithChildren } from 'react';

import s from './Avatar.module.scss';

type Color = 'purple' | 'teal' | 'indigo' | 'green' | 'pink' | 'orange' | 'brown' | 'bluegray';
export const colors: Color[] = ['purple', 'teal', 'indigo', 'green', 'pink', 'orange', 'brown', 'bluegray'];
import Image from "next/image";

export const useColorByUsername = (username: string): string => {
  const charCodeSum = username.split('').reduce((sum, letter) => sum + letter.charCodeAt(0), 0);

  return colors[charCodeSum % colors.length];
};


export interface AvatarBaseProps {
  /**
   * @default 'm'
   */
  size?: 's' | 'm' | 'l' | 'xxl' | 'xxxl';
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children: string;
  avatarPath?: string | null;
}

export const Avatar = forwardRef<HTMLDivElement, PropsWithChildren<AvatarBaseProps>>(
  ({ children, size = 'm', disabled = false, className, style, avatarPath }, ref) => {
    const initials = children.slice(0,1).toUpperCase();
    const color = children ? useColorByUsername(children) : 'purple';
    const url = avatarPath ? `${process.env.NEXT_PUBLIC_API_URL}/${avatarPath}` : '';
    return (
      <div ref={ref} className={classNames(s.avatar, s[size], s[color], { [s.disabled]: disabled }, className)} style={style}>
        {url ? (
          <Image src={url} layout="fill" alt="аватвр" />
        ) : initials}
      </div>
    );
  }
);
