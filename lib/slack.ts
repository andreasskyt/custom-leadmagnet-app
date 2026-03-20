import type { AssessmentResult, ContactData } from './types'
import { buildSlackMessage } from '@/config/slack'

export async function sendSlackNotification(
  result: AssessmentResult,
  contact: ContactData,
  notionPageUrl: string
): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not set — skipping Slack notification')
    return
  }

  const payload = buildSlackMessage(result, contact, notionPageUrl)

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Slack webhook failed ${res.status}: ${body}`)
  }
}
