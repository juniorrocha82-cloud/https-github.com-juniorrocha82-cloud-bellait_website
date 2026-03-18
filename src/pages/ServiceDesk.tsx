import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { Headphones, Clock, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServiceDesk() {
  return (
    <>
      <SEO
        title="Service Desk"
        description="Suporte técnico especializado de TI N1, N2 e N3 para garantir a continuidade e produtividade da sua equipe."
      />

      <PageHeader
        title="Service Desk"
        description="Suporte técnico ágil e eficiente para que a sua operação nunca pare."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse gap-16 lg:flex-row lg:items-center">
            <div className="flex-1">
              <h2 className="mb-6 text-3xl font-bold">
                Atendimento que faz a diferença
              </h2>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                Oferecemos suporte técnico completo e estruturado em níveis (N1,
                N2 e N3) para resolver desde problemas cotidianos até incidentes
                críticos, garantindo a estabilidade e a continuidade do seu
                negócio com SLAs bem definidos.
              </p>

              <div className="mb-10 space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Tempo de Resposta Rápido
                    </h3>
                    <p className="text-muted-foreground">
                      Monitoramento proativo do ambiente e atendimento imediato
                      para chamados classificados como urgentes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      Resolução Especializada
                    </h3>
                    <p className="text-muted-foreground">
                      Técnicos amplamente capacitados e experientes para
                      diagnosticar e solucionar problemas complexos de
                      infraestrutura e software.
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" asChild className="h-14 px-8 text-lg shadow-md">
                <a
                  href="https://wa.me/5511999368850"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Headphones className="mr-2 h-5 w-5" />
                  Solicitar Atendimento Agora
                </a>
              </Button>
            </div>

            <div className="flex-1">
              <div className="relative aspect-video overflow-hidden rounded-2xl md:aspect-[4/3] shadow-2xl ring-1 ring-border">
                <img
                  src="https://img.usecurling.com/p/800/600?q=it%20support%20helpdesk&color=blue"
                  alt="Equipe de Suporte Técnico Service Desk"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
