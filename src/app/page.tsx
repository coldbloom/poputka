import s from "./page.module.scss";
import { Header } from "@/components/shared/Header";
import { Heading } from "@/components/kit/Heading";
import {MainForm} from "@/components/shared/MainForm";

export default function Home() {
  console.log(
    '1) Page Home работает на:',
    typeof window === 'undefined' ? 'сервере' : 'клиенте'
  );
  return (
    <div className='mt-hh'>
      <Header />
      <main className={s.main}>
        <div className={s.mainWrapper}>
          <div className={s.backgroundColorWrapper} />
          <Heading className={s.heading}>Сервис поиска автомобильных попутчиков без комиссии!</Heading>
          <div className={s.mainFormWrapper}>
            <MainForm />
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
