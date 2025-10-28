import { notFound } from 'next/navigation'
import servicesData from '@/content/services.json'
import ServiceDetailClient from './ServiceDetailClient'

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
      title: 'Service not found',
    }
  }

  return {
    title: `${service.title_en || service.title} - Refined LLC`,
    description: service.description_en || service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  return <ServiceDetailClient service={service} />
}
