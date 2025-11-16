# 🚀 Panel de Admin - Inicio Rápido

## Acceso Rápido

**URL:** `http://localhost:3009/admin` (desarrollo) o `tudominio.com/admin` (producción)

**Contraseña:** `refined2024`

---

## ⚡ Uso en 3 Pasos

### 1. Accede al Panel
- Ve al footer del sitio y haz clic en 🔐
- O visita `/admin` directamente
- Ingresa la contraseña

### 2. Edita el Contenido
- Selecciona una sección en el menú lateral
- Edita los campos que necesites
- Las imágenes se referencian como: `/images/carpeta/archivo.jpg`

### 3. Guarda los Cambios
- Haz clic en el botón azul **"Guardar Cambios"**
- Los cambios se aplican inmediatamente
- Regresa al sitio para verlos

---

## 📂 Estructura de Archivos

```
refined-llc/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Login del admin
│   │   └── edit/
│   │       └── page.tsx      # Panel de edición
│   └── api/
│       └── content/
│           └── [type]/
│               └── route.ts  # API para guardar/cargar contenido
├── content/
│   ├── company.json          # Información de la empresa
│   ├── projects.json         # Proyectos
│   ├── services.json         # Servicios
│   └── testimonials.json     # Testimonios
├── public/
│   └── images/               # Imágenes del sitio
└── GUIA-ADMIN.md            # Guía completa
```

---

## 🎨 Secciones Editables

| Sección | Archivo | Qué contiene |
|---------|---------|--------------|
| 🏢 Empresa | `content/company.json` | Nombre, slogan, contacto, redes sociales, stats |
| 🏗️ Proyectos | `content/projects.json` | Portfolio de proyectos completados |
| ⚙️ Servicios | `content/services.json` | Servicios ofrecidos |
| 💬 Testimonios | `content/testimonials.json` | Reseñas de clientes |

---

## 🔐 Seguridad

### Cambiar la Contraseña

Edita: `app/admin/page.tsx`

```typescript
// Busca esta línea (aproximadamente línea 15)
if (password === 'refined2024') {
  // Cambia 'refined2024' por tu nueva contraseña
}
```

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| No puedo iniciar sesión | Usa la contraseña: `refined2024` |
| Los cambios no se guardan | Verifica que hiciste clic en "Guardar Cambios" |
| Las imágenes no aparecen | Verifica la ruta: `/images/carpeta/archivo.jpg` |
| Error al guardar | Revisa la consola del navegador (F12) |

---

## 📖 Documentación Completa

Para más detalles, consulta: **`GUIA-ADMIN.md`**

---

## ✅ Checklist de Producción

Antes de entregar al cliente:

- [ ] Cambiar contraseña de admin
- [ ] Verificar que todos los contenidos son correctos
- [ ] Probar guardar/cargar en todas las secciones
- [ ] Verificar en diferentes navegadores
- [ ] Entregar `GUIA-ADMIN.md` al cliente
- [ ] Capacitación breve (15-30 min)

---

**¡El panel está listo para usar!** 🎉


