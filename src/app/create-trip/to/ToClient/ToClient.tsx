'use client'

import { redirect } from "next/navigation";
import { useCreateTripStore } from '@/store/createTripStore';

import {LocationSelection} from "@/components/shared/createTrip/LocationSelection";

export const ToClient = () => {
  const { cityTo: city, streetTo: street, buildingTo: building, cityFrom } = useCreateTripStore();
  // const router = useRouter();

  if (!cityFrom) {
    redirect('/create-trip/from');
  }

  return <LocationSelection mode="to" city={city} street={street} building={building} />
};