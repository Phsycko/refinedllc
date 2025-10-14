import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import FloatingParticles from './FloatingParticles'

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
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)'
            }
      }
    >
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 border-2 border-white/20 rotate-45 animate-float animate-glow"></div>
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-blue-400/30 rotate-12 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-10 h-10 border-2 border-purple-400/20 rotate-45 animate-float animate-bounce-slow" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 border-2 border-cyan-400/30 rotate-12 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-indigo-400/20 rounded-full animate-rotate"></div>
        <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-yellow-400/40 rounded-full animate-wiggle"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 animate-fade-in-down text-gradient">
              {title}
            </h1>
            <p className="text-xl leading-8 text-gray-200 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              {subtitle}
            </p>
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                {primaryCTA && (
                  <Link
                    href={primaryCTA.href}
                    className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg hover:from-white hover:to-gray-200 transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-blue-500/25 animate-shimmer"
                  >
                    {primaryCTA.text}
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
                {secondaryCTA && (
                  <Link
                    href={secondaryCTA.href}
                    className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white glass rounded-lg hover:bg-white/30 hover:border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-white/10"
                  >
                    {secondaryCTA.text}
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Attributes */}
      <div className="border-t border-white/10 bg-gradient-to-r from-black/20 via-black/30 to-black/20 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-gradient"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-all duration-300 animate-slide-in-left">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <svg className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors duration-300">{t.hero.attributes.quality}</h3>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-all duration-300">
                <svg className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{t.hero.attributes.innovation}</h3>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.4s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                <svg className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">{t.hero.attributes.expertise}</h3>
            </div>
            <div className="text-center group hover:scale-105 transition-all duration-300 animate-slide-in-right" style={{animationDelay: '0.6s'}}>
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full group-hover:from-cyan-500/30 group-hover:to-teal-500/30 transition-all duration-300">
                <svg className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">{t.hero.attributes.reliability}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


