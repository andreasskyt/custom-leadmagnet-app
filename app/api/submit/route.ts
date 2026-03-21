import { NextRequest, NextResponse } from 'next/server'
import type { SubmitPayload } from '@/lib/types'
import { calculateScores } from '@/lib/scoring'
import { generateAiContent } from '@/lib/claude'
import { duplicateAndPopulateTemplate } from '@/lib/notion'
import { sendSlackNotification } from '@/lib/slack'
import { sendAuditEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  let payload: SubmitPayload
  try {
    payload = (await req.json()) as SubmitPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { answers, contactData } = payload

  // Basic validation
  if (!answers || !Array.isArray(answers) || answers.length !== 24) {
    return NextResponse.json({ error: 'Expected 24 answers' }, { status: 400 })
  }
  if (!contactData?.name || !contactData?.email || !contactData?.businessName) {
    return NextResponse.json({ error: 'Missing required contact fields' }, { status: 400 })
  }

  try {
    // Step 1: Score
    const assessmentResult = calculateScores(answers)

    // Step 2: Claude AI content (must complete before Notion)
    const aiContent = await generateAiContent(assessmentResult, contactData)

    // Step 3: Notion — duplicate template and populate
    const notionPageUrl = await duplicateAndPopulateTemplate(assessmentResult, contactData, aiContent)

    // Step 4: Notify in parallel (non-fatal)
    await Promise.allSettled([
      sendSlackNotification(assessmentResult, contactData, notionPageUrl),
      sendAuditEmail({ to: contactData.email, name: contactData.name, result: assessmentResult, contact: contactData, notionPageUrl }),
    ])

    // Step 5: Mark session complete (non-fatal)
    const sessionId = (payload as { sessionId?: string }).sessionId
    if (sessionId) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/session/${sessionId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'complete', notion_page_url: notionPageUrl }),
        })
      } catch (sessionErr) {
        console.warn('Session completion update failed (non-fatal):', sessionErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit route error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
