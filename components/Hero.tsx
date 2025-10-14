import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroProps {
  title: string
  subtitle: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export default function Hero({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  backgroundImage
}: HeroProps) {
  const { t } = useLanguage()
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {
              background: `
                linear-gradient(135deg, 
                  #0f172a 0%, 
                  #1e293b 25%, 
                  #334155 50%, 
                  #1e293b 75%, 
                  #0f172a 100%
                ),
                radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 70%)
              `
            }
      }
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-400/15 rounded-full blur-md"></div>
        
        {/* Geometric shapes to simulate modern architecture */}
        <div className="absolute top-1/3 left-1/2 w-64 h-2 bg-white/10 transform -rotate-12"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-2 bg-white/10 transform rotate-12"></div>
        <div className="absolute top-2/3 left-1/4 w-32 h-1 bg-white/15 transform -rotate-45"></div>
      </div>

      {/* Header Spacer */}
      <div className="h-20"></div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              {title}
            </h1>
            <p className="text-xl leading-8 text-white mb-12 max-w-3xl mx-auto">
              {subtitle}
            </p>
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {primaryCTA && (
                  <Link
                    href={primaryCTA.href}
                    className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary border border-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                  >
                    {primaryCTA.text}
                  </Link>
                )}
                {secondaryCTA && (
                  <Link
                    href={secondaryCTA.href}
                    className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary border border-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                  >
                    {secondaryCTA.text}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Attributes */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">{t.hero.attributes.quality}</h3>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">{t.hero.attributes.innovation}</h3>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">{t.hero.attributes.expertise}</h3>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">{t.hero.attributes.reliability}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


