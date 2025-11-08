'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Contraseña simple para demostración (cambiar a algo más seguro en producción)
    // Por ahora usaremos "refined2024"
    if (password === 'refined2024') {
      // Guardar en sessionStorage
      sessionStorage.setItem('admin_authenticated', 'true')
      router.push('/admin/edit')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="Refined LLC" 
              className="h-24 w-auto mx-auto mb-4 filter brightness-0 invert"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
          <p className="text-gray-400">Accede para editar el contenido de tu sitio</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña de Administrador
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Ingresa tu contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Acceder al Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>🔐 Contraseña de demostración:</strong>
              </p>
              <code className="text-sm bg-white px-3 py-1 rounded border border-blue-200 text-blue-900">
                refined2024
              </code>
              <p className="text-xs text-blue-600 mt-2">
                (Cambiar en producción por seguridad)
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Volver al sitio
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">✏️</div>
            <p className="text-xs text-white">Edición Simple</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-xs text-white">Cambios Instantáneos</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎨</div>
            <p className="text-xs text-white">Control Total</p>
          </div>
        </div>
      </div>
    </div>
  )
}

