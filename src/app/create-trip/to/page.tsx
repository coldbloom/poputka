import { FullScreenContainer } from '@/components/containers/FullScreenContainer';
import { ToClient } from './ToClient';

export default function To() {
  console.log(
    '1) Page /create-trip/to работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );

  return (
    <FullScreenContainer>
      <ToClient />
    </FullScreenContainer>
  )
}