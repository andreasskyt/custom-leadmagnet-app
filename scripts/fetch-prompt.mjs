#!/usr/bin/env node
/**
 * Fetches the system prompt from a Notion page and writes it to config/prompts.ts.
 * Run with: npm run fetch-prompt
 *
 * Reads NOTION_API_KEY from .env.local (falls back to process.env).
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const PAGE_ID = '37081b042437444fb9aea288f53b56c4'
const NOTION_VERSION = '2022-06-28'
const OUT_FILE = resolve(ROOT, 'config/prompts.ts')

// ── Load env ────────────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = resolve(ROOT, '.env.local')
  try {
    const lines = readFileSync(envPath, 'utf8').split('\n')
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim()
      if (key && !process.env[key]) process.env[key] = val
    }
  } catch {
    // .env.local not found — rely on process.env
  }
}

// ── Notion helpers ───────────────────────────────────────────────────────────

function notionHeaders(apiKey) {
  return {
    'Authorization': `Bearer ${apiKey}`,
    'Notion-Version': NOTION_VERSION,
  }
}

async function fetchBlocks(blockId, apiKey) {
  const blocks = []
  let cursor = undefined

  do {
    const url = `https://api.notion.com/v1/blocks/${blockId}/children${cursor ? `?start_cursor=${cursor}` : ''}`
    const res = await fetch(url, { headers: notionHeaders(apiKey) })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Notion API error ${res.status}: ${body}`)
    }
    const data = await res.json()
    blocks.push(...data.results)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)

  return blocks
}

// ── Block → text ─────────────────────────────────────────────────────────────

function richTextToString(richText) {
  if (!Array.isArray(richText)) return ''
  return richText.map(span => span.plain_text ?? '').join('')
}

function blockToText(block) {
  const type = block.type
  const data = block[type]
  if (!data) return null

  const text = richTextToString(data.rich_text ?? [])

  switch (type) {
    case 'heading_1':    return `# ${text}`
    case 'heading_2':    return `## ${text}`
    case 'heading_3':    return `### ${text}`
    case 'bulleted_list_item': return `- ${text}`
    case 'numbered_list_item': return `${text}`
    case 'paragraph':    return text
    case 'quote':        return text
    case 'callout':      return text
    case 'code':         return text
    case 'divider':      return null
    default:             return text || null
  }
}

function blocksToPrompt(blocks) {
  const lines = []
  let prevWasEmpty = false

  for (const block of blocks) {
    const text = blockToText(block)
    if (text === null) continue

    if (text === '') {
      if (!prevWasEmpty) lines.push('')
      prevWasEmpty = true
    } else {
      lines.push(text)
      prevWasEmpty = false
    }
  }

  // Trim leading/trailing blank lines
  return lines.join('\n').trim()
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv()

  const apiKey = process.env.NOTION_API_KEY
  if (!apiKey) {
    console.error('Error: NOTION_API_KEY is not set in .env.local or environment.')
    process.exit(1)
  }

  console.log(`Fetching system prompt from Notion page ${PAGE_ID}…`)

  const blocks = await fetchBlocks(PAGE_ID, apiKey)
  const prompt = blocksToPrompt(blocks)

  if (!prompt) {
    console.error('Error: Notion page returned no text content.')
    process.exit(1)
  }

  const output = `// AUTO-GENERATED — do not edit by hand.
// Run \`npm run fetch-prompt\` to refresh from Notion.
// Source: https://www.notion.so/skytsystems/${PAGE_ID}

export const SYSTEM_PROMPT = ${JSON.stringify(prompt)}
`

  writeFileSync(OUT_FILE, output, 'utf8')
  console.log(`✓ Written to config/prompts.ts (${prompt.length} chars)`)
  console.log('\nPreview (first 300 chars):')
  console.log(prompt.slice(0, 300) + (prompt.length > 300 ? '…' : ''))
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
