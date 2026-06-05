import { AuthorizedLayout } from "@/components/layouts/AuthorizedLayout";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthorizedLayout>
      {children}
    </AuthorizedLayout>
  )
}