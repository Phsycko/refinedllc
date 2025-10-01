import Link from 'next/link'
import projectsData from '@/content/projects.json'

interface ProjectsGridProps {
  featured?: boolean
  limit?: number
}

export default function ProjectsGrid({ featured = false, limit }: ProjectsGridProps) {
  let projects = featured 
    ? projectsData.filter(p => p.featured) 
    : projectsData

  if (limit) {
    projects = projects.slice(0, limit)
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            {featured ? 'Proyectos Destacados' : 'Nuestros Proyectos'}
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
            Portafolio de trabajos que demuestran nuestra excelencia
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/proyectos/${project.slug}`}
              className="group relative overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-xl"
            >
              <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg className="h-20 w-20 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-secondary line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-secondary">
                  <span className="flex items-center">
                    <svg className="h-4 w-4 mr-1 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </span>
                  <span>{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!limit && (
          <div className="mt-12 text-center">
            <Link
              href="/proyectos"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-light hover:shadow-md"
            >
              Ver todos los proyectos
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

