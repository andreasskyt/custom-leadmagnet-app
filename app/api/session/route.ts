import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  let body: { id: string; name: string; email: string; business_name: string; tools: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { id, name, email, business_name, tools } = body
  if (!id || !name || !email || !business_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await getSupabase()
    .from('audit_sessions')
    .insert({ id, name, email, business_name, tools })

  if (error) {
    console.error('Session create error:', error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }

  return NextResponse.json({ id })
}
