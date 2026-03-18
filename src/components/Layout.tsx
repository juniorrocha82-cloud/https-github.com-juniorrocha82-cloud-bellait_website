import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <FloatingWhatsApp />
    </div>
  )
}
