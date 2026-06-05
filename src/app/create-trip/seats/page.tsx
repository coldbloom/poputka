import { FullScreenContainer } from '@/components/containers/FullScreenContainer';
import { GoBackBtn } from "@/components/kit/GoBackBtn2";
import { Heading } from "@/components/kit/Heading";
import { Button } from "@/components/kit/Button";
import { SeatsClient } from './SeatsClient';

export default function Seats() {
  //@FIXME удалить лог
  console.log(
    '1) Page /create-trip/seats работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <FullScreenContainer>
      <div className="form-wrapper">
        <GoBackBtn href="date-time" />
        <Heading variant="dark">Cколько попутчиков возьмете в дорогу?</Heading>
      </div>
      <SeatsClient />
      <Button variant="continue" href="price">Далее</Button>
    </FullScreenContainer>
  )
}