'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { es } from '@/locales/es'
import { en } from '@/locales/en'

type Language = 'es' | 'en'
type Translations = typeof es

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inicialización sin parpadeos: leer localStorage/navegador antes del primer render
  const getInitialLang = (): Language => {
    if (typeof window === 'undefined') return 'es'
    const saved = (window.localStorage.getItem('language') as Language) || null
    if (saved === 'en' || saved === 'es') return saved
    const browser = navigator.language.split('-')[0]
    return browser === 'en' ? 'en' : 'es'
  }
  const initialLang = getInitialLang()
  const [language, setLanguageState] = useState<Language>(initialLang)
  const [translations, setTranslations] = useState<Translations>(initialLang === 'en' ? en : es)

  // Sincronizar atributo lang del documento cuando cambie
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setTranslations(lang === 'en' ? en : es)
    localStorage.setItem('language', lang)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}






