# 📖 Guía del Panel de Administración - Refined LLC

## 🎉 ¡Bienvenido a tu Editor Visual!

Este panel te permite editar TODO el contenido de tu sitio web de forma visual y sencilla, similar a WordPress o cualquier editor moderno.

---

## 🚀 Cómo Acceder al Panel

### Método 1: Desde el Footer del Sitio
1. Ve a cualquier página de tu sitio web
2. Baja hasta el **footer** (pie de página)
3. Busca el ícono de **candado 🔐** al lado del copyright
4. Haz clic en el candado

### Método 2: URL Directa
Visita: **`tudominio.com/admin`**

### 🔐 Credenciales de Acceso
- **Contraseña actual:** `refined2024`
- ⚠️ **IMPORTANTE:** Cambia esta contraseña antes de entregar al cliente final

---

## 🎨 Qué Puedes Editar

### 1️⃣ Información de la Empresa 🏢
- Nombre de la empresa
- Slogan
- Descripción y misión
- Información de contacto:
  - Teléfono
  - Email
  - Dirección
  - Horarios
- Enlaces de redes sociales:
  - Facebook
  - Instagram
  - LinkedIn
  - Twitter
- Estadísticas (proyectos, años, clientes, premios)
- Valores de la empresa

### 2️⃣ Proyectos 🏗️
- ✏️ **Editar** proyectos existentes
- ➕ **Agregar** nuevos proyectos
- 🗑️ **Eliminar** proyectos
- Información que puedes modificar:
  - Título (Español e Inglés)
  - Categoría
  - Ubicación
  - Año
  - Área
  - Descripción corta y completa
  - Imagen principal
  - Galería de imágenes
  - Características destacadas
  - Marcar como "Proyecto Destacado"

### 3️⃣ Servicios ⚙️
- ✏️ **Editar** servicios existentes
- Información que puedes modificar:
  - Título (Español e Inglés)
  - Categoría
  - Descripción corta y completa
  - Características/beneficios
  - Precio
  - Imagen principal
  - Galería de imágenes

### 4️⃣ Testimonios 💬
- ✏️ **Editar** testimonios existentes
- ➕ **Agregar** nuevos testimonios
- 🗑️ **Eliminar** testimonios
- Información que puedes modificar:
  - Nombre del cliente
  - Proyecto asociado
  - Testimonio/reseña (Español e Inglés)
  - Calificación (1-5 estrellas)
  - Foto del cliente

---

## 📝 Cómo Usar el Panel

### Paso 1: Iniciar Sesión
1. Ve a `/admin`
2. Ingresa la contraseña: `refined2024`
3. Haz clic en **"Acceder al Panel"**

### Paso 2: Seleccionar Sección
En el panel de la izquierda, verás 4 secciones:
- 🏢 Información de Empresa
- 🏗️ Proyectos
- ⚙️ Servicios
- 💬 Testimonios

Haz clic en la que quieras editar.

### Paso 3: Editar Contenido
1. **Selecciona** el elemento que quieres editar (si aplica)
2. **Modifica** los campos que necesites
3. Para **imágenes**, usa la ruta: `/images/carpeta/nombre-imagen.jpg`
4. Para **listas** (características, highlights), escribe cada elemento y presiona Enter

### Paso 4: Guardar Cambios
1. Haz clic en **"Guardar Cambios"** (botón azul arriba a la derecha)
2. Verás un mensaje de confirmación: **"✅ Contenido guardado exitosamente!"**
3. Los cambios se reflejan **inmediatamente** en el sitio

### Paso 5: Ver los Cambios
Haz clic en **"← Ver Sitio"** para volver al sitio y ver tus cambios.

---

## 🖼️ Cómo Agregar Imágenes

### Método Recomendado:
1. **Sube** tus imágenes a la carpeta correspondiente:
   - Proyectos: `/public/images/projects/`
   - Servicios: `/public/images/services/`
   - Testimonios: `/public/images/testimonials/`

2. **Referencia** la imagen en el panel:
   ```
   /images/projects/mi-proyecto.jpg
   /images/services/mi-servicio.jpg
   /images/testimonials/cliente.jpg
   ```

### Nombres de Archivo Recomendados:
- Sin espacios (usa guiones: `mi-proyecto.jpg`)
- Minúsculas
- Descriptivos
- Formatos: `.jpg`, `.jpeg`, `.png`, `.webp`

### Tamaños Recomendados:
- **Imágenes principales de proyectos:** 1920x1080px (16:9)
- **Galería:** 1200x800px
- **Servicios:** 800x600px
- **Testimonios:** 400x400px (cuadrado)

---

## ✨ Consejos y Mejores Prácticas

### ✅ DO's (Hacer)
- **Revisa** la ortografía antes de guardar
- **Guarda** frecuentemente tus cambios
- **Optimiza** las imágenes antes de subirlas (usa herramientas como TinyPNG)
- **Mantén** consistencia en el tono y estilo del contenido
- **Prueba** los cambios en el sitio después de guardar
- **Usa** descripciones claras y concisas

### ❌ DON'Ts (No hacer)
- No uses imágenes muy grandes (max 2MB por imagen)
- No copies y pegues contenido con formato de Word (puede causar problemas)
- No cambies el "slug" de proyectos/servicios sin pensarlo (afecta las URLs)
- No elimines campos requeridos
- No uses caracteres especiales en nombres de archivo

---

## 🔧 Configuración Avanzada

### Cambiar la Contraseña de Admin
1. Abre el archivo: `/app/admin/page.tsx`
2. Busca la línea: `if (password === 'refined2024')`
3. Cambia `'refined2024'` por tu nueva contraseña
4. Guarda el archivo

### Agregar Más Campos Personalizados
Si necesitas agregar más campos o secciones, contacta a tu desarrollador.

---

## 🆘 Solución de Problemas

### No puedo iniciar sesión
- Verifica que estás usando la contraseña correcta: `refined2024`
- Intenta cerrar el navegador y volver a abrir
- Limpia la caché del navegador

### Los cambios no se guardan
- Verifica que haces clic en "Guardar Cambios"
- Revisa que todos los campos obligatorios estén llenos
- Revisa la consola del navegador por errores (F12)

### Las imágenes no se muestran
- Verifica que la ruta de la imagen sea correcta
- Asegúrate de que el archivo existe en la carpeta `public/images/`
- Verifica que el nombre del archivo coincida (mayúsculas/minúsculas)

### El sitio se ve raro después de guardar
- Recarga la página con Ctrl+F5 (o Cmd+Shift+R en Mac)
- Limpia la caché del navegador
- Verifica que no eliminaste contenido importante

---

## 📞 Soporte Técnico

Si encuentras algún problema que no puedes resolver:

1. **Revisa** esta guía primero
2. **Toma** una captura de pantalla del error
3. **Contacta** a tu desarrollador con:
   - Descripción del problema
   - Qué estabas haciendo cuando ocurrió
   - Captura de pantalla
   - Navegador que usas

---

## 🎯 Checklist de Entrega al Cliente

Antes de entregar el sitio al cliente, asegúrate de:

- [ ] Cambiar la contraseña de admin
- [ ] Verificar que todos los contenidos estén correctos
- [ ] Probar que se pueden guardar cambios correctamente
- [ ] Verificar que las imágenes cargan correctamente
- [ ] Probar en diferentes navegadores (Chrome, Safari, Firefox)
- [ ] Probar en móvil y tablet
- [ ] Entregar esta guía al cliente
- [ ] Hacer una breve capacitación en vivo (15-30 min)

---

## 🚀 Funcionalidades Futuras (Opcional)

Si el cliente necesita funcionalidades adicionales:

### Posibles Mejoras:
- 📸 **Upload de imágenes directo** desde el panel (sin necesidad de FTP)
- 👥 **Múltiples usuarios** con diferentes niveles de acceso
- 📊 **Historial de cambios** y capacidad de deshacer
- 🌐 **Editor WYSIWYG** (What You See Is What You Get)
- 📱 **App móvil** para editar contenido
- 🔔 **Notificaciones** cuando se publican cambios
- 📈 **Analytics** integrado en el panel

Consulta con tu desarrollador para implementar estas funcionalidades.

---

## 📚 Recursos Adicionales

### Tutoriales en Video (Recomendado)
Puedes crear videotutoriales cortos (2-3 min) mostrando:
1. Cómo iniciar sesión
2. Cómo editar un proyecto
3. Cómo agregar un testimonio
4. Cómo cambiar información de contacto

### Documentación de Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- Para desarrolladores que quieran extender el sistema

---

## ✅ Listo para Usar

Tu panel de administración está **100% funcional** y listo para usar.

**¡Empieza a editar tu sitio ahora mismo!** 🎨

Visita: **[tudominio.com/admin](http://localhost:3009/admin)**

---

*Guía creada para Refined LLC - Panel de Administración Visual*  
*Última actualización: Noviembre 2024*

