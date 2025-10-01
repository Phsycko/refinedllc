import companyData from '@/content/company.json'
import ValueStats from '@/components/ValueStats'
import CTASection from '@/components/CTASection'

export const revalidate = 1800

export const metadata = {
  title: 'Sobre Nosotros - Refined LLC',
  description: companyData.description,
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Sobre Refined LLC
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              {companyData.slogan}
            </p>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Quiénes Somos
            </h2>
            <p className="text-lg text-secondary leading-relaxed">
              {companyData.description}
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Nuestra Misión
            </h3>
            <p className="text-lg text-secondary leading-relaxed text-center">
              {companyData.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">
              Nuestros Valores
            </h2>
            <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
              Los principios que guían todo lo que hacemos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyData.values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-accent/10 p-3">
                    <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary text-center mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-secondary text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <ValueStats />

      {/* Why Choose Us */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">
              ¿Por Qué Elegirnos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-accent/10 p-4">
                  <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Calidad Garantizada
              </h3>
              <p className="text-secondary">
                Cada proyecto se ejecuta con los más altos estándares de calidad y artesanía.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-accent/10 p-4">
                  <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Entrega a Tiempo
              </h3>
              <p className="text-secondary">
                Respetamos los plazos y mantenemos nuestro compromiso con fechas de entrega.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-accent/10 p-4">
                  <svg className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Equipo Experto
              </h3>
              <p className="text-secondary">
                Profesionales altamente calificados con años de experiencia en la industria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">
              Licencias y Certificaciones
            </h2>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <ul className="space-y-4">
              {companyData.licenses.map((license, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-secondary">{license}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
