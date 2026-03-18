import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import partnersImg from '@/assets/image-c7d78.png'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Parcerias() {
  const { t } = useLanguage()

  return (
    <>
      <SEO title={t('nav.partners')} description={t('part.meta.desc')} />

      <PageHeader
        title={t('part.header.title')}
        description={t('part.header.desc')}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-3xl font-bold">
              {t('part.content.title')}
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              {t('part.content.desc')}
            </p>

            <div className="overflow-hidden rounded-2xl border bg-white p-8 md:p-12 shadow-sm dark:bg-slate-200 flex items-center justify-center">
              <img
                src={partnersImg}
                alt="Logos de parceiros estratégicos"
                className="h-auto w-full max-w-4xl object-contain mix-blend-multiply transition-transform hover:scale-105 duration-700"
              />
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: 'Ingram Micro', desc: t('part.ingram.desc') },
                { name: 'Veeam', desc: t('part.veeam.desc') },
                { name: 'Microsoft', desc: t('part.microsoft.desc') },
                { name: 'Dell', desc: t('part.dell.desc') },
                { name: 'Trend Micro', desc: t('part.trend.desc') },
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="rounded-xl border bg-card p-6 text-left shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-primary/30"
                >
                  <h3 className="mb-3 font-bold text-lg text-primary">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {partner.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
