# Guía para Agregar Imágenes Reales

Actualmente, el proyecto usa placeholders de gradientes para todas las imágenes. Esta guía te ayudará a reemplazarlos con imágenes reales.

## 📁 Estructura de Imágenes

```
public/
├── logo.png                    # Logo de la empresa (200x200px)
└── images/
    ├── services/               # Imágenes de servicios
    │   ├── arquitectura.jpg
    │   ├── construccion.jpg
    │   ├── remodelacion.jpg
    │   └── comercial.jpg
    └── projects/               # Imágenes de proyectos
        ├── villa-pacific-main.jpg
        ├── villa-pacific-1.jpg
        ├── villa-pacific-2.jpg
        ├── tech-hub-main.jpg
        ├── tech-hub-1.jpg
        └── ...
```

## 🖼️ Especificaciones de Imágenes

### Logo
- **Ubicación**: `/public/logo.png`
- **Tamaño**: 200x200px (o mayor, se redimensionará)
- **Formato**: PNG con fondo transparente preferible
- **Usado en**: Header, Footer

### Imágenes de Servicios
- **Ubicación**: `/public/images/services/`
- **Tamaño recomendado**: 1200x675px (ratio 16:9)
- **Formato**: JPG o PNG
- **Calidad**: Alta (80-90%)

**Archivos necesarios:**
- `arquitectura.jpg`
- `construccion.jpg`
- `remodelacion.jpg`
- `comercial.jpg`

### Imágenes de Proyectos
- **Ubicación**: `/public/images/projects/`
- **Tamaño recomendado**: 1200x900px (ratio 4:3)
- **Formato**: JPG o PNG
- **Calidad**: Alta (80-90%)

**Archivos necesarios** (según `projects.json`):
- Villa Moderna Pacific Coast:
  - `villa-pacific-main.jpg`
  - `villa-pacific-1.jpg` hasta `villa-pacific-5.jpg`
- Tech Startup Hub:
  - `tech-hub-main.jpg`
  - `tech-hub-1.jpg` hasta `tech-hub-4.jpg`
- Penthouse Downtown:
  - `penthouse-main.jpg`
  - `penthouse-1.jpg` hasta `penthouse-3.jpg`
- Residencia Familiar:
  - `family-home-main.jpg`
  - `family-home-1.jpg` hasta `family-home-3.jpg`

### Imágenes de Testimonios (Opcional)
- **Ubicación**: `/public/images/testimonials/`
- **Tamaño**: 200x200px (fotos de perfil)
- **Formato**: JPG
- **Archivos**: 
  - `jennifer-w.jpg`
  - `michael-c.jpg`
  - `sarah-t.jpg`
  - `martinez-family.jpg`

## 🔄 Cómo Actualizar las Imágenes

### Paso 1: Crear Carpetas
```bash
cd public
mkdir -p images/services images/projects images/testimonials
```

### Paso 2: Agregar Imágenes
Copia tus imágenes a las carpetas correspondientes con los nombres exactos mencionados arriba.

### Paso 3: Actualizar Componentes

Si usaste nombres de archivo diferentes, actualiza las referencias en:

**Para servicios** (`content/services.json`):
```json
{
  "image": "/images/services/tu-imagen.jpg",
  "gallery": [
    "/images/projects/imagen-1.jpg",
    "/images/projects/imagen-2.jpg"
  ]
}
```

**Para proyectos** (`content/projects.json`):
```json
{
  "mainImage": "/images/projects/tu-imagen-principal.jpg",
  "gallery": [
    "/images/projects/imagen-1.jpg",
    "/images/projects/imagen-2.jpg"
  ]
}
```

### Paso 4: Habilitar Next.js Image

Una vez que tengas imágenes reales, puedes usar el componente `<Image>` de Next.js para optimización automática.

**Ejemplo en un componente**:

```typescript
import Image from 'next/image'

// Reemplaza el div de placeholder con:
<div className="relative aspect-[4/3]">
  <Image
    src="/images/projects/mi-proyecto.jpg"
    alt="Descripción del proyecto"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

## 📝 Optimización de Imágenes

### Antes de subir las imágenes:

1. **Redimensiona** las imágenes a los tamaños recomendados
2. **Comprime** para reducir el tamaño del archivo sin perder calidad
3. **Usa formatos modernos** como WebP si es posible

### Herramientas recomendadas:
- **Online**: TinyPNG, Squoosh, Optimizilla
- **Desktop**: ImageOptim (Mac), RIOT (Windows)
- **CLI**: `imagemagick`, `sharp`

### Script de optimización (opcional)

Puedes crear un script para optimizar automáticamente:

```bash
# Instalar sharp
npm install -D sharp

# Crear script optimize-images.js
```

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(1200, null, { withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toFile(outputPath);
}

// Usar según tus necesidades
```

## ✅ Verificación

Después de agregar las imágenes:

1. Reinicia el servidor de desarrollo (`npm run dev`)
2. Navega por el sitio y verifica que las imágenes se muestren correctamente
3. Revisa que no haya errores 404 en la consola del navegador
4. Prueba en diferentes tamaños de pantalla (responsive)

## 🎨 Alternativas a Imágenes Reales

Si no tienes imágenes profesionales todavía:

### Imágenes de Stock Gratuitas
- [Unsplash](https://unsplash.com) - Arquitectura y construcción
- [Pexels](https://pexels.com) - Fotos de alta calidad
- [Pixabay](https://pixabay.com) - Imágenes libres de derechos

### Búsqueda específica:
- "modern architecture"
- "construction site"
- "interior design"
- "commercial building"

**Tip**: Descarga imágenes de alta resolución y optimízalas antes de usarlas.

## 🚨 Importante

- **Derechos de autor**: Asegúrate de tener los derechos para usar las imágenes
- **Tamaño de archivo**: Mantén las imágenes optimizadas (< 500KB por imagen)
- **Nombres de archivo**: Usa nombres descriptivos sin espacios ni caracteres especiales
- **Formato**: Preferentemente JPG para fotos, PNG para imágenes con transparencia

---

¿Necesitas ayuda? Consulta la documentación de Next.js Image: https://nextjs.org/docs/app/api-reference/components/image

