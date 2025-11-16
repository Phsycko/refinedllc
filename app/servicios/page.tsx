'use client'

import Link from 'next/link'
import Image from 'next/image'
import servicesData from '@/content/services.json'
import { useLanguage } from '@/contexts/LanguageContext'
import HeaderSimple from '@/components/HeaderSimple'

export default function ServicesPage() {
  const { t, language } = useLanguage()

  return (
    <>
      <HeaderSimple />
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {t.services.pageTitle}
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              {t.services.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((service) => {
              const title = language === 'en' && service.title_en ? service.title_en : service.title
              const description = language === 'en' && service.description_en ? service.description_en : service.description
              
              return (
                <Link
                  key={service.id}
                  href={`/servicios/${service.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                      {title}
                    </h3>
                    <p className="mt-3 text-secondary">
                      {description}
                    </p>
                    <div className="mt-4 flex items-center text-accent font-medium text-sm">
                      <span>{t.services.viewDetails}</span>
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    {service.price && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-semibold text-primary">
                          {service.price}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.services.notFound}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.services.notFoundDesc}
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-md bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl"
          >
            {t.common.contactNow}
          </Link>
        </div>
      </section>
    </>
  )
}
