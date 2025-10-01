'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Mensajes',
      href: '/dashboard/messages',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Auto-Respuestas',
      href: '/dashboard/auto-replies',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-primary min-h-screen">
          <div className="p-6">
            <Link href="/" className="text-xl font-bold text-white">
              Refined LLC
            </Link>
            <p className="text-sm text-gray-400 mt-1">Dashboard</p>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-gray-300 hover:bg-primary-light hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          <div className="absolute bottom-6 left-6 right-6">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Volver al sitio</span>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white shadow-sm">
            <div className="px-8 py-4">
              <h1 className="text-2xl font-bold text-primary">
                {pathname === '/dashboard/messages' && 'Inbox de Mensajes'}
                {pathname === '/dashboard/auto-replies' && 'Configuración de Auto-Respuestas'}
              </h1>
            </div>
          </div>
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

