import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Layout() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-10 py-10">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}
