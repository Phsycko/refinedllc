'use client'

import Link from 'next/link'
import servicesData from '@/content/services.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ServicesPage() {
  const { t, language } = useLanguage()

  return (
    <>
      <section className="bg-primary py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t.services.pageTitle}
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              {t.services.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {servicesData.map((service) => {
              const title = language === 'en' && service.title_en ? service.title_en : service.title
              const description = language === 'en' && service.description_en ? service.description_en : service.description
              const serviceCategory = language === 'en' && service.category_en ? service.category_en : service.category
              
              return (
                <Link
                  key={service.id}
                  href={`/servicios/${service.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="aspect-[3/2] bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-8 w-8 sm:h-12 sm:w-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span className="inline-flex items-center rounded-full bg-accent px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-semibold text-white">
                        {serviceCategory}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col h-full">
                    <h3 className="text-base sm:text-lg font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-2">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed flex-grow">
                      {description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-accent font-medium text-xs sm:text-sm">
                        <span>{t.services.viewDetails}</span>
                        <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      {service.price && (
                        <p className="text-xs sm:text-sm font-semibold text-primary">
                          {service.price}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            {t.services.notFound}
          </h2>
          <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4">
            {t.services.notFoundDesc}
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-md bg-accent px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl w-full sm:w-auto justify-center"
          >
            {t.common.contactNow}
          </Link>
        </div>
      </section>
    </>
  )
}
