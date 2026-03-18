import { Link, useLocation } from 'react-router-dom'
import { useLang } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Globe, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Header() {
  const { lang, setLang } = useLang()
  const location = useLocation()

  const links = [
    {
      to: '/service-desk',
      label: lang === 'pt' ? 'Service Desk' : 'Service Desk',
    },
    {
      to: '/projetos',
      label: lang === 'pt' ? 'Projetos de Tecnologia' : 'Technology Projects',
    },
    {
      to: '/consultorias',
      label:
        lang === 'pt' ? 'Consultorias e Licenças' : 'Consulting & Licenses',
    },
    {
      to: '/parcerias',
      label:
        lang === 'pt' ? 'Parcerias Estratégicas' : 'Strategic Partnerships',
    },
    {
      to: '/desenvolvimento',
      label: lang === 'pt' ? 'Desenvolvimento' : 'Development',
    },
    { to: '/sobre-nos', label: lang === 'pt' ? 'Sobre Nós' : 'About Us' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-colors">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="font-bold text-2xl tracking-tight text-primary">
            Bella IT
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.to
                  ? 'text-primary font-bold'
                  : 'text-slate-600',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:bg-slate-100 rounded-full"
                aria-label="Language Selector"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLang('pt')}
                className={cn(lang === 'pt' && 'font-bold bg-slate-50')}
              >
                Português (PT)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLang('en')}
                className={cn(lang === 'en' && 'font-bold bg-slate-50')}
              >
                English (EN)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-600 hover:bg-slate-100 rounded-full"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-6 mt-12">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      location.pathname === link.to
                        ? 'text-primary font-bold'
                        : 'text-slate-800',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
