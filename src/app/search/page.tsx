import { TripCard } from './TripCard';
import { Trip } from '@/utils/types';
import { formatDate, getTripString } from '@/utils/functions';

import s from './page.module.scss';

export default async function SearchPage({
 searchParams,
}: {
  searchParams: { from?: string; to?: string; date?: string; passengers?: string; fromCity?: string; toCity?: string; };
}) {
  // Извлекаем параметры из URL
  const { from, to, date, passengers = '1', fromCity, toCity } = searchParams;
  console.log('from = ', from);
  console.log('to = ', to);
  console.log('date = ', date);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/trip/?fromCityId=${from}&toCityId=${to}&date=${date}`;
  const data = await fetch(url);
  const trips: Trip[] = await data.json();
  console.log('trips = ', trips);

  return (
    <div>
      {/*<h1>Поиск поездки</h1>*/}
      <div className={s.tripsWrapper}>
        <div>
          <p className={s.date}>{date && formatDate(new Date(date))}</p>
          <p className={s.direction}>{fromCity} → {toCity}</p>
          <p className={s.tripsCount}>Всего найдено: {getTripString(trips.length)}</p>
        </div>
        {trips.map(trip => (
          <TripCard {...trip} key={trip.id} />
        ))}
      </div>
    </div>
  )
}