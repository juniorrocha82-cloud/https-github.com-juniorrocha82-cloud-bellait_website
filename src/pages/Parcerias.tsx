import { SEO } from '@/components/SEO'
import { useLang } from '@/contexts/LanguageContext'
import { PageHeader } from '@/components/PageHeader'

export default function Parcerias() {
  const { lang } = useLang()

  // Real brands requested by tech context
  const partners = ['microsoft', 'cisco', 'dell', 'lenovo', 'hp', 'vmware']

  return (
    <div className="w-full bg-background pb-20 animate-in fade-in duration-500">
      <SEO
        title={
          lang === 'pt' ? 'Parcerias Estratégicas' : 'Strategic Partnerships'
        }
        description={
          lang === 'pt'
            ? 'Trabalhamos com os melhores parceiros e fabricantes de tecnologia do mercado.'
            : 'We work with the best technology partners and manufacturers in the market.'
        }
      />
      <PageHeader
        title={
          lang === 'pt' ? 'Parcerias Estratégicas' : 'Strategic Partnerships'
        }
        description={
          lang === 'pt'
            ? 'Alianças com líderes globais para entregar excelência.'
            : 'Alliances with global leaders to deliver excellence.'
        }
        imageQuery="handshake business deal"
      />

      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
          {lang === 'pt'
            ? 'Garantia de Qualidade e Inovação'
            : 'Quality Assurance and Innovation'}
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-20 leading-relaxed">
          {lang === 'pt'
            ? 'A Bella IT estabelece alianças estratégicas com os maiores fabricantes de hardware e software do mundo. Isso nos permite oferecer as melhores soluções técnicas com condições comerciais exclusivas para nossos clientes.'
            : 'Bella IT establishes strategic alliances with the world largest hardware and software manufacturers. This allows us to offer the best technical solutions with exclusive commercial conditions for our clients.'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 items-center justify-items-center opacity-70">
          {partners.map((p) => (
            <img
              key={p}
              src={`https://img.usecurling.com/i?q=${p}&color=solid-black`}
              alt={`Parceiro ${p}`}
              className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 cursor-pointer"
            />
          ))}
        </div>
      </section>
    </div>
  )
}
