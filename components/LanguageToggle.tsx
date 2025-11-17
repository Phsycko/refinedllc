'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      <button
        onClick={() => setLanguage('es')}
        className={`h-10 w-[48px] px-3 rounded-none text-sm font-medium uppercase tracking-wide transition-colors border inline-flex items-center justify-center flex-shrink-0 ${
          language === 'es'
            ? 'bg-accent text-white border-accent'
            : 'bg-white text-secondary hover:bg-gray-100 border-gray-300'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`h-10 w-[48px] px-3 rounded-none text-sm font-medium uppercase tracking-wide transition-colors border inline-flex items-center justify-center flex-shrink-0 ${
          language === 'en'
            ? 'bg-accent text-white border-accent'
            : 'bg-white text-secondary hover:bg-gray-100 border-gray-300'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}




