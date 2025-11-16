'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('es')}
        className={`px-4 py-2 rounded-none text-base font-medium uppercase tracking-wide transition-colors border ${
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
        className={`px-4 py-2 rounded-none text-base font-medium uppercase tracking-wide transition-colors border ${
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




