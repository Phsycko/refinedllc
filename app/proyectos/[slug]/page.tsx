import { notFound } from 'next/navigation'
import projectsData from '@/content/projects.json'
import ProjectDetailClient from './ProjectDetailClient'

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
      title: 'Project not found',
    }
  }

  return {
    title: `${project.title_en || project.title} - Refined LLC`,
    description: project.description_en || project.description,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsData.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
