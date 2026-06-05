'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tab, TabProps } from './Tab';

type LinkTabProps = {
  href: string;
} & TabProps;

export const LinkTab = ({ href, onClick, ...props }: LinkTabProps) => {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault(); // Предотвращаем переход, если уже на этой странице
      onClick?.(); // Закрываем меню
    }
  };
  return (
    <Link href={href} onClick={handleClick}>
      <Tab{...props} />
    </Link>
  )
}