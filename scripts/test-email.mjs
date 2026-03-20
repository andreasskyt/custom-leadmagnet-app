#!/usr/bin/env node
/**
 * Sends a test email using the most recent completed session for a given address.
 * Skips Claude and Notion — scoring + email only.
 *
 * Usage:  npm run test-email -- jane@youragency.com
 *
 * Requires the dev server to be running on localhost:3000.
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const PILLAR_BY_QUESTION = {}
const PILLAR_MAP = [1,1,1,1, 2,2,2,2, 3,3,3,3, 4,4,4,4, 5,5,5,5, 6,6,6,6]
for (let i = 0; i < 24; i++) PILLAR_BY_QUESTION[i + 1] = PILLAR_MAP[i]

function loadEnv() {
  try {
    const lines = readFileSync(resolve(ROOT, '.env.local'), 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim()
      if (key && !process.env[key]) process.env[key] = val
    }
  } catch { /* rely on process.env */ }
}

async function main() {
  loadEnv()

  const email = process.argv[2]
  if (!email) {
    console.error('Usage: npm run test-email -- <email>')
    process.exit(1)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  console.log(`Looking up session for ${email}…`)
  const res = await fetch(
    `${supabaseUrl}/rest/v1/audit_sessions?email=eq.${encodeURIComponent(email)}&order=created_at.desc&limit=10`,
    { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } }
  )

  if (!res.ok) {
    console.error('Supabase query failed:', await res.text())
    process.exit(1)
  }

  const sessions = await res.json()
  if (!sessions.length) {
    console.error(`No sessions found for ${email}`)
    process.exit(1)
  }

  const session = sessions.find(s => s.answers && Object.keys(s.answers).length === 24)
    ?? sessions.find(s => s.answers && Object.keys(s.answers).length > 0)
    ?? sessions[0]

  const answerCount = session.answers ? Object.keys(session.answers).length : 0
  console.log(`Found session ${session.id} (${answerCount} answers, created ${session.created_at})`)

  const answersMap = session.answers ?? {}
  const answers = Object.entries(answersMap).map(([qId, score]) => ({
    questionId: Number(qId),
    pillar: PILLAR_BY_QUESTION[Number(qId)] ?? 1,
    score: Number(score),
  })).sort((a, b) => a.questionId - b.questionId)

  const payload = {
    answers,
    contactData: {
      name: session.name,
      email: session.email,
      businessName: session.business_name,
      tools: session.tools ?? [],
    },
  }

  console.log(`\nSending test email to ${session.email} for ${session.name} / ${session.business_name}…`)

  const submitRes = await fetch('http://localhost:3000/api/test-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await submitRes.json().catch(() => ({}))

  if (!submitRes.ok) {
    console.error(`\nFailed (${submitRes.status}):`, json)
    process.exit(1)
  }

  console.log('\n✓ Email sent:', json)
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
