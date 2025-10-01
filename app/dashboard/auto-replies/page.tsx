'use client'

import { useState, useEffect } from 'react'

export default function AutoRepliesPage() {
  const [active, setActive] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchAutoReply()
  }, [])

  const fetchAutoReply = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auto-replies')
      const data = await res.json()
      
      if (data.success && data.data) {
        setActive(data.data.active)
        setMessage(data.data.message)
      }
    } catch (error) {
      console.error('Error fetching auto-reply:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveAutoReply = async () => {
    setSaving(true)
    setSuccessMessage('')
    
    try {
      const res = await fetch('/api/auto-replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active, message }),
      })

      const data = await res.json()

      if (data.success) {
        setSuccessMessage('Configuración guardada exitosamente')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error saving auto-reply:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-secondary">Cargando...</div>
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Auto-Respuesta Automática
              </h3>
              <p className="text-sm text-secondary mt-1">
                Envía un email automático a los visitantes cuando envían un mensaje
              </p>
            </div>
            <button
              onClick={() => setActive(!active)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                active ? 'bg-accent' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  active ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Status indicator */}
          <div className={`rounded-md p-4 ${active ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {active ? (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${active ? 'text-green-800' : 'text-gray-800'}`}>
                  {active ? 'Auto-respuesta activada' : 'Auto-respuesta desactivada'}
                </p>
                <p className={`text-sm mt-1 ${active ? 'text-green-700' : 'text-gray-600'}`}>
                  {active
                    ? 'Los visitantes recibirán un email automático cuando envíen un mensaje.'
                    : 'Los visitantes no recibirán un email automático.'}
                </p>
              </div>
            </div>
          </div>

          {/* Message editor */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
              Mensaje de Auto-Respuesta
            </label>
            <textarea
              id="message"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 font-mono text-sm"
              placeholder="Escribe el mensaje que se enviará automáticamente..."
            />
            <p className="mt-2 text-xs text-secondary">
              Este mensaje se enviará por email a los visitantes que completen el formulario de contacto.
            </p>
          </div>

          {/* Preview */}
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Vista Previa del Email</h4>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="text-sm text-secondary whitespace-pre-wrap">
                <p className="font-semibold mb-2">Hola [Nombre del visitante],</p>
                <p>{message || 'El mensaje de auto-respuesta aparecerá aquí...'}</p>
                <p className="mt-4 text-gray-500">
                  Saludos cordiales,<br />
                  El equipo de Refined LLC
                </p>
              </div>
            </div>
          </div>

          {/* Success message */}
          {successMessage && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="flex justify-end">
            <button
              onClick={saveAutoReply}
              disabled={saving}
              className="px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-blue-800">Configuración de Email</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Asegúrate de configurar las credenciales de email en el archivo <code className="bg-blue-100 px-1 rounded">.env.local</code> para que las auto-respuestas funcionen correctamente.
              </p>
              <p className="mt-2">
                Necesitas configurar <strong>RESEND_API_KEY</strong> o las credenciales de SMTP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

