import { MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function FloatingWhatsApp() {
  const { t } = useLanguage()

  return (
    <a
      href="https://wa.me/5511999368850"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label={t('whatsapp.label')}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden font-medium sm:inline-block">
        {t('whatsapp.label')}
      </span>
    </a>
  )
}
