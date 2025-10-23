'use client'

import Hero from '@/components/Hero'
import ServicesGrid from '@/components/ServicesGrid'
import FeaturedSection from '@/components/FeaturedSection'
import ProcessSteps from '@/components/ProcessSteps'
import ProjectsGrid from '@/components/ProjectsGrid'
import TestimonialList from '@/components/TestimonialList'
import ValueStats from '@/components/ValueStats'
import CTASection from '@/components/CTASection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <Hero
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        primaryCTA={{
          text: t.hero.viewProjects,
          href: '/proyectos',
        }}
        secondaryCTA={{
          text: t.hero.ourServices,
          href: '/servicios',
        }}
      />
      
      <ServicesGrid />
      
      <FeaturedSection />
      
      <ProcessSteps />
      
      <ProjectsGrid featured limit={3} />
      
      <TestimonialList />
      
      <ValueStats />
      
      <CTASection />
    </>
  )
}

