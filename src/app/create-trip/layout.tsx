import { AuthorizedLayout } from "@/components/layouts/AuthorizedLayout";

export default function LayoutTo({ children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthorizedLayout>
      {children}
    </AuthorizedLayout>
  )
}