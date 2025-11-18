'use client'

import Link from 'next/link'
import Image from 'next/image'
import servicesData from '@/content/services.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ServicesGrid() {
  const { t, language } = useLanguage()

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl min-h-[2.75rem] sm:min-h-[3.25rem]">
            {t.services.title}
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto min-h-[3.5rem]">
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
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg bg-gray-200">
                  {(() => {
                    // Función para obtener la URL correcta de Google Drive
                    const getImageUrl = (url: string) => {
                      if (!url) return ''
                      
                      // Si ya es una URL de uc?export=view, usarla directamente
                      if (url.includes('/uc?export=view&id=')) {
                        return url
                      }
                      
                      // Si es una URL de file/d/, convertirla
                      if (url.includes('drive.google.com/file/d/')) {
                        const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
                        if (match && match[1]) {
                          return `https://drive.google.com/uc?export=view&id=${match[1]}`
                        }
                      }
                      
                      return url
                    }
                    
                    const imageUrl = getImageUrl(service.image || '')
                    
                    return imageUrl.startsWith('http') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const currentUrl = e.currentTarget.src
                          if (currentUrl.includes('drive.google.com/uc?export=view&id=')) {
                            const id = currentUrl.match(/id=([a-zA-Z0-9_-]+)/)?.[1]
                            if (id) {
                              e.currentTarget.src = `https://lh3.googleusercontent.com/d/${id}=w800-h600`
                            }
                          }
                        }}
                      />
                    ) : (
                      <Image
                        src={service.image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )
                  })()}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors min-h-[1.75rem]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary line-clamp-3 min-h-[3.25rem]">
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
