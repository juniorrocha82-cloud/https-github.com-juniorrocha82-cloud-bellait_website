import React, { createContext, useContext, useState, useEffect } from 'react'

type Lang = 'pt' | 'en'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextType>({
  lang: 'pt',
  setLang: () => {},
})

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>('pt')

  useEffect(() => {
    const saved = localStorage.getItem('bella-it-lang') as Lang
    if (saved && (saved === 'pt' || saved === 'en')) {
      setLang(saved)
    }
  }, [])

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem('bella-it-lang', newLang)
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
