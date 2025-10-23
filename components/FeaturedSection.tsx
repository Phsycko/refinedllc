'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function FeaturedSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.featured.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.featured.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.featured.feature1.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.featured.feature1.description}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.featured.feature2.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.featured.feature2.description}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t.featured.feature3.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.featured.feature3.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
