import React from 'react';
import { Label } from '@/components/kit/Label';

import cn from 'classnames';
import s from './TripInfo.module.scss';

type TripInfoProps = {
  variant?: 'departure' | 'arrival';
  date: string;
  time: string;
  city: string;
  streetType: string | null;
  street: string | null;
  buildingType: string | null;
  building: string | null
}

export const TripInfo = ({
  variant = 'departure',
  date,
  time,
  city,
  streetType,
  street,
  building,
}: TripInfoProps) => {
  const address = streetType && street
    ? `${streetType} ${street}${building ? ` ${building}` : ''}`
    : 'по договоренности';

  return (
    <div className={cn(s.wrapper, s[variant])}>
      <div className={s.labelWrapper}>
        <Label style={{ marginBottom: '4px' }}>{date}</Label>
      </div>
      <p className={s.time}>{time}</p>
      <p className="textEndCut">{city}</p>
      <p className={cn(s.street, 'textEndCut')}>{address}</p>
    </div>
  );
};