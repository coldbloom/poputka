import { FullScreenContainer } from '@/components/containers/FullScreenContainer';
import { GoBackBtn } from '@/components/kit/GoBackBtn2';
import { Heading } from '@/components/kit/Heading';
import { PriceClient } from './PriceClient/PriceClient';

export default function Price() {
  //@FIXME удалить лог
  console.log(
    '1) Page /create-trip/price работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <FullScreenContainer>
      <div className="form-wrapper">
        <GoBackBtn href="seats" />
        <Heading variant="dark">Установите цену за место</Heading>
      </div>
      <PriceClient />
    </FullScreenContainer>
  )
}