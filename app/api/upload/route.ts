import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'general'

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, WebP, GIF)' },
        { status: 400 }
      )
    }

    // Validar tamaño (máx 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Tamaño máximo: 5MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase()
    const fileName = `${timestamp}-${originalName}`

    // Mapear carpetas válidas
    const validFolders: { [key: string]: string } = {
      'projects': 'projects',
      'services': 'services',
      'testimonials': 'testimonials',
      'general': '',
      'hero': 'hero'
    }

    const targetFolder = validFolders[folder] || ''
    const filePath = path.join(
      process.cwd(),
      'public',
      'images',
      targetFolder,
      fileName
    )

    // Guardar archivo
    await writeFile(filePath, buffer)

    // Generar URL pública
    const publicUrl = `/images/${targetFolder ? targetFolder + '/' : ''}${fileName}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: fileName,
      message: 'Imagen subida exitosamente'
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error al subir el archivo' },
      { status: 500 }
    )
  }
}

// Agregar configuración para archivos grandes
export const config = {
  api: {
    bodyParser: false,
  },
}

