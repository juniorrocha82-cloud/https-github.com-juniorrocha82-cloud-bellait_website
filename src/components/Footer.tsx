import { Link } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'
import logoImg from '@/assets/logo-ia-bella-it-branco-d518c.png'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-slate-50 py-12 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <div className="rounded-md bg-slate-900 p-1.5 flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Bella IT Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Transformando negócios com tecnologia inteligente e soluções
              personalizadas de TI para o mercado corporativo.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/sobre-nos"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/parcerias"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.partners')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Serviços</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/service-desk"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.serviceDesk')}
                </Link>
              </li>
              <li>
                <Link
                  to="/projetos"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link
                  to="/consultorias"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.consulting')}
                </Link>
              </li>
              <li>
                <Link
                  to="/desenvolvimento"
                  className="hover:text-primary transition-colors"
                >
                  {t('nav.development')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@bellait.com.br</li>
              <li>+55 (11) 99936-8850</li>
              <li>São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">{t('footer.legal')}</p>
          <div className="mt-4 flex gap-4 sm:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
