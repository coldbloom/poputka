import { PassengerCounter } from '@/components/shared/PassengerCounter'
import { useSearchTripStore } from "@/store/searchTripStore";
import s from './Passengers.module.scss';

export const Passengers = () => {
  const { passengers, incrementPassengers, decrementPassengers } = useSearchTripStore();

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Выберите количество пассажиров</h2>
      <PassengerCounter
        value={passengers}
        increment={() => incrementPassengers()}
        decrement={() => decrementPassengers()}
      />
    </div>
  );
};