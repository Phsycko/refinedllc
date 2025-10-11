# Refined LLC - Corporate Website

Sitio web corporativo construido con **Next.js 14 (App Router)**, **TypeScript**, y **Tailwind CSS**. Incluye páginas públicas, sistema de gestión de mensajes, y auto-respuestas automáticas por email.

## Características

- Next.js 14 con App Router
- TypeScript para type safety
- Tailwind CSS para estilos modernos
- Contenido manejado por archivos JSON
- SSG con ISR (Incremental Static Regeneration)
- Dashboard protegido para gestión de mensajes
- Sistema de auto-respuestas por email
- Base de datos Supabase
- Diseño responsive y accesible

## Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratis)
- Cuenta de Resend o servidor SMTP para emails (opcional pero recomendado)

## Instalación

### 1. Clonar e instalar dependencias

```bash
cd refined-llc
npm install
```

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# Email - Opción 1: Resend (Recomendado)
RESEND_API_KEY=tu_resend_api_key
EMAIL_FROM=noreply@refined-llc.com

# Email - Opción 2: SMTP (Gmail, Outlook, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
```

### 3. Configurar Base de Datos Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. En el panel de Supabase, ve a **SQL Editor**
3. Copia y ejecuta el contenido del archivo `supabase-schema.sql`
4. Verifica que las tablas `messages` y `auto_replies` se hayan creado correctamente

### 4. Configurar Servicio de Email

#### Opción A: Resend (Recomendado)

1. Crea una cuenta en [resend.com](https://resend.com)
2. Obtén tu API key
3. Verifica tu dominio (o usa el dominio de prueba)
4. Agrega la API key en `.env.local`

#### Opción B: SMTP (Gmail, Outlook, etc.)

Para Gmail:
1. Habilita la autenticación de 2 factores
2. Genera una contraseña de aplicación
3. Usa esas credenciales en `.env.local`

### 5. Agregar Logo

Coloca tu logo en `/public/logo.png` (formato PNG, tamaño recomendado: 200x200px)

## Desarrollo

Ejecutar el servidor de desarrollo en el puerto 3009:

```bash
npm run dev
```

Abre [http://localhost:3009](http://localhost:3009) en tu navegador.

## Build y Producción

### Build del proyecto

```bash
npm run build
```

### Ejecutar en producción

```bash
npm start
```

El sitio estará disponible en [http://localhost:3009](http://localhost:3009)

## Estructura del Proyecto

```
refined-llc/
├── app/                          # App Router
│   ├── api/                      # API Routes
│   │   ├── messages/             # Gestión de mensajes
│   │   └── auto-replies/         # Configuración de auto-respuestas
│   ├── dashboard/                # Dashboard protegido
│   │   ├── messages/             # Inbox de mensajes
│   │   └── auto-replies/         # Configuración de emails
│   ├── servicios/                # Páginas de servicios
│   ├── proyectos/                # Páginas de proyectos
│   ├── sobre/                    # Página "Sobre Nosotros"
│   ├── contacto/                 # Página de contacto
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página de inicio
│   └── globals.css               # Estilos globales
├── components/                   # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServicesGrid.tsx
│   ├── ProcessSteps.tsx
│   ├── ProjectsGrid.tsx
│   ├── TestimonialList.tsx
│   ├── ValueStats.tsx
│   ├── CTASection.tsx
│   ├── ContactForm.tsx
│   └── ProjectGallery.tsx
├── content/                      # Contenido en JSON
│   ├── services.json             # Servicios
│   ├── projects.json             # Proyectos
│   ├── testimonials.json         # Testimonios
│   └── company.json              # Información de la empresa
├── lib/                          # Utilidades
│   ├── supabase.ts               # Cliente Supabase
│   └── email.ts                  # Funciones de email
├── public/                       # Archivos estáticos
│   └── logo.png                  # Logo de la empresa
├── supabase-schema.sql           # Esquema de base de datos
├── .env.example                  # Ejemplo de variables de entorno
├── tailwind.config.ts            # Configuración de Tailwind
└── package.json
```

## Personalización

### Colores

Los colores principales se pueden modificar en `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#0F172A',    // Azul oscuro
    light: '#1E293B',
  },
  secondary: {
    DEFAULT: '#334155',    // Gris oscuro
    light: '#475569',
  },
  accent: {
    DEFAULT: '#F59E0B',    // Naranja/Ámbar
    light: '#FCD34D',
    dark: '#D97706',
  },
  background: '#F8FAFC',   // Gris claro
}
```

### Contenido

Edita los archivos JSON en `/content/` para actualizar:
- Servicios
- Proyectos
- Testimonios
- Información de la empresa

### Rutas ISR

El tiempo de revalidación (ISR) está configurado en 1800 segundos (30 minutos). Puedes ajustarlo en cada página:

```typescript
export const revalidate = 1800 // segundos
```

## Dashboard

Accede al dashboard en `/dashboard/messages` y `/dashboard/auto-replies`.

**Nota**: En esta versión, el dashboard NO está protegido con autenticación. Para producción, se recomienda implementar autenticación usando Supabase Auth o NextAuth.js.

## Auto-Respuestas

El sistema de auto-respuestas automáticas:
1. Se activa/desactiva desde el dashboard
2. Envía un email automático cuando alguien completa el formulario de contacto
3. El mensaje es personalizable
4. Requiere configuración de Resend o SMTP

## Troubleshooting

### Error: "Cannot find module '@/content/...'"

Asegúrate de que todos los archivos JSON existan en la carpeta `/content/`.

### Auto-respuestas no funcionan

1. Verifica las credenciales de email en `.env.local`
2. Revisa que la auto-respuesta esté activada en el dashboard
3. Comprueba los logs de la consola para errores

### Errores de Supabase

1. Verifica que las variables de entorno estén correctas
2. Asegúrate de haber ejecutado el script SQL
3. Comprueba las políticas RLS en Supabase

## Licencia

Este proyecto es privado y propiedad de Refined LLC.

## Soporte

Para preguntas o soporte, contacta a: info@refined-llc.com
