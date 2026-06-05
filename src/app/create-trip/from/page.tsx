import { FullScreenContainer } from '@/components/containers/FullScreenContainer';
import { FromClient } from './FromClient';

export default function From() {
  console.log(
    '1) Page /create-trip/rom работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <FullScreenContainer>
      <FromClient />
    </FullScreenContainer>
  )
}