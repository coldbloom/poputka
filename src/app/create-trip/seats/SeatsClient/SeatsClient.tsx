'use client'

import { PassengerCounter } from "@/components/shared/PassengerCounter";
import { useCreateTripStore } from '@/store/createTripStore';
import { redirect } from "next/navigation";

export const SeatsClient = () => {
  const { updatePassengers, passengers, date } = useCreateTripStore();

  if (!date) {
    redirect('/create-trip/from');
  }

  const increment = () => {
    updatePassengers(passengers + 1);
  }

  const decrement = () => {
    updatePassengers(passengers - 1);
  }

  return (
    <PassengerCounter increment={increment} decrement={decrement} value={passengers} />
  );
};