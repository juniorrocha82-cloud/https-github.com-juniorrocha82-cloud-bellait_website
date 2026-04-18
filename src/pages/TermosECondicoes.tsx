import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { SECTIONS_PT } from '@/data/termos-pt'
import { SECTIONS_EN } from '@/data/termos-en'

export default function TermosECondicoes() {
  const { language } = useLanguage()

  const isEn = language === 'en'
  const sections = isEn ? SECTIONS_EN : SECTIONS_PT

  const texts = {
    back: isEn ? 'Back to Home' : 'Voltar para Home',
    titlePrefix: isEn
      ? 'TERMS AND CONDITIONS OF USE —'
      : 'TERMOS E CONDIÇÕES DE USO —',
    subtitle: isEn
      ? 'Read carefully before using our services'
      : 'Leia atentamente antes de utilizar nossos serviços',
    index: isEn ? 'Table of Contents' : 'Índice',
    lastUpdate: isEn
      ? 'Last update: March 18, 2026'
      : 'Última atualização: 18 de Março de 2026',
  }

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
            {texts.back}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white uppercase">
            {texts.titlePrefix} <span className="text-[#4169E1]">BELLA IT</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">{texts.subtitle}</p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[#4169E1]/20 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      <div className="container mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-12 items-start max-w-6xl">
        <aside className="w-full lg:w-1/3 shrink-0 lg:sticky lg:top-32 bg-[#0a0f1d] border border-[#4169E1]/20 rounded-xl p-6 shadow-2xl shadow-[#4169E1]/5">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b border-[#4169E1]/20 pb-4 text-white">
            {texts.index}
          </h2>
          <nav className="flex flex-col space-y-1 max-h-[60vh] overflow-y-auto pr-2">
            {sections.map((section) => (
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
          {sections.map((section) => (
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
            <p className="text-gray-500 text-sm">{texts.lastUpdate}</p>
          </div>
        </main>
      </div>
    </div>
  )
}
