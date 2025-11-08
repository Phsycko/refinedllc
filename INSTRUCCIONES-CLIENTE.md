# 🎨 Editor Visual - Refined LLC
## Instrucciones para el Cliente

---

## 🎯 ¿Qué puedes hacer ahora?

Con tu nuevo **Panel de Administración Visual**, puedes editar **TODO** el contenido de tu sitio web **sin necesidad de programar**, igual que en WordPress o cualquier editor moderno.

---

## 🚀 Cómo Empezar (3 minutos)

### Paso 1: Acceder al Panel

**Opción A:** Desde tu sitio web
1. Ve a tu sitio: `http://localhost:3009` (o tu dominio)
2. Baja hasta el **footer** (final de la página)
3. Busca el **candado pequeño** 🔐 al lado del copyright
4. Haz clic en él

**Opción B:** Directo al panel
- Visita: `http://localhost:3009/admin`

### Paso 2: Inicia Sesión
```
Contraseña: refined2024
```
*(Cámbiala antes de publicar el sitio)*

### Paso 3: ¡Edita tu contenido!

---

## ✏️ ¿Qué Puedes Editar?

### 1. 🏢 Información de la Empresa
Haz clic en "🏢 Información de Empresa" en el menú lateral

**Puedes cambiar:**
- ✅ Nombre de tu empresa
- ✅ Slogan
- ✅ Descripción y misión
- ✅ Teléfono, email, dirección
- ✅ Horarios de atención
- ✅ Redes sociales (Facebook, Instagram, LinkedIn, Twitter)
- ✅ Estadísticas (proyectos completados, años de experiencia, etc.)
- ✅ Valores de la empresa

### 2. 🏗️ Proyectos
Haz clic en "🏗️ Proyectos"

**Puedes:**
- ✅ Editar proyectos existentes
- ✅ Agregar nuevos proyectos (botón "+ Nuevo")
- ✅ Eliminar proyectos (botón "Eliminar")
- ✅ Cambiar títulos, descripciones, imágenes
- ✅ Marcar proyectos como "Destacados"

### 3. ⚙️ Servicios
Haz clic en "⚙️ Servicios"

**Puedes:**
- ✅ Editar todos los servicios
- ✅ Cambiar precios
- ✅ Modificar descripciones
- ✅ Actualizar imágenes

### 4. 💬 Testimonios
Haz clic en "💬 Testimonios"

**Puedes:**
- ✅ Editar testimonios de clientes
- ✅ Cambiar calificaciones (estrellas)
- ✅ Actualizar fotos de clientes

---

## 📸 Cómo Agregar Imágenes

### Método Simple:
1. Coloca tu imagen en la carpeta correcta:
   - **Proyectos:** `public/images/projects/`
   - **Servicios:** `public/images/services/`
   - **Testimonios:** `public/images/testimonials/`

2. En el panel de admin, escribe la ruta:
   ```
   /images/projects/mi-foto.jpg
   ```

### Tips para Imágenes:
- 📏 Usa imágenes de buena calidad pero no muy pesadas (máx 2MB)
- 📝 Nombra tus archivos sin espacios: `mi-proyecto.jpg` ✅ no `mi proyecto.jpg` ❌
- 🖼️ Formatos recomendados: `.jpg` o `.png`

---

## 💾 Cómo Guardar tus Cambios

1. Después de editar, haz clic en el botón azul **"Guardar Cambios"** (arriba a la derecha)
2. Verás un mensaje: **"✅ Contenido guardado exitosamente!"**
3. ¡Listo! Los cambios ya están en tu sitio

Para ver los cambios:
- Haz clic en **"← Ver Sitio"**
- O recarga tu página principal

---

## 🎬 Tutorial Visual (Flujo Completo)

```
1. Sitio Web (cualquier página)
   ↓
2. Ir al Footer → Clic en 🔐
   ↓
3. Pantalla de Login → Ingresar: refined2024
   ↓
4. Panel de Admin (menú lateral con 4 secciones)
   ↓
5. Seleccionar sección (Ej: Proyectos)
   ↓
6. Editar campos
   ↓
7. Clic en "Guardar Cambios"
   ↓
8. ✅ ¡Listo! Ver cambios en el sitio
```

---

## 🎨 Ejemplo Práctico: Agregar un Nuevo Proyecto

### Paso a Paso:

1. **Accede al panel** (`/admin`)
2. **Inicia sesión** con la contraseña
3. **Haz clic** en "🏗️ Proyectos"
4. **Haz clic** en el botón verde **"+ Nuevo"**
5. **Llena los campos:**
   - Título (en español e inglés)
   - URL Slug (ej: `residencia-moderna-2024`)
   - Categoría (ej: `Residencial`)
   - Año (ej: `2024`)
   - Descripción
   - Imagen principal: `/images/projects/tu-imagen.jpg`
6. **Marcar** "Proyecto Destacado" si quieres que aparezca en la página principal
7. **Haz clic** en **"Guardar Cambios"**
8. **¡Listo!** Tu nuevo proyecto ya está en el sitio

---

## 🎯 Ejemplo Práctico: Cambiar Teléfono y Email

1. **Accede al panel** (`/admin`)
2. **Haz clic** en "🏢 Información de Empresa"
3. **Busca** la sección "Contacto"
4. **Cambia** el teléfono y email
5. **Haz clic** en **"Guardar Cambios"**
6. **Recarga** tu sitio → ¡Los cambios ya están!

---

## ⚙️ Configuración Recomendada

### 🔐 Cambiar la Contraseña (IMPORTANTE)

**Antes de entregar el sitio al cliente, cambia la contraseña:**

1. Abre el archivo: `app/admin/page.tsx`
2. Busca la línea 15 aproximadamente:
   ```typescript
   if (password === 'refined2024') {
   ```
3. Cambia `'refined2024'` por tu nueva contraseña segura
4. Guarda el archivo
5. Reinicia el servidor

---

## 🆘 Problemas Comunes

### "No puedo iniciar sesión"
**Solución:** Verifica que usas la contraseña correcta: `refined2024`

### "Las imágenes no aparecen"
**Solución:** 
- Verifica que la imagen esté en la carpeta `public/images/`
- Verifica que la ruta sea correcta: `/images/carpeta/archivo.jpg`
- Verifica que el nombre del archivo coincida exactamente

### "Los cambios no se guardaron"
**Solución:**
- Haz clic en el botón "Guardar Cambios"
- Verifica que llenaste todos los campos obligatorios
- Recarga la página con Ctrl+F5

### "El sitio se ve raro"
**Solución:**
- Limpia la caché del navegador (Ctrl+Shift+Delete)
- Recarga con Ctrl+F5
- Verifica que no eliminaste contenido importante

---

## 📱 Compatibilidad

El panel funciona en:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Tablets
- ✅ Móviles (con pantalla suficientemente grande)

---

## 🎓 Recursos de Ayuda

1. **GUIA-ADMIN.md** - Guía completa y detallada
2. **ADMIN-QUICKSTART.md** - Guía rápida de referencia
3. Este archivo - Instrucciones para el cliente

---

## ✅ Checklist de Uso Diario

Cuando quieras actualizar tu sitio:

- [ ] Acceder a `/admin`
- [ ] Iniciar sesión
- [ ] Seleccionar sección a editar
- [ ] Hacer los cambios necesarios
- [ ] Guardar cambios
- [ ] Verificar en el sitio que todo se ve bien
- [ ] ¡Listo!

---

## 🎉 ¡Ya Estás Listo!

Tu sitio ahora es **100% editable** de forma visual.

**No necesitas:**
- ❌ Saber programar
- ❌ Acceder a código
- ❌ Usar FTP
- ❌ Editar archivos complicados

**Solo necesitas:**
- ✅ Acceder al panel (`/admin`)
- ✅ Editar lo que quieras
- ✅ Guardar
- ✅ ¡Ya está!

---

## 📞 Contacto

Si tienes dudas o necesitas ayuda, contacta a tu desarrollador con:
- Captura de pantalla del problema
- Descripción de qué estabas haciendo
- Navegador que usas

---

## 🚀 Próximos Pasos Opcionales

Si en el futuro necesitas:
- 📸 Subir imágenes directamente desde el panel
- 👥 Múltiples usuarios administradores
- 📊 Ver estadísticas de visitas
- 🎨 Editor visual más avanzado (drag & drop)

Consulta con tu desarrollador para agregar estas funcionalidades.

---

**¡Disfruta de tu nuevo panel de administración!** 🎨✨

*Última actualización: Noviembre 2024*

