import Icon from "@mdi/react";
import { mdiMapMarker, mdiMapMarkerOutline } from '@mdi/js';

import s from './AnimatedRouteCities.module.scss';

type AnimatedRouteCitiesProps = {
  from: string | undefined;
  to: string | undefined;
};

export const AnimatedRouteCities = ({ from, to }: AnimatedRouteCitiesProps) => {
  if (!from || !to) return null;

  return (
    <div className={s.wrapper}>
      <div className={s.row}>
        <Icon path={mdiMapMarker} size="16px" className={s.icon} />
        <span>{from}</span>
      </div>
      <div className={s.dashedLine}></div>
      <div className={s.row}>
        <Icon path={mdiMapMarkerOutline} size="16px" className={s.icon} />
        <span>{to}</span>
      </div>
    </div>
  );
};