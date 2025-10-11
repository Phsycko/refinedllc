import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('auto_replies')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error fetching auto-reply:', error)
      return NextResponse.json(
        { error: 'Error al obtener la configuración de auto-respuesta' },
        { status: 500 }
      )
    }

    // Si no existe, devolver valores por defecto
    if (!data) {
      return NextResponse.json({
        success: true,
        data: {
          id: null,
          message: 'Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.',
          active: false,
        }
      }, { status: 200 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/auto-replies:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, active } = body

    if (message === undefined || active === undefined) {
      return NextResponse.json(
        { error: 'Mensaje y estado activo son requeridos' },
        { status: 400 }
      )
    }

    // Verificar si ya existe un registro
    const { data: existingData } = await supabase
      .from('auto_replies')
      .select('id')
      .single()

    let result

    if (existingData) {
      // Actualizar registro existente
      result = await supabase
        .from('auto_replies')
        .update({
          message,
          active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingData.id)
        .select()
        .single()
    } else {
      // Crear nuevo registro
      result = await supabase
        .from('auto_replies')
        .insert({
          message,
          active,
        })
        .select()
        .single()
    }

    const { data, error } = result

    if (error) {
      console.error('Error saving auto-reply:', error)
      return NextResponse.json(
        { error: 'Error al guardar la configuración de auto-respuesta' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in POST /api/auto-replies:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}


