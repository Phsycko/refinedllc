import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import ProcessSteps from '@/components/ProcessSteps'
import ProjectsGrid from '@/components/ProjectsGrid'
import TestimonialList from '@/components/TestimonialList'
import ValueStats from '@/components/ValueStats'
import CTASection from '@/components/CTASection'

export const revalidate = 1800 // ISR: revalidar cada 30 minutos

export default function HomePage() {
  return (
    <>
      <Hero
        title="Transformando Visiones en Realidad"
        subtitle="Diseño arquitectónico y construcción de clase mundial. Más de 9 años creando espacios excepcionales que superan expectativas."
        primaryCTA={{
          text: 'Ver Proyectos',
          href: '/proyectos',
        }}
        secondaryCTA={{
          text: 'Nuestros Servicios',
          href: '/servicios',
        }}
      />
      
      <ServicesGrid />
      
      <ProcessSteps />
      
      <ProjectsGrid featured limit={3} />
      
      <TestimonialList />
      
      <ValueStats />
      
      <CTASection />
    </>
  )
}

