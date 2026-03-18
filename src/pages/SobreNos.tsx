import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { Target, Eye, Heart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SobreNos() {
  const { t } = useLanguage()

  return (
    <>
      <SEO title={t('nav.about')} description={t('about.meta.desc')} />

      <PageHeader
        title={t('about.header.title')}
        description={t('about.header.desc')}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">{t('about.who.title')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.who.desc')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-6 inline-flex rounded-full bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">
                {t('about.mission.title')}
              </h3>
              <p className="text-muted-foreground">{t('about.mission.desc')}</p>
            </div>

            <div className="rounded-2xl border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-6 inline-flex rounded-full bg-indigo-100 p-4 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">
                {t('about.vision.title')}
              </h3>
              <p className="text-muted-foreground">{t('about.vision.desc')}</p>
            </div>

            <div className="rounded-2xl border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-6 inline-flex rounded-full bg-rose-100 p-4 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">
                {t('about.values.title')}
              </h3>
              <ul className="space-y-3 text-muted-foreground text-left mx-auto max-w-[200px]">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />{' '}
                  {t('about.values.1')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />{' '}
                  {t('about.values.2')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />{' '}
                  {t('about.values.3')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />{' '}
                  {t('about.values.4')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
