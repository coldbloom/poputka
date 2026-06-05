import cn from "classnames";
import s from './Tab.module.scss';
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

const ChevronIcon = ({ isLarge }: { isLarge?: boolean }) => <Icon path={mdiChevronRight} size={ isLarge ? 1.2 : 1} className={s.chevronIcon} />;

export type TabProps = {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
  chevronIconLarge?: boolean;
};

export const Tab = ({ text, icon, onClick, chevronIconLarge = true }: TabProps) => {
  return (
    <div className={cn(s.row, s.tabWrapper)} onClick={onClick}>
      <div className={s.row}>
        {icon}
        <span>{text}</span>
      </div>
      <ChevronIcon isLarge={chevronIconLarge}/>
    </div>
  );
}