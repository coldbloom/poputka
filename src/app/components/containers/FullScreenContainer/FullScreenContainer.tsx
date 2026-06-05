import { PropsWithChildren, FC } from "react";

import cn from "classnames";
import s from './FullScreenContainer.module.scss';
type FullScreenContainerProps = {
  className?: string;
} & PropsWithChildren;

export const FullScreenContainer: FC<FullScreenContainerProps> = ({ children, className }) => {
  return (
    <div className={cn(s.container, className)}>
      {children}
    </div>
  );
};