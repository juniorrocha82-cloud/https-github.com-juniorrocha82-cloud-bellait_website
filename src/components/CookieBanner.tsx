import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/contexts/LanguageContext'

export function CookieBanner() {
  const { lang } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('bella-it-cookie-consent')) {
      setShow(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('bella-it-cookie-consent', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:p-6 z-[60] flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-slide-up">
      <div className="max-w-4xl">
        <p className="text-sm text-slate-600 leading-relaxed">
          {lang === 'pt'
            ? 'Utilizamos cookies essenciais e tecnologias semelhantes de acordo com a nossa Política de Privacidade, para melhorar a sua experiência em nosso site. Ao continuar navegando, você concorda com estas condições.'
            : 'We use essential cookies and similar technologies in accordance with our Privacy Policy to improve your experience on our website. By continuing to browse, you agree to these conditions.'}
        </p>
      </div>
      <Button
        onClick={accept}
        className="w-full md:w-auto px-8 whitespace-nowrap"
      >
        {lang === 'pt' ? 'Aceitar e Continuar' : 'Accept and Continue'}
      </Button>
    </div>
  )
}
