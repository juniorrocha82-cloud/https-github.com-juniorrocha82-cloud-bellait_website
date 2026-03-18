import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'pt' | 'en'

interface Translations {
  [key: string]: { [key: string]: string }
}

const translations: Translations = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.partners': 'Parcerias',
    'nav.serviceDesk': 'Service Desk',
    'nav.projects': 'Projetos',
    'nav.consulting': 'Consultoria e Licenças',
    'nav.development': 'Desenvolvimento',
    'footer.legal':
      '© 2026 Bella IT Tecnologia. Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Uso',
    'cookie.message':
      'Usamos cookies para garantir que você obtenha a melhor experiência em nosso site.',
    'cookie.accept': 'Aceitar',
    'whatsapp.label': 'Fale Conosco',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.partners': 'Partnerships',
    'nav.serviceDesk': 'Service Desk',
    'nav.projects': 'Projects',
    'nav.consulting': 'Consulting & Licenses',
    'nav.development': 'Development',
    'footer.legal': '© 2026 Bella IT Tecnologia. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'cookie.message':
      'We use cookies to ensure you get the best experience on our website.',
    'cookie.accept': 'Accept',
    'whatsapp.label': 'Contact Us',
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt')

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children,
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
