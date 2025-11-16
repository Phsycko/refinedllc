'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import projectsData from '@/content/projects.json'
import { useLanguage } from '@/contexts/LanguageContext'
import HeaderSimple from '@/components/HeaderSimple'

export default function ProjectsPage() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  // Obtener categorías únicas traducidas
  const categoriesSet = new Set<string>()
  projectsData.forEach((p) => {
    const category = language === 'en' && p.category_en ? p.category_en : p.category
    categoriesSet.add(category)
  })
  let categories = Array.from(categoriesSet)
  // Mostrar solo Residencial y Comercial (ocultar Remodelación)
  categories = categories.filter((c) => {
    const normalized = c.toLowerCase()
    return normalized === 'residencial' || normalized === 'comercial' || normalized === 'residential' || normalized === 'commercial'
  })

  // Filtrar proyectos por categoría seleccionada
  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter((p) => {
        const projectCategory = language === 'en' && p.category_en ? p.category_en : p.category
        return projectCategory === selectedCategory
      })

  return (
    <>
      <HeaderSimple />
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {t.projects.pageTitle}
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              {t.projects.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filtros por categoría */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-white text-secondary hover:bg-accent hover:text-white'
              }`}
            >
              {t.projects.all}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-white text-secondary hover:bg-accent hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid de proyectos */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const title = language === 'en' && project.title_en ? project.title_en : project.title
              const description = language === 'en' && project.description_en ? project.description_en : project.description
              const category = language === 'en' && project.category_en ? project.category_en : project.category
              
              return (
                <Link
                  key={project.id}
                  href={`/proyectos/${project.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                    <Image
                      src={project.mainImage || project.gallery[0]}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                          {t.projects.featured}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary">
                        {category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-secondary line-clamp-2">
                      {description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-secondary">
                        <svg className="h-4 w-4 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {project.location}
                      </div>
                      <div className="flex items-center justify-between text-sm text-secondary">
                        <span>{project.year}</span>
                        <span>{project.area}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Mensaje si no hay proyectos */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-secondary">
                {language === 'en' 
                  ? 'No projects found in this category.'
                  : 'No se encontraron proyectos en esta categoría.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
