import Link from 'next/link'
import servicesData from '@/content/services.json'

export const revalidate = 1800

export const metadata = {
  title: 'Nuestros Servicios - Refined LLC',
  description: 'Servicios profesionales de diseño arquitectónico, construcción y remodelación.',
}

export default function ServicesPage() {
  // Agrupar servicios por categoría
  const categories = Array.from(new Set(servicesData.map(s => s.category)))

  return (
    <>
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Nuestros Servicios
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Soluciones completas para tus proyectos de construcción y diseño
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryServices = servicesData.filter(s => s.category === category)
            
            return (
              <div key={category} className="mb-16 last:mb-0">
                <h2 className="text-2xl font-bold text-primary mb-8 border-l-4 border-accent pl-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/servicios/${service.slug}`}
                      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="h-20 w-20 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                            {service.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-secondary">
                          {service.description}
                        </p>
                        <div className="mt-4 flex items-center text-accent font-medium text-sm">
                          <span>Ver detalles</span>
                          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        {service.price && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm font-semibold text-primary">
                              {service.price}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contáctanos para discutir tus necesidades específicas. Ofrecemos soluciones personalizadas para cada proyecto.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-md bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl"
          >
            Contactar ahora
          </Link>
        </div>
      </section>
    </>
  )
}
