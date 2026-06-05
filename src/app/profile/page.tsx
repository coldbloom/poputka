import { GoBackBtn } from "@/components/kit/GoBackBtn";
import { Header } from "@/components/shared/Header";
import { ProfileCard, ProfileEditButtons } from '@/components/shared/profile';
import s from './page.module.scss';

export default function Profile() {
  console.log(
    '1) Page profile работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );
  return (
    <div className='mt-hh'>
      <Header />
      <div className={s.wrapper}>
        <div className={s.titleWrapper}>
          <GoBackBtn style={{ marginTop: 0 }} />
          <h1>Мой профиль</h1>
        </div>
        <hr/>
        <div style={{ padding: '30px 0 20px' }}>
          <ProfileCard />
          <ProfileEditButtons />
        </div>
        <hr/>
      </div>
    </div>
  );
}