'use client'

import Link from 'next/link'
import servicesData from '@/content/services.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ServicesGrid() {
  const { t, language } = useLanguage()

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service) => {
            const title = language === 'en' && service.title_en ? service.title_en : service.title
            const description = language === 'en' && service.description_en ? service.description_en : service.description
            
            return (
              <Link
                key={service.id}
                href={`/servicios/${service.slug}`}
                className="group relative overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-xl hover:scale-105"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center rounded-lg bg-accent/10 p-3">
                      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary line-clamp-3">
                    {description}
                  </p>
                  <div className="mt-4 flex items-center text-accent font-medium text-sm">
                    <span>{t.common.viewMore}</span>
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-light hover:shadow-md"
          >
            {t.services.viewAllServices}
          </Link>
        </div>
      </div>
    </section>
  )
}
