export type Location = {
  id: string; // postal code
  type: string;
  name: string;
  parents?: string;
  //# параметры для города #//
  region?: string;
  city?: string;
  cityTypeFull?: string;
  settlement?: string;
  settlementTypeFull?: string;
  //# параметры для улицы #//
  streetId?: string;
};

export type LocationTypes = 'city' | 'street' | 'house';

export type LocationReqParams = {
  query?: string;
  location?: LocationTypes;
  limit?: number;
  region?: string;
  city?: string;
  streetId?: string;
  settlement?: string;
};

export type LocationField =
  | 'cityFrom'
  | 'streetFrom'
  | 'buildingFrom'
  | 'cityTo'
  | 'streetTo'
  | 'buildingTo';

/** Данные о поездке*/
export type TripData = {
  locationFrom: {
    city: Location;
    street: Location | null;
    building: Location | null;
  };
  locationTo: {
    city: Location;
    street: Location | null;
    building: Location | null;
  };
  dateTime: string;
  passengers: number;
  price: string;
  duration: string;
  distance: number;
  description: string | null;
};

export type RouteDetails = {
  duration: number;
  distance: number;
};

type User = {
  id: number;
  name: string;
  avatarPath: string | null;
}

export type Trip = {
  id: number;
  price: string;
  status: string;
  availableSeats: number;
  dateTime: string;
  distance: number;
  duration: string;
  fromCityId: number;
  fromCityName: string;
  fromStreetName: string | null;
  fromStreetType: string | null
  fromBuildingName: string | null;
  fromBuildingType: string | null
  toCityId: number;
  toCityName: string;
  toStreetName: string | null;
  toStreetType: string | null;
  toBuildingName: string | null;
  toBuildingType: string | null;
  user: User;
};