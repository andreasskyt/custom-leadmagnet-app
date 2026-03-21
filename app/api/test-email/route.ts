import { NextRequest, NextResponse } from 'next/server'
import type { SubmitPayload } from '@/lib/types'
import { calculateScores } from '@/lib/scoring'
import { sendAuditEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  let payload: SubmitPayload & { notionPageUrl?: string }
  try {
    payload = (await req.json()) as SubmitPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { answers, contactData } = payload

  if (!answers || !Array.isArray(answers) || answers.length !== 24) {
    return NextResponse.json({ error: 'Expected 24 answers' }, { status: 400 })
  }
  if (!contactData?.name || !contactData?.email || !contactData?.businessName) {
    return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 })
  }

  try {
    const assessmentResult = calculateScores(answers)

    await sendAuditEmail({
      to: contactData.email,
      name: contactData.name,
      result: assessmentResult,
      contact: contactData,
      notionPageUrl: payload.notionPageUrl ?? 'https://audit.skytsystems.com',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('test-email route error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
