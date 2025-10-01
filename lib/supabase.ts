import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Message = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: 'new' | 'read' | 'responded'
  response: string | null
  created_at: string
  updated_at: string
}

export type AutoReply = {
  id: string
  message: string
  active: boolean
  updated_at: string
}

