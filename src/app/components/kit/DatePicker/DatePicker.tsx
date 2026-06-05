import Calendar from 'react-calendar' // Unpacked Size 580 kB
// import 'react-calendar/dist/Calendar.css'; // шаблон стилей
// стили календаря в global.scss

type CalendarProps = {
  selectedDate?: Date | null;
  onChangeDate: (selectedDate: Date) => void;
}

export const DatePicker = ({ selectedDate, onChangeDate }: CalendarProps) => {
  const changeDate = (date: Date) => onChangeDate(date);

  return (
    <Calendar
      value={selectedDate}
      //@ts-ignore
      onChange={changeDate}
      locale="ru-RU"
      showNeighboringMonth={false} // должны ли отображаться дни предыдущего и след месяца, если текущий месяц не начинается с понедельника
      minDate={new Date()} // делает все даты до текущего дня недоступными для выбора
      next2Label={null} // клик на следующий год
      prev2Label={null} // клик на предыдущий год
      minDetail="month" // запрещаем клик на navigation label button
    />
  );
};