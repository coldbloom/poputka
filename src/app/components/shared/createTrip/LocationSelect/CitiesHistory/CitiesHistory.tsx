import React from 'react';
import { Location, LocationField } from "@/utils/types";
import { OptionField } from '../OptionField';

type CitiesHistoryProps = {
  /**
   * исключаемый из списка истории Location City
   */
  excludedCity?: Location | null;
  fieldName: LocationField;
  handleFormChange: (value: Location, name: LocationField) => void;
};

const filterHistory = (historyList: Location[], excludedCity?: Location | null): Location[] => {
  if (!excludedCity) return historyList;
  return historyList.filter((city: Location) => city.id !== excludedCity.id);
};

export const CitiesHistory = ({ excludedCity, fieldName, handleFormChange }: CitiesHistoryProps) => {
  const history = localStorage.getItem('history');
  const historyList: Location[] = history ? JSON.parse(history) : [];
  const filteredHistory = filterHistory(historyList, excludedCity);
  return (
    <>
      {
        filteredHistory.map((hOption: Location) => (
          <OptionField
            key={hOption.id}
            variant="history"
            option={hOption}
            fieldName={fieldName}
            handleFormChange={handleFormChange}
          />
        ))
      }
    </>
  );
};