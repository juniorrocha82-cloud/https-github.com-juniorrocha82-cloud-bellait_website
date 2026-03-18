import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import partnersImg from '@/assets/image-c7d78.png'

export default function Parcerias() {
  return (
    <>
      <SEO
        title="Parcerias Estratégicas"
        description="Conheça os parceiros tecnológicos da Bella IT: Ingram Micro, Veeam, Microsoft, Dell e Trend Micro."
      />

      <PageHeader
        title="Parcerias Estratégicas"
        description="Trabalhamos em conjunto com os líderes globais de tecnologia para entregar as melhores soluções."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-3xl font-bold">
              Nossos Parceiros de Tecnologia
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              Para garantir a máxima qualidade e segurança em nossos projetos,
              firmamos parcerias com as maiores empresas de tecnologia do mundo.
              Isso nos permite oferecer soluções robustas, escaláveis e com o
              melhor custo-benefício.
            </p>

            <div className="overflow-hidden rounded-2xl border bg-white p-8 md:p-12 shadow-sm dark:bg-slate-200 flex items-center justify-center">
              <img
                src={partnersImg}
                alt="Logos de parceiros estratégicos: Ingram Micro, Veeam, Microsoft, Dell, e Trend Micro"
                className="h-auto w-full max-w-4xl object-contain mix-blend-multiply transition-transform hover:scale-105 duration-700"
              />
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  name: 'Ingram Micro',
                  desc: 'Distribuição global de soluções de TI e suprimentos de tecnologia corporativa.',
                },
                {
                  name: 'Veeam',
                  desc: 'Líder em soluções de backup, recuperação e gestão segura de dados em nuvem.',
                },
                {
                  name: 'Microsoft',
                  desc: 'Sistemas operacionais, nuvem Azure e ferramentas completas de produtividade.',
                },
                {
                  name: 'Dell',
                  desc: 'Fornecimento de infraestrutura robusta, servidores e hardware corporativo de ponta.',
                },
                {
                  name: 'Trend Micro',
                  desc: 'Especialistas em cibersegurança e proteção avançada de dados corporativos.',
                },
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
