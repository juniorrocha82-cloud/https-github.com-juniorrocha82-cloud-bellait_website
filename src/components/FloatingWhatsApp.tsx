import { MessageCircle } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'

export function FloatingWhatsApp() {
  const { lang } = useLang()

  return (
    <a
      href="https://wa.me/5511999368850"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
      aria-label={
        lang === 'pt' ? 'Fale Conosco pelo WhatsApp' : 'Contact Us via WhatsApp'
      }
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-medium py-2 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
        {lang === 'pt' ? 'Fale Conosco!' : 'Contact Us!'}
      </span>
    </a>
  )
}
