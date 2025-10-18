'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const { t } = useLanguage()

  // Array de servicios con sus imágenes
  const services = [
    {
      id: 'remodelacion',
      name: 'Remodelación',
      nameEn: 'Remodeling',
      image: '/images/services-carousel/remodelacion.jpg',
      price: 'Desde $15,000'
    },
    {
      id: 'construccion',
      name: 'Construcción',
      nameEn: 'Construction',
      image: '/images/services-carousel/construccion.jpg',
      price: 'Desde $50,000'
    },
    {
      id: 'diseno',
      name: 'Diseño',
      nameEn: 'Design',
      image: '/images/services-carousel/diseno.jpg',
      price: 'Desde $5,000'
    },
    {
      id: 'mantenimiento',
      name: 'Mantenimiento',
      nameEn: 'Maintenance',
      image: '/images/services-carousel/mantenimiento.jpg',
      price: 'Desde $2,000'
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

        {/* Botones de servicios en la parte inferior derecha */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex flex-col space-y-2">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setCurrentServiceIndex(index)}
                  className={`flex items-center justify-between px-4 py-3 rounded-md transition-all duration-300 text-left min-w-[200px] ${
                    index === currentServiceIndex
                      ? 'bg-accent text-white'
                      : 'bg-white/80 hover:bg-white text-primary'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm">
                      {t.language === 'en' ? service.nameEn : service.name}
                    </div>
                    <div className={`text-xs ${
                      index === currentServiceIndex ? 'text-white/80' : 'text-secondary'
                    }`}>
                      {service.price}
                    </div>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      index === currentServiceIndex ? 'rotate-90' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}