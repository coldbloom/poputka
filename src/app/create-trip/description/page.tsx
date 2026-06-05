import { FullScreenContainer } from '@/components/containers/FullScreenContainer';
import { GoBackBtn } from "@/components/kit/GoBackBtn2";
import { Heading } from "@/components/kit/Heading";
import { DescriptionClient } from "@/create-trip/description/DescriptionClient";

export default function Description() {

  return (
    <FullScreenContainer>
      <div className="form-wrapper" style={{ height: '100%' }}>
        <GoBackBtn href="price" />
        <Heading variant="dark">Дополнительная информация о поездке</Heading>
        <DescriptionClient />
      </div>
    </FullScreenContainer>
  )
}