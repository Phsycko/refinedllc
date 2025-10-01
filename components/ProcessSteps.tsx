const steps = [
  {
    number: 1,
    title: 'Consulta Inicial',
    description: 'Nos reunimos contigo para entender tu visión, necesidades y presupuesto.',
  },
  {
    number: 2,
    title: 'Diseño y Planificación',
    description: 'Creamos diseños detallados y planos que dan vida a tu proyecto.',
  },
  {
    number: 3,
    title: 'Aprobaciones y Permisos',
    description: 'Gestionamos todos los permisos y aprobaciones necesarias.',
  },
  {
    number: 4,
    title: 'Construcción',
    description: 'Ejecutamos el proyecto con precisión, calidad y dentro del plazo.',
  },
  {
    number: 5,
    title: 'Entrega Final',
    description: 'Revisamos cada detalle y entregamos tu proyecto completado.',
  },
]

export default function ProcessSteps() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Nuestro Proceso
          </h2>
          <p className="mt-4 text-lg text-secondary max-w-2xl mx-auto">
            Un enfoque sistemático que garantiza resultados excepcionales
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on mobile, shown on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-accent/30" />
              )}
              
              <div className="relative bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

