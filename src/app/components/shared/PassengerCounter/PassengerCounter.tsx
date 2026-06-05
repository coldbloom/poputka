import { mdiMinusCircleOutline, mdiPlusCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";

import s from './PassengerCounter.module.scss';
import cn from "classnames";

type PassengerCounterProps = {
  increment: () => void;
  decrement: () => void;
  value: number;
  className?: string;
  style?: React.CSSProperties;
};

export const PassengerCounter = ({
  value,
  increment,
  decrement,
  className,
  style
}: PassengerCounterProps) => {
  return (
    <div className={cn(s.counterWrapper, className)} style={style}>
      <button onClick={decrement} disabled={value === 1}>
        <Icon path={mdiMinusCircleOutline} size="48px" className={cn(s.icon, {[s.disabled]: value === 1})}/>
      </button>
      <p>{value}</p>
      <button onClick={increment} disabled={value === 8}>
        <Icon path={mdiPlusCircleOutline} size="48px" className={cn(s.icon, {[s.disabled]: value === 8})}/>
      </button>
    </div>
  );
};