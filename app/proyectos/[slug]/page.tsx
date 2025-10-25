import { notFound } from 'next/navigation'
import projectsData from '@/content/projects.json'
import ProjectGallery from '@/components/ProjectGallery'
import CTASection from '@/components/CTASection'
import HeaderSimple from '@/components/HeaderSimple'

export const revalidate = 1800

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)
  
  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    }
  }

  return {
    title: `${project.title} - Refined LLC`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <HeaderSimple />
      {/* Hero Section */}
      <section className="relative bg-primary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 flex items-center space-x-3">
                <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-semibold text-white">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1 text-sm font-semibold text-white">
                    ★ Destacado
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-6 text-lg text-gray-300">
                {project.description}
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-400">Ubicación</div>
                  <div className="mt-1 text-white font-medium">{project.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Año</div>
                  <div className="mt-1 text-white font-medium">{project.year}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Área</div>
                  <div className="mt-1 text-white font-medium">{project.area}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Categoría</div>
                  <div className="mt-1 text-white font-medium">{project.category}</div>
                </div>
              </div>
            </div>

            {/* Main project image placeholder */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <svg className="h-32 w-32 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Sobre el Proyecto
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-secondary leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    Aspectos Destacados
                  </h3>
                  <div className="space-y-4">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center">
                            <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-secondary">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-background rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-bold text-primary mb-4">
                    Servicios Utilizados
                  </h3>
                  <div className="space-y-2">
                    {project.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-secondary">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-accent/5 rounded-lg p-6 border-2 border-accent/20">
                  <h3 className="text-lg font-bold text-primary mb-2">
                    ¿Proyecto similar?
                  </h3>
                  <p className="text-sm text-secondary mb-4">
                    Contáctanos para discutir cómo podemos ayudarte con tu proyecto.
                  </p>
                  <a
                    href="/contacto"
                    className="block w-full text-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark transition-colors"
                  >
                    Solicitar Cotización
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-primary mb-8">
                Galería del Proyecto
              </h2>
              <ProjectGallery images={project.gallery} projectTitle={project.title} />
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Descubre más proyectos"
        description="Explora nuestro portafolio completo de proyectos exitosos."
        buttonText="Ver todos los proyectos"
        buttonHref="/proyectos"
      />
    </>
  )
}
