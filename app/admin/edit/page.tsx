'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type ContentType = 'company' | 'projects' | 'services' | 'testimonials'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentData = any

export default function AdminEditPage() {
  const router = useRouter()

  // Verificar autenticación
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_authenticated')
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [router])
  const [contentType, setContentType] = useState<ContentType>('company')
  const [content, setContent] = useState<ContentData>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  // Cargar contenido
  const loadContent = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/content/${contentType}`)
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error loading content:', error)
      setMessage('Error al cargar el contenido')
    }
    setLoading(false)
  }, [contentType])

  useEffect(() => {
    loadContent()
  }, [loadContent])

  const saveContent = async () => {
    setSaving(true)
    setMessage('')
    try {
      const response = await fetch(`/api/content/${contentType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (response.ok) {
        setMessage('✅ Contenido guardado exitosamente!')
      } else {
        setMessage('❌ Error al guardar el contenido')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      setMessage('❌ Error al guardar el contenido')
    }
    setSaving(false)
  }

  const handleFileUpload = async (file: File, folder: string = 'general') => {
    setUploading(true)
    setMessage('')
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`✅ Imagen subida: ${data.url}`)
        return data.url
      } else {
        setMessage(`❌ ${data.error}`)
        return null
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setMessage('❌ Error al subir la imagen')
      return null
    } finally {
      setUploading(false)
    }
  }

  const updateField = (path: string[], value: ContentData) => {
    setContent((prev: ContentData) => {
      const newContent = { ...prev }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let current: any = newContent
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }
      
      current[path[path.length - 1]] = value
      return newContent
    })
  }

  // Componente helper para upload de imágenes integrado
  const ImageUploadInput = ({ 
    value, 
    onChange, 
    folder, 
    placeholder 
  }: { 
    value: string
    onChange: (url: string) => void
    folder: string
    placeholder?: string 
  }) => (
    <div className="flex gap-2">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || '/images/...'}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (file) {
              const url = await handleFileUpload(file, folder)
              if (url) {
                onChange(url)
              }
            }
          }}
          disabled={uploading}
        />
        <span className="text-xl mr-1">📸</span>
        <span className="text-sm font-medium">Subir</span>
      </label>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Refined LLC
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Panel de Edición</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Ver Sitio
              </Link>
              <button
                onClick={saveContent}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-colors"
              >
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Secciones</h3>
              <nav className="space-y-2">
                {[
                  { id: 'company' as ContentType, label: '🏢 Información de Empresa', icon: '🏢' },
                  { id: 'projects' as ContentType, label: '🏗️ Proyectos', icon: '🏗️' },
                  { id: 'services' as ContentType, label: '⚙️ Servicios', icon: '⚙️' },
                  { id: 'testimonials' as ContentType, label: '💬 Testimonios', icon: '💬' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setContentType(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      contentType === item.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label.replace(item.icon + ' ', '')}
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">💡 Ayuda</h4>
                <p className="text-xs text-gray-600">
                  Selecciona una sección, edita el contenido y haz clic en &ldquo;Guardar Cambios&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {contentType === 'company' && '🏢 Información de la Empresa'}
                    {contentType === 'projects' && '🏗️ Proyectos'}
                    {contentType === 'services' && '⚙️ Servicios'}
                    {contentType === 'testimonials' && '💬 Testimonios'}
                  </h2>

                  {contentType === 'company' && content && (
                    <CompanyEditor content={content} updateField={updateField} />
                  )}

                  {contentType === 'projects' && content && (
                    <ProjectsEditor content={content} setContent={setContent} />
                  )}

                  {contentType === 'services' && content && (
                    <ServicesEditor content={content} setContent={setContent} />
                  )}

                  {contentType === 'testimonials' && content && (
                    <TestimonialsEditor content={content} setContent={setContent} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para editar información de la empresa
interface CompanyEditorProps {
  content: ContentData
  updateField: (path: string[], value: ContentData) => void
}

function CompanyEditor({ content, updateField }: CompanyEditorProps) {
  return (
    <div className="space-y-6">
      <div className="border-b pb-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🎨</span>
          Hero Principal (Página de Inicio)
        </h3>
        <p className="text-sm text-gray-600 mb-4">Este es el texto grande que aparece al entrar al sitio</p>
        
        <div className="space-y-4 bg-white p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Título - Línea 1
              </label>
              <input
                type="text"
                value={content.hero?.title?.line1 || ''}
                onChange={(e) => {
                  const newHero = { ...content.hero, title: { ...content.hero?.title, line1: e.target.value } }
                  updateField(['hero'], newHero)
                }}
                placeholder="Transforming"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Título - Línea 2
              </label>
              <input
                type="text"
                value={content.hero?.title?.line2 || ''}
                onChange={(e) => {
                  const newHero = { ...content.hero, title: { ...content.hero?.title, line2: e.target.value } }
                  updateField(['hero'], newHero)
                }}
                placeholder="Visions into"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Título - Línea 3 (Grande)
              </label>
              <input
                type="text"
                value={content.hero?.title?.line3 || ''}
                onChange={(e) => {
                  const newHero = { ...content.hero, title: { ...content.hero?.title, line3: e.target.value } }
                  updateField(['hero'], newHero)
                }}
                placeholder="Reality"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              value={content.hero?.subtitle || ''}
              onChange={(e) => {
                const newHero = { ...content.hero, subtitle: e.target.value }
                updateField(['hero'], newHero)
              }}
              placeholder="World-class architectural design and construction."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Descripción
            </label>
            <input
              type="text"
              value={content.hero?.description || ''}
              onChange={(e) => {
                const newHero = { ...content.hero, description: e.target.value }
                updateField(['hero'], newHero)
              }}
              placeholder="Over 9 years creating exceptional spaces..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Texto del Botón
              </label>
              <input
                type="text"
                value={content.hero?.ctaText || ''}
                onChange={(e) => {
                  const newHero = { ...content.hero, ctaText: e.target.value }
                  updateField(['hero'], newHero)
                }}
                placeholder="TALK TO US"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Link del Botón
              </label>
              <input
                type="text"
                value={content.hero?.ctaLink || ''}
                onChange={(e) => {
                  const newHero = { ...content.hero, ctaLink: e.target.value }
                  updateField(['hero'], newHero)
                }}
                placeholder="/contacto"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Servicios del Carrusel (Hero)</h4>
            <p className="text-xs text-gray-600 mb-3">Estos son los servicios que rotan en el Hero principal</p>
            <div className="space-y-3">
              {content.hero?.carouselServices?.map((service: ContentData, index: number) => (
                <div key={index} className="grid grid-cols-5 gap-2 p-3 bg-white border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Nombre (ES)</label>
                    <input
                      type="text"
                      value={service.name || ''}
                      onChange={(e) => {
                        const newServices = [...content.hero.carouselServices]
                        newServices[index] = { ...newServices[index], name: e.target.value }
                        const newHero = { ...content.hero, carouselServices: newServices }
                        updateField(['hero'], newHero)
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Nombre (EN)</label>
                    <input
                      type="text"
                      value={service.nameEn || ''}
                      onChange={(e) => {
                        const newServices = [...content.hero.carouselServices]
                        newServices[index] = { ...newServices[index], nameEn: e.target.value }
                        const newHero = { ...content.hero, carouselServices: newServices }
                        updateField(['hero'], newHero)
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Precio (ES)</label>
                    <input
                      type="text"
                      value={service.price || ''}
                      onChange={(e) => {
                        const newServices = [...content.hero.carouselServices]
                        newServices[index] = { ...newServices[index], price: e.target.value }
                        const newHero = { ...content.hero, carouselServices: newServices }
                        updateField(['hero'], newHero)
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Precio (EN)</label>
                    <input
                      type="text"
                      value={service.priceEn || ''}
                      onChange={(e) => {
                        const newServices = [...content.hero.carouselServices]
                        newServices[index] = { ...newServices[index], priceEn: e.target.value }
                        const newHero = { ...content.hero, carouselServices: newServices }
                        updateField(['hero'], newHero)
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-5">
                    <label className="block text-xs text-gray-600 mb-1">Imagen del Carrusel</label>
                    <ImageUploadInput
                      value={service.image || ''}
                      onChange={(url) => {
                        const newServices = [...content.hero.carouselServices]
                        newServices[index] = { ...newServices[index], image: url }
                        const newHero = { ...content.hero, carouselServices: newServices }
                        updateField(['hero'], newHero)
                      }}
                      folder="hero"
                      placeholder="/images/services-carousel/..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombre de la Empresa
        </label>
        <input
          type="text"
          value={content.name || ''}
          onChange={(e) => updateField(['name'], e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slogan
        </label>
        <input
          type="text"
          value={content.slogan || ''}
          onChange={(e) => updateField(['slogan'], e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Año de Fundación
        </label>
        <input
          type="number"
          value={content.founded || ''}
          onChange={(e) => updateField(['founded'], parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          value={content.description || ''}
          onChange={(e) => updateField(['description'], e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Misión
        </label>
        <textarea
          value={content.mission || ''}
          onChange={(e) => updateField(['mission'], e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              value={content.contact?.phone || ''}
              onChange={(e) => updateField(['contact', 'phone'], e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={content.contact?.email || ''}
              onChange={(e) => updateField(['contact', 'email'], e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={content.contact?.address || ''}
              onChange={(e) => updateField(['contact', 'address'], e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horario de Atención
            </label>
            <input
              type="text"
              value={content.contact?.hours || ''}
              onChange={(e) => updateField(['contact', 'hours'], e.target.value)}
              placeholder="Lunes - Viernes: 9:00 AM - 6:00 PM"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
        <div className="space-y-4">
          {content.stats?.map((stat: ContentData, index: number) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index] = { ...newStats[index], label: e.target.value }
                    updateField(['stats'], newStats)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Valor
                </label>
                <input
                  type="text"
                  value={stat.value || ''}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index] = { ...newStats[index], value: e.target.value }
                    updateField(['stats'], newStats)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Icono
                </label>
                <input
                  type="text"
                  value={stat.icon || ''}
                  onChange={(e) => {
                    const newStats = [...content.stats]
                    newStats[index] = { ...newStats[index], icon: e.target.value }
                    updateField(['stats'], newStats)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Valores de la Empresa</h3>
        <div className="space-y-4">
          {content.values?.map((value: ContentData, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={value.title || ''}
                  onChange={(e) => {
                    const newValues = [...content.values]
                    newValues[index] = { ...newValues[index], title: e.target.value }
                    updateField(['values'], newValues)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Descripción
                </label>
                <textarea
                  value={value.description || ''}
                  onChange={(e) => {
                    const newValues = [...content.values]
                    newValues[index] = { ...newValues[index], description: e.target.value }
                    updateField(['values'], newValues)
                  }}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Licencias y Certificaciones</h3>
        <div className="space-y-2">
          {content.licenses?.map((license: string, index: number) => (
            <div key={index}>
              <input
                type="text"
                value={license || ''}
                onChange={(e) => {
                  const newLicenses = [...content.licenses]
                  newLicenses[index] = e.target.value
                  updateField(['licenses'], newLicenses)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Proceso de Trabajo (5 Pasos)</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título de la Sección
            </label>
            <input
              type="text"
              value={content.process?.title || ''}
              onChange={(e) => {
                const newProcess = { ...content.process, title: e.target.value }
                updateField(['process'], newProcess)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título (English)
            </label>
            <input
              type="text"
              value={content.process?.title_en || ''}
              onChange={(e) => {
                const newProcess = { ...content.process, title_en: e.target.value }
                updateField(['process'], newProcess)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={content.process?.subtitle || ''}
              onChange={(e) => {
                const newProcess = { ...content.process, subtitle: e.target.value }
                updateField(['process'], newProcess)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtítulo (English)
            </label>
            <input
              type="text"
              value={content.process?.subtitle_en || ''}
              onChange={(e) => {
                const newProcess = { ...content.process, subtitle_en: e.target.value }
                updateField(['process'], newProcess)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          {content.process?.steps?.map((step: ContentData, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-gray-900">Paso {index + 1}</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Título (Español)</label>
                  <input
                    type="text"
                    value={step.title || ''}
                    onChange={(e) => {
                      const newSteps = [...content.process.steps]
                      newSteps[index] = { ...newSteps[index], title: e.target.value }
                      const newProcess = { ...content.process, steps: newSteps }
                      updateField(['process'], newProcess)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Título (English)</label>
                  <input
                    type="text"
                    value={step.title_en || ''}
                    onChange={(e) => {
                      const newSteps = [...content.process.steps]
                      newSteps[index] = { ...newSteps[index], title_en: e.target.value }
                      const newProcess = { ...content.process, steps: newSteps }
                      updateField(['process'], newProcess)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Descripción (Español)</label>
                  <textarea
                    value={step.description || ''}
                    onChange={(e) => {
                      const newSteps = [...content.process.steps]
                      newSteps[index] = { ...newSteps[index], description: e.target.value }
                      const newProcess = { ...content.process, steps: newSteps }
                      updateField(['process'], newProcess)
                    }}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Descripción (English)</label>
                  <textarea
                    value={step.description_en || ''}
                    onChange={(e) => {
                      const newSteps = [...content.process.steps]
                      newSteps[index] = { ...newSteps[index], description_en: e.target.value }
                      const newProcess = { ...content.process, steps: newSteps }
                      updateField(['process'], newProcess)
                    }}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['facebook', 'instagram', 'linkedin', 'twitter'].map((social) => (
            <div key={social}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {social}
              </label>
              <input
                type="url"
                value={content.social?.[social] || ''}
                onChange={(e) => updateField(['social', social], e.target.value)}
                placeholder={`https://${social}.com/...`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente para editar proyectos
interface ProjectsEditorProps {
  content: ContentData
  setContent: (content: ContentData) => void
}

function ProjectsEditor({ content, setContent }: ProjectsEditorProps) {
  const [selectedProject, setSelectedProject] = useState<number>(0)

  const updateProject = (field: string, value: ContentData) => {
    const newProjects = [...content]
    newProjects[selectedProject] = {
      ...newProjects[selectedProject],
      [field]: value
    }
    setContent(newProjects)
  }

  const addProject = () => {
    const newProject = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: Math.max(...content.map((p: any) => p.id)) + 1,
      slug: 'nuevo-proyecto',
      title: 'Nuevo Proyecto',
      title_en: 'New Project',
      category: 'Residencial',
      category_en: 'Residential',
      description: '',
      description_en: '',
      featured: false,
      mainImage: '/images/projects/placeholder.jpg',
      gallery: [],
      year: new Date().getFullYear(),
    }
    setContent([...content, newProject])
    setSelectedProject(content.length)
  }

  const deleteProject = () => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newProjects = content.filter((_: any, i: number) => i !== selectedProject)
      setContent(newProjects)
      setSelectedProject(Math.max(0, selectedProject - 1))
    }
  }

  const project = content[selectedProject]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(parseInt(e.target.value))}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {content.map((proj: any, index: number) => (
            <option key={index} value={index}>
              {proj.title}
            </option>
          ))}
        </select>
        <button
          onClick={addProject}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Nuevo
        </button>
        <button
          onClick={deleteProject}
          className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>

      {project && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título (Español)
              </label>
              <input
                type="text"
                value={project.title || ''}
                onChange={(e) => updateProject('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título (English)
              </label>
              <input
                type="text"
                value={project.title_en || ''}
                onChange={(e) => updateProject('title_en', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={project.slug || ''}
                onChange={(e) => updateProject('slug', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría (Español)
              </label>
              <input
                type="text"
                value={project.category || ''}
                onChange={(e) => updateProject('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría (English)
              </label>
              <input
                type="text"
                value={project.category_en || ''}
                onChange={(e) => updateProject('category_en', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación (Español)
              </label>
              <input
                type="text"
                value={project.location || ''}
                onChange={(e) => updateProject('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación (English)
              </label>
              <input
                type="text"
                value={project.location_en || ''}
                onChange={(e) => updateProject('location_en', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año
              </label>
              <input
                type="number"
                value={project.year || ''}
                onChange={(e) => updateProject('year', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Área / Tamaño
            </label>
            <input
              type="text"
              value={project.area || ''}
              onChange={(e) => updateProject('area', e.target.value)}
              placeholder="4,500 sq ft"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (Español)
            </label>
            <textarea
              value={project.description || ''}
              onChange={(e) => updateProject('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (English)
            </label>
            <textarea
              value={project.description_en || ''}
              onChange={(e) => updateProject('description_en', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Completa (Español)
            </label>
            <textarea
              value={project.fullDescription || ''}
              onChange={(e) => updateProject('fullDescription', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servicios (separados por coma)
            </label>
            <input
              type="text"
              value={project.services?.join(', ') || ''}
              onChange={(e) => updateProject('services', e.target.value.split(',').map((s: string) => s.trim()))}
              placeholder="Diseño Arquitectónico, Construcción, Diseño de Interiores"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlights (Español) - separados por coma
            </label>
            <textarea
              value={project.highlights?.join(', ') || ''}
              onChange={(e) => updateProject('highlights', e.target.value.split(',').map((s: string) => s.trim()))}
              rows={3}
              placeholder="Diseño sostenible, Sistema domótica, Piscina infinita"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlights (English) - separados por coma
            </label>
            <textarea
              value={project.highlights_en?.join(', ') || ''}
              onChange={(e) => updateProject('highlights_en', e.target.value.split(',').map((s: string) => s.trim()))}
              rows={3}
              placeholder="Sustainable design, Home automation, Infinity pool"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.featured || false}
                onChange={(e) => updateProject('featured', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Proyecto Destacado
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen Principal del Proyecto
            </label>
            <ImageUploadInput
              value={project.mainImage || ''}
              onChange={(url) => updateProject('mainImage', url)}
              folder="projects"
              placeholder="/images/projects/main-image.jpg"
            />
            {project.mainImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={project.mainImage} 
                alt="Preview" 
                className="mt-2 h-32 w-auto object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Imágenes &quot;Before&quot; ({project.beforeImages?.length || 0} imágenes)
              </label>
              <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const url = await handleFileUpload(file, 'projects')
                      if (url) {
                        const newBefore = [...(project.beforeImages || []), url]
                        updateProject('beforeImages', newBefore)
                      }
                    }
                  }}
                  disabled={uploading}
                />
                <span className="mr-1">+</span> Agregar Before
              </label>
            </div>
            <div className="space-y-2">
              {project.beforeImages?.map((img: string, idx: number) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => {
                      const newBefore = [...project.beforeImages]
                      newBefore[idx] = e.target.value
                      updateProject('beforeImages', newBefore)
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      const newBefore = project.beforeImages.filter((_: string, i: number) => i !== idx)
                      updateProject('beforeImages', newBefore)
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              {(!project.beforeImages || project.beforeImages.length === 0) && (
                <p className="text-sm text-gray-500 italic">No hay imágenes before. Haz clic en &quot;+ Agregar Before&quot;</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Galería de Imágenes ({project.gallery?.length || 0} imágenes)
              </label>
              <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const url = await handleFileUpload(file, 'projects')
                      if (url) {
                        const newGallery = [...(project.gallery || []), url]
                        updateProject('gallery', newGallery)
                      }
                    }
                  }}
                  disabled={uploading}
                />
                <span className="mr-1">+</span> Agregar Imagen
              </label>
            </div>
            <div className="space-y-2">
              {project.gallery?.map((img: string, idx: number) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => {
                      const newGallery = [...project.gallery]
                      newGallery[idx] = e.target.value
                      updateProject('gallery', newGallery)
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      const newGallery = project.gallery.filter((_: string, i: number) => i !== idx)
                      updateProject('gallery', newGallery)
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              {(!project.gallery || project.gallery.length === 0) && (
                <p className="text-sm text-gray-500 italic">No hay imágenes en la galería. Haz clic en &quot;+ Agregar Imagen&quot;</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para editar servicios
interface ServicesEditorProps {
  content: ContentData
  setContent: (content: ContentData) => void
}

function ServicesEditor({ content, setContent }: ServicesEditorProps) {
  const [selectedService, setSelectedService] = useState<number>(0)

  const updateService = (field: string, value: ContentData) => {
    const newServices = [...content]
    newServices[selectedService] = {
      ...newServices[selectedService],
      [field]: value
    }
    setContent(newServices)
  }

  const service = content[selectedService]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(parseInt(e.target.value))}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {content.map((serv: any, index: number) => (
            <option key={index} value={index}>
              {serv.title}
            </option>
          ))}
        </select>
      </div>

      {service && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título (Español)
              </label>
              <input
                type="text"
                value={service.title || ''}
                onChange={(e) => updateService('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título (English)
              </label>
              <input
                type="text"
                value={service.title_en || ''}
                onChange={(e) => updateService('title_en', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (Español)
            </label>
            <textarea
              value={service.description || ''}
              onChange={(e) => updateService('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (English)
            </label>
            <textarea
              value={service.description_en || ''}
              onChange={(e) => updateService('description_en', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Completa (Español)
            </label>
            <textarea
              value={service.fullDescription || ''}
              onChange={(e) => updateService('fullDescription', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción Completa (English)
            </label>
            <textarea
              value={service.fullDescription_en || ''}
              onChange={(e) => updateService('fullDescription_en', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Características (Español) - separadas por coma
            </label>
            <textarea
              value={service.features?.join(', ') || ''}
              onChange={(e) => updateService('features', e.target.value.split(',').map((s: string) => s.trim()))}
              rows={3}
              placeholder="Diseño conceptual, Modelado 3D, Cumplimiento normativas"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Características (English) - separadas por coma
            </label>
            <textarea
              value={service.features_en?.join(', ') || ''}
              onChange={(e) => updateService('features_en', e.target.value.split(',').map((s: string) => s.trim()))}
              rows={3}
              placeholder="Conceptual design, 3D modeling, Code compliance"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (Español)
              </label>
              <input
                type="text"
                value={service.price || ''}
                onChange={(e) => updateService('price', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio (English)
              </label>
              <input
                type="text"
                value={service.price_en || ''}
                onChange={(e) => updateService('price_en', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen Principal del Servicio
            </label>
            <ImageUploadInput
              value={service.image || ''}
              onChange={(url) => updateService('image', url)}
              folder="services"
              placeholder="/images/services/main-image.jpg"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Galería de Imágenes ({service.gallery?.length || 0} imágenes)
              </label>
              <label className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const url = await handleFileUpload(file, 'services')
                      if (url) {
                        const newGallery = [...(service.gallery || []), url]
                        updateService('gallery', newGallery)
                      }
                    }
                  }}
                  disabled={uploading}
                />
                <span className="mr-1">+</span> Agregar Imagen
              </label>
            </div>
            <div className="space-y-2">
              {service.gallery?.map((img: string, idx: number) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => {
                      const newGallery = [...service.gallery]
                      newGallery[idx] = e.target.value
                      updateService('gallery', newGallery)
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      const newGallery = service.gallery.filter((_: string, i: number) => i !== idx)
                      updateService('gallery', newGallery)
                    }}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
              {(!service.gallery || service.gallery.length === 0) && (
                <p className="text-sm text-gray-500 italic">No hay imágenes. Haz clic en &quot;+ Agregar Imagen&quot;</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría (Español)
            </label>
            <input
              type="text"
              value={service.category || ''}
              onChange={(e) => updateService('category', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría (English)
            </label>
            <input
              type="text"
              value={service.category_en || ''}
              onChange={(e) => updateService('category_en', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para editar testimonios
interface TestimonialsEditorProps {
  content: ContentData
  setContent: (content: ContentData) => void
}

function TestimonialsEditor({ content, setContent }: TestimonialsEditorProps) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number>(0)

  const updateTestimonial = (field: string, value: ContentData) => {
    const newTestimonials = [...content]
    newTestimonials[selectedTestimonial] = {
      ...newTestimonials[selectedTestimonial],
      [field]: value
    }
    setContent(newTestimonials)
  }

  const testimonial = content[selectedTestimonial]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <select
          value={selectedTestimonial}
          onChange={(e) => setSelectedTestimonial(parseInt(e.target.value))}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {content.map((test: any, index: number) => (
            <option key={index} value={index}>
              {test.name}
            </option>
          ))}
        </select>
      </div>

      {testimonial && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Cliente
              </label>
              <input
                type="text"
                value={testimonial.name || ''}
                onChange={(e) => updateTestimonial('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proyecto
              </label>
              <input
                type="text"
                value={testimonial.project || ''}
                onChange={(e) => updateTestimonial('project', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonio (Español)
            </label>
            <textarea
              value={testimonial.quote || ''}
              onChange={(e) => updateTestimonial('quote', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonio (English)
            </label>
            <textarea
              value={testimonial.quote_en || ''}
              onChange={(e) => updateTestimonial('quote_en', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación (1-5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={testimonial.rating || 5}
              onChange={(e) => updateTestimonial('rating', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto del Cliente
            </label>
            <ImageUploadInput
              value={testimonial.image || ''}
              onChange={(url) => updateTestimonial('image', url)}
              folder="testimonials"
              placeholder="/images/testimonials/cliente.jpg"
            />
            {testimonial.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={testimonial.image} 
                alt="Preview" 
                className="mt-2 h-32 w-32 object-cover rounded-full shadow-md"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

