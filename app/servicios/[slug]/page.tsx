import { notFound } from 'next/navigation'
import servicesData from '@/content/services.json'
import ProjectGallery from '@/components/ProjectGallery'
import CTASection from '@/components/CTASection'

export const revalidate = 1800

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)
  
  if (!service) {
    return {
      title: 'Servicio no encontrado',
    }
  }

  return {
    title: `${service.title} - Refined LLC`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-accent px-4 py-1 text-sm font-semibold text-white">
                {service.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              {service.description}
            </p>
            {service.price && (
              <p className="mt-4 text-xl font-semibold text-accent">
                {service.price}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-secondary leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Características del Servicio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {service.gallery && service.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Galería de Proyectos
              </h2>
              <ProjectGallery images={service.gallery} projectTitle={service.title} />
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="¿Interesado en este servicio?"
        description="Contáctanos para una consulta gratuita y descubre cómo podemos ayudarte con tu proyecto."
        buttonText="Solicitar cotización"
      />
    </>
  )
}
