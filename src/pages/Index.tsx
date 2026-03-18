import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Monitor, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Index() {
  const { t } = useLanguage()

  return (
    <>
      <SEO
        title={t('nav.home')}
        description="Bella IT Tecnologia - Transformando negócios com tecnologia inteligente e soluções personalizadas em TI."
      />

      <section className="relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-900 md:py-32">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
            Tecnologia que impulsiona o seu{' '}
            <span className="text-primary">sucesso</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl">
            Oferecemos soluções completas em infraestrutura, desenvolvimento e
            consultoria de TI para elevar o seu negócio ao próximo nível.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-12 px-8 text-base shadow-lg transition-transform hover:-translate-y-1"
            >
              <Link to="/projetos">
                Nossos Projetos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-8 text-base transition-transform hover:-translate-y-1 bg-white hover:bg-slate-50"
            >
              <Link to="/sobre-nos">Conheça a Bella IT</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Nossos Serviços
            </h2>
            <p className="text-lg text-muted-foreground">
              Especialistas prontos para resolver seus desafios tecnológicos.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Service Desk',
                icon: Monitor,
                link: '/service-desk',
                desc: 'Suporte ágil e eficiente para garantir a continuidade da sua operação.',
              },
              {
                title: 'Desenvolvimento',
                icon: Zap,
                link: '/desenvolvimento',
                desc: 'Softwares sob medida para automatizar e otimizar seus processos.',
              },
              {
                title: 'Consultoria',
                icon: Shield,
                link: '/consultorias',
                desc: 'Planejamento estratégico e licenciamento de softwares corporativos.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:border-primary/50"
              >
                <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Saber mais{' '}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
