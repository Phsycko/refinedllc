'use client'

import testimonialsData from '@/content/testimonials.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TestimonialList() {
  const { t } = useLanguage()

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-secondary italic mb-4">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="font-semibold text-primary text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-secondary mt-1">
                  {testimonial.role}
                </p>
                <p className="text-xs text-accent mt-1">
                  {testimonial.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

