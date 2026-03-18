import { Link } from 'react-router-dom'
import { ArrowRight, Monitor, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Index() {
  const { t } = useLanguage()

  return (
    <>
      <SEO title={t('nav.home')} description={t('home.meta.desc')} />

      <section
        className="relative overflow-hidden py-24 md:py-32 lg:py-48 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://img.usecurling.com/p/1920/1080?q=corporate%20technology')",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            {t('home.hero.title1')}{' '}
            <span className="text-primary">{t('home.hero.highlight')}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-200 md:text-xl">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-12 px-8 text-base shadow-lg transition-transform hover:-translate-y-1"
            >
              <Link to="/projetos">
                {t('home.hero.projects')}{' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 px-8 text-base transition-transform hover:-translate-y-1 border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              <Link to="/sobre-nos">{t('home.hero.about')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              {t('home.services.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: t('home.services.sd.title'),
                icon: Monitor,
                link: '/service-desk',
                desc: t('home.services.sd.desc'),
              },
              {
                title: t('home.services.dev.title'),
                icon: Zap,
                link: '/desenvolvimento',
                desc: t('home.services.dev.desc'),
              },
              {
                title: t('home.services.cons.title'),
                icon: Shield,
                link: '/consultorias',
                desc: t('home.services.cons.desc'),
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
                  {t('home.services.learnMore')}{' '}
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
