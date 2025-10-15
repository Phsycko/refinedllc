'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { t } = useLanguage()

  // Array de imágenes para el carrusel
  const headerImages = [
    '/images/header/header1.jpg',
    '/images/header/header2.jpg',
    '/images/header/header3.jpg'
  ]

  // Efecto para cambiar imágenes automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === headerImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [headerImages.length])

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
        {headerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Header image ${index + 1}`}
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
              <div className="h-12 w-auto">
                <img 
                  src="/logo.svg" 
                  alt="Refined LLC" 
                  className="h-full w-auto filter brightness-0 invert"
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
      </div>
    </header>
  )
}