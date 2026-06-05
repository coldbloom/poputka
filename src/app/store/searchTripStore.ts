import { create } from 'zustand';
import { Location } from "@/utils/types";
import { getMoscowDateNow } from "@/utils/functions";

export type CitiesField = 'cityFrom' | 'cityTo';

interface SearchTripStore {
  cityFrom: Location | null;
  cityTo: Location | null;
  date: Date;
  passengers: number;

  // Actions
  updateLocation: (field: CitiesField, location: Location) => void;
  updateDate: (date: Date) => void;
  incrementPassengers: () => void;
  decrementPassengers: () => void;
  swapLocation: () => void;
}

export const useSearchTripStore = create<SearchTripStore>((set, get) => ({
  // State
  cityFrom: null,
  cityTo: null,
  date: getMoscowDateNow(),
  passengers: 1,

  // Actions
  updateLocation: (field, location) => set({ [field]: location }),

  updateDate: (date) => set({ date }),

  incrementPassengers: () => {
    const { passengers } = get();
    if (passengers < 8) {
      set({ passengers: passengers + 1 });
    }
  },

  decrementPassengers: () => {
    const { passengers } = get();
    if (passengers > 1) {
      set({ passengers: passengers - 1 });
    }
  },

  swapLocation: () => {
    const { cityFrom, cityTo } = get();
    set({ cityFrom: cityTo, cityTo: cityFrom });
  }
}));