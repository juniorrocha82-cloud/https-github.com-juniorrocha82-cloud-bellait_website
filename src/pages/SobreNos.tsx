import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { Target, Eye, Heart } from 'lucide-react'

export default function SobreNos() {
  return (
    <>
      <SEO
        title="Sobre Nós"
        description="Conheça a missão, visão e valores da Bella IT Tecnologia. Inovação e excelência em serviços de tecnologia."
      />

      <PageHeader
        title="Sobre a Bella IT"
        description="Nossa história, propósito e os valores que nos guiam em cada projeto."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Quem Somos</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Bella IT é uma empresa de tecnologia focada em entregar soluções
              de ponta para negócios de todos os tamanhos. Nascemos com o
              propósito de descomplicar a TI, trazendo inovação, segurança e
              eficiência para o dia a dia das empresas corporativas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-6 inline-flex rounded-full bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Missão</h3>
              <p className="text-muted-foreground">
                Prover soluções tecnológicas inovadoras e de alta qualidade,
                garantindo a satisfação de nossos clientes e contribuindo para o
                crescimento e segurança de seus negócios.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-6 inline-flex rounded-full bg-indigo-100 p-4 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Visão</h3>
              <p className="text-muted-foreground">
                Ser reconhecida nacionalmente como a principal parceira
                estratégica em tecnologia da informação, destacando-se pela
                excelência, transparência e confiabilidade de entrega.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-6 inline-flex rounded-full bg-rose-100 p-4 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Valores</h3>
              <ul className="space-y-3 text-muted-foreground text-left mx-auto max-w-[200px]">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" /> Inovação
                  Contínua
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" /> Ética e
                  Transparência
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" /> Foco no
                  Cliente
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" /> Excelência
                  Operacional
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
