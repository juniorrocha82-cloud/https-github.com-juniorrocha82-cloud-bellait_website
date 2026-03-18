import { SEO } from '@/components/SEO'
import { useLang } from '@/contexts/LanguageContext'
import { Target, Eye, Heart } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'

export default function SobreNos() {
  const { lang } = useLang()

  return (
    <div className="w-full bg-background pb-20 animate-in fade-in duration-500">
      <SEO
        title={lang === 'pt' ? 'Sobre Nós' : 'About Us'}
        description={
          lang === 'pt'
            ? 'Conheça a história, missão, visão e valores institucionais da Bella IT.'
            : 'Learn about the history, institutional mission, vision and values of Bella IT.'
        }
      />

      <PageHeader
        title={lang === 'pt' ? 'Sobre Nós' : 'About Us'}
        description={
          lang === 'pt'
            ? 'Impulsionando negócios através de tecnologia de ponta e expertise corporativa.'
            : 'Driving business through cutting-edge technology and corporate expertise.'
        }
        imageQuery="office team technology"
      />

      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              {lang === 'pt'
                ? 'Nossa História e Essência'
                : 'Our History and Essence'}
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                {lang === 'pt'
                  ? 'A Bella IT nasceu da paixão por tecnologia e inovação aplicada aos negócios. Desde nossa fundação, temos sido parceiros estratégicos de diversas empresas, auxiliando na transformação digital, otimização de infraestruturas e no suporte diário essencial.'
                  : 'Bella IT was born from a passion for technology and innovation applied to business. Since our foundation, we have been strategic partners for various companies, assisting in digital transformation, infrastructure optimization, and essential daily support.'}
              </p>
              <p>
                {lang === 'pt'
                  ? 'Com uma equipe altamente qualificada, experiente e focada em resultados, entregamos soluções robustas e personalizadas para cada desafio do mercado corporativo, sempre alinhados com as melhores práticas e inovações globais.'
                  : 'With a highly qualified, experienced team focused on results, we deliver robust and customized solutions for every challenge in the corporate market, always aligned with best practices and global innovations.'}
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://img.usecurling.com/p/800/600?q=modern%20server%20room&color=blue"
              alt={
                lang === 'pt'
                  ? 'Infraestrutura Bella IT'
                  : 'Bella IT Infrastructure'
              }
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>

        {/* MVV - Missão, Visão e Valores */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            {lang === 'pt' ? 'Nosso Propósito' : 'Our Purpose'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-md">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {lang === 'pt' ? 'Missão' : 'Mission'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'pt'
                ? 'Prover soluções tecnológicas inovadoras e de alta qualidade que impulsionem o crescimento, a segurança e a eficiência dos nossos clientes, estabelecendo parcerias de longo prazo baseadas em confiança e resultados sólidos.'
                : 'To provide innovative, high-quality technological solutions that drive growth, security, and efficiency for our clients, establishing long-term partnerships based on trust and solid results.'}
            </p>
          </div>

          <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-md">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {lang === 'pt' ? 'Visão' : 'Vision'}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {lang === 'pt'
                ? 'Ser reconhecida como a principal parceira estratégica em TI do mercado nacional, liderando a transformação digital corporativa com excelência operacional, agilidade e responsabilidade técnica.'
                : 'To be recognized as the main strategic IT partner in the national market, leading corporate digital transformation with operational excellence, agility, and technical responsibility.'}
            </p>
          </div>

          <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-md">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {lang === 'pt' ? 'Valores' : 'Values'}
            </h3>
            <ul className="text-slate-600 space-y-3">
              {[
                lang === 'pt'
                  ? 'Ética e Transparência'
                  : 'Ethics and Transparency',
                lang === 'pt' ? 'Inovação Contínua' : 'Continuous Innovation',
                lang === 'pt' ? 'Comprometimento' : 'Commitment',
                lang === 'pt'
                  ? 'Foco absoluto no Cliente'
                  : 'Absolute Customer Focus',
                lang === 'pt' ? 'Excelência Técnica' : 'Technical Excellence',
              ].map((val, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                  <span className="font-medium">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
