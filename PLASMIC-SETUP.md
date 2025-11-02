# 🎨 Guía de Configuración de Plasmic

## 📋 Paso 1: Crear cuenta en Plasmic

1. Ve a [https://www.plasmic.app](https://www.plasmic.app)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

## 🔑 Paso 2: Obtener credenciales

1. En tu proyecto de Plasmic, ve a **Settings** (⚙️)
2. Copia el **Project ID**
3. Genera un **API Token** (en la sección de API)

## 📝 Paso 3: Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
PLASMIC_PROJECT_ID="tu-project-id-aqui"
PLASMIC_PROJECT_API_TOKEN="tu-api-token-aqui"
```

## 🎯 Paso 4: Configurar el Host URL en Plasmic

1. En Plasmic, ve a **Settings** → **Host URLs**
2. Agrega:
   - **Desarrollo:** `http://localhost:3009/plasmic-host`
   - **Producción:** `https://tudominio.com/plasmic-host`

## 🎨 Paso 5: Crear tu primera página

1. En Plasmic, crea una nueva **Page**
2. Configura el **Path** (ej: `/` para homepage, `/servicios` para servicios)
3. **Arrastra componentes** desde el panel izquierdo:
   - Header
   - ServicesGrid
   - ProcessSteps
   - ProjectsGrid
   - TestimonialList
   - ValueStats
   - CTASection
   - ContactForm
   - Footer
   - FeaturedSection

## ⚙️ Paso 6: Configurar Webhook para revalidación

1. En Plasmic → **Settings** → **Webhooks**
2. Agrega un webhook con:
   - **URL:** `https://tudominio.com/api/revalidate`
   - **Event:** `publish`
   - **Method:** POST

Esto hará que el sitio se actualice automáticamente cuando publiques cambios.

## 🚀 Componentes Disponibles

Todos tus componentes están registrados y listos para usar:

- **Header** - Menú de navegación
- **ServicesGrid** - Grid de servicios (acepta props: featured, limit)
- **ProcessSteps** - Pasos del proceso
- **ProjectsGrid** - Grid de proyectos (acepta props: featured, limit)
- **TestimonialList** - Lista de testimonios
- **ValueStats** - Estadísticas de valor
- **CTASection** - Sección de llamada a la acción
- **ContactForm** - Formulario de contacto
- **FeaturedSection** - Sección destacada
- **Footer** - Pie de página

## 📱 Vista Previa

Para ver cambios en tiempo real:
1. En Plasmic, click en **Preview**
2. Edita elementos y verás cambios instantáneos
3. Click en **Publish** para hacer los cambios visibles en producción

## 🔄 Flujo de trabajo

1. **Editar en Plasmic** → Arrastra componentes, edita textos/imágenes
2. **Preview** → Ve cambios en tiempo real
3. **Publish** → Webhook dispara revalidación automática
4. **¡Listo!** → Cambios visibles en el sitio

## 💡 Tips

- Los componentes mantienen su funcionalidad original
- Las traducciones ES/EN siguen funcionando
- Puedes combinar páginas de Plasmic con páginas de Next.js normales
- ISR mantiene el rendimiento óptimo

## 🆘 Soporte

Si tienes problemas, verifica:
1. Variables de entorno correctas en `.env.local`
2. Host URL configurado en Plasmic
3. Servidor corriendo en el puerto 3009

