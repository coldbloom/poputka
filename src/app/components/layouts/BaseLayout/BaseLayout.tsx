import { Header } from "@/components/shared/Header";

export function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='mt-hh'>
      <Header />
      <main>
        {children}
      </main>
      <footer>

      </footer>
    </div>
  )
}