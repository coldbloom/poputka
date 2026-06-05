'use client'

import { useCallback, useMemo, useState } from 'react';
import s from './LocationSelect.module.scss';
import axios from 'axios';
import useSWR from "swr";
import {InputModal} from './InputModal';
import {Loader} from '@/components/kit/Loader';
import {Plug} from "@/components/kit/Plug";
import {OptionField} from './OptionField';

import {useDebounce} from '@/utils/hooks/useDebounce';
import {Location, LocationField, LocationReqParams} from '@/utils/types';
import { CitiesHistory } from './CitiesHistory';

const getCacheKey = (query: string, params: LocationReqParams) => {
  const { location, limit, region, city, streetId } = params;
  if (!query) return null; // Если запрос пуст, возвращаем null
  return `/api/address?query=${encodeURIComponent(query)}&location=${location}&limit=${limit}` +
    `${region ? `&region=${encodeURIComponent(region)}` : ''}` +
    `${city ? `&city=${encodeURIComponent(city)}` : ''}` +
    `${streetId ? `&streetId=${encodeURIComponent(streetId)}` : ''}`;
};

const createApiParams = (query: string, params: LocationReqParams) => ({
  query,
  limit: params.limit,
  location: params.location,
  ...(params.region && { region: params.region }),
  ...(params.city && { city: params.city }),
  ...(params.streetId && { streetId: params.streetId }),
  ...(params.settlement && { settlement: params.settlement }),
});

type LocationSelectProps = {
  fieldName: LocationField;
  onCloseAction: () => void;
  handleFormChangeAction: (value: Location, name: LocationField) => void;
  initialValue?: string;
  params: LocationReqParams;
  placeholder?: string;
  /**
   * excludedCity город, который уже выбран в качестве города отправления.
   * Этот город не будет доступен для выбора в текущем поле (например, город прибытия).
   */
  excludedCity?: Location | null;
};

export const LocationSelect = ({
  fieldName,
  onCloseAction,
  initialValue,
  handleFormChangeAction,
  params = { location: 'city' },
  placeholder,
  excludedCity
}: LocationSelectProps) => {
  const [value, setValue] = useState(initialValue || '');
  const [inputError, setInputError] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  const onChangeValue = useCallback((newValue: string) => {
    setValue(newValue);

    // Проверка на наличие хотя бы одной буквы латинского алфавита
    const hasLatinLetter = /[a-zA-Z]/.test(newValue);
    setInputError(hasLatinLetter); // Устанавливаем error в true, если есть латинская буква (false, если нет)
  }, []);

  // Generate cache key
  const cacheKey = useMemo(
    () => getCacheKey(debouncedValue, params),
    [debouncedValue, params]
  );

  // Fetch Data with SWR
  const { data, error, isValidating } = useSWR<Location[]>(
    debouncedValue.trim() ? cacheKey : null,
    () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/address`, {
      params: createApiParams(debouncedValue, params),
    }).then(res => res.data)
      .catch(error => {
        throw error.response?.data || error;
      }),
    {
      dedupingInterval: 600000, // Интервал в миллисекундах, через который можно повторно отправить запрос с таким же кэшем
      revalidateOnFocus: false, // Определяет, будет ли запрос автоматически обновляться при переключении вкладки
      shouldRetryOnError: false, // Определяет, нужно ли перезапускать запрос, если он завершился ошибкой
    }
  );

  // Handle Loading State
  const loading = isValidating && !data && !error;

  // Handle Options
  const options = data || [];

  return (
    <div className={s.wrapper}>
      <InputModal name="from" value={value} onChangeAction={onChangeValue} onCloseAction={onCloseAction} isError={inputError} placeholder={placeholder} />
      {loading ? (
        <div className={s.centerWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          {!value && params.location === 'city' ? (
            <div className={s.optionsWrapper}>
              <CitiesHistory fieldName={fieldName} handleFormChange={handleFormChangeAction} excludedCity={excludedCity} />
            </div>
          ) : (
            options?.length > 0 ? (
              <div className={s.optionsWrapper}>
                {options.map((option: Location, index) => (
                  <OptionField
                    key={option.id ?? `${index}-key`}
                    option={option}
                    fieldName={fieldName}
                    handleFormChange={handleFormChangeAction}
                  />
                ))}
              </div>
            ) : (
              debouncedValue !== '' && (
                <div className={s.centerWrapper}>
                  <Plug title="Ничего не найдено : ("
                        text="Попробуйте уточнить название города или проверьте написание запроса"
                  />
                </div>
              )
            )
          )}
        </>
      )}
    </div>
  );
};