import { SEO } from '@/components/SEO'
import { useLang } from '@/contexts/LanguageContext'
import { PageHeader } from '@/components/PageHeader'
import { CheckCircle2 } from 'lucide-react'

export default function Desenvolvimento() {
  const { lang } = useLang()

  const list = [
    lang === 'pt'
      ? 'Aplicações Web e Mobile Customizadas'
      : 'Custom Web and Mobile Applications',
    lang === 'pt' ? 'Integrações Complexas de API' : 'Complex API Integrations',
    lang === 'pt'
      ? 'Sistemas ERP/CRM sob medida'
      : 'Tailor-made ERP/CRM Systems',
    lang === 'pt'
      ? 'Manutenção, Sustentação e Refatoração'
      : 'Maintenance, Support and Refactoring',
  ]

  return (
    <div className="w-full bg-background pb-20 animate-in fade-in duration-500">
      <SEO
        title={
          lang === 'pt' ? 'Desenvolvimento de Software' : 'Software Development'
        }
        description={
          lang === 'pt'
            ? 'Criação de software sob medida, aplicativos e integrações de sistemas.'
            : 'Custom software creation, applications and system integrations.'
        }
      />
      <PageHeader
        title={
          lang === 'pt' ? 'Desenvolvimento de Software' : 'Software Development'
        }
        description={
          lang === 'pt'
            ? 'Transformando ideias em sistemas escaláveis e eficientes.'
            : 'Transforming ideas into scalable and efficient systems.'
        }
        imageQuery="programming code software screen"
      />

      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              {lang === 'pt'
                ? 'Fábrica de Software Especializada'
                : 'Specialized Software Factory'}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {lang === 'pt'
                ? 'Automatize processos e conecte todos os seus sistemas com aplicações desenvolvidas sob medida, utilizando as tecnologias mais modernas e seguras do mercado atual.'
                : 'Automate processes and connect all your systems with custom-developed applications, using the most modern and secure technologies in today market.'}
            </p>
            <div className="space-y-4">
              {list.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <CheckCircle2 className="w-7 h-7 text-primary shrink-0" />
                  <span className="text-slate-700 font-medium text-lg pt-0.5">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://img.usecurling.com/p/800/800?q=software%20developer%20team%20coding&color=blue"
              alt={
                lang === 'pt' ? 'Equipe de Desenvolvimento' : 'Development Team'
              }
              className="rounded-2xl shadow-xl w-full object-cover aspect-square"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
