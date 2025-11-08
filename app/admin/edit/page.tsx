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
            {/* Upload de Imágenes */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-2xl mr-2">📸</span>
                Subir Imágenes
              </h3>
              <p className="text-sm text-gray-600 mb-4">Sube imágenes para proyectos, servicios o testimonios</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['projects', 'services', 'testimonials', 'general'].map((folder) => (
                  <div key={folder} className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors">
                    <label className="cursor-pointer block text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const url = await handleFileUpload(file, folder)
                            if (url) {
                              navigator.clipboard.writeText(url)
                            }
                          }
                        }}
                        disabled={uploading}
                      />
                      <div className="text-3xl mb-2">
                        {folder === 'projects' && '🏗️'}
                        {folder === 'services' && '⚙️'}
                        {folder === 'testimonials' && '💬'}
                        {folder === 'general' && '📁'}
                      </div>
                      <div className="text-sm font-medium text-gray-700 capitalize">{folder}</div>
                      <div className="text-xs text-gray-500 mt-1">Clic para subir</div>
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                💡 La URL se copiará automáticamente al portapapeles. Pégala en cualquier campo de imagen.
              </p>
            </div>

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
              Imagen Principal
            </label>
            <input
              type="text"
              value={project.mainImage || ''}
              onChange={(e) => updateProject('mainImage', e.target.value)}
              placeholder="/images/projects/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {project.mainImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={project.mainImage} 
                alt="Preview" 
                className="mt-2 h-32 w-auto object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imágenes &quot;Before&quot; (separadas por coma)
            </label>
            <textarea
              value={project.beforeImages?.join(', ') || ''}
              onChange={(e) => updateProject('beforeImages', e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s))}
              rows={2}
              placeholder="/images/projects/before-1.jpg, /images/projects/before-2.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Galería de Imágenes (separadas por coma)
            </label>
            <textarea
              value={project.gallery?.join(', ') || ''}
              onChange={(e) => updateProject('gallery', e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s))}
              rows={3}
              placeholder="/images/projects/img-1.jpg, /images/projects/img-2.jpg, /images/projects/img-3.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              Imagen Principal
            </label>
            <input
              type="text"
              value={service.image || ''}
              onChange={(e) => updateService('image', e.target.value)}
              placeholder="/images/services/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Galería de Imágenes (separadas por coma)
            </label>
            <textarea
              value={service.gallery?.join(', ') || ''}
              onChange={(e) => updateService('gallery', e.target.value.split(',').map((s: string) => s.trim()).filter((s: string) => s))}
              rows={2}
              placeholder="/images/services/img-1.jpg, /images/services/img-2.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
            <input
              type="text"
              value={testimonial.image || ''}
              onChange={(e) => updateTestimonial('image', e.target.value)}
              placeholder="/images/testimonials/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {testimonial.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={testimonial.image} 
                alt="Preview" 
                className="mt-2 h-32 w-32 object-cover rounded-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

