import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4 py-20">
      <SEO
        title="Página não encontrada"
        description="A página que você está procurando não existe em Bella IT."
      />
      <h1 className="text-8xl font-black text-primary mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-6 text-foreground">
        Página não encontrada
      </h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-md">
        Desculpe, a página que você está procurando não existe, foi removida, ou
        está temporariamente indisponível.
      </p>
      <Button asChild size="lg" className="h-12 px-8">
        <Link to="/">{t('nav.home')}</Link>
      </Button>
    </div>
  )
}
