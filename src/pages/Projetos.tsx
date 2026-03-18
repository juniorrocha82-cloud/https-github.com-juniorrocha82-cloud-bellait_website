import { SEO } from '@/components/SEO'
import { useLang } from '@/contexts/LanguageContext'
import { PageHeader } from '@/components/PageHeader'
import { CheckCircle2 } from 'lucide-react'

export default function Projetos() {
  const { lang } = useLang()

  const benefits = [
    lang === 'pt'
      ? 'Migração Cloud (AWS, Azure, Google Cloud)'
      : 'Cloud Migration (AWS, Azure, Google Cloud)',
    lang === 'pt'
      ? 'Virtualização de Servidores e Desktops'
      : 'Server and Desktop Virtualization',
    lang === 'pt'
      ? 'Projetos de Redes Corporativas (LAN/WAN)'
      : 'Corporate Network Projects (LAN/WAN)',
    lang === 'pt'
      ? 'Cabeamento Estruturado e Wi-Fi'
      : 'Structured Cabling and Wi-Fi',
    lang === 'pt'
      ? 'Segurança da Informação e Firewalls'
      : 'Information Security and Firewalls',
    lang === 'pt'
      ? 'Backup e Disaster Recovery'
      : 'Backup and Disaster Recovery',
  ]

  return (
    <div className="w-full bg-background pb-20 animate-in fade-in duration-500">
      <SEO
        title={lang === 'pt' ? 'Projetos de Tecnologia' : 'Technology Projects'}
        description={
          lang === 'pt'
            ? 'Soluções em infraestrutura de TI, redes e migração Cloud.'
            : 'IT infrastructure, networks and Cloud migration solutions.'
        }
      />

      <PageHeader
        title={lang === 'pt' ? 'Projetos de Tecnologia' : 'Technology Projects'}
        description={
          lang === 'pt'
            ? 'Planejamento e execução impecáveis para a infraestrutura do seu negócio.'
            : 'Flawless planning and execution for your business infrastructure.'
        }
        imageQuery="server rack datacenter"
      />

      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              {lang === 'pt'
                ? 'Infraestrutura Moderna e Escalável'
                : 'Modern and Scalable Infrastructure'}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {lang === 'pt'
                ? 'Desenhamos, implementamos e suportamos arquiteturas de TI completas. Nosso foco é garantir que a tecnologia suporte o crescimento da sua empresa, oferecendo segurança, alta disponibilidade e escalabilidade.'
                : 'We design, implement and support complete IT architectures. Our focus is to ensure that technology supports your company growth, offering security, high availability, and scalability.'}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="https://img.usecurling.com/p/800/800?q=network%20cables%20server&color=blue"
              alt={
                lang === 'pt'
                  ? 'Infraestrutura e Redes'
                  : 'Infrastructure and Networks'
              }
              className="rounded-2xl shadow-xl w-full object-cover aspect-square"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
