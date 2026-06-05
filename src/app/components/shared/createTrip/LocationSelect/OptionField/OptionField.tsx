import { mdiChevronRight, mdiHistory } from "@mdi/js";
import Icon from "@mdi/react";

import s from './OptioField.module.scss';
import cn from 'classnames';

import { Location, LocationField } from "@/utils/types";

type OptionFieldProps = {
  option: Location;
  fieldName: LocationField;
  handleFormChange: (value: Location, name: LocationField) => void;
  variant?: 'primary' | 'history';
}

export const OptionField = ({ variant = 'primary', option, fieldName, handleFormChange }: OptionFieldProps) => {
  return (
    <div className={s.optionWrapper} key={option.id} onClick={() => handleFormChange(option, fieldName)}>
      {variant === 'history' && <Icon path={mdiHistory} size="24px" className={cn(s.historyIcon, s.icon)} />}
      <div className={s.citiesWrapper}>
        <div className={s.row}>
          <p className={s.type}>{option.type}</p>
          <p className={s.city}>&nbsp;{option.name}</p>
        </div>
        <p className={s.parent}>{option.parents}</p>
      </div>
      <Icon path={mdiChevronRight} size="24px" className={cn(s.chevronIcon, s.icon)} />
    </div>
  )
};