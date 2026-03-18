import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { ShieldCheck, FileCheck, BrainCircuit } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Consultorias() {
  const { t } = useLanguage()

  return (
    <>
      <SEO title={t('nav.consulting')} description={t('cons.meta.desc')} />

      <PageHeader
        title={t('cons.header.title')}
        description={t('cons.header.desc')}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-20 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                {t('cons.content.title')}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                {t('cons.content.desc')}
              </p>
              <ul className="space-y-4">
                {[
                  { icon: BrainCircuit, text: t('cons.feat1') },
                  { icon: FileCheck, text: t('cons.feat2') },
                  { icon: ShieldCheck, text: t('cons.feat3') },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm hover:border-primary transition-colors"
                  >
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-[4/5] shadow-xl">
              <img
                src="https://img.usecurling.com/p/800/1000?q=consulting%20business%20technology&color=blue"
                alt="Consultoria em TI e Negócios"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
