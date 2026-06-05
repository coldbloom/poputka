'use client'

import { mdiCalendarMonthOutline, mdiAccountMultipleOutline, mdiMapMarkerRadiusOutline, mdiSwapVertical } from '@mdi/js';
import Icon from '@mdi/react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonInput } from './ButtonInput';
import { Passengers } from './Passengers'
import { ModalPageWindow } from '@/components/kit/ModalPageWindow';
import { DatePicker } from "@/components/kit/DatePicker";

import { LocationSelect } from "@/components/shared/createTrip/LocationSelect";
import { Location, LocationField } from "@/utils/types";

import { useSearchTripStore, CitiesField } from "@/store/searchTripStore";
import { formatDate, formatDateToIso, updateSearchCitiesHistory } from "@/utils/functions";

import cn from 'classnames';
import s from './MainForm.module.scss';

export const MainForm = () => {
  const [activeField, setActiveField] = useState<number | null>(null);
  const [errorFrom, setErrorFrom] = useState(false);
  const [errorTo, setErrorTo] = useState(false);


  const router = useRouter();
  const { cityFrom: from, cityTo: to, date, passengers, swapLocation, updateLocation, updateDate } = useSearchTripStore();

  const swapVisible = !errorTo && !errorFrom && (!!from || !!to);

  const closeModal = (num?: number) => setActiveField(num ?? null);

  const handleLocation = (value: Location, fieldName: LocationField) => {
    //обновляем историю поиска
    updateSearchCitiesHistory(value);
    updateLocation(fieldName as CitiesField, value);
    closeModal();
  }

  const handleDate = (selectedDate: Date) => {
    updateDate(selectedDate);
    closeModal(0);
  }

  const handleSearch = () => {
    if (!from) {
      setErrorFrom(true);
    } else if (!to) {
      setErrorTo(true);
    } else if (from.id === to.id) {
      setErrorTo(true);
    } else {

      // Формируем параметры URL
      const params = new URLSearchParams();
      params.set('from', from.id);
      params.set('to', to.id);
      params.set('date', formatDateToIso(date));
      params.set('fromCity', from.name)
      params.set('toCity', to.name)

      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <>
      <div className={s.wrapper}>
        <ButtonInput
          placeholder="Город отправления"
          iconPath={mdiMapMarkerRadiusOutline}
          onClick={() => setActiveField(1)}
          value={from?.name}
          error={errorFrom}
        />
        <div className={s.swapWrapper}>
          <hr className={cn({[s.hr]: swapVisible})}/>
          {swapVisible && (
            <button onClick={swapLocation}>
              <Icon path={mdiSwapVertical} size="30px" className={s.iconSwap} />
            </button>
          )}
        </div>
        <ButtonInput
          placeholder="Город прибытия"
          iconPath={mdiMapMarkerRadiusOutline}
          onClick={() => setActiveField(2)}
          value={to?.name}
          error={errorTo}
        />
        <hr/>
        <ButtonInput
          iconPath={mdiCalendarMonthOutline}
          onClick={() => setActiveField(3)}
          value={formatDate(date)}
        />
        <hr/>
        <ButtonInput
          iconPath={mdiAccountMultipleOutline}
          className={s.marginBottom}
          onClick={() => setActiveField(4)}
          value={passengers}
        />
        <button className={s.searchButton} onClick={handleSearch}>Поиск</button>
      </div>
      <ModalPageWindow
        isOpen={!!activeField}
        onCloseAction={() => closeModal(0)}
        className={cn(s.borderRadius, {
          [s.smallHeight]: activeField === 3 || activeField === 4 || activeField === 0,
          [s.bigHeight]: activeField === 1 || activeField === 2
        })}
        exitActiveFast={true}
      >
        <div className={s.modalWrapper}>
          {activeField === 1 && (
            <LocationSelect
              fieldName="cityFrom"
              placeholder="Введите город"
              initialValue={from?.name}
              onCloseAction={() => closeModal(0)}
              handleFormChangeAction={handleLocation}
              params={{ location: 'city', limit: 25 }}
              excludedCity={to}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName="cityTo"
              placeholder="Введите город"
              initialValue={to?.name}
              onCloseAction={() => closeModal(0)}
              handleFormChangeAction={handleLocation}
              params={{ location: 'city', limit: 25 }}
              excludedCity={from}
            />
          )}
          {activeField === 3 && (
            <DatePicker
              selectedDate={date}
              onChangeDate={handleDate}
            />
          )}
          {activeField === 4 && <Passengers />}
        </div>
      </ModalPageWindow>
    </>
  );
};