'use client'

import { useState } from 'react';
import { useCreateTripStore } from '@/store/createTripStore';
import { ModalPageWindow } from "@/components/kit/ModalPageWindow";
import { LocationSelect } from "@/components/shared/createTrip/LocationSelect";
import { LocationCreateForm } from "@/components/shared/createTrip/LocationCreateForm";
import { Location, LocationField } from '@/utils/types';
import { updateSearchCitiesHistory } from '@/utils/functions';

type LocationSelectionProps = {
  /** Режим работы: город отправления или назначения */
  mode: "from" | "to";
  city: Location | null;
  street: Location | null;
  building: Location | null;
}

export const LocationSelection = ({
  mode,
  city,
  street,
  building
}: LocationSelectionProps) => {
  const [activeField, setActiveField] = useState<number | null>(null);
  const { updateLocation, cityFrom } = useCreateTripStore();

  const closeModal = () => setActiveField(null);

  // Определяем префиксы полей в зависимости от режима
  const fieldPrefix = mode === "from" ? "From" : "To";

  const isArrivalCityError = city?.id === cityFrom?.id;

  // Создаем объект с именами полей
  const fieldNames = {
    city: `city${fieldPrefix}` as LocationField,
    street: `street${fieldPrefix}` as LocationField,
    building: `building${fieldPrefix}` as LocationField
  };

  const excludedCity = mode === "to" ? cityFrom : null;

  const handleLocation = (value: Location, fieldName: LocationField) => {
    if (['cityFrom', 'cityTo'].includes(fieldName)) {
      //обновляем историю поиска в localStorage (history)
      updateSearchCitiesHistory(value);
    }
    updateLocation(value, fieldName);
    closeModal();
  };

  return (
    <>
      <LocationCreateForm
        mode={mode}
        city={city}
        street={street}
        building={building}
        setActiveFieldAction={setActiveField}
        {...(mode === "to" && { arrivalCityError: isArrivalCityError})}
      />
      <ModalPageWindow isOpen={!!activeField}>
        <div style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
          {activeField === 1 && (
            <LocationSelect
              fieldName={fieldNames["city"]}
              placeholder="Введите город"
              initialValue={city?.name}
              onCloseAction={closeModal}
              handleFormChangeAction={handleLocation}
              params={{ location: 'city', limit: 15 }}
              excludedCity={excludedCity}
            />
          )}
          {activeField === 2 && (
            <LocationSelect
              fieldName={fieldNames["street"]}
              placeholder="Введите улицу"
              initialValue={street?.name}
              onCloseAction={closeModal}
              handleFormChangeAction={handleLocation}
              params={{
                location: 'street',
                limit: 50,
                region: city?.region,
                city: city?.city,
                settlement: city?.settlement
              }}
            />
          )}
          {activeField === 3 && (
            <LocationSelect
              fieldName={fieldNames["building"]}
              placeholder="Введите дом"
              initialValue={building?.name}
              onCloseAction={closeModal}
              handleFormChangeAction={handleLocation}
              params={{ location: 'house', limit: 15, streetId: street?.id }}
            />
          )}
        </div>
      </ModalPageWindow>
    </>
  );
};