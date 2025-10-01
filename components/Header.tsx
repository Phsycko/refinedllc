'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'

export default function Header() {
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-accent">R</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-primary">Refined LLC</div>
              <div className="text-xs text-secondary">Exceeding Expectations</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-secondary transition-colors hover:text-accent"
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
            className="md:hidden rounded-md p-2 text-secondary hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
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
          <div className="md:hidden border-t py-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary hover:bg-gray-50 hover:text-accent"
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
                className="mx-3 mt-4 block rounded-md bg-accent px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-dark"
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

