import { Link } from 'react-router-dom'
import { useLang } from '@/contexts/LanguageContext'

export function Footer() {
  const { lang } = useLang()

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <h3 className="text-white font-bold text-2xl">Bella IT</h3>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              {lang === 'pt'
                ? 'Soluções completas e inovadoras em TI para impulsionar o sucesso da sua empresa com segurança e performance.'
                : 'Complete and innovative IT solutions to drive your company success with security and performance.'}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              {lang === 'pt' ? 'Serviços' : 'Services'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/service-desk"
                  className="hover:text-white transition-colors"
                >
                  Service Desk
                </Link>
              </li>
              <li>
                <Link
                  to="/projetos"
                  className="hover:text-white transition-colors"
                >
                  {lang === 'pt'
                    ? 'Projetos de Tecnologia'
                    : 'Technology Projects'}
                </Link>
              </li>
              <li>
                <Link
                  to="/consultorias"
                  className="hover:text-white transition-colors"
                >
                  {lang === 'pt'
                    ? 'Consultorias e Licenças'
                    : 'Consulting & Licenses'}
                </Link>
              </li>
              <li>
                <Link
                  to="/desenvolvimento"
                  className="hover:text-white transition-colors"
                >
                  {lang === 'pt' ? 'Desenvolvimento' : 'Development'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              {lang === 'pt' ? 'Institucional' : 'Institutional'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/sobre-nos"
                  className="hover:text-white transition-colors"
                >
                  {lang === 'pt' ? 'Sobre Nós' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link
                  to="/parcerias"
                  className="hover:text-white transition-colors"
                >
                  {lang === 'pt'
                    ? 'Parcerias Estratégicas'
                    : 'Strategic Partnerships'}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">
              {lang === 'pt' ? 'Contato' : 'Contact'}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Email: contato@bellait.com.br</li>
              <li>WhatsApp: +55 (11) 99936-8850</li>
              <li>São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <p>
            © {new Date().getFullYear()} Bella IT.{' '}
            {lang === 'pt'
              ? 'Todos os direitos reservados.'
              : 'All rights reserved.'}
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-white transition-colors">
              {lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              {lang === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
