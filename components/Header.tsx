'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'
import companyDataEs from '@/content/company.json'
import companyDataEn from '@/content/company-en.json'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t, language } = useLanguage()
  const companyData = language === 'en' ? companyDataEn : companyDataEs

  // Array de servicios con sus imágenes - EDITABLE desde el panel de admin
  const services = companyData.hero?.carouselServices || []

  // Efecto para cambiar imágenes automáticamente cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => 
        prevIndex === services.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [services.length])

  // Efecto para detectar scroll
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          // Scroll más sutil - aparece gradualmente
          setIsScrolled(scrollTop > 30)
          ticking = false
        })
        ticking = true
      }
    }

    // Verificar posición inicial
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/servicios', label: t.nav.services },
    { href: '/proyectos', label: t.nav.projects },
    { href: '/sobre', label: t.nav.about },
    { href: '/contacto', label: t.nav.contact },
  ]

  return (
    <>
      {/* Header fijo que aparece al hacer scroll */}
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-700 ease-out ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-xl opacity-100 transform translate-y-0' 
          : 'bg-transparent opacity-0 pointer-events-none transform -translate-y-2'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-32 w-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.jpg" 
                alt="Refined LLC" 
                className={`h-full w-auto transition-all duration-300 ${
                  isScrolled ? 'filter brightness-0' : 'filter brightness-0 invert'
                }`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-900 hover:text-gray-600' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageToggle />
            <Link
              href="/contacto"
              className={`rounded-md px-6 py-2.5 text-sm font-semibold shadow-sm transition-all hover:shadow-md ${
                isScrolled
                  ? 'bg-accent text-white hover:bg-accent-dark'
                  : 'bg-accent text-white hover:bg-accent-dark'
              }`}
            >
              {t.nav.quote}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`md:hidden rounded-md p-3 transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-900 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className={`px-2 pb-3 pt-2 space-y-1 backdrop-blur-sm border-t rounded-b-lg transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/95 border-gray-200' 
                : 'bg-black/50 border-white/20'
            }`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-300 ${
                    isScrolled
                      ? 'text-gray-900 hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageToggle />
              </div>
              <Link
                href="/contacto"
                className="block w-full px-3 py-2 text-center text-base font-medium text-white bg-accent hover:bg-accent-dark rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.quote}
              </Link>
            </div>
          </div>
        )}
        </div>
      </nav>

      {/* Hero section con carrusel */}
      <header className="relative w-full h-screen overflow-hidden">
        {/* Carrusel de imágenes */}
        <div className="absolute inset-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentServiceIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay oscuro semitransparente */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Contenido del hero */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Contenido alineado a la izquierda - Diseño profesional */}
          <div className="flex-1 flex items-center justify-start">
            <div className="text-left text-white max-w-4xl px-8 lg:px-12 ml-8 lg:ml-16">
              {/* Título principal - Diseño elegante */}
              <h1 className="text-4xl md:text-6xl font-light mb-6 leading-[0.9] tracking-tight">
                <span className="block font-extralight text-white/95">{companyData.hero?.title?.line1 || 'Transforming'}</span>
                <span className="block font-light text-white/90">{companyData.hero?.title?.line2 || 'Visions into'}</span>
                <span className="block font-bold text-white text-5xl md:text-7xl mt-2">{companyData.hero?.title?.line3 || 'Reality'}</span>
              </h1>
              
              {/* Subtítulo - Tipografía refinada */}
              <p className="text-lg md:text-xl mb-8 text-white/85 font-light leading-relaxed max-w-2xl">
                {companyData.hero?.subtitle || 'World-class architectural design and construction.'}<br />
                <span className="text-white/75">{companyData.hero?.description || 'Over 9 years creating exceptional spaces that exceed expectations.'}</span>
              </p>
              
              {/* Botón CTA - Diseño profesional */}
              <div className="flex justify-start">
                <Link
                  href={companyData.hero?.ctaLink || '/contacto'}
                  className="group relative bg-white text-gray-900 font-medium py-3 px-6 rounded-sm transition-all duration-500 hover:bg-gray-50 text-base tracking-wide uppercase letter-spacing-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="relative z-10">{companyData.hero?.ctaText || 'TALK TO US'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"></div>
                </Link>
              </div>
            </div>
          </div>

        {/* Tarjeta de servicios - PEGADA A LA ESQUINA */}
        <div className="absolute bottom-0 right-0 z-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-tl-lg shadow-lg border border-white/20 p-4 sm:p-8 w-[420px] sm:w-[560px] h-[100px] sm:h-[120px]">
            <div className="flex items-center justify-between h-full">
              {/* Botones de navegación a la izquierda */}
              <div className="flex flex-col space-y-1 sm:space-y-2">
                <button
                  onClick={() => setCurrentServiceIndex((prev) => prev === services.length - 1 ? 0 : prev + 1)}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 border border-white/30 rounded flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentServiceIndex((prev) => prev === 0 ? services.length - 1 : prev - 1)}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 border border-white/30 rounded flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              {/* Contenido central - ANCHO COMPLETO */}
              <div className="text-left w-[220px] sm:w-[300px] px-2 sm:px-4">
                <h3 className="text-sm sm:text-xl font-bold text-white mb-0.5 sm:mb-1 truncate">
                  {language === 'en' ? services[currentServiceIndex]?.nameEn : services[currentServiceIndex]?.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wider font-medium truncate">
                  {language === 'en' ? services[currentServiceIndex]?.priceEn : services[currentServiceIndex]?.price}
                </p>
              </div>

              {/* Botón grande a la derecha */}
              <Link
                href={services[currentServiceIndex].href}
                className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}