import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await getSupabase()
    .from('audit_sessions')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let body: { type: 'answers' | 'complete'; answers?: Record<string, number>; notion_page_url?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (body.type === 'answers') {
    const { error } = await getSupabase()
      .from('audit_sessions')
      .update({ answers: body.answers })
      .eq('id', params.id)

    if (error) {
      console.error('Session answers update error:', error)
      return NextResponse.json({ error: 'Failed to update answers' }, { status: 500 })
    }
  } else if (body.type === 'complete') {
    const { error } = await getSupabase()
      .from('audit_sessions')
      .update({ completed_at: new Date().toISOString(), notion_page_url: body.notion_page_url })
      .eq('id', params.id)

    if (error) {
      console.error('Session complete update error:', error)
      return NextResponse.json({ error: 'Failed to mark complete' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: 'Invalid patch type' }, { status: 400 })
  }

  return NextResponse.json({ ok: true })
}
