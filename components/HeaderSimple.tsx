'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

export default function HeaderSimple() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/servicios', label: t.nav.services },
    { href: '/proyectos', label: t.nav.projects },
    { href: '/sobre', label: t.nav.about },
    { href: '/contacto', label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-32 w-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.jpg" 
                alt="Refined LLC" 
                className="h-full w-auto filter brightness-0"
              />
            </div>
          </Link>

          {/* Desktop Navigation - idéntico al header principal (estado scrolled) */}
          <div className="hidden md:flex md:items-center">
            {navItems.map((item, index) => (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-300 w-32 text-center inline-flex items-center justify-center whitespace-nowrap"
                >
                  {item.label}
                </Link>
                {index < navItems.length - 1 && (
                  <span aria-hidden="true" className="mx-3 h-6 w-px bg-gray-400" />
                )}
              </div>
            ))}
            <div className="mx-3" />
            <LanguageToggle />
            <span aria-hidden="true" className="mx-3 h-6 w-px bg-gray-300" />
            <Link
              href="/contacto"
              className="rounded-none h-10 px-4 text-sm font-semibold shadow-sm transition-all hover:shadow-md uppercase tracking-wide inline-flex items-center justify-center bg-accent text-white hover:bg-accent-dark"
            >
              {t.nav.quote}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-3 text-gray-900 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg
              className="h-8 w-8"
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
            <div className="px-2 pb-3 pt-2 space-y-1 bg-white border-t border-gray-200 rounded-b-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
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
                className="block w-full px-3 py-2 text-center text-base font-semibold text-white bg-accent hover:bg-accent-dark rounded-none uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.quote}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
