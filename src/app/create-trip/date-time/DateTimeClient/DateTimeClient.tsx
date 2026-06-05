'use client'

import { mdiCalendarMonthOutline, mdiClockTimeFourOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { useEffect, useMemo, useState } from 'react';
import { redirect } from "next/navigation";
import { IosPickerItem } from './IosPickerItem';
import { Button } from "@/components/kit/Button";
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { DatePicker } from "@/components/kit/DatePicker";
import { formatDate } from "@/utils/functions";
import { useCreateTripStore } from '@/store/createTripStore';

import cn from 'classnames';
import s from './DateTimeClient.module.scss'

const FIELDS = {
  DATE: 1,
  TIME: 2,
};

export const DateTimeClient = () => {
  const [activeField, setActiveField] = useState<number | null>(null)
  const [isError, setIsError] = useState<boolean>(false);
  const { date, hours, minutes, cityTo, updateHours, updateMinutes, updateDate } = useCreateTripStore();

  if (!cityTo) {
    redirect('/create-trip/from');
  }

  const [defaultHours, setDefaultHours] = useState<number>(10);
  const [defaultMinutes, setDefaultMinutes] = useState<number>(0);

  const formattedDate = useMemo(() => {
    return date ? formatDate(date) : null;
  }, [date]);

  const time = useMemo(() => {
    if (hours !== null && minutes !== null) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  }, [hours, minutes]);


  const closeModal = () => setActiveField(null);

  const handleTimeChange = (value: number, type: 'hours' | 'minutes') => {
    if (type === 'hours') {
      updateHours(value);
    } else {
      updateMinutes(value);
    }
  };

  const onChangeDate = (selectedDate: Date) => {
    updateDate(selectedDate);
    closeModal();
  };

  useEffect(() => {
    if (activeField === null && hours !== null && minutes !== null) {
      setDefaultHours(hours);
      setDefaultMinutes(minutes);
    } else if (activeField === 2 && hours === null && minutes === null) {
      updateHours(defaultHours);
      updateMinutes(defaultMinutes);
    }
  }, [activeField, hours, minutes]);

  useEffect(() => {
    if (formattedDate === 'Сегодня') {
      // Получаем текущее время
      const now = new Date();

      if (hours === null && minutes === null) {
        // Случай 1: Сегодня, время не выбрано - устанавливаем дефолтное время
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        if (currentHour < 23) {
          // Если сейчас не 23 часа, устанавливаем время на час вперед (но не раньше 10:00)
          setDefaultHours(Math.max(10, currentHour + 1));
          setDefaultMinutes(0); // Сбрасываем минуты на 0 для ровного часа
        } else {
          // Если уже 23 часа, устанавливаем текущее время
          setDefaultHours(currentHour);
          setDefaultMinutes(currentMinute);
        }
      } else if (hours !== null && minutes !== null) {
        // Случай 2: Сегодня, время выбрано - проверяем, не в прошлом ли оно
        const selectedDateTime = new Date(now);
        selectedDateTime.setHours(hours, minutes, 0, 0);
        setIsError(selectedDateTime < now);
      }
    } else if (isError) {
      // Случай 3: Не сегодня, но ошибка установлена - сбрасываем ошибку
      setIsError(false);
    }
  }, [formattedDate, hours, minutes, isError]);

  return (
    <>
      <div className="form-wrapper" style={{ flex: 1 }}>
        <Button
          variant="input"
          onClick={() => setActiveField(FIELDS.DATE)}
          iconLeft={<Icon path={mdiCalendarMonthOutline} size="24px"/>}
          className={cn({'color-theme-one': date})}
        >
          {!date ? 'Дата' : formattedDate}
        </Button>
        <Button
          variant="input"
          onClick={() => setActiveField(FIELDS.TIME)}
          className={cn({'color-theme-one': time})}
          iconLeft={<Icon path={mdiClockTimeFourOutline} size="24px"/>}
          error={isError}
          errorText="Время выезда не может быть меньше текущего"
        >
          {time ?? 'Время'}
        </Button>
      </div>
      <Button variant="continue" href="/create-trip/seats" disabled={!date || !time || isError}>Далее</Button>

      <ModalPageWindow
        isOpen={!!activeField}
        onCloseAction={() => closeModal()}
        style={{ height: '380px' }}
        exitActiveFast={true}
        className={s.borderRadius}
      >
        <div className={s.modalWrapper}>
          {activeField === FIELDS.DATE && (
            <DatePicker
              selectedDate={date}
              onChangeDate={(newDate) => onChangeDate(newDate)}
            />
          )}
          {activeField === FIELDS.TIME && (
            <div className={s.embla}>
              <IosPickerItem
                slideCount={24}
                perspective="left"
                loop={true}
                label="час"
                defaultValue={defaultHours}
                onValueChangeAction={value => handleTimeChange(value, 'hours')}
              />
              <IosPickerItem
                slideCount={60}
                perspective="right"
                loop={true}
                label="мин"
                defaultValue={defaultMinutes}
                onValueChangeAction={value => handleTimeChange(value, 'minutes')}
              />
            </div>
          )}
        </div>
      </ModalPageWindow>
    </>
  );
};