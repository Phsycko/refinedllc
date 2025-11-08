import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// GET - Leer contenido
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params
    
    // Mapear tipo a archivo
    const fileMap: { [key: string]: string } = {
      'company': 'company.json',
      'projects': 'projects.json',
      'services': 'services.json',
      'testimonials': 'testimonials.json',
    }

    const fileName = fileMap[type]
    if (!fileName) {
      return NextResponse.json(
        { error: 'Tipo de contenido inválido' },
        { status: 400 }
      )
    }

    const filePath = path.join(process.cwd(), 'content', fileName)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContent)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json(
      { error: 'Error al leer el contenido' },
      { status: 500 }
    )
  }
}

// POST - Guardar contenido
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params
    const body = await request.json()

    // Mapear tipo a archivo
    const fileMap: { [key: string]: string } = {
      'company': 'company.json',
      'projects': 'projects.json',
      'services': 'services.json',
      'testimonials': 'testimonials.json',
    }

    const fileName = fileMap[type]
    if (!fileName) {
      return NextResponse.json(
        { error: 'Tipo de contenido inválido' },
        { status: 400 }
      )
    }

    const filePath = path.join(process.cwd(), 'content', fileName)
    
    // Formatear JSON con indentación
    const jsonContent = JSON.stringify(body, null, 2)
    
    // Guardar archivo
    await fs.writeFile(filePath, jsonContent, 'utf8')

    return NextResponse.json({ success: true, message: 'Contenido guardado exitosamente' })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Error al guardar el contenido' },
      { status: 500 }
    )
  }
}

