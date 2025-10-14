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
  const [language, setLanguageState] = useState<Language>('es')
  const [translations, setTranslations] = useState<Translations>(es)

  // Detectar idioma del navegador al cargar
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    const initialLang = browserLang === 'en' ? 'en' : 'es'
    const savedLang = localStorage.getItem('language') as Language
    
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang)
      setTranslations(savedLang === 'en' ? en : es)
    } else {
      setLanguageState(initialLang)
      setTranslations(initialLang === 'en' ? en : es)
      localStorage.setItem('language', initialLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setTranslations(lang === 'en' ? en : es)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
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




