import Link from 'next/link';
import { Trip } from '@/utils/types';
import { TripInfo } from './TripInfo';
import { Avatar } from "@/components/kit/Avatar";

import cn from 'classnames';
import s from './TripCard.module.scss';

type TripCardProps = Trip;

// Функция для форматирования даты в формат "16 июл, ср"
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const months = [
    'янв', 'фев', 'мар', 'апр', 'май', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
  ];

  const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const weekDay = weekDays[date.getDay()];

  return `${day} ${month}, ${weekDay}`;
};

// Функция для форматирования времени в формат "10:00"
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Функция для парсинга длительности поездки
const parseDuration = (duration: string): { hours: number; minutes: number } => {
  const hoursMatch = duration.match(/(\d+)\s*ч/);
  const minutesMatch = duration.match(/(\d+)\s*мин/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  return { hours, minutes };
};

// Функция для расчета времени прибытия
const calculateArrivalTime = (departureTime: string, duration: string): string => {
  const departure = new Date(departureTime);
  const { hours, minutes } = parseDuration(duration);

  const arrival = new Date(departure.getTime() + (hours * 60 + minutes) * 60 * 1000);

  const arrivalHours = arrival.getHours().toString().padStart(2, '0');
  const arrivalMinutes = arrival.getMinutes().toString().padStart(2, '0');

  return `${arrivalHours}:${arrivalMinutes}`;
};

export const TripCard = ({
  id,
  price,
  status,
  availableSeats,
  dateTime,
  distance,
  duration,
  fromCityId,
  toCityId,
  fromCityName,
  toCityName,
  fromStreetName,
  fromStreetType,
  fromBuildingName,
  fromBuildingType,
  toStreetName,
  toStreetType,
  toBuildingName,
  toBuildingType,
  user
}: TripCardProps) => {
  const formattedDate = formatDate(dateTime);
  const departureTime = formatTime(dateTime);
  const arrivalTime = calculateArrivalTime(dateTime, duration);

  const { avatarPath, name } = user;

  return (
    <Link href={`/trip/${id}`}>
      <div className={s.wrapper}>
        <div className={s.infoWrapper}>
          <span className={s.dottedLine} />
          <TripInfo
            date={formattedDate}
            time={departureTime}
            city={fromCityName}
            street={fromStreetName}
            streetType={fromStreetType}
            building={fromBuildingName}
            buildingType={fromBuildingType}
          />
          <TripInfo
            variant="arrival"
            date={formattedDate}
            time={arrivalTime}
            city={toCityName}
            street={toStreetName}
            streetType={toStreetType}
            building={toBuildingName}
            buildingType={toBuildingType}
          />
        </div>
        <div className={s.footer}>
          <div className={cn('row', 'items-center')} style={{ gap: '12px' }}>
            <Avatar size="m" avatarPath={avatarPath}>{name}</Avatar>
            <p>{name}</p>
          </div>

          <p className={s.price}>{price} ₽</p>
        </div>
      </div>
    </Link>
  );
};