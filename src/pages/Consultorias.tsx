import { SEO } from '@/components/SEO'
import { useLang } from '@/contexts/LanguageContext'
import { PageHeader } from '@/components/PageHeader'
import { CheckCircle2 } from 'lucide-react'

export default function Consultorias() {
  const { lang } = useLang()

  const list = [
    'Microsoft 365 & Office',
    lang === 'pt'
      ? 'Antivírus e Endpoint Security'
      : 'Antivirus and Endpoint Security',
    lang === 'pt' ? 'Auditoria de Infraestrutura' : 'Infrastructure Auditing',
    lang === 'pt' ? 'Adequação à LGPD' : 'LGPD Compliance',
    lang === 'pt' ? 'Análise de Vulnerabilidades' : 'Vulnerability Analysis',
    lang === 'pt'
      ? 'Consultoria Estratégica (vCIO)'
      : 'Strategic Consulting (vCIO)',
  ]

  return (
    <div className="w-full bg-background pb-20 animate-in fade-in duration-500">
      <SEO
        title={
          lang === 'pt' ? 'Consultorias e Licenças' : 'Consulting & Licenses'
        }
        description={
          lang === 'pt'
            ? 'Auditoria de TI, compliance e licenciamento inteligente de software.'
            : 'IT Auditing, compliance and smart software licensing.'
        }
      />
      <PageHeader
        title={
          lang === 'pt' ? 'Consultorias e Licenças' : 'Consulting & Licenses'
        }
        description={
          lang === 'pt'
            ? 'Compliance, segurança e otimização de custos para seus ativos digitais.'
            : 'Compliance, security and cost optimization for your digital assets.'
        }
        imageQuery="business consulting meeting"
      />

      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://img.usecurling.com/p/800/800?q=software%20dashboard%20chart&color=gray"
              alt={lang === 'pt' ? 'Consultoria TI' : 'IT Consulting'}
              className="rounded-2xl shadow-xl w-full object-cover aspect-square"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              {lang === 'pt'
                ? 'Licenciamento Inteligente e Auditoria'
                : 'Smart Licensing and Auditing'}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {lang === 'pt'
                ? 'Reduza custos e evite multas mantendo seus softwares regularizados. Nossos consultores avaliam seu ambiente, identificam gargalos e propõem melhorias contínuas para manter sua TI eficiente e segura.'
                : 'Reduce costs and avoid fines by keeping your software compliant. Our consultants assess your environment, identify bottlenecks, and propose continuous improvements to keep your IT efficient and secure.'}
            </p>
            <div className="space-y-4">
              {list.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-slate-700 font-medium text-lg">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
