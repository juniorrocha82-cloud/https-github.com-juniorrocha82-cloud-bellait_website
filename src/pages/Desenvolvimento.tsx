import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { Code2, Smartphone, Database } from 'lucide-react'

export default function Desenvolvimento() {
  return (
    <>
      <SEO
        title="Desenvolvimento de Software"
        description="Criação de softwares sob medida, aplicativos web e mobile para impulsionar a inovação da sua empresa corporativa."
      />

      <PageHeader
        title="Desenvolvimento"
        description="Sistemas personalizados criados para resolver os desafios únicos do seu negócio."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Inovação sob Medida</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Do planejamento inicial ao deploy final, nossa equipe de
              desenvolvimento cria soluções robustas, escaláveis e intuitivas,
              utilizando as tecnologias mais modernas do mercado para alavancar
              os seus resultados.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Code2,
                title: 'Sistemas Web',
                desc: 'Aplicações completas, rápidas e responsivas, acessíveis de qualquer lugar com máxima segurança.',
              },
              {
                icon: Smartphone,
                title: 'Aplicativos Mobile',
                desc: 'Soluções nativas ou híbridas de alto desempenho para plataformas iOS e Android.',
              },
              {
                icon: Database,
                title: 'Integrações de API',
                desc: 'Conectamos seus sistemas legados para garantir fluidez, automação e segurança dos dados.',
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
