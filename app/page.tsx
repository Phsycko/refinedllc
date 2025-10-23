'use client'

import Header from '@/components/Header'
import ServicesGrid from '@/components/ServicesGrid'
import FeaturedSection from '@/components/FeaturedSection'
import ProcessSteps from '@/components/ProcessSteps'
import ProjectsGrid from '@/components/ProjectsGrid'
import TestimonialList from '@/components/TestimonialList'
import ValueStats from '@/components/ValueStats'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <>
      <Header />
      
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

