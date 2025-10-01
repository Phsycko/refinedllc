import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendAutoReply } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body

    // Validar datos
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Guardar mensaje en la base de datos
    const { data: messageData, error: messageError } = await supabase
      .from('messages')
      .insert({
        name,
        email,
        phone,
        service,
        message,
        status: 'new',
      })
      .select()
      .single()

    if (messageError) {
      console.error('Error saving message:', messageError)
      return NextResponse.json(
        { error: 'Error al guardar el mensaje' },
        { status: 500 }
      )
    }

    // Verificar si hay auto-respuesta activa
    const { data: autoReplyData, error: autoReplyError } = await supabase
      .from('auto_replies')
      .select('*')
      .eq('active', true)
      .single()

    if (!autoReplyError && autoReplyData) {
      // Enviar email automático
      await sendAutoReply(email, name, autoReplyData.message)
    }

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado exitosamente', data: messageData },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/messages:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    let query = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json(
        { error: 'Error al obtener mensajes' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/messages:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

