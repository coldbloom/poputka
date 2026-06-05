'use client'

import { useCreateTripStore } from '@/store/createTripStore';

import { LocationSelection } from "@/components/shared/createTrip/LocationSelection";

export const FromClient = () => {
  const { cityFrom: city, streetFrom: street, buildingFrom: building } = useCreateTripStore();

  return <LocationSelection mode="from" city={city} street={street} building={building} />
};