import { SEO } from '@/components/SEO'
import { useLang } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Monitor,
  Server,
  Briefcase,
  Handshake,
  Code,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Index() {
  const { lang } = useLang()

  const services = [
    {
      to: '/service-desk',
      icon: <Monitor className="w-8 h-8" />,
      title: 'Service Desk',
      desc:
        lang === 'pt'
          ? 'Suporte especializado para sua operação não parar.'
          : 'Specialized support so your operation never stops.',
    },
    {
      to: '/projetos',
      icon: <Server className="w-8 h-8" />,
      title: lang === 'pt' ? 'Projetos de Tecnologia' : 'Tech Projects',
      desc:
        lang === 'pt'
          ? 'Infraestrutura robusta e soluções sob medida para nuvem e redes.'
          : 'Robust infrastructure and custom solutions for cloud and networks.',
    },
    {
      to: '/consultorias',
      icon: <Briefcase className="w-8 h-8" />,
      title:
        lang === 'pt' ? 'Consultorias e Licenças' : 'Consulting & Licenses',
      desc:
        lang === 'pt'
          ? 'Otimização, compliance e licenciamento inteligente de software.'
          : 'Optimization, compliance, and smart software licensing.',
    },
    {
      to: '/parcerias',
      icon: <Handshake className="w-8 h-8" />,
      title:
        lang === 'pt' ? 'Parcerias Estratégicas' : 'Strategic Partnerships',
      desc:
        lang === 'pt'
          ? 'Trabalhamos em conjunto com as melhores e maiores marcas do mercado.'
          : 'We work together with the best and largest brands in the market.',
    },
    {
      to: '/desenvolvimento',
      icon: <Code className="w-8 h-8" />,
      title: lang === 'pt' ? 'Desenvolvimento' : 'Development',
      desc:
        lang === 'pt'
          ? 'Fábrica de software, aplicações modernas e integrações de sistemas.'
          : 'Software factory, modern applications, and system integrations.',
    },
  ]

  return (
    <div className="w-full bg-background animate-in fade-in duration-500">
      <SEO
        title="Home"
        description={
          lang === 'pt'
            ? 'Bella IT - Soluções corporativas completas em Tecnologia.'
            : 'Bella IT - Complete corporate technology solutions.'
        }
      />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/40 z-10"></div>
        <img
          src="https://img.usecurling.com/p/1600/900?q=modern%20tech%20office&color=blue"
          alt="Tecnologia Bella IT"
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-6 w-full mt-10">
          <div className="max-w-3xl animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-block bg-primary/20 text-primary-foreground backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-primary/30">
              {lang === 'pt'
                ? 'Parceiro Estratégico em TI'
                : 'Strategic IT Partner'}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              {lang === 'pt'
                ? 'Tecnologia que impulsiona o seu negócio.'
                : 'Technology that drives your business.'}
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light">
              {lang === 'pt'
                ? 'Soluções corporativas completas em infraestrutura, suporte, desenvolvimento e licenciamento.'
                : 'Complete corporate solutions in infrastructure, support, development, and licensing.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 h-14 text-lg"
              >
                <Link to="/sobre-nos">
                  {lang === 'pt' ? 'Conheça a Bella IT' : 'Know Bella IT'}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-14 text-lg border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link to="/projetos">
                  {lang === 'pt' ? 'Nossos Projetos' : 'Our Projects'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              {lang === 'pt' ? 'Nossas Especialidades' : 'Our Specialties'}
            </h2>
            <p className="text-lg text-slate-600">
              {lang === 'pt'
                ? 'Oferecemos um portfólio completo de serviços desenhado para atender e superar todas as necessidades tecnológicas da sua empresa.'
                : 'We offer a complete portfolio of services designed to meet and exceed all your company technological needs.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.to}
                className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-slate-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex items-center text-primary font-semibold mt-auto group-hover:translate-x-2 transition-transform">
                  {lang === 'pt' ? 'Saiba mais' : 'Learn more'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
