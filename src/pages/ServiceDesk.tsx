import { SEO } from '@/components/SEO'
import { useLang } from '@/contexts/LanguageContext'
import { PageHeader } from '@/components/PageHeader'
import { Headphones, Clock, ShieldCheck, Zap } from 'lucide-react'

export default function ServiceDesk() {
  const { lang } = useLang()

  const features = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: lang === 'pt' ? 'Suporte Especializado' : 'Specialized Support',
      desc:
        lang === 'pt'
          ? 'Analistas qualificados prontos para resolver incidentes e requisições rapidamente.'
          : 'Qualified analysts ready to resolve incidents and requests quickly.',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7/365',
      desc:
        lang === 'pt'
          ? 'Monitoramento proativo e suporte ininterrupto para manter sua operação sempre ativa.'
          : 'Proactive monitoring and uninterrupted support to keep your operation always active.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: lang === 'pt' ? 'SLAs Agressivos' : 'Aggressive SLAs',
      desc:
        lang === 'pt'
          ? 'Tempos de resposta e resolução alinhados com a criticidade do seu negócio.'
          : 'Response and resolution times aligned with the criticality of your business.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: lang === 'pt' ? 'Atendimento N1, N2, N3' : 'L1, L2, L3 Support',
      desc:
        lang === 'pt'
          ? 'Escalonamento eficiente de chamados técnicos para a equipe correta no menor tempo.'
          : 'Efficient escalation of technical tickets to the right team in the shortest time.',
    },
  ]

  return (
    <div className="w-full bg-background pb-20 animate-in fade-in duration-500">
      <SEO
        title="Service Desk"
        description={
          lang === 'pt'
            ? 'Serviços de Service Desk e Suporte de TI especializado para sua empresa.'
            : 'Service Desk and specialized IT Support services for your company.'
        }
      />

      <PageHeader
        title="Service Desk"
        description={
          lang === 'pt'
            ? 'Tranquilidade e eficiência máxima para a operação de TI da sua empresa.'
            : 'Maximum peace of mind and efficiency for your company IT operation.'
        }
        imageQuery="customer support IT desk"
      />

      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              {lang === 'pt'
                ? 'Gestão Completa de Incidentes'
                : 'Complete Incident Management'}
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                {lang === 'pt'
                  ? 'O Service Desk da Bella IT atua como o ponto único de contato (SPOC) para todos os usuários da sua empresa, garantindo que qualquer solicitação ou incidente de TI seja tratado com rapidez, profissionalismo e total rastreabilidade.'
                  : 'Bella IT Service Desk acts as a single point of contact (SPOC) for all users in your company, ensuring any IT request or incident is handled with speed, professionalism, and full traceability.'}
              </p>
              <p>
                {lang === 'pt'
                  ? 'Utilizamos ferramentas de ponta baseadas em ITIL para gerenciar tickets, medir a satisfação do usuário e fornecer relatórios transparentes de desempenho.'
                  : 'We use cutting-edge ITIL-based tools to manage tickets, measure user satisfaction, and provide transparent performance reports.'}
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://img.usecurling.com/p/800/600?q=help%20desk%20support&color=blue"
              alt="Help Desk"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feat.title}
              </h3>
              <p className="text-slate-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
