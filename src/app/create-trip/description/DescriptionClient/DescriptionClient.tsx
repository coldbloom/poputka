'use client'

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { TextArea } from '@/components/kit/TextArea';
import { Button } from '@/components/kit/Button';
import { useCreateTripStore } from "@/store/createTripStore";

import { TripData } from '@/utils/types';
import { authApiClient } from '@/utils/services/apiClient';

import s from './DescriptionClient.module.scss';

// Массив числительных на русском языке для проверки
const RUSSIAN_NUMBERS = [
  'ноль', 'один', 'два', 'три', 'четыр', 'пят', 'шест', 'сем', 'восем', 'девят',
  'десят', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
  'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать', 'двадцать', 'тридцать',
  'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто', 'сто',
  'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот',
  'девятьсот', 'тысяча', 'миллион', 'миллиард', 'триллион',
  // Добавляем склонения
  'одного', 'двух', 'трех', 'четырех', 'пяти', 'шести', 'семи', 'восьми', 'девяти',
  'десяти', 'одиннадцати', 'двенадцати', 'тринадцати', 'четырнадцати', 'пятнадцати',
  'шестнадцати', 'семнадцати', 'восемнадцати', 'девятнадцати', 'двадцати', 'тридцати',
  'сорока', 'пятидесяти', 'шестидесяти', 'семидесяти', 'восьмидесяти', 'девяноста', 'ста',
  'двухсот', 'трехсот', 'четырехсот', 'пятисот', 'шестисот', 'семисот', 'восьмисот',
  'девятисот', 'тысячи', 'миллиона', 'миллиарда', 'триллиона',
  // Множественное число
  'тысячи', 'миллионы', 'миллиарды', 'триллионы',
  'тысяч', 'миллионов', 'миллиардов', 'триллионов'
];

// Функция валидации текста
const validateText = (text: string): string | false => {
  // Проверка на наличие цифр
  if (/\d/.test(text)) {
    return 'Пожалуйста, не используйте цифры в описании';
  }

  // Проверка на наличие не-русских букв (кроме пробелов и знаков препинания)
  if (/[\p{Letter}\p{Mark}]/gmu.test(text) && !/^[\p{Script=Cyrillic}\s\p{P}\p{N}\$^`~]*$/gmu.test(text)) {
    return 'Пожалуйста, используйте только русские буквы';
  }
  const cleanText = text.replace(/[\s\p{P}]/gu, '');

  for (let i = 0; i < RUSSIAN_NUMBERS.length - 1; i++) {
    if (cleanText.includes(RUSSIAN_NUMBERS[i])) {
      return 'Пожалуйста, не используйте числительные в описании';
    }
  }

  return false; // Нет ошибок
};

export const DescriptionClient = () => {
  const [error, setError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { description, price, updateDescription, getRequestData } = useCreateTripStore();

  const router = useRouter();

  if (!price) {
   redirect('/create-trip/from');
  }

  // Обработчик изменения текста
  const handleDescriptionChange = (newDescription: string) => {
    updateDescription(newDescription);
    const validationError = validateText(newDescription);
    setError(validationError);
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      const data: TripData = getRequestData();
      const currentDate = new Date();
      const dateTime = new Date(data.dateTime);
      if (dateTime <= currentDate) {
        console.error('Ошибка: указанная дата уже прошла.')
        setLoading(false); // Не забываем сбросить состояние загрузки, после return finally не отработает
        setError('Указанная дата уже прошла. Пожалуйста, выберите будущую дату.');
        return; // Прерываем выполнение функции
      }
      await authApiClient.poster('trip/publish', data);
      router.push('/');
    } catch (error) {
      console.error(error);
      setError('Произошла ошибка при публикации поездки. Пожалуйста, попробуйте позже.');
      // @FIXME временное решение, так же здесь может быть функция refreshTokenUpdate
      // router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <TextArea
        value={description}
        onChangeAction={handleDescriptionChange}
        placeholder="Как поедете, планируете ли остановки, правила поведения в машине и т.п."
        errorText={error}
        style={{ marginTop: '20px' }}
        disabled={loading}
      />

      <Button variant="continue" onClick={handlePublish} disabled={!!error} loading={loading}>Опубликовать</Button>
    </div>
  );
};