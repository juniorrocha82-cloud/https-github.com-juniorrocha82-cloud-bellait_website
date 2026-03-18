import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'pt' | 'en'

const translations: Record<string, Record<string, string>> = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.partners': 'Parcerias',
    'nav.serviceDesk': 'Service Desk',
    'nav.projects': 'Projetos',
    'nav.consulting': 'Consultoria e Licenças',
    'nav.development': 'Desenvolvimento',
    'footer.desc':
      'Transformando negócios com tecnologia inteligente e soluções personalizadas de TI para o mercado corporativo.',
    'footer.quickLinks': 'Links Rápidos',
    'footer.services': 'Serviços',
    'footer.contact': 'Contato',
    'footer.legal': '© 2026 Bella IT Tecnologia. Todos os direitos reservados.',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Uso',
    'cookie.message':
      'Usamos cookies para garantir que você obtenha a melhor experiência em nosso site.',
    'cookie.accept': 'Aceitar',
    'whatsapp.label': 'Fale Conosco',
    'home.meta.desc':
      'Bella IT Tecnologia - Transformando negócios com tecnologia inteligente e soluções personalizadas em TI.',
    'home.hero.title1': 'Tecnologia que impulsiona o seu',
    'home.hero.highlight': 'sucesso',
    'home.hero.subtitle':
      'Oferecemos soluções completas em infraestrutura, desenvolvimento e consultoria de TI para elevar o seu negócio ao próximo nível.',
    'home.hero.projects': 'Nossos Projetos',
    'home.hero.about': 'Conheça a Bella IT',
    'home.services.title': 'Nossos Serviços',
    'home.services.subtitle':
      'Especialistas prontos para resolver seus desafios tecnológicos.',
    'home.services.sd.title': 'Service Desk',
    'home.services.sd.desc':
      'Suporte ágil e eficiente para garantir a continuidade da sua operação.',
    'home.services.dev.title': 'Desenvolvimento',
    'home.services.dev.desc':
      'Softwares sob medida para automatizar e otimizar seus processos.',
    'home.services.cons.title': 'Consultoria',
    'home.services.cons.desc':
      'Planejamento estratégico e licenciamento de softwares corporativos.',
    'home.services.learnMore': 'Saber mais',
    'about.meta.desc':
      'Conheça a missão, visão e valores da Bella IT Tecnologia. Inovação e excelência em serviços de tecnologia.',
    'about.header.title': 'Sobre a Bella IT',
    'about.header.desc':
      'Nossa história, propósito e os valores que nos guiam em cada projeto.',
    'about.who.title': 'Quem Somos',
    'about.who.desc':
      'A Bella IT é uma empresa de tecnologia focada em entregar soluções de ponta para negócios de todos os tamanhos. Nascemos com o propósito de descomplicar a TI, trazendo inovação, segurança e eficiência para o dia a dia das empresas corporativas.',
    'about.mission.title': 'Missão',
    'about.mission.desc':
      'Prover soluções tecnológicas inovadoras e de alta qualidade, garantindo a satisfação de nossos clientes e contribuindo para o crescimento e segurança de seus negócios.',
    'about.vision.title': 'Visão',
    'about.vision.desc':
      'Ser reconhecida nacionalmente como a principal parceira estratégica em tecnologia da informação, destacando-se pela excelência, transparência e confiabilidade de entrega.',
    'about.values.title': 'Valores',
    'about.values.1': 'Inovação Contínua',
    'about.values.2': 'Ética e Transparência',
    'about.values.3': 'Foco no Cliente',
    'about.values.4': 'Excelência Operacional',
    'sd.meta.desc':
      'Suporte técnico especializado de TI N1, N2 e N3 para garantir a continuidade e produtividade da sua equipe.',
    'sd.header.title': 'Service Desk',
    'sd.header.desc':
      'Suporte técnico ágil e eficiente para que a sua operação nunca pare.',
    'sd.content.title': 'Atendimento que faz a diferença',
    'sd.content.desc':
      'Oferecemos suporte técnico completo e estruturado em níveis (N1, N2 e N3) para resolver desde problemas cotidianos até incidentes críticos, garantindo a estabilidade e a continuidade do seu negócio com SLAs bem definidos.',
    'sd.feat1.title': 'Tempo de Resposta Rápido',
    'sd.feat1.desc':
      'Monitoramento proativo do ambiente e atendimento imediato para chamados classificados como urgentes.',
    'sd.feat2.title': 'Resolução Especializada',
    'sd.feat2.desc':
      'Técnicos amplamente capacitados e experientes para diagnosticar e solucionar problemas complexos de infraestrutura e software.',
    'sd.cta': 'Solicitar Atendimento Agora',
    'proj.meta.desc':
      'Implementação de infraestrutura, migração para nuvem e projetos de redes corporativas avançadas.',
    'proj.header.title': 'Projetos de Tecnologia',
    'proj.header.desc':
      'Arquitetura, planejamento minucioso e execução de projetos de infraestrutura de TI.',
    'proj.cloud.title': 'Migração para Nuvem',
    'proj.cloud.desc':
      'Planejamos e executamos a migração estruturada dos seus serviços e dados para plataformas cloud seguras, garantindo alta disponibilidade, redução de custos e escalabilidade sob demanda.',
    'proj.server.title': 'Infraestrutura de Servidores',
    'proj.server.desc':
      'Montagem física, configuração lógica e virtualização de servidores locais ou híbridos, dimensionados exatamente para suportar a sua demanda atual de processamento e crescimento futuro.',
    'proj.network.title': 'Redes Corporativas',
    'proj.network.desc':
      'Estruturação avançada de redes cabeadas e Wi-Fi de alta performance, com foco estrito em segurança, estabilidade de conexão e segmentação adequada de acessos por departamento.',
    'cons.meta.desc':
      'Serviços de consultoria em TI, licenciamento de software corporativo e adequação tecnológica.',
    'cons.header.title': 'Consultorias e Licenças',
    'cons.header.desc':
      'Orientação especializada para otimizar seus investimentos em tecnologia.',
    'cons.content.title': 'Decisões mais inteligentes para o seu negócio',
    'cons.content.desc':
      'Nossa equipe de especialistas analisa a infraestrutura atual da sua empresa e propõe melhorias estratégicas, garantindo que você utilize as ferramentas mais adequadas com o melhor custo-benefício do mercado.',
    'cons.feat1': 'Mapeamento completo e análise de infraestrutura de TI',
    'cons.feat2': 'Gestão e regularização de licenças (Microsoft, Veeam, etc)',
    'cons.feat3': 'Consultoria dedicada em segurança da informação e LGPD',
    'dev.meta.desc':
      'Criação de softwares sob medida, aplicativos web e mobile para impulsionar a inovação da sua empresa corporativa.',
    'dev.header.title': 'Desenvolvimento',
    'dev.header.desc':
      'Sistemas personalizados criados para resolver os desafios únicos do seu negócio.',
    'dev.content.title': 'Inovação sob Medida',
    'dev.content.desc':
      'Do planejamento inicial ao deploy final, nossa equipe de desenvolvimento cria soluções robustas, escaláveis e intuitivas, utilizando as tecnologias mais modernas do mercado para alavancar os seus resultados.',
    'dev.web.title': 'Sistemas Web',
    'dev.web.desc':
      'Aplicações completas, rápidas e responsivas, acessíveis de qualquer lugar com máxima segurança.',
    'dev.mobile.title': 'Aplicativos Mobile',
    'dev.mobile.desc':
      'Soluções nativas ou híbridas de alto desempenho para plataformas iOS e Android.',
    'dev.api.title': 'Integrações de API',
    'dev.api.desc':
      'Conectamos seus sistemas legados para garantir fluidez, automação e segurança dos dados.',
    'part.meta.desc':
      'Conheça os parceiros tecnológicos da Bella IT: Ingram Micro, Veeam, Microsoft, Dell e Trend Micro.',
    'part.header.title': 'Parcerias Estratégicas',
    'part.header.desc':
      'Trabalhamos em conjunto com os líderes globais de tecnologia para entregar as melhores soluções.',
    'part.content.title': 'Nossos Parceiros de Tecnologia',
    'part.content.desc':
      'Para garantir a máxima qualidade e segurança em nossos projetos, firmamos parcerias com as maiores empresas de tecnologia do mundo. Isso nos permite oferecer soluções robustas, escaláveis e com o melhor custo-benefício.',
    'part.ingram.desc':
      'Distribuição global de soluções de TI e suprimentos de tecnologia corporativa.',
    'part.veeam.desc':
      'Líder em soluções de backup, recuperação e gestão segura de dados em nuvem.',
    'part.microsoft.desc':
      'Sistemas operacionais, nuvem Azure e ferramentas completas de produtividade.',
    'part.dell.desc':
      'Fornecimento de infraestrutura robusta, servidores e hardware corporativo de ponta.',
    'part.trend.desc':
      'Especialistas em cibersegurança e proteção avançada de dados corporativos.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.partners': 'Partnerships',
    'nav.serviceDesk': 'Service Desk',
    'nav.projects': 'Projects',
    'nav.consulting': 'Consulting & Licenses',
    'nav.development': 'Development',
    'footer.desc':
      'Transforming businesses with intelligent technology and custom IT solutions for the corporate market.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.legal': '© 2026 Bella IT Tecnologia. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'cookie.message':
      'We use cookies to ensure you get the best experience on our website.',
    'cookie.accept': 'Accept',
    'whatsapp.label': 'Talk to Us',
    'home.meta.desc':
      'Bella IT Technology - Transforming businesses with intelligent technology and customized IT solutions.',
    'home.hero.title1': 'Technology that drives your',
    'home.hero.highlight': 'success',
    'home.hero.subtitle':
      'We offer complete solutions in infrastructure, development, and IT consulting to take your business to the next level.',
    'home.hero.projects': 'Our Projects',
    'home.hero.about': 'Meet Bella IT',
    'home.services.title': 'Our Services',
    'home.services.subtitle':
      'Experts ready to solve your technological challenges.',
    'home.services.sd.title': 'Service Desk',
    'home.services.sd.desc':
      'Agile and efficient support to ensure your operation continuity.',
    'home.services.dev.title': 'Development',
    'home.services.dev.desc':
      'Tailor-made software to automate and optimize your processes.',
    'home.services.cons.title': 'Consulting',
    'home.services.cons.desc':
      'Strategic planning and corporate software licensing.',
    'home.services.learnMore': 'Learn more',
    'about.meta.desc':
      'Learn about the mission, vision, and values of Bella IT Technology. Innovation and excellence in technology services.',
    'about.header.title': 'About Bella IT',
    'about.header.desc':
      'Our history, purpose, and the values that guide us in every project.',
    'about.who.title': 'Who We Are',
    'about.who.desc':
      'Bella IT is a technology company focused on delivering cutting-edge solutions for businesses of all sizes. We were born with the purpose of simplifying IT, bringing innovation, security, and efficiency to the daily routine of corporate companies.',
    'about.mission.title': 'Mission',
    'about.mission.desc':
      "Provide innovative and high-quality technological solutions, ensuring our clients' satisfaction and contributing to the growth and security of their businesses.",
    'about.vision.title': 'Vision',
    'about.vision.desc':
      'To be nationally recognized as the main strategic partner in information technology, standing out for excellence, transparency, and delivery reliability.',
    'about.values.title': 'Values',
    'about.values.1': 'Continuous Innovation',
    'about.values.2': 'Ethics and Transparency',
    'about.values.3': 'Customer Focus',
    'about.values.4': 'Operational Excellence',
    'sd.meta.desc':
      'Specialized IT support N1, N2, and N3 to ensure the continuity and productivity of your team.',
    'sd.header.title': 'Service Desk',
    'sd.header.desc':
      'Agile and efficient technical support so your operation never stops.',
    'sd.content.title': 'Service that makes a difference',
    'sd.content.desc':
      'We offer complete and structured technical support in levels (N1, N2, and N3) to solve everything from everyday problems to critical incidents, ensuring the stability and continuity of your business with well-defined SLAs.',
    'sd.feat1.title': 'Fast Response Time',
    'sd.feat1.desc':
      'Proactive environment monitoring and immediate response to calls classified as urgent.',
    'sd.feat2.title': 'Specialized Resolution',
    'sd.feat2.desc':
      'Highly trained and experienced technicians to diagnose and solve complex infrastructure and software problems.',
    'sd.cta': 'Request Service Now',
    'proj.meta.desc':
      'Infrastructure implementation, cloud migration, and advanced corporate network projects.',
    'proj.header.title': 'Technology Projects',
    'proj.header.desc':
      'Architecture, meticulous planning, and execution of IT infrastructure projects.',
    'proj.cloud.title': 'Cloud Migration',
    'proj.cloud.desc':
      'We plan and execute the structured migration of your services and data to secure cloud platforms, ensuring high availability, cost reduction, and on-demand scalability.',
    'proj.server.title': 'Server Infrastructure',
    'proj.server.desc':
      'Physical assembly, logical configuration, and virtualization of local or hybrid servers, sized exactly to support your current processing demand and future growth.',
    'proj.network.title': 'Corporate Networks',
    'proj.network.desc':
      'Advanced structuring of high-performance wired and Wi-Fi networks, strictly focused on security, connection stability, and proper segmentation of access by department.',
    'cons.meta.desc':
      'IT consulting services, corporate software licensing, and technological adaptation.',
    'cons.header.title': 'Consulting & Licenses',
    'cons.header.desc':
      'Expert guidance to optimize your technology investments.',
    'cons.content.title': 'Smarter decisions for your business',
    'cons.content.desc':
      "Our team of experts analyzes your company's current infrastructure and proposes strategic improvements, ensuring that you use the most appropriate tools with the best cost-benefit ratio on the market.",
    'cons.feat1': 'Complete mapping and analysis of IT infrastructure',
    'cons.feat2':
      'Management and regularization of licenses (Microsoft, Veeam, etc)',
    'cons.feat3': 'Dedicated consulting in information security and LGPD',
    'dev.meta.desc':
      "Creation of customized software, web and mobile applications to drive your corporate company's innovation.",
    'dev.header.title': 'Development',
    'dev.header.desc':
      "Custom systems created to solve your business's unique challenges.",
    'dev.content.title': 'Tailor-made Innovation',
    'dev.content.desc':
      'From initial planning to final deployment, our development team creates robust, scalable, and intuitive solutions using the most modern technologies on the market to leverage your results.',
    'dev.web.title': 'Web Systems',
    'dev.web.desc':
      'Complete, fast, and responsive applications, accessible from anywhere with maximum security.',
    'dev.mobile.title': 'Mobile Applications',
    'dev.mobile.desc':
      'Native or hybrid high-performance solutions for iOS and Android platforms.',
    'dev.api.title': 'API Integrations',
    'dev.api.desc':
      'We connect your legacy systems to ensure fluidity, automation, and data security.',
    'part.meta.desc':
      "Meet Bella IT's technological partners: Ingram Micro, Veeam, Microsoft, Dell, and Trend Micro.",
    'part.header.title': 'Strategic Partnerships',
    'part.header.desc':
      'We work together with global technology leaders to deliver the best solutions.',
    'part.content.title': 'Our Technology Partners',
    'part.content.desc':
      'To ensure maximum quality and security in our projects, we partner with the largest technology companies in the world. This allows us to offer robust, scalable, and cost-effective solutions.',
    'part.ingram.desc':
      'Global distribution of IT solutions and corporate technology supplies.',
    'part.veeam.desc':
      'Leader in backup, recovery, and secure cloud data management solutions.',
    'part.microsoft.desc':
      'Operating systems, Azure cloud, and complete productivity tools.',
    'part.dell.desc':
      'Providing robust infrastructure, servers, and cutting-edge corporate hardware.',
    'part.trend.desc':
      'Experts in cybersecurity and advanced corporate data protection.',
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
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'pt'
  })

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang)
    setLanguageState(lang)
  }

  const t = (key: string) => {
    return translations[language]?.[key] || key
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
