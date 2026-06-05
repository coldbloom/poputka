'use client'

import { mdiHomeSearchOutline, mdiMapMarkerRadiusOutline, mdiMapSearchOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Location } from "@/utils/types";
import { GoBackBtn } from "@/components/kit/GoBackBtn2";
import { Button } from "@/components/kit/Button";

import cn from "classnames";
import {Heading} from "@/components/kit/Heading/Heading";

type LocationCreateFormProps = {
  mode: 'from' | 'to';
  city: Location | null;
  street: Location | null;
  building: Location | null;
  setActiveFieldAction: Dispatch<SetStateAction<number | null>>
  arrivalCityError?: boolean; // ошибка в случае если город отправления совпадает с городом прибытия
};

export const LocationCreateForm = ({ mode, city, street, building, setActiveFieldAction, arrivalCityError }: LocationCreateFormProps) => {
  const [streetError, setStreetError] = useState(false);
  const [buildingError, setBuildingError] = useState(false);

  const isFromMode = mode === 'from';

  const handleStreet = () => {
    if (!city) {
      setStreetError(true);
    } else {
      setActiveFieldAction(2);
    }
  };

  const handleBuilding = () => {
    if (!street) {
      setBuildingError(true)
    } else {
      setActiveFieldAction(3);
    }
  };

  useEffect(() => {
    streetError && setStreetError(false);
    buildingError && setBuildingError(false);
  }, [city, street]);

  return (
    <>
      <div className="form-wrapper">
        <GoBackBtn href={isFromMode ? '/' : '/create-trip/from'} />
        <Heading variant="dark">{isFromMode ? 'Откуда вы выезжаете?' : 'Куда вы едете?'}</Heading>
        <Button
          variant="input"
          onClick={() => setActiveFieldAction(1)}
          error={arrivalCityError}
          errorText="Город прибытия совпадает с городом отправления! Выберетие другой город прибытия."
          iconLeft={<Icon path={mdiMapMarkerRadiusOutline} size="24px"/>}
        >
          {city && <span>{city?.type}.&nbsp;</span>}
          <span className={cn({'color-theme-one': city})}>
            {city?.name ?? (isFromMode ? 'Город отправления' : 'Город прибытия')}
          </span>
        </Button>
        <Button
          variant="input"
          onClick={handleStreet}
          active={!!city}
          error={streetError}
          errorText="Укажите город перед выбором улицы!"
          iconLeft={<Icon path={mdiMapSearchOutline} size="24px"/>}
        >
          {street && <span>{street?.type}.&nbsp;</span>}
          <span className={cn({'color-theme-one': street})}>{street?.name ?? 'Улица'}</span>
        </Button>
        <Button
          variant="input"
          onClick={handleBuilding}
          active={!!street}
          error={buildingError}
          errorText="Укажите улицу перед выбором дома!"
          iconLeft={<Icon path={mdiHomeSearchOutline} size="24px"/>}
        >
          {building && <span>{building?.type}.&nbsp;</span>}
          <span className={cn({'color-theme-one': building})}>{building?.name ?? 'Дом'}</span>
        </Button>
      </div>
      <Button
        variant="continue"
        href={isFromMode ? '/create-trip/to' : '/create-trip/date-time'}
        disabled={!city || arrivalCityError}
      >
        Далее
      </Button>
    </>
  );
};