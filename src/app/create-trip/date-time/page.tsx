import { FullScreenContainer } from '@/components/containers/FullScreenContainer';
import { DateTimeClient } from './DateTimeClient';
import { GoBackBtn } from '@/components/kit/GoBackBtn2';
import { Heading } from '@/components/kit/Heading';

export default function DateTime() {
  console.log(
    '3) Page /create-trip/date-time работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <FullScreenContainer>
      <div className="form-wrapper">
        <GoBackBtn href="to" />
        <Heading variant="dark">Выберите дату и время поездки</Heading>
      </div>
      <DateTimeClient />
    </FullScreenContainer>
  )
}