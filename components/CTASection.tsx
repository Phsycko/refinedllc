'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface CTASectionProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonHref = '/contacto'
}: CTASectionProps) {
  const { t } = useLanguage()
  
  const finalTitle = title || t.cta.title
  const finalDescription = description || t.cta.description
  const finalButtonText = buttonText || t.cta.button
  return (
    <section className="bg-gradient-to-r from-primary to-primary-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {finalTitle}
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            {finalDescription}
          </p>
          <div className="mt-8">
            <Link
              href={buttonHref}
              className="inline-flex items-center rounded-md bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl hover:scale-105"
            >
              {finalButtonText}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

