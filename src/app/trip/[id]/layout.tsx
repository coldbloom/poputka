import { BaseLayout } from "@/components/layouts/BaseLayout";

export default function TripLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BaseLayout>{children}</BaseLayout>
  )
}