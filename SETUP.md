# Guía Rápida de Configuración - Refined LLC

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
```bash
cd refined-llc
npm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

**IMPORTANTE**: Antes de ejecutar el proyecto, debes configurar las siguientes variables en `.env.local`:

#### Supabase (REQUERIDO)
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

**Cómo obtener las credenciales:**
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Ve a Settings > API
4. Copia la URL del proyecto y las API keys

#### Email (OPCIONAL)
Si quieres que funcionen las auto-respuestas, configura una de estas opciones:

**Opción A: Resend (Recomendado)**
```env
RESEND_API_KEY=tu_resend_api_key
EMAIL_FROM=noreply@refined-llc.com
```

**Opción B: SMTP (Gmail, Outlook, etc.)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_app_password
```

### 3. Configurar Base de Datos

1. Abre tu proyecto en Supabase
2. Ve a **SQL Editor**
3. Copia y pega el contenido completo de `supabase-schema.sql`
4. Ejecuta el script (Run)
5. Verifica que las tablas `messages` y `auto_replies` se hayan creado en la sección **Table Editor**

### 4. Ejecutar el Proyecto

```bash
# Desarrollo (puerto 3009)
npm run dev

# Build de producción
npm run build

# Ejecutar en producción
npm start
```

El sitio estará disponible en: **http://localhost:3009**

## 📂 Estructura del Proyecto

```
refined-llc/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard administrativo
│   ├── servicios/         # Páginas de servicios
│   ├── proyectos/         # Páginas de proyectos
│   ├── sobre/            # Sobre nosotros
│   └── contacto/         # Contacto
├── components/            # Componentes React
├── content/              # Contenido en JSON
├── lib/                  # Utilidades
└── public/              # Archivos estáticos
```

## 🎨 Personalización

### Editar Contenido

Todos los contenidos se manejan desde archivos JSON en `/content/`:
- `services.json` - Servicios ofrecidos
- `projects.json` - Portafolio de proyectos
- `testimonials.json` - Testimonios de clientes
- `company.json` - Información de la empresa

### Cambiar Colores

Edita `tailwind.config.ts`:
```typescript
colors: {
  primary: '#0F172A',    // Tu color primario
  accent: '#F59E0B',     // Tu color de acento
  // ...
}
```

### Reemplazar Logo

Sustituye el logo placeholder en `/public/logo.png` con tu propio logo (200x200px recomendado).

## 📱 Dashboard

Accede al dashboard en:
- **Mensajes**: http://localhost:3009/dashboard/messages
- **Auto-respuestas**: http://localhost:3009/dashboard/auto-replies

**NOTA**: El dashboard actualmente NO está protegido con autenticación. Para producción, implementa autenticación usando Supabase Auth.

## ✅ Verificación

Para verificar que todo está funcionando:

1. **Build exitoso**:
   ```bash
   npm run build
   ```
   Debe completarse sin errores.

2. **Probar formulario de contacto**:
   - Ve a http://localhost:3009/contacto
   - Completa y envía el formulario
   - Verifica en Dashboard > Mensajes que aparezca

3. **Verificar Supabase**:
   - Ve a tu proyecto en Supabase
   - Abre Table Editor > messages
   - Debe aparecer el mensaje de prueba

## 🐛 Solución de Problemas

### Error: "Cannot find module '@/content/...'"
→ Asegúrate de que todos los archivos JSON existan en `/content/`

### Error: "supabaseUrl is required"
→ Verifica que las variables de Supabase estén en `.env.local`

### Las auto-respuestas no funcionan
→ Configura las credenciales de email en `.env.local`
→ Activa las auto-respuestas en el dashboard

### Build falla
→ Ejecuta `npm install` de nuevo
→ Verifica que todas las dependencias estén instaladas

## 📧 Soporte

Para preguntas adicionales, consulta el `README.md` completo.

