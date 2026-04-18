import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

const SECTIONS = [
  {
    id: 'aceitacao',
    title: '1. ACEITAÇÃO DOS TERMOS',
    content: (
      <p className="text-gray-300 leading-relaxed">
        Ao acessar e utilizar os serviços da Bella IT, você concorda em aceitar
        e cumprir com estes Termos e Condições. Se você não concorda com
        qualquer parte destes termos, não utilize nossos serviços.
      </p>
    ),
  },
  {
    id: 'descricao',
    title: '2. DESCRIÇÃO DOS SERVIÇOS',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Service Desk</li>
        <li>Projetos de Tecnologia</li>
        <li>Consultoria em TI</li>
        <li>Licenças e Parcerias</li>
        <li>Cabeamento estruturado</li>
        <li>Desenvolvimento Web e Aplicativos</li>
      </ul>
    ),
  },
  {
    id: 'resp-cliente',
    title: '3. RESPONSABILIDADES DO CLIENTE',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Fornecer informações precisas</li>
        <li>Segurança de credenciais</li>
        <li>Cumprimento de leis</li>
        <li>Não uso para atividades ilegais</li>
        <li>Backups regulares</li>
      </ul>
    ),
  },
  {
    id: 'resp-bellait',
    title: '4. RESPONSABILIDADES DA BELLA IT',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Serviços de qualidade</li>
        <li>Confidencialidade</li>
        <li>Prazos</li>
        <li>Suporte comercial</li>
        <li>Segurança de dados</li>
      </ul>
    ),
  },
  {
    id: 'limitacao',
    title: '5. LIMITAÇÃO DE RESPONSABILIDADE',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Perda de dados por falha do cliente</li>
        <li>Danos indiretos</li>
        <li>Força maior</li>
        <li>Software/hardware de terceiros</li>
        <li>Uso indevido</li>
      </ul>
    ),
  },
  {
    id: 'propriedade',
    title: '6. PROPRIEDADE INTELECTUAL',
    content: (
      <p className="text-gray-300 leading-relaxed">
        Todos os materiais, códigos-fonte, designs e documentações desenvolvidos
        pela Bella IT permanecem como propriedade intelectual da Bella IT, a
        menos que especificado de outra forma em contrato específico de cessão
        de direitos.
      </p>
    ),
  },
  {
    id: 'confidencialidade',
    title: '7. CONFIDENCIALIDADE',
    content: (
      <p className="text-gray-300 leading-relaxed">
        As partes concordam em manter estrita confidencialidade sobre todas as
        informações sensíveis, dados comerciais e estratégicos compartilhados
        durante a prestação dos serviços, não os divulgando a terceiros sem
        autorização prévia por escrito.
      </p>
    ),
  },
  {
    id: 'seguranca',
    title: '8. SEGURANÇA E PROTEÇÃO DE DADOS',
    content: (
      <p className="text-gray-300 leading-relaxed">
        A Bella IT adota medidas e padrões da indústria para proteger os dados
        de seus clientes. O cliente é responsável por manter a segurança de suas
        credenciais de acesso e notificar imediatamente sobre qualquer uso não
        autorizado.
      </p>
    ),
  },
  {
    id: 'pagamento',
    title: '9. PAGAMENTO E FATURAMENTO',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Termos acordados em proposta/contrato</li>
        <li>Suspensão de serviços por atraso no pagamento</li>
        <li>Faturas mensais</li>
        <li>Sem reembolso para serviços já prestados</li>
      </ul>
    ),
  },
  {
    id: 'cancelamento',
    title: '10. CANCELAMENTO E RESCISÃO',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Aviso prévio obrigatório conforme contrato</li>
        <li>Rescisão imediata por violação de termos</li>
        <li>Retenção de dados por 30 dias após o cancelamento</li>
      </ul>
    ),
  },
  {
    id: 'suporte',
    title: '11. SUPORTE TÉCNICO',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>Atendimento de segunda a sexta, das 9h às 18h</li>
        <li>Taxas emergenciais para chamados fora do horário comercial</li>
        <li>Resposta em até 4h para incidentes críticos</li>
      </ul>
    ),
  },
  {
    id: 'atualizacoes',
    title: '12. ATUALIZAÇÕES E MODIFICAÇÕES',
    content: (
      <p className="text-gray-300 leading-relaxed">
        A Bella IT reserva-se o direito de atualizar ou modificar serviços, bem
        como estes Termos e Condições (mediante aviso prévio), ou descontinuar
        serviços (com aviso prévio de 60 dias).
      </p>
    ),
  },
  {
    id: 'lei',
    title: '13. LEI APLICÁVEL',
    content: (
      <p className="text-gray-300 leading-relaxed">
        Estes Termos e Condições são regidos pelas leis da República Federativa
        do Brasil, ficando eleito o foro competente da sede da contratada para
        dirimir quaisquer dúvidas oriundas deste documento.
      </p>
    ),
  },
  {
    id: 'contato',
    title: '14. CONTATO',
    content: (
      <p className="text-gray-300 font-medium">
        Email: comercial@bellait.com.br
      </p>
    ),
  },
]

export default function TermosECondicoes() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#4169E1] selection:text-white pb-20 pt-24">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] to-[#050505] border-b border-[#4169E1]/20 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-[#4169E1] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Voltar para Home
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
            Termos e <span className="text-[#4169E1]">Condições</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Leia atentamente antes de utilizar nossos serviços
          </p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#4169E1]/20 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      <div className="container mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-12 items-start max-w-6xl">
        <aside className="w-full lg:w-1/3 shrink-0 lg:sticky lg:top-32 bg-[#0a0f1d] border border-[#4169E1]/20 rounded-xl p-6 shadow-2xl shadow-[#4169E1]/5">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b border-[#4169E1]/20 pb-4 text-white">
            Índice
          </h2>
          <nav className="flex flex-col space-y-1 max-h-[60vh] overflow-y-auto pr-2">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-left py-2.5 px-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#4169E1]/10 transition-colors flex items-center group"
              >
                <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 text-[#4169E1] transition-opacity shrink-0" />
                <span className="truncate">{section.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="w-full lg:w-2/3 max-w-4xl space-y-12">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-32 border border-gray-800/50 bg-[#0a0f1d]/30 p-6 md:p-8 rounded-xl hover:border-[#4169E1]/30 transition-colors duration-300"
            >
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#4169E1]/10 text-[#4169E1] flex items-center justify-center text-sm border border-[#4169E1]/20 shrink-0">
                  {section.title.split('.')[0]}
                </span>
                {section.title.split('.').slice(1).join('.').trim()}
              </h2>
              <div className="prose prose-invert prose-blue max-w-none">
                {section.content}
              </div>
            </section>
          ))}

          <div className="mt-16 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              Última atualização: 18 de Março de 2026
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
