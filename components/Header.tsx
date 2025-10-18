'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const { t, language } = useLanguage()

  // Array de servicios con sus imágenes
  const services = [
    {
      id: 'jardines',
      name: 'Jardines',
      nameEn: 'Gardens',
      image: '/images/services-carousel/remodelacion.jpg',
      price: 'Desde $8,000',
      href: '/servicios/jardines'
    },
    {
      id: 'extensiones',
      name: 'Extensiones',
      nameEn: 'Extensions',
      image: '/images/services-carousel/construccion.jpg',
      price: 'Desde $25,000',
      href: '/servicios/extensiones'
    },
    {
      id: 'outdoor-living',
      name: 'Espacios Exteriores',
      nameEn: 'Outdoor Living Space',
      image: '/images/services-carousel/diseno.jpg',
      price: 'Desde $12,000',
      href: '/servicios/outdoor-living'
    },
    {
      id: 'bathroom',
      name: 'Baños',
      nameEn: 'Bathroom',
      image: '/images/services-carousel/mantenimiento.jpg',
      price: 'Desde $10,000',
      href: '/servicios/bathroom'
    }
  ]

  // Efecto para cambiar imágenes automáticamente cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => 
        prevIndex === services.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [services.length])

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/servicios', label: t.nav.services },
    { href: '/proyectos', label: t.nav.projects },
    { href: '/sobre', label: t.nav.about },
    { href: '/contacto', label: t.nav.contact },
  ]

  return (
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

      {/* Contenido del header superpuesto */}
      <div className="relative z-10 flex flex-col h-full">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-24 w-auto">
                <img 
                  src="/logo.png" 
                  alt="Refined LLC" 
                  className="h-full w-auto"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <LanguageToggle />
              <Link
                href="/contacto"
                className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-dark hover:shadow-md"
              >
                {t.nav.quote}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden rounded-md p-2 text-white hover:bg-white/10 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
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
              <div className="px-2 pb-3 pt-2 space-y-1 bg-black/50 backdrop-blur-sm border-t border-white/20 rounded-b-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md"
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
        </nav>

        {/* Contenido centrado verticalmente */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t.hero.viewProjects}
              </Link>
              <Link
                href="/servicios"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-md transition-all duration-300"
              >
                {t.hero.ourServices}
              </Link>
            </div>
          </div>
        </div>

        {/* Tarjeta de servicios - PEGADA A LA ESQUINA */}
        <div className="absolute bottom-0 right-0 z-20">
          <div className="bg-white rounded-tl-lg shadow-lg border border-gray-200 p-3 sm:p-6 w-[360px] sm:w-[480px] h-[80px] sm:h-[100px]">
            <div className="flex items-center justify-between h-full">
              {/* Botones de navegación a la izquierda */}
              <div className="flex flex-col space-y-1 sm:space-y-2">
                <button
                  onClick={() => setCurrentServiceIndex((prev) => prev === services.length - 1 ? 0 : prev + 1)}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-50 border border-gray-300 rounded flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentServiceIndex((prev) => prev === 0 ? services.length - 1 : prev - 1)}
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-50 border border-gray-300 rounded flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              {/* Contenido central - ANCHO COMPLETO */}
              <div className="text-left w-[220px] sm:w-[300px] px-2 sm:px-4">
                <h3 className="text-sm sm:text-xl font-bold text-black mb-0.5 sm:mb-1 truncate">
                  {language === 'en' ? services[currentServiceIndex].nameEn : services[currentServiceIndex].name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider font-medium truncate">
                  {services[currentServiceIndex].price}
                </p>
              </div>

              {/* Botón grande a la derecha */}
              <Link
                href={services[currentServiceIndex].href}
                className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition-colors flex-shrink-0"
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
  )
}