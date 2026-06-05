import { Location } from "@/utils/types";

export function formatPhone(phone: string | null | undefined): string | null | undefined {
  // Форматируем номер
  if (phone) {
    return `+7 ${phone.slice(2, 5)} ${phone.slice(5, 8)} ${phone.slice(8, 10)} ${phone.slice(10, 12)}`;
  } else {
    return undefined;
  }
}

export function secondsToHoursMinutes(seconds: number): string {
  // Вычисляем часы
  const hours = Math.floor(seconds / 3600);
  // Вычисляем оставшиеся секунды после вычисления часов
  const remainingSeconds = seconds % 3600;
  // Вычисляем минуты
  const minutes = Math.floor(remainingSeconds / 60);

  // Формируем строку в формате "X ч Y мин"
  let result = '';
  if (hours > 0) {
    result += `${hours} ч`;
  }
  if (minutes > 0) {
    if (result !== '') result += ' '; // Добавляем пробел, если есть часы
    result += `${minutes} мин`;
  }
  // Если и часы, и минуты равны нулю, возвращаем "0 мин"
  if (result === '') {
    result = '0 мин';
  }

  return result;
}

export const updateSearchCitiesHistory = (city: Location): void => {
  function removeDuplicatesFromStart(list: any[], key = 'id') {
    const uniqueEntries = new Map();

    // Идём с начала массива, чтобы первые вхождения оставались
    for (const item of list) {
      if (!uniqueEntries.has(item[key])) {
        uniqueEntries.set(item[key], item);
      }
    }

    return Array.from(uniqueEntries.values());
  }

  const history = localStorage.getItem('history');
  let historyList: Location[] = history ? JSON.parse(history) : [];

  historyList.unshift(city);
  removeDuplicatesFromStart(historyList.slice(0, 10))
  const updatedHistoryList = removeDuplicatesFromStart(historyList.slice(0, 10));
  localStorage.setItem('history', JSON.stringify(updatedHistoryList));
};

type DateOptions = {
  longed?: boolean;
};

/**
 * функция, которая принимает объект Date и возвращает отформатированную строку в нужном формате
 * @param date
 * @param options
 */
export function formatDate(date: Date, options?: DateOptions): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Увеличиваем число на 1, чтобы получить завтрашнюю дату

  // Определяем параметры форматирования для вывода даты
  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: options?.longed ? 'long' : 'short', // Краткое название дня недели (например, "Пн")
    day: 'numeric',    // Число месяца (например, "7")
    month: options?.longed ? 'long' : 'short'     // Краткое название месяца (например, "окт.")
  };

  // Создаем форматер с указанными параметрами и локалью "ru-RU" для русского языка
  const formatter = new Intl.DateTimeFormat('ru-RU', formatOptions);

  if (date.toDateString() === today.toDateString()) return 'Сегодня';
  if (date.toDateString() === tomorrow.toDateString()) return 'Завтра';
  return formatter.format(date);
}

/**
 * не преобразует дату в UTC, в отличие от нативного метода date.toISOString()
 */
export function formatDateToIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Функция для получения правильного склонения слова "пассажир" в зависимости от числа
export const getPassengerString = (count: number): string => {
  if (count === 1) {
    return `${count} пассажир`;
  } else if (count >= 2 && count <= 4) {
    return `${count} пассажира`;
  } else {
    return `${count} пассажиров`;
  }
};

// Функция для получения правильного склонения слова "поездка" в зависимости от числа
export const getTripString = (count: number): string => {
  if (count === 1) {
    return `${count} поездка`;
  } else  if (count >= 2 && count <= 4) {
    return `${count} поездки`;
  } else {
    return `${count} поездок`;
  }
}

export function getMoscowDateNow(): Date {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
}


