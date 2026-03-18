import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { Code2, Smartphone, Database } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Desenvolvimento() {
  const { t } = useLanguage()

  return (
    <>
      <SEO title={t('nav.development')} description={t('dev.meta.desc')} />

      <PageHeader
        title={t('dev.header.title')}
        description={t('dev.header.desc')}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              {t('dev.content.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('dev.content.desc')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Code2,
                title: t('dev.web.title'),
                desc: t('dev.web.desc'),
              },
              {
                icon: Smartphone,
                title: t('dev.mobile.title'),
                desc: t('dev.mobile.desc'),
              },
              {
                icon: Database,
                title: t('dev.api.title'),
                desc: t('dev.api.desc'),
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-card p-8 hover:border-primary shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="inline-block bg-primary/10 p-4 rounded-xl mb-6 group-hover:bg-primary transition-colors">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
