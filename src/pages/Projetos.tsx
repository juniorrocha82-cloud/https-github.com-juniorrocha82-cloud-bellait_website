import { SEO } from '@/components/SEO'
import { PageHeader } from '@/components/PageHeader'
import { Server, Cloud, Network } from 'lucide-react'

export default function Projetos() {
  return (
    <>
      <SEO
        title="Projetos de Tecnologia"
        description="Implementação de infraestrutura, migração para nuvem e projetos de redes corporativas avançadas."
      />

      <PageHeader
        title="Projetos de Tecnologia"
        description="Arquitetura, planejamento minucioso e execução de projetos de infraestrutura de TI."
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                icon: Cloud,
                title: 'Migração para Nuvem',
                desc: 'Planejamos e executamos a migração estruturada dos seus serviços e dados para plataformas cloud seguras, garantindo alta disponibilidade, redução de custos e escalabilidade sob demanda.',
                image:
                  'https://img.usecurling.com/p/600/400?q=cloud%20computing%20data&color=blue',
              },
              {
                icon: Server,
                title: 'Infraestrutura de Servidores',
                desc: 'Montagem física, configuração lógica e virtualização de servidores locais ou híbridos, dimensionados exatamente para suportar a sua demanda atual de processamento e crescimento futuro.',
                image:
                  'https://img.usecurling.com/p/600/400?q=server%20room%20rack&color=black',
              },
              {
                icon: Network,
                title: 'Redes Corporativas',
                desc: 'Estruturação avançada de redes cabeadas e Wi-Fi de alta performance, com foco estrito em segurança, estabilidade de conexão e segmentação adequada de acessos por departamento.',
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
