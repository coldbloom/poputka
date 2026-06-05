import { create } from 'zustand';
import { Location, LocationField, TripData, RouteDetails } from "@/utils/types";
import { secondsToHoursMinutes } from '@/utils/functions';

interface CreateTripStore {
  cityFrom: Location | null;
  streetFrom: Location | null;
  buildingFrom: Location | null;
  cityTo: Location | null;
  streetTo: Location | null;
  buildingTo: Location | null;
  date: Date | null;
  hours: number | null;
  minutes: number | null;
  passengers: number;
  price: string | null;
  duration: string | null;
  distance: number | null;
  description: string;

  // Actions
  updateDescription: (value: string) => void;
  updateDate: (value: Date | null) => void;
  updateHours: (hours: number) => void;
  updateMinutes: (minutes: number) => void;
  updatePassengers: (value: number) => void;
  updatePrice: (value: string) => void;
  getDetails: (details: RouteDetails) => void;
  updateLocation: (location: Location, field: LocationField) => void;
  getRequestData: () => TripData;
}

export const useCreateTripStore = create<CreateTripStore>((set, get) => ({
  // State
  cityFrom: null,
  streetFrom: null,
  buildingFrom: null,
  cityTo: null,
  streetTo: null,
  buildingTo: null,
  date: null,
  hours: null,
  minutes: null,
  passengers: 4,
  price: null,
  duration: null,
  distance: null,
  description: '',

  // Actions
  updateDescription: (value) => set({ description: value }),

  updateDate: (value) => set({ date: value }),

  updateHours: (hours) => set({ hours }),

  updateMinutes: (minutes) => set({ minutes }),

  updatePassengers: (value) => set({ passengers: value }),

  updatePrice: (value) => set({ price: value }),

  getDetails: (details) => {
    const { duration, distance } = details;
    set({
      distance: Math.round(distance / 1000),
      duration: secondsToHoursMinutes(duration)
    });
  },

  updateLocation: (location, field) => {
    const state = get();
    const currentLocation = state[field];

    if (!currentLocation || currentLocation.id !== location.id) {
      // Создаем новый объект состояния
      const newState: Partial<CreateTripStore> = { [field]: location };

      // Сбрасываем зависимые поля
      if (field === 'cityFrom') {
        newState.streetFrom = null;
        newState.buildingFrom = null;
      } else if (field === 'cityTo') {
        newState.streetTo = null;
        newState.buildingTo = null;
      } else if (field === 'streetTo' && state.buildingTo) {
        newState.buildingTo = null;
      } else if (field === 'streetFrom' && state.buildingFrom) {
        newState.buildingFrom = null;
      }

      set(newState);
    }
  },

  getRequestData: () => {
    const state = get();

    if (
      !state.cityFrom ||
      !state.cityTo ||
      !state.date ||
      state.hours === null ||
      state.minutes === null ||
      !state.passengers ||
      !state.price ||
      !state.duration ||
      !state.distance) {
      throw new Error("Пожалуйста, заполните все поля перед публикацией.");
    }

    const dateTime = new Date(state.date.getTime());
    dateTime.setHours(state.hours);
    dateTime.setMinutes(state.minutes);
    dateTime.setSeconds(0);

    return {
      locationFrom: {
        city: state.cityFrom,
        street: state.streetFrom ?? null,
        building: state.buildingFrom ?? null,
      },
      locationTo: {
        city: state.cityTo,
        street: state.streetTo ?? null,
        building: state.buildingTo ?? null,
      },
      dateTime: dateTime.toISOString(),
      passengers: state.passengers,
      price: state.price,
      duration: state.duration,
      distance: state.distance,
      description: state.description || null,
    };
  }
}));