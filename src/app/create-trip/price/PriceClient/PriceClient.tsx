'use client'

import { mdiInformationOutline } from "@mdi/js";
import Icon from '@mdi/react';

import { ChangeEvent, KeyboardEvent, useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/kit/Input';
import { Label } from '@/components/kit/Label';
import { Button } from '@/components/kit/Button';
import { Loader } from '@/components/kit/Loader';
import { AnimatedRouteCities } from './AnimatedRouteCities';

import { Location, RouteDetails } from "@/utils/types";
import { useCreateTripStore } from '@/store/createTripStore';
import { authApiClient } from "@/utils/services/apiClient";
import { useRecommendedPrice } from "@/utils/hooks/useRecommendedPrice";
import { redirect } from "next/navigation";
import useSWR from "swr";

import cn from 'classnames';
import s from './PriceClient.module.scss';

// Constants
const MAX_PRICE = 100000;
const MIN_PRICE = 0;

const PRICE_ERROR_TEXT = {
  empty: "Введите цену за место",
  lowPrice: "Цена слишком мала"
}

const getAddress = (city: Location | null, street: Location | null, building: Location | null) => {
  const joinNonEmptyStrings = (arr: (string | undefined)[]): string => {
    return arr.filter(part => part).join('+');
  }

  return [
    joinNonEmptyStrings([city?.parents, city?.cityTypeFull, city?.settlementTypeFull, city?.name]),
    joinNonEmptyStrings([street?.type, street?.name]),
    joinNonEmptyStrings([building?.type, building?.name])
  ]
    .filter(part => part && part.trim() !== '') // Filter out empty strings
    .join('+')
    .replace(/\s+/g, '+') // Replace spaces with plus signs
    .replace(/,/g, '')
};

export const PriceClient = () => {
  const [priceError, setPriceError] = useState<string | null>(null);
  const {
    cityFrom,
    streetFrom,
    buildingFrom,
    cityTo,
    streetTo,
    buildingTo,
    price,
    distance,
    duration,
    updatePrice,
    getDetails,
  } = useCreateTripStore();

  if (!cityFrom) {
    redirect('/create-trip/from');
  }

  // Генерация параметров запроса
  const from = useMemo(() =>
      getAddress(cityFrom, streetFrom, buildingFrom),
    [cityFrom, streetFrom, buildingFrom]
  );
  const to = useMemo(() =>
      getAddress(cityTo, streetTo, buildingTo),
    [cityTo, streetTo, buildingTo]
  );

  const { data: routeDetails, error, isLoading } = useSWR<RouteDetails>(
    // Ключ запроса (зависит от from и to)
    from && to ? ["routeDetails", from, to] : null,
    // Функция для выполнения запроса
    async ([, from, to]) => {
      // Первый элемент игнорируется, берём только from и to. Первый элемент игнорируется, берём только from и to
      const res = await authApiClient.fetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/route-detail`, {
        params: { from, to }
      });
      return res;
    },
    {
      // Опции SWR
      revalidateOnFocus: false, // Отключаем повторный запрос при фокусе
      revalidateOnReconnect: false, // Отключаем повторный запрос при восстановлении сети
      shouldRetryOnError: false, // Отключаем повторный запрос при ошибке
      revalidateIfStale: false, // Отключаем фоновое обновление
    }
  );

  //* Price recommendation hook *//
  const recommendedPrice = useRecommendedPrice(
    routeDetails,
    !price ? (calculatedPrice) => updatePrice(calculatedPrice) : undefined,
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Проверяем, что значение не отрицательное и не более 100000
    if (Number(value) >= MIN_PRICE && Number(value) < MAX_PRICE || value === '') {
      updatePrice(value);

      if (Number(value) < 100) {
        setPriceError(PRICE_ERROR_TEXT.lowPrice);
      } else if (priceError === PRICE_ERROR_TEXT.lowPrice) {
        setPriceError(null);
      }
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Блокируем ввод символов "-", "e", "E"
    if (event.key === '-' || event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };

  const onClear = () => updatePrice('');

  useEffect(() => {
    if (!price) {
      setPriceError(PRICE_ERROR_TEXT.empty)
    } else if (priceError && priceError !== PRICE_ERROR_TEXT.lowPrice) {
      setPriceError(null);
    }
  }, [price]);

  // записываем значения distance и duration в хранилище
  useEffect(() => {
    if (routeDetails) {
      getDetails(routeDetails);
    }
  }, [routeDetails]);

  // if (isLoading) {
  //   return (
  //     <div className={s.loaderWrapper}>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="form-wrapper" style={{ flex: 1}}>
        {isLoading ? (
          <div className={s.loaderWrapper}>
            <Loader />
          </div>
        ) : error ? (
          <div>
            <p>Упс, сервер не отвечает : (</p>
            <p>Проверьте подключение к сети</p>
          </div>
        ) : (
          <>
            <div className={s.contentWrapper}>
              <AnimatedRouteCities from={cityFrom?.name} to={cityTo?.name}/>
              <div className={s.currencyWrapper}>
                <Input
                  type="number"
                  step="1"
                  inputMode="numeric"
                  isLabel={false}
                  value={price || ''}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  handleClear={onClear}
                  className={cn(s.inputPrice, { [s.pr]: !price || price.length === 0 })}
                  classNameWrapper={s.inputWrapper}
                  min="0"
                  errorText={priceError ?? undefined}
                />
                <div className={s.empty} />
                <span className={s.currency}>₽</span>
              </div>
            </div>
            {recommendedPrice && (
              <Label
                color="green"
                className={cn(s.label, s.first)}
                size="m"
              >
                Рекомендуемая цена: {recommendedPrice.min} ₽ - {recommendedPrice.max} ₽
              </Label>
            )}
            {routeDetails && (
              <>
                <Label color="grey" className={s.label}>Расстояние: {distance} км</Label>
                <Label color="grey" className={s.label}>Время в пути: {duration}</Label>
              </>
            )}
          </>
        )}
      </div>

      <div className={s.bottomWrapper}>
        <div className={s.infoWrapper}>
          <div>
            <Icon path={mdiInformationOutline} size="16px"/>
          </div>
          <p>Редактирование цены за место после публикации объявления невозможно</p>
        </div>
        <Button variant="continue" disabled={!!priceError || isLoading} href="description">Далее</Button>
      </div>
    </>
  );
};