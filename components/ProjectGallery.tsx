'use client'

import Image from 'next/image'

interface ProjectGalleryProps {
  images: string[]
  projectTitle: string
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={`${projectTitle} - Imagen ${index + 1}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  )
}