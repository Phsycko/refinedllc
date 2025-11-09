'use client'

import CTASection from '@/components/CTASection'
import HeaderSimple from '@/components/HeaderSimple'
import { useLanguage } from '@/contexts/LanguageContext'

interface Service {
  id: number
  slug: string
  title: string
  title_en?: string
  category: string
  category_en?: string
  description: string
  description_en?: string
  fullDescription: string
  fullDescription_en?: string
  features: string[]
  features_en?: string[]
  image: string
  gallery?: string[]
  price?: string
  price_en?: string
}

interface ServiceDetailClientProps {
  service: Service
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const { t, language } = useLanguage()

  return (
    <>
      <HeaderSimple />
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-semibold text-white">
                {language === 'en' && service.category_en ? service.category_en : service.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {language === 'en' && service.title_en ? service.title_en : service.title}
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              {language === 'en' && service.description_en ? service.description_en : service.description}
            </p>
            {service.price && (
              <p className="mt-4 text-xl font-semibold text-accent">
                {language === 'en' && service.price_en ? service.price_en : service.price}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-secondary leading-relaxed">
              {language === 'en' && service.fullDescription_en ? service.fullDescription_en : service.fullDescription}
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {t.serviceDetail.serviceFeatures}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-secondary">
                    {language === 'en' && service.features_en ? service.features_en[index] : feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {service.gallery && service.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t.serviceDetail.projectGallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`${language === 'en' && service.title_en ? service.title_en : service.title} - ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title={t.serviceDetail.interestedTitle}
        description={t.serviceDetail.interestedDesc}
        buttonText={t.serviceDetail.requestQuote}
      />
    </>
  )
}

