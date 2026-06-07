import { GoBackBtn } from "@/components/kit/GoBackBtn";
import s from './page.module.scss';

export default async function TripPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/trip/${id}`;
  const response = await fetch(url);

  const data = await response.json();

  console.log(data);

  return (
    <div className={s.wrapper}>
      <GoBackBtn />
      <div>

      </div>
    </div>
  )
}