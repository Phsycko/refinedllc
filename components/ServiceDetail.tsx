'use client'

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
  image: string
  gallery: string[]
  price: string
  layout?: string
  size?: string
  buildingType?: string
  location?: string
  allInCost?: string
  beforeImages?: string[]
  review?: {
    stars: number
    text: string
    author: string
  }
}

interface ServiceDetailProps {
  service: Service
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const { language, t } = useLanguage()

  // Get the correct translations based on language
  const title = language === 'en' && service.title_en ? service.title_en : service.title
  const description = language === 'en' && service.description_en ? service.description_en : service.description
  const fullDescription = language === 'en' && service.fullDescription_en ? service.fullDescription_en : service.fullDescription
  const category = language === 'en' && service.category_en ? service.category_en : service.category
  const layout = language === 'en' && (service as any).layout_en ? (service as any).layout_en : service.layout
  const size = language === 'en' && (service as any).size_en ? (service as any).size_en : service.size
  const buildingType = language === 'en' && (service as any).buildingType_en ? (service as any).buildingType_en : service.buildingType
  const location = language === 'en' && (service as any).location_en ? (service as any).location_en : service.location
  const allInCost = language === 'en' && (service as any).allInCost_en ? (service as any).allInCost_en : service.allInCost
  const features = language === 'en' && (service as any).features_en ? (service as any).features_en : service.features

  return (
    <div className="min-h-screen bg-white">
      {/* Header Prompt */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-center">
            <span className="text-xs sm:text-sm text-gray-600">{t.serviceDetail.interested}</span>
            <a href="/contacto" className="text-xs sm:text-sm text-gray-800 hover:text-accent transition-colors font-medium">
              {t.serviceDetail.tellUs}
            </a>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <span>{language === 'en' ? 'Services Gallery' : 'Galería de Servicios'}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{title}</span>
          </div>
        </nav>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Side - Main Image */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Project Image */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 flex items-center justify-center">
                <div className="text-center p-6 sm:p-8">
                  <svg className="h-16 w-16 sm:h-24 sm:w-24 text-secondary/30 mx-auto mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-xs sm:text-sm text-secondary/50 font-medium">
                    {title} - {t.serviceDetail.mainView}
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {service.gallery && service.gallery.slice(0, 3).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md">
                  <div className="w-full h-full bg-gradient-to-br from-secondary/15 to-accent/10 flex items-center justify-center">
                    <svg className="h-6 w-6 sm:h-8 sm:w-8 text-secondary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Project Details */}
          <div className="space-y-6 sm:space-y-8">
            {/* Project Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary leading-tight">
              {title}
            </h1>

            {/* Project Specifications */}
            <div className="space-y-3 sm:space-y-4">
              {layout && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">{t.serviceDetail.layout}</span>
                  <span className="text-sm sm:text-base font-medium text-gray-900 text-right">{layout}</span>
                </div>
              )}
              {size && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">{t.serviceDetail.size}</span>
                  <span className="text-sm sm:text-base font-medium text-gray-900 text-right">{size}</span>
                </div>
              )}
              {buildingType && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">{t.serviceDetail.buildingType}</span>
                  <span className="text-sm sm:text-base font-medium text-gray-900 text-right">{buildingType}</span>
                </div>
              )}
              {location && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">{t.serviceDetail.location}</span>
                  <span className="text-sm sm:text-base font-medium text-gray-900 text-right">{location}</span>
                </div>
              )}
              {allInCost && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-600">{t.serviceDetail.totalCost}</span>
                  <span className="text-sm sm:text-base font-medium text-gray-900 text-right">{allInCost}</span>
                </div>
              )}
            </div>

            {/* Full Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">{language === 'en' ? 'Full Description' : 'Descripción Completa'}</h3>
              <p className="text-secondary leading-relaxed">
                {fullDescription}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">{language === 'en' ? 'Features' : 'Características'}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-secondary">
                {features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Before Images Section */}
            {service.beforeImages && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">{t.serviceDetail.beforeImages}</h3>
                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                    {t.serviceDetail.viewBeforeImages}
                  </button>
                </div>
                <div className="flex space-x-3 sm:space-x-4">
                  {service.beforeImages.slice(0, 1).map((image, index) => (
                    <div key={index} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shadow-sm">
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Review Section */}
            {service.review && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">{t.serviceDetail.review}</h3>
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[...Array(service.review.stars)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    &ldquo;{service.review.text}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
