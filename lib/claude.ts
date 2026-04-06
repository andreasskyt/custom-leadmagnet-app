import Anthropic from '@anthropic-ai/sdk'
import type { AssessmentResult, ContactData, ClaudeResponse } from './types'
import { CLAUDE_MODEL, SYSTEM_PROMPT, buildUserMessage } from '@/config/ai'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateAiContent(
  result: AssessmentResult,
  contact: ContactData
): Promise<ClaudeResponse> {
  const userMessage = buildUserMessage(result, contact)

  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  })

  const textContent = message.content.find(c => c.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('Claude returned no text content')
  }

  // Strip markdown code fences if present
  const raw = textContent.text.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, '')

  // Escape literal newlines inside JSON string values (Claude sometimes emits real newlines)
  const sanitized = raw.replace(/"((?:[^"\\]|\\.)*)"/gs, (match) =>
    match.replace(/\n/g, '\\n').replace(/\r/g, '\\r')
  )

  let parsed: ClaudeResponse
  try {
    parsed = JSON.parse(sanitized) as ClaudeResponse
  } catch {
    throw new Error(`Claude response was not valid JSON: ${raw.slice(0, 200)}`)
  }

  if (!parsed.AI_KNOW_YOUR_WORLD || !parsed.AI_BOTTLENECK_1 || !parsed.AI_BOTTLENECK_2 || !parsed.AI_QUICK_WIN) {
    throw new Error('Claude response missing required fields')
  }

  return parsed
}
