import { BaseLayout } from "@/components/layouts/BaseLayout";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BaseLayout>{children}</BaseLayout>
  )
}