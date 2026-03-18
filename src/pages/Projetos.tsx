import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { Server, Cloud, Network } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Projetos() {
  const { t } = useLanguage()

  return (
    <>
      <SEO title={t('nav.projects')} description={t('proj.meta.desc')} />

      <PageHeader
        title={t('proj.header.title')}
        description={t('proj.header.desc')}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                icon: Cloud,
                title: t('proj.cloud.title'),
                desc: t('proj.cloud.desc'),
                image:
                  'https://img.usecurling.com/p/600/400?q=cloud%20computing%20data&color=blue',
              },
              {
                icon: Server,
                title: t('proj.server.title'),
                desc: t('proj.server.desc'),
                image:
                  'https://img.usecurling.com/p/600/400?q=server%20room%20rack&color=black',
              },
              {
                icon: Network,
                title: t('proj.network.title'),
                desc: t('proj.network.desc'),
                image:
                  'https://img.usecurling.com/p/600/400?q=network%20cables%20switch&color=gray',
              },
            ].map((projeto, i) => (
              <div
                key={i}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={projeto.image}
                    alt={projeto.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <projeto.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{projeto.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {projeto.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
