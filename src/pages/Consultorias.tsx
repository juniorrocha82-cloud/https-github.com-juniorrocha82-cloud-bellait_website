import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { ShieldCheck, FileCheck, BrainCircuit } from 'lucide-react'

export default function Consultorias() {
  return (
    <>
      <SEO
        title="Consultorias e Licenças"
        description="Serviços de consultoria em TI, licenciamento de software corporativo e adequação tecnológica."
      />

      <PageHeader
        title="Consultorias e Licenças"
        description="Orientação especializada para otimizar seus investimentos em tecnologia."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-20 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Decisões mais inteligentes para o seu negócio
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                Nossa equipe de especialistas analisa a infraestrutura atual da
                sua empresa e propõe melhorias estratégicas, garantindo que você
                utilize as ferramentas mais adequadas com o melhor
                custo-benefício do mercado.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: BrainCircuit,
                    text: 'Mapeamento completo e análise de infraestrutura de TI',
                  },
                  {
                    icon: FileCheck,
                    text: 'Gestão e regularização de licenças (Microsoft, Veeam, etc)',
                  },
                  {
                    icon: ShieldCheck,
                    text: 'Consultoria dedicada em segurança da informação e LGPD',
                  },
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
